import { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

export interface UseMagneticPointerOptions {
  maxDisplacement?: number; // Maximum offset in pixels (default: 12)
  damping?: number; // Damping easing factor (0 to 1, default: 0.25)
  disabled?: boolean;
}

export interface MagneticState {
  x: number;
  y: number;
}

/**
 * Hook providing smooth magnetic pointer attraction for interactive UI elements.
 * Restricts interaction strictly to pointer: fine devices and honors reduced motion preferences.
 */
export function useMagneticPointer<T extends HTMLElement = HTMLButtonElement>({
  maxDisplacement = 12,
  damping = 0.28,
  disabled = false,
}: UseMagneticPointerOptions = {}) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState<MagneticState>({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const targetOffset = useRef<MagneticState>({ x: 0, y: 0 });
  const currentOffset = useRef<MagneticState>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    // Interpolate towards targetOffset
    const dx = targetOffset.current.x - currentOffset.current.x;
    const dy = targetOffset.current.y - currentOffset.current.y;

    currentOffset.current.x += dx * damping;
    currentOffset.current.y += dy * damping;

    setOffset({
      x: Math.round(currentOffset.current.x * 100) / 100,
      y: Math.round(currentOffset.current.y * 100) / 100,
    });

    // Continue loop if displacement is significant
    if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
      rafId.current = requestAnimationFrame(animate);
    } else {
      rafId.current = null;
    }
  }, [damping]);

  useEffect(() => {
    const element = ref.current;
    if (!element || disabled || reducedMotion) return;

    // Verify pointer precision (skip touch devices)
    const isFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Calculate distance and clamp to maxDisplacement
      const clampedX = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaX * 0.35));
      const clampedY = Math.max(-maxDisplacement, Math.min(maxDisplacement, deltaY * 0.35));

      targetOffset.current = { x: clampedX, y: clampedY };

      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseLeave = () => {
      targetOffset.current = { x: 0, y: 0 };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    element.addEventListener('mousemove', handleMouseMove, { passive: true });
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [maxDisplacement, damping, disabled, reducedMotion, animate]);

  return { ref, offset };
}
