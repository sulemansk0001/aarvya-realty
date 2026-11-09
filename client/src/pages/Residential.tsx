import React, { useState, useEffect } from 'react';
import { PropertyService } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Home as HomeIcon, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Residential: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResidential = async () => {
      setLoading(true);
      try {
        const all = await PropertyService.getAll();
        const resOnly = all.filter(
          (p) => p.propertyType === 'Apartment' || p.propertyType === 'Villa' || p.propertyType === 'Penthouse'
        );
        setProperties(resOnly);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResidential();
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-[#0B1F3B] text-white rounded-2xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-card">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Homes & Residences
              </span>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white">
                Residential Properties in Pune
              </h1>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Explore 1 BHK, 2 BHK, 3 BHK apartments, penthouses, and gated villas across Baner, Wakad, Hinjawadi, Kharadi, and Bavdhan. Verified floor plans and legal clarity.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Ready to Move & New Launches</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Standard INR Pricing</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Property Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-xl aspect-[4/5] animate-pulse border border-[#E0E6ED]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p, idx) => (
              <ScrollAnimation key={p.id} animation="slide-up" delay={(idx % 6) * 80} duration={550}>
                <PropertyCard property={p} />
              </ScrollAnimation>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
