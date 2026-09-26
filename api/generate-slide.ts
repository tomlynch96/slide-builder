import type { VercelRequest, VercelResponse } from '@vercel/node'
import * as z from 'zod/v4'
import { describeLesson, generateJson, sendError, TEACHER_SYSTEM, type LessonContext } from './_claude'

interface RecallSource {
  tag: string
  title: string
  text: string
}

interface Body {
  type: string
  lesson: LessonContext
  slidesSoFar: string
  teacherPrompt?: string
  /** For answers slides: the task being answered */
  taskText?: string
  /** For title + recall slides: previous lessons to draw starter questions from */
  recallSources?: RecallSource[]
}

const strings = z.array(z.string())

const SCHEMAS = {
  title_recall: z.object({
    title: z.string(),
    objectives: strings.describe('2-3 learning objectives starting with a command word'),
    recall: z.array(z.object({
      q: z.string(),
      a: z.string(),
      source: z.string().describe('Tag of the previous lesson this question assesses, e.g. "S2"'),
    })).describe('Starter retrieval questions'),
  }),
  vocab: z.object({
    word: z.string(),
    definition: z.string().describe('Student-friendly definition, one sentence'),
    inASentence: z.string().describe('The word used correctly in a sentence about this topic'),
    synonyms: strings.describe('0-3 synonyms or near-synonyms; empty if none are accurate'),
    antonyms: strings.describe('0-3 antonyms or contrasting terms; empty if none are accurate'),
    wordParts: z.string().describe('Etymology / morphology, e.g. "photo- (light) + synthesis (putting together)"'),
    studentTask: z.string().describe('A short task for students using the word'),
  }),
  hinge: z.object({
    question: z.string(),
    options: strings.describe('Exactly 4 options'),
    correctIndex: z.number().int().describe('0-based index of the correct option'),
    diagnosis: strings.describe('For each option in order: the misconception that choosing it reveals, or "Correct" for the right answer'),
  }),
  info: z.object({
    heading: z.string(),
    points: strings.describe('3-5 concise teaching points'),
    visualNote: z.string().describe('What diagram, image or demo the teacher should show alongside'),
  }),
  examples: z.object({
    concept: z.string(),
    examples: strings.describe('3-4 examples of the concept'),
    nonExamples: strings.describe('3-4 plausible non-examples, ideally common confusions'),
    prompt: z.string().describe('Question prompting students to justify the sort'),
  }),
  task: z.object({
    heading: z.string(),
    instructions: z.string(),
    questions: strings.describe('4-6 questions increasing in difficulty'),
  }),
  answers: z.object({
    heading: z.string(),
    answers: strings.describe('One answer per task question, in order, with working where relevant'),
  }),
} as const

type SchemaType = keyof typeof SCHEMAS

const GUIDANCE: Record<SchemaType, string> = {
  title_recall: 'A title slide with lesson objectives and starter retrieval questions. Write one or two recall questions for each previous lesson provided, each answerable in a few words. If no previous lessons are provided, return an empty recall list.',
  vocab: 'A vocabulary slide following reciprocal reading strategies for one key tier-3 word from this lesson.',
  hinge: 'A mini-whiteboard hinge question: one multiple-choice question students answer at the same time. Each wrong option must be a plausible answer that reveals a specific misconception.',
  info: 'An information slide delivering the next key idea in the lesson.',
  examples: 'An examples and non-examples slide that sharpens the boundary of one concept.',
  task: 'An independent practice task on what has been taught so far in this lesson.',
  answers: 'An answers slide for the task below. Give concise model answers a student can self-mark against.',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const body = req.body as Body
  const type = body.type as SchemaType
  if (!(type in SCHEMAS) || !body.lesson) return res.status(400).json({ error: 'Missing or unsupported slide type' })

  const sources = body.recallSources ?? []
  const prompt = [
    `Write the content for a "${type}" slide.`,
    GUIDANCE[type],
    '',
    describeLesson(body.lesson),
    '',
    body.slidesSoFar ? `Slides already in this lesson:\n${body.slidesSoFar}` : 'This is the first slide of the lesson.',
    type === 'answers' && body.taskText ? `\nThe task to answer:\n${body.taskText}` : '',
    type === 'title_recall' && sources.length
      ? `\nPrevious lessons to recall from:\n${sources.map(s => `[${s.tag}] ${s.title}\n${s.text}`).join('\n\n')}`
      : '',
    body.teacherPrompt ? `\nTeacher's instructions for this slide (follow these): ${body.teacherPrompt}` : '',
  ].join('\n')

  try {
    const content = await generateJson({ system: TEACHER_SYSTEM, prompt, schema: SCHEMAS[type], effort: 'medium' })
    return res.status(200).json({ content })
  } catch (err) {
    return sendError(res, err, 'generate-slide')
  }
}
