import React from 'react';
import { MediaItem } from '@/types/media';
import { MediaCard } from './MediaCard';
import { cn } from '@/lib/utils';

interface MediaGridProps {
  items: MediaItem[];
  aspectRatio?: 'poster' | 'backdrop';
  emptyMessage?: string;
  className?: string;
}

export function MediaGrid({
  items,
  aspectRatio = 'poster',
  emptyMessage = 'No items found matching your selection.',
  className,
}: MediaGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="py-16 text-center text-gray-400 bg-[#0a0a0a] rounded-md border border-white/5 p-8 my-8">
        <p className="text-base font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid gap-4 sm:gap-6',
        aspectRatio === 'poster'
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
    >
      {items.map((item, idx) => (
        <MediaCard
          key={`${item.id}-${idx}`}
          media={item}
          aspectRatio={aspectRatio}
          priority={idx < 4}
        />
      ))}
    </div>
  );
}
