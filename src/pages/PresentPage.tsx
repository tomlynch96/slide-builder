import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import { SlideView } from '../components/SlideView'
import { QuestionsOverlay } from '../components/QuestionsOverlay'
import type { QA } from '../types'
import './PresentPage.css'

export function PresentPage() {
  const { deckId = '' } = useParams()
  const { data, updateDeck, logRecall } = useStore()
  const navigate = useNavigate()
  const deck = data.decks.find(d => d.id === deckId)
  const [index, setIndex] = useState(0)
  const [reveal, setReveal] = useState(false)
  const [overlay, setOverlay] = useState<'review' | 'recall' | null>(null)

  const total = deck?.slides.length ?? 0
  const go = useCallback((delta: number) => {
    setIndex(i => Math.min(Math.max(i + delta, 0), Math.max(total - 1, 0)))
    setReveal(false)
  }, [total])

  useEffect(() => {
    if (overlay) return
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1) }
      else if (['ArrowLeft', 'PageUp'].includes(e.key)) go(-1)
      else if (e.key.toLowerCase() === 'a') setReveal(r => !r)
      else if (e.key.toLowerCase() === 'q') setOverlay('review')
      else if (e.key.toLowerCase() === 'r') setOverlay('recall')
      else if (e.key.toLowerCase() === 'f') toggleFullscreen()
      else if (e.key === 'Escape' && !document.fullscreenElement) navigate(`/deck/${deckId}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, overlay, navigate, deckId])

  if (!deck) return <div className="page"><h1>Lesson not found</h1><Link to="/">Home</Link></div>
  if (total === 0) return <div className="page"><h1>No slides yet</h1><Link to={`/deck/${deck.id}`}>Back to editor</Link></div>

  const slide = deck.slides[Math.min(index, total - 1)]

  const saveReview = (uptoIndex: number, questions: QA[]) =>
    updateDeck(deck.id, d => ({
      ...d,
      reviewSets: [...d.reviewSets, { id: crypto.randomUUID(), uptoIndex, questions, createdAt: new Date().toISOString() }],
    }))

  return (
    <div className="present">
      <div className="present__stage" onClick={() => go(1)}>
        <div className="present__frame">
          <SlideView slide={slide} reveal={reveal} />
        </div>
      </div>

      <div className="present__bar">
        <Link to={`/deck/${deck.id}`} className="present__btn" title="Exit (Esc)">✕</Link>
        <button className="present__btn" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous">←</button>
        <span className="present__count">{index + 1} / {total}</span>
        <button className="present__btn" onClick={() => go(1)} disabled={index === total - 1} aria-label="Next">→</button>
        <button className="present__btn" onClick={() => setReveal(r => !r)} title="Reveal answers (A)">{reveal ? 'Hide answers' : 'Reveal'}</button>
        <span className="spacer" />
        <button className="present__btn present__btn--accent" onClick={() => setOverlay('review')} title="Questions on slides so far (Q)">? Review so far</button>
        <button className="present__btn present__btn--accent" onClick={() => setOverlay('recall')} title="Recall earlier lessons (R)">↺ Recall</button>
        <button className="present__btn" onClick={toggleFullscreen} title="Fullscreen (F)">⛶</button>
      </div>

      {overlay && (
        <QuestionsOverlay
          key={`${overlay}-${index}`}
          mode={overlay}
          data={data}
          deck={deck}
          uptoIndex={index}
          onSaveReview={saveReview}
          onLogRecall={ids => logRecall(deck.id, ids)}
          onClose={() => setOverlay(null)}
        />
      )}
    </div>
  )
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen()
  else document.documentElement.requestFullscreen().catch(() => { /* not allowed, e.g. in an iframe */ })
}
