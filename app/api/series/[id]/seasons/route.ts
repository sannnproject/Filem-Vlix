import { NextRequest, NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { Season } from '@/types/media';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(request.url);
    const seasonNumber = searchParams.get('season');

    const provider = getMediaProvider();

    if (seasonNumber) {
      const season = await provider.getSeasonDetails(id, parseInt(seasonNumber, 10));
      if (!season) {
        return NextResponse.json({ success: false, error: 'Season not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: season,
        provider: provider.name,
        isDemo: provider.isDemo,
        timestamp: new Date().toISOString(),
      });
    }

    const series = await provider.getSeriesDetails(id);
    if (!series) {
      return NextResponse.json({ success: false, error: 'Series not found' }, { status: 404 });
    }

    const response: ApiResponse<Season[]> = {
      success: true,
      data: series.seasons || [],
      provider: provider.name,
      isDemo: provider.isDemo,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
