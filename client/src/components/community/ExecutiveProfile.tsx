import React from 'react';
import { ShieldCheck, Award, FileCheck2, ArrowRight, Phone, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '../motion/ScrollReveal';
import { ShimmerButton } from '../buttons/ShimmerButton';

export const ExecutiveProfile: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F5F7FA] border-b border-[#E0E6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Editorial Image with Floating Advisory Badge (5 cols) */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal variant="fade-right" duration={750}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E0E6ED] aspect-[4/5] bg-[#071629]">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
                  alt="Aarvya Realty Senior Property Advisory"
                  className="w-full h-full object-cover object-center filter grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/90 via-[#0B1F3B]/30 to-transparent" />

                {/* Bottom Image Caption */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold block mb-1">
                    Advisory Practice
                  </span>
                  <h4 className="font-poppins font-bold text-lg text-white">
                    Client-First Representation
                  </h4>
                  <p className="text-xs text-[#E0E6ED] mt-1">
                    Rooted in Hinjawadi, Pune. Serving Pune & Western Maharashtra.
                  </p>
                </div>
              </div>

              {/* Floating RERA Seal Pill */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 bg-white text-[#0B1F3B] px-4 py-3 rounded-xl shadow-float border border-[#E0E6ED] flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] border border-[#E0E6ED] flex items-center justify-center text-[#D4AF37]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider block">
                    Advisory Standard
                  </span>
                  <span className="text-xs font-bold font-poppins text-[#0B1F3B]">
                    MahaRERA Compliant
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Editorial Story & Credentials (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <ScrollReveal variant="fade-left" duration={750}>
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.16em]">
                  OUR ETHOS & COMMITMENT
                </span>
                <span className="text-[10px] bg-[#F5F7FA] text-[#0B1F3B] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-medium">
                  Pune, India
                </span>
              </div>

              <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-[#0B1F3B] leading-tight">
                Realty Advisory Built on Integrity, Diligence & Precision
              </h2>

              <p className="text-sm sm:text-base text-[#667085] mt-4 leading-relaxed">
                At Aarvya Realty, we believe discovering a home or acquiring a commercial asset is one of life’s most pivotal financial milestones. In an industry often clouded by noise and conflicting sales pressures, our practice is grounded in genuine fiduciary advisory.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-[#E0E6ED] shadow-sm">
                  <div className="flex items-center gap-2 text-[#D4AF37] mb-1.5 font-bold text-xs">
                    <FileCheck2 className="w-4 h-4" />
                    <span className="text-[#0B1F3B]">Title & Legal Verification</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Every project undergoes strict 7/12 extract checks, commencement certificates scrutiny, and MahaRERA validation.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E0E6ED] shadow-sm">
                  <div className="flex items-center gap-2 text-[#D4AF37] mb-1.5 font-bold text-xs">
                    <Award className="w-4 h-4" />
                    <span className="text-[#0B1F3B]">Zero Brokerage on New Projects</span>
                  </div>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    Direct developer price parity with transparent documentation and end-to-end loan sanction facilitation.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 pt-2">
                <ShimmerButton
                  to="/about"
                  variant="primary"
                  size="md"
                  magnetic={true}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Learn More About Aarvya
                </ShimmerButton>

                <ShimmerButton
                  to="/contact"
                  variant="outline"
                  size="md"
                  className="border-[#D4AF37] text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-white"
                  icon={<Phone className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  iconPosition="left"
                >
                  Schedule Private Consultation
                </ShimmerButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
