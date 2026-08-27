import React from 'react';
import Link from 'next/link';
import { getPopularMovies, getRecentMovies, getGenres } from '@/lib/api/client';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Film, Filter } from 'lucide-react';

export const revalidate = 3600;

interface MoviesPageProps {
  searchParams: Promise<{ filter?: string; genre?: string }>;
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const filter = params.filter || 'popular';

  const [popular, recent, genres] = await Promise.all([
    getPopularMovies(),
    getRecentMovies(),
    getGenres(),
  ]);

  const movies = filter === 'recent' ? recent : popular;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
        <div>
          <div className="flex items-center gap-2.5 mb-1 text-[#F22E2E]">
            <Film className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Cinema Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Explore All Movies
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Browse our curated high-definition cinema collection.
          </p>
        </div>

        {/* Filter Switcher */}
        <div className="flex items-center gap-2 bg-[#0a0a0a] p-1 rounded-md border border-white/10 text-xs">
          <Link
            href="/movies?filter=popular"
            className={`px-3 py-1.5 rounded font-bold transition-colors ${
              filter === 'popular'
                ? 'bg-[#F22E2E] text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Popular
          </Link>
          <Link
            href="/movies?filter=recent"
            className={`px-3 py-1.5 rounded font-bold transition-colors ${
              filter === 'recent'
                ? 'bg-[#F22E2E] text-white shadow'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Recently Released
          </Link>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-bold uppercase tracking-wider pr-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Genres:</span>
        </div>
        {genres.slice(0, 12).map((g) => (
          <Link
            key={g.id}
            href={`/genre/${g.slug}?type=movie`}
            className="flex-shrink-0 px-3 py-1 rounded text-xs font-medium bg-[#0a0a0a] hover:bg-white/10 text-gray-300 hover:text-white border border-white/5 transition-colors"
          >
            {g.name}
          </Link>
        ))}
      </div>

      {/* Movies Grid */}
      <MediaGrid items={movies} aspectRatio="poster" />
    </div>
  );
}
