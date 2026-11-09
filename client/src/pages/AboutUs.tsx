import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Compass,
  CheckCircle2,
  Phone,
  MapPin,
  ArrowRight,
  Building,
  Sparkles,
  Users2,
  BookOpen,
  MessageSquare,
} from 'lucide-react';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const AboutUs: React.FC = () => {
  const coreValues = [
    {
      number: '01',
      title: 'Transparency',
      description: 'Clear communication and straightforward property information at every stage.',
    },
    {
      number: '02',
      title: 'Customer Focus',
      description: 'Understanding individual property requirements and helping people explore suitable options.',
    },
    {
      number: '03',
      title: 'Integrity',
      description: 'Building professional relationships through honest communication and responsible practices.',
    },
    {
      number: '04',
      title: 'Local Market Understanding',
      description: 'Helping customers explore properties across Pune and Maharashtra with location-focused information.',
    },
  ];

  const whyChooseBlocks = [
    {
      title: 'Location-Focused Property Discovery',
      description: 'In-depth intelligence on Pune’s thriving micro-markets, upcoming Metro Line 3 stations, ring roads, and community social infrastructure.',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Personalised Property Assistance',
      description: 'One-on-one consultation aligning family spatial needs, work commute parameters, and realistic home loan affordability.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Residential and Commercial Options',
      description: 'Diverse portfolio spanning compact 1 BHK flats, spacious 3 BHK apartments, luxury villas, and Grade-A commercial office suites.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Clear and Accessible Property Information',
      description: 'Factual carpet area reporting, realistic guidance pricing in Indian Rupees, and clear documentation review with zero ambiguity.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const locations = [
    { name: 'Baner & Balewadi', city: 'West Pune Corridor', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80' },
    { name: 'Hinjawadi IT Park', city: 'Phase 1, 2 & 3', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
    { name: 'Wakad & Tathawade', city: 'PCMC Growth Hub', img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80' },
    { name: 'Kharadi & Viman Nagar', city: 'East Pune Tech Zone', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80' },
    { name: 'Kothrud & Bavdhan', city: 'Established Central-West', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
    { name: 'Magarpatta & Hadapsar', city: 'Integrated Townships', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
    { name: 'Mumbai & Navi Mumbai', city: 'Financial Capital Region', img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=600&q=80' },
    { name: 'Nashik, Nagpur & Satara', city: 'Tier-2 Maharashtra Hubs', img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80' },
  ];

  const commitmentBlocks = [
    {
      number: '01',
      title: 'Understanding Your Needs',
      description: 'We begin by understanding your requirements, preferences, budget and location priorities.',
      icon: Users2,
    },
    {
      number: '02',
      title: 'Making Property Discovery Easier',
      description: 'We help organise property options so that customers can explore relevant opportunities more conveniently.',
      icon: Compass,
    },
    {
      number: '03',
      title: 'Supporting Informed Decisions',
      description: 'We encourage clear communication and access to relevant property information throughout the discovery process.',
      icon: BookOpen,
    },
    {
      number: '04',
      title: 'Building Long-Term Relationships',
      description: 'We believe that professional service and meaningful communication are essential to lasting customer relationships.',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="w-full bg-[#F5F7FA]">
      {/* ========================================================= */}
      {/* SECTION 1 — ABOUT HERO (Subtle zoom-in, fade-and-slide)   */}
      {/* ========================================================= */}
      <section className="relative min-h-[360px] sm:min-h-[420px] flex items-center justify-center bg-neutral-900 text-white overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85"
            alt="Pune Skyline and Modern Architecture"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-amber-200 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
              <span>Real Estate Consultancy &bull; Pune, Maharashtra</span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" delay={100} duration={650}>
            <h1 className="text-3xl sm:text-5xl font-poppins font-bold text-white tracking-tight">
              About Aarvya Realty
            </h1>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" delay={200} duration={650}>
            <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Assisting homebuyers, families and investors across Pune and Maharashtra with transparent property discovery and dependable real estate guidance.
            </p>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in" delay={300} duration={500}>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-300">
              <Link to="/" className="hover:text-[#D4AF37] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#D4AF37] font-medium">About Us</span>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2 — WHO WE ARE (Split layout: text left, img right) */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Text narrative */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollAnimation animation="slide-left" duration={600}>
                <div>
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                    Our Story & Foundation
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B] leading-tight">
                    Rooted in Pune’s Dynamic Property Landscape
                  </h2>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-up" delay={150} duration={600}>
                <div className="space-y-4 text-sm sm:text-base text-[#667085] leading-relaxed">
                  <p>
                    Aarvya Realty was established with a singular, resolute objective: to bring genuine transparency, factual clarity, and personalized diligence to home discovery in Pune, Maharashtra. Over recent years, Pune has evolved from a serene cultural hub into Western India's premier IT, automotive, and startup capital.
                  </p>
                  <p>
                    With thousands of residential complexes expanding along key corridors—from Hinjawadi and Wakad in the west to Kharadi and Viman Nagar in the east—prospective buyers face an overwhelming maze of conflicting advertisements and unsolicited sales calls.
                  </p>
                  <p>
                    At Aarvya Realty, we act exclusively as your consultative advocates. We represent genuine property inventory, deliver honest price evaluations in Indian Rupees, and review verified developer credentials so you can make informed decisions with complete peace of mind.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in" delay={250} duration={500}>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#0B1F3B]">
                  <div className="flex items-center gap-2 bg-[#F5F7FA] px-4 py-2.5 rounded-lg border border-[#E0E6ED]">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>Hinjewadi, Phase 1, Pune</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F5F7FA] px-4 py-2.5 rounded-lg border border-[#E0E6ED]">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Customer-Focused Real Estate Advisory</span>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Right: Indian property image */}
            <div className="lg:col-span-5">
              <ScrollAnimation animation="slide-right" duration={650}>
                <div className="relative group overflow-hidden rounded-2xl border border-[#E0E6ED] shadow-card aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                    alt="Aarvya Realty Property Consultant in Pune"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-75 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200 block">
                      Ground-Level Experience
                    </span>
                    <span className="text-sm font-bold font-poppins">
                      Dedicated Property Consultants &bull; Pune Micro-Markets
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3 — OUR MISSION AND VISION (Staggered Cards)      */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Guiding Principles
              </span>
              <h2 className="text-3xl font-poppins font-bold text-[#0B1F3B]">
                Our Mission & Vision
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <ScrollAnimation animation="slide-up" delay={0} duration={600}>
              <div className="h-full group bg-white rounded-2xl p-8 sm:p-10 border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#F5F7FA] group-hover:bg-[#D4AF37] text-[#D4AF37] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-200">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="font-poppins font-bold text-2xl text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-200 mb-4">
                    Our Mission
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    "To simplify property discovery by connecting people with suitable real estate opportunities through accessible information, responsive assistance and customer-focused service."
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E0E6ED] text-xs font-semibold text-[#D4AF37]">
                  Purpose &bull; Clarity &bull; Service
                </div>
              </div>
            </ScrollAnimation>

            {/* Vision Card */}
            <ScrollAnimation animation="slide-up" delay={150} duration={600}>
              <div className="h-full group bg-white rounded-2xl p-8 sm:p-10 border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#F5F7FA] group-hover:bg-[#D4AF37] text-[#D4AF37] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-200">
                    <Eye className="w-7 h-7" />
                  </div>
                  <h3 className="font-poppins font-bold text-2xl text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-200 mb-4">
                    Our Vision
                  </h3>
                  <p className="text-sm text-[#667085] leading-relaxed">
                    "To become a trusted name in property discovery and real estate assistance across Pune and Maharashtra."
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#E0E6ED] text-xs font-semibold text-[#D4AF37]">
                  Trust &bull; Excellence &bull; Growth
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4 — OUR CORE VALUES (4 Cards Staggered)           */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Foundational Standards
              </span>
              <h2 className="text-3xl font-poppins font-bold text-[#0B1F3B]">
                Our Core Values
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                Principles that govern our client relationships and professional advisory.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <ScrollAnimation key={val.number} animation="slide-up" delay={idx * 100} duration={600}>
                <div className="h-full group bg-[#F5F7FA] rounded-xl p-7 border border-[#E0E6ED] hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover hover:bg-white transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="font-poppins font-extrabold text-2xl text-[#D4AF37] group-hover:text-[#D4AF37] transition-colors block mb-3">
                      {val.number}
                    </span>
                    <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-2">
                      {val.title}
                    </h3>
                    <p className="text-xs text-[#667085] leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-[#E0E6ED]/70 text-[11px] font-semibold text-[#D4AF37] flex items-center justify-between">
                    <span>Aarvya Standard</span>
                    <span>&bull;</span>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5 — WHY CHOOSE AARVYA REALTY                      */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Value Proposition
              </span>
              <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Why Choose Aarvya Realty?
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                A deliberate focus on client comfort, market precision, and end-to-end guidance.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {whyChooseBlocks.map((block, i) => (
              <ScrollAnimation key={i} animation="slide-up" delay={i * 100} duration={600} className="h-full">
                <div
                  className="h-full group bg-white rounded-2xl overflow-hidden border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover transition-all duration-350 hover:-translate-y-1.5 flex flex-col sm:flex-row min-h-[240px]"
                  data-cursor="card"
                >
                  {/* Left: Fixed Proportion Indian Property Photograph */}
                  <div className="w-full sm:w-[42%] flex-shrink-0 relative overflow-hidden bg-[#071629] min-h-[190px] sm:min-h-full">
                    <img
                      src={block.image}
                      alt={block.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/60 via-transparent to-transparent pointer-events-none" />
                    <span className="absolute top-3 left-3 bg-[#0B1F3B]/90 backdrop-blur-sm text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                      Pillar 0{i + 1}
                    </span>
                  </div>

                  {/* Right: Content Area with Aligned Bottom Row */}
                  <div className="w-full sm:w-[58%] p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block mb-1.5">
                        Aarvya Value Proposition
                      </span>
                      <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-300 mb-2 leading-snug">
                        {block.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#667085] leading-relaxed">
                        {block.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#E0E6ED] text-xs font-semibold text-[#0B1F3B] flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                        <span>Verified Standard</span>
                      </div>
                      <span className="text-[11px] text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">
                        Explore &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6 — MARKET PRESENCE: PUNE & MAHARASHTRA           */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Geographic Coverage
              </span>
              <h2 className="text-3xl font-poppins font-bold text-[#0B1F3B]">
                Active Micro-Markets in Maharashtra
              </h2>
              <p className="mt-2 text-sm text-[#667085]">
                Explore key localities where our property advisors provide localized assistance and property tours.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc, idx) => (
              <ScrollAnimation key={loc.name} animation="zoom-in" delay={idx * 80} duration={550}>
                <Link
                  to={`/properties?locality=${encodeURIComponent(loc.name.split(' ')[0])}`}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] block border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover transition-all duration-300"
                >
                  <img
                    src={loc.img}
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                      Active Local Market
                    </span>
                    <h4 className="font-poppins font-bold text-base text-white group-hover:text-amber-200 transition-colors">
                      {loc.name}
                    </h4>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-gray-300">
                      <span>{loc.city}</span>
                      <span className="text-amber-300 font-semibold group-hover:translate-x-1 transition-transform">
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7 — OUR COMMITMENT TO EVERY PROPERTY JOURNEY       */}
      {/* (Replaces "People Behind Aarvya" section completely)       */}
      {/* ========================================================= */}
      <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Client Dedication
              </span>
              <h2 className="text-3xl font-poppins font-bold text-[#0B1F3B]">
                Our Commitment to Every Property Journey
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#667085] leading-relaxed">
                Every property decision represents an important milestone. At Aarvya Realty, we focus on making property discovery simpler through clear information, responsive communication and customer-focused assistance.
              </p>
            </div>
          </ScrollAnimation>

          {/* 4 Premium Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitmentBlocks.map((block, i) => {
              const IconComponent = block.icon;
              return (
                <ScrollAnimation key={block.number} animation="slide-up" delay={i * 100} duration={600}>
                  <div className="h-full group bg-white rounded-2xl p-7 sm:p-8 border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-xl bg-[#F5F7FA] group-hover:bg-[#D4AF37] text-[#D4AF37] group-hover:text-white flex items-center justify-center transition-colors duration-200">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="font-poppins font-extrabold text-xl text-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">
                          {block.number}
                        </span>
                      </div>

                      <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-200 mb-3">
                        {block.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#667085] leading-relaxed">
                        {block.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E0E6ED] flex items-center justify-between text-xs font-semibold text-[#D4AF37]">
                      <span>Client Priority</span>
                      <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </div>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8 — FINAL CTA (Slide-up entrance)                 */}
      {/* ========================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="slide-up" duration={650}>
            <div className="bg-[#071629] text-white rounded-2xl p-8 sm:p-14 shadow-card flex flex-col md:flex-row items-center justify-between gap-8 border border-[#14315A]">
              <div className="space-y-3 max-w-xl text-center md:text-left">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block">
                  Next Steps
                </span>
                <h2 className="text-2xl sm:text-4xl font-poppins font-bold !text-white text-white">
                  Let's Find the Right Property for You
                </h2>
                <p className="text-sm text-[#E0E6ED] leading-relaxed">
                  Whether you are looking to buy, rent or explore property opportunities, our team is here to help.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 whitespace-nowrap">
                <Link
                  to="/contact"
                  className="px-7 py-3.5 bg-[#D4AF37] hover:bg-[#B9952D] text-[#0B1F3B] text-xs font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-goldGlow hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/properties"
                  className="px-7 py-3.5 bg-transparent hover:bg-[#0B1F3B] text-white hover:text-[#D4AF37] text-xs font-semibold rounded-lg border border-[#E0E6ED]/40 hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-0.5 text-center"
                >
                  Explore Listings
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
};
