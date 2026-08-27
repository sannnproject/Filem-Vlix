'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Tv, Heart, History, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Movies', href: '/movies', icon: Film },
    { label: 'Series', href: '/series', icon: Tv },
    { label: 'Search', href: '/search', icon: Search },
    { label: 'Saved', href: '/favorites', icon: Heart },
    { label: 'History', href: '/history', icon: History },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 py-2 px-3 safe-area-bottom">
      <nav className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-md transition-colors text-[10px] font-medium min-w-[52px]',
                isActive
                  ? 'text-[#F22E2E] font-bold'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive && 'scale-110 transition-transform')} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
