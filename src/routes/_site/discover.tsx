import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import { BookMarked, Compass, SearchX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NovelCard } from '@/components/dq/novel-card'
import { SearchBar } from '@/components/dq/search-bar'
import {
  getGenre,
  getNovel,
  listGenres,
  novelsByAuthor,
  searchAuthors,
  searchNovels,
  type GenreId,
  type SortKey,
} from '@/lib/catalog'
import { useLibrary } from '@/lib/library'
import { cn } from '@/lib/utils'

interface DiscoverSearch {
  q?: string
  genre?: GenreId
  status?: 'ongoing' | 'completed'
  sort?: SortKey
  shelf?: 'library'
}

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'trending', label: 'Trending' },
  { value: 'rating', label: 'Highest rated' },
  { value: 'reads', label: 'Most read' },
  { value: 'newest', label: 'Recently updated' },
]

export const Route = createFileRoute('/_site/discover')({
  validateSearch: (search: Record<string, unknown>): DiscoverSearch => {
    const genreIds = listGenres().map((g) => g.id) as string[]
    const sorts = sortOptions.map((s) => s.value) as string[]
    return {
      q: typeof search.q === 'string' && search.q.trim() ? search.q : undefined,
      genre:
        typeof search.genre === 'string' && genreIds.includes(search.genre)
          ? (search.genre as GenreId)
          : undefined,
      status:
        search.status === 'ongoing' || search.status === 'completed' ? search.status : undefined,
      sort: typeof search.sort === 'string' && sorts.includes(search.sort) ? (search.sort as SortKey) : undefined,
      shelf: search.shelf === 'library' ? 'library' : undefined,
    }
  },
  head: () => ({ meta: [{ title: 'Discover novels — DreamQuill' }] }),
  component: Discover,
})

function Discover() {
  const search = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const { bookmarks, progress } = useLibrary()

  const update = (patch: Partial<DiscoverSearch>) =>
    void navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true })

  const isLibrary = search.shelf === 'library'
  let results = searchNovels(search)
  if (isLibrary) results = results.filter((n) => bookmarks.includes(n.slug))
  const authorMatches = search.q && !isLibrary ? searchAuthors(search.q) : []
  const activeGenre = search.genre ? getGenre(search.genre) : undefined
  const hasFilters = Boolean(search.q || search.genre || search.status)

  const continueReading = isLibrary
    ? Object.entries(progress)
        .map(([slug, chapter]) => ({ novel: getNovel(slug), chapter }))
        .filter((e) => e.novel && bookmarks.includes(e.novel.slug))
    : []

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
          {isLibrary ? <BookMarked className="size-3.5" aria-hidden /> : <Compass className="size-3.5" aria-hidden />}
          {isLibrary ? 'Your reading library' : 'Discover'}
        </p>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">
          {isLibrary
            ? 'My Library'
            : search.q
              ? <>Results for “<span className="text-primary">{search.q}</span>”</>
              : activeGenre
                ? `${activeGenre.name} Novels`
                : 'Discover Stories'}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {isLibrary
            ? 'Novels you’ve bookmarked, ready whenever you are.'
            : activeGenre
              ? activeGenre.blurb
              : 'Search by title, author or trope, then narrow down by genre and status.'}
        </p>
        <div className="mt-6 max-w-2xl">
          <SearchBar key={search.q ?? ''} defaultValue={search.q ?? ''} />
        </div>
      </header>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]" role="group" aria-label="Filter by genre">
        <GenreChip active={!search.genre} onClick={() => update({ genre: undefined })}>
          All genres
        </GenreChip>
        {listGenres().map((g) => (
          <GenreChip key={g.id} active={search.genre === g.id} onClick={() => update({ genre: g.id })}>
            {g.name}
          </GenreChip>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-primary/10 py-4">
        <div className="flex items-center gap-2" role="group" aria-label="Filter by status">
          {(
            [
              [undefined, 'Any status'],
              ['ongoing', 'Ongoing'],
              ['completed', 'Completed'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => update({ status: value })}
              aria-pressed={search.status === value}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                search.status === value ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {results.length} {results.length === 1 ? 'novel' : 'novels'}
          </span>
          <Select value={search.sort ?? 'trending'} onValueChange={(v) => update({ sort: v as SortKey })}>
            <SelectTrigger className="w-44" aria-label="Sort novels">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {continueReading.length > 0 && (
        <section aria-labelledby="continue-heading" className="mb-10">
          <h2 id="continue-heading" className="mb-4 font-display text-2xl font-semibold">
            Continue reading
          </h2>
          <div className="flex flex-wrap gap-3">
            {continueReading.map(({ novel, chapter }) => (
              <Button key={novel!.slug} variant="outline" className="h-auto border-primary/30 py-2" asChild>
                <Link to="/read/$slug/$chapter" params={{ slug: novel!.slug, chapter: String(chapter) }}>
                  <span className="text-left">
                    <span className="block font-display text-base">{novel!.title}</span>
                    <span className="block text-xs text-muted-foreground">Chapter {chapter}</span>
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </section>
      )}

      {authorMatches.length > 0 && (
        <section aria-labelledby="authors-heading" className="mb-10">
          <h2 id="authors-heading" className="mb-4 font-display text-2xl font-semibold">
            Authors
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {authorMatches.map((a) => {
              const first = novelsByAuthor(a.id)[0]
              return (
                <li key={a.id} className="flex items-center gap-3 rounded-xl border border-primary/15 bg-card/60 p-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                    {a.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold">{a.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.bio}</p>
                    {first && (
                      <Link to="/novel/$slug" params={{ slug: first.slug }} className="text-xs text-primary hover:underline">
                        Read {first.title}
                      </Link>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((n) => (
            <NovelCard key={n.slug} novel={n} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-primary/25 px-6 py-16 text-center">
          {isLibrary ? <BookMarked className="size-10 text-primary" aria-hidden /> : <SearchX className="size-10 text-primary" aria-hidden />}
          <h2 className="mt-4 font-display text-3xl font-semibold">
            {isLibrary ? 'Your library is waiting' : 'No stories found'}
          </h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            {isLibrary
              ? 'Tap the bookmark on any novel to keep it here for later.'
              : 'Try a different word, or clear your filters to wander the whole collection.'}
          </p>
          <Button className="mt-6" asChild>
            <Link to="/discover">{isLibrary ? 'Browse novels' : 'Clear filters'}</Link>
          </Button>
        </div>
      )}

      {hasFilters && results.length > 0 && (
        <div className="mt-10 text-center">
          <Button variant="ghost" className="text-muted-foreground" asChild>
            <Link to="/discover" search={isLibrary ? { shelf: 'library' as const } : {}}>
              <X aria-hidden /> Clear all filters
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}

function GenreChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-primary/25 text-foreground/80 hover:border-primary hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
