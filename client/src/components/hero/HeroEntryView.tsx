import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Sparkles, CheckCircle, MapPin, Building2 } from 'lucide-react';
import { SplitTextReveal } from '../typography/SplitTextReveal';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ShimmerButton } from '../buttons/ShimmerButton';
import { MagneticFieldButton } from '../buttons/MagneticFieldButton';
import { PropertySearch } from '../home/PropertySearch';

export const HeroEntryView: React.FC = () => {
  const [floatingCardVisible, setFloatingCardVisible] = useState(false);

  return (
    <section className="relative min-h-[680px] lg:min-h-[760px] flex items-center justify-center bg-[#071629] text-white overflow-hidden py-16 sm:py-24">
      {/* Background with 8-12s subtle architectural Ken Burns scale */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2200&q=85"
          alt="Luxury Architectural Residences in Pune, Maharashtra"
          className="w-full h-full object-cover object-center motion-ken-burns transform-gpu"
          loading="eager"
          // @ts-ignore
          fetchPriority="high"
        />
        {/* Editorial Multi-layered Deep Navy Vignette & Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071629]/95 via-[#0B1F3B]/75 to-[#071629]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071629] via-transparent to-[#071629]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        {/* Top Micro-Pill Badge */}
        <ScrollReveal variant="fade-down" duration={600} delay={50}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/30 text-xs text-[#F5E6BD] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-medium tracking-wide">
              Pune & Maharashtra Property Advisory &bull; Hinjawadi Phase 1
            </span>
          </div>
        </ScrollReveal>

        {/* H1 Masked Word Reveal */}
        <div className="max-w-4xl mx-auto">
          <SplitTextReveal
            as="h1"
            className="font-poppins font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight"
            staggerMs={50}
            initialDelayMs={120}
          >
            Find Your Place. Build Your Future in Pune.
          </SplitTextReveal>
        </div>

        {/* Supporting Editorial Paragraph */}
        <ScrollReveal variant="fade-up" duration={700} delay={240}>
          <p className="mt-5 text-base sm:text-lg text-[#E0E6ED] max-w-2xl mx-auto font-normal leading-relaxed">
            Curated high-rise apartments, luxury villas, and vetted commercial spaces across prime micro-markets in Pune and Maharashtra.
          </p>
        </ScrollReveal>

        {/* Action CTAs */}
        <ScrollReveal variant="fade-up" duration={700} delay={320}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            {/* Primary Action Button (Magnetic Field Luxury Gold CTA) */}
            <MagneticFieldButton
              to="/properties"
              variant="gold"
              size="md"
              icon={<ArrowRight className="w-4 h-4 text-[#0B1F3B]" />}
              iconPosition="right"
              aria-label="Explore All Properties"
            >
              Explore All Properties
            </MagneticFieldButton>

            {/* Secondary Consult Action */}
            <MagneticFieldButton
              to="/contact"
              variant="outline"
              size="md"
              buttonClassName="border-[#D4AF37] text-white hover:bg-white hover:text-[#0B1F3B]"
              icon={<Phone className="w-3.5 h-3.5 text-[#D4AF37]" />}
              iconPosition="left"
              aria-label="Consult Pune Advisors"
            >
              Consult Pune Advisors
            </MagneticFieldButton>

            {/* Interactive Floating Card Trigger Pill */}
            <div
              className="relative inline-block"
              onMouseEnter={() => setFloatingCardVisible(true)}
              onMouseLeave={() => setFloatingCardVisible(false)}
            >
              <button
                type="button"
                onClick={() => setFloatingCardVisible((prev) => !prev)}
                className="px-4 py-3 bg-[#0B1F3B]/80 hover:bg-[#0B1F3B] backdrop-blur-md text-[#D4AF37] hover:text-white font-medium text-xs sm:text-sm rounded-lg border border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Featured Pick: Baner 2 BHK</span>
              </button>

              {/* Floating Content Card */}
              {floatingCardVisible && (
                <div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 bg-white text-[#0B1F3B] rounded-xl shadow-float border border-[#E0E6ED] p-3.5 text-left z-30 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                      alt="Baner Luxury Apartment"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute top-2 left-2 bg-[#0B1F3B] text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm border border-[#D4AF37]/30">
                      Featured Pick
                    </span>
                    <span className="absolute bottom-2 right-2 bg-[#0B1F3B]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      ₹85 Lakh
                    </span>
                  </div>
                  <h4 className="font-poppins font-bold text-xs text-[#0B1F3B] leading-tight">
                    Premium 2 BHK Modern Apartment
                  </h4>
                  <p className="text-[11px] text-[#667085] mt-1 line-clamp-2">
                    Near Pan Card Club Road, Baner, Pune. Modular kitchen & scenic balcony.
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-[#E0E6ED] flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#D4AF37]">
                      1,050 sq.ft. &bull; Ready to Move
                    </span>
                    <Link
                      to="/properties/premium-2-bhk-apartment-baner"
                      className="text-xs font-bold text-[#0B1F3B] hover:text-[#D4AF37] flex items-center gap-0.5"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Key Trust Micro-pills */}
        <ScrollReveal variant="fade-up" duration={700} delay={400}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-xs text-[#E0E6ED]">
            <span className="flex items-center gap-1.5 bg-[#071629]/60 backdrop-blur-sm px-3.5 py-1.5 rounded-md border border-[#E0E6ED]/15">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Verified Local Inventory</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#071629]/60 backdrop-blur-sm px-3.5 py-1.5 rounded-md border border-[#E0E6ED]/15">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Zero Unsolicited Broker Calls</span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#071629]/60 backdrop-blur-sm px-3.5 py-1.5 rounded-md border border-[#E0E6ED]/15">
              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>RERA Registered Developers</span>
            </span>
          </div>
        </ScrollReveal>

        {/* Property Search Bar Interface */}
        <ScrollReveal variant="fade-up" duration={800} delay={480}>
          <div className="mt-9">
            <PropertySearch />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
