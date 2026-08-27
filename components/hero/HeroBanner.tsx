'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Info, Star, Clock, Calendar, Film } from 'lucide-react';
import { MediaItem } from '@/types/media';
import { FavoriteButton } from '@/components/media/FavoriteButton';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

interface HeroBannerProps {
  items: MediaItem[];
}

export function HeroBanner({ items }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTrailerModal, setShowTrailerModal] = useState(false);

  const featured = items && items.length > 0 ? items : [];
  const currentItem = featured[currentIndex] || featured[0];

  // Auto rotate banner every 8 seconds if user doesn't interact
  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (!currentItem) return null;

  const detailUrl = currentItem.type === 'movie' ? `/movies/${currentItem.id}` : `/series/${currentItem.id}`;
  const watchUrl = `/watch/${currentItem.id}`;
  const releaseYear = currentItem.releaseDate ? new Date(currentItem.releaseDate).getFullYear() : '';

  return (
    <div className="relative w-full h-[80vh] min-h-[540px] max-h-[820px] overflow-hidden bg-[#050505]">
      {/* Background Backdrop with Gradient Overlays */}
      <div className="absolute inset-0">
        <Image
          src={currentItem.backdropPath || currentItem.posterPath}
          alt={currentItem.title}
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center opacity-70 md:opacity-85 transition-opacity duration-1000 scale-105 animate-in fade-in"
        />

        {/* Multi-directional cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent w-full md:w-4/5" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 to-transparent" />
      </div>

      {/* Hero Content Information */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-end pb-12 md:pb-16 z-10">
        <div className="max-w-2xl space-y-4">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#F22E2E] text-white shadow-md shadow-red-950/60">
              Featured {currentItem.type === 'movie' ? 'Movie' : 'Series'}
            </span>

            {currentItem.rating > 0 && (
              <span className="flex items-center gap-1 font-bold text-xs text-orange-400 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded border border-white/10">
                <Star className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                <span>{currentItem.rating.toFixed(1)} / 10</span>
              </span>
            )}

            {releaseYear && (
              <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                <Calendar className="w-3.5 h-3.5 text-gray-400" /> {releaseYear}
              </span>
            )}

            {currentItem.runtime && (
              <span className="flex items-center gap-1 text-xs text-gray-300 font-medium">
                <Clock className="w-3.5 h-3.5 text-gray-400" /> {currentItem.runtime}m
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-2xl leading-[1.05]">
            {currentItem.title}
          </h1>

          {/* Genre chips */}
          {currentItem.genres && currentItem.genres.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-0.5">
              {currentItem.genres.slice(0, 3).map((g) => (
                <Link
                  key={g.id}
                  href={`/genre/${g.slug}`}
                  className="text-[11px] font-medium text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 px-2.5 py-0.5 rounded backdrop-blur-sm transition-colors"
                >
                  {g.name}
                </Link>
              ))}
            </div>
          )}

          {/* Overview text */}
          <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl drop-shadow">
            {currentItem.overview}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link href={watchUrl}>
              <Button variant="white" size="lg" className="gap-2.5 px-7 text-sm font-bold text-black bg-white hover:bg-gray-200 shadow-2xl">
                <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                <span>Watch Now</span>
              </Button>
            </Link>

            {currentItem.trailerUrl && (
              <Button
                variant="glass"
                size="lg"
                onClick={() => setShowTrailerModal(true)}
                className="gap-2 text-sm font-bold"
              >
                <Film className="w-4 h-4" />
                <span>Trailer</span>
              </Button>
            )}

            <Link href={detailUrl}>
              <Button variant="secondary" size="lg" className="gap-2 text-sm font-bold">
                <Info className="w-4 h-4" />
                <span>Details</span>
              </Button>
            </Link>

            <FavoriteButton media={currentItem} showText size="lg" className="h-[42px]" />
          </div>
        </div>

        {/* Carousel indicator dots */}
        {featured.length > 1 && (
          <div className="absolute right-4 md:right-8 bottom-6 flex items-center gap-2 z-20">
            {featured.slice(0, 5).map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'w-7 bg-[#F22E2E]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      {currentItem.trailerUrl && (
        <Modal
          isOpen={showTrailerModal}
          onClose={() => setShowTrailerModal(false)}
          title={`${currentItem.title} - Official Trailer`}
          maxWidth="4xl"
        >
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black">
            {currentItem.trailerUrl.includes('youtube.com') ? (
              <iframe
                src={`${currentItem.trailerUrl.replace('watch?v=', 'embed/')}?autoplay=1`}
                title={`${currentItem.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={currentItem.trailerUrl}
                controls
                autoPlay
                className="w-full h-full"
              />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
