import type { RecallStat } from '../lib/sequence'
import './RecallChart.css'

export interface RecallRow {
  deckId: string
  label: string
  title: string
  group?: string
}

// Sequential single-hue ramp (blue): darker = recalled more recently.
const RECENCY = [
  { key: 'week', label: 'Last 7 days', max: 7, color: '#0d366b' },
  { key: 'mid', label: '8–21 days', max: 21, color: '#256abf' },
  { key: 'old', label: 'Over 3 weeks', max: Infinity, color: '#86b6ef' },
] as const

function recencyOf(lastAt: string | null) {
  if (!lastAt) return null
  const days = (Date.now() - new Date(lastAt).getTime()) / 86_400_000
  return RECENCY.find(r => days <= r.max) ?? RECENCY[2]
}

function daysAgo(lastAt: string): string {
  const days = Math.floor((Date.now() - new Date(lastAt).getTime()) / 86_400_000)
  return days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days} days ago`
}

interface Props {
  rows: RecallRow[]
  stats: Map<string, RecallStat>
  /** Lessons the next recall would draw from */
  nextIds?: Set<string>
  /** Lesson currently being taught, shown as the end point */
  currentLabel?: string
}

/** How often each prior lesson has been recalled, coloured by recency */
export function RecallChart({ rows, stats, nextIds, currentLabel }: Props) {
  if (rows.length === 0) {
    return <p className="muted">No earlier lessons yet — recall builds up as the sequence grows.</p>
  }
  const max = Math.max(1, ...rows.map(r => stats.get(r.deckId)?.count ?? 0))
  const never = rows.filter(r => !stats.get(r.deckId)?.count).length

  return (
    <div className="recall-chart">
      <div className="recall-chart__legend">
        {RECENCY.map(r => (
          <span key={r.key}><i style={{ background: r.color }} />{r.label}</span>
        ))}
        {nextIds && nextIds.size > 0 && <span><b className="recall-chart__next">next</b> picked for the next recall</span>}
      </div>

      <div className="recall-chart__rows" role="table" aria-label="Recall count per lesson">
        {rows.map((row, i) => {
          const s = stats.get(row.deckId)
          const count = s?.count ?? 0
          const rec = recencyOf(s?.lastAt ?? null)
          const showGroup = row.group && row.group !== rows[i - 1]?.group
          const tip = count
            ? `${row.title}: recalled ${count}× · last ${daysAgo(s!.lastAt!)}`
            : `${row.title}: never recalled`
          return (
            <div key={row.deckId} role="rowgroup">
              {showGroup && <div className="recall-chart__group">{row.group}</div>}
              <div className="recall-chart__row" role="row" title={tip}>
                <div className="recall-chart__label" role="cell">
                  <span className="recall-chart__lnum">{row.label}</span> {row.title}
                  {nextIds?.has(row.deckId) && <b className="recall-chart__next">next</b>}
                </div>
                <div className="recall-chart__track" role="cell">
                  {count > 0 && (
                    <div className="recall-chart__bar" style={{ width: `${(count / max) * 100}%`, background: rec?.color }} />
                  )}
                  <span className="recall-chart__value">{count > 0 ? `${count}×` : 'never'}</span>
                </div>
              </div>
            </div>
          )
        })}
        {currentLabel && (
          <div className="recall-chart__row recall-chart__row--current">
            <div className="recall-chart__label">▶ {currentLabel}</div>
            <div className="recall-chart__track"><span className="recall-chart__value">today</span></div>
          </div>
        )}
      </div>

      <p className="recall-chart__summary muted">
        {rows.length} lesson{rows.length === 1 ? '' : 's'} · {never} never recalled
      </p>
    </div>
  )
}
