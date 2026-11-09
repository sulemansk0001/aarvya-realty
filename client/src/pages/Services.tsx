import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  TrendingUp,
  KeyRound,
  Building,
  LineChart,
  Landmark,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MapPin,
  Compass,
  FileCheck2,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';
import { MagneticFieldButton } from '../components/buttons/MagneticFieldButton';

interface FAQItem {
  question: string;
  answer: string;
}

export const Services: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const servicesData = [
    {
      id: 'buying',
      title: 'Property Buying Assistance',
      icon: Home,
      description:
        'Finding the right property requires more than browsing listings. We help property seekers explore suitable residential and commercial options based on location, configuration, budget and individual requirements.',
      points: [
        'Requirement understanding',
        'Location exploration',
        'Property shortlisting',
        'Site visit coordination',
        'Enquiry assistance',
      ],
      ctaText: 'Explore Buying Options',
      ctaLink: '/buy',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'rental',
      title: 'Property Rental Assistance',
      icon: KeyRound,
      description:
        'Explore rental opportunities that suit your lifestyle, location preferences and budget. From residential apartments to commercial spaces, discover available options in Pune and other Maharashtra locations.',
      points: [
        'Rental property discovery',
        'Budget-based shortlisting',
        'Location-based search',
        'Property enquiry assistance',
      ],
      ctaText: 'Explore Rental Properties',
      ctaLink: '/rent',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'selling',
      title: 'Property Selling Assistance',
      icon: TrendingUp,
      description:
        'Property owners looking to sell can connect with prospective buyers through organised property presentation and enquiry management.',
      points: [
        'Property listing assistance',
        'Property information collection',
        'Listing presentation',
        'Buyer enquiry coordination',
      ],
      ctaText: 'List Your Property',
      ctaLink: '/add-property',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'residential',
      title: 'Residential Property Consultation',
      icon: Landmark,
      description:
        'Explore residential opportunities ranging from compact apartments to spacious family homes and independent properties.',
      points: [
        '1 BHK and 2 BHK apartments',
        '3 BHK and 4 BHK residences',
        'Independent houses',
        'Villas',
        'Residential plots',
      ],
      ctaText: 'Explore Residential Properties',
      ctaLink: '/residential',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'commercial',
      title: 'Commercial Property Assistance',
      icon: Building,
      description:
        'Explore commercial property opportunities for businesses, investors and professionals looking for suitable spaces.',
      points: [
        'Office spaces',
        'Retail shops',
        'Commercial buildings',
        'Business premises',
        'Commercial investment opportunities',
      ],
      ctaText: 'Explore Commercial Properties',
      ctaLink: '/commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'investment',
      title: 'Property Investment Guidance',
      icon: LineChart,
      description:
        'Explore property opportunities by comparing locations, property types, pricing information and available development projects.',
      points: [
        'Location comparison',
        'Property research',
        'Project exploration',
        'Property information',
        'Investment opportunity discovery',
      ],
      ctaText: 'Explore Opportunities',
      ctaLink: '/properties',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
      disclaimer: 'Note: Real estate values vary with market conditions. We provide research data without guaranteed financial returns.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Understand Your Requirements',
      desc: 'We start by learning your preferred Pune location, space configuration, budget bracket, and move-in timeline.',
    },
    {
      step: '02',
      title: 'Explore Suitable Properties',
      desc: 'Browse verified ready and new projects across Baner, Wakad, Kharadi, and Hinjawadi with transparent carpet area metrics.',
    },
    {
      step: '03',
      title: 'Shortlist and Arrange Enquiries',
      desc: 'Coordinate escorted site visits and communicate directly with property owners or verified developer sales representatives.',
    },
    {
      step: '04',
      title: 'Move Forward With Confidence',
      desc: 'Review legal title documents, understand Maharashtra stamp duty requirements, and proceed with complete clarity.',
    },
  ];

  const categoriesCovered = [
    {
      name: 'Apartments & High-Rise Flats',
      desc: '1, 2, 3 & 4 BHK residences in gated societies with modern amenities.',
      link: '/properties?propertyType=Apartment',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Luxury Villas',
      desc: 'Private gated villas with private lawns and dedicated parking.',
      link: '/properties?propertyType=Villa',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Independent Houses',
      desc: 'Standalone multistory family residences with freehold land.',
      link: '/properties?propertyType=Independent+House',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Residential Plots',
      desc: 'Sanctioned clear-title non-agricultural residential plots.',
      link: '/properties?propertyType=Plot',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Commercial Offices',
      desc: 'Grade-A fitted corporate workspaces in premier IT hubs.',
      link: '/commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: 'Retail Shops',
      desc: 'High-footfall commercial storefronts and showroom spaces.',
      link: '/commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const locationsServed = [
    { name: 'Baner', city: 'Pune', desc: 'Western lifestyle hub with high-street retail' },
    { name: 'Hinjawadi', city: 'Pune', desc: 'IT corridor Phase 1, 2, 3 with high rental yield' },
    { name: 'Wakad', city: 'Pune', desc: 'Family community near Bhumkar Chowk & Expressway' },
    { name: 'Kharadi', city: 'Pune', desc: 'Eastern IT corridor near EON IT Park & WTC' },
    { name: 'Kothrud', city: 'Pune', desc: 'Established green residential enclave with metro link' },
    { name: 'Viman Nagar', city: 'Pune', desc: 'Commercial & luxury hub near Pune Airport' },
    { name: 'Mumbai', city: 'Mumbai', desc: 'Financial capital commercial & prime residential' },
    { name: 'Navi Mumbai', city: 'Navi Mumbai', desc: 'Growth node with upcoming airport & Atal Setu' },
    { name: 'Nagpur', city: 'Nagpur', desc: 'Central Maharashtra industrial & logistics hub' },
    { name: 'Nashik', city: 'Nashik', desc: 'Pleasant climate smart city with affordable housing' },
    { name: 'Satara', city: 'Satara', desc: 'Scenic southern Maharashtra residential town' },
    { name: 'Kolhapur', city: 'Kolhapur', desc: 'Vibrant commercial & cultural district' },
    { name: 'Thane', city: 'Thane', desc: 'Rapidly growing metropolitan residential hub' },
  ];

  const whyWorkWithUs = [
    {
      title: 'Customer-Focused Assistance',
      desc: 'We prioritize your spatial and financial parameters instead of pushing developer sales quotas.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Location-Based Property Discovery',
      desc: 'Ground-level micro-market intelligence on Pune civic infrastructure, water supply, and metro lines.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Clear Property Information',
      desc: 'Transparent carpet vs super-built up area metrics, all-inclusive INR price guidance, and clear documentation.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'Residential and Commercial Coverage',
      desc: 'One integrated advisory team capable of managing family home purchases and corporate office leasing.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: 'How can I find properties in Pune?',
      answer:
        'You can search directly on our Properties page using filters for Pune localities (Baner, Hinjawadi, Wakad, Kharadi, etc.), BHK configurations, and budget in Indian Rupees. You can also connect with our advisory desk in Hinjewadi Phase 1 for custom off-market shortlists.',
    },
    {
      question: 'Can I search for properties within a specific budget?',
      answer:
        'Yes. Our search tool enables budget filtering from under ₹50 Lakh up to ₹2.5 Crore and above for purchase, and monthly rentals starting from ₹20,000/month.',
    },
    {
      question: 'Does Aarvya Realty help with rental properties?',
      answer:
        'Yes. We provide complete rental assistance for tenants and landlords across Pune IT corridors, including registered Maharashtra Leave & License agreement support and police verification coordination.',
    },
    {
      question: 'Can property owners list their properties?',
      answer:
        'Absolutely. Homeowners and commercial asset owners can submit their property details via our "List Your Property" form at /add-property to reach verified buyers without spam.',
    },
    {
      question: 'Which Maharashtra cities are covered?',
      answer:
        'Our primary operations are focused on Pune and its key micro-markets. We also assist with property opportunities in Mumbai, Navi Mumbai, Thane, Nashik, Nagpur, Satara, and Kolhapur.',
    },
    {
      question: 'Can I enquire about commercial properties?',
      answer:
        'Yes. We assist businesses, retail brands, and investors with Grade-A office spaces, bare shell floors, and retail shops in commercial hubs like Viman Nagar, Kharadi, and Hinjawadi Phase 1.',
    },
    {
      question: 'How can I arrange a property visit?',
      answer:
        'You can click "Schedule Site Visit" on any property details page, submit our contact form, or call our direct Pune advisory desk at +91 84464 16101 to coordinate escorted inspections at your convenience.',
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      {/* ========================================================= */}
      {/* SECTION 1 — SERVICES HERO (Zoom-in & entrance animation)  */}
      {/* ========================================================= */}
      <section className="relative py-20 lg:py-28 bg-[#071629] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=85"
            alt="Real Estate Services in Pune"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 opacity-35"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/85" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <ScrollAnimation animation="fade-in" duration={500}>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-3">
              Aarvya Realty Advisory Services
            </span>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" delay={100} duration={650}>
            <h1 className="text-3xl sm:text-5xl font-poppins font-bold text-white leading-tight">
              Real Estate Services Designed <br className="hidden sm:inline" />
              Around Your Needs
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" delay={200} duration={600}>
            <p className="mt-5 text-base sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
              From finding your next home to exploring commercial opportunities, Aarvya Realty helps simplify your property journey across Pune and Maharashtra.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" delay={300} duration={600}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#services-catalog"
                className="px-7 py-3.5 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-md hover:-translate-y-0.5"
              >
                Explore Our Services
              </a>
              <Link
                to="/contact"
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-lg border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                Speak to a Consultant
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2 — OUR SERVICES (Six Detailed Service Cards)     */}
      {/* ========================================================= */}
      <section id="services-catalog" className="py-20 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Comprehensive Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Our Real Estate Services
              </h2>
              <p className="mt-3 text-base text-[#667085]">
                Structured representation and advisory for buyers, tenants, property owners, and corporate occupiers.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => {
              const Icon = service.icon;
              return (
                <ScrollAnimation key={service.id} animation="slide-up" delay={idx * 100} duration={600}>
                  <div className="h-full group bg-white rounded-2xl border border-[#E0E6ED] overflow-hidden shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      {/* Card Thumbnail */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100">
                        <img
                          src={service.image}
                          alt={service.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white">
                          <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-white">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                            Service
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <h3 className="font-poppins font-bold text-xl text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-3">
                          {service.title}
                        </h3>
                        <p className="text-xs text-[#667085] leading-relaxed mb-5">
                          {service.description}
                        </p>

                        {/* Points List */}
                        <div className="space-y-2 mb-5">
                          {service.points.map((pt, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#0B1F3B]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                              <span>{pt}</span>
                            </div>
                          ))}
                        </div>

                        {service.disclaimer && (
                          <p className="text-[10px] text-[#667085] italic border-t border-[#E0E6ED] pt-2 mb-2">
                            {service.disclaimer}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Card Action */}
                    <div className="p-6 pt-0">
                      <Link
                        to={service.ctaLink}
                        className="w-full py-2.5 px-4 bg-[#F5F7FA] hover:bg-[#D4AF37] text-[#0B1F3B] hover:text-white border border-[#E0E6ED] hover:border-[#D4AF37] rounded-lg text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 — OUR PROCESS (Four-Step Process Staggered)      */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Structured Methodology
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                How We Make Your Property Journey Simpler
              </h2>
              <p className="mt-3 text-base text-[#667085]">
                A transparent, 4-step advisory roadmap designed to eliminate guesswork and broker friction.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((st, i) => (
              <ScrollAnimation key={st.step} animation="slide-up" delay={i * 100} duration={600}>
                <div
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`h-full group bg-white rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${
                    hoveredStep === i
                      ? 'border-[#D4AF37] -translate-y-2 shadow-cardHover'
                      : 'border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-poppins font-extrabold text-3xl transition-colors ${
                          hoveredStep === i ? 'text-[#D4AF37]' : 'text-[#D4AF37]'
                        }`}
                      >
                        {st.step}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-[#667085] bg-[#F5F7FA] px-2.5 py-1 rounded border border-[#E0E6ED]">
                        Phase {st.step}
                      </span>
                    </div>

                    <h3
                      className={`font-poppins font-bold text-lg mb-2 transition-colors ${
                        hoveredStep === i ? 'text-[#D4AF37]' : 'text-[#0B1F3B]'
                      }`}
                    >
                      {st.title}
                    </h3>

                    <p className="text-xs text-[#667085] leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#E0E6ED] text-[11px] font-semibold text-[#D4AF37] flex items-center gap-1">
                    <span>Advisory Step</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 — PROPERTY CATEGORIES WE COVER (Zoom In)        */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Asset Typology
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Property Categories We Cover
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                Residential and commercial property categories across Pune and Maharashtra.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesCovered.map((cat, i) => (
              <ScrollAnimation key={i} animation="zoom-in" delay={i * 90} duration={550}>
                <Link
                  to={cat.link}
                  className="group relative rounded-2xl overflow-hidden aspect-[16/10] border border-[#E0E6ED] shadow-subtle block"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:opacity-95 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-poppins font-bold text-lg text-white group-hover:text-amber-200 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                      {cat.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#D4AF37] group-hover:text-white transition-colors">
                      <span>Explore Category</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 — LOCATIONS WE SERVE                            */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Coverage Network
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Locations We Serve in Maharashtra
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                High-growth corridors and established urban markets across Western India.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {locationsServed.map((loc, idx) => (
              <ScrollAnimation key={loc.name} animation="slide-up" delay={idx * 50} duration={500}>
                <Link
                  to={`/properties?locality=${encodeURIComponent(loc.name)}`}
                  className="group bg-white p-5 rounded-xl border border-[#E0E6ED] hover:border-[#D4AF37] hover:shadow-cardHover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-poppins font-bold text-base text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors">
                        {loc.name}
                      </h4>
                      <span className="text-[10px] text-[#667085] font-semibold bg-[#F5F7FA] px-2 py-0.5 rounded border border-[#E0E6ED]">
                        {loc.city}
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {loc.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#E0E6ED] text-xs font-bold text-[#D4AF37] flex items-center justify-between">
                    <span>View Properties</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6 — WHY WORK WITH US?                             */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Client Value
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Why Work With Us?
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                A commitment to transparency, technical diligence, and personalized service.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyWorkWithUs.map((item, i) => (
              <ScrollAnimation key={i} animation="slide-up" delay={i * 100} duration={600}>
                <div className="h-full group bg-[#F5F7FA] rounded-xl border border-[#E0E6ED] overflow-hidden hover:border-[#D4AF37] hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between">
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-poppins font-bold text-base text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#667085] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E0E6ED] text-[11px] font-bold text-[#D4AF37]">
                      Advantage 0{i + 1}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — FREQUENTLY ASKED QUESTIONS (FAQ Accordion)     */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Common Enquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                Clear answers regarding our property discovery and consultancy process in Pune.
              </p>
            </div>
          </ScrollAnimation>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <ScrollAnimation key={index} animation="slide-up" delay={index * 50} duration={500}>
                  <div
                    className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                      isOpen ? 'border-[#D4AF37] shadow-subtle' : 'border-[#E0E6ED] hover:border-neutral-400'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-poppins font-bold text-sm sm:text-base transition-colors ${
                          isOpen ? 'text-[#D4AF37]' : 'text-[#0B1F3B]'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#667085] flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#667085] leading-relaxed border-t border-neutral-100 mt-1 pt-3 animate-in fade-in duration-150">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8 — FINAL CTA                                     */}
      {/* ========================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="slide-up" duration={650}>
            <div className="bg-[#071629] text-white rounded-2xl p-8 sm:p-14 shadow-card flex flex-col md:flex-row items-center justify-between gap-8 border border-[#14315A]">
              <div className="space-y-3 max-w-xl text-center md:text-left">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block">
                  Start Your Search
                </span>
                <h2 className="text-2xl sm:text-4xl font-poppins font-bold !text-white text-white">
                  Ready to Explore Your Next Property?
                </h2>
                <p className="text-sm text-[#E0E6ED] leading-relaxed">
                  Tell us what you are looking for and let us help you explore suitable opportunities across Pune and Maharashtra.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 whitespace-nowrap">
                <MagneticFieldButton
                  to="/properties"
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 text-[#0B1F3B]" />}
                  iconPosition="right"
                  aria-label="Explore Properties"
                >
                  Explore Properties
                </MagneticFieldButton>
                <MagneticFieldButton
                  to="/contact"
                  variant="outline"
                  size="md"
                  buttonClassName="text-white hover:text-[#D4AF37] border-[#E0E6ED]/40 hover:border-[#D4AF37]"
                  aria-label="Contact Us"
                >
                  Contact Us
                </MagneticFieldButton>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};
