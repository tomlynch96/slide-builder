import Anthropic from '@anthropic-ai/sdk'
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod'
import type { VercelResponse } from '@vercel/node'
import type * as z from 'zod/v4'

// Files prefixed with _ in /api are shared helpers, not routes.

const MODEL = 'claude-opus-5'

export class ClaudeError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

/**
 * One structured-output call. The response is validated against `schema`, so
 * callers get typed JSON or a ClaudeError — never free text to regex apart.
 */
export async function generateJson<T extends z.ZodType>(opts: {
  system: string
  prompt: string
  schema: T
  /** Lower effort = faster; live classroom calls use 'low' */
  effort: 'low' | 'medium' | 'high'
}): Promise<z.infer<T>> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new ClaudeError('ANTHROPIC_API_KEY is not set. Add it to .env.local (local) or the Vercel project settings.', 503)
  }
  const client = new Anthropic()

  try {
    const response = await client.beta.messages.parse({
      model: MODEL,
      max_tokens: 16000,
      // Server-side fallback: if the primary model declines, the API re-runs
      // the request on a suitable fallback model within the same call.
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      output_config: { effort: opts.effort, format: betaZodOutputFormat(opts.schema) },
      system: opts.system,
      messages: [{ role: 'user', content: opts.prompt }],
    })

    if (response.stop_reason === 'refusal') {
      throw new ClaudeError('The model declined this request. Try rewording the prompt.', 422)
    }
    if (response.stop_reason === 'max_tokens') {
      throw new ClaudeError('The response was cut off. Try asking for less content.', 502)
    }
    if (!response.parsed_output) {
      throw new ClaudeError('The model returned content that did not match the expected format.', 502)
    }
    return response.parsed_output
  } catch (err) {
    if (err instanceof ClaudeError) throw err
    if (err instanceof Anthropic.AuthenticationError) throw new ClaudeError('Invalid ANTHROPIC_API_KEY.', 503)
    if (err instanceof Anthropic.RateLimitError) throw new ClaudeError('Rate limited by the AI provider — try again in a moment.', 429)
    if (err instanceof Anthropic.APIError) throw new ClaudeError(`AI provider error ${err.status}: ${err.message}`, 502)
    if (err instanceof Anthropic.APIConnectionError) throw new ClaudeError('Could not reach the AI provider.', 502)
    throw err
  }
}

export function sendError(res: VercelResponse, err: unknown, tag: string) {
  console.error(`[${tag}]`, err)
  if (err instanceof ClaudeError) return res.status(err.status).json({ error: err.message })
  return res.status(500).json({ error: err instanceof Error ? err.message : 'Unknown error' })
}

export interface LessonContext {
  title: string
  qualification: string
  topic: string
  specPoints: string[]
  lessonNumber: number
}

export function describeLesson(l: LessonContext): string {
  return [
    `Qualification: ${l.qualification}`,
    `Topic: ${l.topic}`,
    `Lesson ${l.lessonNumber} in the sequence: "${l.title}"`,
    l.specPoints.length ? `Spec points:\n${l.specPoints.map(p => `- ${p}`).join('\n')}` : '',
  ].filter(Boolean).join('\n')
}

export const TEACHER_SYSTEM = `You write content for UK secondary science lesson slides. A teacher chooses each slide's type; you fill it and the teacher then edits it.

- Match the qualification and exam board: use its command words, terminology, units and level of demand.
- Slides are projected, so keep text short: one idea per bullet, no bullet over ~15 words.
- Use correct scientific language and SI units. Use plain Unicode for symbols and superscripts (e.g. m/s², CO₂).
- Stay within the lesson's topic and spec points. Don't introduce content from later in the specification.`
