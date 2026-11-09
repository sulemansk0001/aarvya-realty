import React from 'react';
import { SplitTextReveal } from './SplitTextReveal';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface AnimatedHeadingProps {
  eyebrow?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  titleClassName?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  eyebrow,
  badge,
  title,
  subtitle,
  align = 'center',
  titleClassName = '',
  className = '',
  as = 'h2',
}) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.15,
    freezeOnceVisible: true,
  });
  const reducedMotion = useReducedMotion();

  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center mx-auto',
    right: 'text-right items-end ml-auto',
  }[align];

  return (
    <div ref={ref} className={`flex flex-col max-w-3xl ${alignStyles} ${className}`}>
      {/* Eyebrow & Badge row */}
      {(eyebrow || badge) && (
        <div
          className={`flex items-center gap-2 mb-3 transition-all duration-700 ease-out ${
            reducedMotion || isIntersecting
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          {eyebrow && (
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.16em]">
              {eyebrow}
            </span>
          )}
          {badge && (
            <span className="text-[10px] bg-[#F5F7FA] text-[#0B1F3B] border border-[#D4AF37]/50 px-2 py-0.5 rounded-full font-medium">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Main Title */}
      <SplitTextReveal
        as={as}
        className={`font-poppins font-bold text-3xl sm:text-4xl text-[#0B1F3B] leading-tight tracking-tight ${titleClassName}`}
        staggerMs={40}
        initialDelayMs={120}
      >
        {title}
      </SplitTextReveal>

      {/* Supporting Subtitle */}
      {subtitle && (
        <p
          className={`mt-3.5 text-base text-[#667085] font-normal leading-relaxed max-w-2xl transition-all duration-700 ease-out ${
            reducedMotion || isIntersecting
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: reducedMotion ? '0ms' : '280ms' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
