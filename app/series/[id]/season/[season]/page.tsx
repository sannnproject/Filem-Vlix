import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSeriesDetails, getEpisodes } from '@/lib/api/client';
import { EpisodeCard } from '@/components/media/EpisodeCard';
import { ArrowLeft, Tv, Layers } from 'lucide-react';

export const revalidate = 3600;

interface SeasonPageProps {
  params: Promise<{ id: string; season: string }>;
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { id, season } = await params;
  const seasonNum = parseInt(season, 10);

  const [series, episodes] = await Promise.all([
    getSeriesDetails(id),
    getEpisodes(id, seasonNum),
  ]);

  if (!series) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      <div>
        <Link
          href={`/series/${series.id}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {series.title}</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <Tv className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">{series.title}</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Season {seasonNum} Episodes
            </h1>
          </div>

          {/* Season switcher */}
          {series.seasons && series.seasons.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {series.seasons.map((s) => (
                <Link
                  key={s.id}
                  href={`/series/${series.id}/season/${s.seasonNumber}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    s.seasonNumber === seasonNum
                      ? 'bg-rose-600 text-white shadow'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  Season {s.seasonNumber}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Episodes list */}
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
          <div className="p-12 text-center text-slate-400 bg-slate-900/40 rounded-xl border border-slate-800">
            No episodes found for this season.
          </div>
        )}
      </div>
    </div>
  );
}
