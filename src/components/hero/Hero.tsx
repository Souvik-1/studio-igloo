import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import siteConfig from '@/config/site.json';
import photosData from '@/data/photos.json';

export const Hero: React.FC = () => {
  // Find featured hero image or first wedding image
  const heroPhoto =
    photosData.photos.find((p) => p.featured && p.category === 'Wedding') ||
    photosData.photos[0];

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-end overflow-hidden bg-[#1C1C1C]">
      {/* Hero Background Image with subtle scale entrance */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={heroPhoto.src}
          alt={heroPhoto.alt}
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
          className="w-full h-full object-cover object-center opacity-85"
        />
        {/* Soft vignette/gradient overlay for high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/90 via-[#1C1C1C]/30 to-transparent" />
      </motion.div>

      {/* Hero Text Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs uppercase tracking-[0.3em] text-[#FAF8F5]/80 font-sans mb-3"
          >
            {siteConfig.siteName.toUpperCase()}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF8F5] leading-[0.95] tracking-tight mb-6"
          >
            {siteConfig.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-sm sm:text-base font-sans font-light text-[#FAF8F5]/80 tracking-wide max-w-md"
          >
            {siteConfig.heroSubtitle} — capturing honest human emotion, intimate details, and unspoken stories.
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center space-x-3 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors cursor-pointer self-start md:self-end pb-2"
          onClick={() => {
            const intro = document.getElementById('intro');
            intro?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[11px] uppercase tracking-widest font-sans font-medium">
            Explore Portfolio
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 stroke-[1.5]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
