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

export interface MediaProvider {
  readonly name: string;
  readonly isDemo: boolean;

  getTrending(type?: 'all' | 'movie' | 'tv', page?: number): Promise<MediaItem[]>;
  getPopularMovies(page?: number): Promise<Movie[]>;
  getRecentMovies(page?: number): Promise<Movie[]>;
  getMovieDetails(id: string): Promise<Movie | null>;
  getPopularSeries(page?: number): Promise<TVShow[]>;
  getSeriesDetails(id: string): Promise<TVShow | null>;
  getSeasonDetails(seriesId: string, seasonNumber: number): Promise<Season | null>;
  getEpisodes(seriesId: string, seasonNumber: number): Promise<Episode[]>;
  getRecommendations(id: string, type: MediaType): Promise<MediaItem[]>;
  getGenres(): Promise<Genre[]>;
  getByGenre(genreSlugOrId: string, type?: MediaType, page?: number): Promise<MediaItem[]>;
  search(query: string, type?: 'all' | 'movie' | 'tv', page?: number): Promise<SearchResult>;
  getPlaybackInfo(id: string, season?: number, episode?: number): Promise<PlaybackInfo | null>;
}
