import React from 'react';

// Pre-generated high-fidelity pastel cat sticker assets
import catGreeting from '../assets/images/cat_sticker_greeting_1791450287247.jpg';
import catSad from '../assets/images/cat_sticker_sad_1791450314063.jpg';
import catHappy from '../assets/images/cat_sticker_happy_1791450329214.jpg';

export type CatMood = 'greeting' | 'sad' | 'happy' | 'gentle';

interface CuteCatProps {
  mood?: CatMood;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  caption?: string;
}

export const CuteCat: React.FC<CuteCatProps> = ({
  mood = 'greeting',
  alt = 'Cute cat sticker',
  size = 'md',
  className = '',
  caption,
}) => {
  const getImage = () => {
    switch (mood) {
      case 'sad':
        return catSad;
      case 'happy':
        return catHappy;
      case 'greeting':
      case 'gentle':
      default:
        return catGreeting;
    }
  };

  const sizeClasses = {
    sm: 'w-24 h-24 max-w-[100px]',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative group">
        {/* Soft pastel ambient glow */}
        <div
          className="absolute -inset-2 bg-gradient-to-tr from-rose-200/50 via-amber-100/40 to-pink-200/50 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />

        {/* Sticker frame with cute border */}
        <div className={`relative ${sizeClasses} rounded-full p-2 bg-white/95 shadow-lg shadow-rose-950/5 border-2 border-rose-100/80 animate-float-gentle`}>
          <img
            src={getImage()}
            alt={alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full select-none pointer-events-none transition-transform duration-300"
          />
        </div>
      </div>

      {caption && (
        <span className="mt-2 text-xs text-rose-700/80 font-medium tracking-wide">
          {caption}
        </span>
      )}
    </div>
  );
};
