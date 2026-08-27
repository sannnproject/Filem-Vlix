import { MediaProvider } from './provider';
import {
  MediaItem,
  Movie,
  TVShow,
  Season,
  Episode,
  Genre,
  SearchResult,
  PlaybackInfo,
  MediaType,
} from '@/types/media';

export const DEMO_GENRES: Genre[] = [
  { id: 28, name: 'Action', slug: 'action' },
  { id: 12, name: 'Adventure', slug: 'adventure' },
  { id: 16, name: 'Animation', slug: 'animation' },
  { id: 35, name: 'Comedy', slug: 'comedy' },
  { id: 18, name: 'Drama', slug: 'drama' },
  { id: 14, name: 'Fantasy', slug: 'fantasy' },
  { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
  { id: 99, name: 'Documentary', slug: 'documentary' },
  { id: 53, name: 'Thriller', slug: 'thriller' },
];

export const DEMO_MOVIES: Movie[] = [
  {
    id: 'demo-m-1',
    type: 'movie',
    title: 'Sintel',
    originalTitle: 'Sintel: The Durian Open Movie Project',
    overview: 'A lonely young woman, Sintel, helps and befriends a baby dragon whom she names Scales. When the dragon is kidnapped by an adult dragon, Sintel embarks on a dangerous and emotional quest to find her companion across forbidding lands.',
    posterPath: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2023-09-27',
    rating: 8.4,
    voteCount: 4230,
    runtime: 15,
    tagline: 'The search for a lost dragon begins.',
    director: 'Colin Levy',
    cast: [
      { id: 1, name: 'Halina Reijn', character: 'Sintel (voice)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
      { id: 2, name: 'Thom Hoffman', character: 'Shaman (voice)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { id: 3, name: 'Ton Roosendaal', job: 'Producer' },
    ],
    genres: [
      { id: 16, name: 'Animation', slug: 'animation' },
      { id: 14, name: 'Fantasy', slug: 'fantasy' },
      { id: 12, name: 'Adventure', slug: 'adventure' },
    ],
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    isDemo: true,
  },
  {
    id: 'demo-m-2',
    type: 'movie',
    title: 'Tears of Steel',
    originalTitle: 'Tears of Steel (Mango Open Movie)',
    overview: 'Set in a dystopian future in Amsterdam, a group of scientists and warriors gather at the Oude Kerk to stage a crucial historical event in a desperate attempt to rescue the world from destructive robotic conquerors.',
    posterPath: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2024-03-15',
    rating: 8.1,
    voteCount: 3120,
    runtime: 12,
    tagline: 'Amsterdam in ruins. One last chance to reset history.',
    director: 'Ian Hubert',
    cast: [
      { id: 4, name: 'Derek de Lint', character: 'Old Thom', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { id: 5, name: 'Vanja Rukavina', character: 'Thom', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80' },
      { id: 6, name: 'Denise Rebergen', character: 'Celia', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
    ],
    genres: [
      { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
      { id: 28, name: 'Action', slug: 'action' },
      { id: 53, name: 'Thriller', slug: 'thriller' },
    ],
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    isDemo: true,
  },
  {
    id: 'demo-m-3',
    type: 'movie',
    title: 'Big Buck Bunny',
    originalTitle: 'Big Buck Bunny (Peach Open Movie)',
    overview: 'A large and lovable rabbit deals with bullying forest creatures with humor and inventive retribution in this beloved open CGI animation classic.',
    posterPath: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2023-11-10',
    rating: 7.9,
    voteCount: 5600,
    runtime: 10,
    tagline: 'Big bunny. Bigger revenge.',
    director: 'Sacha Goedegebure',
    cast: [
      { id: 7, name: 'Jan Morgenstern', job: 'Composer' },
      { id: 8, name: 'Campbell Barton', job: 'Lead Animator' },
    ],
    genres: [
      { id: 16, name: 'Animation', slug: 'animation' },
      { id: 35, name: 'Comedy', slug: 'comedy' },
      { id: 12, name: 'Adventure', slug: 'adventure' },
    ],
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    isDemo: true,
  },
  {
    id: 'demo-m-4',
    type: 'movie',
    title: 'Elephants Dream',
    originalTitle: 'Elephants Dream (Orange Open Movie)',
    overview: 'In an infinite, mysterious mechanical landscape, Proog and Emo navigate a machine built of sound, copper, and infinite recursion, where reality bends to perception.',
    posterPath: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2024-01-20',
    rating: 7.6,
    voteCount: 2190,
    runtime: 11,
    tagline: 'The machine is whatever you believe it is.',
    director: 'Bassam Kurdali',
    cast: [
      { id: 9, name: 'Tygo Gernandt', character: 'Proog (voice)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80' },
      { id: 10, name: 'Cas Jansen', character: 'Emo (voice)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80' },
    ],
    genres: [
      { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
      { id: 16, name: 'Animation', slug: 'animation' },
      { id: 18, name: 'Drama', slug: 'drama' },
    ],
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    isDemo: true,
  },
  {
    id: 'demo-m-5',
    type: 'movie',
    title: 'Cosmos Laundromat',
    originalTitle: 'Cosmos Laundromat: First Cycle',
    overview: 'On a desolate island, a suicidal sheep named Franck meets a quirky salesman named Victor who offers him the gift of endless lives, transporting Franck into bizarre parallel worlds.',
    posterPath: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2024-05-12',
    rating: 8.7,
    voteCount: 4890,
    runtime: 12,
    tagline: 'Infinite lives. One quirky choice.',
    director: 'Mathieu Auvray',
    cast: [
      { id: 11, name: 'Pierre Bokma', character: 'Franck (voice)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80' },
      { id: 12, name: 'Reinout Scholten van Aschat', character: 'Victor (voice)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80' },
    ],
    genres: [
      { id: 16, name: 'Animation', slug: 'animation' },
      { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
      { id: 35, name: 'Comedy', slug: 'comedy' },
    ],
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    isDemo: true,
  },
  {
    id: 'demo-m-6',
    type: 'movie',
    title: 'Charge',
    originalTitle: 'Charge: Real-Time Cyberpunk Action',
    overview: 'In an old energy station, an elderly street thief breaks into a high-security generator to recharge his cybernetic pacemaker, sparking an intense showdown with security guards.',
    posterPath: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2024-07-08',
    rating: 8.5,
    voteCount: 3840,
    runtime: 5,
    tagline: 'High voltage. Zero mercy.',
    director: 'Hjalti Hjalmarsson',
    cast: [
      { id: 13, name: 'Ken Hall', character: 'Old Thief', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80' },
    ],
    genres: [
      { id: 28, name: 'Action', slug: 'action' },
      { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
      { id: 16, name: 'Animation', slug: 'animation' },
    ],
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    isDemo: true,
  },
];

export const DEMO_SERIES: TVShow[] = [
  {
    id: 'demo-s-1',
    type: 'series',
    title: 'Open Cinema Chronicles',
    originalTitle: 'Open Cinema Chronicles',
    overview: 'A deep-dive anthology exploring humanity, distant quantum realities, deep space exploration, and futuristic machine intelligence through groundbreaking CGI storytelling.',
    posterPath: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2023-01-15',
    firstAirDate: '2023-01-15',
    lastAirDate: '2024-06-20',
    rating: 8.9,
    voteCount: 8950,
    numberOfSeasons: 2,
    numberOfEpisodes: 6,
    creator: 'Blender Studio',
    tagline: 'Anthology of human imagination beyond boundaries.',
    status: 'Returning Series',
    genres: [
      { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
      { id: 12, name: 'Adventure', slug: 'adventure' },
      { id: 18, name: 'Drama', slug: 'drama' },
    ],
    cast: [
      { id: 20, name: 'Alexander Vance', character: 'Narrator / Lead', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
      { id: 21, name: 'Dr. Elena Rostova', character: 'Dr. Rostova', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
    ],
    seasons: [
      {
        id: 'demo-s-1-s1',
        seriesId: 'demo-s-1',
        seasonNumber: 1,
        name: 'Season 1: Origins',
        overview: 'The first chapter exploring early cybernetic revolutions and discovery of the quantum anomaly.',
        posterPath: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80',
        episodeCount: 3,
        airDate: '2023-01-15',
        episodes: [
          {
            id: 'demo-s-1-s1-e1',
            seriesId: 'demo-s-1',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'The Dragon Spark',
            overview: 'In an isolated mountain valley, a lost creature is rescued by a wanderer with a forgotten legacy.',
            stillPath: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
            airDate: '2023-01-15',
            runtime: 15,
            rating: 8.8,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          },
          {
            id: 'demo-s-1-s1-e2',
            seriesId: 'demo-s-1',
            seasonNumber: 1,
            episodeNumber: 2,
            title: 'Steel Horizons',
            overview: 'A squad of operatives gathers inside an ancient cathedral to calibrate a machine that alters reality.',
            stillPath: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
            airDate: '2023-02-01',
            runtime: 12,
            rating: 8.5,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          },
          {
            id: 'demo-s-1-s1-e3',
            seriesId: 'demo-s-1',
            seasonNumber: 1,
            episodeNumber: 3,
            title: 'The Infinite Machine',
            overview: 'Two guides wander the infinite gears of a surreal construct where physical laws break down.',
            stillPath: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
            airDate: '2023-02-15',
            runtime: 11,
            rating: 8.2,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          },
        ],
      },
      {
        id: 'demo-s-1-s2',
        seriesId: 'demo-s-1',
        seasonNumber: 2,
        name: 'Season 2: Multiverse Shifts',
        overview: 'Expanding into parallel dimensions, rogue generators, and unexpected comic realities.',
        posterPath: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80',
        episodeCount: 3,
        airDate: '2024-03-01',
        episodes: [
          {
            id: 'demo-s-1-s2-e1',
            seriesId: 'demo-s-1',
            seasonNumber: 2,
            episodeNumber: 1,
            title: 'Wonders of Laundromat',
            overview: 'A strange merchant reveals an endless series of alternate realities waiting on the turn of a dial.',
            stillPath: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
            airDate: '2024-03-01',
            runtime: 12,
            rating: 9.0,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          },
          {
            id: 'demo-s-1-s2-e2',
            seriesId: 'demo-s-1',
            seasonNumber: 2,
            episodeNumber: 2,
            title: 'High Voltage Infiltration',
            overview: 'Deep under the grid, an operative risks everything for a stolen power source to save his crew.',
            stillPath: 'https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=800&auto=format&fit=crop&q=80',
            airDate: '2024-04-10',
            runtime: 6,
            rating: 8.6,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          },
          {
            id: 'demo-s-1-s2-e3',
            seriesId: 'demo-s-1',
            seasonNumber: 2,
            episodeNumber: 3,
            title: 'Spring Blossom Sentinel',
            overview: 'A solitary shepherd girl and her faithful dog protect the ancient forest spirit from awakening winter.',
            stillPath: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&auto=format&fit=crop&q=80',
            airDate: '2024-05-20',
            runtime: 8,
            rating: 9.1,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
          },
        ],
      },
    ],
    isDemo: true,
  },
  {
    id: 'demo-s-2',
    type: 'series',
    title: 'Neon Odyssey',
    originalTitle: 'Neon Odyssey 2099',
    overview: 'A cyberpunk thriller following a cyber-detective racing against synthetic conglomerates to decode the signal behind humanity’s neural awakening.',
    posterPath: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
    backdropPath: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&auto=format&fit=crop&q=80',
    releaseDate: '2023-08-10',
    firstAirDate: '2023-08-10',
    lastAirDate: '2024-02-14',
    rating: 8.6,
    voteCount: 6420,
    numberOfSeasons: 1,
    numberOfEpisodes: 3,
    creator: 'Nexus Cinema Lab',
    tagline: 'In a city of neon glass, secrets are currency.',
    status: 'Completed',
    genres: [
      { id: 878, name: 'Sci-Fi', slug: 'sci-fi' },
      { id: 28, name: 'Action', slug: 'action' },
      { id: 53, name: 'Thriller', slug: 'thriller' },
    ],
    cast: [
      { id: 22, name: 'Kaelen Thorne', character: 'Detective Jax', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
      { id: 23, name: 'Maya Lin', character: 'Aria (AI)', job: 'Actor', profilePath: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
    ],
    seasons: [
      {
        id: 'demo-s-2-s1',
        seriesId: 'demo-s-2',
        seasonNumber: 1,
        name: 'Season 1: The Breach',
        overview: 'Jax uncovers a backdoor into the neural network that controls the mega-metropolis.',
        posterPath: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80',
        episodeCount: 3,
        airDate: '2023-08-10',
        episodes: [
          {
            id: 'demo-s-2-s1-e1',
            seriesId: 'demo-s-2',
            seasonNumber: 1,
            episodeNumber: 1,
            title: 'Midnight Protocol',
            overview: 'A rogue signal knocks out sector 4 power grid, pulling Jax into a dark investigation.',
            stillPath: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80',
            airDate: '2023-08-10',
            runtime: 10,
            rating: 8.7,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
          },
          {
            id: 'demo-s-2-s1-e2',
            seriesId: 'demo-s-2',
            seasonNumber: 1,
            episodeNumber: 2,
            title: 'Synthetic Ghosts',
            overview: 'Infiltrating the mainframe storage facility reveals discarded consciousness archives.',
            stillPath: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80',
            airDate: '2023-08-17',
            runtime: 12,
            rating: 8.5,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          },
          {
            id: 'demo-s-2-s1-e3',
            seriesId: 'demo-s-2',
            seasonNumber: 1,
            episodeNumber: 3,
            title: 'Dawn of Overdrive',
            overview: 'The final confrontation on the skybridge above the cloud line determines the city’s fate.',
            stillPath: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
            airDate: '2023-08-24',
            runtime: 14,
            rating: 8.9,
            streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          },
        ],
      },
    ],
    isDemo: true,
  },
];

export class DemoProvider implements MediaProvider {
  readonly name = 'Demo Open Provider (Legal Public Creative Commons Catalog)';
  readonly isDemo = true;

  async getTrending(): Promise<MediaItem[]> {
    return [...DEMO_MOVIES.slice(0, 4), ...DEMO_SERIES];
  }

  async getPopularMovies(): Promise<Movie[]> {
    return DEMO_MOVIES;
  }

  async getRecentMovies(): Promise<Movie[]> {
    return [...DEMO_MOVIES].sort(
      (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
  }

  async getMovieDetails(id: string): Promise<Movie | null> {
    const movie = DEMO_MOVIES.find((m) => m.id === id);
    return movie || null;
  }

  async getPopularSeries(): Promise<TVShow[]> {
    return DEMO_SERIES;
  }

  async getSeriesDetails(id: string): Promise<TVShow | null> {
    const series = DEMO_SERIES.find((s) => s.id === id);
    return series || null;
  }

  async getSeasonDetails(seriesId: string, seasonNumber: number): Promise<Season | null> {
    const series = await this.getSeriesDetails(seriesId);
    if (!series || !series.seasons) return null;
    const season = series.seasons.find((s) => s.seasonNumber === Number(seasonNumber));
    return season || null;
  }

  async getEpisodes(seriesId: string, seasonNumber: number): Promise<Episode[]> {
    const season = await this.getSeasonDetails(seriesId, seasonNumber);
    return season?.episodes || [];
  }

  async getRecommendations(id: string, type: MediaType): Promise<MediaItem[]> {
    if (type === 'movie') {
      return DEMO_MOVIES.filter((m) => m.id !== id);
    }
    return DEMO_SERIES.filter((s) => s.id !== id);
  }

  async getGenres(): Promise<Genre[]> {
    return DEMO_GENRES;
  }

  async getByGenre(genreSlugOrId: string, type?: MediaType): Promise<MediaItem[]> {
    const query = genreSlugOrId.toLowerCase();
    const allItems: MediaItem[] = type === 'movie' 
      ? DEMO_MOVIES 
      : type === 'series' 
      ? DEMO_SERIES 
      : [...DEMO_MOVIES, ...DEMO_SERIES];

    return allItems.filter((item) =>
      item.genres.some(
        (g) =>
          g.slug.toLowerCase() === query ||
          g.name.toLowerCase() === query ||
          String(g.id) === query
      )
    );
  }

  async search(query: string, type?: 'all' | 'movie' | 'tv'): Promise<SearchResult> {
    const q = (query || '').toLowerCase().trim();
    if (!q) {
      return { results: [], page: 1, totalPages: 1, totalResults: 0 };
    }

    let pool: MediaItem[] = [];
    if (type === 'movie') {
      pool = DEMO_MOVIES;
    } else if (type === 'tv') {
      pool = DEMO_SERIES;
    } else {
      pool = [...DEMO_MOVIES, ...DEMO_SERIES];
    }

    const filtered = pool.filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.overview.toLowerCase().includes(q) ||
      item.genres.some((g) => g.name.toLowerCase().includes(q))
    );

    return {
      results: filtered,
      page: 1,
      totalPages: 1,
      totalResults: filtered.length,
    };
  }

  async getPlaybackInfo(id: string, seasonNum?: number, epNum?: number): Promise<PlaybackInfo | null> {
    // 1. Check if it's a movie
    const movie = DEMO_MOVIES.find((m) => m.id === id);
    if (movie) {
      return {
        id: movie.id,
        title: movie.title,
        mediaType: 'movie',
        backdropPath: movie.backdropPath,
        posterPath: movie.posterPath,
        duration: (movie.runtime || 15) * 60,
        sources: [
          {
            quality: '1080p Full HD',
            src: movie.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            type: 'video/mp4',
          },
          {
            quality: '720p HD',
            src: movie.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            type: 'video/mp4',
          },
        ],
        subtitles: [
          {
            id: 'sub-en',
            label: 'English [CC]',
            language: 'en',
            src: 'data:text/vtt;charset=utf-8,WEBVTT%0A%0A1%0A00:00:01.000%20-->%2000:00:04.000%0AWelcome%20to%20FilemVlix%20Streaming%20Player%0A%0A2%0A00:00:04.500%20-->%2000:00:08.000%0AHigh-fidelity%20cinematic%20playback%20ready',
            default: true,
          },
          {
            id: 'sub-id',
            label: 'Bahasa Indonesia',
            language: 'id',
            src: 'data:text/vtt;charset=utf-8,WEBVTT%0A%0A1%0A00:00:01.000%20-->%2000:00:04.000%0ASelamat%20datang%20di%20FilemVlix%20Player%0A%0A2%0A00:00:04.500%20-->%2000:00:08.000%0APutaran%20sinematik%20definisi%20tinggi%20siap',
          },
        ],
      };
    }

    // 2. Check if it's a TV series / episode
    for (const series of DEMO_SERIES) {
      if (series.id === id) {
        const sNum = seasonNum || 1;
        const eNum = epNum || 1;
        const season = series.seasons?.find((s) => s.seasonNumber === sNum);
        const episode = season?.episodes?.find((e) => e.episodeNumber === eNum) || season?.episodes?.[0];

        if (episode) {
          const nextEp = season?.episodes?.find((e) => e.episodeNumber === episode.episodeNumber + 1);
          const prevEp = season?.episodes?.find((e) => e.episodeNumber === episode.episodeNumber - 1);

          return {
            id: episode.id,
            title: episode.title,
            mediaType: 'series',
            seriesTitle: series.title,
            seasonNumber: episode.seasonNumber,
            episodeNumber: episode.episodeNumber,
            nextEpisodeId: nextEp ? `${series.id}?season=${season?.seasonNumber}&episode=${nextEp.episodeNumber}` : undefined,
            prevEpisodeId: prevEp ? `${series.id}?season=${season?.seasonNumber}&episode=${prevEp.episodeNumber}` : undefined,
            backdropPath: episode.stillPath || series.backdropPath,
            posterPath: series.posterPath,
            duration: (episode.runtime || 15) * 60,
            sources: [
              {
                quality: '1080p Full HD',
                src: episode.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                type: 'video/mp4',
              },
            ],
            subtitles: [
              {
                id: 'sub-en',
                label: 'English [CC]',
                language: 'en',
                src: 'data:text/vtt;charset=utf-8,WEBVTT%0A%0A1%0A00:00:01.000%20-->%2000:00:04.000%0AFilemVlix%20Episodic%20Stream%0A%0A2%0A00:00:04.500%20-->%2000:00:08.000%0AEnjoy%20the%20show',
                default: true,
              },
            ],
          };
        }
      }
    }

    // 3. Check direct episode id match
    for (const series of DEMO_SERIES) {
      for (const season of series.seasons || []) {
        const episode = season.episodes?.find((e) => e.id === id);
        if (episode) {
          return {
            id: episode.id,
            title: episode.title,
            mediaType: 'series',
            seriesTitle: series.title,
            seasonNumber: episode.seasonNumber,
            episodeNumber: episode.episodeNumber,
            backdropPath: episode.stillPath || series.backdropPath,
            posterPath: series.posterPath,
            duration: (episode.runtime || 15) * 60,
            sources: [
              {
                quality: '1080p Full HD',
                src: episode.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                type: 'video/mp4',
              },
            ],
          };
        }
      }
    }

    return null;
  }
}
