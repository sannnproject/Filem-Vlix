import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaybackInfo, getEpisodes, getSeriesDetails, getMovieDetails } from '@/lib/api/client';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { ArrowLeft, Film, Tv, Info, ListOrdered } from 'lucide-react';
import { EpisodeCard } from '@/components/media/EpisodeCard';
import { FavoriteButton } from '@/components/media/FavoriteButton';

export const revalidate = 0; // Dynamic on watch page

interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string; episode?: string }>;
}

export async function generateMetadata({ params, searchParams }: WatchPageProps) {
  const { id } = await params;
  const sParams = await searchParams;
  const season = sParams.season ? parseInt(sParams.season, 10) : undefined;
  const episode = sParams.episode ? parseInt(sParams.episode, 10) : undefined;

  const playback = await getPlaybackInfo(id, season, episode);
  if (!playback) return { title: 'Playing Media' };

  return {
    title: `Watching: ${playback.title} ${playback.seriesTitle ? `(${playback.seriesTitle})` : ''} | FilemVlix`,
    description: `Stream ${playback.title} on FilemVlix with high-definition video player.`,
  };
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { id } = await params;
  const sParams = await searchParams;
  const seasonNum = sParams.season ? parseInt(sParams.season, 10) : undefined;
  const episodeNum = sParams.episode ? parseInt(sParams.episode, 10) : undefined;

  const playback = await getPlaybackInfo(id, seasonNum, episodeNum);

  if (!playback) {
    notFound();
  }

  // If it's a series, fetch sibling episodes for the episode drawer/picker
  let seriesEpisodes = null;
  let seriesData = null;
  let movieData = null;

  if (playback.mediaType === 'series') {
    const s = seasonNum || 1;
    [seriesEpisodes, seriesData] = await Promise.all([
      getEpisodes(id, s),
      getSeriesDetails(id),
    ]);
  } else {
    movieData = await getMovieDetails(id);
  }

  return (
    <div className="min-h-screen pt-20 pb-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <Link
            href={playback.mediaType === 'movie' ? `/movies/${id}` : `/series/${id}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0a0a0a] hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {playback.mediaType === 'movie' ? 'Back to Movie Details' : `Back to ${playback.seriesTitle || 'Series'}`}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#0a0a0a] text-gray-300 border border-white/10 text-[11px] font-bold uppercase">
              {playback.mediaType}
            </span>
          </div>
        </div>

        {/* Cinematic Video Player Container */}
        <div className="w-full bg-black rounded-md overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
          <VideoPlayer playbackInfo={playback} />
        </div>

        {/* Media Details & Controls bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-md bg-[#0a0a0a] border border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#F22E2E] font-bold mb-1">
              {playback.mediaType === 'movie' ? <Film className="w-4 h-4" /> : <Tv className="w-4 h-4" />}
              <span>{playback.seriesTitle || 'Feature Film'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {playback.title}
            </h1>
            {playback.seasonNumber && playback.episodeNumber && (
              <p className="text-xs text-gray-400 mt-0.5">
                Season {playback.seasonNumber} • Episode {playback.episodeNumber}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {movieData && <FavoriteButton media={movieData} showText size="md" />}
            {seriesData && <FavoriteButton media={seriesData} showText size="md" />}
          </div>
        </div>

        {/* Episodic Drawer (for TV Series) */}
        {playback.mediaType === 'series' && seriesEpisodes && seriesEpisodes.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <ListOrdered className="w-5 h-5 text-[#F22E2E]" />
                <span>Episodes in Season {seasonNum || 1}</span>
              </h2>

              {seriesData?.seasons && seriesData.seasons.length > 1 && (
                <div className="flex items-center gap-1.5 text-xs">
                  {seriesData.seasons.map((s) => (
                    <Link
                      key={s.id}
                      href={`/watch/${id}?season=${s.seasonNumber}&episode=1`}
                      className={`px-2.5 py-1 rounded-md font-bold transition-colors ${
                        s.seasonNumber === (seasonNum || 1)
                          ? 'bg-[#F22E2E] text-white font-bold'
                          : 'bg-[#0a0a0a] text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      S{s.seasonNumber}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {seriesEpisodes.map((ep) => (
                <EpisodeCard
                  key={ep.id}
                  episode={ep}
                  seriesTitle={playback.seriesTitle || 'Series'}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
