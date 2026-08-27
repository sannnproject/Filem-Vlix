import React from 'react';
import { cn } from '@/lib/utils';

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-800/60', className)}
      {...props}
    />
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="w-full aspect-[2/3] rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full h-[70vh] min-h-[480px] bg-slate-900/50 animate-pulse relative flex flex-col justify-end p-8 md:p-16">
      <Skeleton className="h-8 md:h-12 w-1/2 max-w-lg mb-4" />
      <Skeleton className="h-4 w-3/4 max-w-xl mb-2" />
      <Skeleton className="h-4 w-2/3 max-w-md mb-6" />
      <div className="flex gap-4">
        <Skeleton className="h-11 w-32 rounded-lg" />
        <Skeleton className="h-11 w-32 rounded-lg" />
      </div>
    </div>
  );
}

export function EpisodeSkeleton() {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
      <Skeleton className="w-40 aspect-video rounded-lg flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
}
