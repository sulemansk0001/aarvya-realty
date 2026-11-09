import React, { useState, useEffect } from 'react';
import { PropertyService } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/properties/PropertyCard';
import { KeyRound, CheckCircle2, Phone } from 'lucide-react';
import { COMPANY_DETAILS } from '../utils/formatters';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Rent: React.FC = () => {
  const [rentals, setRentals] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      try {
        const all = await PropertyService.getAll();
        setRentals(all.filter((p) => p.transactionType === 'For Rent'));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-white rounded-2xl border border-[#E0E6ED] p-8 sm:p-12 shadow-card mb-12">
            <div className="max-w-3xl">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Rental Living
              </span>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                Rental Flats & Apartments in Pune
              </h1>
              <p className="mt-3 text-sm text-[#667085] leading-relaxed">
                Find furnished and semi-furnished 1, 2, and 3 BHK homes near Rajiv Gandhi Infotech Park (Hinjewadi), EON IT Park (Kharadi), Wakad, and Baner with registered lease agreements and transparent deposits.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-[#0B1F3B]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Verified Gated Communities</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Standard Maharashtra Leave & License Agreement</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Listings */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-xl aspect-[4/5] animate-pulse border border-[#E0E6ED]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentals.map((p, idx) => (
              <ScrollAnimation key={p.id} animation="slide-up" delay={(idx % 6) * 80} duration={550}>
                <PropertyCard property={p} />
              </ScrollAnimation>
            ))}
          </div>
        )}

        {/* Tenant Helpline Callout */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="mt-16 bg-[#0B1F3B] text-white p-8 rounded-xl shadow-card flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold block mb-1">
                Need Assistance?
              </span>
              <h3 className="font-poppins font-bold text-xl">
                Can't Find Your Ideal Rental Flat in Pune?
              </h3>
              <p className="text-xs text-neutral-300 mt-1">
                Contact our Hinjewadi Phase 1 office for immediate tenant matchmaking and family home shortlists.
              </p>
            </div>
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded whitespace-nowrap transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call {COMPANY_DETAILS.phoneDisplay}</span>
            </a>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};
