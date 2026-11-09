import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'horizontal' | 'icon' | 'stacked';
  theme?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  showTagline = true,
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-[#0B1F3B]';
  const subTextColor = isDark ? 'text-[#E0E6ED]' : 'text-[#667085]';
  const luxuryGold = '#D4AF37';
  const roofAccent = '#B9952D';
  const structureFill = isDark ? '#FFFFFF' : '#0B1F3B';
  const cutoutFill = isDark ? '#071629' : '#FFFFFF';

  // Architectural Roofline + 'A' Apex + Integrated Doorway SVG Symbol
  const SymbolSVG = (
    <svg
      viewBox="0 0 52 52"
      className="w-10 h-10 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Aarvya Realty Monogram"
    >
      {/* Outer Gable / Modern Architectural Roofline forming letter 'A' */}
      <path
        d="M26 3L4 21H12V46H21V31H31V46H40V21H48L26 3Z"
        fill={luxuryGold}
      />
      {/* Upper Triangular Skylight / Roof Ridge Accent */}
      <path
        d="M26 3L36 12H32L26 6.8L20 12H16L26 3Z"
        fill={roofAccent}
      />
      {/* Central Keystone / Crossbeam of 'A' */}
      <rect x="20" y="21" width="12" height="5" rx="1" fill={structureFill} />
      {/* Arched Modern Doorway at base */}
      <path
        d="M23 46V35C23 33.3431 24.3431 32 26 32C27.6569 32 29 33.3431 29 35V46H23Z"
        fill={cutoutFill}
      />
    </svg>
  );

  if (variant === 'icon') {
    return (
      <Link to="/" className={`inline-flex items-center group ${className}`} aria-label="Aarvya Realty Home">
        {SymbolSVG}
      </Link>
    );
  }

  if (variant === 'stacked') {
    return (
      <Link to="/" className={`inline-flex flex-col items-center group text-center ${className}`}>
        {SymbolSVG}
        <div className="mt-2">
          <span className={`block font-poppins font-bold tracking-wider text-xl uppercase ${textColor}`}>
            AARVYA
            <span className="text-[#D4AF37] ml-1.5 font-semibold">REALTY</span>
          </span>
          {showTagline && (
            <span className={`block text-[10px] tracking-widest uppercase font-medium mt-0.5 ${subTextColor}`}>
              Find Your Place. Build Your Future.
            </span>
          )}
        </div>
      </Link>
    );
  }

  // Horizontal variant (Standard Header & Footer)
  return (
    <Link to="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {SymbolSVG}
      <div className="flex flex-col leading-none">
        <span className={`font-poppins font-bold tracking-[0.06em] text-xl lg:text-[22px] uppercase ${textColor}`}>
          AARVYA <span className="text-[#D4AF37] font-semibold">REALTY</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] sm:text-[11px] tracking-[0.14em] uppercase font-medium mt-1 ${subTextColor}`}>
            Find Your Place. Build Your Future.
          </span>
        )}
      </div>
    </Link>
  );
};
