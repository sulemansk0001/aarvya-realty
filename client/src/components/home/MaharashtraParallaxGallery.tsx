import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Building2, Compass } from 'lucide-react';
import { AnimatedHeading } from '../typography/AnimatedHeading';

export interface MaharashtraDestination {
  id: string;
  name: string;
  region: string;
  category: string;
  description: string;
  avgPrice: string;
  activeCount: number;
  image: string;
  highlights: string[];
}

const MAHARASHTRA_DESTINATIONS: MaharashtraDestination[] = [
  {
    id: 'pune',
    name: 'Pune',
    region: 'Western Maharashtra &bull; Oxford of the East',
    category: 'IT & Cultural Capital',
    description: 'Premier technology and manufacturing epicenter featuring high-growth micro-markets like Baner, Hinjawadi, Kharadi, and Wakad with upcoming Metro Line 3.',
    avgPrice: '₹7,200 – ₹16,500/sq.ft',
    activeCount: 184,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Rajiv Gandhi Infotech Park', 'Balewadi High Street', 'EON Free Zone'],
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    region: 'Coastal Konkan &bull; Financial Metropolis',
    category: 'High-Net-Worth Corridors',
    description: 'India’s premier financial hub with iconic sea-facing penthouses, redevelopment luxury towers, and high-yielding commercial assets across BKC and South Mumbai.',
    avgPrice: '₹22,000 – ₹65,000/sq.ft',
    activeCount: 92,
    image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Bandra Kurla Complex (BKC)', 'Marine Drive & Worli', 'Coastal Road Link'],
  },
  {
    id: 'navi-mumbai',
    name: 'Navi Mumbai',
    region: 'Thane Creek &bull; Planned Smart City',
    category: 'Integrated Townships',
    description: 'Masterplanned urban nodes anchoring the upcoming Navi Mumbai International Airport, Mumbai Trans-Harbour Link (Atal Setu), and Kharghar corporate parks.',
    avgPrice: '₹8,500 – ₹18,000/sq.ft',
    activeCount: 64,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Atal Setu (MTHL) Link', 'NMIA Airport Zone', 'Kharghar Corporate Park'],
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    region: 'Vidarbha &bull; Orange City Logistics Hub',
    category: 'Central India Gateway',
    description: 'Zero-mile central connectivity anchored by MIHAN SEZ, Nagpur Metro, and Samruddhi Mahamarg expressway linking directly to Mumbai and Pune.',
    avgPrice: '₹4,200 – ₹8,000/sq.ft',
    activeCount: 42,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    highlights: ['MIHAN SEZ Multi-modal Hub', 'Samruddhi Expressway', 'Nagpur Metro Corridors'],
  },
  {
    id: 'nashik',
    name: 'Nashik',
    region: 'Northern Maharashtra &bull; Wine & Industrial Hub',
    category: 'Scenic Residential Estates',
    description: 'Pleasant climate, industrial parks, and picturesque hillside villas with rapid connectivity to Mumbai and Pune via the golden quadrilateral.',
    avgPrice: '₹3,800 – ₹7,200/sq.ft',
    activeCount: 38,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Gangapur Road Luxury', 'MIDC Industrial Corridor', 'Wine Country Estates'],
  },
  {
    id: 'satara',
    name: 'Satara',
    region: 'Western Ghats Foothills &bull; Heritage Valley',
    category: 'Hillside & Agro Plots',
    description: 'Scenic valleys near Panchgani and Mahabaleshwar, offering clear-title holiday homes, agricultural estates, and gated farmhouse developments.',
    avgPrice: '₹2,600 – ₹5,400/sq.ft',
    activeCount: 26,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Panchgani Foothills', 'National Highway 48 Access', 'Eco-Retreat Plots'],
  },
  {
    id: 'kolhapur',
    name: 'Kolhapur',
    region: 'Southern Maharashtra &bull; Sugar & Foundry Hub',
    category: 'Commercial & High-End Living',
    description: 'Thriving agricultural wealth and business entrepreneurship driving demand for spacious family bungalows and modern high-rise gated communities.',
    avgPrice: '₹3,500 – ₹6,800/sq.ft',
    activeCount: 31,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Tarabai Park Corridors', 'Foundry Cluster Infrastructure', 'Freehold Townships'],
  },
  {
    id: 'thane',
    name: 'Thane',
    region: 'Mumbai Metropolitan Region &bull; City of Lakes',
    category: 'High-Density Premium Living',
    description: 'Ghosbunder Road high-rises and prime Pokhran Road gated societies offering panoramic views of Yeoor Hills and direct connectivity to Eastern Express Highway.',
    avgPrice: '₹11,000 – ₹24,000/sq.ft',
    activeCount: 56,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Ghodbunder Tech Corridor', 'Pokhran Road Luxury', 'Yeoor Hills Green Belt'],
  },
];

export const MaharashtraParallaxGallery: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 20);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white border-b border-[#E0E6ED] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <AnimatedHeading
            eyebrow="REGIONAL PORTFOLIO"
            badge="Maharashtra Corridors"
            title="Properties Across Maharashtra"
            subtitle="Explore high-growth micro-markets from Pune’s prime corridors to Mumbai, Nashik, and Central Maharashtra."
            align="left"
          />

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll gallery left"
              className="w-11 h-11 rounded-full border border-[#E0E6ED] bg-white text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#D4AF37] hover:border-[#D4AF37] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center shadow-subtle"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll gallery right"
              className="w-11 h-11 rounded-full border border-[#E0E6ED] bg-[#0B1F3B] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B1F3B] hover:border-[#D4AF37] disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-goldGlow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Parallax Scroll Gallery */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-none px-4 sm:px-8 lg:px-12 pb-6 scroll-smooth cursor-grab active:cursor-grabbing flex gap-6 sm:gap-8 items-stretch"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {MAHARASHTRA_DESTINATIONS.map((dest, index) => (
          <div
            key={dest.id}
            className="flex-shrink-0 w-[300px] sm:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden bg-[#F5F7FA] border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover transition-all duration-350 hover:-translate-y-1.5 flex flex-col justify-between group"
            style={{ scrollSnapAlign: 'start' }}
            data-cursor="card"
          >
            {/* Image Container with Parallax Zoom */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#071629]">
              <img
                src={dest.image}
                alt={`${dest.name}, Maharashtra`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-[#0B1F3B]/30 to-transparent pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                <span className="bg-[#0B1F3B]/90 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/50 text-[11px] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  {dest.category}
                </span>
              </div>

              <div className="absolute top-3.5 right-3.5 z-10">
                <span className="bg-[#071629]/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
                  {dest.activeCount} Listings
                </span>
              </div>

              {/* Bottom Image Info */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white z-10">
                <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] mb-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Maharashtra Region</span>
                </div>
                <h3 className="text-2xl font-poppins font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                  {dest.name}
                </h3>
              </div>
            </div>

            {/* Card Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider mb-2">
                  {dest.region}
                </p>

                <p className="text-xs sm:text-sm text-[#667085] leading-relaxed line-clamp-3 mb-4">
                  {dest.description}
                </p>

                {/* Highlights micro-tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {dest.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-white border border-[#E0E6ED] text-[#0B1F3B] font-medium px-2 py-0.5 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Valuation & CTA Action */}
              <div className="pt-4 border-t border-[#E0E6ED] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                    Avg Benchmark
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0B1F3B] font-poppins">
                    {dest.avgPrice}
                  </span>
                </div>

                <Link
                  to={`/properties?city=${encodeURIComponent(dest.name)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs font-bold rounded-lg transition-all duration-300 shadow-sm hover:shadow-goldGlow"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

