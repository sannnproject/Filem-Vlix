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
import { getMediaProvider } from './index';

// Server-safe helper: can be called directly in Next.js Server Components
export async function getTrendingMedia(type: 'all' | 'movie' | 'tv' = 'all', page: number = 1): Promise<MediaItem[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getTrending(type, page);
  } catch (err) {
    console.error('Failed to get trending media:', err);
    return [];
  }
}

export async function getPopularMovies(page: number = 1): Promise<Movie[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getPopularMovies(page);
  } catch (err) {
    console.error('Failed to get popular movies:', err);
    return [];
  }
}

export async function getRecentMovies(page: number = 1): Promise<Movie[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getRecentMovies(page);
  } catch (err) {
    console.error('Failed to get recent movies:', err);
    return [];
  }
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  try {
    const provider = getMediaProvider();
    return await provider.getMovieDetails(id);
  } catch (err) {
    console.error(`Failed to get movie details for ${id}:`, err);
    return null;
  }
}

export async function getPopularSeries(page: number = 1): Promise<TVShow[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getPopularSeries(page);
  } catch (err) {
    console.error('Failed to get popular series:', err);
    return [];
  }
}

export async function getSeriesDetails(id: string): Promise<TVShow | null> {
  try {
    const provider = getMediaProvider();
    return await provider.getSeriesDetails(id);
  } catch (err) {
    console.error(`Failed to get series details for ${id}:`, err);
    return null;
  }
}

export async function getSeasonDetails(seriesId: string, seasonNumber: number): Promise<Season | null> {
  try {
    const provider = getMediaProvider();
    return await provider.getSeasonDetails(seriesId, seasonNumber);
  } catch (err) {
    console.error(`Failed to get season ${seasonNumber} for series ${seriesId}:`, err);
    return null;
  }
}

export async function getEpisodes(seriesId: string, seasonNumber: number): Promise<Episode[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getEpisodes(seriesId, seasonNumber);
  } catch (err) {
    console.error(`Failed to get episodes for series ${seriesId} season ${seasonNumber}:`, err);
    return [];
  }
}

export async function getRecommendations(id: string, type: MediaType): Promise<MediaItem[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getRecommendations(id, type);
  } catch (err) {
    console.error(`Failed to get recommendations for ${id}:`, err);
    return [];
  }
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getGenres();
  } catch (err) {
    console.error('Failed to get genres:', err);
    return [];
  }
}

export async function getByGenre(genreSlugOrId: string, type?: MediaType, page: number = 1): Promise<MediaItem[]> {
  try {
    const provider = getMediaProvider();
    return await provider.getByGenre(genreSlugOrId, type, page);
  } catch (err) {
    console.error(`Failed to get media for genre ${genreSlugOrId}:`, err);
    return [];
  }
}

export async function searchMedia(query: string, type: 'all' | 'movie' | 'tv' = 'all', page: number = 1): Promise<SearchResult> {
  try {
    const provider = getMediaProvider();
    return await provider.search(query, type, page);
  } catch (err) {
    console.error(`Failed to search media for "${query}":`, err);
    return { results: [], page: 1, totalPages: 1, totalResults: 0 };
  }
}

export async function getPlaybackInfo(id: string, seasonNumber?: number, episodeNumber?: number): Promise<PlaybackInfo | null> {
  try {
    const provider = getMediaProvider();
    return await provider.getPlaybackInfo(id, seasonNumber, episodeNumber);
  } catch (err) {
    console.error(`Failed to get playback info for ${id}:`, err);
    return null;
  }
}
