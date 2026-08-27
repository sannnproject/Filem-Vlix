'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '@/types/media';
import { MediaCard } from './MediaCard';
import { cn } from '@/lib/utils';

interface MediaRowProps {
  title: string;
  items: MediaItem[];
  viewAllLink?: string;
  aspectRatio?: 'poster' | 'backdrop';
  subtitle?: string;
  className?: string;
}

export function MediaRow({
  title,
  items,
  viewAllLink,
  aspectRatio = 'poster',
  subtitle,
  className,
}: MediaRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <section className={cn('relative my-8 group/row', className)}>
      {/* Row Header */}
      <div className="flex items-end justify-between mb-3.5 px-4 md:px-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            {title}
          </h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>

        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1 group-hover/link:underline"
          >
            <span>Explore All</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </Link>
        )}
      </div>

      {/* Row Container with Navigation Arrows */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll('left')}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-16 bg-[#050505]/90 hover:bg-[#F22E2E] text-white rounded-r-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 border-r border-y border-white/10 hover:border-[#F22E2E] backdrop-blur-md cursor-pointer shadow-2xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-8 py-2"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex-shrink-0 transition-transform duration-200',
                aspectRatio === 'poster'
                  ? 'w-[150px] sm:w-[175px] md:w-[200px] lg:w-[220px]'
                  : 'w-[250px] sm:w-[280px] md:w-[320px] lg:w-[360px]'
              )}
            >
              <MediaCard media={item} aspectRatio={aspectRatio} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll('right')}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-16 bg-[#050505]/90 hover:bg-[#F22E2E] text-white rounded-l-md flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-200 border-l border-y border-white/10 hover:border-[#F22E2E] backdrop-blur-md cursor-pointer shadow-2xl"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
