import { NextRequest, NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { MediaItem } from '@/types/media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get('type') || 'all') as 'all' | 'movie' | 'tv';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const provider = getMediaProvider();
    const items = await provider.getTrending(type, page);

    const response: ApiResponse<MediaItem[]> = {
      success: true,
      data: items,
      provider: provider.name,
      isDemo: provider.isDemo,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
