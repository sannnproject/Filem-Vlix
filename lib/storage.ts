'use client';

import { useSyncExternalStore } from 'react';
import { WatchProgress, FavoriteItem, MediaItem } from '@/types/media';

const STORAGE_KEYS = {
  HISTORY: 'filemvlix_watch_history',
  FAVORITES: 'filemvlix_favorites',
  LEGACY_HISTORY: 'nexttube_watch_history',
  LEGACY_FAVORITES: 'nexttube_favorites',
} as const;

export const STORAGE_EVENT = 'filemvlix_storage_update';

function notifyStorageChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
  }
}

// ----------------------------------------------------
// WATCH HISTORY & PROGRESS
// ----------------------------------------------------

export function getWatchHistory(): WatchProgress[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to read watch history from localStorage', error);
    return [];
  }
}

export function savePlaybackPosition(
  id: string,
  currentTime: number,
  duration: number,
  metadata?: {
    mediaType: 'movie' | 'series';
    title: string;
    seriesTitle?: string;
    seasonNumber?: number;
    episodeNumber?: number;
    posterPath?: string;
    backdropPath?: string;
  }
) {
  if (typeof window === 'undefined' || !id || duration <= 0) return;

  try {
    const history = getWatchHistory();
    const progressPercent = Math.min(100, Math.round((currentTime / duration) * 100));

    const existingIndex = history.findIndex((item) => item.id === id);

    const updatedItem: WatchProgress = {
      id,
      mediaType: metadata?.mediaType || 'movie',
      title: metadata?.title || 'Untitled',
      seriesTitle: metadata?.seriesTitle,
      seasonNumber: metadata?.seasonNumber,
      episodeNumber: metadata?.episodeNumber,
      posterPath: metadata?.posterPath || '',
      backdropPath: metadata?.backdropPath || '',
      currentTime,
      duration,
      progressPercent,
      updatedAt: Date.now(),
    };

    if (existingIndex >= 0) {
      history[existingIndex] = updatedItem;
    } else {
      history.unshift(updatedItem);
    }

    const trimmed = history.slice(0, 50);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
    notifyStorageChange();
  } catch (error) {
    console.error('Failed to save playback progress', error);
  }
}

export function getPlaybackPosition(id: string): number {
  const history = getWatchHistory();
  const found = history.find((item) => item.id === id);
  return found ? found.currentTime : 0;
}

export function removeFromWatchHistory(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const history = getWatchHistory().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    notifyStorageChange();
  } catch (error) {
    console.error('Failed to remove history item', error);
  }
}

export function clearWatchHistory() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    notifyStorageChange();
  } catch (error) {
    console.error('Failed to clear watch history', error);
  }
}

export function getContinueWatching(): WatchProgress[] {
  const history = getWatchHistory();
  return history.filter((item) => item.progressPercent > 2 && item.progressPercent < 95);
}

// ----------------------------------------------------
// FAVORITES / SAVED MEDIA
// ----------------------------------------------------

export function getFavorites(): FavoriteItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('Failed to read favorites from localStorage', error);
    return [];
  }
}

export function isFavorite(id: string): boolean {
  const favs = getFavorites();
  return favs.some((item) => item.id === id);
}

export function toggleFavorite(media: MediaItem): boolean {
  if (typeof window === 'undefined' || !media?.id) return false;

  try {
    const favorites = getFavorites();
    const index = favorites.findIndex((item) => item.id === media.id);

    let isNowFavorite = false;

    if (index >= 0) {
      favorites.splice(index, 1);
      isNowFavorite = false;
    } else {
      const newFav: FavoriteItem = {
        id: media.id,
        title: media.title,
        posterPath: media.posterPath,
        backdropPath: media.backdropPath,
        releaseDate: media.releaseDate || '',
        rating: media.rating || 0,
        mediaType: media.type,
        genres: media.genres || [],
        addedAt: Date.now(),
      };
      favorites.unshift(newFav);
      isNowFavorite = true;
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    notifyStorageChange();
    return isNowFavorite;
  } catch (error) {
    console.error('Failed to toggle favorite', error);
    return false;
  }
}

export function clearFavorites() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    notifyStorageChange();
  } catch (error) {
    console.error('Failed to clear favorites', error);
  }
}

// ----------------------------------------------------
// REACT 18/19 EXTERNAL STORE HOOKS & SNAPSHOT CACHING
// ----------------------------------------------------

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(STORAGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

const emptyFavorites: FavoriteItem[] = [];
const emptyHistory: WatchProgress[] = [];
const emptyContinueWatching: WatchProgress[] = [];

let cachedFavoritesRaw: string | null = null;
let cachedFavoritesList: FavoriteItem[] = emptyFavorites;
let cachedFavoritesSet: Set<string> = new Set();

function getFavoritesSnapshot(): FavoriteItem[] {
  if (typeof window === 'undefined') return emptyFavorites;
  try {
    let raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_FAVORITES);
      if (raw) {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, raw);
      }
    }
    if (raw === cachedFavoritesRaw) {
      return cachedFavoritesList;
    }
    cachedFavoritesRaw = raw;
    cachedFavoritesList = raw ? JSON.parse(raw) : emptyFavorites;
    cachedFavoritesSet = new Set(cachedFavoritesList.map((f) => f.id));
    return cachedFavoritesList;
  } catch {
    return emptyFavorites;
  }
}

let cachedHistoryRaw: string | null = null;
let cachedHistoryList: WatchProgress[] = emptyHistory;
let cachedContinueWatchingList: WatchProgress[] = emptyContinueWatching;

function getHistorySnapshot(): WatchProgress[] {
  if (typeof window === 'undefined') return emptyHistory;
  try {
    let raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) {
      raw = localStorage.getItem(STORAGE_KEYS.LEGACY_HISTORY);
      if (raw) {
        localStorage.setItem(STORAGE_KEYS.HISTORY, raw);
      }
    }
    if (raw === cachedHistoryRaw) {
      return cachedHistoryList;
    }
    cachedHistoryRaw = raw;
    cachedHistoryList = raw ? JSON.parse(raw) : emptyHistory;
    cachedContinueWatchingList = cachedHistoryList.filter(
      (item) => item.progressPercent > 2 && item.progressPercent < 95
    );
    return cachedHistoryList;
  } catch {
    return emptyHistory;
  }
}

function getContinueWatchingSnapshot(): WatchProgress[] {
  getHistorySnapshot();
  return cachedContinueWatchingList;
}

export function useFavorites(): FavoriteItem[] {
  return useSyncExternalStore(
    subscribe,
    getFavoritesSnapshot,
    () => emptyFavorites
  );
}

export function useIsFavorite(id: string): boolean {
  return useSyncExternalStore(
    subscribe,
    () => {
      getFavoritesSnapshot();
      return cachedFavoritesSet.has(id);
    },
    () => false
  );
}

export function useWatchHistory(): WatchProgress[] {
  return useSyncExternalStore(
    subscribe,
    getHistorySnapshot,
    () => emptyHistory
  );
}

export function useContinueWatching(): WatchProgress[] {
  return useSyncExternalStore(
    subscribe,
    getContinueWatchingSnapshot,
    () => emptyContinueWatching
  );
}

export function useItemProgress(id: string): number | null {
  return useSyncExternalStore(
    subscribe,
    () => {
      const history = getHistorySnapshot();
      const item = history.find((h) => h.id === id);
      return item && item.progressPercent > 0 ? item.progressPercent : null;
    },
    () => null
  );
}
