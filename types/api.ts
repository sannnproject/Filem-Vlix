import { MediaItem, Movie, TVShow, Season, Episode, Genre, SearchResult, PlaybackInfo } from './media';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  provider?: string;
  isDemo?: boolean;
  timestamp: string;
}

export interface MediaListResponse {
  items: MediaItem[];
  page: number;
  totalPages: number;
  totalResults: number;
  provider: string;
  isDemo: boolean;
}

export interface ProviderStatus {
  provider: 'tmdb' | 'custom' | 'demo';
  configured: boolean;
  message: string;
}
