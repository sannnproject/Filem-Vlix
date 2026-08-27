import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'danger' | 'brand' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#F22E2E] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer whitespace-nowrap rounded-md';

  const variants = {
    primary:
      'bg-[#F22E2E] hover:bg-[#d92222] text-white shadow-md shadow-red-950/50 border border-red-500/20',
    white:
      'bg-white hover:bg-gray-200 text-black shadow-lg shadow-black/50',
    brand:
      'bg-[#F22E2E] hover:bg-[#d92222] text-white shadow-md shadow-red-950/50 border border-red-500/20',
    secondary:
      'bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur-sm',
    outline:
      'bg-transparent hover:bg-white/10 text-gray-200 border border-white/15 hover:border-white/30',
    ghost:
      'bg-transparent hover:bg-white/10 text-gray-300 hover:text-white',
    glass:
      'bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/20 shadow-lg',
    danger:
      'bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-800/40 shadow-sm hover:text-white',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded gap-1.5',
    md: 'text-sm px-4 py-2 rounded-md gap-2',
    lg: 'text-sm sm:text-base px-6 py-2.5 rounded-md gap-2.5 font-bold',
    icon: 'p-2 rounded-md',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
