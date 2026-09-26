import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import { SlideView } from '../components/SlideView'
import { deckContext } from '../lib/sequence'
import './PrintPage.css'

type Layout = 'notes' | 'grid'

/** A4 handouts: 3 slides per page with note lines, or 6 per page */
export function PrintPage() {
  const { deckId = '' } = useParams()
  const { data } = useStore()
  const deck = data.decks.find(d => d.id === deckId)
  const [layout, setLayout] = useState<Layout>('notes')
  const [answers, setAnswers] = useState(false)

  if (!deck) return <div className="page"><h1>Lesson not found</h1><Link to="/">Home</Link></div>
  const { qual, topic, lessonNumber } = deckContext(data, deck)

  const perPage = layout === 'notes' ? 3 : 6
  const pages = []
  for (let i = 0; i < deck.slides.length; i += perPage) pages.push(deck.slides.slice(i, i + perPage))

  return (
    <div className="print">
      <div className="print__controls no-print">
        <Link to={`/deck/${deck.id}`} className="btn">← Back to editor</Link>
        <label className="row"><input type="radio" checked={layout === 'notes'} onChange={() => setLayout('notes')} /> 3 per page with notes</label>
        <label className="row"><input type="radio" checked={layout === 'grid'} onChange={() => setLayout('grid')} /> 6 per page</label>
        <label className="row"><input type="checkbox" checked={answers} onChange={e => setAnswers(e.target.checked)} /> Show answers</label>
        <span className="spacer" />
        <button className="btn btn--primary" onClick={() => window.print()}>Print / Save PDF</button>
      </div>

      {pages.map((slides, p) => (
        <section key={p} className={`print__page print__page--${layout}`}>
          <header className="print__head">
            <b>{deck.title}</b>
            <span>{qual?.shortLabel} · {topic?.ref} {topic?.title} · Lesson {lessonNumber}</span>
            <span>Name: ______________________</span>
          </header>
          <div className="print__slides">
            {slides.map(s => (
              <div key={s.id} className="print__item">
                <SlideView slide={s} reveal={answers} />
                {layout === 'notes' && <div className="print__lines" />}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
