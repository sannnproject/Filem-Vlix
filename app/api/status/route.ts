import { NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { isProviderConfigured, config } from '@/lib/config';
import { ProviderStatus } from '@/types/api';

export async function GET() {
  const provider = getMediaProvider();
  const configured = isProviderConfigured();

  const status: ProviderStatus = {
    provider: config.mediaApiKey ? 'tmdb' : 'demo',
    configured,
    message: configured
      ? `Active provider: ${provider.name} (Live Catalog Mode)`
      : `Active provider: ${provider.name} (Demo Mode - Set MEDIA_API_KEY for full TMDB catalog)`,
  };

  return NextResponse.json({
    success: true,
    data: status,
    timestamp: new Date().toISOString(),
  });
}
