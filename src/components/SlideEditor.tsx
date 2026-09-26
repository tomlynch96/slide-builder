import type { QA, Slide, SlideContentMap, SlideType } from '../types'
import './SlideEditor.css'

interface Props {
  slide: Slide
  /** Task slides in this deck, for linking an answers slide */
  taskSlides: { id: string; label: string }[]
  onChange: (content: Slide['content']) => void
}

export function SlideEditor({ slide, taskSlides, onChange }: Props) {
  // Typed setter for the current slide's content
  function set<K extends SlideType>(_type: K, patch: Partial<SlideContentMap[K]>) {
    onChange({ ...slide.content, ...patch } as Slide['content'])
  }

  switch (slide.type) {
    case 'title_recall': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Title" value={c.title} onChange={v => set('title_recall', { title: v })} />
          <List label="Objectives" items={c.objectives} onChange={v => set('title_recall', { objectives: v })} />
          <QAList label="Do now (recall) questions" items={c.recall} onChange={v => set('title_recall', { recall: v })} />
        </div>
      )
    }
    case 'vocab': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Key word" value={c.word} onChange={v => set('vocab', { word: v })} />
          <Text label="Definition" value={c.definition} multiline onChange={v => set('vocab', { definition: v })} />
          <Text label="Use it in a sentence" value={c.inASentence} multiline onChange={v => set('vocab', { inASentence: v })} />
          <div className="slide-editor__2col">
            <CommaList label="Synonyms" items={c.synonyms} onChange={v => set('vocab', { synonyms: v })} />
            <CommaList label="Antonyms" items={c.antonyms} onChange={v => set('vocab', { antonyms: v })} />
          </div>
          <Text label="Word parts" value={c.wordParts} onChange={v => set('vocab', { wordParts: v })} />
          <Text label="Student task" value={c.studentTask} onChange={v => set('vocab', { studentTask: v })} />
        </div>
      )
    }
    case 'hinge': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Question" value={c.question} multiline onChange={v => set('hinge', { question: v })} />
          <div className="field">
            <span>Options — select the correct one; note what each wrong answer reveals</span>
            {c.options.map((o, i) => (
              <div key={i} className="hinge-opt">
                <input
                  type="radio" name={`correct-${slide.id}`} checked={c.correctIndex === i}
                  onChange={() => set('hinge', { correctIndex: i })} aria-label={`Option ${'ABCD'[i]} is correct`}
                />
                <b>{'ABCD'[i]}</b>
                <input className="input" value={o} placeholder="Option" onChange={e => {
                  const options = [...c.options]; options[i] = e.target.value; set('hinge', { options })
                }} />
                <input className="input hinge-opt__diag" value={c.diagnosis[i] ?? ''} placeholder={c.correctIndex === i ? 'Correct' : 'Misconception revealed'} onChange={e => {
                  const diagnosis = [...c.diagnosis]; diagnosis[i] = e.target.value; set('hinge', { diagnosis })
                }} />
              </div>
            ))}
          </div>
        </div>
      )
    }
    case 'info': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Heading" value={c.heading} onChange={v => set('info', { heading: v })} />
          <List label="Points" items={c.points} onChange={v => set('info', { points: v })} />
          <Text label="Visual / diagram note" value={c.visualNote} multiline onChange={v => set('info', { visualNote: v })} />
        </div>
      )
    }
    case 'examples': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Concept" value={c.concept} onChange={v => set('examples', { concept: v })} />
          <div className="slide-editor__2col">
            <List label="Examples" items={c.examples} onChange={v => set('examples', { examples: v })} />
            <List label="Non-examples" items={c.nonExamples} onChange={v => set('examples', { nonExamples: v })} />
          </div>
          <Text label="Prompt" value={c.prompt} onChange={v => set('examples', { prompt: v })} />
        </div>
      )
    }
    case 'modelling': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Heading" value={c.heading} onChange={v => set('modelling', { heading: v })} />
          <Text label="Prompt (optional)" value={c.prompt} multiline onChange={v => set('modelling', { prompt: v })} />
        </div>
      )
    }
    case 'task': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Heading" value={c.heading} onChange={v => set('task', { heading: v })} />
          <Text label="Instructions" value={c.instructions} multiline onChange={v => set('task', { instructions: v })} />
          <List label="Questions" items={c.questions} numbered onChange={v => set('task', { questions: v })} />
        </div>
      )
    }
    case 'answers': {
      const c = slide.content
      return (
        <div className="slide-editor">
          <Text label="Heading" value={c.heading} onChange={v => set('answers', { heading: v })} />
          <label className="field">
            <span>Answers for</span>
            <select className="input" value={c.taskSlideId ?? ''} onChange={e => set('answers', { taskSlideId: e.target.value || undefined })}>
              <option value="">— not linked —</option>
              {taskSlides.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </label>
          <List label="Answers" items={c.answers} numbered onChange={v => set('answers', { answers: v })} />
        </div>
      )
    }
  }
}

// ── Field primitives ─────────────────────────────────────────────────────────

function Text({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <label className="field">
      <span>{label}</span>
      {multiline
        ? <textarea className="input" rows={2} value={value} onChange={e => onChange(e.target.value)} />
        : <input className="input" value={value} onChange={e => onChange(e.target.value)} />}
    </label>
  )
}

function List({ label, items, onChange, numbered }: { label: string; items: string[]; onChange: (v: string[]) => void; numbered?: boolean }) {
  const update = (i: number, v: string) => { const next = [...items]; next[i] = v; onChange(next) }
  return (
    <div className="field">
      <span>{label}</span>
      {items.map((item, i) => (
        <div key={i} className="list-item">
          <span className="list-item__marker">{numbered ? `${i + 1}.` : '•'}</span>
          <textarea className="input" rows={1} value={item} onChange={e => update(i, e.target.value)} />
          <button type="button" className="btn btn--icon btn--sm" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Remove">×</button>
        </div>
      ))}
      <button type="button" className="btn btn--sm list-add" onClick={() => onChange([...items, ''])}>+ Add</button>
    </div>
  )
}

function CommaList({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  return (
    <label className="field">
      <span>{label} <em className="muted">(comma separated)</em></span>
      <input className="input" value={items.join(', ')} onChange={e => onChange(e.target.value.split(',').map(s => s.trimStart()))} />
    </label>
  )
}

function QAList({ label, items, onChange }: { label: string; items: (QA & { sourceDeckId?: string })[]; onChange: (v: (QA & { sourceDeckId?: string })[]) => void }) {
  const update = (i: number, patch: Partial<QA>) => onChange(items.map((it, j) => j === i ? { ...it, ...patch } : it))
  return (
    <div className="field">
      <span>{label}</span>
      {items.map((item, i) => (
        <div key={i} className="qa-item">
          <span className="list-item__marker">{i + 1}.</span>
          <input className="input" value={item.q} placeholder="Question" onChange={e => update(i, { q: e.target.value })} />
          <input className="input" value={item.a} placeholder="Answer" onChange={e => update(i, { a: e.target.value })} />
          <button type="button" className="btn btn--icon btn--sm" onClick={() => onChange(items.filter((_, j) => j !== i))} aria-label="Remove">×</button>
        </div>
      ))}
      <button type="button" className="btn btn--sm list-add" onClick={() => onChange([...items, { q: '', a: '' }])}>+ Add question</button>
    </div>
  )
}
