import type { Slide } from '../types'
import './SlideView.css'

interface Props {
  slide: Slide
  /** Show answers on recall / hinge slides */
  reveal?: boolean
  className?: string
}

const nonEmpty = (items: string[]) => items.filter(s => s.trim())

/** Fixed 16:9 slide that scales with its container (thumbnails → full screen) */
export function SlideView({ slide, reveal = false, className = '' }: Props) {
  return (
    <div className={`slide slide--${slide.type} ${className}`}>
      <div className="slide__inner">
        <SlideBody slide={slide} reveal={reveal} />
      </div>
    </div>
  )
}

function SlideBody({ slide, reveal }: { slide: Slide; reveal: boolean }) {
  switch (slide.type) {
    case 'title_recall': {
      const c = slide.content
      return (
        <div className="s-title">
          <div className="s-title__main">
            <h1>{c.title || 'Lesson title'}</h1>
            <h3>Objectives</h3>
            <ul>{nonEmpty(c.objectives).map((o, i) => <li key={i}>{o}</li>)}</ul>
          </div>
          {c.recall.length > 0 && (
            <div className="s-title__recall">
              <h3>Do now</h3>
              <ol>
                {c.recall.map((r, i) => (
                  <li key={i}>{r.q}{reveal && <span className="s-answer">{r.a}</span>}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )
    }
    case 'vocab': {
      const c = slide.content
      return (
        <div className="s-vocab">
          <h1 className="s-vocab__word">{c.word || 'Key word'}</h1>
          <p className="s-vocab__def">{c.definition}</p>
          <div className="s-vocab__grid">
            <div className="s-card"><h4>Use it in a sentence</h4><p>{c.inASentence}</p></div>
            <div className="s-card"><h4>Word parts</h4><p>{c.wordParts}</p></div>
            <div className="s-card"><h4>Synonyms</h4><p>{nonEmpty(c.synonyms).join(', ') || '—'}</p></div>
            <div className="s-card"><h4>Antonyms</h4><p>{nonEmpty(c.antonyms).join(', ') || '—'}</p></div>
          </div>
          {c.studentTask && <p className="s-prompt">✏️ {c.studentTask}</p>}
        </div>
      )
    }
    case 'hinge': {
      const c = slide.content
      return (
        <div className="s-hinge">
          <p className="s-kicker">Mini-whiteboards</p>
          <h2>{c.question || 'Hinge question'}</h2>
          <div className="s-hinge__options">
            {c.options.map((o, i) => (
              <div key={i} className={`s-hinge__opt ${reveal && i === c.correctIndex ? 'is-correct' : ''}`}>
                <span className="s-hinge__letter">{'ABCD'[i]}</span>{o}
              </div>
            ))}
          </div>
        </div>
      )
    }
    case 'info': {
      const c = slide.content
      return (
        <div className="s-info">
          <h2>{c.heading || 'Heading'}</h2>
          <div className="s-info__body">
            <ul>{nonEmpty(c.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
            {c.visualNote && <div className="s-info__visual">{c.visualNote}</div>}
          </div>
        </div>
      )
    }
    case 'examples': {
      const c = slide.content
      return (
        <div className="s-examples">
          <h2>{c.concept || 'Concept'}</h2>
          <div className="s-examples__cols">
            <div className="s-card s-card--yes"><h4>✓ Examples</h4><ul>{nonEmpty(c.examples).map((e, i) => <li key={i}>{e}</li>)}</ul></div>
            <div className="s-card s-card--no"><h4>✗ Non-examples</h4><ul>{nonEmpty(c.nonExamples).map((e, i) => <li key={i}>{e}</li>)}</ul></div>
          </div>
          {c.prompt && <p className="s-prompt">{c.prompt}</p>}
        </div>
      )
    }
    case 'modelling': {
      const c = slide.content
      return (
        <div className="s-modelling">
          <h2>{c.heading}</h2>
          {c.prompt && <p>{c.prompt}</p>}
        </div>
      )
    }
    case 'task': {
      const c = slide.content
      return (
        <div className="s-task">
          <h2>{c.heading || 'Task'}</h2>
          {c.instructions && <p className="s-task__instr">{c.instructions}</p>}
          <ol>{nonEmpty(c.questions).map((q, i) => <li key={i}>{q}</li>)}</ol>
        </div>
      )
    }
    case 'answers': {
      const c = slide.content
      return (
        <div className="s-task s-answers">
          <h2>{c.heading || 'Answers'}</h2>
          <ol>{nonEmpty(c.answers).map((a, i) => <li key={i}>{a}</li>)}</ol>
        </div>
      )
    }
  }
}
