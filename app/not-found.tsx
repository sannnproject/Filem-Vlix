import React from 'react';
import Link from 'next/link';
import { Film, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-5 max-w-md bg-slate-900/40 p-8 rounded-2xl border border-slate-800">
        <div className="w-16 h-16 rounded-2xl bg-rose-600/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <Film className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-200">Media Not Found</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          The requested movie, television series, or streaming page could not be located in the library.
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <Link href="/">
            <Button size="md" className="gap-2">
              <Home className="w-4 h-4" />
              <span>Return Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
