import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS, isValidIndianMobile } from '../utils/formatters';
import { EnquiryService } from '../services/api';
import { ScrollAnimation } from '../components/common/ScrollAnimation';
import { MagneticFieldButton } from '../components/buttons/MagneticFieldButton';

export const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interestedIn: 'Buying Residential Property',
    preferredCity: 'Pune',
    preferredLocality: 'Hinjawadi',
    budget: '₹50 Lakh – ₹1 Crore',
    message: '',
  });

  const [status, setStatus] = useState<{ loading: boolean; message: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidIndianMobile(formData.phone)) {
      setStatus({
        loading: false,
        message: 'Please provide a valid 10-digit Indian mobile number (+91).',
        success: false,
      });
      return;
    }

    setStatus({ loading: true, message: '', success: false });

    const res = await EnquiryService.submitEnquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      interestedIn: formData.interestedIn,
      preferredCity: formData.preferredCity,
      preferredLocality: formData.preferredLocality,
      budget: formData.budget,
      message: formData.message || `General enquiry from ${formData.name}`,
    });

    setStatus({ loading: false, message: res.message, success: res.success });
    if (res.success) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        interestedIn: 'Buying Residential Property',
        preferredCity: 'Pune',
        preferredLocality: 'Hinjawadi',
        budget: '₹50 Lakh – ₹1 Crore',
        message: '',
      });
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              Connect With Aarvya Realty
            </h1>
            <p className="mt-3 text-base text-[#667085]">
              Visit our office in Hinjewadi Phase 1, call our Pune advisory desk directly, or submit your property requirements below.
            </p>
          </div>
        </ScrollAnimation>

        {/* 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Office Details (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollAnimation animation="slide-left" duration={600}>
              <div className="bg-white p-7 rounded-xl border border-[#E0E6ED] shadow-subtle space-y-6">
                <h3 className="font-poppins font-bold text-xl text-[#0B1F3B] pb-3 border-b border-[#E0E6ED]">
                  Pune Headquarters
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#667085] uppercase block">Office Location</span>
                    <p className="text-sm font-medium text-[#0B1F3B] mt-0.5">
                      {COMPANY_DETAILS.address}
                    </p>
                    <span className="text-xs text-[#667085]">Rajiv Gandhi Infotech Park corridor</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#667085] uppercase block">Advisory Desk Telephone</span>
                    <a
                      href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                      className="text-base font-bold text-[#0B1F3B] hover:text-[#D4AF37] transition-colors mt-0.5 block"
                    >
                      {COMPANY_DETAILS.phoneDisplay}
                    </a>
                    <span className="text-xs text-[#667085]">Mon to Sat &bull; 9:30 AM to 7:30 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#667085] uppercase block">Official Email</span>
                    <a
                      href={`mailto:${COMPANY_DETAILS.email}`}
                      className="text-sm font-medium text-[#0B1F3B] hover:text-[#D4AF37] transition-colors mt-0.5 block"
                    >
                      {COMPANY_DETAILS.email}
                    </a>
                    <span className="text-xs text-[#667085]">Direct response within 4 working hours</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#667085] uppercase block">Consultancy Hours</span>
                    <p className="text-xs text-[#0B1F3B] mt-0.5">{COMPANY_DETAILS.workingHours}</p>
                    <p className="text-xs text-[#667085]">{COMPANY_DETAILS.sundayHours}</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Google Map Embed of Hinjewadi Phase 1, Pune */}
            <ScrollAnimation animation="fade-in" delay={150} duration={600}>
              <div className="bg-white rounded-xl border border-[#E0E6ED] overflow-hidden shadow-subtle aspect-[16/10]">
                <iframe
                  title="Aarvya Realty Location Map - Hinjewadi Phase 1 Pune"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15127.810557436066!2d73.72591645000001!3d18.59473215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b963bfbfbe85%3A0xc47e3039d5e35e72!2sHinjawadi%20Phase%201%2C%20Hinjawadi%2C%20Pimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column: Contact Enquiry Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ScrollAnimation animation="slide-right" delay={100} duration={650}>
              <div className="bg-white p-8 sm:p-10 rounded-xl border border-[#E0E6ED] shadow-card">
                <h2 className="text-2xl font-poppins font-bold text-[#0B1F3B] mb-2">
                  Send Property Requirement
                </h2>
                <p className="text-xs text-[#667085] mb-6">
                  Fill in your criteria and our property advisors will compile verified Pune options for your review.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                        Indian Mobile Number (+91) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="98XXXXXXXX"
                        className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                        I Am Interested In
                      </label>
                      <select
                        value={formData.interestedIn}
                        onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Buying Residential Property">Buying Residential Property</option>
                        <option value="Renting Apartment">Renting an Apartment</option>
                        <option value="Selling Property">Selling My Property</option>
                        <option value="Commercial Office / Shop">Commercial Office / Shop</option>
                        <option value="Home Loan Guidance">Home Loan Guidance</option>
                        <option value="General Consultation">General Consultation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                        Preferred Pune Locality
                      </label>
                      <select
                        value={formData.preferredLocality}
                        onChange={(e) => setFormData({ ...formData, preferredLocality: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Hinjawadi">Hinjawadi (Phase 1, 2, 3)</option>
                        <option value="Baner">Baner</option>
                        <option value="Wakad">Wakad</option>
                        <option value="Kharadi">Kharadi</option>
                        <option value="Viman Nagar">Viman Nagar</option>
                        <option value="Kothrud">Kothrud</option>
                        <option value="Bavdhan">Bavdhan</option>
                        <option value="Pimple Saudagar">Pimple Saudagar</option>
                        <option value="Other Maharashtra City">Other Maharashtra City</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                      Budget Expectation (INR)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="Under ₹50 Lakh">Under ₹50 Lakh</option>
                      <option value="₹50 Lakh – ₹1 Crore">₹50 Lakh – ₹1 Crore</option>
                      <option value="₹1 Crore – ₹1.5 Crore">₹1 Crore – ₹1.5 Crore</option>
                      <option value="₹1.5 Crore – ₹2.5 Crore">₹1.5 Crore – ₹2.5 Crore</option>
                      <option value="₹2.5 Crore & Above">₹2.5 Crore & Above</option>
                      <option value="Rental ₹20,000 – ₹50,000/mo">Rental ₹20,000 – ₹50,000/mo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                      Message / Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share details like preferred floor, possession timeframe, or society names you are exploring..."
                      className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <MagneticFieldButton
                      type="submit"
                      disabled={status?.loading}
                      variant="gold"
                      size="lg"
                      className="w-full flex justify-center"
                      buttonClassName="w-full font-bold shadow-md hover:shadow-goldGlow text-[#0B1F3B]"
                      icon={<ArrowRight className="w-4 h-4 text-[#0B1F3B]" />}
                      iconPosition="right"
                      aria-label="Submit Requirement to Pune Desk"
                    >
                      {status?.loading ? 'Submitting Requirement...' : 'Submit Requirement to Pune Desk'}
                    </MagneticFieldButton>
                  </div>

                  {status && (
                    <div className={`p-3.5 rounded text-xs flex items-start gap-2 ${status.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800'}`}>
                      {status.success && <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />}
                      <span>{status.message}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-[#667085] flex items-center gap-1.5 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Your contact details are strictly used for your property requirement. No marketing spam.</span>
                  </p>
                </form>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};
