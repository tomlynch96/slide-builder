import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { AppData, Deck, RecallEvent, Scheme, Sequence } from '../types'
import { EMPTY_DATA, localStorageAdapter, type StorageAdapter } from './storage'
import { move } from '../lib/sequence'

const now = () => new Date().toISOString()

function useStoreValue(adapter: StorageAdapter) {
  const [data, setData] = useState<AppData>(EMPTY_DATA)
  const [loaded, setLoaded] = useState(false)
  const skipSave = useRef(true)

  useEffect(() => {
    adapter.load().then(d => { setData(d); setLoaded(true) })
  }, [adapter])

  useEffect(() => {
    if (!loaded) return
    // Don't write back the data we just loaded
    if (skipSave.current) { skipSave.current = false; return }
    adapter.save(data)
  }, [adapter, data, loaded])

  const ensureSequence = useCallback((qualificationId: string, topicRef: string): string => {
    const existing = data.sequences.find(s => s.qualificationId === qualificationId && s.topicRef === topicRef)
    if (existing) return existing.id
    const seq: Sequence = { id: crypto.randomUUID(), qualificationId, topicRef, deckIds: [], createdAt: now() }
    setData(d => ({ ...d, sequences: [...d.sequences, seq] }))
    return seq.id
  }, [data.sequences])

  const createDeck = useCallback((sequenceId: string, title: string, specPointRefs: string[]): string => {
    const deck: Deck = {
      id: crypto.randomUUID(), sequenceId, title, specPointRefs,
      slides: [], reviewSets: [], createdAt: now(), updatedAt: now(),
    }
    setData(d => ({
      ...d,
      decks: [...d.decks, deck],
      sequences: d.sequences.map(s => s.id === sequenceId ? { ...s, deckIds: [...s.deckIds, deck.id] } : s),
    }))
    return deck.id
  }, [])

  const updateDeck = useCallback((deckId: string, update: (deck: Deck) => Deck) => {
    setData(d => ({
      ...d,
      decks: d.decks.map(k => k.id === deckId ? { ...update(k), updatedAt: now() } : k),
    }))
  }, [])

  const deleteDeck = useCallback((deckId: string) => {
    setData(d => ({
      ...d,
      decks: d.decks.filter(k => k.id !== deckId),
      sequences: d.sequences.map(s => ({ ...s, deckIds: s.deckIds.filter(id => id !== deckId) })),
    }))
  }, [])

  const moveDeck = useCallback((sequenceId: string, from: number, to: number) => {
    setData(d => ({
      ...d,
      sequences: d.sequences.map(s => s.id === sequenceId ? { ...s, deckIds: move(s.deckIds, from, to) } : s),
    }))
  }, [])

  const createScheme = useCallback((title: string): string => {
    const scheme: Scheme = { id: crypto.randomUUID(), title, sequenceIds: [], createdAt: now() }
    setData(d => ({ ...d, schemes: [...d.schemes, scheme] }))
    return scheme.id
  }, [])

  const updateScheme = useCallback((schemeId: string, update: (s: Scheme) => Scheme) => {
    setData(d => ({ ...d, schemes: d.schemes.map(s => s.id === schemeId ? update(s) : s) }))
  }, [])

  const deleteScheme = useCallback((schemeId: string) => {
    setData(d => ({ ...d, schemes: d.schemes.filter(s => s.id !== schemeId) }))
  }, [])

  const logRecall = useCallback((forDeckId: string, sourceDeckIds: string[]) => {
    if (sourceDeckIds.length === 0) return
    const event: RecallEvent = { id: crypto.randomUUID(), forDeckId, sourceDeckIds, createdAt: now() }
    setData(d => ({ ...d, recallEvents: [...d.recallEvents, event] }))
  }, [])

  return useMemo(() => ({
    data, loaded,
    ensureSequence, createDeck, updateDeck, deleteDeck, moveDeck,
    createScheme, updateScheme, deleteScheme, logRecall,
  }), [data, loaded, ensureSequence, createDeck, updateDeck, deleteDeck, moveDeck, createScheme, updateScheme, deleteScheme, logRecall])
}

type Store = ReturnType<typeof useStoreValue>

const StoreContext = createContext<Store | null>(null)

export function AppStoreProvider({ children, adapter = localStorageAdapter }: { children: ReactNode; adapter?: StorageAdapter }) {
  const store = useStoreValue(adapter)
  if (!store.loaded) return null
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore(): Store {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used inside AppStoreProvider')
  return store
}
