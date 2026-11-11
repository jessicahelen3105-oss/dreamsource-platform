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

export const novels: Novel[] = [
  {
    slug: 'the-moonlit-cartographer',
    title: 'The Moonlit Cartographer',
    tagline: 'She maps the stars. The stars have begun to map her back.',
    synopsis:
      'In the cliff-city of Aldermere, Wren Ashcombe inherits her grandmother’s star charts — and the debts that came with them. When the constellations start shifting overnight, redrawing borders between floating islands, Wren must chart a sky that no longer obeys before the Moon Court claims her maps as weapons.',
    authorId: 'seraphine-vale',
    genres: ['fantasy', 'romance'],
    tags: ['Found family', 'Sky islands', 'Slow burn'],
    cover: '/img/cover-moonlit-cartographer.png',
    status: 'ongoing',
    rating: 4.9,
    ratingsCount: 3821,
    reads: 1_284_000,
    bookmarks: 86_400,
    featured: true,
    trendingScore: 98,
    updatedAt: '2026-11-08T19:00:00.000Z',
    chapters: chapterList(
      [
        'Ink and Inheritance',
        'The Sky Moves at Midnight',
        'A Court of Silver Lanterns',
        'Islands Adrift',
        'The Navigator’s Bargain',
        'What the Compass Hides',
        'Moonfall Market',
        'A Map Drawn in Blood and Starlight',
        'The Cartographer’s Oath',
        'Where the Edges Burn',
        'Low Tide in the Heavens',
        'The Thirteenth Constellation',
      ],
      '2026-08-02T18:00:00.000Z',
      8,
    ),
    opening: [
      'The stars over Aldermere had not moved in three hundred years, which was why Wren Ashcombe nearly dropped her lantern when the Lantern-Bearer slid two finger-widths to the east.',
      'She stood very still on the observatory balcony, her grandmother’s brass sextant cold in her palm. Below, the cliff-city slept in terraces of slate and ivy, every chimney breathing a thin grey thread into the dark. Above, the sky looked exactly as it always had — except that it didn’t.',
      '“You’re tired,” she told herself, and the wind, which had opinions, laughed in the rigging of the weather vane.',
      'She lifted the sextant, sighted the Lantern-Bearer, and read the angle twice. Then she unrolled the oldest chart in the Ashcombe collection — vellum gone the colour of weak tea — and laid it flat beneath the lamp. Her grandmother’s handwriting curled along the margin in faded violet ink: When the Bearer walks, the borders follow. Keep the maps. Trust no one in silver.',
      'Wren read the line until the letters blurred. Out across the gulf, the floating island of Kestrel’s Reach — which had hung beside Aldermere since before the city had a name — gave a low, groaning shudder, like a ship slipping its anchor.',
      'And then, slowly, beautifully, it began to drift.',
    ],
  },
  {
    slug: 'ashes-of-the-velvet-crown',
    title: 'Ashes of the Velvet Crown',
    tagline: 'To save the kingdom, she must marry the prince who burned it.',
    synopsis:
      'Princess Isolde Varenne watched her family’s palace burn. Now the man who lit the match wants a treaty — sealed with her hand. In a court of masks and poisoned roses, Isolde plans to wear the crown just long enough to bring it down.',
    authorId: 'lucien-hart',
    genres: ['romance', 'fantasy', 'drama'],
    tags: ['Enemies to lovers', 'Royal court', 'Political intrigue'],
    cover: '/img/cover-velvet-crown.png',
    status: 'ongoing',
    rating: 4.8,
    ratingsCount: 5210,
    reads: 2_031_500,
    bookmarks: 142_300,
    featured: true,
    trendingScore: 95,
    updatedAt: '2026-11-09T21:30:00.000Z',
    chapters: chapterList(
      [
        'The Night of Cinders',
        'A Treaty Written in Smoke',
        'Masks of the Ember Court',
        'Roses with Thorns of Glass',
        'The Prince’s Confession',
        'Dancing on a Blade',
        'Velvet and Venom',
        'What Burns Twice',
        'The Coronation Gambit',
        'A Kiss Like Wildfire',
      ],
      '2026-08-20T20:00:00.000Z',
      7,
    ),
    opening: [
      'Isolde Varenne had been taught that a princess never runs. So when the east wing of the Palace of Saints caught fire, she walked.',
      'She walked through corridors where tapestries curled and blackened like autumn leaves. She walked past her father’s portrait as the gilt frame began to weep molten gold. She walked, barefoot and seventeen, until she reached the garden gate, and there — silhouetted against a sky gone orange as a forge — stood a young man in a soot-streaked crimson coat, watching the palace burn with an expression she would spend years trying to name.',
      'Not triumph. Not cruelty. Something closer to grief.',
      '“You should go,” he said, without turning. “The roof will fall in a moment.”',
      'She memorised the line of his jaw, the silver ring on his smallest finger, the crest on his cuff: a rose wrapped in flame. The crest of House Draven.',
      'Five years later, that same crest arrived on an envelope sealed in black wax. Inside was a single sentence in a careful, familiar hand. Marry me, and the war ends.',
    ],
  },
  {
    slug: 'the-clockmakers-last-secret',
    title: 'The Clockmaker’s Last Secret',
    tagline: 'Every clock in London stopped at 3:17. Only one man knew why.',
    synopsis:
      'When master horologist Elias Penhallow is found dead in his locked workshop, every clock in fog-bound London stops at the same minute. His apprentice, Mae Hollis, discovers a pocket watch containing a miniature, ticking city — and a confession that implicates the Crown.',
    authorId: 'ines-marlowe',
    genres: ['mystery', 'historical'],
    tags: ['Victorian', 'Locked room', 'Clockwork'],
    cover: '/img/cover-clockmaker.png',
    status: 'completed',
    rating: 4.7,
    ratingsCount: 2104,
    reads: 642_800,
    bookmarks: 38_900,
    featured: true,
    trendingScore: 81,
    updatedAt: '2026-10-28T09:00:00.000Z',
    chapters: chapterList(
      [
        'Seventeen Minutes Past Three',
        'The Locked Workshop',
        'A City in a Watchcase',
        'Gaslight and Gossip',
        'The Inspector Who Never Sleeps',
        'Gears Within Gears',
        'The Queen’s Horologist',
        'Escapement',
        'Last Winding',
      ],
      '2026-06-10T08:00:00.000Z',
      14,
    ),
    opening: [
      'At seventeen minutes past three on the morning of the ninth of November, every clock in London stopped.',
      'Mae Hollis noticed because she was awake, as she always was at that hour, sweeping brass filings from the floor of Penhallow & Daughters. The shop’s forty-one clocks fell silent at once — not one by one, as clocks do when they run down, but together, like a choir closing its mouths on the same note.',
      'In the hush, she heard something drip.',
      'The door to Master Penhallow’s private workshop was locked from the inside. It had always been locked from the inside; that was the point of it. Mae knocked, then called his name, then fetched the poker from the stove and did something an apprentice should never do.',
      'He was seated at his bench, head bowed as if over a difficult escapement. In his open hand lay a pocket watch Mae had never seen before. Its case was open, and inside it, impossibly, a tiny city glowed — rooftops no larger than grains of rice, and a river of light running between them.',
      'And it was still ticking.',
    ],
  },
  {
    slug: 'letters-to-the-drowned-city',
    title: 'Letters to the Drowned City',
    tagline: 'Her mother left one letter for every year she’d be gone.',
    synopsis:
      'After her mother vanishes into the flooded old quarter of Saint-Verre, Lise receives a letter every winter for twenty years. When the letters stop, she returns to the half-sunken city to find out who has been writing them — and why the bells still ring beneath the water.',
    authorId: 'odette-reyes',
    genres: ['drama', 'mystery'],
    tags: ['Family secrets', 'Literary', 'Epistolary'],
    cover: '/img/cover-drowned-city.png',
    status: 'ongoing',
    rating: 4.6,
    ratingsCount: 1188,
    reads: 318_200,
    bookmarks: 21_700,
    trendingScore: 74,
    updatedAt: '2026-11-05T12:00:00.000Z',
    chapters: chapterList(
      [
        'The Twentieth Winter',
        'Return to Saint-Verre',
        'Bells Beneath the Water',
        'The Ferryman’s Daughter',
        'An Unfinished Letter',
        'High Water',
        'What the Tide Keeps',
      ],
      '2026-09-01T10:00:00.000Z',
      10,
    ),
    opening: [
      'The first letter arrived when Lise was nine, tucked inside a parcel of oranges, and it began the way they all would: My darling, I am still here.',
      'Every December after that, another envelope came — no stamp, no return address, the paper faintly damp no matter how dry the week had been. Her mother wrote about the light on the canals, the cathedral bells that rang at low tide, the woman who sold chestnuts on a bridge that no longer existed.',
      'Lise kept them in a hatbox under her bed, then under the bed of her first apartment, then her second. Nineteen letters, nineteen winters.',
      'The twentieth winter, nothing came.',
      'She waited until January. Then she bought a ticket to the last station before the floodline, packed the hatbox in her suitcase, and went to find the city that had swallowed her mother whole.',
    ],
  },
  {
    slug: 'embers-between-us',
    title: 'Embers Between Us',
    tagline: 'One balcony. Two rivals. A summer that refuses to cool.',
    synopsis:
      'Pastry chef Noor Haddad and fire-dancer Theo Lark share a crumbling balcony above Lisbon’s oldest bakery — and absolutely nothing else. When a citywide festival forces them into the same competition, their sparks threaten to set the whole summer alight.',
    authorId: 'clara-wynn',
    genres: ['romance', 'drama'],
    tags: ['Rivals to lovers', 'Summer romance', 'Found family'],
    cover: '/img/cover-embers.png',
    status: 'ongoing',
    rating: 4.8,
    ratingsCount: 6402,
    reads: 2_480_000,
    bookmarks: 190_200,
    featured: true,
    trendingScore: 99,
    updatedAt: '2026-11-10T08:15:00.000Z',
    chapters: chapterList(
      [
        'Flour on the Balcony',
        'The Fire-Dancer Next Door',
        'Burnt Sugar',
        'Festival Rules',
        'A Truce at Midnight',
        'Sparks',
        'The Storm Over Alfama',
        'Proof',
        'Slow Rise',
        'Everything Warm',
        'The Last Night of Summer',
      ],
      '2026-07-15T07:00:00.000Z',
      6,
    ),
    opening: [
      'The balcony was eleven feet long, and Noor Haddad had measured every inch of it twice, because she wanted to be absolutely certain which half was hers.',
      'Her half had basil in chipped terracotta pots, a folding chair, and a cooling rack of pastéis that she set out every dawn. The other half had a man doing handstands.',
      '“Good morning,” said the man, upside down.',
      '“Your feet,” Noor said, “are in my croissants.”',
      'He looked, genuinely surprised, as though his feet had wandered off without consulting him. Then he flipped upright — easy, unhurried, like gravity was something he’d negotiated a private deal with — and offered her a smile that was frankly unacceptable before seven a.m.',
      '“Theo,” he said. “I dance with fire. Professionally. You’ll get used to the smell.”',
      'She did not, as it turned out, get used to anything about him at all.',
    ],
  },
  {
    slug: 'the-ninth-tide',
    title: 'The Ninth Tide',
    tagline: 'The lighthouse keeper vanished. The light never went out.',
    synopsis:
      'On a storm-wracked island off the Cornish coast, investigator Ada Quill arrives to find the lighthouse keeper missing and the lamp still burning. As the ninth tide of the season approaches, the islanders’ silence grows louder — and someone starts leaving messages in the fog.',
    authorId: 'rowan-ashby',
    genres: ['thriller', 'mystery'],
    tags: ['Island', 'Detective', 'Atmospheric'],
    cover: '/img/cover-ninth-tide.png',
    status: 'ongoing',
    rating: 4.7,
    ratingsCount: 2750,
    reads: 905_100,
    bookmarks: 57_800,
    trendingScore: 90,
    updatedAt: '2026-11-07T22:00:00.000Z',
    chapters: chapterList(
      [
        'Landfall',
        'The Keeper’s Log',
        'Fog Signals',
        'A Red Coat on the Rocks',
        'Low Water',
        'The Drowned Bell',
        'Eight Tides Gone',
        'The Lamp Room',
      ],
      '2026-09-10T21:00:00.000Z',
      7,
    ),
    opening: [
      'The ferry would not go closer than half a mile, so Ada Quill finished the journey in a rowboat with a man who refused to look at the lighthouse.',
      'It stood on a fist of black rock at the island’s northern tip, white paint flayed grey by a century of salt. Even at noon, its lamp was turning. Ada watched the beam sweep over the water, pale and patient, and counted the seconds between flashes. Nine.',
      '“Keeper went missing three weeks back,” the boatman said at last. “Light’s not gone out once.”',
      '“Someone must be tending it.”',
      'He spat over the side. “Nobody goes up there, miss. Not since the tide took the Pellow boy.”',
      'The rowboat ground against the shingle. Ada climbed out, boots sinking into wet stones, and when she turned to ask the boatman what he meant, he was already pulling hard for the open sea — eyes fixed on something behind her, high up, where the lamp room windows glowed.',
    ],
  },
  {
    slug: 'starbound-orchard',
    title: 'Starbound Orchard',
    tagline: 'The last garden in the galaxy is still growing — and it remembers Earth.',
    synopsis:
      'Botanist-pilot Juniper Sato tends a glass-domed orchard drifting between dead stars. When the trees begin bearing fruit that glows with memories of a lost Earth, Juniper must decide whether to share the harvest with a desperate fleet — or protect the orchard’s secret.',
    authorId: 'kaito-mirelle',
    genres: ['sci-fi', 'drama'],
    tags: ['Cozy sci-fi', 'Found family', 'Space'],
    cover: '/img/cover-starbound-orchard.png',
    status: 'completed',
    rating: 4.6,
    ratingsCount: 1530,
    reads: 402_600,
    bookmarks: 29_100,
    trendingScore: 69,
    updatedAt: '2026-10-15T14:00:00.000Z',
    chapters: chapterList(
      [
        'Morning Under Glass',
        'Fruit That Remembers',
        'A Signal from the Fleet',
        'Grafting',
        'The Archivist',
        'Root and Return',
      ],
      '2026-07-01T14:00:00.000Z',
      12,
    ),
    opening: [
      'Juniper Sato began every morning the same way: she pressed her palm to the cool curve of the dome and said good morning to four hundred and twelve trees.',
      'They did not answer, exactly. But the leaves turned toward her hand, the way sunflowers on Earth had once turned toward a sun Juniper had only seen in archive footage, and that was answer enough.',
      'The Orchard drifted through the Hollow — a stretch of space so empty that the nearest star was a rumour. Its glass held air, warmth, a thin river looping between the roots, and one human being who had not spoken to another in four years.',
      'So when the oldest apple tree in the north grove put out a single blossom that glowed a soft, impossible gold, Juniper sat down on the moss and cried for a full minute before she thought to take a sample.',
    ],
  },
  {
    slug: 'hollow-hymns',
    title: 'Hollow Hymns',
    tagline: 'The choir sings every night. The chapel has been empty for a century.',
    synopsis:
      'Restoration artist Celeste Marr is hired to repair the stained glass of a forgotten forest chapel. Every night at midnight, she hears a choir. Every morning, a new pane has been rearranged to show a face — and the faces are of people who haven’t died yet.',
    authorId: 'mira-thorne',
    genres: ['horror', 'mystery'],
    tags: ['Gothic', 'Haunted', 'Slow dread'],
    cover: '/img/cover-hollow-hymns.png',
    status: 'ongoing',
    rating: 4.5,
    ratingsCount: 1902,
    reads: 551_300,
    bookmarks: 33_400,
    trendingScore: 86,
    updatedAt: '2026-11-06T23:59:00.000Z',
    chapters: chapterList(
      [
        'The Chapel in the Pines',
        'Midnight Choir',
        'Leaded Glass',
        'The First Face',
        'Vespers',
        'Those Who Sing Back',
        'Compline',
      ],
      '2026-09-20T23:00:00.000Z',
      7,
    ),
    opening: [
      'The chapel had no road, only a path the forest had nearly finished forgetting.',
      'Celeste Marr found it in the late afternoon, when the light came slanting through the pines in long bronze bars. It was smaller than the photographs suggested — a single nave, a bell-less tower, and a rose window so thick with grime it looked like an eye with a cataract.',
      'The parish had paid her in advance. That should have been the first warning.',
      'She set up her lamps, unpacked her lead and solder, and worked until dusk turned to dark. She was eating cold soup on the altar steps when the singing began — faint at first, then filling the nave like water filling a glass: twenty voices, maybe thirty, in a harmony so sad and so beautiful that she forgot, for a moment, that she was alone.',
      'Then she remembered. And the singing stopped, all at once, as if every throat in the room had noticed her noticing.',
    ],
  },
]

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
