import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getByGenre, getGenres } from '@/lib/api/client';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Compass, Film, Tv, Sparkles, ArrowLeft } from 'lucide-react';
import { MediaType } from '@/types/media';

export const revalidate = 3600;

interface GenrePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({ params }: GenrePageProps) {
  const { slug } = await params;
  const formattedName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  return {
    title: `${formattedName} Movies & TV Shows | FilemVlix`,
    description: `Watch top ${formattedName} films and series on FilemVlix.`,
  };
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const { slug } = await params;
  const sParams = await searchParams;
  const type = (sParams.type || undefined) as MediaType | undefined;

  const [items, allGenres] = await Promise.all([
    getByGenre(slug, type),
    getGenres(),
  ]);

  const currentGenre = allGenres.find(
    (g) => g.slug.toLowerCase() === slug.toLowerCase() || g.name.toLowerCase() === slug.toLowerCase()
  );

  const genreTitle = currentGenre?.name || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0a0a0a] hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-bold transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[#F22E2E] mb-1">
              <Compass className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Genre Collection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {genreTitle}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Explore {genreTitle.toLowerCase()} movies, TV series, and open-source cinematic projects.
            </p>
          </div>

          {/* Type filter chips */}
          <div className="flex items-center gap-2 bg-[#0a0a0a] p-1 rounded-md border border-white/10 text-xs">
            <Link
              href={`/genre/${slug}`}
              className={`px-3 py-1.5 rounded font-bold transition-colors ${
                !type ? 'bg-[#F22E2E] text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              All
            </Link>
            <Link
              href={`/genre/${slug}?type=movie`}
              className={`px-3 py-1.5 rounded font-bold transition-colors ${
                type === 'movie' ? 'bg-[#F22E2E] text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              Movies
            </Link>
            <Link
              href={`/genre/${slug}?type=series`}
              className={`px-3 py-1.5 rounded font-bold transition-colors ${
                type === 'series' ? 'bg-[#F22E2E] text-white shadow' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              TV Series
            </Link>
          </div>
        </div>
      </div>

      {/* Sibling Genres Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {allGenres.map((g) => (
          <Link
            key={g.id}
            href={`/genre/${g.slug}`}
            className={`flex-shrink-0 px-3.5 py-1 rounded text-xs font-medium transition-colors border ${
              g.slug.toLowerCase() === slug.toLowerCase()
                ? 'bg-white/10 text-[#F22E2E] border-white/20 font-bold'
                : 'bg-[#0a0a0a] hover:bg-white/10 text-gray-300 border-white/5'
            }`}
          >
            {g.name}
          </Link>
        ))}
      </div>

      {/* Items Grid */}
      <MediaGrid
        items={items}
        emptyMessage={`No titles currently found in the ${genreTitle} category.`}
      />
    </div>
  );
}
