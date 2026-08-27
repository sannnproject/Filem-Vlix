'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-5 max-w-md bg-slate-900/60 p-8 rounded-2xl border border-rose-900/40">
        <div className="w-16 h-16 rounded-2xl bg-rose-600/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Something went wrong</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          {error.message || 'An unexpected error occurred while loading this media.'}
        </p>
        <div className="pt-2 flex justify-center">
          <Button size="md" onClick={() => reset()} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
