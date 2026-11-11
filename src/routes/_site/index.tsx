import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  Drama,
  Feather,
  Flame,
  Ghost,
  Heart,
  Landmark,
  Moon,
  Rocket,
  Search,
  Sparkles,
  Star,
  Users,
  Wand2,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Cover } from '@/components/dq/cover'
import { JoinDialog } from '@/components/dq/join-dialog'
import { LogoMark } from '@/components/dq/logo'
import { NovelCard } from '@/components/dq/novel-card'
import { SearchBar } from '@/components/dq/search-bar'
import {
  countByGenre,
  featuredNovels,
  formatCount,
  formatDate,
  getAuthor,
  getGenre,
  listAuthors,
  listGenres,
  recentlyUpdated,
  trendingNovels,
  type Genre,
} from '@/lib/catalog'
import { cdnImage } from '@/lib/images'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/_site/')({
  component: Home,
})

const genreIcons: Record<Genre['icon'], typeof Heart> = {
  Heart,
  Sparkles,
  Search,
  Drama,
  Zap,
  Rocket,
  Ghost,
  Landmark,
}

function Home() {
  return (
    <>
      <Hero />
      <FeaturedSpotlight />
      <Trending />
      <Genres />
      <FreshChapters />
      <WritersInvite />
    </>
  )
}

