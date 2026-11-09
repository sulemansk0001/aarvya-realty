/**
 * Indian Number & Currency Formatting Utilities
 * Aarvya Realty - Pune, Maharashtra
 */

export const COMPANY_DETAILS = {
  name: 'AARVYA REALTY',
  tagline: 'Find Your Place. Build Your Future.',
  phoneDisplay: '+91 84464 16101',
  phoneRaw: '+918446416101',
  phonePlain: '8446416101',
  email: 'aarvyarealtors@gmail.com',
  address: 'Hinjewadi, Phase 1, Pune, Maharashtra 411057',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411057',
  workingHours: 'Monday – Saturday: 9:30 AM – 7:30 PM (IST)',
  sundayHours: 'Sunday: By Prior Appointment',
  socialLinks: {
    instagram: 'https://instagram.com/aarvyarealty',
    facebook: 'https://facebook.com/aarvyarealty',
    linkedin: 'https://linkedin.com/company/aarvya-realty',
    youtube: 'https://youtube.com/@aarvyarealty',
    whatsapp: 'https://wa.me/918446416101',
  },
};

/**
 * Format raw number into Indian Rupee representation
 * e.g. 4500000 -> "₹45,00,000", 12500000 -> "₹1.25 Cr"
 */
export function formatINR(amount: number, compact: boolean = false): string {
  if (amount == null || isNaN(amount)) return '₹0';

  if (compact) {
    if (amount >= 10000000) {
      const cr = amount / 10000000;
      return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      const lakh = amount / 100000;
      return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(2)} Lakh`;
    }
  }

  // Standard Indian formatting (en-IN)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price for cards with monthly tag for rentals
 */
export function formatPropertyPrice(price: number, transactionType: 'For Sale' | 'For Rent'): string {
  if (transactionType === 'For Rent') {
    return `${formatINR(price)}/month`;
  }
  return formatINR(price, true);
}

/**
 * Reducing balance Home Loan EMI calculation formula
 * EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
 */
export interface EMICalculationResult {
  loanAmount: number;
  monthlyEMI: number;
  totalInterest: number;
  totalRepayment: number;
  interestPercentage: number;
  principalPercentage: number;
}

export function calculateHomeLoanEMI(
  propertyPrice: number,
  downPayment: number,
  annualInterestRate: number,
  tenureYears: number
): EMICalculationResult {
  const principal = Math.max(0, propertyPrice - downPayment);
  if (principal <= 0 || annualInterestRate <= 0 || tenureYears <= 0) {
    return {
      loanAmount: principal,
      monthlyEMI: 0,
      totalInterest: 0,
      totalRepayment: principal,
      interestPercentage: 0,
      principalPercentage: 100,
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
  const monthlyEMI = Math.round((principal * monthlyRate * emiFactor) / (emiFactor - 1));

  const totalRepayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - principal);

  const total = principal + totalInterest;
  const principalPercentage = total > 0 ? Math.round((principal / total) * 100) : 100;
  const interestPercentage = 100 - principalPercentage;

  return {
    loanAmount: principal,
    monthlyEMI,
    totalInterest,
    totalRepayment,
    interestPercentage,
    principalPercentage,
  };
}

/**
 * Format Indian Mobile number input
 */
export function isValidIndianMobile(phone: string): boolean {
  // Allow +91 or 0 prefix or plain 10 digits
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  const pattern = /^(?:\+91|91|0)?[6-9]\d{9}$/;
  return pattern.test(cleaned);
}
