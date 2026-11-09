import React from 'react';
import { Building, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';
import { formatINR } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Portfolio: React.FC = () => {
  const soldProjects = [
    {
      id: 'sold-1',
      title: 'Solitaire Enclave 3 BHK Flat',
      locality: 'Baner, Pune',
      type: 'Residential Apartment',
      transaction: 'Sold & Handed Over',
      price: 11500000,
      area: '1,380 sq. ft.',
      date: 'December 2025',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      note: 'Facilitated seamless negotiation and title handover for an IT executive family relocating from Bengaluru.',
    },
    {
      id: 'sold-2',
      title: 'Grandeur Horizon 2 BHK Residence',
      locality: 'Kharadi, Pune',
      type: 'Residential Apartment',
      transaction: 'Sold & Handed Over',
      price: 8800000,
      area: '1,060 sq. ft.',
      date: 'November 2025',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      note: 'Closed within 18 days of mandate with 100% bank loan sanction assistance from SBI.',
    },
    {
      id: 'sold-3',
      title: 'Hillview Modern Villa',
      locality: 'Bavdhan, Pune',
      type: 'Independent Villa',
      transaction: 'Sold & Handed Over',
      price: 24500000,
      area: '2,900 sq. ft.',
      date: 'October 2025',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
      note: 'Discreet high-value transaction representing both owner and buyer with zero publicity leaks.',
    },
    {
      id: 'sold-4',
      title: 'TechPark Fitted Corporate Office',
      locality: 'Hinjawadi Phase 1, Pune',
      type: 'Commercial Office Space',
      transaction: 'Leased & Handed Over',
      price: 180000,
      area: '3,200 sq. ft.',
      date: 'January 2026',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      note: 'Long-term 5-year institutional lease executed for an AI SaaS enterprise expanding in Pune.',
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
                Track Record
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300/60 px-2 py-0.5 rounded font-medium">
                Demonstration Portfolio
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              Completed Transactions & Portfolio
            </h1>
            <p className="mt-3 text-base text-[#667085]">
              A showcase of representative residential and commercial property closures completed across Pune and Maharashtra.
            </p>
          </div>
        </ScrollAnimation>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {soldProjects.map((item, idx) => (
            <ScrollAnimation key={item.id} animation="slide-up" delay={idx * 120} duration={600}>
              <div
                className="h-full group bg-white rounded-2xl border border-[#E0E6ED] overflow-hidden shadow-subtle hover:border-[#D4AF37] hover:shadow-cardHover hover:-translate-y-1.5 transition-all duration-300 flex flex-col sm:flex-row"
              >
                <div className="sm:w-56 aspect-[16/10] sm:aspect-auto relative flex-shrink-0 overflow-hidden bg-neutral-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 bg-green-700 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow">
                    {item.transaction}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#667085] mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{item.locality}</span>
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#667085] mt-2 leading-relaxed">
                      {item.note}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E0E6ED] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#667085] block">Transaction Value</span>
                      <span className="font-bold text-[#D4AF37] font-poppins text-sm">
                        {formatINR(item.price)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#667085] block">Handover Date</span>
                      <span className="font-semibold text-[#0B1F3B]">{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </div>
  );
};
