import { NextRequest, NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { MediaItem, MediaType } from '@/types/media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const type = (searchParams.get('type') || 'movie') as MediaType;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Media ID required' }, { status: 400 });
    }

    const provider = getMediaProvider();
    const recommendations = await provider.getRecommendations(id, type);

    const response: ApiResponse<MediaItem[]> = {
      success: true,
      data: recommendations,
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
