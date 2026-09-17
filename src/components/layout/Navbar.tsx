import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import siteConfig from '@/config/site.json';

interface NavbarProps {
  activeCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Categories', href: '#categories' },
    { label: 'Story', href: '#story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-md py-4 border-b border-[#EAE6E1]'
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="group flex flex-col focus:outline-none"
            aria-label="Studio Igloo Home"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-wide text-[#1C1C1C] transition-opacity group-hover:opacity-75">
              {siteConfig.siteName.toUpperCase()}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#6B6862] font-sans -mt-1">
              PHOTOGRAPHY BY {siteConfig.ownerName}
            </span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs uppercase tracking-widest text-[#6B6862] hover:text-[#1C1C1C] transition-colors relative py-1 focus:outline-none focus:ring-1 focus:ring-[#1C1C1C]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-xs uppercase tracking-widest px-5 py-2.5 border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-[#FAF8F5] transition-all duration-300"
              data-cursor="LET'S TALK"
            >
              Start Conversation
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#1C1C1C] focus:outline-none"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col justify-between p-8 md:hidden"
          >
            {/* Header in Overlay */}
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl text-[#1C1C1C]">
                {siteConfig.siteName}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#1C1C1C] focus:outline-none"
                aria-label="Close Navigation Menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Navigation List */}
            <nav className="flex flex-col space-y-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                  className="font-serif text-4xl text-[#1C1C1C] hover:text-[#6B6862] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Footer in Overlay */}
            <div className="border-t border-[#EAE6E1] pt-6 flex flex-col space-y-2">
              <p className="text-xs uppercase tracking-widest text-[#6B6862]">
                {siteConfig.location}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm font-sans text-[#1C1C1C]"
              >
                {siteConfig.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
