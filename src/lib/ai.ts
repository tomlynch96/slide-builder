import type { AppData, Deck, QA, Slide, SlideContentMap, SlideType } from '../types'
import { deckContext, pickRecallSources, priorLessons, type PriorLesson } from './sequence'
import { emptyContent, slidesToText, slideToText } from './slideTypes'

const MAX_RECALL_LESSONS = 6

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({ error: `Request failed (${res.status})` }))
  if (!res.ok) throw new Error(data.error ?? `Request failed (${res.status})`)
  return data as T
}

function lessonPayload(data: AppData, deck: Deck) {
  const { qual, topic, specPoints, lessonNumber } = deckContext(data, deck)
  return {
    title: deck.title,
    qualification: qual?.label ?? '',
    topic: topic ? `${topic.ref} ${topic.title}` : '',
    specPoints: specPoints.map(p => `${p.ref} ${p.title}`),
    lessonNumber,
  }
}

function tagSources(lessons: PriorLesson[]) {
  return lessons.map((l, i) => ({
    tag: `S${i + 1}`,
    deckId: l.deck.id,
    title: `${l.label}: ${l.deck.title}`,
    text: slidesToText(l.deck.slides),
  }))
}

export interface GeneratedSlide<K extends SlideType = SlideType> {
  content: SlideContentMap[K]
  /** Lessons drawn on for recall — log these as a recall event */
  recallSourceDeckIds: string[]
}

export async function generateSlideContent(opts: {
  data: AppData
  deck: Deck
  type: SlideType
  /** Slides that come before the new one */
  before: Slide[]
  teacherPrompt?: string
  taskSlide?: Slide
}): Promise<GeneratedSlide> {
  const { data, deck, type } = opts
  const sources = type === 'title_recall'
    ? tagSources(pickRecallSources(data, priorLessons(data, deck), MAX_RECALL_LESSONS))
    : []

  const { content } = await post<{ content: Record<string, unknown> }>('/api/generate-slide', {
    type,
    lesson: lessonPayload(data, deck),
    slidesSoFar: slidesToText(opts.before),
    teacherPrompt: opts.teacherPrompt,
    taskText: opts.taskSlide ? slideToText(opts.taskSlide) : undefined,
    recallSources: sources.map(({ tag, title, text }) => ({ tag, title, text })),
  })

  if (type === 'title_recall') {
    const raw = content as { title: string; objectives: string[]; recall: { q: string; a: string; source: string }[] }
    const recall = raw.recall.map(r => ({ q: r.q, a: r.a, sourceDeckId: sources.find(s => s.tag === r.source)?.deckId }))
    const used = [...new Set(recall.map(r => r.sourceDeckId).filter((id): id is string => !!id))]
    return { content: { title: raw.title, objectives: raw.objectives, recall }, recallSourceDeckIds: used }
  }
  if (type === 'answers') {
    return { content: { ...(content as object), taskSlideId: opts.taskSlide?.id } as SlideContentMap['answers'], recallSourceDeckIds: [] }
  }
  // Merge over the empty template so any missing field still has a sane default
  return { content: { ...emptyContent(type), ...content } as SlideContentMap[SlideType], recallSourceDeckIds: [] }
}

export async function generateReviewQuestions(data: AppData, deck: Deck, uptoIndex: number, count: number): Promise<QA[]> {
  const { questions } = await post<{ questions: (QA & { source: string })[] }>('/api/generate-questions', {
    mode: 'review',
    lesson: lessonPayload(data, deck),
    count,
    slidesSoFar: slidesToText(deck.slides.slice(0, uptoIndex + 1)),
  })
  return questions.map(({ q, a }) => ({ q, a }))
}

export interface RecallQuestion extends QA {
  sourceDeckId?: string
  sourceLabel?: string
}

export async function generateRecallQuestions(data: AppData, deck: Deck, count: number): Promise<{ questions: RecallQuestion[]; sourceDeckIds: string[] }> {
  const picked = pickRecallSources(data, priorLessons(data, deck), MAX_RECALL_LESSONS)
  if (picked.length === 0) throw new Error('There are no earlier lessons with slides to recall from yet.')
  const sources = tagSources(picked)
  const { questions } = await post<{ questions: (QA & { source: string })[] }>('/api/generate-questions', {
    mode: 'recall',
    lesson: lessonPayload(data, deck),
    count,
    sources: sources.map(({ tag, title, text }) => ({ tag, title, text })),
  })
  const mapped = questions.map(({ q, a, source }) => {
    const s = sources.find(x => x.tag === source)
    return { q, a, sourceDeckId: s?.deckId, sourceLabel: s?.title }
  })
  const used = [...new Set(mapped.map(m => m.sourceDeckId).filter((id): id is string => !!id))]
  return { questions: mapped, sourceDeckIds: used }
}
