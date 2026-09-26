import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QUALIFICATIONS } from '../data/specs'
import { useStore } from '../store/AppStore'
import './HomePage.css'

const QUAL_KEY = 'slide-builder:qualification'

function readQual(): string {
  try { return localStorage.getItem(QUAL_KEY) ?? QUALIFICATIONS[0].id } catch { return QUALIFICATIONS[0].id }
}

export function HomePage() {
  const { data, createScheme } = useStore()
  const navigate = useNavigate()
  const [qualId, setQualId] = useState(readQual)
  const qual = QUALIFICATIONS.find(q => q.id === qualId) ?? QUALIFICATIONS[0]

  const chooseQual = (id: string) => {
    setQualId(id)
    try { localStorage.setItem(QUAL_KEY, id) } catch { /* per-viewer convenience only */ }
  }

  const lessonCount = (topicRef: string) =>
    data.sequences.find(s => s.qualificationId === qual.id && s.topicRef === topicRef)?.deckIds.length ?? 0

  const newScheme = () => {
    const title = prompt('Scheme name, e.g. "Year 10 Physics 2026–27"')
    if (title?.trim()) navigate(`/scheme/${createScheme(title.trim())}`)
  }

  return (
    <div className="page">
      <h1>Lesson sequences</h1>
      <p className="page-sub">Each topic holds an ordered sequence of lessons. Order topics into a scheme to extend recall across the year.</p>

      <div className="home-grid">
        <section>
          <label className="field" style={{ maxWidth: 420 }}>
            <span>Qualification</span>
            <select className="input" value={qual.id} onChange={e => chooseQual(e.target.value)}>
              {QUALIFICATIONS.map(q => <option key={q.id} value={q.id}>{q.label}</option>)}
            </select>
          </label>

          <div className="topic-list">
            {qual.topics.map(t => {
              const n = lessonCount(t.ref)
              return (
                <Link key={t.ref} to={`/topic/${qual.id}/${encodeURIComponent(t.ref)}`} className="topic-row">
                  <span className="topic-row__ref">{t.ref}</span>
                  <span className="topic-row__title">{t.title}</span>
                  <span className={`topic-row__count ${n ? '' : 'is-empty'}`}>{n ? `${n} lesson${n === 1 ? '' : 's'}` : 'No lessons'}</span>
                </Link>
              )
            })}
          </div>
        </section>

        <aside>
          <div className="card">
            <div className="row">
              <h2 className="section-title" style={{ margin: 0 }}>Schemes of work</h2>
              <span className="spacer" />
              <button className="btn btn--sm btn--primary" onClick={newScheme}>+ New scheme</button>
            </div>
            {data.schemes.length === 0 ? (
              <p className="muted">No schemes yet. A scheme orders topics so recall can reach back into earlier topics.</p>
            ) : (
              <ul className="scheme-list">
                {data.schemes.map(s => (
                  <li key={s.id}>
                    <Link to={`/scheme/${s.id}`}>{s.title}</Link>
                    <span className="muted"> · {s.sequenceIds.length} topic{s.sequenceIds.length === 1 ? '' : 's'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
