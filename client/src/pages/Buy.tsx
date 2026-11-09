import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, Building2, MapPin, Calculator, Phone } from 'lucide-react';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Buy: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Define Requirements & Budget',
      desc: 'Assess your family space requirements, daily commute parameters to Hinjawadi or Magarpatta, and your realistic budget using our home loan calculator.',
    },
    {
      num: '02',
      title: 'Curated Property Shortlist',
      desc: 'Receive transparent, unvarnished guidance on verified properties across Baner, Wakad, Kharadi, and Bavdhan without misleading advertisements.',
    },
    {
      num: '03',
      title: 'Escorted Site Visits',
      desc: 'Our local Pune property consultants accompany you on site inspections, pointing out carpet area realities, ventilation, and neighbourhood infrastructure.',
    },
    {
      num: '04',
      title: 'Documentation & Title Clarity',
      desc: 'Comprehensive scrutiny of parent deeds, sanction plans, encumbrance certificates, and developer agreements to safeguard your investment.',
    },
    {
      num: '05',
      title: 'Stamp Duty & Registration Support',
      desc: 'Full assistance with Maharashtra stamp duty (7% in Pune PMC/PCMC), sub-registrar appointment booking, and seamless handover of your new home.',
    },
  ];

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-white rounded-2xl border border-[#E0E6ED] p-8 sm:p-14 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block">
                Buy With Confidence
              </span>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Buy Your Ideal Home in Pune, Maharashtra
              </h1>
              <p className="text-sm text-[#667085] leading-relaxed">
                Purchasing real estate is one of life’s most significant decisions. At Aarvya Realty, we act as your trusted buyer’s advocate—ensuring verified property listings, transparent price discovery, and zero pressure tactics.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/properties?type=For+Sale"
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded transition-colors"
                >
                  Browse Homes For Sale
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-[#F5F7FA] hover:bg-neutral-200 text-[#0B1F3B] text-xs font-semibold rounded border border-[#E0E6ED] transition-colors"
                >
                  Book Advisory Call
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 aspect-[4/3] rounded-2xl overflow-hidden shadow-subtle border border-[#E0E6ED] group">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
                alt="Pune Residential Apartments"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </ScrollAnimation>

        {/* 5-Step Buying Process */}
        <div className="mb-16">
          <ScrollAnimation animation="fade-in" duration={500}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-1">
                Methodology
              </span>
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-[#0B1F3B]">
                The Aarvya 5-Step Homebuying Process
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((st, idx) => (
              <ScrollAnimation key={st.num} animation="slide-up" delay={idx * 80} duration={550}>
                <div className="h-full group bg-white p-6 rounded-xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <span className="text-2xl font-bold font-poppins text-[#D4AF37] group-hover:text-[#D4AF37] transition-colors block mb-2">{st.num}</span>
                    <h3 className="font-poppins font-bold text-sm text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-2">{st.title}</h3>
                    <p className="text-xs text-[#667085] leading-relaxed">{st.desc}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Legal & Stamp Duty Checklist */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-[#F5F7FA] p-8 rounded-xl border border-[#E0E6ED] shadow-subtle mb-16">
            <h3 className="text-xl font-poppins font-bold text-[#0B1F3B] mb-4">
              Key Costs to Factor When Buying Property in Pune
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#0B1F3B]">
              <div className="bg-white p-5 rounded-lg border border-[#E0E6ED]">
                <span className="font-bold text-sm text-[#D4AF37] block mb-1">Maharashtra Stamp Duty</span>
                <p className="text-[#667085] leading-relaxed">
                  Currently 7% in Pune (inclusive of 5% basic stamp duty + 1% Local Body Tax + 1% Metro Cess). Payable before registration.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-[#E0E6ED]">
                <span className="font-bold text-sm text-[#D4AF37] block mb-1">Registration Fee</span>
                <p className="text-[#667085] leading-relaxed">
                  1% of property agreement value, capped at ₹30,000 for properties valued above ₹30 Lakh in Maharashtra.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg border border-[#E0E6ED]">
                <span className="font-bold text-sm text-[#D4AF37] block mb-1">Zero GST on Ready Homes</span>
                <p className="text-[#667085] leading-relaxed">
                  Completed properties with Occupancy Certificate (OC) attract 0% GST. Under-construction homes attract 5% (or 1% for affordable).
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};