function Hero() {
  const popular = ['Enemies to lovers', 'Locked room', 'Sky islands', 'Gothic']
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={cdnImage('/img/hero.png', 1600)}
        srcSet={`${cdnImage('/img/hero.png', 800)} 800w, ${cdnImage('/img/hero.png', 1600)} 1600w, ${cdnImage('/img/hero.png', 2400)} 2400w`}
        sizes="100vw"
        alt=""
        className="absolute inset-0 -z-20 size-full object-cover object-[30%_center] opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/70 to-background" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--background)_80%)]" />
      <div className="mx-auto flex max-w-content flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 sm:pt-24 lg:pb-28">
        <LogoMark className="size-20 sm:size-24" />
        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-primary backdrop-blur">
          <Moon className="size-3.5" aria-hidden /> Welcome to DreamQuill
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
          Where Imagination <span className="italic text-gold-gradient">Finds Its Words.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-foreground/80 sm:text-lg">
          Discover enchanting novels from writers around the world, read them chapter by chapter,
          and share your own stories with a community that treasures every page.
        </p>
        <SearchBar size="lg" className="mt-10 max-w-2xl" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-muted-foreground">Popular:</span>
          {popular.map((p) => (
            <Link
              key={p}
              to="/discover"
              search={{ q: p }}
              className="rounded-full border border-primary/20 bg-background/40 px-3 py-1 text-foreground/80 backdrop-blur transition-colors hover:border-primary hover:text-primary"
            >
              {p}
            </Link>
          ))}
        </div>
        <dl className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-primary/15 pt-8">
          {[
            ['48K+', 'Stories published'],
            ['12K', 'Active authors'],
            ['2.1M', 'Monthly readers'],
          ].map(([v, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-3xl font-semibold text-primary sm:text-4xl">{v}</dd>
              <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">{l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  action,
  id,
}: {
  eyebrow: string
  title: string
  action?: React.ReactNode
  id?: string
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
          <Sparkles className="size-3.5" aria-hidden />
          {eyebrow}
        </p>
        <h2 id={id} className="font-display text-4xl font-semibold sm:text-5xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}

function FeaturedSpotlight() {
  const featured = featuredNovels()
  const [active, setActive] = useState(0)
  const novel = featured[active]!
  const author = getAuthor(novel.authorId)

  return (
    <section aria-labelledby="featured-heading" className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <SectionHeading id="featured-heading" eyebrow="Editor’s selection" title="Featured Novels" />
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <article className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-burgundy-deep via-card to-background p-5 sm:p-8">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div key={novel.slug} className="relative grid gap-6 animate-in fade-in duration-500 motion-reduce:animate-none sm:grid-cols-[13rem_1fr] sm:gap-8">
            <Link to="/novel/$slug" params={{ slug: novel.slug }} className="mx-auto w-44 sm:w-auto">
              <Cover src={novel.cover} title={novel.title} className="glow-gold" priority />
            </Link>
            <div className="flex flex-col">
              <div className="flex flex-wrap gap-2">
                {novel.genres.map((g) => (
                  <span key={g} className="rounded-full bg-secondary/80 px-3 py-0.5 text-xs font-medium text-secondary-foreground">
                    {getGenre(g)?.name}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-tight">{novel.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                by <span className="text-foreground">{author?.name}</span>
              </p>
              <p className="mt-4 font-display text-xl italic text-primary">“{novel.tagline}”</p>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-foreground/80">{novel.synopsis}</p>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="size-4 fill-primary text-primary" aria-hidden />
                  <span className="text-foreground">{novel.rating}</span> ({formatCount(novel.ratingsCount)})
                </span>
                <span>{formatCount(novel.reads)} reads</span>
                <span>{novel.chapters.length} chapters</span>
              </div>
              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Button size="lg" className="font-semibold" asChild>
                  <Link to="/read/$slug/$chapter" params={{ slug: novel.slug, chapter: '1' }}>
                    <BookOpen aria-hidden /> Start reading
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/40" asChild>
                  <Link to="/novel/$slug" params={{ slug: novel.slug }}>
                    View details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1" aria-label="Choose a featured novel">
          {featured.map((n, i) => (
            <li key={n.slug}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                  i === active
                    ? 'border-primary/60 bg-primary/10'
                    : 'border-border bg-card/60 hover:border-primary/40',
                )}
              >
                <Cover src={n.cover} title={n.title} sizes="64px" className="w-12 shrink-0 rounded-md sm:w-14" />
                <span className="min-w-0">
                  <span className="block truncate font-display text-base font-semibold sm:text-lg">{n.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {getAuthor(n.authorId)?.name}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Trending() {
  return (
    <section aria-labelledby="trending-heading" className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <SectionHeading
        id="trending-heading"
        eyebrow="Rising this week"
        title="Trending Now"
        action={
          <Button variant="ghost" className="text-primary" asChild>
            <Link to="/discover" search={{ sort: 'trending' }}>
              See all <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
        {trendingNovels(6).map((n, i) => (
          <NovelCard key={n.slug} novel={n} rank={i + 1} />
        ))}
      </div>
    </section>
  )
}

function Genres() {
  return (
    <section id="genres" aria-labelledby="genres-heading" className="scroll-mt-20 mx-auto max-w-content px-4 py-16 sm:px-6">
      <SectionHeading id="genres-heading" eyebrow="Find your next obsession" title="Explore by Genre" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {listGenres().map((g, i) => {
          const Icon = genreIcons[g.icon]
          return (
            <Link
              key={g.id}
              to="/discover"
              search={{ genre: g.id }}
              className={cn(
                'group relative overflow-hidden rounded-xl border border-primary/15 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50 motion-reduce:transition-none sm:p-6',
                i % 3 === 0
                  ? 'bg-gradient-to-br from-burgundy/60 to-card'
                  : 'bg-gradient-to-br from-card to-muted/60',
              )}
            >
              <Icon className="size-7 text-primary transition-transform group-hover:scale-110 motion-reduce:transition-none" aria-hidden />
              <h3 className="mt-4 font-display text-2xl font-semibold">{g.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{g.blurb}</p>
              <p className="mt-3 text-xs font-medium text-primary/80">
                {countByGenre(g.id)} {countByGenre(g.id) === 1 ? 'story' : 'stories'}
              </p>
              <ArrowRight className="absolute right-4 top-5 size-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function FreshChapters() {
  return (
    <section aria-labelledby="fresh-heading" className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <SectionHeading id="fresh-heading" eyebrow="Just released" title="Fresh Chapters" />
      <ul className="divide-y divide-primary/10 overflow-hidden rounded-2xl border border-primary/15 bg-card/60">
        {recentlyUpdated(4).map((n) => {
          const latest = n.chapters[n.chapters.length - 1]!
          return (
            <li key={n.slug}>
              <Link
                to="/read/$slug/$chapter"
                params={{ slug: n.slug, chapter: String(latest.number) }}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-primary/5 sm:p-5"
              >
                <Cover src={n.cover} title={n.title} sizes="56px" className="w-12 shrink-0 rounded-md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg font-semibold">{n.title}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    Chapter {latest.number}: {latest.title}
                  </p>
                </div>
                <div className="hidden text-right text-xs text-muted-foreground sm:block">
                  <p>{getAuthor(n.authorId)?.name}</p>
                  <p>{formatDate(n.updatedAt)}</p>
                </div>
                <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function WritersInvite() {
  const perks = [
    { icon: Feather, title: 'Write beautifully', body: 'A distraction-free editor with drafts, scheduling and chapter notes.' },
    { icon: Users, title: 'Find your readers', body: 'Get discovered through genres, trending lists and editor features.' },
    { icon: Flame, title: 'Grow your following', body: 'See reads, bookmarks and comments on every chapter you publish.' },
  ]
  const spotlight = listAuthors().slice(0, 5)
  return (
    <section id="write" aria-labelledby="write-heading" className="scroll-mt-20 mx-auto max-w-content px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-burgundy via-burgundy-deep to-background p-8 sm:p-12 lg:p-16">
        <div className="starfield pointer-events-none absolute inset-0" />
        <Wand2 className="pointer-events-none absolute -right-6 -top-6 size-48 rotate-12 text-primary/10" aria-hidden />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">For writers</p>
            <h2 id="write-heading" className="mt-3 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Your story deserves <span className="italic text-gold-gradient">an enchanted stage.</span>
            </h2>
            <p className="mt-4 max-w-xl text-foreground/80">
              Join thousands of authors publishing on DreamQuill. Share your novel chapter by chapter,
              build a loyal readership, and watch your world come alive in readers’ imaginations.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <JoinDialog defaultRole="author">
                <Button size="lg" className="font-semibold">
                  <Feather aria-hidden /> Start writing — it’s free
                </Button>
              </JoinDialog>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {spotlight.map((a) => (
                    <span
                      key={a.id}
                      title={a.name}
                      className="grid size-9 place-items-center rounded-full border-2 border-burgundy-deep bg-primary text-xs font-bold text-primary-foreground"
                    >
                      {a.initials}
                    </span>
                  ))}
                </div>
                <span className="ml-3 text-sm text-foreground/80">12,000+ authors writing</span>
              </div>
            </div>
          </div>
          <ul className="grid gap-4">
            {perks.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-xl border border-primary/20 bg-background/40 p-4 backdrop-blur">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <p.icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
