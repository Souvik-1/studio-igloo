import React from 'react';
import { motion } from 'motion/react';
import siteConfig from '@/config/site.json';
import photosData from '@/data/photos.json';

export const StorySection: React.FC = () => {
  const storyPhotos = photosData.photos.filter((p) => p.category === 'Behind the Scenes' || p.category === 'Nature').slice(0, 2);

  return (
    <section id="story" className="py-24 md:py-36 bg-[#1C1C1C] text-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 space-y-8"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#FAF8F5]/60 font-sans block">
            VISUAL PERSPECTIVE
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.08] font-normal">
            People remember how a moment felt.
          </h2>

          <p className="text-base md:text-lg font-sans text-[#FAF8F5]/80 leading-relaxed font-light">
            {siteConfig.philosophy}
          </p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-[#FAF8F5]/10">
            <div>
              <p className="font-serif text-3xl text-[#FAF8F5]">50+</p>
              <p className="text-xs uppercase tracking-widest text-[#FAF8F5]/50 font-sans mt-1">
                Curated Stories
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#FAF8F5]">10</p>
              <p className="text-xs uppercase tracking-widest text-[#FAF8F5]/50 font-sans mt-1">
                Visual Disciplines
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column Photos Stack */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6">
          {storyPhotos.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className={`relative bg-[#2B3A42] overflow-hidden ${
                idx === 0 ? 'aspect-[4/5] mt-0' : 'aspect-[4/5] mt-8 md:mt-12'
              }`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
