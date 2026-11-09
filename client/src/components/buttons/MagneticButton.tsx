import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useMagneticPointer } from '../../hooks/useMagneticPointer';

export interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  maxDisplacement?: number;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  to,
  href,
  onClick,
  className = '',
  maxDisplacement = 10,
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const { ref, offset } = useMagneticPointer<HTMLDivElement>({
    maxDisplacement,
    disabled,
  });

  const transformStyle: React.CSSProperties = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)',
  };

  const content = (
    <div
      ref={ref}
      style={transformStyle}
      className={`inline-block ${disabled ? 'pointer-events-none opacity-60' : ''}`}
    >
      {children}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className={`inline-block ${className}`} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-block ${className}`}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-block ${className}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};
