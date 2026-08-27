import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: {
    default: 'FilemVlix - Modern Streaming Platform & Media Library',
    template: '%s | FilemVlix',
  },
  description:
    'A high-performance modern streaming platform and media library with zero-database architecture, rich video playback, continue watching progress, and pluggable API providers.',
  keywords: ['streaming', 'media library', 'movies', 'tv series', 'filemvlix', 'nextjs'],
  openGraph: {
    title: 'FilemVlix - Modern Streaming Platform & Media Library',
    description: 'High-performance zero-database streaming platform built with Next.js App Router.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className="bg-[#050505] text-white min-h-screen flex flex-col antialiased selection:bg-[#F22E2E] selection:text-white"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}

