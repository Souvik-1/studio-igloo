import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import animationConfig from '@/config/animations.json';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable if animations disabled or touch device or reduced motion
    if (
      !animationConfig.cursorEffects ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('[data-cursor]');
        if (interactive) {
          const text = interactive.getAttribute('data-cursor');
          setIsHovered(true);
          setHoverText(text || 'VIEW');
        } else if (target.closest('a, button, input, textarea, select')) {
          setIsHovered(true);
          setHoverText('');
        } else {
          setIsHovered(false);
          setHoverText('');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center rounded-full bg-[#1C1C1C] text-[#FAF8F5] mix-blend-difference"
      animate={{
        x: position.x - (isHovered ? (hoverText ? 36 : 20) : 8),
        y: position.y - (isHovered ? (hoverText ? 36 : 20) : 8),
        width: isHovered ? (hoverText ? 72 : 40) : 16,
        height: isHovered ? (hoverText ? 72 : 40) : 16,
        opacity: 0.9,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      {hoverText && (
        <span className="text-[10px] font-sans tracking-widest uppercase text-center select-none font-medium">
          {hoverText}
        </span>
      )}
    </motion.div>
  );
};
