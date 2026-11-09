import React, { useRef, ReactNode } from 'react';

export interface GlassShineCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'white' | 'navy';
  onClick?: () => void;
  'data-cursor'?: string;
}

/**
 * AARVYA REALTY - GLASSMORPHIC TILE SHINE CARD
 * 
 * Luxury translucent card with subtle background blur and a dynamic gold-tinted
 * specular reflection that tracks pointer position without causing React re-renders.
 */
export const GlassShineCard: React.FC<GlassShineCardProps> = ({
  children,
  className = '',
  variant = 'white',
  onClick,
  'data-cursor': dataCursor = 'card',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--shine-opacity', '1');
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--shine-opacity', '0');
  };

  const variantStyles = {
    white: 'bg-white/85 backdrop-blur-md border-[#E0E6ED] text-[#0B1F3B] hover:border-[#D4AF37]',
    navy: 'bg-[#0B1F3B]/90 backdrop-blur-md border-[#14315A] text-white hover:border-[#D4AF37]',
  }[variant];

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      className={`glass-shine-card relative rounded-2xl overflow-hidden border shadow-subtle transition-all duration-350 hover:-translate-y-1.5 hover:shadow-cardHover isolate ${variantStyles} ${className}`}
      style={{
        // Initial fallback coordinates
        ['--mouse-x' as any]: '50%',
        ['--mouse-y' as any]: '50%',
        ['--shine-opacity' as any]: '0',
      }}
    >
      {/* Dynamic Gold Specular Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 ease-out"
        style={{
          opacity: 'var(--shine-opacity, 0)',
          background: `radial-gradient(
            550px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(212, 175, 55, 0.16) 0%,
            rgba(212, 175, 55, 0.05) 35%,
            transparent 70%
          )`,
        }}
        aria-hidden="true"
      />

      {/* Subtle Ambient Edge Highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: 'var(--shine-opacity, 0)',
          border: '1px solid rgba(212, 175, 55, 0.45)',
        }}
        aria-hidden="true"
      />

      {/* Card Content */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};
