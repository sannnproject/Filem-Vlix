'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, Search, Heart, History, Film, Tv, Menu, X, Sparkles } from 'lucide-react';
import { ProviderModal } from './ProviderModal';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [providerModalOpen, setProviderModalOpen] = useState(false);
  const [isLiveConfigured, setIsLiveConfigured] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.data?.configured) {
          setIsLiveConfigured(true);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Movies', href: '/movies', icon: Film },
    { label: 'TV Series', href: '/series', icon: Tv },
    { label: 'Favorites', href: '/favorites', icon: Heart },
    { label: 'History', href: '/history', icon: History },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/5 shadow-2xl shadow-black/80 py-3'
            : 'bg-gradient-to-b from-black/80 to-transparent py-4 md:py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo & Desktop Nav Links */}
          <div className="flex items-center gap-8 lg:gap-10">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-md bg-[#F22E2E] flex items-center justify-center text-white shadow-md shadow-red-950/60 group-hover:scale-105 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#F22E2E]">
                FILEM<span className="text-white">VLIX</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'transition-colors text-sm font-medium',
                      isActive
                        ? 'text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Status */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Search Input Quick Action */}
            <Link
              href="/search"
              aria-label="Search"
              onClick={() => setMobileMenuOpen(false)}
              className="relative hidden sm:block group"
            >
              <div className="flex items-center w-48 md:w-60 rounded-full bg-white/10 py-1.5 pl-4 pr-9 text-xs text-gray-400 border border-white/5 group-hover:border-white/20 transition-colors">
                <span className="truncate">Search titles...</span>
              </div>
              <Search className="absolute right-3 top-2 h-3.5 w-3.5 text-gray-400 group-hover:text-white transition-colors" />
            </Link>

            <Link
              href="/search"
              aria-label="Search"
              onClick={() => setMobileMenuOpen(false)}
              className="sm:hidden p-2 text-gray-400 hover:text-white rounded-full bg-white/5"
            >
              <Search className="w-4 h-4" />
            </Link>

            {/* Provider Mode Pill Button */}
            <button
              onClick={() => setProviderModalOpen(true)}
              className={cn(
                'hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border cursor-pointer transition-all hover:scale-105',
                isLiveConfigured
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
              )}
              title="Click to view API & Architecture Details"
            >
              <Sparkles className="w-3 h-3" />
              <span>{isLiveConfigured ? 'Live TMDB' : 'Demo Mode'}</span>
            </button>

            {/* Profile Avatar Badge */}
            <div className="h-8 w-8 rounded-md bg-gradient-to-tr from-[#F22E2E] to-orange-400 p-0.5">
              <div className="h-full w-full rounded-[4px] bg-[#050505] flex items-center justify-center text-[10px] font-bold text-white">
                FV
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-gray-400 hover:text-white rounded-md hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6 bg-[#050505]/98 border-b border-white/10 backdrop-blur-xl animate-in slide-in-from-top-2 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/10 text-white font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-3 border-t border-white/10 flex justify-between items-center px-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProviderModalOpen(true);
                }}
                className="text-xs text-orange-400 hover:underline flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isLiveConfigured ? 'Provider: TMDB Live' : 'Provider: Demo Catalog'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Provider Details & Config Modal */}
      <ProviderModal
        isOpen={providerModalOpen}
        onClose={() => setProviderModalOpen(false)}
      />
    </>
  );
}
