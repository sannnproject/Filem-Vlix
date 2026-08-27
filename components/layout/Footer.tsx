import React from 'react';
import Link from 'next/link';
import { Play, Shield, Zap, Database, Server } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#080808] text-gray-400 text-xs py-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#F22E2E] flex items-center justify-center text-white shadow-md">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[#F22E2E]">
                FILEM<span className="text-white">VLIX</span>
              </span>
            </Link>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] text-gray-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F22E2E]" />
              <span>Crafted by <strong className="text-gray-200">SANN404 FORUM GROUP</strong></span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Modern streaming platform & media library architecture with zero database requirement. Designed for instant Vercel Serverless deployments.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-bold text-gray-500 uppercase tracking-widest mb-3 text-[11px]">
              Media Library
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/movies" className="hover:text-white transition-colors">
                  All Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="hover:text-white transition-colors">
                  TV Series & Episodes
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  My Favorites
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-white transition-colors">
                  Watch History
                </Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="font-bold text-gray-500 uppercase tracking-widest mb-3 text-[11px]">
              Featured Genres
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/genre/action" className="hover:text-white transition-colors">
                  Action & Thriller
                </Link>
              </li>
              <li>
                <Link href="/genre/sci-fi" className="hover:text-white transition-colors">
                  Sci-Fi & Cyberpunk
                </Link>
              </li>
              <li>
                <Link href="/genre/animation" className="hover:text-white transition-colors">
                  Open CGI Animation
                </Link>
              </li>
              <li>
                <Link href="/genre/adventure" className="hover:text-white transition-colors">
                  Fantasy & Adventure
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture Badges */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-gray-500 uppercase tracking-widest mb-3 text-[11px]">
              Zero-DB Architecture
            </h4>
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <Database className="w-4 h-4 text-[#F22E2E]" />
              <span>Zero Database Dependency</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>100% Vercel Serverless Ready</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-xs">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Client-Side Reactive Persistence</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>
            © {new Date().getFullYear()} FilemVlix • Project by{' '}
            <span className="text-gray-300 font-semibold">SANN404 FORUM GROUP</span>. All rights reserved.
          </p>
          <p>Legal & open creative commons sample media by Blender Foundation & NASA.</p>
        </div>
      </div>
    </footer>
  );
}
