import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'secondary' | 'amber' | 'emerald' | 'crimson' | 'rose' | 'indigo';
}

export function Badge({
  className,
  variant = 'default',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-white/10 text-gray-200 border-white/10',
    outline: 'bg-transparent text-gray-300 border-white/15',
    secondary: 'bg-[#121212] text-gray-400 border-white/5',
    amber: 'bg-orange-500/15 text-orange-400 border-orange-500/30 font-semibold',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    crimson: 'bg-[#F22E2E]/20 text-[#F22E2E] border-[#F22E2E]/30',
    rose: 'bg-[#F22E2E] text-white border-transparent font-bold uppercase tracking-widest',
    indigo: 'bg-blue-600 text-white border-transparent font-bold uppercase tracking-widest',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border tracking-wider whitespace-nowrap transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
