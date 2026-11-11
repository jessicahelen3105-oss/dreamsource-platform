/**
 * Sample catalog for DreamQuill.
 *
 * Everything the UI renders comes from this file, through the query helpers in
 * `src/lib/catalog.ts`. When real publishing lands (see PLAN.md), the catalog
 * helpers switch to database-backed server functions and this file becomes
 * seed data.
 */

export type GenreId =
  | 'romance'
  | 'fantasy'
  | 'mystery'
  | 'drama'
  | 'thriller'
  | 'sci-fi'
  | 'horror'
  | 'historical'

export interface Genre {
  id: GenreId
  name: string
  blurb: string
  /** lucide-react icon name used by the genre grid */
  icon: 'Heart' | 'Sparkles' | 'Search' | 'Drama' | 'Zap' | 'Rocket' | 'Ghost' | 'Landmark'
}

export interface Author {
  id: string
  name: string
  handle: string
  bio: string
  followers: number
  initials: string
}

export type NovelStatus = 'ongoing' | 'completed'

export interface ChapterMeta {
  number: number
  title: string
  /** ISO date */
  publishedAt: string
  readMinutes: number
}

export interface Novel {
  slug: string
  title: string
  tagline: string
  synopsis: string
  authorId: string
  genres: GenreId[]
  tags: string[]
  cover: string
  status: NovelStatus
  rating: number
  ratingsCount: number
  reads: number
  bookmarks: number
  featured?: boolean
  /** Higher = hotter this week */
  trendingScore: number
  updatedAt: string
  chapters: ChapterMeta[]
  /** Opening chapter prose, one entry per paragraph */
  opening: string[]
}

export const genres: Genre[] = [
  { id: 'romance', name: 'Romance', blurb: 'Longing glances & slow-burning hearts', icon: 'Heart' },
  { id: 'fantasy', name: 'Fantasy', blurb: 'Kingdoms, curses & quiet magic', icon: 'Sparkles' },
  { id: 'mystery', name: 'Mystery', blurb: 'Locked rooms & lingering clues', icon: 'Search' },
  { id: 'drama', name: 'Drama', blurb: 'Families, fortunes & second chances', icon: 'Drama' },
  { id: 'thriller', name: 'Thriller', blurb: 'Pulse-quickening twists', icon: 'Zap' },
  { id: 'sci-fi', name: 'Sci-Fi', blurb: 'Starships & strange tomorrows', icon: 'Rocket' },
  { id: 'horror', name: 'Horror', blurb: 'Things that whisper after midnight', icon: 'Ghost' },
  { id: 'historical', name: 'Historical', blurb: 'Lives lived in other centuries', icon: 'Landmark' },
]

export const authors: Author[] = [
  {
    id: 'seraphine-vale',
    name: 'Seraphine Vale',
    handle: '@seraphinevale',
    bio: 'Maps imaginary coastlines by day and writes about the people who sail them by night.',
    followers: 18420,
    initials: 'SV',
  },
  {
    id: 'lucien-hart',
    name: 'Lucien Hart',
    handle: '@lucienhart',
    bio: 'Court intrigue, burning crowns and love stories with very sharp edges.',
    followers: 24110,
    initials: 'LH',
  },
  {
    id: 'ines-marlowe',
    name: 'Inès Marlowe',
    handle: '@inesmarlowe',
    bio: 'Former watch restorer. Every mystery I write hides a mechanism.',
    followers: 9870,
    initials: 'IM',
  },
  {
    id: 'odette-reyes',
    name: 'Odette Reyes',
    handle: '@odettereyes',
    bio: 'Quiet dramas about loud families and the cities that hold them.',
    followers: 7340,
    initials: 'OR',
  },
  {
    id: 'clara-wynn',
    name: 'Clara Wynn',
    handle: '@clarawynn',
    bio: 'Swoon-worthy romance, written with too much coffee and an open window.',
    followers: 31560,
    initials: 'CW',
  },
  {
    id: 'rowan-ashby',
    name: 'Rowan Ashby',
    handle: '@rowanashby',
    bio: 'Coastal thrillers. I grew up beside a lighthouse and it shows.',
    followers: 12890,
    initials: 'RA',
  },
  {
    id: 'kaito-mirelle',
    name: 'Kaito Mirelle',
    handle: '@kaitomirelle',
    bio: 'Gentle science fiction about gardens, ghosts in machines and going home.',
    followers: 8650,
    initials: 'KM',
  },
  {
    id: 'mira-thorne',
    name: 'Mira Thorne',
    handle: '@mirathorne',
    bio: 'Gothic horror for readers who leave a candle burning.',
    followers: 15230,
    initials: 'MT',
  },
]

function chapterList(titles: string[], start: string, cadenceDays: number): ChapterMeta[] {
  const base = new Date(start).getTime()
  return titles.map((title, i) => ({
    number: i + 1,
    title,
    publishedAt: new Date(base + i * cadenceDays * 86_400_000).toISOString(),
    readMinutes: 9 + ((i * 7 + title.length) % 12),
  }))
}

export const novels: Novel[] = []

/** Atmospheric filler used for chapters that don't have bespoke prose yet. */
export const sampleProse: string[] = [
  'The evening settled in slowly, the way ink settles into paper — first a shadow at the edges, then a deepening, until the whole world seemed written in the same dark hand.',
  'There are moments when a choice feels small only because we cannot yet see the shape of what it will become. This was one of those moments, though nobody in the room knew it.',
  'Somewhere below, a door closed. Footsteps crossed a floor and paused. The silence that followed had weight, and texture, and an unmistakable sense of waiting.',
  'Memory is a cartographer with a poor sense of scale. It draws the important rooms enormous and lets entire years shrink to a single line along the margin.',
  'By the time the candles had burned to stubs, the plan had changed three times. Each version was more dangerous than the last, and each one felt more honest.',
  'Outside, the wind worried at the shutters like a creature trying to remember the way home. Inside, two people pretended very hard not to be listening to it.',
  'It was not courage, exactly. It was something quieter — the stubborn refusal to look away, held so long that it had started to feel like a kind of bravery.',
  'And when the answer finally came, it arrived not as a revelation but as a recognition: the sense of a key turning in a lock it had always been made for.',
]
