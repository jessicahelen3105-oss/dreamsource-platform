# DreamQuill Roadmap

DreamQuill is a community novel-publishing platform: writers create accounts, publish novels chapter by chapter, and readers discover, bookmark and read them online. The work is staged so each milestone ships something usable on its own.

## Milestone 1 — Branded product surface ✅

- DreamQuill brand: midnight / burgundy / antique-gold theme, Cormorant Garamond headings, Manrope UI text, Lora reading text, custom logo, hero art and eight novel covers.
- Homepage: navigation (desktop + mobile menu), "Where Imagination Finds Its Words." welcome, novel & author search, featured spotlight, trending, genre grid, fresh chapters, writers' invitation.
- Discover: search across titles, authors and tropes; genre, status and sort filters (URL-driven); author matches; "My Library" shelf with continue-reading.
- Novel detail: stats, tags, chapter list, synopsis, author card, related novels, bookmark/share.
- Reader: chapter-by-chapter reading with progress bar, chapter drawer, prev/next, text size, Midnight/Parchment pages, serif/sans typefaces.
- Join dialog (reader or author) as the registration surface.
- All content comes from `src/lib/fixtures.ts` through `src/lib/catalog.ts`.

## Milestone 2 — Data model & catalog on Netlify Database

- Drizzle schema in `db/schema.ts`: `users`, `author_profiles`, `novels`, `novel_genres`, `chapters` (with draft/scheduled/published status), `genres`, `tags`.
- Seed the database from `src/lib/fixtures.ts`.
- Replace `src/lib/catalog.ts` helpers with server functions + route loaders (search with Postgres full-text / trigram).
- Pagination for Discover and chapter lists.

## Milestone 3 — Accounts & roles (Netlify Identity)

- Wire the Join dialog to real signup/login; sign-in page, password reset, OAuth (Google).
- Roles: `reader` (default), `author`, `admin`, `moderator`; profile pages for authors.
- Header shows the signed-in user and account menu.

## Milestone 4 — Reading library

- Persist bookmarks and reading progress per account (replace `LibraryProvider` internals; components keep `useLibrary()`).
- Dedicated `/library` page: Reading, Want to read, Finished shelves.
- Real view and bookmark counts.

## Milestone 5 — Author dashboard & publishing

- `/dashboard`: author's novels with reads, bookmarks, follower stats.
- Create / edit novel (title, synopsis, genres, tags, cover upload to Netlify Blobs via the Image CDN).
- Chapter editor with drafts, autosave, scheduling and publish/unpublish.

## Milestone 6 — Community

- Ratings & reviews, chapter comments, following authors, new-chapter notifications.

## Milestone 7 — Admin & moderation

- `/admin`: user management, role assignment, featured/editor picks.
- Report flow for novels, chapters and comments; moderation queue with hide/restore and audit log.
- Content guidelines pages.

## Milestone 8 — Polish

- SEO (per-novel OG images), sitemap, accessibility audit, performance budgets, analytics.
