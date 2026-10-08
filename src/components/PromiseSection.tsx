import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

interface PromiseItem {
  id: number;
  text: string;
  sealNote: string;
}

export const PromiseSection: React.FC = () => {
  const promises: PromiseItem[] = [
    {
      id: 1,
      text: "🫶🏻 I'll try to understand you.",
      sealNote: 'Always listening to your heart first',
    },
    {
      id: 2,
      text: "🤍 I'll stay honest with you.",
      sealNote: 'No games, no lies, ever',
    },
    {
      id: 3,
      text: "🌷 I'll respect your space.",
      sealNote: 'Never rushing you, always patient',
    },
    {
      id: 4,
      text: "🥺 If I make a mistake, I'll admit it.",
      sealNote: 'I will learn and do better',
    },
    {
      id: 5,
      text: "💗 I'll keep trying.",
      sealNote: 'Because you are truly worth it',
    },
  ];

  const [sealed, setSealed] = useState<Record<number, boolean>>({});

  const toggleSeal = (id: number) => {
    setSealed((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const sealedCount = Object.values(sealed).filter(Boolean).length;

  return (
    <section className="w-full py-4">
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-rose-500/80 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          From the bottom of my heart
        </span>
        <h3 className="text-xl sm:text-2xl font-cute font-bold text-neutral-800">
          Some little promises from me 🤍
        </h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
          Tap each promise to seal it in your heart ({sealedCount}/5 sealed)
        </p>
      </div>

      <div className="space-y-3 max-w-md mx-auto px-1">
        {promises.map((promise) => {
          const isSealed = !!sealed[promise.id];
          return (
            <div
              key={promise.id}
              onClick={() => toggleSeal(promise.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleSeal(promise.id);
                }
              }}
              className={`group relative p-4 rounded-2xl sm:rounded-3xl border transition-all duration-300 cursor-pointer select-none active:scale-[0.98] ${
                isSealed
                  ? 'bg-rose-50/90 border-rose-300 shadow-sm shadow-rose-200/40'
                  : 'bg-white/90 border-rose-100/80 hover:border-rose-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1">
                  <p className="text-base sm:text-lg font-cute font-medium text-neutral-800">
                    {promise.text}
                  </p>
                  {isSealed && (
                    <p className="text-xs font-handwriting text-rose-600 mt-0.5 animate-fadeIn">
                      ✨ {promise.sealNote}
                    </p>
                  )}
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isSealed
                      ? 'bg-rose-400 text-white shadow-xs scale-105'
                      : 'bg-rose-50 text-rose-300 border border-rose-200/50 group-hover:border-rose-300'
                  }`}
                >
                  {isSealed ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-xs">🤍</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
