import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DETAILS } from '../../utils/formatters';
import { EnquiryService } from '../../services/api';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subStatus, setSubStatus] = useState<{ loading: boolean; message: string; success: boolean } | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;

    setSubStatus({ loading: true, message: '', success: false });
    const res = await EnquiryService.subscribeNewsletter(newsletterEmail);
    setSubStatus({ loading: false, message: res.message, success: res.success });
    if (res.success) {
      setNewsletterEmail('');
    }
  };

  const footerLinkClass = "editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors";

  const socialChannels = [
    {
      name: 'Instagram',
      href: COMPANY_DETAILS.socialLinks.instagram,
      icon: Instagram,
      label: 'Follow Aarvya Realty on Instagram',
    },
    {
      name: 'Facebook',
      href: COMPANY_DETAILS.socialLinks.facebook,
      icon: Facebook,
      label: 'Connect with Aarvya Realty on Facebook',
    },
    {
      name: 'LinkedIn',
      href: COMPANY_DETAILS.socialLinks.linkedin,
      icon: Linkedin,
      label: 'Connect with Aarvya Realty on LinkedIn',
    },
    {
      name: 'YouTube',
      href: COMPANY_DETAILS.socialLinks.youtube,
      icon: Youtube,
      label: 'Watch Aarvya Realty property walkthroughs on YouTube',
    },
    {
      name: 'WhatsApp',
      href: COMPANY_DETAILS.socialLinks.whatsapp,
      icon: WhatsAppIcon,
      label: 'Chat with Aarvya Realty property advisors on WhatsApp',
    },
  ];

  return (
    <footer className="relative bg-[#0B1F3B] text-white pt-12 pb-8 border-t border-[#14315A] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#14315A]">
          {/* Column 1: Brand & About (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="horizontal" theme="dark" />
            <p className="text-[#E0E6ED] text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
              Aarvya Realty is a luxury property consultancy and real estate advisory firm rooted in Pune, Maharashtra. We assist homebuyers, investors, and businesses in discovering verified residential and commercial opportunities across Western India.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#E0E6ED]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <span>Transparent Advisory &bull; MahaRERA Compliant</span>
            </div>

            {/* Social Media Channels with Gold Hover & Upward Lift */}
            <div className="pt-2">
              <span className="block text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider mb-2.5">
                Official Channels
              </span>
              <div className="flex items-center gap-2.5">
                {socialChannels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="group relative flex items-center justify-center w-9 h-9 rounded-full bg-[#071629] border border-[#14315A] text-[#E0E6ED] transition-all duration-300 ease-out hover:-translate-y-1 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:bg-[#D4AF37]/15 hover:shadow-goldGlow"
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-poppins font-semibold text-white tracking-wide uppercase text-xs border-l-2 border-[#D4AF37] pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className={footerLinkClass}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={footerLinkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className={footerLinkClass}>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/properties" className={footerLinkClass}>
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className={footerLinkClass}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className={footerLinkClass}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Categories (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-poppins font-semibold text-white tracking-wide uppercase text-xs border-l-2 border-[#D4AF37] pl-2.5">
              Categories
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/residential" className={footerLinkClass}>
                  Residential Flats
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className={footerLinkClass}>
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/commercial" className={footerLinkClass}>
                  Commercial Spaces
                </Link>
              </li>
              <li>
                <Link to="/properties?possession=Under+Construction" className={footerLinkClass}>
                  New Projects
                </Link>
              </li>
              <li>
                <Link to="/buy" className={footerLinkClass}>
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/rent" className={footerLinkClass}>
                  Rent Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-poppins font-semibold text-white tracking-wide uppercase text-xs border-l-2 border-[#D4AF37] pl-2.5">
              Contact & Updates
            </h4>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#E0E6ED]">
              <div className="flex items-start gap-2.5 group">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span className="group-hover:text-white transition-colors">{COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="hover:text-white transition-colors font-medium">
                  {COMPANY_DETAILS.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5 group">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>
            </div>

            {/* Compact Newsletter Subscription */}
            <div className="pt-1">
              <p className="text-[11px] text-[#E0E6ED] font-medium mb-1.5">
                Subscribe to Pune Real Estate Market Reports
              </p>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-3 py-1.5 bg-[#071629] border border-[#14315A] rounded text-xs text-white placeholder-[#667085] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                />
                <button
                  type="submit"
                  disabled={subStatus?.loading}
                  aria-label="Subscribe to newsletter"
                  className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#B9952D] text-[#0B1F3B] font-bold text-xs rounded transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {subStatus && (
                <div
                  className={`mt-2 text-xs flex items-center gap-1.5 ${
                    subStatus.success ? 'text-[#D4AF37]' : 'text-red-400'
                  }`}
                >
                  {subStatus.success && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{subStatus.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demonstration Note */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E0E6ED] gap-3">
          <p>
            &copy; {new Date().getFullYear()} Aarvya Realty. All rights reserved. &bull; Pune, Maharashtra, India.
          </p>
          <div className="flex items-center gap-4 text-[#E0E6ED]">
            <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link to="/terms" className="hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
