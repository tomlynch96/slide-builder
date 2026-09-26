import type { AppData } from '../types'

/**
 * Persistence boundary. Everything above this talks to AppData only, so
 * swapping localStorage for Firebase (Firestore) later means writing a new
 * adapter, not touching the UI.
 */
export interface StorageAdapter {
  load(): Promise<AppData>
  save(data: AppData): Promise<void>
}

export const EMPTY_DATA: AppData = {
  version: 1,
  sequences: [],
  decks: [],
  schemes: [],
  recallEvents: [],
}

const KEY = 'slide-builder:data'

export const localStorageAdapter: StorageAdapter = {
  async load() {
    try {
      const raw = localStorage.getItem(KEY)
      if (!raw) return EMPTY_DATA
      return { ...EMPTY_DATA, ...(JSON.parse(raw) as Partial<AppData>) }
    } catch {
      return EMPTY_DATA
    }
  },
  async save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data))
    } catch (err) {
      console.error('[storage] save failed', err)
    }
  },
}
