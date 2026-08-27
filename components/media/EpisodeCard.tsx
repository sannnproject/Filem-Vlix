import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Star, Clock } from 'lucide-react';
import { Episode } from '@/types/media';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface EpisodeCardProps {
  episode: Episode;
  seriesTitle: string;
  className?: string;
}

export function EpisodeCard({ episode, seriesTitle, className }: EpisodeCardProps) {
  const watchUrl = `/watch/${episode.seriesId}?season=${episode.seasonNumber}&episode=${episode.episodeNumber}`;

  return (
    <div
      className={cn(
        'group flex flex-col md:flex-row gap-4 p-4 rounded-md bg-[#0a0a0a] border border-white/5 hover:border-white/20 hover:bg-[#101010] transition-all duration-200',
        className
      )}
    >
      {/* Thumbnail */}
      <Link
        href={watchUrl}
        className="relative block w-full md:w-56 aspect-video rounded overflow-hidden flex-shrink-0 bg-black"
      >
        <Image
          src={
            episode.stillPath ||
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80'
          }
          alt={episode.title}
          fill
          sizes="(max-width: 768px) 100vw, 224px"
          referrerPolicy="no-referrer"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-[#F22E2E] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-bold text-gray-200 backdrop-blur-sm border border-white/10">
          EP {episode.episodeNumber}
        </div>
      </Link>

      {/* Episode Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={watchUrl}
              className="text-base font-bold text-white hover:text-[#F22E2E] transition-colors"
            >
              {episode.episodeNumber}. {episode.title}
            </Link>
            {episode.rating && episode.rating > 0 && (
              <Badge variant="amber" className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                <span>{episode.rating.toFixed(1)}</span>
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1 mb-2">
            {episode.runtime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {episode.runtime}m
              </span>
            )}
            {episode.airDate && <span>Aired: {episode.airDate}</span>}
          </div>

          <p className="text-xs sm:text-sm text-gray-400 line-clamp-3 leading-relaxed">
            {episode.overview || 'No episode description available for this segment.'}
          </p>
        </div>

        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-end">
          <Link
            href={watchUrl}
            className="text-xs font-bold text-[#F22E2E] hover:text-red-400 flex items-center gap-1"
          >
            <span>Play Episode</span>
            <Play className="w-3 h-3 fill-current ml-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
