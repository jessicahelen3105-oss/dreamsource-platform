# DreamQuill

**Where Imagination Finds Its Words.**

DreamQuill is an online novel-publishing community. Writers publish novels chapter by chapter; readers discover stories by genre, search, and trending lists, save them to a library, and read in a comfortable, customizable reader. The design blends magical fantasy with modern luxury — midnight black, deep burgundy and antique gold, with elegant serif headings.

## What's live

- **Home** (`/`) — welcome hero with search, featured spotlight, trending novels, genre grid, fresh chapters, and a writers' invitation.
- **Discover** (`/discover`) — search novels and authors; filter by genre and status; sort by trending, rating, reads or recency. `?shelf=library` shows the reader's bookmarked novels.
- **Novel page** (`/novel/:slug`) — details, chapter list, author, related stories.
- **Reader** (`/read/:slug/:chapter`) — chapter reading with progress bar, chapter drawer, text size, Midnight/Parchment page and serif/sans options.

The catalog currently uses sample novels from `src/lib/fixtures.ts`, served through `src/lib/catalog.ts` so real data can be connected without touching the screens.

## Tech

TanStack Start (React 19, TanStack Router), Vite, Tailwind CSS 4, shadcn/ui (Radix), lucide-react, sonner. Deployed on Netlify; images served through the Netlify Image CDN.

## Run locally

```bash
pnpm install
netlify dev      # or: pnpm dev
```

## Roadmap

See [PLAN.md](PLAN.md). Next up: the database-backed catalog, then accounts and roles, persistent reading libraries, the author dashboard and publishing tools, community features, and the admin/moderation dashboard.
