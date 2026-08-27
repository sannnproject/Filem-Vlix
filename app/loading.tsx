import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen pb-16">
      {/* Hero skeleton */}
      <div className="w-full h-[65vh] min-h-[480px] bg-slate-900 animate-pulse relative">
        <div className="absolute bottom-12 left-4 md:left-8 max-w-xl space-y-3">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-72 sm:w-96 h-10" />
          <Skeleton className="w-full h-16" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="w-32 h-10" />
            <Skeleton className="w-28 h-10" />
          </div>
        </div>
      </div>

      {/* Row skeletons */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8 mt-12">
        <div className="space-y-3">
          <Skeleton className="w-48 h-6" />
          <div className="flex gap-4 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="w-44 h-64 flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
