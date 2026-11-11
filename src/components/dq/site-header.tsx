import { Link } from '@tanstack/react-router'
import { Library, Menu, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { listGenres } from '@/lib/catalog'
import { useLibrary } from '@/lib/library'
import { JoinDialog } from './join-dialog'
import { Logo } from './logo'
import { SearchBar } from './search-bar'

const navLinkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary data-[status=active]:text-primary'

export function SiteHeader() {
  const { bookmarks } = useLibrary()

  return (
    <header className="sticky top-0 z-40 border-b border-primary/15 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-content items-center gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Main" className="ml-4 hidden items-center lg:flex">
          <Link to="/" className={navLinkClass} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/discover" className={navLinkClass} activeOptions={{ includeSearch: false }}>
            Discover
          </Link>
          <Link to="/" hash="genres" className={navLinkClass} activeProps={{}}>
            Genres
          </Link>
          <Link to="/" hash="write" className={navLinkClass} activeProps={{}}>
            Write
          </Link>
        </nav>
        <div className="ml-auto hidden w-64 md:block xl:w-80">
          <SearchBar />
        </div>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/discover" search={{ shelf: 'library' }}>
              <Library aria-hidden />
              Library
              {bookmarks.length > 0 && (
                <span className="rounded-full bg-secondary px-1.5 text-xs text-primary">
                  {bookmarks.length}
                </span>
              )}
            </Link>
          </Button>
          <JoinDialog>
            <Button size="sm" className="hidden font-semibold sm:inline-flex">
              <PenLine aria-hidden />
              Join
            </Button>
          </JoinDialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-primary/20 bg-background">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl text-gold-gradient">
                  DreamQuill
                </SheetTitle>
                <SheetDescription>Where Imagination Finds Its Words.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-4 pb-6">
                <SearchBar />
                <nav aria-label="Mobile" className="flex flex-col">
                  <Link to="/" className={navLinkClass} activeOptions={{ exact: true }}>
                    Home
                  </Link>
                  <Link to="/discover" className={navLinkClass}>
                    Discover
                  </Link>
                  <Link to="/discover" search={{ shelf: 'library' }} className={navLinkClass}>
                    My library ({bookmarks.length})
                  </Link>
                  <Link to="/" hash="write" className={navLinkClass} activeProps={{}}>
                    Write on DreamQuill
                  </Link>
                </nav>
                <div>
                  <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/70">
                    Genres
                  </p>
                  <div className="flex flex-wrap gap-2 px-3">
                    {listGenres().map((g) => (
                      <Link
                        key={g.id}
                        to="/discover"
                        search={{ genre: g.id }}
                        className="rounded-full border border-primary/25 px-3 py-1 text-sm hover:border-primary hover:text-primary"
                      >
                        {g.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <JoinDialog>
                  <Button className="w-full font-semibold">Join DreamQuill</Button>
                </JoinDialog>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
