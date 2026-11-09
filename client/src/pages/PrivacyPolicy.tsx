import React from 'react';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E0E6ED] shadow-card">
            <h1 className="text-3xl font-poppins font-bold text-[#0B1F3B] mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#667085] mb-8">
              Last Updated: March 2026 &bull; Aarvya Realty, Pune, Maharashtra
            </p>

            <div className="space-y-6 text-sm text-[#0B1F3B] leading-relaxed">
              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">1. Introduction</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Aarvya Realty ("we," "our," or "us"), located at {COMPANY_DETAILS.address}, respects your privacy and is dedicated to protecting personal information collected through our website, property enquiry forms, and consultancy interactions in compliance with applicable Indian information technology laws.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">2. Information We Collect</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  We collect information provided directly by you when submitting property inquiries, scheduling site inspections, using the home loan calculator, or subscribing to our newsletters. This includes: Full Name, Indian Mobile Phone Number, Email Address, Locality preferences, and Budget expectations.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">3. Purpose and Use of Information</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Your details are used exclusively to provide tailored property shortlists, coordinate escorted site visits with verified property owners or developers in Pune, respond to customer inquiries, and deliver relevant real estate market updates. We do not sell or trade your personal data to third-party telemarketers.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">4. Data Security</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  We maintain administrative, technical, and physical safeguards designed to protect personal data against accidental, unlawful, or unauthorized destruction, loss, alteration, access, or disclosure.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">5. Contact Information</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  If you have any questions or concerns regarding this Privacy Policy, please contact our Pune office at {COMPANY_DETAILS.email} or call {COMPANY_DETAILS.phoneDisplay}.
                </p>
              </section>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};
