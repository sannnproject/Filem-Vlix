import { MediaProvider } from './provider';
import { DemoProvider } from './demo-provider';
import { TMDBProvider } from './tmdb-provider';
import { config } from '../config';

let cachedProvider: MediaProvider | null = null;

export function getMediaProvider(): MediaProvider {
  if (cachedProvider) {
    return cachedProvider;
  }

  // If a valid TMDB key is provided and provider is tmdb/auto
  if (config.mediaApiKey && config.mediaApiKey.trim().length > 0 && config.mediaProvider !== 'demo') {
    cachedProvider = new TMDBProvider(config.mediaApiKey, config.mediaApiUrl);
  } else {
    // Default fallback to high quality legal Open Demo provider
    cachedProvider = new DemoProvider();
  }

  return cachedProvider;
}

export * from './provider';
export * from './demo-provider';
export * from './tmdb-provider';
