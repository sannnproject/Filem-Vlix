import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getMovieDetails, getRecommendations } from '@/lib/api/client';
import { Play, Star, Clock, Calendar, Film, ArrowLeft, User } from 'lucide-react';
import { FavoriteButton } from '@/components/media/FavoriteButton';
import { CastList } from '@/components/media/CastList';
import { MediaRow } from '@/components/media/MediaRow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const revalidate = 3600;

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  if (!movie) return { title: 'Movie Not Found' };
  return {
    title: `${movie.title} - Watch on FilemVlix`,
    description: movie.overview,
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  const recommendations = await getRecommendations(id, 'movie');
  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : '';
  const watchUrl = `/watch/${movie.id}`;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Backdrop Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden bg-black">
        <Image
          src={movie.backdropPath || movie.posterPath}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-top opacity-50 md:opacity-60"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-2/3" />
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#050505]/80 to-transparent" />

        {/* Back Link */}
        <div className="absolute top-24 left-4 sm:left-8 z-20">
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-black/70 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10 backdrop-blur-md text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Movies</span>
          </Link>
        </div>

        {/* Content Details Overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-end pb-8 z-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end">
            {/* Poster Card */}
            <div className="relative w-36 sm:w-44 md:w-56 aspect-[2/3] rounded-md overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 hidden sm:block bg-black">
              <Image
                src={movie.posterPath || movie.backdropPath}
                alt={movie.title}
                fill
                priority
                sizes="(max-width: 768px) 176px, 224px"
                referrerPolicy="no-referrer"
                className="object-cover"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#F22E2E] text-white shadow">
                  Movie
                </span>

                {movie.rating > 0 && (
                  <Badge variant="amber" className="flex items-center gap-1 font-bold text-xs py-1">
                    <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    <span>{movie.rating.toFixed(1)} / 10</span>
                  </Badge>
                )}

                {releaseYear && (
                  <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {releaseYear}
                  </span>
                )}

                {movie.runtime && (
                  <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> {movie.runtime} mins
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-sm sm:text-base italic text-gray-300">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2 pt-1">
                {movie.genres?.map((g) => (
                  <Link
                    key={g.id}
                    href={`/genre/${g.slug}?type=movie`}
                    className="text-xs text-gray-300 hover:text-white bg-black/60 hover:bg-white/15 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm transition-colors"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link href={watchUrl}>
                  <Button size="lg" variant="primary" className="gap-2.5 px-6 font-bold shadow-xl shadow-red-950/60">
                    <Play className="w-5 h-5 fill-current" />
                    <span>Watch Movie</span>
                  </Button>
                </Link>

                <FavoriteButton media={movie} showText size="lg" className="h-[44px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-8 space-y-8">
        {/* Overview & Director */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">Storyline</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {movie.overview}
            </p>
          </div>

          {/* Details sidebar */}
          <div className="p-5 rounded-md bg-[#0a0a0a] border border-white/5 space-y-4 text-xs">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-[11px] pb-2 border-b border-white/5">
              Movie Details
            </h3>

            {movie.director && (
              <div>
                <span className="text-gray-400 block mb-0.5">Director</span>
                <span className="text-white font-bold text-sm">{movie.director}</span>
              </div>
            )}

            <div>
              <span className="text-gray-400 block mb-0.5">Release Date</span>
              <span className="text-gray-200 font-medium">{movie.releaseDate || 'N/A'}</span>
            </div>

            {movie.runtime && (
              <div>
                <span className="text-gray-400 block mb-0.5">Runtime</span>
                <span className="text-gray-200 font-medium">{movie.runtime} minutes</span>
              </div>
            )}

            {movie.status && (
              <div>
                <span className="text-gray-400 block mb-0.5">Status</span>
                <span className="text-gray-200 font-medium">{movie.status}</span>
              </div>
            )}
          </div>
        </div>

        {/* Cast & Crew */}
        <CastList cast={movie.cast} />

        {/* Related / Recommended Movies */}
        {recommendations && recommendations.length > 0 && (
          <div className="pt-6 border-t border-white/5">
            <MediaRow
              title="More Like This"
              subtitle="Recommended movies you might enjoy"
              items={recommendations}
              aspectRatio="poster"
            />
          </div>
        )}
      </div>
    </div>
  );
}
