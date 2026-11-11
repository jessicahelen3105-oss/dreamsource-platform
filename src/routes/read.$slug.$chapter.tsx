import { useEffect, useState } from 'react'
import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  List,
  Minus,
  Plus,
  Type,
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LogoMark } from '@/components/dq/logo'
import { formatDate, getAuthor, getChapterContent, getNovel } from '@/lib/catalog'
import { useLibrary } from '@/lib/library'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/read/$slug/$chapter')({
  loader: ({ params }) => {
    const novel = getNovel(params.slug)
    const number = Number(params.chapter)
    if (!novel || !Number.isInteger(number) || !novel.chapters.some((c) => c.number === number)) {
      throw notFound()
    }
    return { slug: novel.slug, number }
  },
  head: ({ loaderData }) => {
    const novel = loaderData ? getNovel(loaderData.slug) : undefined
    const chapter = novel?.chapters.find((c) => c.number === loaderData?.number)
    return {
      meta:
        novel && chapter
          ? [{ title: `Ch. ${chapter.number}: ${chapter.title} · ${novel.title} — DreamQuill` }]
          : [],
    }
  },
  component: Reader,
})

type ReaderTheme = 'midnight' | 'parchment'
type ReaderFont = 'serif' | 'sans'
interface ReaderPrefs {
  size: number
  theme: ReaderTheme
  font: ReaderFont
}
const PREFS_KEY = 'dq-reader-prefs'
const defaultPrefs: ReaderPrefs = { size: 19, theme: 'midnight', font: 'serif' }

