import React from 'react';
import { motion } from 'motion/react';
import siteConfig from '@/config/site.json';

export const IntroSection: React.FC = () => {
  return (
    <section id="intro" className="py-24 md:py-36 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#6B6862] font-sans">
            THE PHILOSOPHY
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] leading-[1.15] font-normal">
            {siteConfig.introTitle} <br className="hidden md:inline" />
            <span className="italic font-light text-[#6B6862]">
              {siteConfig.introBody}
            </span>
          </h2>

          <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between border-t border-[#EAE6E1] gap-6">
            <p className="text-sm text-[#6B6862] font-sans max-w-lg leading-relaxed">
              Based in {siteConfig.location} — available worldwide for commissioned weddings, portraits, and quiet visual stories.
            </p>

            <a
              href="#work"
              className="text-xs uppercase tracking-widest text-[#1C1C1C] font-sans font-semibold underline underline-offset-8 decoration-[#1C1C1C]/30 hover:decoration-[#1C1C1C] transition-all"
            >
              View Selected Works →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
