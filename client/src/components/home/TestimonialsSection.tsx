import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { MOCK_TESTIMONIALS } from '../../data/mockData';
import { ScrollAnimation } from '../common/ScrollAnimation';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#F5F7FA] border-b border-[#E0E6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest">
                Client Feedback
              </span>
              <span className="text-[10px] bg-white text-[#0B1F3B] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-medium shadow-sm">
                Demonstration Showcase
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-base text-[#667085]">
              Hear how our consultative real estate advisory helped families and professionals secure their ideal property in Pune.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_TESTIMONIALS.map((item, idx) => (
            <ScrollAnimation key={item.id} animation="slide-up" delay={idx * 120} duration={600}>
              <div className="h-full bg-white rounded-xl p-7 border border-[#E0E6ED] shadow-subtle hover:shadow-cardHover hover:border-[#D4AF37] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" data-cursor="card">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#E0E6ED]" />
                  </div>

                  <p className="text-sm text-[#0B1F3B] leading-relaxed mb-6 italic">
                    "{item.review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E0E6ED] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0B1F3B] text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-poppins font-bold text-[#0B1F3B] truncate">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-1 text-xs text-[#667085]">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{item.locality}, {item.city}</span>
                    </div>
                    <span className="text-[11px] text-[#D4AF37] font-medium block truncate">
                      {item.propertyType}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};
