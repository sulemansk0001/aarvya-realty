import React from 'react';
import { Building2, ShieldCheck, Users, Award, Sparkles } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { ScrollReveal } from '../motion/ScrollReveal';

export const PARTNER_LOGOS = [
  { name: 'VISTARA DEVELOPERS', subtitle: 'Integrated Townships & High-Rises' },
  { name: 'URBANCREST GROUP', subtitle: 'Boutique Luxury Residences' },
  { name: 'NOVA HABITAT', subtitle: 'Sustainable Urban Communities' },
  { name: 'ESTATEBRIDGE', subtitle: 'Commercial IT Hubs & Campuses' },
  { name: 'PRIMEHOMES', subtitle: 'Premium Pune Suburb Homes' },
  { name: 'AURIC INFRA', subtitle: 'Gated Hillside & Riverfront Villas' },
  { name: 'SKYLINE SPACES', subtitle: 'Grade-A Commercial Towers' },
];

export const TrustMetricsTicker: React.FC = () => {
  return (
    <section className="bg-white border-y border-[#E0E6ED] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4 Metrics Grid with Animated Counter */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-12 border-b border-[#E0E6ED]">
          {/* Stat 1 */}
          <ScrollReveal variant="fade-up" delay={0} duration={600} className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#D4AF37] mb-1.5">
              <Building2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                Portfolio Advised
              </span>
            </div>
            <div className="text-3xl sm:text-4xl text-[#0B1F3B]">
              <AnimatedCounter value={1450} prefix="₹" suffix="+ Cr" />
            </div>
            <p className="mt-1 text-xs text-[#667085]">
              Verified residential & commercial value across Maharashtra.
            </p>
          </ScrollReveal>

          {/* Stat 2 */}
          <ScrollReveal variant="fade-up" delay={80} duration={600} className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#D4AF37] mb-1.5">
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                Families Advised
              </span>
            </div>
            <div className="text-3xl sm:text-4xl text-[#0B1F3B]">
              <AnimatedCounter value={2850} suffix="+" />
            </div>
            <p className="mt-1 text-xs text-[#667085]">
              Homebuyers, NRI investors & commercial clients in Pune.
            </p>
          </ScrollReveal>

          {/* Stat 3 */}
          <ScrollReveal variant="fade-up" delay={160} duration={600} className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#D4AF37] mb-1.5">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                Legal Due Diligence
              </span>
            </div>
            <div className="text-3xl sm:text-4xl text-[#0B1F3B]">
              <AnimatedCounter value={99.2} suffix="%" decimals={1} />
            </div>
            <p className="mt-1 text-xs text-[#667085]">
              RERA registered projects with verified clear titles.
            </p>
          </ScrollReveal>

          {/* Stat 4 */}
          <ScrollReveal variant="fade-up" delay={240} duration={600} className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[#D4AF37] mb-1.5">
              <Award className="w-5 h-5 flex-shrink-0" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">
                Local Presence
              </span>
            </div>
            <div className="text-3xl sm:text-4xl text-[#0B1F3B]">
              <AnimatedCounter value={15} suffix="+ Years" />
            </div>
            <p className="mt-1 text-xs text-[#667085]">
              Deep expertise in Pune corridors & Western Maharashtra.
            </p>
          </ScrollReveal>
        </div>

        {/* Developer Network Marquee Header */}
        <div className="pt-10 pb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5F7FA] border border-[#E0E6ED] text-[11px] text-[#667085] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Trusted Developer Ecosystem &bull; Continuous Alliance</span>
          </div>
          <h3 className="font-poppins font-bold text-xl sm:text-2xl text-[#0B1F3B]">
            Partnering With Maharashtra's Premier Builders
          </h3>
        </div>
      </div>

      {/* Marquee Track (Smooth Infinite Scroller, GPU accelerated) */}
      <div className="partner-marquee-container relative w-full overflow-hidden mt-3 py-4 bg-[#F5F7FA] border-y border-[#E0E6ED]">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#F5F7FA] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#F5F7FA] to-transparent" />

        <div className="partner-marquee-track flex items-center">
          {/* Double list for seamless loop */}
          {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 mx-6 sm:mx-8 px-6 py-3.5 rounded-lg bg-white border border-[#E0E6ED] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-[#F5F7FA] group-hover:bg-[#0B1F3B] transition-colors flex items-center justify-center text-[#D4AF37]">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-xs sm:text-sm tracking-wider text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-[10px] text-[#667085] font-normal">
                    {partner.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
