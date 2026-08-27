import React from 'react';
import Link from 'next/link';
import { getTrendingMedia, getPopularMovies, getRecentMovies, getPopularSeries, getGenres } from '@/lib/api/client';
import { HeroBanner } from '@/components/hero/HeroBanner';
import { MediaRow } from '@/components/media/MediaRow';
import { ContinueWatchingRow } from '@/components/media/ContinueWatchingRow';
import { Film, Tv, Sparkles, Compass } from 'lucide-react';

export const revalidate = 3600; // Cache 1 hour on Vercel

export default async function HomePage() {
  const [trending, popularMovies, recentMovies, popularSeries, genres] = await Promise.all([
    getTrendingMedia('all'),
    getPopularMovies(),
    getRecentMovies(),
    getPopularSeries(),
    getGenres(),
  ]);

  return (
    <div className="min-h-screen pb-16">
      {/* Cinematic Hero Banner */}
      <HeroBanner items={trending.length > 0 ? trending.slice(0, 5) : popularMovies.slice(0, 5)} />

      {/* Continue Watching Row (Client-Side Storage) */}
      <ContinueWatchingRow />

      {/* Trending Now */}
      <MediaRow
        title="Trending This Week"
        subtitle="Most watched titles across the platform"
        items={trending}
        viewAllLink="/movies"
        aspectRatio="poster"
      />

      {/* Popular Movies */}
      <MediaRow
        title="Popular Movies"
        subtitle="Blockbuster cinema and award-winning features"
        items={popularMovies}
        viewAllLink="/movies"
        aspectRatio="poster"
      />

      {/* Explore by Genre Chips Section */}
      {genres && genres.length > 0 && (
        <section className="my-10 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-5 h-5 text-[#F22E2E]" />
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Browse by Genre
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {genres.slice(0, 10).map((genre) => (
              <Link
                key={genre.id}
                href={`/genre/${genre.slug}`}
                className="px-4 py-2.5 rounded-md bg-[#0a0a0a] hover:bg-[#F22E2E] text-gray-300 hover:text-white border border-white/5 hover:border-red-500 text-xs md:text-sm font-bold transition-all duration-200 shadow-sm"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Popular TV Series */}
      <MediaRow
        title="Popular TV Shows & Series"
        subtitle="Binge-worthy drama, sci-fi and episodic sagas"
        items={popularSeries}
        viewAllLink="/series"
        aspectRatio="backdrop"
      />

      {/* Recently Added Movies */}
      <MediaRow
        title="Recently Added"
        subtitle="Fresh additions to the FilemVlix library"
        items={recentMovies}
        viewAllLink="/movies"
        aspectRatio="poster"
      />
    </div>
  );
}
