import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Home, Landmark, Compass, Trees, Sparkles } from 'lucide-react';
import { ScrollAnimation } from '../common/ScrollAnimation';

interface CategoryItem {
  id: string;
  name: string;
  tagline: string;
  count: number;
  priceRange: string;
  description: string;
  image: string;
  link: string;
  icon: React.ElementType;
}

export const InteractivePropertyCategory: React.FC = () => {
  const categories: CategoryItem[] = [
    {
      id: 'apartments',
      name: 'Apartments & Flats',
      tagline: '1, 2 & 3 BHK High-Rise Residences',
      count: 72,
      priceRange: '₹45 Lakh – ₹1.65 Cr',
      description: 'Modern cross-ventilated flats in Pune’s top residential micro-markets including Baner, Wakad, Hinjawadi, and Kharadi with 24/7 security and lifestyle amenities.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      link: '/properties?propertyType=Apartment',
      icon: Building2,
    },
    {
      id: 'villas',
      name: 'Luxury Villas',
      tagline: 'Gated Community Independent Living',
      count: 14,
      priceRange: '₹2.25 Cr – ₹4.50 Cr',
      description: 'Exclusive multi-storey private villas featuring personal landscaped lawns, double-height ceilings, and private parking in the green environs of Bavdhan and Baner.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      link: '/properties?propertyType=Villa',
      icon: Home,
    },
    {
      id: 'independent',
      name: 'Independent Houses',
      tagline: 'Standalone Family Residences',
      count: 18,
      priceRange: '₹1.10 Cr – ₹2.80 Cr',
      description: 'Spacious independent residences offering freehold land ownership, personal terrace space, and quiet residential neighborhood privacy in Kothrud and Aundh.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      link: '/properties?propertyType=Independent+House',
      icon: Landmark,
    },
    {
      id: 'plots',
      name: 'Residential Plots',
      tagline: 'Clear-Title N.A. Sanctioned Land',
      count: 22,
      priceRange: '₹35 Lakh – ₹95 Lakh',
      description: 'Sanctioned non-agricultural residential plots with demarcated boundaries, internal concrete roads, and water/electricity connectivity along Pune ring road corridors.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
      link: '/properties?propertyType=Plot',
      icon: Trees,
    },
    {
      id: 'commercial',
      name: 'Commercial Spaces',
      tagline: 'Grade-A Offices & Retail Showrooms',
      count: 29,
      priceRange: '₹80 Lakh – ₹6.20 Cr',
      description: 'High-footfall retail storefronts, Grade-A IT park office suites, and corporate workspaces in prime commercial zones of Hinjawadi, Kharadi, and Shivaji Nagar.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      link: '/properties?propertyType=Commercial',
      icon: Compass,
    },
    {
      id: 'penthouses',
      name: 'Penthouses & Duplexes',
      tagline: 'Ultra-Luxury Skyline Enclaves',
      count: 8,
      priceRange: '₹3.10 Cr – ₹5.80 Cr',
      description: 'Palatial duplex penthouses and custom-crafted luxury residences with private elevators, Italian marble flooring, and panoramic vistas of the Pune cityscape.',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      link: '/properties?bhk=4+BHK',
      icon: Sparkles,
    },
  ];

  const [activeCategory, setActiveCategory] = useState<CategoryItem>(categories[0]);

  return (
    <section className="py-20 bg-white border-b border-[#E0E6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              Property Categorisation
            </span>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              Explore Properties by Category
            </h2>
            <p className="mt-3 text-base text-[#667085]">
              Hover or tap across categories to preview tailored property configurations across Pune and Maharashtra.
            </p>
          </div>
        </ScrollAnimation>

        {/* Unified Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Category Selector (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = activeCategory.id === cat.id;

              return (
                <ScrollAnimation key={cat.id} animation="slide-left" delay={idx * 60} duration={500}>
                  <div
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => setActiveCategory(cat)}
                    className={`cursor-pointer rounded-xl p-4 transition-all duration-250 flex items-center justify-between border ${
                      isActive
                        ? 'bg-[#0B1F3B] text-white border-[#0B1F3B] shadow-card -translate-x-1 sm:-translate-x-2'
                        : 'bg-[#F5F7FA] text-[#0B1F3B] border-[#E0E6ED] hover:bg-white hover:border-[#D4AF37]/50 hover:shadow-subtle'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          isActive ? 'bg-[#D4AF37] text-[#0B1F3B]' : 'bg-white text-[#D4AF37] shadow-sm'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3
                          className={`font-poppins font-bold text-base transition-colors ${
                            isActive ? 'text-white' : 'text-[#0B1F3B]'
                          }`}
                        >
                          {cat.name}
                        </h3>
                        <span
                          className={`text-xs block mt-0.5 transition-colors ${
                            isActive ? 'text-[#F5E6BD]' : 'text-[#667085]'
                          }`}
                        >
                          {cat.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full inline-block transition-colors ${
                          isActive
                            ? 'bg-white/20 text-[#D4AF37]'
                            : 'bg-neutral-100 text-[#667085]'
                        }`}
                      >
                        {cat.count} listings
                      </span>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Showcase (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ScrollAnimation animation="slide-right" delay={150} duration={600} className="h-full">
              <div className="h-full bg-[#F5F7FA] rounded-2xl border border-[#E0E6ED] overflow-hidden shadow-subtle p-6 sm:p-8 flex flex-col justify-between">
                {/* Visual Image Preview */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-[#071629] shadow-sm">
                  {categories.map((cat) => (
                    <img
                      key={cat.id}
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                        activeCategory.id === cat.id ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-[#0B1F3B]/30 to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0B1F3B] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide shadow-sm">
                      {activeCategory.name}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] text-[#F5E6BD] block font-semibold uppercase tracking-wider">
                        Typical Pune Guidance Range
                      </span>
                      <span className="text-xl sm:text-2xl font-poppins font-extrabold text-white">
                        {activeCategory.priceRange}
                      </span>
                    </div>
                    <span className="text-xs bg-[#071629]/75 backdrop-blur-sm px-2.5 py-1 rounded text-[#F5E6BD] border border-white/20">
                      {activeCategory.count} Verified Listings
                    </span>
                  </div>
                </div>

                {/* Information Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-poppins font-bold text-xl sm:text-2xl text-[#0B1F3B]">
                      {activeCategory.name}
                    </h4>
                    <span className="text-xs text-[#0B1F3B] font-semibold bg-white px-3 py-1 rounded-full border border-[#E0E6ED]">
                      {activeCategory.tagline}
                    </span>
                  </div>

                  <p className="text-sm text-[#667085] leading-relaxed">
                    {activeCategory.description}
                  </p>

                  <div className="pt-4 border-t border-[#E0E6ED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="text-xs text-[#667085]">
                      <span className="font-semibold text-[#0B1F3B]">Primary Locations:</span> Baner, Hinjawadi, Wakad, Kharadi, Kothrud
                    </div>

                    <Link
                      to={activeCategory.link}
                      className="px-5 py-2.5 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs font-bold rounded-lg transition-all duration-200 shadow-sm hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>Browse {activeCategory.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};
