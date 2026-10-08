import React, { useState } from 'react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { CuteCat } from './CuteCat';

interface HandwrittenLetterProps {
  onRestart: () => void;
}

export const HandwrittenLetter: React.FC<HandwrittenLetterProps> = ({ onRestart }) => {
  const [hugCount, setHugCount] = useState<number>(0);
  const [sentHug, setSentHug] = useState<boolean>(false);

  const handleSendHug = () => {
    setHugCount((prev) => prev + 1);
    setSentHug(true);
    setTimeout(() => setSentHug(false), 1500);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 px-3 sm:px-4 animate-fadeIn">
      {/* Decorative top badge */}
      <div className="flex items-center gap-1.5 text-xs text-rose-500 font-cute font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span>Written just for you</span>
      </div>

      {/* Realistic handwritten paper note */}
      <div className="relative w-full max-w-md bg-[#FFFDF7] rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-950/5 border border-[#F0E4DC] lined-paper overflow-hidden">
        {/* Washi tape at top center */}
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-rose-200/50 rounded-sm -rotate-1 backdrop-blur-xs shadow-xs"
          aria-hidden="true"
        />

        {/* Paper texture margin line */}
        <div
          className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-rose-200/40 pointer-events-none"
          aria-hidden="true"
        />

        {/* Note Content - EXACT text requested by user */}
        <div className="relative z-10 pl-4 sm:pl-6 text-neutral-800 font-handwriting select-text">
          <p className="text-2xl sm:text-3xl text-rose-700 font-bold mb-4">
            baccha 🫠
          </p>

          <p className="text-xl sm:text-2xl leading-relaxed text-neutral-800 mb-4">
            Terko kisi bhi chij ki tention lene ki jarurat nhi he 🥺
          </p>

          <p className="text-xl sm:text-2xl leading-relaxed text-neutral-800 mb-4">
            me teko hamesha bolta hu me tere sath hu, me kahi nhi ja raha 🤍
          </p>

          <p className="text-xl sm:text-2xl leading-relaxed text-neutral-800 mb-4">
            or me ye tab tak bolunga jab tak teko belive nhi ho jata 🫠
          </p>

          <p className="text-xl sm:text-2xl leading-relaxed text-rose-700 font-bold mb-6">
            dekhna cutie me terko thik kar dunga pakkka 🥺🫶🏻
          </p>
        </div>

        {/* Cute decorative stamp and cat seal */}
        <div className="relative z-10 flex items-end justify-between pt-4 border-t border-rose-100/60 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-rose-400/90 font-cute font-medium">
              always yours ♾️
            </span>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0">
            <CuteCat mood="happy" size="sm" className="scale-90" />
          </div>
        </div>
      </div>

      {/* Interactive reaction buttons */}
      <div className="w-full max-w-md mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleSendHug}
          className="flex-1 py-3.5 px-4 rounded-2xl bg-white/90 hover:bg-white text-rose-600 font-cute font-semibold border border-rose-200/80 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <Heart className={`w-4 h-4 fill-rose-400 text-rose-500 ${sentHug ? 'animate-ping' : ''}`} />
          <span>
            {hugCount === 0 ? 'Send a hug back 🫂' : `Hugs sent (${hugCount}) 🤍`}
          </span>
        </button>

        <button
          onClick={onRestart}
          className="py-3.5 px-5 rounded-2xl bg-rose-50 hover:bg-rose-100/80 text-rose-700 font-cute font-medium border border-rose-200/50 shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
        >
          <RotateCcw className="w-4 h-4 text-rose-500" />
          <span>Read from start 💌</span>
        </button>
      </div>
    </div>
  );
};
