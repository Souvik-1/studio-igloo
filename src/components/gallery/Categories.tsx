import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import photosData from '@/data/photos.json';

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export const Categories: React.FC<CategoriesProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = photosData.categories;

  // Find sample thumbnail image for hovered category
  const activeHoverPhoto = hoveredCategory
    ? photosData.photos.find((p) => p.category === hoveredCategory)
    : null;

  return (
    <section id="categories" className="py-24 md:py-36 bg-[#1C1C1C] text-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Category List */}
        <div className="lg:col-span-7 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#FAF8F5]/60 font-sans block mb-6">
            PORTFOLIO CATEGORIES
          </span>

          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat;

            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group border-b border-[#FAF8F5]/10 py-4 cursor-pointer flex items-center justify-between"
                onMouseEnter={() => setHoveredCategory(cat)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => {
                  onSelectCategory(cat);
                  const galleryEl = document.getElementById('gallery');
                  galleryEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                data-cursor="EXPLORE"
              >
                <div className="flex items-center space-x-6">
                  <span className="text-xs font-sans text-[#FAF8F5]/40 group-hover:text-[#FAF8F5] transition-colors">
                    0{idx + 1}
                  </span>
                  <h3
                    className={`font-serif text-3xl sm:text-4xl md:text-5xl transition-all duration-300 ${
                      isSelected
                        ? 'text-[#FAF8F5] italic underline underline-offset-8 decoration-[#FAF8F5]/50'
                        : 'text-[#FAF8F5]/70 group-hover:text-[#FAF8F5] group-hover:translate-x-2'
                    }`}
                  >
                    {cat}
                  </h3>
                </div>

                <span className="text-xs uppercase tracking-widest font-sans text-[#FAF8F5]/40 group-hover:text-[#FAF8F5] transition-colors">
                  {photosData.photos.filter((p) => p.category === cat).length} Photos →
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Category Preview Image Column */}
        <div className="hidden lg:block lg:col-span-5 h-[500px] relative rounded-none overflow-hidden bg-[#2B3A42]">
          <AnimatePresence mode="wait">
            {activeHoverPhoto ? (
              <motion.img
                key={activeHoverPhoto.id}
                src={activeHoverPhoto.src}
                alt={activeHoverPhoto.alt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            ) : (
              <motion.img
                key="default"
                src={photosData.photos[0].src}
                alt="Studio Igloo category preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover filter grayscale opacity-60"
              />
            )}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-xs uppercase tracking-widest text-[#FAF8F5]/60 font-sans">
              VISUAL PREVIEW
            </p>
            <p className="font-serif text-2xl text-[#FAF8F5] mt-1">
              {hoveredCategory || 'Hover over a category to preview'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
