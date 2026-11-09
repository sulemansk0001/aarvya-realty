import React, { ElementType } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface SplitTextRevealProps {
  children: string;
  as?: ElementType;
  staggerMs?: number;
  initialDelayMs?: number;
  className?: string;
  wordClassName?: string;
}

/**
 * SplitTextReveal: Word-based masked reveal component.
 * Slips words upward from an overflow-hidden wrapper with staggered delay.
 * Includes full screen-reader accessibility (aria-label on outer element, aria-hidden on split words).
 */
export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  children,
  as: Component = 'h2',
  staggerMs = 45,
  initialDelayMs = 0,
  className = '',
  wordClassName = '',
}) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLHeadingElement>({
    threshold: 0.15,
    freezeOnceVisible: true,
  });

  const reducedMotion = useReducedMotion();
  const text = typeof children === 'string' ? children : '';
  const words = text.split(/\s+/).filter(Boolean);

  // If user prefers reduced motion, render clean static markup immediately
  if (reducedMotion) {
    return (
      <Component ref={ref} className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      aria-label={text}
      className={`inline-block ${className}`}
    >
      <span aria-hidden="true" className="inline flex-wrap">
        {words.map((word, index) => {
          const delay = initialDelayMs + index * staggerMs;
          return (
            <span
              key={`${word}-${index}`}
              className="inline-block overflow-hidden align-top mr-[0.28em] last:mr-0"
            >
              <span
                className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isIntersecting
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[115%]'
                } ${wordClassName}`}
                style={{
                  transitionDelay: `${delay}ms`,
                  willChange: isIntersecting ? 'auto' : 'transform, opacity',
                }}
              >
                {word}
              </span>
            </span>
          );
        })}
      </span>
    </Component>
  );
};
