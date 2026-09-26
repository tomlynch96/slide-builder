import type PptxGenJS from 'pptxgenjs'
import type { Deck, Slide } from '../types'

// Matches the on-screen slide theme (see --slide-* tokens in index.css)
const C = { text: '1F2937', heading: '111827', accent: '4F46E5', card: 'F3F4F6', muted: '6B7280', good: '15803D', bad: 'B91C1C' }
const FONT = 'Segoe UI'
const W = 13.333
const PAD = 0.6

type PptxSlide = PptxGenJS.Slide

const clean = (items: string[]) => items.filter(s => s.trim())
const bullets = (items: string[], numbered = false) =>
  clean(items).map(t => ({ text: t, options: { bullet: numbered ? { type: 'number' as const } : true, paraSpaceAfter: 8 } }))

function heading(s: PptxSlide, text: string, y = 0.45, size = 30) {
  s.addText(text, { x: PAD, y, w: W - PAD * 2, h: 0.9, fontFace: FONT, fontSize: size, bold: true, color: C.heading, valign: 'top', fit: 'shrink' })
}

function card(s: PptxSlide, x: number, y: number, w: number, h: number, title: string, body: string | ReturnType<typeof bullets>, border?: string) {
  s.addShape('roundRect', { x, y, w, h, fill: { color: C.card }, line: { color: border ?? C.card, width: border ? 2 : 0 }, rectRadius: 0.1 })
  s.addText(title, { x: x + 0.2, y: y + 0.12, w: w - 0.4, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.accent })
  s.addText(body, { x: x + 0.2, y: y + 0.55, w: w - 0.4, h: h - 0.7, fontFace: FONT, fontSize: 16, color: C.text, valign: 'top', fit: 'shrink' })
}

