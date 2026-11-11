import { cdnImage, cdnSrcSet } from '@/lib/images'
import { cn } from '@/lib/utils'

export function Cover({
  src,
  title,
  className,
  sizes = '(min-width: 1024px) 240px, 45vw',
  priority,
}: {
  src: string
  title: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <div
      className={cn(
        'relative aspect-[2/3] overflow-hidden rounded-lg bg-muted ring-1 ring-primary/20',
        className,
      )}
    >
      <img
        src={cdnImage(src, 400)}
        srcSet={cdnSrcSet(src, [240, 400, 640])}
        sizes={sizes}
        alt={`Cover of ${title}`}
        loading={priority ? 'eager' : 'lazy'}
        className="size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5" />
    </div>
  )
}
