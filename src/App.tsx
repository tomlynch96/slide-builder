import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SequencePage } from './pages/SequencePage'
import { DeckEditorPage } from './pages/DeckEditorPage'
import { PresentPage } from './pages/PresentPage'
import { SchemePage } from './pages/SchemePage'
import { PrintPage } from './pages/PrintPage'
import './App.css'

export default function App() {
  const { pathname } = useLocation()
  const chromeless = pathname.startsWith('/present/')

  return (
    <>
      {!chromeless && (
        <header className="topbar no-print">
          <Link to="/" className="topbar__brand">Slide Builder</Link>
          <span className="topbar__tag">The Worksheet Project</span>
        </header>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topic/:qualId/:topicRef" element={<SequencePage />} />
        <Route path="/deck/:deckId" element={<DeckEditorPage />} />
        <Route path="/present/:deckId" element={<PresentPage />} />
        <Route path="/print/:deckId" element={<PrintPage />} />
        <Route path="/scheme/:schemeId" element={<SchemePage />} />
        <Route path="*" element={<div className="page"><h1>Not found</h1><Link to="/">Home</Link></div>} />
      </Routes>
    </>
  )
}
