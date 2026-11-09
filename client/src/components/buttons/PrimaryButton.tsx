import React, { ReactNode } from 'react';
import { ShimmerButton, ShimmerSize, ShimmerVariant } from './ShimmerButton';

export interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  size?: ShimmerSize;
  variant?: ShimmerVariant;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  magnetic?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  magnetic = true,
  ...props
}) => {
  return (
    <ShimmerButton
      variant={variant}
      size={size}
      magnetic={magnetic}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  magnetic = false,
  className = '',
  ...props
}) => {
  return (
    <ShimmerButton
      variant="outline"
      size={size}
      magnetic={magnetic}
      className={`border-[#D4AF37] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white ${className}`}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
};
