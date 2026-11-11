/**
 * Reader library (bookmarks + reading progress).
 *
 * For now this lives in React state for the current visit only. A later
 * milestone replaces the provider internals with per-account persistence;
 * components keep using `useLibrary()` unchanged.
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface LibraryState {
  bookmarks: string[]
  progress: Record<string, number>
  isBookmarked: (slug: string) => boolean
  toggleBookmark: (slug: string) => boolean
  setProgress: (slug: string, chapter: number) => void
}

const LibraryContext = createContext<LibraryState | null>(null)

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>(['ashes-of-the-velvet-crown'])
  const [progress, setProgressState] = useState<Record<string, number>>({
    'ashes-of-the-velvet-crown': 3,
  })

  const isBookmarked = useCallback((slug: string) => bookmarks.includes(slug), [bookmarks])

  const toggleBookmark = useCallback(
    (slug: string) => {
      const next = !bookmarks.includes(slug)
      setBookmarks((prev) => (next ? [...prev, slug] : prev.filter((s) => s !== slug)))
      return next
    },
    [bookmarks],
  )

  const setProgress = useCallback((slug: string, chapter: number) => {
    setProgressState((prev) => (prev[slug] === chapter ? prev : { ...prev, [slug]: chapter }))
  }, [])

  const value = useMemo(
    () => ({ bookmarks, progress, isBookmarked, toggleBookmark, setProgress }),
    [bookmarks, progress, isBookmarked, toggleBookmark, setProgress],
  )

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>
}

export function useLibrary(): LibraryState {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used inside <LibraryProvider>')
  return ctx
}
