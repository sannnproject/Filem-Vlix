import React from 'react';
import Image from 'next/image';
import { Person } from '@/types/media';
import { User } from 'lucide-react';

interface CastListProps {
  cast?: Person[];
}

export function CastList({ cast }: CastListProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold text-slate-100 mb-4 tracking-tight">
        Featured Cast & Crew
      </h3>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {cast.map((person) => (
          <div
            key={person.id}
            className="flex-shrink-0 w-28 text-center flex flex-col items-center"
          >
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-slate-800 border-2 border-slate-700/60 mb-2 shadow-md">
              {person.profilePath ? (
                <Image
                  src={person.profilePath}
                  alt={person.name}
                  fill
                  sizes="80px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <p className="text-xs font-semibold text-slate-200 line-clamp-1">
              {person.name}
            </p>
            <p className="text-[11px] text-slate-400 line-clamp-1">
              {person.character || person.job || 'Cast'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
