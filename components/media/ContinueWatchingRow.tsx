'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Clock, Trash2 } from 'lucide-react';
import { useContinueWatching, removeFromWatchHistory } from '@/lib/storage';

export function ContinueWatchingRow() {
  const items = useContinueWatching();

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

  if (!items || items.length === 0) return null;

  return (
    <section className="my-8 px-4 md:px-8">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#F22E2E]" />
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Continue Watching
          </h2>
        </div>
        <Link
          href="/history"
          className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          View Full History
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2">
        {items.map((item) => {
          const watchUrl =
            item.mediaType === 'series' && item.seasonNumber && item.episodeNumber
              ? `/watch/${item.id}?season=${item.seasonNumber}&episode=${item.episodeNumber}`
              : `/watch/${item.id}`;

          return (
            <div
              key={item.id}
              className="group relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] rounded-md overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black"
            >
              <Link href={watchUrl} className="block relative aspect-video overflow-hidden">
                <Image
                  src={item.backdropPath || item.posterPath}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 260px, 320px"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-[#F22E2E] text-white flex items-center justify-center shadow-xl shadow-red-950/80 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Progress bar at bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800">
                  <div
                    className="h-full bg-[#F22E2E] shadow-[0_0_8px_rgba(242,46,46,0.6)]"
                    style={{ width: `${item.progressPercent}%` }}
                  />
                </div>

                {/* Remove button */}
                <button
                  onClick={(e) => handleRemove(e, item.id)}
                  title="Remove from history"
                  aria-label="Remove from history"
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-gray-400 hover:text-[#F22E2E] hover:bg-black opacity-0 group-hover:opacity-100 transition-opacity border border-white/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </Link>

              {/* Info text */}
              <div className="p-3">
                <Link href={watchUrl} className="font-semibold text-xs sm:text-sm text-gray-200 hover:text-[#F22E2E] truncate block">
                  {item.seriesTitle ? `${item.seriesTitle} - S${item.seasonNumber}:E${item.episodeNumber}` : item.title}
                </Link>
                <div className="flex items-center justify-between mt-1 text-xs text-gray-400">
                  <span>{formatTime(item.currentTime)} / {formatTime(item.duration)}</span>
                  <span className="text-[#F22E2E] font-bold">{item.progressPercent}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
