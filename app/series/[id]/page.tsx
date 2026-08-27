import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getSeriesDetails, getEpisodes, getRecommendations } from '@/lib/api/client';
import { Play, Star, Calendar, Tv, ArrowLeft, Layers } from 'lucide-react';
import { FavoriteButton } from '@/components/media/FavoriteButton';
import { CastList } from '@/components/media/CastList';
import { EpisodeCard } from '@/components/media/EpisodeCard';
import { MediaRow } from '@/components/media/MediaRow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 3600;

interface SeriesDetailPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}

export async function generateMetadata({ params }: SeriesDetailPageProps) {
  const { id } = await params;
  const series = await getSeriesDetails(id);
  if (!series) return { title: 'Series Not Found' };
  return {
    title: `${series.title} - Watch on FilemVlix`,
    description: series.overview,
  };
}

export default async function SeriesDetailPage({ params, searchParams }: SeriesDetailPageProps) {
  const { id } = await params;
  const sParams = await searchParams;
  const activeSeasonNum = sParams.season ? parseInt(sParams.season, 10) : 1;

  const [series, recommendations, episodes] = await Promise.all([
    getSeriesDetails(id),
    getRecommendations(id, 'series'),
    getEpisodes(id, activeSeasonNum),
  ]);

  if (!series) {
    notFound();
  }

  const releaseYear = series.firstAirDate ? new Date(series.firstAirDate).getFullYear() : '';
  const firstEpisodeWatchUrl = `/watch/${series.id}?season=${activeSeasonNum}&episode=1`;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Backdrop Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden bg-black">
        <Image
          src={series.backdropPath || series.posterPath}
          alt={series.title}
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-top opacity-50 md:opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-2/3" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050505]/80 to-transparent" />

        {/* Back Link */}
        <div className="absolute top-24 left-4 sm:left-8 z-20">
          <Link
            href="/series"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/70 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 backdrop-blur-md text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Series</span>
          </Link>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-end pb-8 z-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            {/* Poster */}
            <div className="relative w-36 sm:w-44 md:w-56 aspect-[2/3] rounded-md overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 hidden sm:block bg-black">
              <Image
                src={series.posterPath || series.backdropPath}
                alt={series.title}
                fill
                priority
                sizes="(max-width: 768px) 176px, 224px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#F22E2E] text-white shadow">
                  TV Series
                </span>

                {series.rating > 0 && (
                  <Badge variant="amber" className="flex items-center gap-1 font-bold text-xs py-1">
                    <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    <span>{series.rating.toFixed(1)} / 10</span>
                  </Badge>
                )}

                {releaseYear && (
                  <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {releaseYear}
                  </span>
                )}

                <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                  <Layers className="w-3.5 h-3.5 text-gray-400" /> {series.numberOfSeasons} {series.numberOfSeasons === 1 ? 'Season' : 'Seasons'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {series.title}
              </h1>

              {series.tagline && (
                <p className="text-sm sm:text-base italic text-gray-300">
                  &ldquo;{series.tagline}&rdquo;
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2 pt-1">
                {series.genres?.map((g) => (
                  <Link
                    key={g.id}
                    href={`/genre/${g.slug}?type=series`}
                    className="text-xs text-gray-300 hover:text-white bg-black/60 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm transition-colors"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link href={firstEpisodeWatchUrl}>
                  <Button size="lg" variant="primary" className="gap-2.5 px-6 font-bold shadow-xl shadow-red-950/60">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Start Watching (S{activeSeasonNum}E1)</span>
                  </Button>
                </Link>

                <FavoriteButton media={series} showText size="lg" className="h-[44px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Details & Seasons/Episodes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 space-y-10">
        {/* Storyline & Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">Series Synopsis</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {series.overview}
            </p>
          </div>

          <div className="p-5 rounded-md bg-[#0a0a0a] border border-white/5 space-y-4 text-xs">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[11px] pb-2 border-b border-white/5">
              Series Info
            </h3>

            {series.creator && (
              <div>
                <span className="text-gray-400 block mb-0.5">Creator / Studio</span>
                <span className="text-white font-bold text-sm">{series.creator}</span>
              </div>
            )}

            <div>
              <span className="text-gray-400 block mb-0.5">Total Seasons</span>
              <span className="text-gray-200 font-medium">{series.numberOfSeasons}</span>
            </div>

            {series.status && (
              <div>
                <span className="text-gray-400 block mb-0.5">Status</span>
                <span className="text-gray-200 font-medium">{series.status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Seasons & Episodes Browser */}
        <section className="space-y-6 pt-4 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Tv className="w-5 h-5 text-[#F22E2E]" />
              <span>Episodes</span>
            </h2>

            {/* Seasons Switcher Tabs */}
            {series.seasons && series.seasons.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {series.seasons.map((s) => (
                  <Link
                    key={s.id}
                    href={`/series/${series.id}?season=${s.seasonNumber}`}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-colors ${
                      s.seasonNumber === activeSeasonNum
                        ? 'bg-[#F22E2E] text-white shadow-md'
                        : 'bg-black/60 hover:bg-white/15 text-gray-300 border border-white/10'
                    }`}
                  >
                    Season {s.seasonNumber}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Episode List */}
          <div className="space-y-4">
            {episodes && episodes.length > 0 ? (
              episodes.map((ep) => (
                <EpisodeCard
                  key={ep.id}
                  episode={ep}
                  seriesTitle={series.title}
                />
              ))
            ) : (
              <div className="p-8 rounded-md bg-[#0a0a0a] border border-white/5 text-center text-gray-400 text-sm">
                No episodes available for this season yet.
              </div>
            )}
          </div>
        </section>

        {/* Cast & Crew */}
        <CastList cast={series.cast} />

        {/* Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <MediaRow
              title="More Series Like This"
              subtitle="Fans also watched"
              items={recommendations}
              aspectRatio="backdrop"
            />
          </div>
        )}
      </div>
    </div>
  );
}
