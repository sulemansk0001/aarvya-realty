import React from 'react';
import { Compass, FileCheck2, MessagesSquare, HeartHandshake } from 'lucide-react';
import { ScrollAnimation } from '../common/ScrollAnimation';
import { GlassShineCard } from '../common/GlassShineCard';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Compass,
      title: 'Local Market Understanding',
      description:
        'Ground-level knowledge of Pune’s distinct residential pockets, IT corridors, infrastructure blueprints, and emerging growth corridors across Maharashtra.',
    },
    {
      icon: FileCheck2,
      title: 'Property Guidance',
      description:
        'Unbiased, data-backed advisory on carpet area ratios, project viability, builder track records, and realistic rental yield projections for informed choices.',
    },
    {
      icon: MessagesSquare,
      title: 'Transparent Communication',
      description:
        'Straightforward pricing, complete documentation review, and zero hidden costs. What you discuss is exactly what you get at every phase.',
    },
    {
      icon: HeartHandshake,
      title: 'Customer-Focused Service',
      description:
        'Dedicated assistance throughout the home-buying journey—from curated property shortlists and escorted site visits to agreement assistance and key handover.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#E0E6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              The Aarvya Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              Why Choose Aarvya Realty?
            </h2>
            <p className="mt-3 text-base text-[#667085]">
              A principled, consultative approach to real estate advisory designed around your homeownership aspirations in Pune.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <ScrollAnimation key={index} animation="slide-up" delay={index * 100} duration={600}>
                <GlassShineCard
                  variant="white"
                  className="h-full p-7 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cardHover"
                  data-cursor="card"
                >
                  <div>
                    <div className="w-12 h-12 rounded-lg bg-white border border-[#E0E6ED] text-[#D4AF37] group-hover:bg-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors flex items-center justify-center mb-5 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#667085] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#E0E6ED] text-xs font-semibold text-[#D4AF37]">
                    Pillar 0{index + 1}
                  </div>
                </GlassShineCard>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
};
