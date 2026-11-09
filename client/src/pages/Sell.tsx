import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { EnquiryService } from '../services/api';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Sell: React.FC = () => {
  const [valuationForm, setValuationForm] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Apartment',
    locality: 'Baner',
    bhk: '2 BHK',
    carpetArea: '',
    expectedPrice: '',
  });
  const [status, setStatus] = useState<{ loading: boolean; message: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valuationForm.name || !valuationForm.phone) return;

    setStatus({ loading: true, message: '', success: false });
    const res = await EnquiryService.submitEnquiry({
      name: valuationForm.name,
      email: valuationForm.email || `${valuationForm.name.toLowerCase().replace(/\s+/g, '')}@seller.aarvya.in`,
      phone: valuationForm.phone,
      preferredLocality: valuationForm.locality,
      message: `Seller valuation request: ${valuationForm.bhk} ${valuationForm.propertyType} in ${valuationForm.locality}. Carpet: ${valuationForm.carpetArea} sq.ft. Expected: ${valuationForm.expectedPrice}`,
    });

    setStatus({ loading: false, message: res.message, success: res.success });
    if (res.success) {
      setValuationForm({
        name: '',
        phone: '',
        email: '',
        propertyType: 'Apartment',
        locality: 'Baner',
        bhk: '2 BHK',
        carpetArea: '',
        expectedPrice: '',
      });
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-[#071629] text-white rounded-2xl p-8 sm:p-14 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block">
                Maximize Your Property Value
              </span>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white">
                Sell Your Property in Pune With Aarvya Realty
              </h1>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Achieve optimal market pricing for your residential apartment, villa, or commercial space. We connect your asset directly to verified, pre-qualified buyers across Pune and Maharashtra with zero spam inquiries.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  to="/add-property"
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Property Online Now</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white text-[#0B1F3B] p-6 rounded-xl border border-[#E0E6ED] shadow-subtle">
              <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] mb-1">
                Request Free Property Valuation
              </h3>
              <p className="text-xs text-[#667085] mb-4">
                Get an accurate estimate of prevailing sq. ft. market rates in your Pune society.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={valuationForm.name}
                    onChange={(e) => setValuationForm({ ...valuationForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Indian Mobile (+91) *"
                    value={valuationForm.phone}
                    onChange={(e) => setValuationForm({ ...valuationForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                  />
                  <select
                    value={valuationForm.locality}
                    onChange={(e) => setValuationForm({ ...valuationForm, locality: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B]"
                  >
                    <option value="Baner">Baner</option>
                    <option value="Wakad">Wakad</option>
                    <option value="Hinjawadi">Hinjawadi</option>
                    <option value="Kharadi">Kharadi</option>
                    <option value="Viman Nagar">Viman Nagar</option>
                    <option value="Kothrud">Kothrud</option>
                    <option value="Bavdhan">Bavdhan</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={valuationForm.bhk}
                    onChange={(e) => setValuationForm({ ...valuationForm, bhk: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B]"
                  >
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Carpet Area (sq.ft.)"
                    value={valuationForm.carpetArea}
                    onChange={(e) => setValuationForm({ ...valuationForm, carpetArea: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status?.loading}
                  className="w-full py-3 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-bold rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
                >
                  Get Pune Valuation Analysis
                </button>

                {status && (
                  <p className={`text-xs p-2.5 rounded ${status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </ScrollAnimation>

        {/* Why Sell Through Aarvya Realty */}
        <div className="mb-16">
          <ScrollAnimation animation="fade-in" duration={500}>
            <h2 className="text-2xl font-poppins font-bold text-[#0B1F3B] text-center mb-10">
              Why Property Sellers in Pune Choose Aarvya Realty
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation animation="slide-up" delay={0} duration={600}>
              <div className="h-full group bg-white p-7 rounded-2xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-[#D4AF37] mb-4 transition-transform group-hover:scale-110" />
                <h3 className="font-poppins font-bold text-base text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-2">
                  Realistic Market Pricing
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  We analyze genuine registered agreement transaction values in your locality—not exaggerated speculative asking prices—ensuring faster closures.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={120} duration={600}>
              <div className="h-full group bg-white p-7 rounded-2xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300">
                <ShieldCheck className="w-8 h-8 text-[#D4AF37] mb-4 transition-transform group-hover:scale-110" />
                <h3 className="font-poppins font-bold text-base text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-2">
                  Pre-Screened Indian Buyers
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Only financially pre-qualified purchasers and IT corporate executives are escorted for physical site visits, protecting your home's privacy.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={240} duration={600}>
              <div className="h-full group bg-white p-7 rounded-2xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1.5 hover:shadow-cardHover transition-all duration-300">
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37] mb-4 transition-transform group-hover:scale-110" />
                <h3 className="font-poppins font-bold text-base text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors mb-2">
                  End-to-End Legal Closure
                </h3>
                <p className="text-xs text-[#667085] leading-relaxed">
                  From drafting the Agreement to Sale to NOC procurement from your housing society and final registration at the Haveli sub-registrar office.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};
