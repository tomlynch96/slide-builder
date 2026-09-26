import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as z from 'zod/v4'
import { describeLesson, generateJson, sendError, TEACHER_SYSTEM, type LessonContext } from './_claude'

interface Body {
  mode: 'review' | 'recall'
  lesson: LessonContext
  count: number
  /** review: the slides taught so far */
  slidesSoFar?: string
  /** recall: previous lessons, tagged S1..Sn */
  sources?: { tag: string; title: string; text: string }[]
}

const Schema = z.object({
  questions: z.array(z.object({
    q: z.string(),
    a: z.string().describe('Short model answer'),
    source: z.string().describe('recall mode: tag of the lesson assessed, e.g. "S2". review mode: empty string'),
  })),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { mode, lesson, sources = [], slidesSoFar = '' } = req.body as Body
  const count = Math.min(Math.max(Number((req.body as Body).count) || 5, 1), 10)
  if (!lesson || (mode !== 'review' && mode !== 'recall')) return res.status(400).json({ error: 'Missing lesson or mode' })
  if (mode === 'review' && !slidesSoFar.trim()) return res.status(400).json({ error: 'No slides to review yet' })
  if (mode === 'recall' && sources.length === 0) return res.status(400).json({ error: 'No previous lessons to recall from' })

  const prompt = mode === 'review'
    ? [
        `Write exactly ${count} review questions for students to answer on mini-whiteboards, part-way through a lesson.`,
        'Assess ONLY content that appears in the slides below — nothing later in the lesson or topic, even if it is on the spec.',
        'Mix recall and application. Each answer should fit on a mini-whiteboard.',
        '',
        describeLesson(lesson),
        '',
        `Slides taught so far:\n${slidesSoFar}`,
      ].join('\n')
    : [
        `Write exactly ${count} spaced-retrieval questions for the start of today's lesson.`,
        'Draw them from the previous lessons below, spreading questions across the lessons so each is covered. Tag each question with its source lesson.',
        'Assess only what those lessons taught. Each answer should fit on a mini-whiteboard.',
        '',
        `Today's lesson (for context only — do not assess it):\n${describeLesson(lesson)}`,
        '',
        `Previous lessons:\n${sources.map(s => `[${s.tag}] ${s.title}\n${s.text}`).join('\n\n')}`,
      ].join('\n')

  try {
    const result = await generateJson({ system: TEACHER_SYSTEM, prompt, schema: Schema, effort: 'low' })
    return res.status(200).json(result)
  } catch (err) {
    return sendError(res, err, 'generate-questions')
  }
}
