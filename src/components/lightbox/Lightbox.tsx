import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Photo } from '@/types';

interface LightboxProps {
  photo: Photo | null;
  photos: Photo[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  const currentIndex = photo ? photos.findIndex((p) => p.id === photo.id) : -1;

  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < photos.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, currentIndex, photos.length, onClose, onNavigate]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-[#1C1C1C]/95 backdrop-blur-lg flex flex-col justify-between p-4 md:p-8"
      >
        {/* Lightbox Header Bar */}
        <div className="flex items-center justify-between text-[#FAF8F5] z-10">
          <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-widest font-sans text-[#FAF8F5]/60">
              STUDIO IGLOO ARCHIVE
            </span>
            <span className="text-xs text-[#FAF8F5]/30">|</span>
            <span className="text-xs uppercase tracking-widest font-sans font-medium">
              {photo.category}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-xs tracking-widest font-sans text-[#FAF8F5]/70">
              {currentIndex + 1} / {photos.length}
            </span>
            <button
              onClick={onClose}
              className="p-2 text-[#FAF8F5] hover:opacity-75 transition-opacity focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>

        {/* Center Image Container */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
          {/* Previous Button */}
          {currentIndex > 0 && (
            <button
              onClick={() => onNavigate(currentIndex - 1)}
              className="absolute left-2 md:left-6 z-20 p-3 rounded-full bg-[#1C1C1C]/40 text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#1C1C1C] transition-all focus:outline-none"
              aria-label="Previous Photograph"
            >
              <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
            </button>
          )}

          {/* Image */}
          <motion.img
            key={photo.id}
            src={photo.src}
            alt={photo.alt}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-h-full max-w-full object-contain select-none shadow-2xl"
          />

          {/* Next Button */}
          {currentIndex < photos.length - 1 && (
            <button
              onClick={() => onNavigate(currentIndex + 1)}
              className="absolute right-2 md:right-6 z-20 p-3 rounded-full bg-[#1C1C1C]/40 text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#1C1C1C] transition-all focus:outline-none"
              aria-label="Next Photograph"
            >
              <ChevronRight className="w-6 h-6 stroke-[1.5]" />
            </button>
          )}
        </div>

        {/* Lightbox Bottom Caption */}
        <div className="text-center max-w-2xl mx-auto z-10">
          <p className="font-serif text-lg md:text-xl text-[#FAF8F5] italic font-light">
            "{photo.alt}"
          </p>
          {photo.source && (
            <p className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/40 mt-1 font-sans">
              Photo Provenance: {photo.source.photographer} ({photo.source.platform})
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
