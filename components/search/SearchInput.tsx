'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, Film, Tv, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  initialQuery?: string;
  initialType?: 'all' | 'movie' | 'tv';
  className?: string;
  autoFocus?: boolean;
}

export function SearchInput({
  initialQuery = '',
  initialType = 'all',
  className,
  autoFocus = false,
}: SearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || searchParams.get('q') || '');
  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>(
    initialType || (searchParams.get('type') as any) || 'all'
  );

  // Debounced URL updates
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${mediaType}`);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [query, mediaType, router]);

  const handleClear = () => {
    setQuery('');
    router.push('/search');
  };

  return (
    <div className={cn('w-full max-w-3xl mx-auto space-y-3', className)}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, TV series, actors, genres..."
          autoFocus={autoFocus}
          className="w-full pl-12 pr-10 py-3.5 bg-[#0a0a0a] hover:bg-[#101010] text-white placeholder-gray-500 border border-white/10 focus:border-[#F22E2E] rounded-md outline-none transition-all shadow-xl shadow-black/40 text-sm md:text-base backdrop-blur-md"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3.5 p-1 rounded text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Chips */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <button
          onClick={() => setMediaType('all')}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border',
            mediaType === 'all'
              ? 'bg-[#F22E2E] text-white border-red-500 shadow-md shadow-red-950/40'
              : 'bg-black/60 text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
          )}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Media</span>
        </button>

        <button
          onClick={() => setMediaType('movie')}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border',
            mediaType === 'movie'
              ? 'bg-[#F22E2E] text-white border-red-500 shadow-md shadow-red-950/40'
              : 'bg-black/60 text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
          )}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Movies Only</span>
        </button>

        <button
          onClick={() => setMediaType('tv')}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border',
            mediaType === 'tv'
              ? 'bg-[#F22E2E] text-white border-red-500 shadow-md shadow-red-950/40'
              : 'bg-black/60 text-gray-300 border-white/10 hover:border-white/20 hover:text-white'
          )}
        >
          <Tv className="w-3.5 h-3.5" />
          <span>TV Series</span>
        </button>
      </div>
    </div>
  );
}