function Reader() {
  const { slug, number } = Route.useLoaderData()
  const novel = getNovel(slug)!
  const chapter = novel.chapters.find((c) => c.number === number)!
  const paragraphs = getChapterContent(novel, number)
  const author = getAuthor(novel.authorId)
  const prev = novel.chapters.find((c) => c.number === number - 1)
  const next = novel.chapters.find((c) => c.number === number + 1)

  const { isBookmarked, toggleBookmark, setProgress } = useLibrary()
  const saved = isBookmarked(novel.slug)

  const [prefs, setPrefs] = useState<ReaderPrefs>(defaultPrefs)
  const [scroll, setScroll] = useState(0)

  // Reading preferences are a per-device UI setting, so they live in localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PREFS_KEY)
      if (raw) setPrefs({ ...defaultPrefs, ...(JSON.parse(raw) as Partial<ReaderPrefs>) })
    } catch {
      /* ignore malformed prefs */
    }
  }, [])

  const updatePrefs = (patch: Partial<ReaderPrefs>) => {
    setPrefs((p) => {
      const nextPrefs = { ...p, ...patch }
      try {
        localStorage.setItem(PREFS_KEY, JSON.stringify(nextPrefs))
      } catch {
        /* storage unavailable */
      }
      return nextPrefs
    })
  }

  useEffect(() => {
    setProgress(novel.slug, number)
  }, [novel.slug, number, setProgress])

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScroll(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [number])

  const parchment = prefs.theme === 'parchment'

  return (
    <div
      className={cn(
        'min-h-screen transition-colors duration-300 motion-reduce:transition-none',
        parchment ? 'bg-parchment text-ink' : 'bg-background text-foreground',
      )}
    >
      <header
        className={cn(
          'sticky top-0 z-30 border-b backdrop-blur-xl',
          parchment ? 'border-ink/10 bg-parchment/90' : 'border-primary/15 bg-background/85',
        )}
      >
        <div className="mx-auto flex h-14 max-w-content items-center gap-2 px-3 sm:px-6">
          <Button variant="ghost" size="icon" asChild aria-label={`Back to ${novel.title}`}>
            <Link to="/novel/$slug" params={{ slug: novel.slug }}>
              <ArrowLeft />
            </Link>
          </Button>
          <Link to="/" aria-label="DreamQuill home" className="hidden sm:block">
            <LogoMark className={cn('size-8', parchment && 'mix-blend-normal')} />
          </Link>
          <div className="min-w-0 flex-1 px-1">
            <p className="truncate font-display text-base font-semibold leading-tight sm:text-lg">{novel.title}</p>
            <p className={cn('truncate text-xs', parchment ? 'text-ink/60' : 'text-muted-foreground')}>
              Chapter {chapter.number} of {novel.chapters.length}
            </p>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Chapter list">
                <List />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 border-primary/20 bg-background text-foreground">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">{novel.title}</SheetTitle>
                <SheetDescription>by {author?.name}</SheetDescription>
              </SheetHeader>
              <ol className="overflow-y-auto px-2 pb-6">
                {novel.chapters.map((c) => (
                  <li key={c.number}>
                    <Link
                      to="/read/$slug/$chapter"
                      params={{ slug: novel.slug, chapter: String(c.number) }}
                      className={cn(
                        'flex gap-3 rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-primary/10',
                        c.number === number && 'bg-primary/15 text-primary',
                      )}
                    >
                      <span className="w-6 shrink-0 font-display text-base text-primary/80">{c.number}</span>
                      <span>{c.title}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </SheetContent>
          </Sheet>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Reading settings">
                <Type />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-72 space-y-5 border-primary/20">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">Text size</p>
                <div className="flex items-center justify-between gap-3">
                  <Button variant="outline" size="icon-sm" aria-label="Decrease text size" disabled={prefs.size <= 15} onClick={() => updatePrefs({ size: prefs.size - 1 })}>
                    <Minus />
                  </Button>
                  <span className="text-sm tabular-nums">{prefs.size}px</span>
                  <Button variant="outline" size="icon-sm" aria-label="Increase text size" disabled={prefs.size >= 26} onClick={() => updatePrefs({ size: prefs.size + 1 })}>
                    <Plus />
                  </Button>
                </div>
              </div>
              <SegmentedSetting
                label="Page"
                value={prefs.theme}
                options={[
                  ['midnight', 'Midnight'],
                  ['parchment', 'Parchment'],
                ]}
                onChange={(v) => updatePrefs({ theme: v })}
              />
              <SegmentedSetting
                label="Typeface"
                value={prefs.font}
                options={[
                  ['serif', 'Serif'],
                  ['sans', 'Sans'],
                ]}
                onChange={(v) => updatePrefs({ font: v })}
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            aria-pressed={saved}
            aria-label={saved ? 'Remove from library' : 'Add to library'}
            onClick={() => {
              const added = toggleBookmark(novel.slug)
              toast(added ? 'Added to your library' : 'Removed from your library')
            }}
          >
            {saved ? <BookmarkCheck className="text-primary" /> : <Bookmark />}
          </Button>
        </div>
        <div
          className="h-0.5 origin-left bg-gradient-to-r from-burgundy via-primary to-gold-bright"
          style={{ transform: `scaleX(${scroll})` }}
          role="progressbar"
          aria-label="Chapter progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(scroll * 100)}
        />
      </header>

      <main className="mx-auto max-w-reading px-5 pb-16 pt-12 sm:px-6 sm:pt-16">
        <header className="mb-10 text-center">
          <p className={cn('text-xs font-semibold uppercase tracking-[0.3em]', parchment ? 'text-burgundy' : 'text-primary')}>
            Chapter {chapter.number}
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">{chapter.title}</h1>
          <p className={cn('mt-3 text-sm', parchment ? 'text-ink/60' : 'text-muted-foreground')}>
            {author?.name} · {formatDate(chapter.publishedAt)} · {chapter.readMinutes} min read
          </p>
          <div className={cn('mx-auto mt-8 flex items-center justify-center gap-3', parchment ? 'text-burgundy/60' : 'text-primary/60')} aria-hidden>
            <span className="h-px w-16 bg-current" />
            <span className="text-lg">✦</span>
            <span className="h-px w-16 bg-current" />
          </div>
        </header>

        <article
          className={cn(
            'space-y-6 leading-[1.85]',
            prefs.font === 'serif' ? 'font-reading' : 'font-sans',
            '[&>p:first-child]:first-letter:float-left [&>p:first-child]:first-letter:mr-2 [&>p:first-child]:first-letter:font-display [&>p:first-child]:first-letter:text-6xl [&>p:first-child]:first-letter:leading-[0.85]',
            parchment ? '[&>p:first-child]:first-letter:text-burgundy' : '[&>p:first-child]:first-letter:text-primary',
          )}
          style={{ fontSize: `${prefs.size}px` }}
        >
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>

        <div className={cn('my-12 text-center text-2xl', parchment ? 'text-burgundy/60' : 'text-primary/60')} aria-hidden>
          ✦ ✦ ✦
        </div>

        <nav aria-label="Chapter navigation" className="grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              to="/read/$slug/$chapter"
              params={{ slug: novel.slug, chapter: String(prev.number) }}
              className={cn(
                'group flex flex-col rounded-xl border p-4 transition-colors',
                parchment ? 'border-ink/15 hover:border-burgundy' : 'border-primary/20 hover:border-primary',
              )}
            >
              <span className={cn('inline-flex items-center gap-1 text-xs', parchment ? 'text-ink/60' : 'text-muted-foreground')}>
                <ChevronLeft className="size-3.5" aria-hidden /> Previous
              </span>
              <span className="mt-1 truncate font-display text-lg font-semibold">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/read/$slug/$chapter"
              params={{ slug: novel.slug, chapter: String(next.number) }}
              className={cn(
                'flex flex-col items-end rounded-xl border p-4 text-right transition-colors',
                parchment ? 'border-burgundy/40 bg-burgundy/5 hover:border-burgundy' : 'border-primary/40 bg-primary/5 hover:border-primary',
              )}
            >
              <span className={cn('inline-flex items-center gap-1 text-xs', parchment ? 'text-ink/60' : 'text-muted-foreground')}>
                Next <ChevronRight className="size-3.5" aria-hidden />
              </span>
              <span className="mt-1 truncate font-display text-lg font-semibold">{next.title}</span>
            </Link>
          ) : (
            <div className={cn('col-start-2 rounded-xl border border-dashed p-4 text-right text-sm', parchment ? 'border-ink/20 text-ink/70' : 'border-primary/30 text-muted-foreground')}>
              {novel.status === 'completed' ? 'The end. Thank you for reading.' : 'You’re all caught up — new chapters coming soon.'}
            </div>
          )}
        </nav>
      </main>
    </div>
  )
}

function SegmentedSetting<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: [T, string][]
  onChange: (v: T) => void
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">{label}</p>
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="group" aria-label={label}>
        {options.map(([v, l]) => (
          <button
            key={v}
            type="button"
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring',
              value === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  )
}
