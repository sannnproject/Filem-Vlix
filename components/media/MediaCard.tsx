'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Calendar } from 'lucide-react';
import { MediaItem } from '@/types/media';
import { FavoriteButton } from './FavoriteButton';
import { Badge } from '@/components/ui/Badge';
import { useItemProgress } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface MediaCardProps {
  media: MediaItem;
  aspectRatio?: 'poster' | 'backdrop';
  priority?: boolean;
  className?: string;
}

export function MediaCard({
  media,
  aspectRatio = 'poster',
  priority = false,
  className,
}: MediaCardProps) {
  const progressPercent = useItemProgress(media.id);

  const detailUrl = media.type === 'movie' ? `/movies/${media.id}` : `/series/${media.id}`;
  const watchUrl = `/watch/${media.id}`;
  const releaseYear = media.releaseDate ? new Date(media.releaseDate).getFullYear() : '';
  const imageSrc =
    aspectRatio === 'poster'
      ? media.posterPath || media.backdropPath
      : media.backdropPath || media.posterPath;

  return (
    <div
      className={cn(
        'group relative rounded-md overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-black flex flex-col',
        className
      )}
    >
      {/* Image Container with Hover Overlay */}
      <div
        className={cn(
          'relative w-full overflow-hidden bg-[#050505]',
          aspectRatio === 'poster' ? 'aspect-[2/3]' : 'aspect-video'
        )}
      >
        <Image
          src={imageSrc}
          alt={media.title}
          fill
          priority={priority}
          sizes={
            aspectRatio === 'poster'
              ? '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px'
          }
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
          <Badge
            variant={media.type === 'movie' ? 'rose' : 'indigo'}
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 shadow-md"
          >
            {media.type === 'movie' ? 'Movie' : 'Series'}
          </Badge>

          {media.rating > 0 && (
            <Badge variant="amber" className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 shadow-md bg-black/60 backdrop-blur-sm border-white/10">
              <Star className="w-2.5 h-2.5 fill-orange-400 text-orange-400" />
              <span>{media.rating.toFixed(1)}</span>
            </Badge>
          )}
        </div>

        {/* Favorite Button (Top Right Hover) */}
        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FavoriteButton media={media} size="sm" />
        </div>

        {/* Hover Quick Action Play Overlay */}
        <Link
          href={watchUrl}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center z-10"
        >
          <div className="w-11 h-11 rounded-full bg-[#F22E2E] text-white flex items-center justify-center shadow-xl shadow-red-950/80 transform group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </Link>

        {/* Watch Progress Bar */}
        {progressPercent !== null && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-neutral-800 z-20">
            <div
              className="h-full bg-[#F22E2E] shadow-[0_0_8px_rgba(242,46,46,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Media Info */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={detailUrl}
            className="font-bold text-xs sm:text-sm text-gray-200 group-hover:text-[#F22E2E] transition-colors line-clamp-1 block"
          >
            {media.title}
          </Link>
        </div>

        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2">
          {releaseYear && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-gray-500" />
              {releaseYear}
            </span>
          )}

          {media.genres && media.genres.length > 0 && (
            <span className="truncate max-w-[90px] text-gray-500">
              {media.genres[0].name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
