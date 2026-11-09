import React, { useEffect, useRef, useState } from 'react';

type CursorVariant = 'default' | 'button' | 'card' | 'link' | 'hidden';

/**
 * AARVYA REALTY - CUSTOM BLINKING CIRCULAR CURSOR
 * 
 * Luxury Gold (#D4AF37) two-layer circular cursor for desktop fine-pointer devices.
 * - Inner: 7px solid gold dot (immediate tracking).
 * - Outer: 32px gold ring with 1.6s subtle breathing animation (lerp tracking).
 * - Interactive expansions on buttons, property cards, links.
 * - Complete native text caret preservation for inputs.
 * - Zero React re-renders during mouse movement (direct DOM + RAF).
 */
export const CustomCursor: React.FC = () => {
  const innerDotRef = useRef<HTMLDivElement>(null);
  const outerRingWrapperRef = useRef<HTMLDivElement>(null);
  const outerRingCircleRef = useRef<HTMLDivElement>(null);

  const [isSupported, setIsSupported] = useState(false);

  // Mutable animation state
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef<CursorVariant>('default');
  const isMouseDown = useRef(false);
  const isVisible = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate for desktop devices with fine pointer (exclude touchscreens)
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchOnly = 'ontouchstart' in window && !window.matchMedia('(any-hover: hover)').matches;

    if (!isFinePointer || isTouchOnly) {
      return;
    }

    setIsSupported(true);
    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        isVisible.current = true;
        if (innerDotRef.current) innerDotRef.current.style.opacity = '1';
        if (outerRingWrapperRef.current) outerRingWrapperRef.current.style.opacity = '1';
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Input / text caret preservation
      if (
        target.closest('input:not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')
      ) {
        isHovering.current = 'hidden';
      } else if (target.closest('button, .btn-primary, .btn-gold, .btn-secondary, [role="button"], input[type="submit"]')) {
        isHovering.current = 'button';
      } else if (target.closest('.card-lift-hover, [data-cursor="card"], article')) {
        isHovering.current = 'card';
      } else if (target.closest('a, nav a')) {
        isHovering.current = 'link';
      } else {
        isHovering.current = 'default';
      }
    };

    const handleMouseDown = () => {
      isMouseDown.current = true;
    };

    const handleMouseUp = () => {
      isMouseDown.current = false;
    };

    const handleMouseLeave = () => {
      isVisible.current = false;
      if (innerDotRef.current) innerDotRef.current.style.opacity = '0';
      if (outerRingWrapperRef.current) outerRingWrapperRef.current.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisible.current = true;
      if (innerDotRef.current) innerDotRef.current.style.opacity = '1';
      if (outerRingWrapperRef.current) outerRingWrapperRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // High performance RAF loop
    const renderLoop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // Smooth outer ring interpolation (damping: 0.22)
      ringPos.current.x += (targetX - ringPos.current.x) * 0.22;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.22;

      const inner = innerDotRef.current;
      const wrapper = outerRingWrapperRef.current;
      const circle = outerRingCircleRef.current;

      if (inner && wrapper && circle) {
        if (!isVisible.current || isHovering.current === 'hidden') {
          inner.style.opacity = '0';
          wrapper.style.opacity = '0';
        } else {
          inner.style.opacity = '1';
          wrapper.style.opacity = '1';

          // Immediate inner dot position (7px center: offset by 3.5px)
          inner.style.transform = `translate3d(${targetX - 3.5}px, ${targetY - 3.5}px, 0)`;

          // Outer ring dimensions & scaling based on hover state
          let baseSize = 32;
          let scale = 1;
          let borderWidth = 1.5;

          if (isHovering.current === 'button') {
            baseSize = 48;
            borderWidth = 2;
          } else if (isHovering.current === 'card') {
            baseSize = 44;
            borderWidth = 1.5;
          } else if (isHovering.current === 'link') {
            baseSize = 40;
            borderWidth = 1.8;
          }

          if (isMouseDown.current) {
            scale = 0.82;
          }

          const halfSize = baseSize / 2;
          wrapper.style.width = `${baseSize}px`;
          wrapper.style.height = `${baseSize}px`;
          wrapper.style.transform = `translate3d(${ringPos.current.x - halfSize}px, ${ringPos.current.y - halfSize}px, 0) scale(${scale})`;

          circle.style.borderWidth = `${borderWidth}px`;
        }
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[999999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Outer Ring Wrapper (tracks pointer with RAF + scale) */}
      <div
        ref={outerRingWrapperRef}
        className="fixed top-0 left-0 pointer-events-none transition-[width,height] duration-200 ease-out flex items-center justify-center"
        style={{
          width: '32px',
          height: '32px',
          opacity: 0,
          willChange: 'transform, width, height',
        }}
      >
        {/* Nested Circular Breathing Outline (pure CSS pulsing without transform conflict) */}
        <div
          ref={outerRingCircleRef}
          className="w-full h-full rounded-full border border-[#D4AF37] cursor-outer-breathe pointer-events-none"
          style={{
            borderWidth: '1.5px',
            borderColor: '#D4AF37',
            backgroundColor: 'transparent',
            boxShadow: '0 0 1px 0.5px rgba(7, 22, 41, 0.65)',
          }}
        />
      </div>

      {/* Inner Center Dot: 7px Solid Luxury Gold */}
      <div
        ref={innerDotRef}
        className="fixed top-0 left-0 w-[7px] h-[7px] rounded-full bg-[#D4AF37] pointer-events-none"
        style={{
          boxShadow: '0 0 2px rgba(7, 22, 41, 0.75)',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </div>
  );
};
