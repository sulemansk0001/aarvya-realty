import React, { useState } from 'react';
import { Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../../utils/formatters';
import { EnquiryService } from '../../services/api';
import { ScrollAnimation } from '../common/ScrollAnimation';
import { MagneticFieldButton } from '../buttons/MagneticFieldButton';

export const ConsultantCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    locality: 'Hinjawadi',
    budget: '50L-1Cr',
    message: '',
  });
  const [status, setStatus] = useState<{ loading: boolean; message: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setStatus({ loading: true, message: '', success: false });
    const res = await EnquiryService.submitEnquiry({
      name: formData.name,
      email: `${formData.name.toLowerCase().replace(/\s+/g, '')}@lead.aarvya.in`,
      phone: formData.phone,
      preferredLocality: formData.locality,
      budget: formData.budget,
      message: formData.message || `Consultation request for ${formData.locality}`,
    });

    setStatus({ loading: false, message: res.message, success: res.success });
    if (res.success) {
      setFormData({ name: '', phone: '', locality: 'Hinjawadi', budget: '50L-1Cr', message: '' });
    }
  };

  return (
    <section className="py-20 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="slide-up" duration={650}>
          <div className="bg-white rounded-2xl border border-[#E0E6ED] overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Image & Brand Authority (5 cols on lg) */}
            <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-full">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                alt="Indian Real Estate Property Consultant in Pune"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/95 via-[#0B1F3B]/45 to-transparent p-8 flex flex-col justify-end text-white">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Personalised Advisory
                </span>
                <h3 className="text-2xl font-poppins font-bold text-white mt-1">
                  Aarvya Realty Property Desk
                </h3>
                <p className="text-sm text-[#E0E6ED] mt-2 leading-relaxed">
                  Dedicated Pune real estate advisory team stationed in Hinjewadi Phase 1, assisting you with verified property inventory, site visits, and transparent negotiations.
                </p>

                <div className="mt-4 pt-4 border-t border-white/20 flex flex-col gap-2 text-xs">
                  <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors font-semibold">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <span>Call Us Directly: {COMPANY_DETAILS.phoneDisplay}</span>
                  </a>
                  <div className="flex items-center gap-2 text-[#E0E6ED]">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>{COMPANY_DETAILS.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Enquiry Form (7 cols on lg) */}
            <div className="lg:col-span-7 p-8 sm:p-12">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-1">
                Schedule Free Consultation
              </span>
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-[#0B1F3B]">
                Connect With a Pune Property Expert
              </h3>
              <p className="text-sm text-[#667085] mt-2 mb-8">
                Share your property requirements to receive curated recommendations with zero spam and zero obligation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#0B1F3B] block mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E0E6ED] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all bg-[#F5F7FA] text-[#0B1F3B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#0B1F3B] block mb-1.5">
                      Mobile Number (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E0E6ED] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all bg-[#F5F7FA] text-[#0B1F3B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#0B1F3B] block mb-1.5">
                      Preferred Pune Locality
                    </label>
                    <select
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E0E6ED] text-sm focus:outline-none focus:border-[#D4AF37] bg-[#F5F7FA] text-[#0B1F3B]"
                    >
                      <option value="Hinjawadi">Hinjawadi</option>
                      <option value="Baner">Baner</option>
                      <option value="Wakad">Wakad</option>
                      <option value="Kharadi">Kharadi</option>
                      <option value="Viman Nagar">Viman Nagar</option>
                      <option value="Bavdhan">Bavdhan</option>
                      <option value="Other">Other Maharashtra City</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#0B1F3B] block mb-1.5">
                      Approximate Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E0E6ED] text-sm focus:outline-none focus:border-[#D4AF37] bg-[#F5F7FA] text-[#0B1F3B]"
                    >
                      <option value="Under-50L">Under ₹50 Lakh</option>
                      <option value="50L-1Cr">₹50 Lakh – ₹1 Crore</option>
                      <option value="1Cr-2Cr">₹1 Crore – ₹2 Crore</option>
                      <option value="Above-2Cr">Above ₹2 Crore</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0B1F3B] block mb-1.5">
                    Any Specific Requirements (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 2 BHK near Metro Line 3, ready to move by Diwali"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E0E6ED] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all bg-[#F5F7FA] text-[#0B1F3B]"
                  />
                </div>

                <div className="pt-2">
                  <MagneticFieldButton
                    type="submit"
                    disabled={status?.loading}
                    variant="primary"
                    size="lg"
                    className="w-full flex justify-center"
                    buttonClassName="w-full font-bold shadow-md hover:shadow-goldGlow"
                    icon={<ArrowRight className="w-4 h-4 text-current" />}
                    iconPosition="right"
                    aria-label="Request Priority Callback"
                  >
                    {status?.loading ? 'Sending Request...' : 'Request Priority Callback'}
                  </MagneticFieldButton>
                </div>

                {status && (
                  <div
                    className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                      status.success ? 'bg-amber-50 text-amber-900 border border-[#D4AF37]/50' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {status.success && <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
