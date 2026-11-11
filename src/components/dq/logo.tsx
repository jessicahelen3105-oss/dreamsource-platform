import { Link } from '@tanstack/react-router'
import { cdnImage } from '@/lib/images'
import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={cdnImage('/img/logo.png', 128)}
      alt=""
      width={64}
      height={64}
      className={cn('size-10 rounded-full mix-blend-screen', className)}
    />
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-2.5 rounded-md', className)}
      aria-label="DreamQuill home"
    >
      <LogoMark className="transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none" />
      <span className="font-display text-2xl font-semibold tracking-wide text-gold-gradient">
        DreamQuill
      </span>
    </Link>
  )
}
