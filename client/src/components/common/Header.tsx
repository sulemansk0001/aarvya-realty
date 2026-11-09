import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  MapPin,
} from 'lucide-react';
import { Logo } from './Logo';
import { MagneticFieldButton } from '../buttons/MagneticFieldButton';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [mobilePropertiesAccordionOpen, setMobilePropertiesAccordionOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPropertiesDropdownOpen(false);
    setMobilePropertiesAccordionOpen(false);
  }, [location.pathname, location.search]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPropertiesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[15px] font-medium transition-all duration-200 py-2 px-1 relative group flex items-center ${
      isActive
        ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D4AF37]'
        : 'text-[#0B1F3B] hover:text-[#D4AF37]'
    }`;

  const isPropertiesActive =
    location.pathname.startsWith('/properties') ||
    location.pathname === '/residential' ||
    location.pathname === '/commercial' ||
    location.pathname === '/buy' ||
    location.pathname === '/rent' ||
    location.pathname === '/add-property';

  const propertyDropdownLinks = [
    { label: 'All Properties', href: '/properties', desc: 'Browse full Pune catalog' },
    { label: 'Buy Property', href: '/buy', desc: 'Verified homes for sale' },
    { label: 'Rent Property', href: '/rent', desc: 'Flats & houses for lease' },
    { label: 'Residential Properties', href: '/residential', desc: 'Flats, villas & penthouses' },
    { label: 'Commercial Properties', href: '/commercial', desc: 'Offices & retail premises' },
    { label: 'New Projects', href: '/properties?possession=Under+Construction', desc: 'Upcoming developments' },
    { label: 'Featured Properties', href: '/properties?featured=true', desc: 'Handpicked prime listings' },
    { label: 'Add / List Your Property', href: '/add-property', desc: 'Submit property for review' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-250 ${
        isScrolled ? 'shadow-subtle border-b border-[#E0E6ED]' : 'border-b border-[#E0E6ED]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Aarvya Realty Branding (Navy & Gold) */}
          <div className="flex-shrink-0">
            <Logo variant="horizontal" />
          </div>

          {/* Centre / Desktop: EXACTLY FIVE MAIN NAVIGATION ITEMS */}
          <nav className="hidden lg:flex items-center space-x-10">
            {/* 1. Home */}
            <NavLink to="/" className={navLinkClass}>
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
            </NavLink>

            {/* 2. About Us */}
            <NavLink to="/about" className={navLinkClass}>
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
            </NavLink>

            {/* 3. Services */}
            <NavLink to="/services" className={navLinkClass}>
              <span>Services</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
            </NavLink>

            {/* 4. Properties (Dropdown with All Property-Related Links) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setPropertiesDropdownOpen(true)}
              onMouseLeave={() => setPropertiesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setPropertiesDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 text-[15px] font-medium py-2 px-1 transition-all duration-200 relative group cursor-pointer ${
                  isPropertiesActive
                    ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#D4AF37]'
                    : 'text-[#0B1F3B] hover:text-[#D4AF37]'
                }`}
                aria-expanded={propertiesDropdownOpen}
              >
                <span>Properties</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    propertiesDropdownOpen ? 'rotate-180 text-[#D4AF37]' : 'text-[#667085]'
                  }`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
              </button>

              {/* Properties Dropdown Menu */}
              {propertiesDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 pt-2.5 z-50">
                  <div className="bg-white rounded-xl shadow-card border border-[#E0E6ED] py-3 px-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="px-3 pb-2 mb-1 border-b border-[#E0E6ED]/70 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                        Pune & Maharashtra
                      </span>
                      <span className="text-[10px] text-[#0B1F3B] font-semibold bg-[#F5F7FA] px-2 py-0.5 rounded border border-[#E0E6ED]">
                        Verified Inventory
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      {propertyDropdownLinks.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setPropertiesDropdownOpen(false)}
                          className="group flex flex-col px-3 py-2 rounded-lg text-sm transition-all duration-150 hover:bg-[#F5F7FA]"
                        >
                          <span className="font-medium text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
                            <span>{item.label}</span>
                            <span className="text-xs text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity">
                              &rarr;
                            </span>
                          </span>
                          <span className="text-[11px] text-[#667085]">
                            {item.desc}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Locality Quick Filter Bar */}
                    <div className="mt-2 pt-2 border-t border-[#E0E6ED]/70 px-3">
                      <span className="text-[10px] uppercase font-semibold text-[#667085] block mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#D4AF37]" />
                        <span>Quick Localities</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {['Baner', 'Wakad', 'Kharadi', 'Hinjawadi'].map((loc) => (
                          <Link
                            key={loc}
                            to={`/properties?locality=${encodeURIComponent(loc)}`}
                            onClick={() => setPropertiesDropdownOpen(false)}
                            className="text-[11px] px-2 py-0.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#D4AF37] hover:border-[#0B1F3B] transition-colors font-medium"
                          >
                            {loc}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Contact */}
            <NavLink to="/contact" className={navLinkClass}>
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
            </NavLink>
          </nav>

          {/* Desktop Right CTA: Magnetic Field Consultation */}
          <div className="hidden lg:flex items-center">
            <MagneticFieldButton
              to="/contact"
              variant="gold"
              size="sm"
              particleCount={8}
              aria-label="Enquire with Aarvya Realty"
            >
              Enquire Now
            </MagneticFieldButton>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B1F3B] hover:text-[#D4AF37] focus:outline-none rounded-lg hover:bg-[#F5F7FA] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Accordion Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E0E6ED] px-5 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-1">
            {/* 1. Home */}
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            {/* 2. About Us */}
            <NavLink to="/about" className={navLinkClass}>
              About Us
            </NavLink>

            {/* 3. Services */}
            <NavLink to="/services" className={navLinkClass}>
              Services
            </NavLink>

            {/* 4. Properties (Accordion on mobile) */}
            <div className="border-y border-[#E0E6ED]/60 py-1 my-1">
              <button
                type="button"
                onClick={() => setMobilePropertiesAccordionOpen(!mobilePropertiesAccordionOpen)}
                className="w-full flex items-center justify-between py-2 px-1 text-[15px] font-medium text-[#0B1F3B] hover:text-[#D4AF37] transition-colors"
              >
                <span className={isPropertiesActive ? 'text-[#D4AF37] font-semibold' : ''}>Properties</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobilePropertiesAccordionOpen ? 'rotate-180 text-[#D4AF37]' : 'text-[#667085]'
                  }`}
                />
              </button>

              {mobilePropertiesAccordionOpen && (
                <div className="pl-3 pr-1 py-2 space-y-1 bg-[#F5F7FA] rounded-lg border border-[#E0E6ED]/70 my-1 animate-in fade-in duration-150">
                  {propertyDropdownLinks.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="block text-xs font-medium text-[#0B1F3B] hover:text-[#D4AF37] py-1.5 px-2 rounded hover:bg-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* 5. Contact */}
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
