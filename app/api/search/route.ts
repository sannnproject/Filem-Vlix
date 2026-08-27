import { NextRequest, NextResponse } from 'next/server';
import { getMediaProvider } from '@/lib/api';
import { ApiResponse } from '@/types/api';
import { SearchResult } from '@/types/media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const type = (searchParams.get('type') || 'all') as 'all' | 'movie' | 'tv';
    const page = parseInt(searchParams.get('page') || '1', 10);

    const provider = getMediaProvider();
    const result = await provider.search(query, type, page);

    const response: ApiResponse<SearchResult> = {
      success: true,
      data: result,
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
