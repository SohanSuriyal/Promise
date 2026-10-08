import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

// Photos matching her 4 uploaded pictures
import photoHerSelfie from '../assets/images/photo_her_selfie_1791451623937.jpg';
import photoHerPurple from '../assets/images/photo_her_purple_relaxed_1791451656354.jpg';
import photoKitten from '../assets/images/photo_kitten_surprise_1791451644263.jpg';
import photoHerYellowCar from '../assets/images/photo_her_yellow_car_1791451633596.jpg';

interface PhotoItem {
  id: number;
  url: string;
  caption: string;
}

export const PhotoSection: React.FC = () => {
  const defaultPhotos: PhotoItem[] = [
    {
      id: 1,
      url: photoHerSelfie,
      caption: 'quiet little momen...',
    },
    {
      id: 2,
      url: photoHerPurple,
      caption: 'cozy & safe 🐾',
    },
    {
      id: 3,
      url: photoKitten,
      caption: 'my favorite smile ✨',
    },
    {
      id: 4,
      url: photoHerYellowCar,
      caption: 'little things for y...',
    },
  ];

  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem('user_photo_gallery_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 4) {
          return parsed;
        }
      }
    } catch {
      // Local storage unavailable
    }
    return defaultPhotos;
  });

  const handleCustomUpload = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          const newUrl = uploadEvent.target.result as string;
          setPhotos((prev) => {
            const updated = prev.map((p) => (p.id === id ? { ...p, url: newUrl } : p));
            try {
              localStorage.setItem('user_photo_gallery_v2', JSON.stringify(updated));
            } catch {
              // Local storage full
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-full py-4">
      <div className="text-center mb-5">
        <span className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-rose-500/80 font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          Our little moments
        </span>
        <h3 className="text-xl sm:text-2xl font-cute font-bold text-neutral-800">
          Some cozy memories 🤍
        </h3>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
          Tap the camera icon anytime to replace with your photo
        </p>
      </div>

      {/* 2x2 Grid exactly matching her 4 photos and image.png */}
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 px-1 max-w-md mx-auto">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative bg-white p-3 pb-3.5 rounded-3xl border border-rose-200/90 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            {/* Photo Image Frame */}
            <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-2xl bg-rose-50/50">
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />

              {/* Floating Camera Button badge */}
              <label
                title="Tap to change photo"
                className="absolute bottom-2 right-2 p-2 rounded-full bg-white text-rose-500 shadow-md cursor-pointer active:scale-90 transition-transform flex items-center justify-center hover:bg-rose-50"
              >
                <Camera className="w-4 h-4 stroke-[2.2]" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleCustomUpload(photo.id, e)}
                />
              </label>
            </div>

            {/* Handwritten Caption centered below image */}
            <div className="mt-2.5 text-center">
              <p className="text-sm sm:text-base font-handwriting text-neutral-800 leading-tight">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
