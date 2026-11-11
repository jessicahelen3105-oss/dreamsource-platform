/**
 * Catalog queries. The UI only talks to these helpers, never to the fixtures
 * directly, so they are the single seam to swap for database-backed server
 * functions in a later milestone (see PLAN.md).
 */
import {
  authors,
  genres,
  novels,
  sampleProse,
  type Author,
  type Genre,
  type GenreId,
  type Novel,
} from './fixtures'

export type { Author, Genre, GenreId, Novel } from './fixtures'
export type { ChapterMeta, NovelStatus } from './fixtures'

export type SortKey = 'trending' | 'rating' | 'newest' | 'reads'

export interface NovelQuery {
  q?: string
  genre?: GenreId
  status?: 'ongoing' | 'completed'
  sort?: SortKey
}

export function listGenres(): Genre[] {
  return genres
}

export function getGenre(id: string): Genre | undefined {
  return genres.find((g) => g.id === id)
}

export function getAuthor(id: string): Author | undefined {
  return authors.find((a) => a.id === id)
}

export function listAuthors(): Author[] {
  return authors
}

export function getNovel(slug: string): Novel | undefined {
  return novels.find((n) => n.slug === slug)
}

export function featuredNovels(): Novel[] {
  return novels.filter((n) => n.featured)
}

export function trendingNovels(limit = 6): Novel[] {
  return [...novels].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, limit)
}

export function recentlyUpdated(limit = 4): Novel[] {
  return [...novels]
    .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt))
    .slice(0, limit)
}

export function novelsByAuthor(authorId: string): Novel[] {
  return novels.filter((n) => n.authorId === authorId)
}

export function countByGenre(id: GenreId): number {
  return novels.filter((n) => n.genres.includes(id)).length
}

export function searchNovels(query: NovelQuery = {}): Novel[] {
  const q = query.q?.trim().toLowerCase()
  let result = novels.filter((n) => {
    if (query.genre && !n.genres.includes(query.genre)) return false
    if (query.status && n.status !== query.status) return false
    if (!q) return true
    const author = getAuthor(n.authorId)
    const haystack = [n.title, n.tagline, n.synopsis, author?.name ?? '', ...n.tags]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
  const sort = query.sort ?? 'trending'
  result = [...result].sort((a, b) => {
    switch (sort) {
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return +new Date(b.updatedAt) - +new Date(a.updatedAt)
      case 'reads':
        return b.reads - a.reads
      default:
        return b.trendingScore - a.trendingScore
    }
  })
  return result
}

export function searchAuthors(q: string): Author[] {
  const term = q.trim().toLowerCase()
  if (!term) return []
  return authors.filter((a) => `${a.name} ${a.handle}`.toLowerCase().includes(term))
}

/** Paragraphs for a chapter. Chapter 1 has bespoke prose; others use samples. */
export function getChapterContent(novel: Novel, chapterNumber: number): string[] {
  if (chapterNumber === 1) return novel.opening
  const offset = (chapterNumber * 3 + novel.title.length) % sampleProse.length
  return Array.from({ length: 7 }, (_, i) => sampleProse[(offset + i) % sampleProse.length]!)
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  return String(n)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
