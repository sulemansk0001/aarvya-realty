import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter } from 'lucide-react';
import { Property } from '../../types';
import { PropertyCard } from '../properties/PropertyCard';
import { ScrollReveal } from '../motion/ScrollReveal';
import { AnimatedHeading } from '../typography/AnimatedHeading';

export interface CuratedListingsGridProps {
  properties: Property[];
  loading?: boolean;
}

type FilterCategory = 'all' | 'ready' | 'under-construction' | 'villas' | 'commercial';

export const CuratedListingsGrid: React.FC<CuratedListingsGridProps> = ({
  properties,
  loading = false,
}) => {
  const [activeTab, setActiveTab] = useState<FilterCategory>('all');

  const filterTabs: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All Curated' },
    { id: 'ready', label: 'Ready to Move' },
    { id: 'under-construction', label: 'Under Construction' },
    { id: 'villas', label: 'Villas & Penthouses' },
    { id: 'commercial', label: 'Commercial Spaces' },
  ];

  const filteredProperties = properties.filter((prop) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ready') return prop.possessionStatus === 'Ready to Move';
    if (activeTab === 'under-construction') return prop.possessionStatus === 'Under Construction';
    if (activeTab === 'villas') return prop.propertyType.toLowerCase().includes('villa');
    if (activeTab === 'commercial') return prop.propertyType.toLowerCase().includes('commercial') || prop.propertyType.toLowerCase().includes('office');
    return true;
  });

  return (
    <section className="py-20 sm:py-24 bg-[#F5F7FA] border-b border-[#E0E6ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <AnimatedHeading
            eyebrow="CURATED COLLECTION"
            badge="Demonstration Showcase"
            title="Featured Properties in Maharashtra"
            subtitle="Explore selected residential and commercial properties across Pune's prime corridors."
            align="left"
          />

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B1F3B] hover:text-[#D4AF37] transition-all self-start md:self-auto hover:translate-x-1"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
        </div>

        {/* Filter Tabs Row */}
        <ScrollReveal variant="fade-up" duration={600} delay={100}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1F3B] text-[#D4AF37] shadow-sm border border-[#0B1F3B]'
                      : 'bg-white text-[#0B1F3B] hover:bg-[#F5F7FA] border border-[#E0E6ED]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Grid Container */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl aspect-[16/14] animate-pulse border border-[#E0E6ED]"
              />
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E0E6ED] p-8">
            <p className="text-[#667085] text-sm">
              No properties matched the selected filter.
            </p>
            <button
              onClick={() => setActiveTab('all')}
              className="mt-3 text-xs font-bold text-[#0B1F3B] hover:text-[#D4AF37] hover:underline"
            >
              Reset to All Curated
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 6).map((property, idx) => (
              <ScrollReveal
                key={property.id}
                variant="fade-up"
                delay={idx * 80}
                duration={650}
                className="h-full"
              >
                <div className="card-lift-hover h-full" data-cursor="card">
                  <PropertyCard property={property} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
