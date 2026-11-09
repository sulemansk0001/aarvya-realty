import React, { useState, useEffect } from 'react';
import { PropertyService } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Commercial: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCommercial = async () => {
      setLoading(true);
      try {
        const all = await PropertyService.getAll();
        const commOnly = all.filter(
          (p) => p.propertyType === 'Commercial Office' || p.propertyType === 'Commercial Shop'
        );
        setProperties(commOnly);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommercial();
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="bg-[#071629] text-white rounded-2xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-card">
            <div className="relative z-10 max-w-2xl">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
                Corporate & Retail Assets
              </span>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white">
                Commercial Properties in Pune
              </h1>
              <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                Prime Grade-A office spaces, IT park floor plates, and high-street retail shops located in Viman Nagar, Hinjawadi Phase 1, Kharadi, and Senapati Bapat Road.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>High Rental Yield Opportunities</span>
                </span>
                <span className="flex items-center gap-1.5 text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Pre-Leased & Bare Shell Options</span>
                </span>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Property Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((n) => (
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

        {/* Commercial Consultancy Callout */}
        <ScrollAnimation animation="slide-up" duration={600}>
          <div className="mt-16 bg-white p-8 rounded-xl border border-[#E0E6ED] flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
            <div>
              <h3 className="font-poppins font-bold text-xl text-[#0B1F3B]">
                Looking for Custom Commercial Floor Plates in Pune?
              </h3>
              <p className="text-sm text-[#667085] mt-1">
                Connect with our corporate advisory team for off-market IT park spaces and institutional leases in Hinjewadi Phase 1.
              </p>
            </div>
            <Link
              to="/contact?type=commercial"
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded whitespace-nowrap transition-colors"
            >
              Enquire Commercial Advisory
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};
