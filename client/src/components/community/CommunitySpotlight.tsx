import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TrendingUp, Compass, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { AnimatedHeading } from '../typography/AnimatedHeading';

export interface MicroMarket {
  id: string;
  name: string;
  tagline: string;
  description: string;
  rentalYield: string;
  avgSqFt: string;
  connectivity: string;
  highlights: string[];
  image: string;
  propertiesCount: number;
}

const PUNE_COMMUNITIES: MicroMarket[] = [
  {
    id: 'baner',
    name: 'Baner & Balewadi',
    tagline: 'West Pune Luxury Lifestyle & IT Corridor',
    description:
      'Premier western residential hub with exceptional social infrastructure, high-street dining on Balewadi High Street, and seamless arterial link to Hinjawadi IT Park and Mumbai-Pune Expressway.',
    rentalYield: '4.2% - 5.1%',
    avgSqFt: '₹9,200 - ₹13,500',
    connectivity: 'Metro Line 3 & Mumbai Expressway (10 mins)',
    highlights: ['Balewadi High Street Dining', 'Close to Hinjewadi Phase 1', 'Top Tier ICSE & IB Schools'],
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    propertiesCount: 42,
  },
  {
    id: 'koregaon-park',
    name: 'Koregaon Park',
    tagline: 'Ultra-Luxury Heritage & Cosmopolitan Enclave',
    description:
      'Pune’s most prestigious residential address featuring tree-lined lanes, heritage bungalows, fine dining, upscale cafes, and boutique luxury residences favoured by CXOs and HNWIs.',
    rentalYield: '3.8% - 4.5%',
    avgSqFt: '₹14,500 - ₹22,000',
    connectivity: 'Pune Airport (12 mins) & Pune Railway Station (10 mins)',
    highlights: ['Osho International Commune', 'Fine Dining Corridors', 'Boutique Luxury Apartments'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    propertiesCount: 24,
  },
  {
    id: 'hinjawadi',
    name: 'Hinjawadi',
    tagline: 'India’s Leading IT & High-Yield Rental Micro-Market',
    description:
      'The technology engine of Pune housing Rajiv Gandhi Infotech Park. Prime choice for young tech executives, boasting consistent rental demand and modern integrated high-rise townships.',
    rentalYield: '5.2% - 6.4%',
    avgSqFt: '₹6,800 - ₹8,900',
    connectivity: 'Direct Metro Line 3 connectivity & Mumbai Highway',
    highlights: ['Rajiv Gandhi Infotech Park', 'High Tenant Occupancy', 'Township Infrastructure'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    propertiesCount: 68,
  },
  {
    id: 'kharadi',
    name: 'Kharadi & Viman Nagar',
    tagline: 'East Pune Business Hub & Riverside Townships',
    description:
      'Eastern Pune’s prime growth district anchoring EON Free Zone and World Trade Centre Pune, surrounded by contemporary gated townships and excellent proximity to Pune Airport.',
    rentalYield: '4.6% - 5.5%',
    avgSqFt: '₹8,400 - ₹11,800',
    connectivity: 'Pune Airport (10 mins) & Nagar Road BRT',
    highlights: ['EON IT Park & WTC Pune', 'Gated Riverfront Townships', 'Pheonix Marketcity Access'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    propertiesCount: 51,
  },
];

export const CommunitySpotlight: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('baner');
  const activeCommunity = PUNE_COMMUNITIES.find((c) => c.id === selectedId) || PUNE_COMMUNITIES[0];

  return (
    <section className="py-20 sm:py-24 bg-white border-b border-[#E0E6ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedHeading
          eyebrow="MICRO-MARKET INTELLIGENCE"
          badge="Pune Prime Corridors"
          title="Explore Pune’s High-Growth Enclaves"
          subtitle="In-depth locality insights to empower homebuyers and investors with verified capital appreciation and rental yield benchmarks."
          align="center"
          className="mb-14"
        />

        {/* Locality Selector Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {PUNE_COMMUNITIES.map((community) => {
            const isSelected = community.id === selectedId;
            return (
              <button
                key={community.id}
                type="button"
                onClick={() => setSelectedId(community.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#0B1F3B] text-[#D4AF37] shadow-md border border-[#0B1F3B]'
                    : 'bg-[#F5F7FA] text-[#0B1F3B] hover:bg-white border border-[#E0E6ED]'
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}`} />
                <span>{community.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-white/15 text-[#D4AF37]' : 'bg-[#E0E6ED] text-[#667085]'
                  }`}
                >
                  {community.propertiesCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#F5F7FA] rounded-2xl border border-[#E0E6ED] p-6 sm:p-10 shadow-sm">
          {/* Left: Community Image & Badge (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden shadow-md group">
            <img
              key={activeCommunity.image}
              src={activeCommunity.image}
              alt={activeCommunity.name}
              className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 animate-in fade-in duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-[#0B1F3B]/30 to-transparent" />

            {/* Bottom Overlay Info on Image */}
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-block bg-[#0B1F3B] text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] font-bold px-2.5 py-1 rounded mb-1 uppercase tracking-wider">
                Micro-Market Spotlight
              </span>
              <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white">
                {activeCommunity.name}
              </h3>
              <p className="text-xs text-[#F5E6BD] mt-0.5">
                {activeCommunity.tagline}
              </p>
            </div>
          </div>

          {/* Right: Detailed Market Metrics & Highlights (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                Local Real Estate Advisory
              </span>
              <h4 className="font-poppins font-bold text-xl text-[#0B1F3B]">
                {activeCommunity.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#667085] mt-2 leading-relaxed">
                {activeCommunity.description}
              </p>
            </div>

            {/* Micro-market Benchmarks */}
            <div className="grid grid-cols-2 gap-3.5 bg-white p-4 rounded-xl border border-[#E0E6ED]">
              <div>
                <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider block">
                  Est. Rental Yield
                </span>
                <span className="text-base font-bold text-[#D4AF37] font-poppins">
                  {activeCommunity.rentalYield}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-[#667085] uppercase tracking-wider block">
                  Avg Capital Value
                </span>
                <span className="text-base font-bold text-[#0B1F3B] font-poppins">
                  {activeCommunity.avgSqFt} <span className="text-[10px] text-[#667085] font-normal">/sq.ft</span>
                </span>
              </div>
            </div>

            {/* Key Neighbourhood Highlights */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#0B1F3B] block">
                Locality Highlights:
              </span>
              <ul className="space-y-1.5 text-xs text-[#667085]">
                {activeCommunity.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Link */}
            <div className="pt-2">
              <Link
                to={`/properties?locality=${encodeURIComponent(activeCommunity.name.split(' ')[0])}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs font-semibold transition-all shadow-sm hover:shadow-md"
              >
                <span>View {activeCommunity.name} Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
