import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type MagneticButtonVariant = 'primary' | 'gold' | 'dark' | 'outline' | 'ghost' | 'nav';
export type MagneticButtonSize = 'sm' | 'md' | 'lg' | 'nav';

export interface MagneticFieldButtonProps {
  children: ReactNode;
  variant?: MagneticButtonVariant;
  size?: MagneticButtonSize;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  buttonClassName?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  particleCount?: number;
  'aria-label'?: string;
  title?: string;
}

interface ParticleConfig {
  id: number;
  // Polar resting angle and radius around the button perimeter
  angle: number;
  radiusFactor: number;
  size: number;
  color: string;
  opacity: number;
  // Behavior: 1 = attracted toward pointer, -1 = repelled away (magnetic dipole)
  polarity: number;
  // Current dynamic state
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  scale: number;
}

export const MagneticFieldButton: React.FC<MagneticFieldButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  buttonClassName = '',
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'right',
  particleCount,
  'aria-label': ariaLabel,
  title,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Determine active count based on variant
  const isNav = variant === 'nav';
  const defaultCount = isNav ? 5 : 12;
  const count = particleCount !== undefined ? particleCount : defaultCount;

  // Particle list stored in ref to avoid rerendering on every frame
  const particlesState = useRef<ParticleConfig[]>([]);
  const isInteracting = useRef<boolean>(false);
  const isPointerInside = useRef<boolean>(false);
  const animFrameId = useRef<number | null>(null);
  const buttonOffset = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    // Detect touch-only devices or reduced motion
    const touchCheck =
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) || navigator.maxTouchPoints > 0) &&
      window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setIsTouchDevice(touchCheck || reducedMotion);

    // Initialize particle configs with Gold and Silver luxury palette
    const goldColors = ['#D4AF37', '#E5C158', '#B9952D', '#E0E6ED', '#FFFFFF'];
    const newParticles: ParticleConfig[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.4 - 0.2);
      // Distance multiplier from button perimeter
      const radiusFactor = isNav ? 1.05 + Math.random() * 0.2 : 1.15 + Math.random() * 0.4;
      const sizeVal = isNav ? 2 + Math.random() * 1.5 : 2.5 + Math.random() * 2;
      const color = goldColors[i % goldColors.length];
      const opacity = isNav ? 0.4 + Math.random() * 0.35 : 0.55 + Math.random() * 0.4;
      const polarity = i % 2 === 0 ? 1 : -0.8;

      newParticles.push({
        id: i,
        angle,
        radiusFactor,
        size: sizeVal,
        color,
        opacity,
        polarity,
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        scale: 1,
      });
    }

    particlesState.current = newParticles;

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [count, isNav]);

  // Spring physics loop running ONLY while actively interacting or settling
  const runPhysicsLoop = () => {
    if (!particlesRef.current || !buttonRef.current) return;

    let hasActiveMotion = false;
    const spring = 0.16;
    const friction = 0.78;

    // 1. Update button magnetic translation
    const b = buttonOffset.current;
    const bDx = b.targetX - b.x;
    const bDy = b.targetY - b.y;
    b.x += bDx * spring;
    b.y += bDy * spring;

    if (Math.abs(bDx) > 0.05 || Math.abs(bDy) > 0.05) {
      hasActiveMotion = true;
    }
    buttonRef.current.style.transform = `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0)`;

    // 2. Update individual particle positions via direct DOM transform (zero React rerenders)
    const particleNodes = particlesRef.current.children;
    const particles = particlesState.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const pNode = particleNodes[i] as HTMLElement | undefined;
      if (!pNode) continue;

      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      p.x += dx * spring;
      p.y += dy * spring;

      if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
        hasActiveMotion = true;
      }

      pNode.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0) scale(${p.scale.toFixed(2)})`;
    }

    // Continue loop if pointer is still inside or particles are still returning to resting spot
    if (isPointerInside.current || hasActiveMotion) {
      animFrameId.current = requestAnimationFrame(runPhysicsLoop);
    } else {
      isInteracting.current = false;
      animFrameId.current = null;
    }
  };

  const startLoopIfNeeded = () => {
    if (!isInteracting.current && !isTouchDevice) {
      isInteracting.current = true;
      animFrameId.current = requestAnimationFrame(runPhysicsLoop);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouchDevice || disabled || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    isPointerInside.current = true;

    // Subtle magnetic attraction for central button
    const maxButtonPull = isNav ? 4 : 8;
    const pullX = ((mouseX - centerX) / centerX) * maxButtonPull;
    const pullY = ((mouseY - centerY) / centerY) * maxButtonPull;
    buttonOffset.current.targetX = Math.max(-maxButtonPull, Math.min(maxButtonPull, pullX));
    buttonOffset.current.targetY = Math.max(-maxButtonPull, Math.min(maxButtonPull, pullY));

    // Magnetic field deflection on surrounding particles
    const particles = particlesState.current;
    const buttonHalfW = (rect.width * 0.42);
    const buttonHalfH = (rect.height * 0.38);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // Resting position on elliptical orbit around the button
      const baseRestX = Math.cos(p.angle) * buttonHalfW * p.radiusFactor;
      const baseRestY = Math.sin(p.angle) * buttonHalfH * p.radiusFactor;

      // Pointer distance from particle rest point
      const relPointerX = mouseX - (centerX + baseRestX);
      const relPointerY = mouseY - (centerY + baseRestY);
      const dist = Math.sqrt(relPointerX * relPointerX + relPointerY * relPointerY);

      const maxDist = 90;
      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 22 * p.polarity;
        p.targetX = (relPointerX / (dist || 1)) * force;
        p.targetY = (relPointerY / (dist || 1)) * force;
        p.scale = 1 + (1 - dist / maxDist) * 0.45;
      } else {
        p.targetX = 0;
        p.targetY = 0;
        p.scale = 1;
      }
    }

    startLoopIfNeeded();
  };

  const handlePointerLeave = () => {
    isPointerInside.current = false;
    buttonOffset.current.targetX = 0;
    buttonOffset.current.targetY = 0;

    const particles = particlesState.current;
    for (let i = 0; i < particles.length; i++) {
      particles[i].targetX = 0;
      particles[i].targetY = 0;
      particles[i].scale = 1;
    }

    startLoopIfNeeded();
  };

  const handlePointerDown = () => {
    if (isTouchDevice || disabled) return;

    // Brief inward contraction impulse on click
    const particles = particlesState.current;
    for (let i = 0; i < particles.length; i++) {
      particles[i].targetX *= 0.3;
      particles[i].targetY *= 0.3;
      particles[i].scale = 0.7;
    }
    startLoopIfNeeded();
  };

  const handlePointerUp = () => {
    if (isTouchDevice || disabled) return;

    const particles = particlesState.current;
    for (let i = 0; i < particles.length; i++) {
      particles[i].scale = 1.15;
    }
    startLoopIfNeeded();
  };

  // Visual styling variants
  const variantStyles = {
    primary:
      'bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] border border-[#D4AF37]/40 hover:border-[#D4AF37] shadow-md hover:shadow-goldGlow font-medium',
    gold:
      'bg-[#D4AF37] hover:bg-[#B9952D] text-[#0B1F3B] font-bold border border-transparent shadow-md hover:shadow-goldGlow',
    dark:
      'bg-[#071629] hover:bg-[#0B1F3B] text-white border border-[#14315A] hover:border-[#D4AF37] shadow-sm',
    outline:
      'bg-transparent hover:bg-[#0B1F3B] text-[#D4AF37] hover:text-white border border-[#D4AF37] shadow-sm',
    ghost:
      'bg-transparent hover:bg-[#D4AF37]/15 text-[#0B1F3B] hover:text-[#D4AF37] border border-transparent',
    nav:
      'bg-transparent text-[#0B1F3B] hover:text-[#D4AF37] px-2.5 py-1 text-sm font-medium transition-colors',
  }[variant];

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-md gap-1.5',
    md: 'px-6 py-3 text-xs sm:text-sm rounded-lg gap-2',
    lg: 'px-8 py-3.5 text-sm sm:text-base rounded-lg gap-2.5',
    nav: 'px-2 py-1 text-sm rounded',
  }[size];

  // Button interior element
  const buttonContent = (
    <div
      ref={buttonRef}
      className={`relative z-10 inline-flex items-center justify-center select-none transition-[background-color,border-color,color,box-shadow] duration-250 ${variantStyles} ${sizeStyles} ${buttonClassName} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer active:scale-[0.98]'
      }`}
    >
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </div>
  );

  // Outer interactive wrapper with surrounding particle canvas/field
  const wrapper = (
    <div
      ref={containerRef}
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className={`relative inline-flex items-center justify-center p-3 -m-3 overflow-visible ${className}`}
    >
      {/* Particle field DOM nodes (only visible on fine pointer devices) */}
      {!isTouchDevice && (
        <div
          ref={particlesRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center z-0"
        >
          {particlesState.current.map((p) => {
            const buttonHalfW = isNav ? 45 : 70;
            const buttonHalfH = isNav ? 16 : 24;
            const initialX = Math.cos(p.angle) * buttonHalfW * p.radiusFactor;
            const initialY = Math.sin(p.angle) * buttonHalfH * p.radiusFactor;

            return (
              <span
                key={p.id}
                className="absolute rounded-full transition-opacity duration-300 pointer-events-none"
                style={{
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: p.opacity,
                  left: `calc(50% + ${initialX.toFixed(1)}px)`,
                  top: `calc(50% + ${initialY.toFixed(1)}px)`,
                  boxShadow: p.color === '#D4AF37' ? '0 0 5px rgba(212, 175, 55, 0.65)' : 'none',
                  willChange: 'transform',
                }}
              />
            );
          })}
        </div>
      )}

      {buttonContent}
    </div>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className="inline-block" aria-label={ariaLabel} title={title}>
        {wrapper}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        aria-label={ariaLabel}
        title={title}
      >
        {wrapper}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-block bg-transparent border-0 p-0"
      aria-label={ariaLabel}
      title={title}
    >
      {wrapper}
    </button>
  );
};
