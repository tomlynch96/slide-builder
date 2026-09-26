import { useEffect, useState } from 'react'
import type { AppData, Deck, QA } from '../types'
import { generateRecallQuestions, generateReviewQuestions, type RecallQuestion } from '../lib/ai'
import { pickRecallSources, priorLessons, recallRows, recallStats } from '../lib/sequence'
import { RecallChart } from './RecallChart'
import './QuestionsOverlay.css'

interface Props {
  mode: 'review' | 'recall'
  data: AppData
  deck: Deck
  /** Current slide index: review covers slides 0..uptoIndex */
  uptoIndex: number
  onSaveReview: (uptoIndex: number, questions: QA[]) => void
  onLogRecall: (sourceDeckIds: string[]) => void
  onClose: () => void
}

export function QuestionsOverlay({ mode, data, deck, uptoIndex, onSaveReview, onLogRecall, onClose }: Props) {
  const cached = mode === 'review'
    ? [...deck.reviewSets].reverse().find(r => r.uptoIndex === uptoIndex)
    : undefined
  const [questions, setQuestions] = useState<RecallQuestion[] | null>(cached?.questions ?? null)
  const [count, setCount] = useState(5)
  const [reveal, setReveal] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const prior = priorLessons(data, deck)
  const next = new Set(pickRecallSources(data, prior, 6).map(p => p.deck.id))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key.toLowerCase() === 'a') setReveal(r => !r)
      e.stopPropagation()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  const generate = async () => {
    setBusy(true)
    setError('')
    setReveal(false)
    try {
      if (mode === 'review') {
        const qs = await generateReviewQuestions(data, deck, uptoIndex, count)
        setQuestions(qs)
        onSaveReview(uptoIndex, qs)
      } else {
        const { questions: qs, sourceDeckIds } = await generateRecallQuestions(data, deck, count)
        setQuestions(qs)
        onLogRecall(sourceDeckIds)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setBusy(false)
    }
  }

  const title = mode === 'review' ? `Review: slides 1–${uptoIndex + 1}` : 'Recall: earlier lessons'

  return (
    <div className="qo">
      <div className="qo__head">
        <h2>{title}</h2>
        <span className="spacer" />
        {questions && <button className="qo__btn" onClick={() => setReveal(r => !r)}>{reveal ? 'Hide answers' : 'Show answers'} (A)</button>}
        <select className="qo__select" value={count} onChange={e => setCount(Number(e.target.value))} aria-label="Number of questions">
          {[3, 5, 8, 10].map(n => <option key={n} value={n}>{n} questions</option>)}
        </select>
        <button className="qo__btn qo__btn--primary" onClick={generate} disabled={busy || (mode === 'recall' && next.size === 0)}>
          {busy ? 'Generating…' : questions ? '↻ New questions' : 'Generate'}
        </button>
        <button className="qo__btn" onClick={onClose} aria-label="Close">✕</button>
      </div>

      {error && <p className="qo__error">{error}</p>}

      <div className="qo__body">
        {questions ? (
          <ol className="qo__list">
            {questions.map((q, i) => (
              <li key={i}>
                <span>{q.q}</span>
                {q.sourceLabel && <em className="qo__source">{q.sourceLabel}</em>}
                {reveal && <strong className="qo__answer">{q.a}</strong>}
              </li>
            ))}
          </ol>
        ) : mode === 'review' ? (
          <p className="qo__hint">
            Questions will assess only what's on slides 1–{uptoIndex + 1} of this lesson.
          </p>
        ) : null}

        {mode === 'recall' && (
          <div className="qo__chart">
            <h3>How often each earlier lesson has been recalled</h3>
            <RecallChart rows={recallRows(prior)} stats={recallStats(data)} nextIds={questions ? undefined : next} currentLabel={deck.title} />
          </div>
        )}
      </div>
    </div>
  )
}
