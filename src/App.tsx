/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { CuteCat } from './components/CuteCat';
import { PhotoSection } from './components/PhotoSection';
import { PromiseSection } from './components/PromiseSection';
import { QuestionSection } from './components/QuestionSection';
import { HandwrittenLetter } from './components/HandwrittenLetter';
import { ChevronRight, ChevronLeft, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // Screens:
  // 0: Opening
  // 1: Message 1
  // 2: Message 2
  // 3: Message 3
  // 4: Photos
  // 5: Promises
  // 6: Question
  // 7: Final handwritten letter
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const goToNext = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 7));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrev = () => {
    setCurrentScreen((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentScreen(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalSteps = 8;

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-neutral-800 flex flex-col justify-between relative selection:bg-rose-200">
      {/* Floating subtle background hearts */}
      <FloatingHearts />

      {/* Floating background music controller */}
      <MusicPlayer />

      {/* Top Header / Progress Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#FFF9F6]/85 backdrop-blur-md border-b border-rose-100/60 px-4 py-3 flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center gap-1.5">
          <span className="font-cute font-bold text-sm tracking-wide text-rose-500">
            For you
          </span>
          <span className="text-xs text-rose-300">🤍</span>
        </div>

        {/* Subtle step indicators */}
        {currentScreen > 0 && currentScreen < 7 && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={i}
                className={`transition-all duration-300 rounded-full ${
                  currentScreen - 1 === i
                    ? 'w-4 h-1.5 bg-rose-400'
                    : currentScreen - 1 > i
                    ? 'w-1.5 h-1.5 bg-rose-300'
                    : 'w-1.5 h-1.5 bg-rose-200/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Back navigation button if past opening */}
        {currentScreen > 0 && currentScreen !== 7 ? (
          <button
            onClick={goToPrev}
            className="text-xs font-cute font-medium text-neutral-500 hover:text-neutral-800 flex items-center gap-0.5 px-2 py-1 rounded-lg hover:bg-rose-100/50 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>back</span>
          </button>
        ) : (
          <div className="w-10" />
        )}
      </header>

      {/* Main Content Area (Mobile Viewport Optimized) */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 flex flex-col items-center justify-center relative z-20">
        {/* SCREEN 0: OPENING */}
        {currentScreen === 0 && (
          <div className="w-full flex flex-col items-center justify-center text-center py-8 animate-fadeIn">
            <CuteCat mood="greeting" size="lg" className="mb-6" />

            <div className="space-y-2 mb-8">
              <h1 className="text-3xl sm:text-4xl font-cute font-bold text-neutral-800 tracking-tight">
                Hey cutie… 🥺
              </h1>
              <p className="text-lg font-cute text-neutral-600">
                I made something for you.
              </p>
            </div>

            <button
              onClick={goToNext}
              className="w-full max-w-xs py-4 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-lg shadow-lg shadow-rose-300/40 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[52px]"
            >
              <span>Tap to open 💌</span>
            </button>

            <p className="text-[11px] text-neutral-400 mt-6 font-handwriting">
              (turn your volume up a little 🎶)
            </p>
          </div>
        )}

        {/* SCREEN 1: MESSAGE 1 */}
        {currentScreen === 1 && (
          <div className="w-full flex flex-col items-center justify-center py-4 animate-fadeIn">
            <div className="w-full bg-white/90 rounded-3xl p-6 sm:p-7 shadow-md shadow-rose-950/5 border border-rose-100 relative mb-6">
              {/* Cute top tape */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-rose-200/60 rounded-xs rotate-1"
                aria-hidden="true"
              />

              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-neutral-800 font-cute font-normal">
                  "I know you’re scared that I might leave you like your ex did, but I want you to know that I’m not here temporarily. I genuinely care about you, and I want to earn your trust with my actions, not just my words. 🤍"
                </p>

                <div className="pt-3 border-t border-rose-100/60">
                  <p className="text-sm font-handwriting text-rose-600 italic">
                    You don't have to trust me all at once. Take your time. 🤍
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={goToNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-base shadow-md shadow-rose-300/30 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Continue 🤍</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 2: MESSAGE 2 */}
        {currentScreen === 2 && (
          <div className="w-full flex flex-col items-center justify-center py-4 animate-fadeIn">
            <div className="w-full bg-white/90 rounded-3xl p-6 sm:p-7 shadow-md shadow-rose-950/5 border border-rose-100 relative mb-6">
              {/* Cute top tape */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-rose-200/60 rounded-xs -rotate-1"
                aria-hidden="true"
              />

              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-neutral-800 font-cute font-normal">
                  "I can’t promise that everything will always be perfect, but I can promise that I’ll always try to understand you, support you, and stay honest with you. You’ll never have to face things alone if I can be there for you. 🫶🏻"
                </p>

                <div className="pt-3 border-t border-rose-100/60 space-y-1.5">
                  <p className="text-sm font-handwriting text-rose-600 italic">
                    I know words are easy. That's why I'd rather show you.
                  </p>
                  <p className="text-sm font-handwriting text-neutral-500 italic">
                    If you need space, I'll respect it. If you need someone to listen, I'll listen.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={goToNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-base shadow-md shadow-rose-300/30 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>Continue 🫶🏻</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 3: MESSAGE 3 */}
        {currentScreen === 3 && (
          <div className="w-full flex flex-col items-center justify-center py-4 animate-fadeIn">
            <div className="w-full bg-white/90 rounded-3xl p-6 sm:p-7 shadow-md shadow-rose-950/5 border border-rose-100 relative mb-6">
              {/* Cute top tape */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-rose-200/60 rounded-xs rotate-2"
                aria-hidden="true"
              />

              <div className="space-y-4">
                <p className="text-base sm:text-lg leading-relaxed text-neutral-800 font-cute font-normal">
                  "So please don’t feel like you have to keep waiting for the moment I’ll leave. Give me a chance to prove that I’m different. I’ll be patient with you, even when trusting me takes time. I really don’t want to lose someone I care about this much. ♾️💗"
                </p>

                <div className="pt-3 border-t border-rose-100/60">
                  <p className="text-base font-handwriting text-rose-600 font-semibold italic">
                    Koi ho ya na ho… main hoon. 🫶🏻
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={goToNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-base shadow-md shadow-rose-300/30 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
            >
              <span>See our moments 🌸</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 4: PHOTO SECTION */}
        {currentScreen === 4 && (
          <div className="w-full flex flex-col items-center justify-center animate-fadeIn">
            <PhotoSection />

            <div className="w-full mt-6">
              <button
                onClick={goToNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-base shadow-md shadow-rose-300/30 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>A few little promises 🤍</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: PROMISE SECTION */}
        {currentScreen === 5 && (
          <div className="w-full flex flex-col items-center justify-center animate-fadeIn">
            <PromiseSection />

            <div className="w-full mt-6">
              <button
                onClick={goToNext}
                className="w-full py-3.5 px-6 rounded-2xl bg-rose-400 hover:bg-rose-500 text-white font-cute font-bold text-base shadow-md shadow-rose-300/30 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[48px]"
              >
                <span>One little question 👉🏻👈🏻</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 6: FINAL QUESTION */}
        {currentScreen === 6 && (
          <QuestionSection onProceedToFinalNote={goToNext} />
        )}

        {/* SCREEN 7: FINAL PERSONAL HANDWRITTEN LETTER */}
        {currentScreen === 7 && (
          <HandwrittenLetter onRestart={handleRestart} />
        )}
      </main>

      {/* Gentle Footer */}
      <footer className="w-full py-3 text-center text-[11px] text-neutral-400 font-cute relative z-20">
        <span className="inline-flex items-center gap-1">
          made with love for you 🤍
        </span>
      </footer>
    </div>
  );
}
