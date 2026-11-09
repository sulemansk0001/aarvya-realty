import React, { useEffect, useRef, useState } from 'react';

export type AnimationType = 'fade-in' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom-in';

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; // milliseconds
  duration?: number; // milliseconds
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'slide-up',
  delay = 0,
  duration = 600,
  threshold = 0.12,
  className = '',
  as: Component = 'div',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for user's prefers-reduced-motion setting
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setIsVisible(true);
        return;
      }
    }

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold]);

  // Initial and active transition styles based on animation type
  const getInitialTransform = () => {
    switch (animation) {
      case 'slide-up':
        return 'translateY(28px)';
      case 'slide-left':
        return 'translateX(-32px)';
      case 'slide-right':
        return 'translateX(32px)';
      case 'zoom-in':
        return 'scale(0.96)';
      case 'fade-in':
      default:
        return 'none';
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0) scale(1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    willChange: isVisible ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      ref={domRef as any}
      style={style}
      className={`scroll-anim-item ${className}`}
    >
      {children}
    </Component>
  );
};

export default ScrollAnimation;
