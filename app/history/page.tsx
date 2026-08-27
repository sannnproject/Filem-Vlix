'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { History, Trash2, Play, Clock, ArrowRight, Film } from 'lucide-react';
import { useWatchHistory, clearWatchHistory, removeFromWatchHistory } from '@/lib/storage';
import { Button } from '@/components/ui/Button';

export default function HistoryPage() {
  const history = useWatchHistory();

  const handleClearAll = () => {
    if (window.confirm('Clear all playback history?')) {
      clearWatchHistory();
    }
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWatchHistory(id);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#F22E2E] mb-1">
            <History className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Playback Progress</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Watch History
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Pick up right where you left off. Zero cloud account needed.
          </p>
        </div>

        {history.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearAll}
            className="gap-2 self-start sm:self-auto font-bold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Watch History</span>
          </Button>
        )}
      </div>

      {/* History Items Grid */}
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {history.map((item) => {
            const watchUrl =
              item.mediaType === 'series' && item.seasonNumber && item.episodeNumber
                ? `/watch/${item.id}?season=${item.seasonNumber}&episode=${item.episodeNumber}`
                : `/watch/${item.id}`;

            return (
              <div
                key={item.id}
                className="group relative bg-[#0a0a0a] rounded-md overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/20 flex flex-col"
              >
                {/* Thumbnail */}
                <Link href={watchUrl} className="relative aspect-video block overflow-hidden bg-black">
                  <Image
                    src={item.backdropPath || item.posterPath}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#F22E2E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div
                      className="h-full bg-[#F22E2E]"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleRemove(e, item.id)}
                    title="Remove from history"
                    className="absolute top-2.5 right-2.5 p-1.5 rounded bg-black/80 hover:bg-[#F22E2E] text-gray-400 hover:text-white transition-colors border border-white/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </Link>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F22E2E] block mb-1">
                      {item.mediaType === 'series' ? 'TV Episode' : 'Movie'}
                    </span>
                    <Link
                      href={watchUrl}
                      className="font-bold text-sm sm:text-base text-white hover:text-[#F22E2E] transition-colors line-clamp-1 block"
                    >
                      {item.seriesTitle
                        ? `${item.seriesTitle} - S${item.seasonNumber}:E${item.episodeNumber}`
                        : item.title}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 mt-3 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      {formatTime(item.currentTime)} / {formatTime(item.duration)}
                    </span>
                    <span className="font-bold text-[#F22E2E]">{item.progressPercent}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center text-gray-400 bg-[#0a0a0a] rounded-md border border-white/5 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F22E2E]/10 text-[#F22E2E] flex items-center justify-center mx-auto border border-[#F22E2E]/20">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Watch History Yet</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Start streaming any movie or series episode and your progress will automatically be tracked here.
          </p>
          <div className="pt-2">
            <Link href="/">
              <Button size="md" variant="primary" className="gap-2 font-bold">
                <Film className="w-4 h-4" />
                <span>Start Streaming</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
