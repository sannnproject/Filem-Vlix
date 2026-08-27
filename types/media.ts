export type MediaType = 'movie' | 'series';

export interface Genre {
  id: number | string;
  name: string;
  slug: string;
}

export interface Person {
  id: number | string;
  name: string;
  character?: string;
  job?: string;
  profilePath?: string | null;
}

export interface MediaItem {
  id: string;
  title: string;
  originalTitle?: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  rating: number;
  voteCount?: number;
  genres: Genre[];
  type: MediaType;
  runtime?: number; // in minutes
  streamUrl?: string;
  trailerUrl?: string;
  isDemo?: boolean;
  tagline?: string;
}

export interface Movie extends MediaItem {
  type: 'movie';
  director?: string;
  cast?: Person[];
  budget?: number;
  revenue?: number;
  tagline?: string;
  status?: string;
}

export interface Episode {
  id: string;
  seriesId: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  overview: string;
  stillPath: string;
  airDate: string;
  runtime?: number;
  rating?: number;
  streamUrl?: string;
}

export interface Season {
  id: string;
  seriesId: string;
  seasonNumber: number;
  name: string;
  overview?: string;
  posterPath?: string;
  episodeCount: number;
  airDate?: string;
  episodes?: Episode[];
}

export interface TVShow extends MediaItem {
  type: 'series';
  numberOfSeasons: number;
  numberOfEpisodes: number;
  seasons?: Season[];
  cast?: Person[];
  creator?: string;
  firstAirDate?: string;
  lastAirDate?: string;
  status?: string;
  tagline?: string;
}

export interface SearchResult {
  results: MediaItem[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export interface SubtitleTrack {
  id: string;
  label: string;
  language: string;
  src: string;
  default?: boolean;
}

export interface VideoSource {
  quality: string;
  src: string;
  type?: string;
}

export interface PlaybackInfo {
  id: string;
  title: string;
  mediaType: MediaType;
  seriesTitle?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  nextEpisodeId?: string;
  prevEpisodeId?: string;
  sources: VideoSource[];
  subtitles?: SubtitleTrack[];
  backdropPath?: string;
  posterPath?: string;
  duration?: number;
  savedPosition?: number;
}

export interface WatchProgress {
  id: string;
  mediaType: MediaType;
  title: string;
  seriesTitle?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  posterPath: string;
  backdropPath: string;
  currentTime: number;
  duration: number;
  progressPercent: number;
  updatedAt: number;
}

export interface FavoriteItem {
  id: string;
  mediaType: MediaType;
  title: string;
  posterPath: string;
  backdropPath: string;
  rating: number;
  releaseDate: string;
  genres: Genre[];
  addedAt: number;
}
