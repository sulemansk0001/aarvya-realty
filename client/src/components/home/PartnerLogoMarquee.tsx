import React from 'react';
import { ShieldCheck, Building2 } from 'lucide-react';

interface PartnerWordmark {
  name: string;
  tagline: string;
  badge: string;
}

export const PartnerLogoMarquee: React.FC = () => {
  const partners: PartnerWordmark[] = [
    { name: 'VISTARA DEVELOPERS', tagline: 'Residential & Commercial', badge: 'VD' },
    { name: 'URBANCREST GROUP', tagline: 'Urban Masterplanning', badge: 'UG' },
    { name: 'NOVA HABITAT', tagline: 'Modern Eco-Living', badge: 'NH' },
    { name: 'ESTATEBRIDGE', tagline: 'Real Estate Ecosystem', badge: 'EB' },
    { name: 'PRIMEHOMES', tagline: 'Community Housing', badge: 'PH' },
    { name: 'AURIC INFRA', tagline: 'Infrastructure & Land', badge: 'AI' },
    { name: 'SKYLINE SPACES', tagline: 'High-Rise Developments', badge: 'SS' },
  ];

  // Duplicate list for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-[#F5F7FA] border-b border-[#E0E6ED] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
          Collaboration & Network
        </span>
        <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#0B1F3B]">
          Collaboration & Network
        </h2>
        <p className="mt-2 text-sm text-[#667085] max-w-2xl mx-auto leading-relaxed">
          Building meaningful connections with professionals and organisations across the real estate ecosystem.
        </p>
      </div>

      {/* Marquee Track Container with pause on hover */}
      <div className="relative w-full overflow-hidden marquee-container py-4">
        {/* Left and right fade gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#F5F7FA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#F5F7FA] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex items-center space-x-8 sm:space-x-12">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex-shrink-0 flex items-center space-x-3.5 px-6 py-3.5 rounded-xl border border-[#E0E6ED] bg-white shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover transition-all duration-300 group cursor-default"
            >
              <div className="w-9 h-9 rounded-lg bg-[#F5F7FA] group-hover:bg-[#0B1F3B] flex items-center justify-center transition-colors">
                <span className="font-poppins font-bold text-xs text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors">
                  {partner.badge}
                </span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-poppins font-extrabold text-sm sm:text-[15px] tracking-wider text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                  {partner.name}
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#667085] font-medium whitespace-nowrap">
                  {partner.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
