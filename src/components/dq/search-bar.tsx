import { useId, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchBar({
  defaultValue = '',
  size = 'default',
  className,
  autoFocus,
}: {
  defaultValue?: string
  size?: 'default' | 'lg'
  className?: string
  autoFocus?: boolean
}) {
  const navigate = useNavigate()
  const [value, setValue] = useState(defaultValue)
  const inputId = useId()

  return (
    <form
      role="search"
      className={cn('relative w-full', className)}
      onSubmit={(e) => {
        e.preventDefault()
        void navigate({ to: '/discover', search: { q: value.trim() || undefined } })
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        Search novels and authors
      </label>
      <Search
        className={cn(
          'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/80',
          size === 'lg' ? 'size-5' : 'size-4',
        )}
        aria-hidden
      />
      <input
        id={inputId}
        type="search"
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search novels, authors or tropes…"
        className={cn(
          'w-full rounded-full border border-primary/30 bg-background/70 text-foreground backdrop-blur placeholder:text-muted-foreground/80 outline-none transition-shadow focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/50',
          size === 'lg' ? 'h-14 pl-12 pr-32 text-base' : 'h-10 pl-10 pr-4 text-sm',
        )}
      />
      {size === 'lg' && (
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 h-11 -translate-y-1/2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-gold-bright focus-visible:ring-2 focus-visible:ring-ring"
        >
          Search
        </button>
      )}
    </form>
  )
}
