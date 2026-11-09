import { useEffect, useState, useRef } from 'react';

export interface ScrollProgressState {
  progress: number; // 0 to 1
  scrollY: number;
  isScrollingDown: boolean;
}

/**
 * Hook to track scroll progress and direction with requestAnimationFrame throttling.
 */
export function useScrollProgress(): ScrollProgressState {
  const [scrollState, setScrollState] = useState<ScrollProgressState>({
    progress: 0,
    scrollY: 0,
    isScrollingDown: false,
  });

  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScrollProgress = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / docHeight)) : 0;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      lastScrollY.current = currentScrollY;

      setScrollState({
        progress: Math.round(progress * 1000) / 1000,
        scrollY: currentScrollY,
        isScrollingDown,
      });

      rafId.current = null;
    };

    const handleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateScrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollState;
}