function renderSlide(s: PptxSlide, slide: Slide) {
  switch (slide.type) {
    case 'title_recall': {
      const c = slide.content
      const hasRecall = c.recall.length > 0
      const mainW = hasRecall ? 6.6 : W - PAD * 2
      s.addText(c.title, { x: PAD, y: 1.2, w: mainW, h: 1.6, fontFace: FONT, fontSize: 40, bold: true, color: C.heading, valign: 'bottom', fit: 'shrink' })
      s.addText('OBJECTIVES', { x: PAD, y: 3.1, w: mainW, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.accent })
      s.addText(bullets(c.objectives), { x: PAD, y: 3.5, w: mainW, h: 3, fontFace: FONT, fontSize: 18, color: C.text, valign: 'top' })
      if (hasRecall) card(s, 7.6, 0.6, W - 7.6 - PAD, 6.3, 'DO NOW', bullets(c.recall.map(r => r.q), true))
      break
    }
    case 'vocab': {
      const c = slide.content
      s.addText(c.word, { x: PAD, y: 0.4, w: W - PAD * 2, h: 1, fontFace: FONT, fontSize: 44, bold: true, color: C.heading })
      s.addText(c.definition, { x: PAD, y: 1.4, w: W - PAD * 2, h: 0.8, fontFace: FONT, fontSize: 20, color: C.text, fit: 'shrink' })
      const cw = (W - PAD * 2 - 0.3) / 2
      card(s, PAD, 2.35, cw, 1.8, 'Use it in a sentence', c.inASentence)
      card(s, PAD + cw + 0.3, 2.35, cw, 1.8, 'Word parts', c.wordParts)
      card(s, PAD, 4.35, cw, 1.5, 'Synonyms', clean(c.synonyms).join(', ') || '—')
      card(s, PAD + cw + 0.3, 4.35, cw, 1.5, 'Antonyms', clean(c.antonyms).join(', ') || '—')
      if (c.studentTask) s.addText(`✏️ ${c.studentTask}`, { x: PAD, y: 6.2, w: W - PAD * 2, h: 0.6, fontFace: FONT, fontSize: 18, bold: true, color: C.text })
      break
    }
    case 'hinge': {
      const c = slide.content
      s.addText('MINI-WHITEBOARDS', { x: PAD, y: 0.35, w: 6, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: C.accent })
      heading(s, c.question, 0.75, 28)
      const cw = (W - PAD * 2 - 0.4) / 2
      c.options.forEach((o, i) => {
        const x = PAD + (i % 2) * (cw + 0.4)
        const y = 2.6 + Math.floor(i / 2) * 2
        s.addShape('roundRect', { x, y, w: cw, h: 1.7, fill: { color: C.card }, line: { color: C.card, width: 0 }, rectRadius: 0.1 })
        s.addShape('ellipse', { x: x + 0.25, y: y + 0.5, w: 0.7, h: 0.7, fill: { color: C.accent }, line: { color: C.accent, width: 0 } })
        s.addText('ABCD'[i], { x: x + 0.25, y: y + 0.5, w: 0.7, h: 0.7, align: 'center', valign: 'middle', fontFace: FONT, fontSize: 20, bold: true, color: 'FFFFFF' })
        s.addText(o, { x: x + 1.15, y: y + 0.15, w: cw - 1.35, h: 1.4, fontFace: FONT, fontSize: 20, color: C.text, valign: 'middle', fit: 'shrink' })
      })
      break
    }
    case 'info': {
      const c = slide.content
      heading(s, c.heading)
      const hasVisual = !!c.visualNote.trim()
      s.addText(bullets(c.points), { x: PAD, y: 1.5, w: hasVisual ? 7.2 : W - PAD * 2, h: 5.4, fontFace: FONT, fontSize: 20, color: C.text, valign: 'top', fit: 'shrink' })
      if (hasVisual) {
        s.addShape('roundRect', { x: 8.2, y: 1.5, w: W - 8.2 - PAD, h: 5.2, fill: { color: 'FFFFFF' }, line: { color: C.muted, width: 1.5, dashType: 'dash' }, rectRadius: 0.1 })
        s.addText(c.visualNote, { x: 8.4, y: 1.7, w: W - 8.6 - PAD, h: 4.8, fontFace: FONT, fontSize: 14, italic: true, color: C.muted, align: 'center', valign: 'middle' })
      }
      break
    }
    case 'examples': {
      const c = slide.content
      heading(s, c.concept)
      const cw = (W - PAD * 2 - 0.4) / 2
      card(s, PAD, 1.5, cw, 4.4, '✓ Examples', bullets(c.examples), C.good)
      card(s, PAD + cw + 0.4, 1.5, cw, 4.4, '✗ Non-examples', bullets(c.nonExamples), C.bad)
      if (c.prompt) s.addText(c.prompt, { x: PAD, y: 6.15, w: W - PAD * 2, h: 0.7, fontFace: FONT, fontSize: 18, bold: true, color: C.text })
      break
    }
    case 'modelling': {
      const c = slide.content
      heading(s, c.heading, 0.35, 22)
      if (c.prompt) s.addText(c.prompt, { x: PAD, y: 1.1, w: W - PAD * 2, h: 0.8, fontFace: FONT, fontSize: 16, color: C.muted })
      break
    }
    case 'task': {
      const c = slide.content
      heading(s, c.heading)
      if (c.instructions) s.addText(c.instructions, { x: PAD, y: 1.3, w: W - PAD * 2, h: 0.6, fontFace: FONT, fontSize: 18, italic: true, color: C.text })
      s.addText(bullets(c.questions, true), { x: PAD, y: 2, w: W - PAD * 2, h: 5, fontFace: FONT, fontSize: 20, color: C.text, valign: 'top', fit: 'shrink' })
      break
    }
    case 'answers': {
      const c = slide.content
      heading(s, c.heading)
      s.addText(bullets(c.answers, true), { x: PAD, y: 1.5, w: W - PAD * 2, h: 5.5, fontFace: FONT, fontSize: 20, color: C.text, valign: 'top', fit: 'shrink' })
      break
    }
  }
}

function fileName(title: string) {
  return (title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-') || 'lesson') + '.pptx'
}

export async function exportDeckToPptx(deck: Deck) {
  // Loaded on demand: pptxgenjs is large and only needed for export
  const { default: PptxGenJS } = await import('pptxgenjs')
  const pres = new PptxGenJS()
  pres.layout = 'LAYOUT_WIDE'
  pres.title = deck.title

  for (const slide of deck.slides) {
    const s = pres.addSlide()
    s.background = { color: 'FFFFFF' }
    renderSlide(s, slide)
    const notes = [
      slide.notes,
      slide.type === 'title_recall' && slide.content.recall.length
        ? `Do now answers:\n${slide.content.recall.map((r, i) => `${i + 1}. ${r.a}`).join('\n')}` : '',
      slide.type === 'hinge'
        ? `Correct: ${'ABCD'[slide.content.correctIndex]}\n${slide.content.options.map((_, i) => `${'ABCD'[i]}: ${slide.content.diagnosis[i] ?? ''}`).join('\n')}` : '',
    ].filter(Boolean).join('\n\n')
    if (notes) s.addNotes(notes)
  }

  await pres.writeFile({ fileName: fileName(deck.title) })
}
