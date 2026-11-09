import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, Heart, ArrowUpRight, Eye } from 'lucide-react';
import { Property } from '../../types';
import { formatPropertyPrice } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';
import { PropertyQuickViewModal } from './PropertyQuickViewModal';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, compact = false }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const wishlisted = isWishlisted(property.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className="group bg-white rounded-xl border border-[#E0E6ED] overflow-hidden transition-all duration-300 hover:border-[#D4AF37] hover:shadow-cardHover hover:-translate-y-1.5 flex flex-col h-full relative" data-cursor="card">
        {/* Property Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <img
            src={property.images[0]}
            alt={`${property.title} in ${property.locality}, ${property.city}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
          />

          {/* Slight Dark Navy Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/80 via-[#0B1F3B]/30 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {property.featured && (
              <span className="bg-[#0B1F3B] text-[#D4AF37] border border-[#D4AF37]/50 text-[10px] font-bold px-2.5 py-1 rounded shadow-sm tracking-wide uppercase">
                Featured
              </span>
            )}
            <span className="bg-[#071629]/85 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-sm">
              {property.transactionType}
            </span>
          </div>

          {/* Wishlist Button (Top-Right) */}
          <button
            type="button"
            onClick={handleWishlistClick}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer ${
              wishlisted
                ? 'bg-red-50 text-red-500 shadow-md scale-110'
                : 'bg-white/90 text-[#0B1F3B] hover:bg-white hover:text-red-500 shadow-sm hover:scale-105'
            }`}
          >
            <Heart className={`w-4 h-4 transition-transform duration-200 ${wishlisted ? 'fill-red-500' : ''}`} />
          </button>

          {/* Centered Quick View Action Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none group-hover:pointer-events-auto">
            <button
              type="button"
              onClick={handleQuickViewClick}
              className="px-4 py-2 bg-white/95 hover:bg-[#0B1F3B] text-[#0B1F3B] hover:text-[#D4AF37] border border-[#D4AF37] rounded-lg text-xs font-bold transition-all duration-200 shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0"
            >
              <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Quick View</span>
            </button>
          </div>

          {/* Bottom Overlay Info & Pricing */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10 pointer-events-none">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#F5E6BD] font-semibold block">
                {property.possessionStatus}
              </span>
              <span className="text-xl font-bold font-poppins text-white drop-shadow-sm">
                {formatPropertyPrice(property.price, property.transactionType)}
              </span>
            </div>

            <Link
              to={`/properties/${property.slug || property.id}`}
              className="pointer-events-auto hidden sm:inline-flex items-center gap-1 bg-white/95 hover:bg-[#0B1F3B] text-[#0B1F3B] hover:text-[#D4AF37] border border-[#D4AF37] px-3 py-1.5 rounded text-xs font-semibold transition-all duration-200 shadow-sm"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Property Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Locality & City */}
            <div className="flex items-center gap-1.5 text-xs text-[#667085] mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
              <span className="font-semibold text-[#0B1F3B]">{property.locality}</span>
              <span>&bull;</span>
              <span>{property.city}, {property.state}</span>
            </div>

            {/* Title */}
            <h3 className="font-poppins font-bold text-base text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors duration-200 line-clamp-1 mb-2">
              <Link to={`/properties/${property.slug || property.id}`}>
                {property.title}
              </Link>
            </h3>

            {!compact && (
              <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed mb-4">
                {property.description}
              </p>
            )}
          </div>

          {/* Specs Row: BHK, Bath, Area */}
          <div className="pt-3 border-t border-[#E0E6ED]">
            <div className="grid grid-cols-3 gap-2 text-xs text-[#0B1F3B]">
              <div className="flex items-center gap-1.5 transition-colors group-hover:text-[#D4AF37]">
                <Bed className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-semibold">{property.bhk}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-medium text-[#667085]">{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span className="font-medium text-[#667085]">{property.area} sq.ft.</span>
              </div>
            </div>

            {/* Mobile View Details Action */}
            <div className="sm:hidden mt-4 pt-3 border-t border-[#E0E6ED] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setQuickViewOpen(true)}
                className="text-xs text-[#667085] font-medium flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Quick View</span>
              </button>
              <Link
                to={`/properties/${property.slug || property.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0B1F3B] hover:text-[#D4AF37]"
              >
                <span>View Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal Popup */}
      {quickViewOpen && (
        <PropertyQuickViewModal
          property={property}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
};
