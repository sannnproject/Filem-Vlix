<div align="center">

# 🎬 FilemVlix
### Modern Cinematic Streaming Platform & Media Library
**A Community Project by SANN404 FORUM GROUP**

*An ultra-fast, serverless, zero-database media streaming application built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4.*

<br/>

[![Community](https://img.shields.io/badge/Maintained%20by-SANN404%20FORUM%20GROUP-F22E2E?style=for-the-badge)](https://github.com/your-username/filemvlix)
[![Next.js](https://img.shields.io/badge/Next.js%2015-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript%205-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TMDB API](https://img.shields.io/badge/TMDB_API-v3%20%26%20v4-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![Zero-DB](https://img.shields.io/badge/Database-Zero--DB%20%2F%20Serverless-22c55e?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
[![License: MIT](https://img.shields.io/badge/License-MIT-F22E2E?style=for-the-badge)](LICENSE)

<br/>

[**Report Bug**](https://github.com/your-username/filemvlix/issues) • [**Request Feature**](https://github.com/your-username/filemvlix/issues)

</div>

---

## 📖 Table of Contents

- [✨ Overview & Highlights](#-overview--highlights)
- [⚡ Key Features](#-key-features)
- [🏗️ System Architecture & How It Works](#️-system-architecture--how-it-works)
- [🔑 How to Get & Setup Your TMDB API Key](#-how-to-get--setup-your-tmdb-api-key)
- [⚙️ Environment Variables Reference](#️-environment-variables-reference)
- [🚀 Quick Start (Local Development)](#-quick-start-local-development)
- [🌐 1-Click Deployment (Vercel, Docker, Cloud Run)](#-1-click-deployment)
- [🎮 Streaming Player & Keyboard Shortcuts](#-streaming-player--keyboard-shortcuts)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🔌 API Route Handlers Reference](#-api-route-handlers-reference)
- [🤝 Contributing & License](#-contributing--license)

---

## ✨ Overview & Highlights

**FilemVlix** is an open-source media streaming and exploration platform designed with an **Emby/Netflix-inspired architecture** but re-engineered for **100% serverless, zero-maintenance deployment**.

### Why Zero-Database (Zero-DB)?
Traditional streaming interfaces require configuring heavy relational or document databases (PostgreSQL, MySQL, MongoDB, Firebase, Supabase, Redis), database migrations, and connection pooling. 

**FilemVlix eliminates backend databases entirely:**
1. **Dynamic Remote Metadata**: Media catalogs, details, cast, recommendations, and search queries are queried dynamically from **The Movie Database (TMDB) API** with edge-caching or the built-in **Open Movie Demo catalog**.
2. **Client-Side Reactive Persistence**: User favorites, watch history timestamps, continue-watching positions, and preferences are stored locally in the user's browser using React 19 external store synchronization (`useSyncExternalStore`) with persistent `localStorage`.
3. **Zero VPS Costs**: Can be hosted freely on Vercel, Netlify, or Cloud Run without database hosting fees.

---

## ⚡ Key Features

- 🍿 **Cinematic Dark UI**: Obsidian surfaces (`#050505`), crimson accents (`#F22E2E`), smooth glass overlays, and responsive typography.
- 🎯 **Pluggable Media Provider Engine**:
  - **Demo Open Provider**: Ready out of the box with zero configuration (includes high-bitrate legal 4K/1080p open-source movies & series from Blender Foundation & NASA).
  - **TMDB Live Provider**: Full live integration with millions of movies, TV shows, seasons, cast members, and official trailers.
- 📺 **Comprehensive Media Hierarchy**:
  - **Movies**: HD posters, backdrops, ratings, release years, runtimes, cast profiles, director credits, and recommendations.
  - **TV Series**: Multi-season selector tabs, episode lists, air dates, overviews, and episode-specific stream resolution.
- ▶️ **Custom HTML5 Cinematic Video Player**:
  - Auto-resumes playback at the exact second you left off.
  - Automatic progress sync every 3 seconds.
  - Multi-track Subtitles (WebVTT captions in English, Bahasa Indonesia, etc.).
  - Playback speed control (0.75x, 1x, 1.25x, 1.5x, 2x).
  - Quality selector (1080p Full HD, 720p HD).
  - Next/Previous episode fast jumps for television series.
- ⏱️ **Continue Watching Row**: Real-time progress bar badges showing percentage watched and remaining time.
- ❤️ **One-Click Bookmarks & Favorites**: Instant cross-page synchronized watchlist.
- 🔍 **Live Debounced Search**: Instant search by title, genre, or keyword across both movies and series.
- 📱 **100% Mobile Responsive**: Dedicated bottom navigation bar for smartphone touchscreens.

---

## 🏗️ System Architecture & How It Works

```
┌──────────────────────────────────────────────────────────────────────────┐
│                             BROWSER / CLIENT                             │
│  ┌─────────────────────────┐   ┌──────────────────────────────────────┐  │
│  │   Next.js React 19 UI   │   │     Zero-DB Local Persistence        │  │
│  │  (Tailwind v4 / Motion) │◄──┤  (Watch Progress, Favorites, State)  │  │
│  └────────────┬────────────┘   └──────────────────────────────────────┘  │
└───────────────┼──────────────────────────────────────────────────────────┘
                │ HTTP Requests / Server Components
┌───────────────▼──────────────────────────────────────────────────────────┐
│                   NEXT.JS APP ROUTER (SERVER / EDGE)                     │
│  ┌────────────────────────────────────────────────────────────────────┐  │
│  │  Pluggable Media Provider Interface (`lib/api/provider.ts`)        │  │
│  └──────────────────┬───────────────────────────────┬─────────────────┘  │
│                     │                               │                    │
│      [ MEDIA_API_KEY Configured ]       [ No API Key / Demo Mode ]       │
│                     ▼                               ▼                    │
│  ┌─────────────────────────────────────┐  ┌───────────────────────────┐  │
│  │     TMDB Provider (Live API)        │  │    Open Demo Provider     │  │
│  │  - Supports TMDB v3 & v4 Bearer     │  │  - Blender 4K/1080p Films │  │
│  │  - Edge caching (1 hour ISR)        │  │  - NASA Cosmos Series     │  │
│  │  - Millions of Movies & TV Shows    │  │  - Full Offline-Safe VTT  │  │
│  └─────────────────────────────────────┘  └───────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🔑 How to Get & Setup Your TMDB API Key

Setting up your TMDB API key is **100% free** and takes less than 2 minutes:

### Step 1: Create a TMDB Account
1. Visit [The Movie Database (TMDB) Sign Up](https://www.themoviedb.org/signup).
2. Complete the free registration and verify your email address.

### Step 2: Request an API Key
1. Log in to TMDB and navigate to **Settings** → [API Settings](https://www.themoviedb.org/settings/api).
2. Click **Create** or **Request an API Key**.
3. Choose **Developer** (free).
4. Accept the terms of service and enter your application details (e.g. App Name: `FilemVlix`, Description: `Personal media streaming and catalog app`).

### Step 3: Copy Your Key
TMDB will provide you with two credentials:
- **API Key (v3 auth)**: A 32-character alphanumeric hex key (e.g. `a1b2c3d4e5f67890123456789abcdef0`)
- **API Read Access Token (v4 auth)**: A long JWT token starting with `eyJhbGciOi...`

> 💡 **FilemVlix automatically supports BOTH formats!** You can use either the v3 key or the v4 Bearer token.

### Step 4: Add the Key to Your Project

Create a `.env.local` file in your root folder:

```env
MEDIA_API_KEY=your_tmdb_api_key_here
MEDIA_API_PROVIDER=tmdb
```

Restart your dev server, and FilemVlix will immediately connect to the live catalog!

---

## ⚙️ Environment Variables Reference

| Variable Name | Required | Default Value | Description |
| :--- | :---: | :---: | :--- |
| `MEDIA_API_KEY` | **Optional** | `""` | TMDB API Key (v3) or Read Access Token (v4). If empty, runs in Demo Mode. |
| `TMDB_API_KEY` | **Optional** | `""` | Alias for `MEDIA_API_KEY`. |
| `MEDIA_API_PROVIDER` | **Optional** | `'demo'` | Set to `'tmdb'` to activate live catalog, or `'demo'` for open-source media. |
| `MEDIA_API_URL` | **Optional** | `https://api.themoviedb.org/3` | Custom TMDB API mirror or proxy base URL. |
| `NEXT_PUBLIC_APP_URL` | **Optional** | `http://localhost:3000` | Canonical app URL for OpenGraph metadata. |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v18.18.0` or higher (`v20+` recommended)
- **Package Manager**: `npm`, `pnpm`, `yarn`, or `bun`

### 1. Clone the repository
```bash
git clone https://github.com/sannnproject/Filem-Vlix
cd Filem-Vlix
```

### 2. Install dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 3. Setup environment variables
```bash
cp .env.example .env.local
```
*(Optionally add your `MEDIA_API_KEY` as explained above)*

### 4. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🌐 1-Click Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/filemvlix&env=MEDIA_API_KEY,MEDIA_API_PROVIDER)

1. Click the button above or import your repository in the [Vercel Dashboard](https://vercel.com).
2. Under **Environment Variables**, add:
   - `MEDIA_API_KEY`: *(Your TMDB Key)*
   - `MEDIA_API_PROVIDER`: `tmdb`
3. Click **Deploy**.

---

### Deploy with Docker

```dockerfile
# Build Docker image
docker build -t filemvlix .

# Run Docker container
docker run -p 3000:3000 -e MEDIA_API_KEY=your_key_here filemvlix
```

---

## 🎮 Streaming Player & Keyboard Shortcuts

The custom streaming player supports desktop keyboard controls:

| Shortcut Key | Action |
| :---: | :--- |
| <kbd>Space</kbd> / <kbd>K</kbd> | Play / Pause Toggle |
| <kbd>F</kbd> | Fullscreen Toggle |
| <kbd>M</kbd> | Mute / Unmute Audio |
| <kbd>→</kbd> | Seek Forward (+10 seconds) |
| <kbd>←</kbd> | Seek Backward (-10 seconds) |
| <kbd>↑</kbd> | Increase Volume (+10%) |
| <kbd>↓</kbd> | Decrease Volume (-10%) |
| <kbd>C</kbd> | Toggle Captions / Subtitles |

---

## 📂 Project Directory Structure

```
filemvlix/
├── app/
│   ├── api/                     # Server-side API Proxy & Route Handlers
│   │   ├── genres/              # Genre list endpoint
│   │   ├── movies/              # Popular & recent movie endpoints
│   │   ├── playback/[id]/       # Stream URL & subtitle resolution
│   │   ├── recent/              # Recent additions endpoint
│   │   ├── recommendations/     # Media recommendation endpoint
│   │   ├── search/              # Debounced search query endpoint
│   │   ├── series/              # Series & episode list endpoints
│   │   ├── status/              # Active provider health check
│   │   └── trending/            # Trending movies & TV shows
│   ├── favorites/               # Client-side Bookmarked Watchlist page
│   ├── genre/[slug]/            # Dynamic Genre Filter catalog
│   ├── history/                 # Watch Progress & History page
│   ├── movies/[id]/             # Movie Detail & Cast page
│   ├── series/[id]/             # TV Series, Seasons & Episode Selector
│   ├── search/                  # Global Search page
│   ├── watch/[id]/              # Cinematic Video Streaming Player page
│   ├── layout.tsx               # Root Layout with Navigation & Providers
│   └── page.tsx                 # Home Dashboard with Hero Carousels
├── components/
│   ├── hero/                    # HeroBanner Carousel with Video Trailers
│   ├── layout/                  # Navbar, Footer, MobileNav, ProviderModal
│   ├── media/                   # MediaCard, MediaRow, ContinueWatchingRow, EpisodeCard
│   ├── player/                  # Custom HTML5 Video Player with WebVTT Subtitles
│   └── ui/                      # Modal, Badge, Button, Skeleton Loader
├── lib/
│   ├── api/
│   │   ├── client.ts            # Next.js Server & Client data fetching helpers
│   │   ├── demo-provider.ts     # Built-in Creative Commons Open Catalog
│   │   ├── index.ts             # Media Provider Factory
│   │   ├── provider.ts          # MediaProvider TypeScript Interface
│   │   └── tmdb-provider.ts     # TMDB API v3/v4 Integration Engine
│   ├── config.ts                # Environment Config Manager
│   ├── storage.ts               # Zero-DB LocalStorage Synced State Engine
│   └── utils.ts                 # ClassName joiner & formatting helpers
├── types/
│   ├── api.ts                   # Standard API response types
│   └── media.ts                 # Movie, TVShow, Season, Episode, PlaybackInfo
├── .env.example                 # Documented template for environment variables
├── next.config.ts               # Image domain allowances & standalone output
├── package.json                 # Dependency manifest
└── README.md                    # Project documentation
```

---

## 🔌 API Route Handlers Reference

All API routes return a unified JSON envelope:

```json
{
  "success": true,
  "data": { ... },
  "provider": "The Movie Database (TMDB)",
  "timestamp": "2026-08-27T09:42:00.000Z"
}
```

### Endpoints:
- `GET /api/status`: Check provider status and active configuration.
- `GET /api/trending?type=all|movie|tv`: Fetch trending titles.
- `GET /api/movies?page=1`: Fetch popular movies.
- `GET /api/series?page=1`: Fetch popular TV shows.
- `GET /api/search?q=avatar`: Search titles across all categories.
- `GET /api/playback/[id]?season=1&episode=1`: Resolve stream playback URL, quality sources, and subtitle tracks.
- `GET /api/genres`: Fetch movie and TV genres list.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🛡️ License

Distributed under the **MIT License**. See `LICENSE` for more information.

*Disclaimer: This project is created for educational and streaming interface exploration. Open demo media is licensed under Creative Commons by the Blender Foundation and NASA.*

<div align="center">
  <sub>Built with ❤️ by <strong>SANN404 FORUM GROUP</strong> using Next.js 15 & Tailwind CSS v4</sub>
</div>
