import React from 'react';
import { motion } from 'motion/react';
import siteConfig from '@/config/site.json';
import photosData from '@/data/photos.json';

export const PhotographerSection: React.FC = () => {
  const photographerPhoto =
    photosData.photos.find((p) => p.category === 'Behind the Scenes') ||
    photosData.photos[0];

  return (
    <section id="about" className="py-24 md:py-36 bg-[#FAF8F5] border-t border-[#EAE6E1]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column Photographer Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[3/4] bg-[#EAE6E1] overflow-hidden">
            <img
              src={photographerPhoto.src}
              alt={`Portrait of ${siteConfig.ownerName}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#1C1C1C] text-[#FAF8F5] p-6 max-w-xs">
            <p className="font-serif text-2xl leading-none">{siteConfig.ownerName}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#FAF8F5]/60 mt-1 font-sans">
              {siteConfig.role}
            </p>
          </div>
        </motion.div>

        {/* Right Column Bio & Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#6B6862] font-sans block">
            BEHIND THE LENS
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl text-[#1C1C1C] leading-tight">
            Meet {siteConfig.ownerName}
          </h2>

          <p className="text-base text-[#6B6862] font-sans font-light leading-relaxed">
            {siteConfig.bio}
          </p>

          <div className="pt-6 border-t border-[#EAE6E1] flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#6B6862] font-sans">
                Location
              </p>
              <p className="text-sm font-sans font-medium text-[#1C1C1C] mt-0.5">
                {siteConfig.location}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#6B6862] font-sans">
                Direct Contact
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-sans font-medium text-[#1C1C1C] underline underline-offset-4 mt-0.5 block"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#6B6862] font-sans">
                Instagram
              </p>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-sans font-medium text-[#1C1C1C] underline underline-offset-4 mt-0.5 block"
              >
                @studioigloo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
