import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

interface MusicPlayerProps {
  onFirstUserInteraction?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onFirstUserInteraction }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Gentle music-box synthesizer fallback in case doroon-doroon.mp3 hasn't been placed in the folder yet
  const playGentleMelodyNote = (ctx: AudioContext, freq: number, time: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.06, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch {
      // AudioContext state ignored
    }
  };

  const startFallbackMelody = () => {
    if (synthTimerRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Soft lullaby chords (E major / C# minor warm melody)
      // Notes: E4, G#4, B4, E5, D#5, C#5, B4, A4
      const notes = [
        329.63, 415.30, 493.88, 659.25,
        493.88, 415.30, 659.25, 622.25,
        554.37, 493.88, 440.00, 493.88
      ];

      let step = 0;
      const interval = window.setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;
        const now = audioCtxRef.current.currentTime;
        const freq = notes[step % notes.length];
        playGentleMelodyNote(audioCtxRef.current, freq, now, 1.2);
        // Add harmonic fifth softly
        if (step % 2 === 0) {
          playGentleMelodyNote(audioCtxRef.current, freq * 1.5, now + 0.1, 0.9);
        }
        step++;
      }, 750);

      synthTimerRef.current = interval;
      setUsingFallbackSynth(true);
      setIsPlaying(true);
    } catch {
      // Fallback unavailable
    }
  };

  const stopFallbackMelody = () => {
    if (synthTimerRef.current) {
      clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const playMusic = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setUsingFallbackSynth(false);
        return;
      } catch (err) {
        console.warn('Audio element play failed, trying fallback synth', err);
      }
    }
    // If mp3 fails or is not found yet, use romantic soft lullaby synth
    startFallbackMelody();
  };

  const pauseMusic = () => {
    if (audioRef.current && !usingFallbackSynth) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      stopFallbackMelody();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  // Listen for the FIRST user interaction anywhere on the website
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (onFirstUserInteraction) {
          onFirstUserInteraction();
        }
        // Attempt to start music after the very first tap
        playMusic();

        // Cleanup listener once triggered
        window.removeEventListener('pointerdown', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
        window.removeEventListener('click', handleFirstInteraction);
      }
    };

    window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      if (synthTimerRef.current) {
        clearInterval(synthTimerRef.current);
      }
    };
  }, [hasInteracted]);

  return (
    <>
      {/* Background audio element for doroon-doroon.mp3 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => {
          console.info('Audio loading error, checking fallback...');
        }}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
      >
        <source src="/doroon-doroon.mp3" type="audio/mpeg" />
        <source src="/dooron-dooron.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Music Button */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className="group relative flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full bg-white/85 hover:bg-white text-rose-800 shadow-md shadow-rose-950/5 border border-rose-100/80 backdrop-blur-md active:scale-95 transition-all duration-300 min-h-[44px]"
        >
          {/* Animated vinyl / music icon */}
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isPlaying ? (
              <Disc className="w-5 h-5 text-rose-500 animate-spin" style={{ animationDuration: '4s' }} />
            ) : (
              <Music className="w-4 h-4 text-rose-400" />
            )}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </div>

          <span className="text-xs font-medium text-rose-700 select-none">
            {isPlaying ? 'Music playing' : 'Music paused'}
          </span>

          <span className="text-rose-400 pl-0.5">
            {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </span>
        </button>
      </div>
    </>
  );
};
