import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Mic } from 'lucide-react';

interface VoicePlayerProps {
  audioUrl?: string;
  duration?: number;
  isMe?: boolean;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({ audioUrl, duration = 6, isMe = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<any>(null);

  // Soundwave heights pattern
  const waveHeights = [25, 45, 80, 50, 90, 60, 100, 75, 40, 85, 95, 60, 40, 70, 90, 45, 60, 30, 80, 50];

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onloadedmetadata = () => {
        if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
          setTotalDuration(Math.round(audio.duration));
        }
      };

      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.onerror = () => {
        // Fallback for audio playback simulation
      };

      return () => {
        audio.pause();
        audioRef.current = null;
      };
    }
  }, [audioUrl]);

  // Handle synthetic playback if audio element doesn't have real media stream
  useEffect(() => {
    if (isPlaying && (!audioRef.current || !audioUrl)) {
      synthIntervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.2;
        });
      }, 200);
    } else {
      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }
    }
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    };
  }, [isPlaying, totalDuration, audioUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current && audioUrl) {
        audioRef.current.play().catch(() => {
          // Playback without browser blocking
        });
      }
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = totalDuration > 0 ? (currentTime / totalDuration) : 0;

  return (
    <div className="flex items-center gap-2.5 py-0.5 min-w-[200px] sm:min-w-[230px]">
      {/* Play/Pause Button */}
      <button
        type="button"
        onClick={togglePlay}
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs ${
          isMe
            ? 'bg-white text-[#D94A0B] hover:bg-neutral-100'
            : 'bg-[#D94A0B] text-white hover:bg-[#C23E08]'
        }`}
        title={isPlaying ? 'Hakad geli' : 'Dhageyso'}
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        )}
      </button>

      {/* Soundwave Bars & Duration */}
      <div className="flex-1 flex flex-col justify-center gap-1">
        {/* Waveform */}
        <div className="flex items-center gap-[2.5px] h-6 px-1">
          {waveHeights.map((h, i) => {
            const barProgress = i / waveHeights.length;
            const isPlayed = barProgress <= progress;
            return (
              <div
                key={i}
                style={{ height: `${Math.max(20, h * (isPlaying ? (0.6 + Math.sin(Date.now() / 100 + i) * 0.4) : 1))}%` }}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlayed
                    ? isMe
                      ? 'bg-white'
                      : 'bg-[#D94A0B]'
                    : isMe
                    ? 'bg-white/40'
                    : 'bg-neutral-300'
                }`}
              />
            );
          })}
        </div>

        {/* Time info */}
        <div className="flex items-center justify-between text-[10px] font-medium leading-none px-1">
          <span className={isMe ? 'text-white/80' : 'text-neutral-500'}>
            {formatTime(isPlaying ? currentTime : totalDuration)}
          </span>
          <span className={`flex items-center gap-1 ${isMe ? 'text-white/80' : 'text-neutral-500'}`}>
            <Mic className="w-2.5 h-2.5 opacity-80" />
            <span>Cod</span>
          </span>
        </div>
      </div>
    </div>
  );
};

