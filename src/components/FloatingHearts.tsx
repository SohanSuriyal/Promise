import React, { useEffect, useState } from 'react';

interface FloatingHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
  opacity: number;
}

interface TapHeart {
  id: number;
  x: number;
  y: number;
  symbol: string;
}

export const FloatingHearts: React.FC = () => {
  const [backgroundHearts, setBackgroundHearts] = useState<FloatingHeart[]>([]);
  const [tapHearts, setTapHearts] = useState<TapHeart[]>([]);

  useEffect(() => {
    // Generate only a few calm, spaced-out floating hearts (subtle & occasional)
    const symbols = ['🤍', '🌸', '✨', '💗', '🤍', '🫧'];
    const initialHearts: FloatingHeart[] = Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      left: 6 + Math.random() * 88,
      size: 14 + Math.random() * 12,
      duration: 12 + Math.random() * 10,
      delay: Math.random() * 14,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: 0.25 + Math.random() * 0.35,
    }));

    setBackgroundHearts(initialHearts);
  }, []);

  // Listen for user taps to spawn a tiny cute burst (max 5 active at once)
  useEffect(() => {
    const handleTap = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      const symbols = ['🤍', '💗', '✨', '🫶🏻', '🌸'];
      const newTapHeart: TapHeart = {
        id: Date.now() + Math.random(),
        x: clientX,
        y: clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      };

      setTapHearts((prev) => [...prev.slice(-6), newTapHeart]);

      setTimeout(() => {
        setTapHearts((prev) => prev.filter((h) => h.id !== newTapHeart.id));
      }, 1400);
    };

    window.addEventListener('click', handleTap);
    return () => window.removeEventListener('click', handleTap);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10" aria-hidden="true">
      {/* Background persistent floating hearts */}
      {backgroundHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `driftUp ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            bottom: '-40px',
          }}
        >
          {heart.symbol}
        </span>
      ))}

      {/* Tap burst hearts */}
      {tapHearts.map((th) => (
        <span
          key={th.id}
          className="absolute select-none text-xl animate-fade-out"
          style={{
            left: `${th.x - 12}px`,
            top: `${th.y - 14}px`,
            animation: 'driftUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          {th.symbol}
        </span>
      ))}
    </div>
  );
};
