import { NextRequest, NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { TVShow } from '@/types/media';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ success: false, error: 'Series ID required' }, { status: 400 });
    }

    const provider = getMediaProvider();
    const series = await provider.getSeriesDetails(id);

    if (!series) {
      return NextResponse.json(
        { success: false, error: 'Series not found', timestamp: new Date().toISOString() },
        { status: 404 }
      );
    }

    const response: ApiResponse<TVShow> = {
      success: true,
      data: series,
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
