import React from 'react';
import { ArrowUp } from 'lucide-react';
import siteConfig from '@/config/site.json';
import footerConfig from '@/config/footer.json';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1C1C] text-[#FAF8F5] border-t border-[#FAF8F5]/10 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col space-y-12">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#FAF8F5]/10 pb-12">
          <div>
            <span className="font-serif text-3xl md:text-4xl tracking-wide block">
              {siteConfig.siteName.toUpperCase()}
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#FAF8F5]/50 font-sans mt-1 block">
              PHOTOGRAPHY BY {siteConfig.ownerName}
            </span>
          </div>

          {/* Footer Nav Links */}
          <div className="flex flex-wrap gap-6 text-xs uppercase tracking-widest font-sans text-[#FAF8F5]/70">
            {footerConfig.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#FAF8F5] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs font-sans text-[#FAF8F5]/50 gap-4">
          <p>{footerConfig.copyrightText}</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors focus:outline-none"
          >
            <span className="uppercase tracking-widest">{footerConfig.backToTopText}</span>
            <ArrowUp className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
