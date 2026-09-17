import React from 'react';
import { motion } from 'motion/react';
import photosData from '@/data/photos.json';
import { Photo } from '@/types';

interface FeaturedWorkProps {
  onOpenLightbox: (photo: Photo) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onOpenLightbox }) => {
  const allPhotos = photosData.photos as Photo[];
  const featuredPhotos = allPhotos.filter((p) => p.featured).slice(0, 8);

  return (
    <section id="work" className="py-20 md:py-32 bg-[#FAF8F5] border-t border-[#EAE6E1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#6B6862] font-sans block mb-2">
              CURATED SELECTION
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1C1C]">
              Selected Work
            </h2>
          </div>
          <p className="text-sm text-[#6B6862] max-w-sm font-sans">
            A hand-picked collection showcasing our editorial perspective across weddings, intimate portraits, and visual stories.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {featuredPhotos.map((photo, index) => {
            const isLarge = index % 3 === 0;
            const spanClass = isLarge ? 'md:col-span-8' : index % 3 === 1 ? 'md:col-span-4' : 'md:col-span-6';
            const aspectClass = isLarge ? 'aspect-[16/10]' : 'aspect-[4/5]';

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: (index % 3) * 0.15 }}
                className={`${spanClass} group cursor-pointer`}
                onClick={() => onOpenLightbox(photo)}
                data-cursor="VIEW"
              >
                <div className={`relative overflow-hidden bg-[#EAE6E1] ${aspectClass}`}>
                  <img
                    src={photo.thumbnail || photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1C1C1C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs uppercase tracking-widest text-[#FAF8F5] font-sans font-medium">
                      {photo.category} — {photo.alt.slice(0, 40)}...
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs font-sans text-[#6B6862]">
                  <span className="uppercase tracking-widest text-[#1C1C1C] font-medium">
                    {photo.category}
                  </span>
                  <span className="tracking-widest">
                    0{index + 1} / 0{featuredPhotos.length}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
