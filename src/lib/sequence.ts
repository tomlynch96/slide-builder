import { getQualification } from '../data/specs'
import type { AppData, Deck, Sequence } from '../types'

export function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length || from === to) return items
  const next = [...items]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

export function sequenceLabel(seq: Sequence): { qualification: string; topic: string } {
  const qual = getQualification(seq.qualificationId)
  const topic = qual?.topics.find(t => t.ref === seq.topicRef)
  return {
    qualification: qual?.label ?? seq.qualificationId,
    topic: topic ? `${topic.ref} ${topic.title}` : seq.topicRef,
  }
}

export function sequenceDecks(data: AppData, seq: Sequence): Deck[] {
  return seq.deckIds.map(id => data.decks.find(d => d.id === id)).filter((d): d is Deck => !!d)
}

export function deckContext(data: AppData, deck: Deck) {
  const sequence = data.sequences.find(s => s.id === deck.sequenceId)!
  const qual = getQualification(sequence.qualificationId)
  const topic = qual?.topics.find(t => t.ref === sequence.topicRef)
  const specPoints = topic?.points.filter(p => deck.specPointRefs.includes(p.ref)) ?? []
  const lessonNumber = sequence.deckIds.indexOf(deck.id) + 1
  return { sequence, qual, topic, specPoints, lessonNumber }
}

export interface PriorLesson {
  deck: Deck
  /** Where it sits relative to the current lesson */
  origin: 'sequence' | 'scheme'
  /** Topic the lesson belongs to */
  group: string
  /** Position within its topic, e.g. "L3" */
  lessonLabel: string
  /** Full label for AI prompts, e.g. "T2 Motion · L3" */
  label: string
}

/**
 * Lessons taught before `deck`: earlier lessons in its own sequence, plus every
 * lesson in sequences that come earlier in any scheme containing this sequence.
 * Returned in teaching order.
 */
export function priorLessons(data: AppData, deck: Deck): PriorLesson[] {
  const seq = data.sequences.find(s => s.id === deck.sequenceId)
  if (!seq) return []

  const fromScheme: PriorLesson[] = []
  const seen = new Set<string>()
  for (const scheme of data.schemes) {
    const pos = scheme.sequenceIds.indexOf(seq.id)
    if (pos <= 0) continue
    for (const earlierId of scheme.sequenceIds.slice(0, pos)) {
      if (seen.has(earlierId)) continue
      seen.add(earlierId)
      const earlier = data.sequences.find(s => s.id === earlierId)
      if (!earlier) continue
      const { topic } = sequenceLabel(earlier)
      sequenceDecks(data, earlier).forEach((d, i) => fromScheme.push({
        deck: d, origin: 'scheme', group: topic, lessonLabel: `L${i + 1}`, label: `${topic} · L${i + 1}`,
      }))
    }
  }

  const idx = seq.deckIds.indexOf(deck.id)
  const { topic } = sequenceLabel(seq)
  const inSequence: PriorLesson[] = sequenceDecks(data, seq)
    .slice(0, Math.max(idx, 0))
    .map((d, i) => ({ deck: d, origin: 'sequence', group: topic, lessonLabel: `L${i + 1}`, label: `${topic} · L${i + 1}` }))

  return [...fromScheme, ...inSequence]
}

export interface RecallStat {
  count: number
  lastAt: string | null
}

export function recallStats(data: AppData): Map<string, RecallStat> {
  const stats = new Map<string, RecallStat>()
  for (const ev of data.recallEvents) {
    for (const id of ev.sourceDeckIds) {
      const s = stats.get(id) ?? { count: 0, lastAt: null }
      s.count += 1
      if (!s.lastAt || ev.createdAt > s.lastAt) s.lastAt = ev.createdAt
      stats.set(id, s)
    }
  }
  return stats
}

/**
 * Spaced retrieval: prefer lessons recalled least often, then least recently,
 * then the oldest taught. Returns up to `max` lessons (in teaching order).
 */
export function pickRecallSources(data: AppData, candidates: PriorLesson[], max: number): PriorLesson[] {
  const stats = recallStats(data)
  const withContent = candidates.filter(c => c.deck.slides.length > 0)
  const ranked = withContent
    .map((c, order) => ({ c, order, s: stats.get(c.deck.id) ?? { count: 0, lastAt: null } }))
    .sort((a, b) =>
      a.s.count - b.s.count ||
      (a.s.lastAt ?? '').localeCompare(b.s.lastAt ?? '') ||
      a.order - b.order)
    .slice(0, max)
  return ranked.sort((a, b) => a.order - b.order).map(r => r.c)
}

/** Rows for the recall infographic from a list of prior lessons */
export function recallRows(lessons: PriorLesson[]) {
  return lessons.map(l => ({ deckId: l.deck.id, label: l.lessonLabel, title: l.deck.title, group: l.group }))
}
