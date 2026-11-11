import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { BookOpen, Bookmark, BookmarkCheck, Clock, Eye, Share2, Star, Users } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Cover } from '@/components/dq/cover'
import { NovelCard } from '@/components/dq/novel-card'
import {
  formatCount,
  formatDate,
  getAuthor,
  getGenre,
  getNovel,
  novelsByAuthor,
  searchNovels,
} from '@/lib/catalog'
import { cdnImage } from '@/lib/images'
import { useLibrary } from '@/lib/library'

export const Route = createFileRoute('/_site/novel/$slug')({
  loader: ({ params }) => {
    const novel = getNovel(params.slug)
    if (!novel) throw notFound()
    return { slug: novel.slug }
  },
  head: ({ loaderData }) => {
    const novel = loaderData ? getNovel(loaderData.slug) : undefined
    return {
      meta: novel
        ? [
            { title: `${novel.title} — DreamQuill` },
            { name: 'description', content: novel.tagline },
            { property: 'og:title', content: novel.title },
            { property: 'og:description', content: novel.tagline },
          ]
        : [],
    }
  },
  component: NovelPage,
})

function NovelPage() {
  const { slug } = Route.useLoaderData()
  const novel = getNovel(slug)!
  const author = getAuthor(novel.authorId)
  const { isBookmarked, toggleBookmark, progress } = useLibrary()
  const saved = isBookmarked(novel.slug)
  const resumeAt = progress[novel.slug]
  const totalMinutes = novel.chapters.reduce((s, c) => s + c.readMinutes, 0)

  const related = searchNovels({ genre: novel.genres[0] })
    .filter((n) => n.slug !== novel.slug)
    .slice(0, 4)
  const moreByAuthor = novelsByAuthor(novel.authorId).filter((n) => n.slug !== novel.slug)

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-primary/15">
        <img
          src={cdnImage(novel.cover, 800)}
          alt=""
          className="absolute inset-0 -z-20 size-full scale-110 object-cover opacity-30 blur-2xl"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[16rem_1fr] lg:gap-12">
          <Cover src={novel.cover} title={novel.title} priority className="mx-auto w-52 glow-gold md:w-full" sizes="(min-width: 768px) 256px, 208px" />
          <div className="flex flex-col">
            <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
              <Link to="/discover" className="hover:text-primary">Discover</Link>
              <span className="mx-2" aria-hidden>/</span>
              <Link to="/discover" search={{ genre: novel.genres[0] }} className="hover:text-primary">
                {getGenre(novel.genres[0]!)?.name}
              </Link>
            </nav>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {novel.title}
            </h1>
            <p className="mt-2 text-muted-foreground">
              by <span className="font-medium text-foreground">{author?.name}</span>
              <span className="mx-2" aria-hidden>·</span>
              <span className={novel.status === 'completed' ? 'text-primary' : 'text-foreground/80'}>
                {novel.status === 'completed' ? 'Completed' : 'Ongoing'}
              </span>
            </p>
            <p className="mt-5 max-w-2xl font-display text-2xl italic text-primary">“{novel.tagline}”</p>

            <dl className="mt-6 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat icon={Star} label="Rating" value={`${novel.rating.toFixed(1)}`} sub={`${formatCount(novel.ratingsCount)} ratings`} />
              <Stat icon={Eye} label="Reads" value={formatCount(novel.reads)} />
              <Stat icon={Users} label="In libraries" value={formatCount(novel.bookmarks + (saved ? 1 : 0))} />
              <Stat icon={Clock} label="Reading time" value={`${Math.round(totalMinutes / 60)}h ${totalMinutes % 60}m`} />
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {novel.genres.map((g) => (
                <Link key={g} to="/discover" search={{ genre: g }} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80">
                  {getGenre(g)?.name}
                </Link>
              ))}
              {novel.tags.map((t) => (
                <Link key={t} to="/discover" search={{ q: t }} className="rounded-full border border-primary/25 px-3 py-1 text-xs text-foreground/80 hover:border-primary hover:text-primary">
                  #{t}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="font-semibold" asChild>
                <Link to="/read/$slug/$chapter" params={{ slug: novel.slug, chapter: String(resumeAt ?? 1) }}>
                  <BookOpen aria-hidden />
                  {resumeAt ? `Continue · Chapter ${resumeAt}` : 'Start reading'}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/40"
                aria-pressed={saved}
                onClick={() => {
                  const added = toggleBookmark(novel.slug)
                  toast(added ? 'Added to your library' : 'Removed from your library')
                }}
              >
                {saved ? <BookmarkCheck className="text-primary" aria-hidden /> : <Bookmark aria-hidden />}
                {saved ? 'In your library' : 'Add to library'}
              </Button>
              <Button
                size="lg"
                variant="ghost"
                aria-label="Share this novel"
                onClick={() => {
                  void navigator.clipboard?.writeText(window.location.href)
                  toast.success('Link copied to clipboard')
                }}
              >
                <Share2 aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-content gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_18rem]">
        <Tabs defaultValue="chapters">
          <TabsList className="mb-6">
            <TabsTrigger value="chapters">Chapters ({novel.chapters.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="chapters">
            <ol className="divide-y divide-primary/10 overflow-hidden rounded-xl border border-primary/15 bg-card/50">
              {novel.chapters.map((c) => (
                <li key={c.number}>
                  <Link
                    to="/read/$slug/$chapter"
                    params={{ slug: novel.slug, chapter: String(c.number) }}
                    className="flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-primary/5 sm:px-5"
                  >
                    <span className="w-8 shrink-0 font-display text-xl text-primary/80">{c.number}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium">{c.title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {formatDate(c.publishedAt)} · {c.readMinutes} min read
                      </span>
                    </span>
                    {resumeAt === c.number && (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">Reading</span>
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          </TabsContent>
          <TabsContent value="about" className="space-y-6">
            <div>
              <h2 className="mb-3 font-display text-2xl font-semibold">Synopsis</h2>
              <p className="max-w-reading leading-relaxed text-foreground/85">{novel.synopsis}</p>
            </div>
            <div>
              <h2 className="mb-3 font-display text-2xl font-semibold">From the first page</h2>
              <blockquote className="max-w-reading border-l-2 border-primary/60 pl-5 font-reading text-lg italic leading-relaxed text-foreground/85">
                {novel.opening[0]}
              </blockquote>
            </div>
          </TabsContent>
        </Tabs>

        <aside className="space-y-8">
          {author && (
            <div className="rounded-xl border border-primary/15 bg-card/60 p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">About the author</h2>
              <div className="mt-4 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-primary font-bold text-primary-foreground">
                  {author.initials}
                </span>
                <div>
                  <p className="font-display text-xl font-semibold">{author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {author.handle} · {formatCount(author.followers)} followers
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{author.bio}</p>
              <Button
                variant="outline"
                className="mt-4 w-full border-primary/40"
                onClick={() => toast.success(`You’re now following ${author.name}`)}
              >
                Follow
              </Button>
              {moreByAuthor.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm">
                  {moreByAuthor.map((n) => (
                    <li key={n.slug}>
                      <Link to="/novel/$slug" params={{ slug: n.slug }} className="text-primary hover:underline">
                        {n.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <p className="text-xs text-muted-foreground">Last updated {formatDate(novel.updatedAt)}</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mx-auto max-w-content px-4 pb-6 sm:px-6">
          <h2 id="related-heading" className="mb-6 font-display text-3xl font-semibold">
            Readers also enjoyed
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
            {related.map((n) => (
              <NovelCard key={n.slug} novel={n} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Star
  label: string
  value: string
  sub?: string
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Icon className="size-3.5 text-primary" aria-hidden /> {label}
      </dt>
      <dd className="mt-1 font-display text-2xl font-semibold">{value}</dd>
      {sub && <dd className="text-xs text-muted-foreground">{sub}</dd>}
    </div>
  )
}
