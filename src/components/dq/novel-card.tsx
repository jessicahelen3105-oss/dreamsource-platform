import { Link } from '@tanstack/react-router'
import { Bookmark, BookmarkCheck, Eye, Star } from 'lucide-react'
import { toast } from 'sonner'
import { formatCount, getAuthor, getGenre, type Novel } from '@/lib/catalog'
import { useLibrary } from '@/lib/library'
import { cn } from '@/lib/utils'
import { Cover } from './cover'

export function NovelCard({ novel, rank }: { novel: Novel; rank?: number }) {
  const author = getAuthor(novel.authorId)
  const { isBookmarked, toggleBookmark } = useLibrary()
  const saved = isBookmarked(novel.slug)

  return (
    <article className="group relative flex flex-col">
      <div className="relative">
        <Link
          to="/novel/$slug"
          params={{ slug: novel.slug }}
          className="block rounded-lg transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none"
        >
          <Cover
            src={novel.cover}
            title={novel.title}
            className="transition-shadow duration-300 group-hover:glow-gold"
          />
        </Link>
        {rank !== undefined && (
          <span className="absolute -left-2 -top-2 grid size-9 place-items-center rounded-full bg-secondary font-display text-lg font-bold text-primary ring-2 ring-background">
            {rank}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            const added = toggleBookmark(novel.slug)
            toast(added ? `Added “${novel.title}” to your library` : 'Removed from your library')
          }}
          aria-label={saved ? `Remove ${novel.title} from library` : `Bookmark ${novel.title}`}
          aria-pressed={saved}
          className={cn(
            'absolute right-2 top-2 grid size-9 place-items-center rounded-full bg-background/70 backdrop-blur transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-ring',
            saved ? 'text-primary' : 'text-foreground/80',
          )}
        >
          {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary/80">
          {novel.genres.map((g) => getGenre(g)?.name).join(' · ')}
        </p>
        <h3 className="font-display text-xl font-semibold leading-tight">
          <Link
            to="/novel/$slug"
            params={{ slug: novel.slug }}
            className="hover:text-primary focus-visible:text-primary"
          >
            {novel.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground">{author?.name}</p>
        <div className="flex items-center gap-3 pt-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-primary text-primary" aria-hidden />
            {novel.rating.toFixed(1)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" aria-hidden />
            {formatCount(novel.reads)}
          </span>
          <span>{novel.chapters.length} ch.</span>
        </div>
      </div>
    </article>
  )
}
