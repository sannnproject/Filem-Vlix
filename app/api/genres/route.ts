import { NextRequest, NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { Genre, MediaItem, MediaType } from '@/types/media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const type = (searchParams.get('type') || undefined) as MediaType | undefined;
    const page = parseInt(searchParams.get('page') || '1', 10);

    const provider = getMediaProvider();

    if (slug) {
      const items = await provider.getByGenre(slug, type, page);
      const response: ApiResponse<MediaItem[]> = {
        success: true,
        data: items,
        provider: provider.name,
        isDemo: provider.isDemo,
        timestamp: new Date().toISOString(),
      };
      return NextResponse.json(response);
    }

    const genres = await provider.getGenres();
    const response: ApiResponse<Genre[]> = {
      success: true,
      data: genres,
      provider: provider.name,
      isDemo: provider.isDemo,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
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
