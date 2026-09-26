# Slide Builder — Project Context

Companion to `tomlynch96/worksheet-builder` (The Worksheet Project). Same philosophy: systematic, sequenced teaching; AI is the cold-start, teacher refinement is the signal. See that repo's CLAUDE.md for the full vision (confidence scoring, corpus, partnerships).

## What this app does

Teachers build lesson slide decks by choosing a slide type; AI fills the content; the teacher amends it.

1. **Sequences are structural.** A `Deck` (lesson) always belongs to one `Sequence` (qualification + spec topic). Lesson order is `Sequence.deckIds`, not a field on the deck. A `Scheme` orders sequences.
2. **Reuse within the sequence.** When editing, teachers browse slides of a given type from earlier lessons and add copies (copies keep `source` for future confidence scoring).
3. **Review so far.** In presenter mode, generates questions assessing only slides `0..current`.
4. **Recall.** Pulls from all earlier lessons in the sequence and in earlier topics of any scheme containing it; least-recalled first. Each generation logs a `RecallEvent`; the infographic counts events per lesson, coloured by recency.

## Conventions

- React 19 + TypeScript + Vite, plain CSS with custom properties, React Router. No CSS-in-JS.
- Slides render with `SlideView` at 16:9 using `cqw` units so the same component serves thumbnails, presenter and print.
- The spec taxonomy (`src/data/specs.ts`) is copied from worksheet-builder. Keep refs identical, because they are the join key for linking the two apps.
- All persistence goes through `StorageAdapter` (`src/store/storage.ts`). Currently localStorage; Firebase is planned. Don't call localStorage for app data elsewhere.
- AI calls live in `api/*.ts` (Vercel functions, also served locally by the Vite plugin in `vite.config.ts`). Use structured outputs (zod schema + `betaZodOutputFormat`), never regex-parsed free text. `ANTHROPIC_API_KEY` is server-only.
- Every slide tracks `aiGenerated` / `edited`. Preserve this when adding new edit paths.

## Checks

`npm run lint`, `npm run build` (runs `tsc -b`).
