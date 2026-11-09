import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useMagneticPointer } from '../../hooks/useMagneticPointer';

export type ShimmerVariant = 'primary' | 'gold' | 'dark' | 'outline' | 'ghost';
export type ShimmerSize = 'sm' | 'md' | 'lg';

export interface ShimmerButtonProps {
  children: ReactNode;
  variant?: ShimmerVariant;
  size?: ShimmerSize;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  magnetic?: boolean;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  'aria-label'?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  magnetic = false,
  loading = false,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'right',
  'aria-label': ariaLabel,
}) => {
  const { ref, offset } = useMagneticPointer<HTMLDivElement>({
    maxDisplacement: 8,
    disabled: !magnetic || disabled || loading,
  });

  const variantStyles = {
    primary:
      'bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] shadow-md hover:shadow-goldGlow border border-transparent',
    gold:
      'bg-[#D4AF37] hover:bg-[#B9952D] text-[#0B1F3B] font-semibold shadow-md hover:shadow-goldGlow border border-transparent',
    dark:
      'bg-[#071629] hover:bg-[#0B1F3B] text-white shadow-md hover:shadow-float border border-[#0B1F3B]',
    outline:
      'bg-transparent hover:bg-[#0B1F3B] text-[#0B1F3B] hover:text-white border border-[#D4AF37] shadow-sm',
    ghost:
      'bg-transparent hover:bg-[#E0E6ED]/50 text-[#0B1F3B] hover:text-[#D4AF37] border border-transparent',
  }[variant];

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs font-semibold rounded-md gap-1.5',
    md: 'px-6 py-3 text-xs sm:text-sm font-semibold rounded-lg gap-2',
    lg: 'px-8 py-3.5 text-sm sm:text-base font-semibold rounded-lg gap-2.5',
  }[size];

  const buttonInner = (
    <div
      ref={magnetic ? ref : undefined}
      style={
        magnetic
          ? {
              transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
              transition: 'transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)',
            }
          : undefined
      }
      className={`btn-shimmer-wrapper inline-flex items-center justify-center select-none transition-all duration-300 cursor-pointer ${variantStyles} ${sizeStyles} ${
        disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'hover:-translate-y-0.5 active:translate-y-0'
      } ${className}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </div>
  );

  if (to && !disabled && !loading) {
    return (
      <Link to={to} className="inline-block" aria-label={ariaLabel}>
        {buttonInner}
      </Link>
    );
  }

  if (href && !disabled && !loading) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        aria-label={ariaLabel}
      >
        {buttonInner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="inline-block"
      aria-label={ariaLabel}
    >
      {buttonInner}
    </button>
  );
};
