import React, { Suspense } from 'react';
import { searchMedia } from '@/lib/api/client';
import { SearchInput } from '@/components/search/SearchInput';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Search, Sparkles } from 'lucide-react';

export const revalidate = 0;

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: 'all' | 'movie' | 'tv' }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = params.q;
  return {
    title: q ? `Search results for "${q}" | FilemVlix` : 'Search Movies & TV Series | FilemVlix',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const type = params.type || 'all';

  const result = query ? await searchMedia(query, type) : { results: [], totalResults: 0 };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          <Search className="w-7 h-7 text-[#F22E2E]" />
          <span>Find Media</span>
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Instant search across movies, series, episodes, genres, and cast.
        </p>

        <Suspense fallback={<div className="h-12 bg-[#0a0a0a] animate-pulse rounded-md border border-white/5" />}>
          <SearchInput initialQuery={query} initialType={type} autoFocus={!query} />
        </Suspense>
      </div>

      {/* Results Section */}
      <div className="pt-4">
        {query ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-gray-400">
              <span>
                Found <strong className="text-white">{result.totalResults}</strong> results for &ldquo;
                <strong className="text-[#F22E2E]">{query}</strong>&rdquo;
              </span>
              <span className="capitalize">Filtered: {type === 'tv' ? 'TV Series' : type}</span>
            </div>

            <MediaGrid
              items={result.results}
              emptyMessage={`No titles found matching "${query}". Try searching for another keyword like "Sintel", "Steel", "Bunny", or "Cyber".`}
            />
          </div>
        ) : (
          <div className="py-20 text-center text-gray-500 space-y-3 bg-[#0a0a0a] rounded-md border border-white/5 p-8">
            <Sparkles className="w-8 h-8 text-[#F22E2E]/60 mx-auto" />
            <p className="text-sm font-bold text-gray-300">
              Type in the search box above to explore the FilemVlix library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
