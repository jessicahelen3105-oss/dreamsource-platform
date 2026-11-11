import { Link } from '@tanstack/react-router'
import { listGenres } from '@/lib/catalog'
import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-primary/15 bg-burgundy-deep/30">
      <div className="gold-rule absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            A home for storytellers and the readers who stay up too late with them. Where
            Imagination Finds Its Words.
          </p>
        </div>
        <FooterCol title="Read">
          <Link to="/discover">Discover novels</Link>
          <Link to="/discover" search={{ sort: 'trending' }}>
            Trending now
          </Link>
          <Link to="/discover" search={{ status: 'completed' }}>
            Completed stories
          </Link>
          <Link to="/discover" search={{ shelf: 'library' }}>
            My library
          </Link>
        </FooterCol>
        <FooterCol title="Genres">
          {listGenres()
            .slice(0, 5)
            .map((g) => (
              <Link key={g.id} to="/discover" search={{ genre: g.id }}>
                {g.name}
              </Link>
            ))}
        </FooterCol>
        <FooterCol title="Write">
          <Link to="/" hash="write">
            Become an author
          </Link>
          <span>Author guidelines</span>
          <span>Community standards</span>
        </FooterCol>
      </div>
      <div className="border-t border-primary/10 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DreamQuill. Crafted for storytellers under every moon.
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 font-display text-lg font-semibold text-primary">{title}</h2>
      <div className="flex flex-col gap-2.5 text-sm text-muted-foreground [&_a:hover]:text-foreground">
        {children}
      </div>
    </div>
  )
}
