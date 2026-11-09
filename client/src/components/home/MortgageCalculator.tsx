import React, { useState, useMemo } from 'react';
import { calculateHomeLoanEMI, formatINR, COMPANY_DETAILS } from '../../utils/formatters';
import { Calculator, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../common/ScrollAnimation';

export const MortgageCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState<number>(8500000); // Default ₹85 Lakh
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 Years

  const downPaymentAmount = useMemo(() => {
    return Math.round((propertyPrice * downPaymentPercent) / 100);
  }, [propertyPrice, downPaymentPercent]);

  const calculation = useMemo(() => {
    return calculateHomeLoanEMI(propertyPrice, downPaymentAmount, interestRate, tenureYears);
  }, [propertyPrice, downPaymentAmount, interestRate, tenureYears]);

  return (
    <section className="py-20 bg-white border-y border-[#E0E6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              Financial Planning
            </span>
            <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
              Plan Your Dream Home With Confidence
            </h2>
            <p className="mt-3 text-base text-[#667085]">
              Calculate your estimated monthly home loan instalments before making your property decision in Pune.
            </p>
          </div>
        </ScrollAnimation>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Interactive Calculator Controls (7 cols on lg) */}
          <div className="lg:col-span-7">
            <ScrollAnimation animation="slide-left" duration={600}>
              <div className="bg-[#F5F7FA] p-6 sm:p-8 rounded-xl border border-[#E0E6ED] shadow-subtle">
                <div className="space-y-6">
                  {/* Field 1: Property Value */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-[#0B1F3B]">
                        Property Price (INR)
                      </label>
                      <span className="text-base font-bold text-[#D4AF37] font-poppins">
                        {formatINR(propertyPrice)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2000000}
                      max={40000000}
                      step={200000}
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#667085] mt-1">
                      <span>₹20 Lakh</span>
                      <span>₹2 Crore</span>
                      <span>₹4 Crore</span>
                    </div>
                  </div>

                  {/* Field 2: Down Payment */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-semibold text-[#0B1F3B]">
                        Down Payment ({downPaymentPercent}%)
                      </label>
                      <span className="text-base font-bold text-[#0B1F3B] font-poppins">
                        {formatINR(downPaymentAmount)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-[#667085] mt-1">
                      <span>10%</span>
                      <span>20% (Recommended)</span>
                      <span>50%</span>
                    </div>
                  </div>

                  {/* Field 3 & 4: Interest Rate and Tenure */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-[#0B1F3B]">
                          Interest Rate (% p.a.)
                        </label>
                        <span className="text-base font-bold text-[#0B1F3B] font-poppins">
                          {interestRate}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={7.5}
                        max={12.0}
                        step={0.1}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-[#667085] mt-1">
                        <span>7.5%</span>
                        <span>8.5% (Bank avg.)</span>
                        <span>12.0%</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-semibold text-[#0B1F3B]">
                          Loan Tenure (Years)
                        </label>
                        <span className="text-base font-bold text-[#0B1F3B] font-poppins">
                          {tenureYears} Years
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={30}
                        step={1}
                        value={tenureYears}
                        onChange={(e) => setTenureYears(Number(e.target.value))}
                        className="w-full accent-[#D4AF37] cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-[#667085] mt-1">
                        <span>5 Yrs</span>
                        <span>20 Yrs</span>
                        <span>30 Yrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Output Result Card */}
                  <div className="mt-8 bg-white p-5 rounded-lg border border-[#E0E6ED] space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E0E6ED]">
                      <div>
                        <span className="text-xs uppercase font-medium text-[#667085] tracking-wider block">
                          Estimated Monthly Instalment
                        </span>
                        <span className="text-3xl font-extrabold font-poppins text-[#D4AF37]">
                          {formatINR(calculation.monthlyEMI)}
                          <span className="text-sm font-normal text-[#667085]"> /month</span>
                        </span>
                      </div>
                      <span className="text-xs text-[#0B1F3B] bg-[#F5F7FA] px-2.5 py-1 rounded border border-[#E0E6ED] mt-2 sm:mt-0 font-medium">
                        Standard Reducing Balance
                      </span>
                    </div>

                    {/* Breakdown details */}
                    <div className="grid grid-cols-3 gap-3 text-center pt-2">
                      <div className="bg-[#F5F7FA] p-2.5 rounded border border-[#E0E6ED]/60">
                        <span className="text-[11px] text-[#667085] block">Principal Loan</span>
                        <span className="text-xs sm:text-sm font-bold text-[#0B1F3B] font-poppins">
                          {formatINR(calculation.loanAmount)}
                        </span>
                      </div>
                      <div className="bg-[#F5F7FA] p-2.5 rounded border border-[#E0E6ED]/60">
                        <span className="text-[11px] text-[#667085] block">Total Interest</span>
                        <span className="text-xs sm:text-sm font-bold text-[#0B1F3B] font-poppins">
                          {formatINR(calculation.totalInterest)}
                        </span>
                      </div>
                      <div className="bg-[#F5F7FA] p-2.5 rounded border border-[#E0E6ED]/60">
                        <span className="text-[11px] text-[#667085] block">Total Repayment</span>
                        <span className="text-xs sm:text-sm font-bold text-[#0B1F3B] font-poppins">
                          {formatINR(calculation.totalRepayment)}
                        </span>
                      </div>
                    </div>

                    {/* Ratio Bar */}
                    <div className="pt-2">
                      <div className="h-2.5 w-full bg-[#E0E6ED] rounded-full overflow-hidden flex">
                        <div
                          style={{ width: `${calculation.principalPercentage}%` }}
                          className="bg-[#D4AF37] h-full transition-all duration-300"
                        />
                        <div
                          style={{ width: `${calculation.interestPercentage}%` }}
                          className="bg-[#0B1F3B] h-full transition-all duration-300"
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#667085] mt-1.5 font-medium">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block" />
                          Principal: {calculation.principalPercentage}%
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0B1F3B] inline-block" />
                          Interest: {calculation.interestPercentage}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Indicative Disclaimer */}
                  <p className="text-[11px] text-[#667085] flex items-start gap-1.5 leading-relaxed">
                    <Info className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>
                      Indicative calculation only based on reducing balance method. Actual rates, loan-to-value (LTV) limits, and approval criteria depend on individual bank terms and credit evaluation.
                    </span>
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Right Column: Visual & Advisory Callout (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollAnimation animation="slide-right" delay={150} duration={600}>
              <div className="relative rounded-xl overflow-hidden shadow-card border border-[#E0E6ED] aspect-[4/3] group" data-cursor="card">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Modern Pune Apartment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/85 via-[#0B1F3B]/35 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Aarvya Realty Advisory
                  </span>
                  <h3 className="text-xl font-bold font-poppins mt-1">
                    Ready to Apply for a Home Loan in Pune?
                  </h3>
                  <p className="text-xs text-[#E0E6ED] mt-1 line-clamp-2">
                    Our banking consultants assist you in comparing prevailing interest rates across SBI, HDFC, ICICI, and Bank of Maharashtra.
                  </p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={250} duration={600}>
              <div className="bg-[#F5F7FA] p-6 rounded-xl border border-[#E0E6ED] space-y-4">
                <h4 className="font-poppins font-semibold text-base text-[#0B1F3B]">
                  Key Points for Pune Homebuyers
                </h4>
                <ul className="space-y-2.5 text-xs text-[#0B1F3B]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>Maharashtra Stamp Duty is 7% (including LBT/Metro Cess in Pune PMC/PCMC).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>Tax deductions up to ₹3.5 Lakh available under Section 80C & 24(b).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <span>Zero GST on ready-to-move homes with Occupancy Certificate (OC).</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <Link
                    to="/contact?topic=loan"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs font-semibold rounded transition-colors duration-200"
                  >
                    <span>Request Home Loan Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};
