import { useMemo, useState } from 'react'
import type { AppData, Deck, Slide, SlideType } from '../types'
import { SLIDE_TYPE_ORDER, SLIDE_TYPES, newSlide, slideHeading } from '../lib/slideTypes'
import { pickRecallSources, priorLessons } from '../lib/sequence'
import { generateSlideContent } from '../lib/ai'
import { SlideView } from './SlideView'
import './AddSlidePanel.css'

interface Props {
  data: AppData
  deck: Deck
  /** New slides go after this index (-1 = at the start) */
  insertAfter: number
  onInsert: (slide: Slide, recallSourceDeckIds?: string[]) => void
}

export function AddSlidePanel(props: Props) {
  const [tab, setTab] = useState<'new' | 'reuse'>('new')
  return (
    <div className="add-panel">
      <div className="add-panel__tabs">
        <button className={tab === 'new' ? 'is-active' : ''} onClick={() => setTab('new')}>New slide</button>
        <button className={tab === 'reuse' ? 'is-active' : ''} onClick={() => setTab('reuse')}>From earlier lessons</button>
      </div>
      {tab === 'new' ? <NewSlide {...props} /> : <ReuseSlide {...props} />}
    </div>
  )
}

function NewSlide({ data, deck, insertAfter, onInsert }: Props) {
  const [type, setType] = useState<SlideType>(deck.slides.length === 0 ? 'title_recall' : 'info')
  const [prompt, setPrompt] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const before = deck.slides.slice(0, insertAfter + 1)
  const taskSlides = before.filter(s => s.type === 'task')
  const [taskId, setTaskId] = useState<string>('')
  const taskSlide = taskSlides.find(t => t.id === taskId) ?? taskSlides[taskSlides.length - 1]

  const recallCount = useMemo(
    () => type === 'title_recall' ? pickRecallSources(data, priorLessons(data, deck), 6).length : 0,
    [data, deck, type],
  )

  const generate = async () => {
    setBusy(true)
    setError('')
    try {
      const { content, recallSourceDeckIds } = await generateSlideContent({
        data, deck, type, before, teacherPrompt: prompt.trim() || undefined, taskSlide,
      })
      onInsert(newSlide(type, content as never, true), recallSourceDeckIds)
      setPrompt('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setBusy(false)
    }
  }

  const info = SLIDE_TYPES[type]

  return (
    <div className="add-panel__body">
      <div className="type-grid">
        {SLIDE_TYPE_ORDER.map(t => (
          <button key={t} className={`type-chip ${t === type ? 'is-active' : ''}`} onClick={() => setType(t)}>
            {SLIDE_TYPES[t].label}
          </button>
        ))}
      </div>
      <p className="muted add-panel__desc">{info.description}</p>

      {type === 'title_recall' && (
        <p className="add-panel__note">
          {recallCount > 0
            ? `Starter questions will come from ${recallCount} earlier lesson${recallCount === 1 ? '' : 's'}, least-recalled first.`
            : 'No earlier lessons with slides yet, so there will be no recall questions.'}
        </p>
      )}
      {type === 'answers' && (
        taskSlides.length === 0
          ? <p className="add-panel__note">Add a task slide before this point first.</p>
          : (
            <label className="field">
              <span>Answers for</span>
              <select className="input" value={taskSlide?.id} onChange={e => setTaskId(e.target.value)}>
                {taskSlides.map(t => <option key={t.id} value={t.id}>Slide {deck.slides.indexOf(t) + 1}: {slideHeading(t)}</option>)}
              </select>
            </label>
          )
      )}

      {info.aiFill && (
        <label className="field">
          <span>Instructions for the AI (optional)</span>
          <textarea
            className="input" rows={3} value={prompt} onChange={e => setPrompt(e.target.value)}
            placeholder={type === 'vocab' ? 'e.g. the word "acceleration"' : 'e.g. focus on the common misconception that…'}
          />
        </label>
      )}

      {error && <p className="error">{error}</p>}
      <div className="row">
        {info.aiFill && (
          <button className="btn btn--primary" onClick={generate} disabled={busy || (type === 'answers' && !taskSlide)}>
            {busy ? 'Generating…' : '✨ Generate with AI'}
          </button>
        )}
        <button className="btn" disabled={busy} onClick={() => {
          const slide = newSlide(type)
          if (slide.type === 'answers') slide.content.taskSlideId = taskSlide?.id
          onInsert(slide)
        }}>Add blank</button>
      </div>
    </div>
  )
}

function ReuseSlide({ data, deck, onInsert }: Props) {
  const [type, setType] = useState<SlideType | 'all'>('all')
  const [includeScheme, setIncludeScheme] = useState(false)

  const lessons = priorLessons(data, deck).filter(l => includeScheme || l.origin === 'sequence')
  const hasScheme = priorLessons(data, deck).some(l => l.origin === 'scheme')
  const groups = lessons
    .map(l => ({ lesson: l, slides: l.deck.slides.filter(s => type === 'all' || s.type === type) }))
    .filter(g => g.slides.length > 0)
    .reverse() // most recent lesson first

  const copy = (slide: Slide, fromDeck: Deck) => {
    onInsert({
      ...structuredClone(slide),
      id: crypto.randomUUID(),
      aiGenerated: false,
      edited: false,
      source: { deckId: fromDeck.id, slideId: slide.id },
    })
  }

  return (
    <div className="add-panel__body">
      <div className="type-grid">
        <button className={`type-chip ${type === 'all' ? 'is-active' : ''}`} onClick={() => setType('all')}>All types</button>
        {SLIDE_TYPE_ORDER.map(t => (
          <button key={t} className={`type-chip ${t === type ? 'is-active' : ''}`} onClick={() => setType(t)}>{SLIDE_TYPES[t].label}</button>
        ))}
      </div>
      {hasScheme && (
        <label className="row add-panel__check">
          <input type="checkbox" checked={includeScheme} onChange={e => setIncludeScheme(e.target.checked)} />
          Include earlier topics in the scheme
        </label>
      )}

      {groups.length === 0 ? (
        <p className="muted">
          {lessons.length === 0 ? 'This is the first lesson in the sequence.' : 'No matching slides in earlier lessons.'}
        </p>
      ) : groups.map(({ lesson, slides }) => (
        <div key={lesson.deck.id} className="reuse-group">
          <h4>{lesson.origin === 'scheme' ? lesson.label : lesson.lessonLabel} · {lesson.deck.title}</h4>
          <div className="reuse-grid">
            {slides.map(s => (
              <button key={s.id} className="reuse-thumb" onClick={() => copy(s, lesson.deck)} title="Add a copy to this lesson">
                <SlideView slide={s} />
                <span>{SLIDE_TYPES[s.type].label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
