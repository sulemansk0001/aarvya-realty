import React from 'react';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Terms: React.FC = () => {
  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#E0E6ED] shadow-card">
            <h1 className="text-3xl font-poppins font-bold text-[#0B1F3B] mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xs text-[#667085] mb-8">
              Last Updated: March 2026 &bull; Aarvya Realty, Pune, Maharashtra
            </p>

            <div className="space-y-6 text-sm text-[#0B1F3B] leading-relaxed">
              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">1. Acceptance of Terms</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations of Maharashtra, India.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">2. Nature of Service & Disclaimers</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Aarvya Realty operates as an independent property marketing, consultancy, and real estate advisory platform. Information provided on this website, including property configurations, amenities, and pricing in Indian Rupees (INR), is intended for informational and illustrative demonstration purposes. Prospective purchasers are advised to independently verify all statutory sanctions, title deeds, encumbrances, and project details prior to execution of binding legal documents.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">3. Home Loan / EMI Estimations</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  Calculations made using the on-site Home Loan EMI Calculator are indicative approximations based on standard reducing-balance mathematical formulas and do not constitute an offer of credit, bank pre-approval, or legal or financial advice.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-poppins font-bold text-[#0B1F3B] mb-2">4. Governing Law & Jurisdiction</h2>
                <p className="text-xs text-[#667085] leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Pune, Maharashtra.
                </p>
              </section>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};
