'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  Settings,
  Subtitles,
  ArrowLeft,
  SkipForward,
  SkipBack,
  HelpCircle,
} from 'lucide-react';
import { PlaybackInfo } from '@/types/media';
import { getPlaybackPosition, savePlaybackPosition } from '@/lib/storage';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  playbackInfo: PlaybackInfo;
  onEnded?: () => void;
}

export function VideoPlayer({ playbackInfo, onEnded }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(playbackInfo.duration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubtitlesMenu, setShowSubtitlesMenu] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string | 'off'>('off');
  const [activeQuality, setActiveQuality] = useState<string>(playbackInfo.sources[0]?.quality || '1080p');
  const [resumePrompt, setResumePrompt] = useState<number | null>(null);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  const activeSource = playbackInfo.sources.find((s) => s.quality === activeQuality) || playbackInfo.sources[0];

  // Helper format time MM:SS or HH:MM:SS
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);

    if (hours > 0) {
      return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Activity timer to hide controls
  const handleUserActivity = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        setShowSettings(false);
        setShowSubtitlesMenu(false);
      }, 3500);
    }
  }, [isPlaying]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    handleUserActivity();
  }, [handleUserActivity]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSkip = useCallback((seconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.max(0, Math.min(videoRef.current.duration || duration, videoRef.current.currentTime + seconds));
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    handleUserActivity();
  }, [duration, handleUserActivity]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume > 0 ? volume : 0.5;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const toggleFullscreen = useCallback(async () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        await playerContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Fullscreen request error', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Exit fullscreen error', err);
      }
    }
  }, []);

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSettings(false);
  };

  const handleSubtitleChange = (subId: string | 'off') => {
    setSelectedSubtitle(subId);
    if (videoRef.current) {
      const tracks = videoRef.current.textTracks;
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = subId === 'off' ? 'disabled' : (tracks[i].label === subId ? 'showing' : 'disabled');
      }
    }
    setShowSubtitlesMenu(false);
  };

  const resumeAt = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
    setResumePrompt(null);
  };

  // Periodic position save to localStorage every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused && videoRef.current.duration > 0) {
        const time = videoRef.current.currentTime;
        const dur = videoRef.current.duration;
        savePlaybackPosition(playbackInfo.id, time, dur, {
          mediaType: playbackInfo.mediaType,
          title: playbackInfo.title,
          seriesTitle: playbackInfo.seriesTitle,
          seasonNumber: playbackInfo.seasonNumber,
          episodeNumber: playbackInfo.episodeNumber,
          posterPath: playbackInfo.posterPath,
          backdropPath: playbackInfo.backdropPath,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [playbackInfo]);

  // Check saved position from localStorage once on video load
  const handleVideoLoadedData = () => {
    const savedPos = getPlaybackPosition(playbackInfo.id);
    if (savedPos && savedPos > 15 && (!playbackInfo.duration || savedPos < playbackInfo.duration - 30)) {
      setResumePrompt(savedPos);
    }
  };

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
        case 'arrowleft':
        case 'j':
          e.preventDefault();
          handleSkip(-5);
          break;
        case 'arrowright':
        case 'l':
          e.preventDefault();
          handleSkip(5);
          break;
        case 'arrowup':
          e.preventDefault();
          if (videoRef.current) {
            const nextVol = Math.min(1, volume + 0.1);
            setVolume(nextVol);
            videoRef.current.volume = nextVol;
            setIsMuted(false);
          }
          break;
        case 'arrowdown':
          e.preventDefault();
          if (videoRef.current) {
            const nextVol = Math.max(0, volume - 0.1);
            setVolume(nextVol);
            videoRef.current.volume = nextVol;
            if (nextVol === 0) setIsMuted(true);
          }
          break;
        case '?':
          setShowShortcutsModal(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, volume, isMuted, togglePlay, toggleFullscreen, toggleMute, handleSkip]);

  // Fullscreen change detection
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div
      ref={playerContainerRef}
      onMouseMove={handleUserActivity}
      onTouchStart={handleUserActivity}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl group select-none flex items-center justify-center"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        src={activeSource?.src}
        poster={playbackInfo.backdropPath}
        playsInline
        onLoadedData={handleVideoLoadedData}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          if (onEnded) onEnded();
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      >
        {playbackInfo.subtitles?.map((sub) => (
          <track
            key={sub.id}
            kind="subtitles"
            label={sub.label}
            srcLang={sub.language}
            src={sub.src}
            default={sub.default}
          />
        ))}
      </video>

      {/* Resume Playback Prompt Banner */}
      {resumePrompt && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-[#0a0a0a]/95 text-white px-5 py-3 rounded-md border border-[#F22E2E]/60 backdrop-blur-md shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <p className="text-xs sm:text-sm">
            Resume watching at <span className="font-bold text-[#F22E2E]">{formatTime(resumePrompt)}</span>?
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => resumeAt(resumePrompt)}
              className="bg-[#F22E2E] hover:bg-[#d92222] text-white text-xs font-bold px-3 py-1.5 rounded shadow-md transition-colors"
            >
              Resume
            </button>
            <button
              onClick={() => setResumePrompt(null)}
              className="bg-white/10 hover:bg-white/20 text-gray-300 text-xs px-2.5 py-1.5 rounded transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {/* Top Bar (Title, Back link, Episode selector) */}
      <div
        className={cn(
          'absolute top-0 inset-x-0 p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 z-30',
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex items-center gap-3">
          <Link
            href={playbackInfo.mediaType === 'movie' ? `/movies/${playbackInfo.id}` : `/series/${playbackInfo.id}`}
            className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10"
            title="Back to details"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm md:text-base font-bold text-white leading-tight">
              {playbackInfo.title}
            </h1>
            {playbackInfo.seriesTitle && (
              <p className="text-xs text-gray-400">
                {playbackInfo.seriesTitle} • S{playbackInfo.seasonNumber} E{playbackInfo.episodeNumber}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Episode navigators */}
          {playbackInfo.prevEpisodeId && (
            <Link
              href={`/watch/${playbackInfo.prevEpisodeId}`}
              className="p-2 rounded-md bg-black/50 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 text-xs flex items-center gap-1.5"
              title="Previous Episode"
            >
              <SkipBack className="w-4 h-4" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          )}

          {playbackInfo.nextEpisodeId && (
            <Link
              href={`/watch/${playbackInfo.nextEpisodeId}`}
              className="p-2 rounded-md bg-[#F22E2E] hover:bg-[#d92222] text-white backdrop-blur-md border border-red-500/30 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-red-950/50"
              title="Next Episode"
            >
              <span className="hidden sm:inline">Next Episode</span>
              <SkipForward className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setShowShortcutsModal(true)}
            className="p-2 rounded-full bg-black/50 hover:bg-white/20 text-gray-300 hover:text-white backdrop-blur-md border border-white/10"
            title="Keyboard Shortcuts (?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Big Center Play/Pause Indicator if paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F22E2E] hover:bg-[#d92222] text-white flex items-center justify-center shadow-2xl shadow-black hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <Play className="w-8 h-8 fill-current ml-1" />
        </button>
      )}

      {/* Bottom Controls Bar */}
      <div
        className={cn(
          'absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col gap-2.5 transition-opacity duration-300 z-30',
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        {/* Seek Bar Slider */}
        <div className="relative flex items-center group/seek">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 group-hover/seek:h-2 bg-white/20 rounded-lg appearance-none cursor-pointer transition-all duration-150"
            style={{
              background: `linear-gradient(to right, #F22E2E ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.2) ${(currentTime / (duration || 1)) * 100}%)`,
            }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between text-white text-sm">
          {/* Left Controls (Play, Skip, Volume, Time) */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={togglePlay}
              className="p-1.5 hover:text-[#F22E2E] transition-colors"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>

            <button
              onClick={() => handleSkip(-5)}
              className="p-1 text-gray-300 hover:text-white transition-colors"
              title="Seek backward 5s (←)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleSkip(5)}
              className="p-1 text-gray-300 hover:text-white transition-colors"
              title="Seek forward 5s (→)"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2 group/vol">
              <button
                onClick={toggleMute}
                className="p-1 text-gray-300 hover:text-white transition-colors"
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-[#F22E2E]" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 sm:w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer hidden group-hover/vol:inline-block"
              />
            </div>

            {/* Time display */}
            <div className="text-xs text-gray-300 font-mono tracking-wider">
              <span>{formatTime(currentTime)}</span>
              <span className="text-gray-500 mx-1">/</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Controls (Speed, Subtitles, Quality, Fullscreen) */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* Subtitles Button */}
            {playbackInfo.subtitles && playbackInfo.subtitles.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => {
                    setShowSubtitlesMenu(!showSubtitlesMenu);
                    setShowSettings(false);
                  }}
                  className={cn(
                    'p-1.5 rounded hover:bg-white/10 transition-colors',
                    selectedSubtitle !== 'off' ? 'text-[#F22E2E]' : 'text-gray-300 hover:text-white'
                  )}
                  title="Subtitles"
                >
                  <Subtitles className="w-5 h-5" />
                </button>

                {showSubtitlesMenu && (
                  <div className="absolute right-0 bottom-10 w-44 bg-[#0a0a0a]/95 border border-white/10 rounded-md shadow-2xl p-1.5 backdrop-blur-md z-50 text-xs">
                    <p className="px-2.5 py-1 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                      Subtitles / CC
                    </p>
                    <button
                      onClick={() => handleSubtitleChange('off')}
                      className={cn(
                        'w-full text-left px-2.5 py-1.5 rounded transition-colors',
                        selectedSubtitle === 'off' ? 'bg-[#F22E2E] text-white font-bold' : 'hover:bg-white/10 text-gray-200'
                      )}
                    >
                      Off
                    </button>
                    {playbackInfo.subtitles.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubtitleChange(sub.label)}
                        className={cn(
                          'w-full text-left px-2.5 py-1.5 rounded transition-colors',
                          selectedSubtitle === sub.label ? 'bg-[#F22E2E] text-white font-bold' : 'hover:bg-white/10 text-gray-200'
                        )}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Playback Settings (Speed & Quality) */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSettings(!showSettings);
                  setShowSubtitlesMenu(false);
                }}
                className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                title="Playback Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {showSettings && (
                <div className="absolute right-0 bottom-10 w-48 bg-[#0a0a0a]/95 border border-white/10 rounded-md shadow-2xl p-2 backdrop-blur-md z-50 text-xs space-y-2">
                  <div>
                    <p className="px-2 py-1 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                      Speed ({playbackSpeed}x)
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.75, 1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => handleSpeedChange(spd)}
                          className={cn(
                            'px-2 py-1 rounded text-center transition-colors',
                            playbackSpeed === spd ? 'bg-[#F22E2E] text-white font-bold' : 'hover:bg-white/10 text-gray-200'
                          )}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {playbackInfo.sources.length > 1 && (
                    <div className="pt-2 border-t border-white/10">
                      <p className="px-2 py-1 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                        Quality
                      </p>
                      {playbackInfo.sources.map((src) => (
                        <button
                          key={src.quality}
                          onClick={() => {
                            setActiveQuality(src.quality);
                            setShowSettings(false);
                          }}
                          className={cn(
                            'w-full text-left px-2 py-1.5 rounded transition-colors',
                            activeQuality === src.quality ? 'bg-[#F22E2E] text-white font-bold' : 'hover:bg-white/10 text-gray-200'
                          )}
                        >
                          {src.quality}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen (F)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-md p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-gray-400">Play / Pause</span>
                <kbd className="px-2 py-0.5 bg-white/10 text-white rounded font-mono">Space</kbd>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-gray-400">Fullscreen</span>
                <kbd className="px-2 py-0.5 bg-white/10 text-white rounded font-mono">F</kbd>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-gray-400">Mute / Unmute</span>
                <kbd className="px-2 py-0.5 bg-white/10 text-white rounded font-mono">M</kbd>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-gray-400">Seek ±5s</span>
                <kbd className="px-2 py-0.5 bg-white/10 text-white rounded font-mono">← / →</kbd>
              </div>
              <div className="flex items-center justify-between bg-white/5 p-2 rounded">
                <span className="text-gray-400">Volume</span>
                <kbd className="px-2 py-0.5 bg-white/10 text-white rounded font-mono">↑ / ↓</kbd>
              </div>
            </div>
            <button
              onClick={() => setShowShortcutsModal(false)}
              className="w-full bg-[#F22E2E] hover:bg-[#d92222] text-white text-xs font-bold py-2 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
