import type { Slide, SlideContentMap, SlideType } from '../types'

export interface SlideTypeInfo {
  label: string
  description: string
  /** Whether the AI can fill it (modelling slides are intentionally blank) */
  aiFill: boolean
}

export const SLIDE_TYPES: Record<SlideType, SlideTypeInfo> = {
  title_recall: { label: 'Title + recall', description: 'Lesson title, objectives and starter questions from previous lessons', aiFill: true },
  vocab: { label: 'Vocabulary', description: 'Reciprocal reading: definition, use in a sentence, synonyms, antonyms, word parts', aiFill: true },
  hinge: { label: 'Hinge question', description: 'Mini-whiteboard multiple choice; each wrong option diagnoses a misconception', aiFill: true },
  info: { label: 'Information', description: 'Key teaching points with a note on what to show', aiFill: true },
  examples: { label: 'Examples / non-examples', description: 'Sort what is and is not an instance of the concept', aiFill: true },
  modelling: { label: 'Modelling (blank)', description: 'Blank space for live modelling on the board', aiFill: false },
  task: { label: 'Task', description: 'Independent practice questions', aiFill: true },
  answers: { label: 'Answers', description: 'Answers to a task slide', aiFill: true },
}

export const SLIDE_TYPE_ORDER: SlideType[] = [
  'title_recall', 'vocab', 'info', 'examples', 'hinge', 'modelling', 'task', 'answers',
]

export function emptyContent<K extends SlideType>(type: K): SlideContentMap[K] {
  const empty: SlideContentMap = {
    title_recall: { title: '', objectives: [''], recall: [] },
    vocab: { word: '', definition: '', inASentence: '', synonyms: [], antonyms: [], wordParts: '', studentTask: 'Use the word in a sentence of your own.' },
    hinge: { question: '', options: ['', '', '', ''], correctIndex: 0, diagnosis: ['', '', '', ''] },
    info: { heading: '', points: [''], visualNote: '' },
    examples: { concept: '', examples: [''], nonExamples: [''], prompt: 'Why is each one an example or a non-example?' },
    modelling: { heading: 'Watch me', prompt: '' },
    task: { heading: 'Task', instructions: '', questions: [''] },
    answers: { heading: 'Answers', answers: [''] },
  }
  return empty[type]
}

export function newSlide<K extends SlideType>(type: K, content?: SlideContentMap[K], aiGenerated = false): Slide {
  return {
    id: crypto.randomUUID(),
    type,
    content: content ?? emptyContent(type),
    notes: '',
    aiGenerated,
    edited: false,
  } as Slide
}

export function slideHeading(slide: Slide): string {
  switch (slide.type) {
    case 'title_recall': return slide.content.title || 'Untitled lesson'
    case 'vocab': return slide.content.word || 'Vocabulary'
    case 'hinge': return slide.content.question || 'Hinge question'
    case 'info': return slide.content.heading || 'Information'
    case 'examples': return slide.content.concept || 'Examples'
    case 'modelling': return slide.content.heading || 'Modelling'
    case 'task': return slide.content.heading || 'Task'
    case 'answers': return slide.content.heading || 'Answers'
  }
}

const list = (items: string[]) => items.filter(Boolean).map(i => `- ${i}`).join('\n')

/** Plain-text rendering used as AI context and in exports */
export function slideToText(slide: Slide): string {
  const c = slide.content
  switch (slide.type) {
    case 'title_recall': {
      const t = slide.content
      return `TITLE: ${t.title}\nObjectives:\n${list(t.objectives)}`
    }
    case 'vocab': {
      const v = slide.content
      return `KEY WORD: ${v.word}\nDefinition: ${v.definition}\nIn a sentence: ${v.inASentence}\nSynonyms: ${v.synonyms.join(', ')}\nAntonyms: ${v.antonyms.join(', ')}\nWord parts: ${v.wordParts}`
    }
    case 'hinge': {
      const h = slide.content
      return `HINGE QUESTION: ${h.question}\n${h.options.map((o, i) => `${'ABCD'[i]}. ${o}${i === h.correctIndex ? ' (correct)' : ''}`).join('\n')}`
    }
    case 'info': {
      const i = slide.content
      return `INFO: ${i.heading}\n${list(i.points)}`
    }
    case 'examples': {
      const e = slide.content
      return `EXAMPLES OF ${e.concept}:\n${list(e.examples)}\nNON-EXAMPLES:\n${list(e.nonExamples)}`
    }
    case 'modelling': {
      const m = slide.content
      return `MODELLING: ${m.heading}${m.prompt ? `\n${m.prompt}` : ''}`
    }
    case 'task': {
      const t = slide.content
      return `TASK: ${t.heading}\n${t.instructions}\n${t.questions.filter(Boolean).map((q, n) => `${n + 1}. ${q}`).join('\n')}`
    }
    case 'answers': {
      const a = slide.content
      return `ANSWERS: ${a.heading}\n${a.answers.filter(Boolean).map((q, n) => `${n + 1}. ${q}`).join('\n')}`
    }
  }
  return JSON.stringify(c)
}

export function slidesToText(slides: Slide[]): string {
  return slides.map((s, i) => `[Slide ${i + 1}]\n${slideToText(s)}`).join('\n\n')
}
