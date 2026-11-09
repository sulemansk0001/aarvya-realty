import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { LocationCardData } from '../../types';

interface LocationCardProps {
  location: LocationCardData;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const isNeighbourhood = location.type === 'neighbourhood';
  const param = isNeighbourhood
    ? `locality=${encodeURIComponent(location.name.split(',')[0].trim())}`
    : `city=${encodeURIComponent(location.city)}`;

  return (
    <Link
      to={`/properties?${param}`}
      className="group relative rounded-xl overflow-hidden aspect-[4/3] block shadow-subtle border border-[#E0E6ED]"
      data-cursor="card"
    >
      {/* Background Image */}
      <img
        src={location.image}
        alt={`Properties in ${location.name}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Persistent Gradient Overlay with deep navy hover enhancement */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/95 via-[#0B1F3B]/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

      {/* Top Badge: Property count */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span className="bg-[#0B1F3B] text-[#D4AF37] border border-[#D4AF37]/50 text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
          {location.propertyCount} Properties
        </span>
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
        <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] font-medium mb-1">
          <MapPin className="w-3.5 h-3.5" />
          <span>{location.city}, {location.state}</span>
        </div>

        <h3 className="font-poppins font-bold text-xl text-white group-hover:text-[#D4AF37] transition-colors duration-200">
          {location.name}
        </h3>

        <div className="flex items-center justify-between text-xs text-[#E0E6ED] mt-2 pt-2 border-t border-white/20">
          <span>Avg: {location.avgPriceSqFt}</span>
          <span className="flex items-center gap-1 text-[#D4AF37] font-medium group-hover:translate-x-1 transition-transform">
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};
