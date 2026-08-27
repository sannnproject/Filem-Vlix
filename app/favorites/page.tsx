'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, Film, ArrowRight } from 'lucide-react';
import { useFavorites, clearFavorites } from '@/lib/storage';
import { MediaItem } from '@/types/media';
import { MediaGrid } from '@/components/media/MediaGrid';
import { Button } from '@/components/ui/Button';

export default function FavoritesPage() {
  const favorites = useFavorites();

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved favorites?')) {
      clearFavorites();
    }
  };

  // Convert FavoriteItem to MediaItem for grid rendering
  const mediaItems: MediaItem[] = favorites.map((fav) => ({
    id: fav.id,
    title: fav.title,
    overview: '',
    posterPath: fav.posterPath,
    backdropPath: fav.backdropPath,
    releaseDate: fav.releaseDate,
    rating: fav.rating,
    genres: fav.genres || [],
    type: fav.mediaType,
  }));

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#F22E2E] mb-1">
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-xs font-bold uppercase tracking-wider">Saved Media</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Favorites
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Locally saved bookmarks for quick access anytime on this device.
          </p>
        </div>

        {favorites.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearAll}
            className="gap-2 self-start sm:self-auto font-bold"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Favorites</span>
          </Button>
        )}
      </div>

      {/* Content */}
      {favorites.length > 0 ? (
        <MediaGrid items={mediaItems} aspectRatio="poster" />
      ) : (
        <div className="py-20 text-center text-gray-400 bg-[#0a0a0a] rounded-md border border-white/5 p-8 space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#F22E2E]/10 text-[#F22E2E] flex items-center justify-center mx-auto border border-[#F22E2E]/20">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Favorites Saved Yet</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Click the heart icon on any movie or TV show to save it here for fast access.
          </p>
          <div className="pt-2">
            <Link href="/movies">
              <Button size="md" variant="primary" className="gap-2 font-bold">
                <Film className="w-4 h-4" />
                <span>Explore Movies</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
