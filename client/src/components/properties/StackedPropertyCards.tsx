import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Bed, Bath, Maximize2, ShieldCheck, Sparkles } from 'lucide-react';
import { AnimatedHeading } from '../typography/AnimatedHeading';

export interface StackedProperty {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  locality: string;
  city: string;
  bhk: string;
  area: string;
  price: string;
  possession: string;
  excerpt: string;
  image: string;
  badge: string;
}

const STACKED_PROPERTIES: StackedProperty[] = [
  {
    id: 'prop-stack-1',
    slug: 'premium-2-bhk-apartment-baner',
    title: 'Premium 2 BHK Apartment',
    subtitle: 'Baner, Pune &bull; Ready to Move',
    locality: 'Baner',
    city: 'Pune',
    bhk: '2 BHK',
    area: '1,050 sq.ft.',
    price: '₹85 Lakh',
    possession: 'Ready to Move',
    excerpt:
      'A contemporary residential apartment designed for comfortable urban living, with convenient access to important lifestyle and business destinations along Pan Card Club Road.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    badge: 'Curated Residence',
  },
  {
    id: 'prop-stack-2',
    slug: 'luxury-3-bhk-residence-kharadi',
    title: 'Luxury 3 BHK Residence',
    subtitle: 'Kharadi, Pune &bull; Riverfront Enclave',
    locality: 'Kharadi',
    city: 'Pune',
    bhk: '3 BHK',
    area: '1,680 sq.ft.',
    price: '₹1.45 Cr',
    possession: 'Under Construction',
    excerpt:
      'A spacious residential option suitable for families looking for modern amenities and convenient connectivity near EON Free Zone, World Trade Centre Pune, and Nagar Road.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    badge: 'Prime High-Rise',
  },
  {
    id: 'prop-stack-3',
    slug: 'modern-independent-villa-wakad',
    title: 'Modern Independent Villa',
    subtitle: 'Wakad, Pune &bull; Gated Private Estate',
    locality: 'Wakad',
    city: 'Pune',
    bhk: '4 BHK Villa',
    area: '2,900 sq.ft.',
    price: '₹2.85 Cr',
    possession: 'Ready to Move',
    excerpt:
      'A thoughtfully designed independent residence with spacious interiors and a contemporary architectural style, private landscaped lawn, and immediate access to Mumbai-Pune Expressway.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80',
    badge: 'Exclusive Villa',
  },
  {
    id: 'prop-stack-4',
    slug: 'premium-commercial-office-hinjawadi',
    title: 'Premium Commercial Office',
    subtitle: 'Hinjawadi Phase 1, Pune &bull; Grade-A IT Tower',
    locality: 'Hinjawadi',
    city: 'Pune',
    bhk: 'Grade-A Office',
    area: '3,400 sq.ft.',
    price: '₹3.20 Cr',
    possession: 'Immediate Possession',
    excerpt:
      'A professional workspace option for businesses seeking convenient access to Pune’s technology and commercial ecosystem, Rajiv Gandhi Infotech Park, and upcoming Metro Line 3.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    badge: 'Corporate Asset',
  },
];

export const StackedPropertyCards: React.FC = () => {
  return (
    <section className="c-properties py-24 bg-[#F5F7FA] border-b border-[#E0E6ED] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="c-properties__title mb-16 text-center">
          <AnimatedHeading
            eyebrow="ARCHITECTURAL PORTFOLIO"
            badge="Pure CSS Stacking"
            title="Signature Properties in Pune"
            subtitle="Explore our curated showcase of residential and commercial benchmarks across Pune’s highest-demand micro-markets."
            align="center"
          />
        </div>

        {/* Stacked Cards List (CSS-Only Stacking — No JS required) */}
        <ul className="c-properties__list space-y-10 sm:space-y-12">
          {STACKED_PROPERTIES.map((property, index) => {
            // CSS custom variable offsets for pure CSS sticky stacking
            const stickyTopDesktop = 110 + index * 24; // 110px, 134px, 158px, 182px
            const stickyTopMobile = 85 + index * 16;
            const zIndex = index + 10;

            return (
              <li
                key={property.id}
                className="c-properties__item group sticky rounded-2xl overflow-hidden bg-white border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover transition-all duration-350"
                style={{
                  top: `var(--stack-top, ${stickyTopDesktop}px)`,
                  zIndex,
                  // CSS variable override via style attribute
                  ['--stack-top' as any]: `${stickyTopDesktop}px`,
                }}
                data-cursor="card"
              >
                <div className="flex flex-col lg:flex-row items-stretch min-h-[380px] sm:min-h-[420px]">
                  {/* Property Photograph */}
                  <figure className="c-properties__item-figure lg:w-1/2 relative overflow-hidden bg-[#071629] m-0 aspect-[16/10] lg:aspect-auto">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <span className="bg-[#0B1F3B]/90 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {property.badge}
                      </span>
                      <span className="bg-[#071629]/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {property.locality}
                      </span>
                    </div>

                    {/* Bottom Pricing Tag */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#F5E6BD] tracking-wider block">
                          Guidance Valuation
                        </span>
                        <span className="text-2xl sm:text-3xl font-poppins font-bold text-white">
                          {property.price}
                        </span>
                      </div>
                      <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-md text-white border border-white/30 font-medium">
                        {property.possession}
                      </span>
                    </div>
                  </figure>

                  {/* Property Information & Specifications */}
                  <div className="c-properties__item-info lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between bg-white">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#667085] mb-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span className="font-semibold text-[#0B1F3B]">{property.locality}</span>
                        <span>&bull;</span>
                        <span>{property.city}, Maharashtra</span>
                      </div>

                      <h3 className="c-properties__item-title font-poppins font-bold text-2xl sm:text-3xl text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-300 leading-tight">
                        {property.title}
                      </h3>

                      <p className="c-properties__item-subtitle text-xs sm:text-sm font-semibold text-[#D4AF37] mt-1 mb-4">
                        {property.subtitle}
                      </p>

                      <p className="c-properties__item-excerpt text-xs sm:text-sm text-[#667085] leading-relaxed mb-6">
                        {property.excerpt}
                      </p>

                      {/* Specs Row */}
                      <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-[#E0E6ED] text-xs text-[#0B1F3B]">
                        <div>
                          <span className="text-[10px] uppercase text-[#667085] block font-semibold">Config</span>
                          <span className="font-bold text-sm text-[#0B1F3B]">{property.bhk}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-[#667085] block font-semibold">Carpet Area</span>
                          <span className="font-bold text-sm text-[#0B1F3B]">{property.area}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase text-[#667085] block font-semibold">MahaRERA</span>
                          <span className="font-bold text-sm text-[#D4AF37]">Verified</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Action Link */}
                    <div className="mt-8 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                        <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                        <span>Direct Developer Pricing &bull; Zero Brokerage</span>
                      </div>

                      <Link
                        to={`/properties/${property.slug}`}
                        className="c-properties__item-link inline-flex items-center gap-2 px-6 py-3 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-goldGlow hover:-translate-y-0.5"
                      >
                        <span>View Property Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

