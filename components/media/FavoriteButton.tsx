'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { MediaItem } from '@/types/media';
import { toggleFavorite, useIsFavorite } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  media: MediaItem;
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({
  media,
  className,
  showText = false,
  size = 'md',
}: FavoriteButtonProps) {
  const isFav = useIsFavorite(media.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(media);
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-4 py-2.5 text-sm',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-4 h-4',
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md transition-all duration-200 cursor-pointer backdrop-blur-md',
        isFav
          ? 'bg-[#F22E2E] text-white hover:bg-[#d92222] shadow-md shadow-red-950/40 border border-red-500/40'
          : 'bg-black/70 hover:bg-white/20 text-gray-300 hover:text-white border border-white/10',
        sizeClasses[size],
        className
      )}
    >
      <Heart
        className={cn(
          iconSizes[size],
          isFav ? 'fill-current text-white' : 'text-gray-300'
        )}
      />
      {showText && (
        <span className="font-bold text-xs whitespace-nowrap">
          {isFav ? 'Saved in Favorites' : 'Add to Favorites'}
        </span>
      )}
    </button>
  );
}
