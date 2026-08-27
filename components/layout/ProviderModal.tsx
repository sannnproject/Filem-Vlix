'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Key, Database } from 'lucide-react';
import { ProviderStatus } from '@/types/api';

interface ProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProviderModal({ isOpen, onClose }: ProviderModalProps) {
  const [status, setStatus] = useState<ProviderStatus | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    // Set loading state safely
    Promise.resolve().then(() => {
      if (isMounted) setLoading(true);
    });

    fetch('/api/status')
      .then((res) => res.json())
      .then((res) => {
        if (isMounted) {
          if (res.success) setStatus(res.data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FilemVlix Architecture & API Config" maxWidth="lg">
      <div className="space-y-5 text-sm">
        {/* Status Box */}
        <div className="p-4 rounded-md bg-[#050505] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Catalog Provider
            </span>
            <Badge variant={status?.configured ? 'emerald' : 'amber'}>
              {status?.configured ? 'TMDB Live Catalog' : 'Demo Open Movie Catalog'}
            </Badge>
          </div>
          <p className="text-gray-300 text-xs leading-relaxed">
            {loading ? 'Checking provider configuration...' : status?.message}
          </p>
        </div>

        {/* Serverless & Zero-Database Architecture */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
            <Database className="w-4 h-4 text-[#F22E2E]" />
            100% Serverless & Zero-Database Architecture
          </h4>
          <ul className="space-y-1.5 text-xs text-gray-400 pl-5 list-disc">
            <li>Zero SQL, MongoDB, Redis, or Firebase dependency.</li>
            <li>Watch progress, playback positions, and favorites are persistently stored in browser client storage.</li>
            <li>Next.js Route Handlers proxy all metadata and protect secret API keys.</li>
            <li>100% compatible with instant Vercel Serverless deployments.</li>
          </ul>
        </div>

        {/* Setup instructions */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1.5">
            <Key className="w-4 h-4 text-orange-400" />
            How to Connect TMDB Live API
          </h4>
          <div className="p-3 bg-[#050505] font-mono text-xs rounded border border-white/10 text-gray-300 overflow-x-auto">
            <code>
              # Add to your .env or Vercel Environment Variables<br />
              MEDIA_API_KEY=your_tmdb_api_key_here<br />
              MEDIA_API_PROVIDER=tmdb<br />
              MEDIA_API_URL=https://api.themoviedb.org/3
            </code>
          </div>
          <p className="text-[11px] text-gray-400">
            Get a free API key at <a href="https://www.themoviedb.org/settings/api" target="_blank" rel="noopener noreferrer" className="text-[#F22E2E] underline">themoviedb.org/settings/api</a>. Once added, restart the dev server or redeploy to Vercel to unlock millions of titles.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 font-medium">
            Open-Source by <span className="text-gray-300">SANN404 FORUM GROUP</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
}
