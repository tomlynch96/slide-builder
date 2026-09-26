import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { QUALIFICATIONS } from '../data/specs'
import { useStore } from '../store/AppStore'
import { move, recallStats, sequenceDecks, sequenceLabel } from '../lib/sequence'
import { RecallChart, type RecallRow } from '../components/RecallChart'
import type { Sequence } from '../types'
import './SequencePage.css'

export function SchemePage() {
  const { schemeId = '' } = useParams()
  const { data, updateScheme, deleteScheme, ensureSequence } = useStore()
  const navigate = useNavigate()
  const scheme = data.schemes.find(s => s.id === schemeId)
  const [qualId, setQualId] = useState(QUALIFICATIONS[0].id)
  const [topicRef, setTopicRef] = useState('')

  if (!scheme) return <div className="page"><h1>Scheme not found</h1><Link to="/">Home</Link></div>

  const sequences = scheme.sequenceIds
    .map(id => data.sequences.find(s => s.id === id))
    .filter((s): s is Sequence => !!s)
  const qual = QUALIFICATIONS.find(q => q.id === qualId)!

  const addTopic = () => {
    if (!topicRef) return
    const seqId = ensureSequence(qualId, topicRef)
    if (!scheme.sequenceIds.includes(seqId)) {
      updateScheme(scheme.id, s => ({ ...s, sequenceIds: [...s.sequenceIds, seqId] }))
    }
    setTopicRef('')
  }

  const rows: RecallRow[] = sequences.flatMap(seq => {
    const { topic } = sequenceLabel(seq)
    return sequenceDecks(data, seq).map((d, i) => ({ deckId: d.id, label: `L${i + 1}`, title: d.title, group: topic }))
  })

  return (
    <div className="page">
      <p className="muted"><Link to="/">Home</Link></p>
      <input
        className="title-input" style={{ fontSize: 24, marginLeft: -8 }} value={scheme.title} aria-label="Scheme title"
        onChange={e => updateScheme(scheme.id, s => ({ ...s, title: e.target.value }))}
      />
      <p className="page-sub">Topics are taught in this order. Recall in any lesson reaches back into every earlier topic in the scheme.</p>

      <div className="seq-grid">
        <section>
          {sequences.length === 0 ? (
            <div className="card muted">No topics yet. Add the first topic below.</div>
          ) : (
            <ol className="lesson-list">
              {sequences.map((seq, i) => {
                const { qualification, topic } = sequenceLabel(seq)
                return (
                  <li key={seq.id} className="lesson-row">
                    <span />
                    <span className="lesson-row__num">{i + 1}</span>
                    <div className="lesson-row__main">
                      <Link to={`/topic/${seq.qualificationId}/${encodeURIComponent(seq.topicRef)}`} className="lesson-row__title">{topic}</Link>
                      <div className="lesson-row__meta muted">{qualification} · {seq.deckIds.length} lesson{seq.deckIds.length === 1 ? '' : 's'}</div>
                    </div>
                    <div className="row">
                      <button className="btn btn--icon btn--sm" disabled={i === 0} onClick={() => updateScheme(scheme.id, s => ({ ...s, sequenceIds: move(s.sequenceIds, i, i - 1) }))} aria-label="Move up">↑</button>
                      <button className="btn btn--icon btn--sm" disabled={i === sequences.length - 1} onClick={() => updateScheme(scheme.id, s => ({ ...s, sequenceIds: move(s.sequenceIds, i, i + 1) }))} aria-label="Move down">↓</button>
                      <button className="btn btn--sm btn--danger" onClick={() => updateScheme(scheme.id, s => ({ ...s, sequenceIds: s.sequenceIds.filter(id => id !== seq.id) }))}>Remove</button>
                    </div>
                  </li>
                )
              })}
            </ol>
          )}

          <div className="card">
            <h2 className="section-title" style={{ marginTop: 0 }}>Add a topic</h2>
            <div className="row" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <label className="field" style={{ flex: 1, minWidth: 220 }}>
                <span>Qualification</span>
                <select className="input" value={qualId} onChange={e => { setQualId(e.target.value); setTopicRef('') }}>
                  {QUALIFICATIONS.map(q => <option key={q.id} value={q.id}>{q.label}</option>)}
                </select>
              </label>
              <label className="field" style={{ flex: 1, minWidth: 220 }}>
                <span>Topic</span>
                <select className="input" value={topicRef} onChange={e => setTopicRef(e.target.value)}>
                  <option value="">Choose a topic…</option>
                  {qual.topics.map(t => <option key={t.ref} value={t.ref}>{t.ref} {t.title}</option>)}
                </select>
              </label>
              <button className="btn btn--primary" style={{ marginBottom: 12 }} disabled={!topicRef} onClick={addTopic}>Add</button>
            </div>
          </div>

          <button
            className="btn btn--danger" style={{ marginTop: 20 }}
            onClick={() => { if (confirm('Delete this scheme? Topics and lessons are kept.')) { deleteScheme(scheme.id); navigate('/') } }}
          >Delete scheme</button>
        </section>

        <aside className="card">
          <h2 className="section-title" style={{ marginTop: 0 }}>Recall across the scheme</h2>
          <RecallChart rows={rows} stats={recallStats(data)} />
        </aside>
      </div>
    </div>
  )
}
