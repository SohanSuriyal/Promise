import React, { useState } from 'react';
import { CuteCat } from './CuteCat';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface QuestionSectionProps {
  onProceedToFinalNote: () => void;
}

export const QuestionSection: React.FC<QuestionSectionProps> = ({ onProceedToFinalNote }) => {
  const [status, setStatus] = useState<'initial' | 'rejected' | 'accepted'>('initial');
  const [noTapCount, setNoTapCount] = useState<number>(0);

  const handleNoClick = () => {
    setNoTapCount((prev) => prev + 1);
    setStatus('rejected');
  };

  const handleYesClick = () => {
    setStatus('accepted');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-6 px-4">
      {status === 'initial' && (
        <div className="flex flex-col items-center max-w-sm w-full animate-fadeIn">
          <CuteCat mood="greeting" size="md" className="mb-6" />

          <h3 className="text-2xl sm:text-3xl font-cute font-bold text-neutral-800 mb-2">
            Do you like me? 🥺💗
          </h3>
          <p className="text-xs text-neutral-500 mb-8 font-handwriting">
            Please be honest with me… 👉🏻👈🏻
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full justify-center">
            <button
              onClick={handleYesClick}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-lg shadow-md shadow-rose-300/40 active:scale-95 transition-all min-h-[50px] flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>YES 🤍</span>
            </button>

            <button
              onClick={handleNoClick}
              className="flex-1 py-3.5 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-neutral-600 font-cute font-medium text-lg border border-stone-200 active:scale-95 transition-all min-h-[50px] flex items-center justify-center gap-1.5"
            >
              <span>NO 😭</span>
            </button>
          </div>
        </div>
      )}

      {status === 'rejected' && (
        <div className="flex flex-col items-center max-w-sm w-full animate-fadeIn">
          <CuteCat mood="sad" size="md" className="mb-5" />

          <div className="space-y-1 mb-8">
            <h3 className="text-2xl sm:text-3xl font-cute font-bold text-neutral-800">
              Are you sure? 🥺
            </h3>
            <p className="text-base sm:text-lg font-cute text-rose-600">
              Tap YES instead 👉🏻👈🏻
            </p>
            {noTapCount > 1 && (
              <p className="text-xs text-neutral-400 italic">
                (My heart can't take this many NOs 😿)
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={handleYesClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-lg shadow-md shadow-rose-300/40 active:scale-95 transition-all min-h-[50px] flex items-center justify-center gap-2"
            >
              <span>YES 💗</span>
            </button>

            <button
              onClick={handleYesClick}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-100/80 hover:bg-rose-200 text-rose-800 font-cute font-bold text-lg border border-rose-200 active:scale-95 transition-all min-h-[50px] flex items-center justify-center gap-2"
            >
              <span>YES 🙂↕️</span>
            </button>
          </div>

          <button
            onClick={() => setStatus('initial')}
            className="mt-4 text-xs text-neutral-400 underline font-handwriting hover:text-neutral-600 py-2"
          >
            Wait, let me try again 🥺
          </button>
        </div>
      )}

      {status === 'accepted' && (
        <div className="flex flex-col items-center max-w-sm w-full animate-fadeIn">
          <div className="relative mb-6">
            <CuteCat mood="happy" size="lg" />
            <div className="absolute -top-3 -right-3 text-2xl animate-bounce">
              💗
            </div>
            <div className="absolute -bottom-2 -left-2 text-xl animate-pulse">
              ✨
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <h3 className="text-2xl sm:text-3xl font-cute font-bold text-rose-600">
              hehe… I knew it 🥺💗
            </h3>
            <p className="text-sm text-neutral-600 font-handwriting">
              Thank you for choosing me. You made my day so sweet 🫶🏻
            </p>
          </div>

          <button
            onClick={onProceedToFinalNote}
            className="w-full py-4 px-6 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-cute font-bold text-lg shadow-lg shadow-rose-400/30 active:scale-95 transition-all min-h-[52px] flex items-center justify-center gap-2"
          >
            <span>One last note for you 💌</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
