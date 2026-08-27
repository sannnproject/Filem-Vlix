/**
 * FilemVlix Configuration Manager
 * Handles API provider keys, URLs, and runtime configs safely.
 */

export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || 'http://localhost:3000',
  mediaApiKey:
    process.env.MEDIA_API_KEY ||
    process.env.TMDB_API_KEY ||
    process.env.TMDB_READ_TOKEN ||
    process.env.TMDB_KEY ||
    '',
  mediaApiUrl:
    process.env.MEDIA_API_URL ||
    process.env.TMDB_API_URL ||
    'https://api.themoviedb.org/3',
  mediaProvider: (
    process.env.MEDIA_API_PROVIDER ||
    process.env.MEDIA_PROVIDER ||
    'tmdb'
  ) as 'tmdb' | 'custom' | 'demo',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p',
  isProduction: process.env.NODE_ENV === 'production',
};

export function isProviderConfigured(): boolean {
  // Provider is considered configured if MEDIA_API_KEY is supplied
  return Boolean(config.mediaApiKey && config.mediaApiKey.trim().length > 0);
}
