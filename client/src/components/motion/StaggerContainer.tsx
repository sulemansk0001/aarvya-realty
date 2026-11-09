import React, { Children, isValidElement, cloneElement, ReactNode, ElementType } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface StaggerContainerProps {
  children: ReactNode;
  staggerMs?: number;
  initialDelayMs?: number;
  variant?: 'fade-up' | 'zoom-in' | 'fade-left' | 'fade';
  className?: string;
  as?: ElementType;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerMs = 80,
  initialDelayMs = 0,
  variant = 'fade-up',
  className = '',
  as: Component = 'div',
}) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const reducedMotion = useReducedMotion();

  const getTransform = () => {
    switch (variant) {
      case 'fade-up':
        return 'translate3d(0, 28px, 0)';
      case 'zoom-in':
        return 'scale(0.96) translate3d(0, 16px, 0)';
      case 'fade-left':
        return 'translate3d(-28px, 0, 0)';
      case 'fade':
      default:
        return 'translate3d(0, 0, 0)';
    }
  };

  return (
    <Component ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        if (reducedMotion) {
          return child;
        }

        const delay = initialDelayMs + index * staggerMs;
        const initialTransform = getTransform();

        const itemStyle: React.CSSProperties = {
          opacity: isIntersecting ? 1 : 0,
          transform: isIntersecting ? 'translate3d(0, 0, 0) scale(1)' : initialTransform,
          transitionProperty: 'opacity, transform',
          transitionDuration: '750ms',
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: isIntersecting ? 'auto' : 'opacity, transform',
        };

        return (
          <div style={itemStyle} className="h-full">
            {child}
          </div>
        );
      })}
    </Component>
  );
};
