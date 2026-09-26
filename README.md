# Slide Builder

The slides companion to [worksheet-builder](https://github.com/tomlynch96/worksheet-builder). Teachers choose a slide type, AI fills the content, and the teacher amends it. Lessons are stored in ordered sequences against the same spec taxonomy as worksheet-builder, so the two apps can be linked later.

## Features

- **Sequences by design.** Every lesson belongs to a topic sequence (qualification + spec topic), and its position is stored in the sequence (`Sequence.deckIds`). Reorder lessons by dragging them or using ↑/↓.
- **Schemes.** Order topic sequences into a scheme of work. Recall then reaches back into every earlier topic in the scheme.
- **Slide types:**
  - Title + recall starter
  - Vocabulary (reciprocal reading: definition, use in a sentence, synonyms, antonyms, word parts)
  - Mini-whiteboard hinge question (each wrong option maps to a misconception)
  - Information
  - Examples / non-examples
  - Blank modelling
  - Task
  - Answers (linked to a task slide)
- **Reuse from earlier lessons.** The editor's *From earlier lessons* tab lets you browse slides of a given type from previous lessons in the topic, and optionally from earlier topics in a scheme. Adding one makes an independent copy that remembers where it came from (`slide.source`).
- **Review so far** (presenter, `Q`): generates questions that assess only slides 1 to the current slide. Question sets are cached per slide position.
- **Recall** (presenter, `R`): questions drawn from earlier lessons in the sequence and scheme, picking the least-recalled lessons first. An infographic shows how often each lesson has been recalled and how recently. Each generation is logged as a `RecallEvent`.
- **Edit signal.** Each slide records whether it was AI-generated and whether the teacher has since edited it. This feeds the planned confidence scoring.
- **Output:**
  - Present in the browser (←/→, `A` reveals answers, `F` fullscreen)
  - Export to `.pptx`
  - Print A4 handouts (3 slides per page with note lines, or 6 per page)

## Running locally

```bash
npm install
cp .env.example .env.local   # add your ANTHROPIC_API_KEY
npm run dev
```

`npm run dev` also serves the `/api` functions through a small Vite middleware, so you don't need the Vercel CLI. On Vercel they deploy as serverless functions. Set `ANTHROPIC_API_KEY` in the project's environment variables.

Without a key, the whole app still works except for AI generation, which shows an error. You can always add blank slides and fill them yourself.

## Architecture

| Path | What |
|---|---|
| `src/types.ts` | Data model: `Sequence`, `Deck`, `Slide` (typed union per slide type), `Scheme`, `RecallEvent` |
| `src/data/specs.ts` | Spec taxonomy, copied verbatim from worksheet-builder. Keep it in sync. |
| `src/store/storage.ts` | Persistence boundary (`StorageAdapter`). Currently localStorage. Firebase goes here. |
| `src/lib/sequence.ts` | Prior-lesson lookup (sequence + scheme), recall stats, spaced-recall selection |
| `src/lib/ai.ts` | Client calls to `/api`, building lesson context and recall sources |
| `api/` | Vercel functions. Claude structured outputs validated with zod schemas. |
| `src/lib/exportPptx.ts` | `.pptx` export via pptxgenjs (lazy-loaded) |

## Next steps

- Firebase adapter (Firestore + Auth) behind `StorageAdapter`
- Link lessons to worksheet-builder worksheets through the shared spec refs
- Images and diagrams on info/modelling slides
- Confidence scoring from the edit signal and post-use reflection
