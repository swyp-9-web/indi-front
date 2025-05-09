'use client';

import { useEffect, useState } from 'react';

import { ArrowUpwardIcon } from '@/lib/icons';

const SCROLL_TRIGGER_HEIGHT = 600;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_TRIGGER_HEIGHT) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="border-custom-gray-100 bg-custom-ivory-100 fixed right-12.5 bottom-12.5 z-50 flex h-15 w-15 cursor-pointer items-center justify-center rounded-full border"
    >
      <ArrowUpwardIcon />
    </button>
  );
}
