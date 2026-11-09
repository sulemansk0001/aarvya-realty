import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { Logo } from '../common/Logo';
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

export const FooterReveal: React.FC = () => {
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
    <footer className="relative bg-[#0B1F3B] text-white pt-14 pb-8 border-t border-[#14315A] z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#14315A]">
          {/* Column 1: Brand & Fiduciary Advisory (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="horizontal" theme="dark" />
            <p className="text-[#E0E6ED] text-xs sm:text-sm leading-relaxed max-w-sm pt-1">
              Aarvya Realty is a premier luxury property consultancy and real estate advisory firm rooted in Pune, Maharashtra. We assist homebuyers, NRI investors, and corporate businesses in discovering verified residential and commercial opportunities across Western India.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#E0E6ED]">
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
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/properties" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Property Categories (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-poppins font-semibold text-white tracking-wide uppercase text-xs border-l-2 border-[#D4AF37] pl-2.5">
              Key Sectors
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/residential" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Residential Flats
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Luxury Villas
                </Link>
              </li>
              <li>
                <Link to="/commercial" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Commercial Offices
                </Link>
              </li>
              <li>
                <Link to="/buy" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/rent" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link to="/add-property" className="editorial-link-underline text-[#E0E6ED] hover:text-[#D4AF37] transition-colors">
                  List Your Property
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-poppins font-semibold text-white tracking-wide uppercase text-xs border-l-2 border-[#D4AF37] pl-2.5">
              Pune Office & Newsletter
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E0E6ED]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{COMPANY_DETAILS.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="hover:text-white transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </li>
            </ul>

            <form onSubmit={handleNewsletter} className="pt-2">
              <div className="flex rounded-md overflow-hidden border border-[#14315A] focus-within:border-[#D4AF37] transition-colors">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email for market updates"
                  className="bg-[#071629] text-xs px-3 py-2.5 text-white placeholder-[#667085] w-full focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  disabled={subStatus?.loading}
                  aria-label="Subscribe to newsletter"
                  className="bg-[#D4AF37] hover:bg-[#B9952D] text-[#0B1F3B] font-bold px-3 py-2.5 text-xs flex items-center transition-colors disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
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
            </form>
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
