// ── Slide content ────────────────────────────────────────────────────────────
// Each slide type has its own structured content. The teacher picks the type,
// AI fills the content, the teacher amends it.

export interface QA {
  q: string
  a: string
}

export interface TitleRecallContent {
  title: string
  objectives: string[]
  /** Starter questions drawn from previous lessons in the sequence/scheme */
  recall: (QA & { sourceDeckId?: string })[]
}

/** Reciprocal-reading style vocabulary slide */
export interface VocabContent {
  word: string
  definition: string
  inASentence: string
  synonyms: string[]
  antonyms: string[]
  wordParts: string
  studentTask: string
}

export interface HingeContent {
  question: string
  options: string[]
  correctIndex: number
  /** The misconception each wrong option diagnoses (same order as options) */
  diagnosis: string[]
}

export interface InfoContent {
  heading: string
  points: string[]
  /** What to draw / show alongside the points */
  visualNote: string
}

export interface ExamplesContent {
  concept: string
  examples: string[]
  nonExamples: string[]
  prompt: string
}

/** Blank slide for live modelling on the board */
export interface ModellingContent {
  heading: string
  prompt: string
}

export interface TaskContent {
  heading: string
  instructions: string
  questions: string[]
}

export interface AnswersContent {
  heading: string
  /** The task slide these answers belong to */
  taskSlideId?: string
  answers: string[]
}

export interface SlideContentMap {
  title_recall: TitleRecallContent
  vocab: VocabContent
  hinge: HingeContent
  info: InfoContent
  examples: ExamplesContent
  modelling: ModellingContent
  task: TaskContent
  answers: AnswersContent
}

export type SlideType = keyof SlideContentMap

export type Slide = {
  [K in SlideType]: {
    id: string
    type: K
    content: SlideContentMap[K]
    /** Speaker notes — not shown to the class */
    notes: string
    /** Edit signal: AI filled it, and whether the teacher has since amended it */
    aiGenerated: boolean
    edited: boolean
    /** Set when copied from a previous lesson */
    source?: { deckId: string; slideId: string }
  }
}[SlideType]

// ── Sequencing ───────────────────────────────────────────────────────────────

/** A generated set of review questions for "the lesson so far" */
export interface ReviewSet {
  id: string
  /** Questions cover slides [0, uptoIndex] */
  uptoIndex: number
  questions: QA[]
  createdAt: string
}

/** One lesson's slides. Belongs to exactly one sequence, in a fixed position. */
export interface Deck {
  id: string
  sequenceId: string
  title: string
  /** Spec point refs within the sequence's topic, e.g. ['2.3', '2.4'] */
  specPointRefs: string[]
  slides: Slide[]
  reviewSets: ReviewSet[]
  createdAt: string
  updatedAt: string
}

/**
 * The ordered lessons for one topic of one qualification. Lesson order lives
 * here (deckIds), so order is part of the saving structure, not metadata.
 */
export interface Sequence {
  id: string
  qualificationId: string
  topicRef: string
  deckIds: string[]
  createdAt: string
}

/** An ordered list of topic sequences, e.g. a Year 10 scheme of work */
export interface Scheme {
  id: string
  title: string
  sequenceIds: string[]
  createdAt: string
}

/**
 * Logged each time recall questions are generated. Counted per source lesson
 * to drive the "least recently recalled first" selection and the infographic.
 */
export interface RecallEvent {
  id: string
  /** The lesson the recall was generated for */
  forDeckId: string
  /** Lessons the questions were drawn from */
  sourceDeckIds: string[]
  createdAt: string
}

export interface AppData {
  version: 1
  sequences: Sequence[]
  decks: Deck[]
  schemes: Scheme[]
  recallEvents: RecallEvent[]
}
