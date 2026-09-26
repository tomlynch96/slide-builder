import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getQualification } from '../data/specs'
import { useStore } from '../store/AppStore'
import { recallStats, sequenceDecks } from '../lib/sequence'
import { RecallChart } from '../components/RecallChart'
import './SequencePage.css'

export function SequencePage() {
  const { qualId = '', topicRef = '' } = useParams()
  const { data, ensureSequence, createDeck, deleteDeck, moveDeck } = useStore()
  const navigate = useNavigate()
  const qual = getQualification(qualId)
  const topic = qual?.topics.find(t => t.ref === topicRef)

  const sequence = data.sequences.find(s => s.qualificationId === qualId && s.topicRef === topicRef)
  const decks = sequence ? sequenceDecks(data, sequence) : []
  const schemes = sequence ? data.schemes.filter(s => s.sequenceIds.includes(sequence.id)) : []

  const [title, setTitle] = useState('')
  const [points, setPoints] = useState<string[]>([])
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  if (!qual || !topic) return <div className="page"><h1>Topic not found</h1><Link to="/">Back</Link></div>

  const addLesson = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const seqId = ensureSequence(qual.id, topic.ref)
    const deckId = createDeck(seqId, title.trim(), points)
    navigate(`/deck/${deckId}`)
  }

  const togglePoint = (ref: string) =>
    setPoints(p => p.includes(ref) ? p.filter(r => r !== ref) : [...p, ref])

  // Grey out spec points an existing lesson already covers
  const covered = new Set(decks.flatMap(d => d.specPointRefs))

  return (
    <div className="page">
      <p className="muted"><Link to="/">{qual.label}</Link></p>
      <h1>{topic.ref} {topic.title}</h1>
      <p className="page-sub">
        {decks.length} lesson{decks.length === 1 ? '' : 's'} in sequence
        {schemes.length > 0 && <> · in {schemes.map((s, i) => <span key={s.id}>{i ? ', ' : ''}<Link to={`/scheme/${s.id}`}>{s.title}</Link></span>)}</>}
      </p>

      <div className="seq-grid">
        <section>
          {decks.length === 0 ? (
            <div className="card muted">No lessons yet. Add the first lesson in this topic below.</div>
          ) : (
            <ol className="lesson-list">
              {decks.map((deck, i) => (
                <li
                  key={deck.id}
                  className={`lesson-row ${dragIndex === i ? 'is-dragging' : ''}`}
                  draggable
                  onDragStart={() => setDragIndex(i)}
                  onDragEnd={() => setDragIndex(null)}
                  onDragOver={e => {
                    e.preventDefault()
                    if (dragIndex !== null && dragIndex !== i && sequence) {
                      moveDeck(sequence.id, dragIndex, i)
                      setDragIndex(i)
                    }
                  }}
                >
                  <span className="lesson-row__handle" title="Drag to reorder">⋮⋮</span>
                  <span className="lesson-row__num">L{i + 1}</span>
                  <div className="lesson-row__main">
                    <Link to={`/deck/${deck.id}`} className="lesson-row__title">{deck.title}</Link>
                    <div className="lesson-row__meta">
                      {deck.specPointRefs.map(r => <span key={r} className="tag">{r}</span>)}
                      <span className="muted">{deck.slides.length} slide{deck.slides.length === 1 ? '' : 's'}</span>
                    </div>
                  </div>
                  <div className="row">
                    <button className="btn btn--icon btn--sm" disabled={i === 0} onClick={() => moveDeck(sequence!.id, i, i - 1)} aria-label="Move up">↑</button>
                    <button className="btn btn--icon btn--sm" disabled={i === decks.length - 1} onClick={() => moveDeck(sequence!.id, i, i + 1)} aria-label="Move down">↓</button>
                    <Link className="btn btn--sm" to={`/deck/${deck.id}`}>Edit</Link>
                    <Link className="btn btn--sm" to={`/present/${deck.id}`}>Present</Link>
                    <button
                      className="btn btn--sm btn--danger"
                      onClick={() => { if (confirm(`Delete "${deck.title}"? This cannot be undone.`)) deleteDeck(deck.id) }}
                    >Delete</button>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <form className="card new-lesson" onSubmit={addLesson}>
            <h2 className="section-title" style={{ marginTop: 0 }}>Add lesson {decks.length + 1}</h2>
            <label className="field">
              <span>Lesson title</span>
              <input className="input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Velocity–time graphs" />
            </label>
            <div className="field">
              <span>Spec points covered</span>
              <div className="spec-points">
                {topic.points.map(p => (
                  <label key={p.ref} className={`spec-point ${covered.has(p.ref) ? 'is-covered' : ''}`}>
                    <input type="checkbox" checked={points.includes(p.ref)} onChange={() => togglePoint(p.ref)} />
                    <b>{p.ref}</b> {p.title}
                  </label>
                ))}
              </div>
            </div>
            <button className="btn btn--primary" disabled={!title.trim()}>Create lesson</button>
          </form>
        </section>

        <aside className="card">
          <h2 className="section-title" style={{ marginTop: 0 }}>Recall across this topic</h2>
          <RecallChart
            rows={decks.map((d, i) => ({ deckId: d.id, label: `L${i + 1}`, title: d.title }))}
            stats={recallStats(data)}
          />
        </aside>
      </div>
    </div>
  )
}
