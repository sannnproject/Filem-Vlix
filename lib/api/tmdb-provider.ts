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
  Person,
} from '@/types/media';
import { config } from '../config';

interface TMDBMovieResult {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  status?: string;
  videos?: { results: { key: string; site: string; type: string }[] };
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string; department: string }[];
  };
}

interface TMDBTVResult {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date?: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  tagline?: string;
  status?: string;
  created_by?: { id: number; name: string }[];
  seasons?: {
    id: number;
    season_number: number;
    name: string;
    overview: string;
    poster_path: string | null;
    episode_count: number;
    air_date: string;
  }[];
  videos?: { results: { key: string; site: string; type: string }[] };
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string; department: string }[];
  };
}

interface TMDBSeasonResult {
  id: number;
  season_number: number;
  name: string;
  overview: string;
  poster_path: string | null;
  air_date: string;
  episodes: {
    id: number;
    episode_number: number;
    season_number: number;
    name: string;
    overview: string;
    still_path: string | null;
    air_date: string;
    runtime?: number;
    vote_average: number;
  }[];
}

const TMDB_GENRE_MAP: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};

function formatImageUrl(path: string | null, size: 'w500' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) {
    return 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1280&auto=format&fit=crop&q=80';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

function mapGenreIds(genreIds?: number[], genres?: { id: number; name: string }[]): Genre[] {
  if (genres && genres.length > 0) {
    return genres.map((g) => ({
      id: g.id,
      name: g.name,
      slug: g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));
  }
  if (genreIds && genreIds.length > 0) {
    return genreIds.map((id) => {
      const name = TMDB_GENRE_MAP[id] || 'General';
      return {
        id,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      };
    });
  }
  return [{ id: 18, name: 'Drama', slug: 'drama' }];
}

export class TMDBProvider implements MediaProvider {
  readonly name = 'The Movie Database (TMDB)';
  readonly isDemo = false;
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.themoviedb.org/3') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async fetchTMDB<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    const isBearer = this.apiKey.startsWith('eyJ') || this.apiKey.length > 50;

    if (!isBearer) {
      url.searchParams.set('api_key', this.apiKey.trim());
    }
    url.searchParams.set('language', 'en-US');

    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        url.searchParams.set(k, String(v));
      }
    });

    const headers: Record<string, string> = {
      Accept: 'application/json',
    };

    if (isBearer) {
      headers['Authorization'] = `Bearer ${this.apiKey.trim()}`;
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 }, // 1 hour cache on server
      headers,
    });

    if (!res.ok) {
      throw new Error(`TMDB request failed: ${res.status} ${res.statusText} (${endpoint})`);
    }

    return res.json();
  }

  private transformMovie(item: TMDBMovieResult): Movie {
    const trailer = item.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') || item.videos?.results[0];
    const director = item.credits?.crew.find((c) => c.job === 'Director')?.name;
    const cast: Person[] = (item.credits?.cast || []).slice(0, 10).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profilePath: c.profile_path ? formatImageUrl(c.profile_path, 'w500') : undefined,
    }));

    return {
      id: String(item.id),
      type: 'movie',
      title: item.title,
      originalTitle: item.original_title,
      overview: item.overview || 'No synopsis available.',
      posterPath: formatImageUrl(item.poster_path, 'w500'),
      backdropPath: formatImageUrl(item.backdrop_path, 'w1280'),
      releaseDate: item.release_date || '2024-01-01',
      rating: Math.round((item.vote_average || 0) * 10) / 10,
      voteCount: item.vote_count,
      genres: mapGenreIds(item.genre_ids, item.genres),
      runtime: item.runtime || 110,
      director,
      cast,
      tagline: item.tagline,
      status: item.status,
      trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      isDemo: false,
    };
  }

  private transformTVShow(item: TMDBTVResult): TVShow {
    const trailer = item.videos?.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') || item.videos?.results[0];
    const cast: Person[] = (item.credits?.cast || []).slice(0, 10).map((c) => ({
      id: c.id,
      name: c.name,
      character: c.character,
      profilePath: c.profile_path ? formatImageUrl(c.profile_path, 'w500') : undefined,
    }));

    const seasons: Season[] = (item.seasons || [])
      .filter((s) => s.season_number > 0)
      .map((s) => ({
        id: `s-${s.id}`,
        seriesId: String(item.id),
        seasonNumber: s.season_number,
        name: s.name,
        overview: s.overview,
        posterPath: formatImageUrl(s.poster_path, 'w500'),
        episodeCount: s.episode_count,
        airDate: s.air_date,
      }));

    return {
      id: String(item.id),
      type: 'series',
      title: item.name,
      originalTitle: item.original_name,
      overview: item.overview || 'No synopsis available.',
      posterPath: formatImageUrl(item.poster_path, 'w500'),
      backdropPath: formatImageUrl(item.backdrop_path, 'w1280'),
      releaseDate: item.first_air_date || '2024-01-01',
      firstAirDate: item.first_air_date,
      lastAirDate: item.last_air_date,
      rating: Math.round((item.vote_average || 0) * 10) / 10,
      voteCount: item.vote_count,
      genres: mapGenreIds(item.genre_ids, item.genres),
      numberOfSeasons: item.number_of_seasons || seasons.length || 1,
      numberOfEpisodes: item.number_of_episodes || 10,
      creator: item.created_by?.[0]?.name,
      cast,
      seasons,
      tagline: item.tagline,
      status: item.status,
      trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : undefined,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      isDemo: false,
    };
  }

  async getTrending(type: 'all' | 'movie' | 'tv' = 'all', page: number = 1): Promise<MediaItem[]> {
    const data = await this.fetchTMDB<{ results: (TMDBMovieResult | TMDBTVResult)[] }>(
      `/trending/${type}/week`,
      { page }
    );
    return data.results.map((item) => {
      if ('title' in item) {
        return this.transformMovie(item as TMDBMovieResult);
      } else {
        return this.transformTVShow(item as TMDBTVResult);
      }
    });
  }

  async getPopularMovies(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchTMDB<{ results: TMDBMovieResult[] }>('/movie/popular', { page });
    return data.results.map((m) => this.transformMovie(m));
  }

  async getRecentMovies(page: number = 1): Promise<Movie[]> {
    const data = await this.fetchTMDB<{ results: TMDBMovieResult[] }>('/movie/now_playing', { page });
    return data.results.map((m) => this.transformMovie(m));
  }

  async getMovieDetails(id: string): Promise<Movie | null> {
    try {
      const data = await this.fetchTMDB<TMDBMovieResult>(`/movie/${id}`, {
        append_to_response: 'credits,videos',
      });
      return this.transformMovie(data);
    } catch {
      return null;
    }
  }

  async getPopularSeries(page: number = 1): Promise<TVShow[]> {
    const data = await this.fetchTMDB<{ results: TMDBTVResult[] }>('/tv/popular', { page });
    return data.results.map((s) => this.transformTVShow(s));
  }

  async getSeriesDetails(id: string): Promise<TVShow | null> {
    try {
      const data = await this.fetchTMDB<TMDBTVResult>(`/tv/${id}`, {
        append_to_response: 'credits,videos',
      });
      return this.transformTVShow(data);
    } catch {
      return null;
    }
  }

  async getSeasonDetails(seriesId: string, seasonNumber: number): Promise<Season | null> {
    try {
      const data = await this.fetchTMDB<TMDBSeasonResult>(`/tv/${seriesId}/season/${seasonNumber}`);
      const episodes: Episode[] = (data.episodes || []).map((ep) => ({
        id: `${seriesId}-s${seasonNumber}-e${ep.episode_number}`,
        seriesId,
        seasonNumber: ep.season_number,
        episodeNumber: ep.episode_number,
        title: ep.name,
        overview: ep.overview || 'No episode description available.',
        stillPath: formatImageUrl(ep.still_path, 'w500'),
        airDate: ep.air_date,
        runtime: ep.runtime || 45,
        rating: Math.round((ep.vote_average || 0) * 10) / 10,
        streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      }));

      return {
        id: `s-${data.id}`,
        seriesId,
        seasonNumber: data.season_number,
        name: data.name,
        overview: data.overview,
        posterPath: formatImageUrl(data.poster_path, 'w500'),
        episodeCount: episodes.length,
        airDate: data.air_date,
        episodes,
      };
    } catch {
      return null;
    }
  }

  async getEpisodes(seriesId: string, seasonNumber: number): Promise<Episode[]> {
    const season = await this.getSeasonDetails(seriesId, seasonNumber);
    return season?.episodes || [];
  }

  async getRecommendations(id: string, type: MediaType): Promise<MediaItem[]> {
    const endpoint = type === 'movie' ? `/movie/${id}/recommendations` : `/tv/${id}/recommendations`;
    try {
      const data = await this.fetchTMDB<{ results: (TMDBMovieResult | TMDBTVResult)[] }>(endpoint);
      return data.results.slice(0, 10).map((item) => {
        if ('title' in item) {
          return this.transformMovie(item as TMDBMovieResult);
        } else {
          return this.transformTVShow(item as TMDBTVResult);
        }
      });
    } catch {
      return [];
    }
  }

  async getGenres(): Promise<Genre[]> {
    return Object.entries(TMDB_GENRE_MAP).map(([id, name]) => ({
      id: Number(id),
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    }));
  }

  async getByGenre(genreSlugOrId: string, type?: MediaType, page: number = 1): Promise<MediaItem[]> {
    // Lookup genre ID
    const entry = Object.entries(TMDB_GENRE_MAP).find(
      ([id, name]) =>
        id === genreSlugOrId ||
        name.toLowerCase() === genreSlugOrId.toLowerCase() ||
        name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === genreSlugOrId.toLowerCase()
    );
    const genreId = entry ? entry[0] : '28';

    if (type === 'series') {
      const data = await this.fetchTMDB<{ results: TMDBTVResult[] }>('/discover/tv', {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      });
      return data.results.map((s) => this.transformTVShow(s));
    } else {
      const data = await this.fetchTMDB<{ results: TMDBMovieResult[] }>('/discover/movie', {
        with_genres: genreId,
        page,
        sort_by: 'popularity.desc',
      });
      return data.results.map((m) => this.transformMovie(m));
    }
  }

  async search(query: string, type: 'all' | 'movie' | 'tv' = 'all', page: number = 1): Promise<SearchResult> {
    const endpoint = type === 'movie' ? '/search/movie' : type === 'tv' ? '/search/tv' : '/search/multi';
    const data = await this.fetchTMDB<{
      results: (TMDBMovieResult | TMDBTVResult & { media_type?: string })[];
      page: number;
      total_pages: number;
      total_results: number;
    }>(endpoint, { query, page });

    const results: MediaItem[] = [];
    for (const item of data.results) {
      if ('title' in item) {
        results.push(this.transformMovie(item as TMDBMovieResult));
      } else if ('name' in item) {
        results.push(this.transformTVShow(item as TMDBTVResult));
      }
    }

    return {
      results,
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    };
  }

  async getPlaybackInfo(id: string, seasonNum?: number, epNum?: number): Promise<PlaybackInfo | null> {
    // Try movie first
    const movie = await this.getMovieDetails(id);
    if (movie) {
      return {
        id: movie.id,
        title: movie.title,
        mediaType: 'movie',
        backdropPath: movie.backdropPath,
        posterPath: movie.posterPath,
        duration: (movie.runtime || 110) * 60,
        sources: [
          {
            quality: '1080p High Stream',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
          },
          {
            quality: '720p Standard Stream',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'video/mp4',
          },
        ],
        subtitles: [
          {
            id: 'sub-en',
            label: 'English [CC]',
            language: 'en',
            src: 'data:text/vtt;charset=utf-8,WEBVTT%0A%0A1%0A00:00:01.000%20-->%2000:00:05.000%0AFilemVlix%20Cinematic%20Stream%0A%0A2%0A00:00:05.500%20-->%2000:00:10.000%0AEnjoy%20watching%20' + encodeURIComponent(movie.title),
            default: true,
          },
        ],
      };
    }

    // Try series
    const series = await this.getSeriesDetails(id);
    if (series) {
      const sNum = seasonNum || 1;
      const eNum = epNum || 1;
      const episodes = await this.getEpisodes(id, sNum);
      const episode = episodes.find((e) => e.episodeNumber === eNum) || episodes[0];

      return {
        id: episode ? episode.id : id,
        title: episode ? episode.title : series.title,
        mediaType: 'series',
        seriesTitle: series.title,
        seasonNumber: sNum,
        episodeNumber: eNum,
        nextEpisodeId: `${id}?season=${sNum}&episode=${eNum + 1}`,
        prevEpisodeId: eNum > 1 ? `${id}?season=${sNum}&episode=${eNum - 1}` : undefined,
        backdropPath: episode?.stillPath || series.backdropPath,
        posterPath: series.posterPath,
        duration: (episode?.runtime || 45) * 60,
        sources: [
          {
            quality: '1080p High Stream',
            src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            type: 'video/mp4',
          },
        ],
        subtitles: [
          {
            id: 'sub-en',
            label: 'English [CC]',
            language: 'en',
            src: 'data:text/vtt;charset=utf-8,WEBVTT%0A%0A1%0A00:00:01.000%20-->%2000:00:05.000%0AFilemVlix%20Episodic%20Stream%0A%0A2%0A00:00:05.500%20-->%2000:00:10.000%0AFilemVlix%20Series%20Player',
            default: true,
          },
        ],
      };
    }

    return null;
  }
}
