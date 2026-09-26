import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/AppStore'
import type { Slide } from '../types'
import { SlideView } from '../components/SlideView'
import { SlideEditor } from '../components/SlideEditor'
import { AddSlidePanel } from '../components/AddSlidePanel'
import { SLIDE_TYPES, slideHeading } from '../lib/slideTypes'
import { deckContext, move } from '../lib/sequence'
import { generateSlideContent } from '../lib/ai'
import { exportDeckToPptx } from '../lib/exportPptx'
import './DeckEditorPage.css'

export function DeckEditorPage() {
  const { deckId = '' } = useParams()
  const { data, updateDeck, logRecall } = useStore()
  const deck = data.decks.find(d => d.id === deckId)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [regenPrompt, setRegenPrompt] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (!deck) return <div className="page"><h1>Lesson not found</h1><Link to="/">Home</Link></div>

  const { sequence, qual, topic, lessonNumber } = deckContext(data, deck)
  const selectedIndex = Math.max(0, deck.slides.findIndex(s => s.id === selectedId))
  const selected: Slide | undefined = deck.slides[selectedIndex]

  const setSlides = (update: (slides: Slide[]) => Slide[]) => updateDeck(deck.id, d => ({ ...d, slides: update(d.slides) }))

  const insert = (slide: Slide, recallSourceDeckIds?: string[]) => {
    const at = deck.slides.length === 0 ? 0 : selectedIndex + 1
    setSlides(slides => [...slides.slice(0, at), slide, ...slides.slice(at)])
    setSelectedId(slide.id)
    if (recallSourceDeckIds?.length) logRecall(deck.id, recallSourceDeckIds)
  }

  const updateSelected = (content: Slide['content']) => {
    if (!selected) return
    setSlides(slides => slides.map(s => s.id === selected.id
      ? { ...s, content, edited: s.edited || s.aiGenerated } as Slide
      : s))
  }

  const remove = (id: string) => {
    const idx = deck.slides.findIndex(s => s.id === id)
    setSlides(slides => slides.filter(s => s.id !== id))
    setSelectedId(deck.slides[idx + 1]?.id ?? deck.slides[idx - 1]?.id ?? null)
  }

  const duplicate = (slide: Slide) => {
    const copy = { ...structuredClone(slide), id: crypto.randomUUID() }
    const idx = deck.slides.findIndex(s => s.id === slide.id)
    setSlides(slides => [...slides.slice(0, idx + 1), copy, ...slides.slice(idx + 1)])
    setSelectedId(copy.id)
  }

  const regenerate = async () => {
    if (!selected || !SLIDE_TYPES[selected.type].aiFill) return
    setBusy(true)
    setError('')
    try {
      const taskSlide = selected.type === 'answers'
        ? deck.slides.find(s => s.id === selected.content.taskSlideId) ?? deck.slides.slice(0, selectedIndex).reverse().find(s => s.type === 'task')
        : undefined
      const { content, recallSourceDeckIds } = await generateSlideContent({
        data, deck, type: selected.type, before: deck.slides.slice(0, selectedIndex),
        teacherPrompt: regenPrompt.trim() || undefined, taskSlide,
      })
      setSlides(slides => slides.map(s => s.id === selected.id ? { ...s, content, aiGenerated: true, edited: false } as Slide : s))
      if (recallSourceDeckIds.length) logRecall(deck.id, recallSourceDeckIds)
      setRegenPrompt('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setBusy(false)
    }
  }

  const taskSlides = deck.slides
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.type === 'task')
    .map(({ s, i }) => ({ id: s.id, label: `Slide ${i + 1}: ${slideHeading(s)}` }))

  return (
    <div className="editor">
      <header className="editor__bar">
        <div className="editor__crumbs">
          <Link to={`/topic/${sequence.qualificationId}/${encodeURIComponent(sequence.topicRef)}`}>
            {qual?.shortLabel} · {topic?.ref} {topic?.title}
          </Link>
          <span className="muted"> / L{lessonNumber}</span>
        </div>
        <input
          className="title-input" value={deck.title} aria-label="Lesson title"
          onChange={e => updateDeck(deck.id, d => ({ ...d, title: e.target.value }))}
        />
        <div className="row">
          {deck.specPointRefs.map(r => <span key={r} className="tag">{r}</span>)}
        </div>
        <span className="spacer" />
        <Link className="btn" to={`/print/${deck.id}`}>Print handout</Link>
        <button className="btn" disabled={!deck.slides.length} onClick={() => exportDeckToPptx(deck)}>Export .pptx</button>
        <Link className={`btn btn--primary ${deck.slides.length ? '' : 'is-disabled'}`} to={`/present/${deck.id}`}>▶ Present</Link>
      </header>

      <div className="editor__body">
        <nav className="rail" aria-label="Slides">
          {deck.slides.length === 0 && <p className="muted rail__empty">No slides yet. Add one from the panel on the right.</p>}
          {deck.slides.map((s, i) => (
            <div
              key={s.id}
              className={`rail__item ${s.id === selected?.id ? 'is-selected' : ''} ${dragIndex === i ? 'is-dragging' : ''}`}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragEnd={() => setDragIndex(null)}
              onDragOver={e => {
                e.preventDefault()
                if (dragIndex !== null && dragIndex !== i) { setSlides(sl => move(sl, dragIndex, i)); setDragIndex(i) }
              }}
              onClick={() => setSelectedId(s.id)}
            >
              <span className="rail__num">{i + 1}</span>
              <div className="rail__thumb">
                <SlideView slide={s} />
                <span className="rail__type">{SLIDE_TYPES[s.type].label}{s.source ? ' · reused' : ''}</span>
              </div>
            </div>
          ))}
        </nav>

        <main className="stage">
          {selected ? (
            <>
              <div className="stage__preview"><SlideView slide={selected} reveal /></div>
              <div className="stage__tools row">
                <span className="tag">{SLIDE_TYPES[selected.type].label}</span>
                {selected.aiGenerated && <span className="muted">{selected.edited ? 'AI draft · edited by you' : 'AI draft · not yet edited'}</span>}
                {selected.source && <span className="muted">Copied from an earlier lesson</span>}
                <span className="spacer" />
                <button className="btn btn--sm" disabled={selectedIndex === 0} onClick={() => setSlides(sl => move(sl, selectedIndex, selectedIndex - 1))}>↑</button>
                <button className="btn btn--sm" disabled={selectedIndex === deck.slides.length - 1} onClick={() => setSlides(sl => move(sl, selectedIndex, selectedIndex + 1))}>↓</button>
                <button className="btn btn--sm" onClick={() => duplicate(selected)}>Duplicate</button>
                <button className="btn btn--sm btn--danger" onClick={() => remove(selected.id)}>Delete</button>
              </div>

              <div className="card stage__form">
                <SlideEditor slide={selected} taskSlides={taskSlides} onChange={updateSelected} />
                <label className="field">
                  <span>Speaker notes</span>
                  <textarea className="input" rows={2} value={selected.notes} onChange={e => setSlides(sl => sl.map(s => s.id === selected.id ? { ...s, notes: e.target.value } : s))} />
                </label>

                {SLIDE_TYPES[selected.type].aiFill && (
                  <div className="regen">
                    <input className="input" value={regenPrompt} onChange={e => setRegenPrompt(e.target.value)} placeholder="Regenerate with instructions, e.g. make it harder…" />
                    <button className="btn" onClick={regenerate} disabled={busy}>{busy ? 'Generating…' : '✨ Regenerate'}</button>
                  </div>
                )}
                {error && <p className="error">{error}</p>}
              </div>
            </>
          ) : (
            <div className="stage__empty muted">Choose a slide type on the right to start this lesson.</div>
          )}
        </main>

        <AddSlidePanel data={data} deck={deck} insertAfter={deck.slides.length ? selectedIndex : -1} onInsert={insert} />
      </div>
    </div>
  )
}
