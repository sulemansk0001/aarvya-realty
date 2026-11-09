import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
}

/**
 * Reusable IntersectionObserver hook.
 * Returns [ref, isIntersecting, entry] for scroll-triggered interactions and reveals.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  root = null,
  rootMargin = '0px 0px -40px 0px',
  freezeOnceVisible = true,
  onChange,
}: UseIntersectionObserverOptions = {}): [RefObject<T>, boolean, IntersectionObserverEntry | undefined] {
  const ref = useRef<T>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>(undefined);
  const isIntersecting = !!entry?.isIntersecting;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Check SSR or absence of IntersectionObserver
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    // If frozen and already visible, do not re-observe
    if (freezeOnceVisible && isIntersecting) {
      return;
    }

    const observer = new IntersectionObserver(
      ([newEntry]) => {
        setEntry(newEntry);
        if (onChange) {
          onChange(newEntry.isIntersecting, newEntry);
        }

        if (newEntry.isIntersecting && freezeOnceVisible) {
          observer.unobserve(node);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, freezeOnceVisible, isIntersecting, onChange]);

  return [ref, isIntersecting, entry];
}
