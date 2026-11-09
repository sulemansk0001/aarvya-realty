import React, { ElementType, ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type ScrollRevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'fade';

export interface ScrollRevealProps {
  children: ReactNode;
  variant?: ScrollRevealVariant;
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number;
  rootMargin?: string;
  className?: string;
  as?: ElementType;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 800,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  className = '',
  as: Component = 'div',
}) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    freezeOnceVisible: true,
  });

  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  const getInitialTransform = () => {
    switch (variant) {
      case 'fade-up':
        return 'translate3d(0, 32px, 0)';
      case 'fade-down':
        return 'translate3d(0, -32px, 0)';
      case 'fade-left':
        return 'translate3d(-36px, 0, 0)';
      case 'fade-right':
        return 'translate3d(36px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.95) translate3d(0, 16px, 0)';
      case 'zoom-out':
        return 'scale(1.05)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  const style: React.CSSProperties = {
    opacity: isIntersecting ? 1 : 0,
    transform: isIntersecting ? 'translate3d(0, 0, 0) scale(1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: isIntersecting ? 'auto' : 'opacity, transform',
  };

  return (
    <Component ref={ref} style={style} className={className}>
      {children}
    </Component>
  );
};
