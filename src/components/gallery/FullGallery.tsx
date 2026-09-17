import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import photosData from '@/data/photos.json';
import { Photo } from '@/types';

interface FullGalleryProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenLightbox: (photo: Photo) => void;
}

export const FullGallery: React.FC<FullGalleryProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenLightbox,
}) => {
  const [displayCount, setDisplayCount] = useState(20);
  const allPhotos = photosData.photos as Photo[];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === 'All') return allPhotos;
    return allPhotos.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, allPhotos]);

  const visiblePhotos = useMemo(() => {
    return filteredPhotos.slice(0, displayCount);
  }, [filteredPhotos, displayCount]);

  const categoriesWithAll = ['All', ...photosData.categories];

  return (
    <section id="gallery" className="py-24 md:py-36 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#6B6862] font-sans block mb-3">
            COMPLETE ARCHIVE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1C1C] mb-4">
            The Photo Collection
          </h2>
          <p className="text-sm font-sans text-[#6B6862]">
            Browse our full portfolio of {allPhotos.length} captured moments. Click any photograph to view in full resolution.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center justify-start md:justify-center space-x-2 md:space-x-4 overflow-x-auto no-scrollbar pb-6 mb-12 border-b border-[#EAE6E1]">
          {categoriesWithAll.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelectCategory(cat);
                  setDisplayCount(20);
                }}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-sans transition-all whitespace-nowrap focus:outline-none ${
                  isSelected
                    ? 'bg-[#1C1C1C] text-[#FAF8F5]'
                    : 'bg-transparent text-[#6B6862] hover:text-[#1C1C1C] hover:bg-[#EAE6E1]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          <AnimatePresence>
            {visiblePhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden bg-[#EAE6E1] mb-6"
                onClick={() => onOpenLightbox(photo)}
                data-cursor="VIEW"
              >
                <img
                  src={photo.thumbnail || photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover Caption Overlay */}
                <div className="absolute inset-0 bg-[#1C1C1C]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-[#FAF8F5]">
                  <span className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/80 font-sans font-semibold">
                    {photo.category}
                  </span>
                  <p className="font-serif text-lg leading-tight mt-1">
                    {photo.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button if remaining */}
        {displayCount < filteredPhotos.length && (
          <div className="text-center mt-16">
            <button
              onClick={() => setDisplayCount((prev) => prev + 20)}
              className="px-8 py-3.5 border border-[#1C1C1C] text-xs uppercase tracking-widest text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all duration-300"
            >
              Load More Photographs ({filteredPhotos.length - displayCount} remaining)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
