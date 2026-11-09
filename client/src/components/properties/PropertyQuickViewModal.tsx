import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, Bed, Bath, Maximize2, CheckCircle2, ArrowRight, Heart, Phone } from 'lucide-react';
import { Property } from '../../types';
import { formatPropertyPrice, COMPANY_DETAILS } from '../../utils/formatters';
import { useWishlist } from '../../context/WishlistContext';

interface PropertyQuickViewModalProps {
  property: Property | null;
  onClose: () => void;
}

export const PropertyQuickViewModal: React.FC<PropertyQuickViewModalProps> = ({ property, onClose }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  const wishlisted = isWishlisted(property.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-float border border-[#E0E6ED] overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 text-[#0B1F3B] hover:bg-[#0B1F3B] hover:text-[#D4AF37] transition-colors shadow-sm"
          aria-label="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Container */}
        <div className="md:w-1/2 relative bg-[#071629] aspect-[4/3] md:aspect-auto">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            <span className="bg-[#0B1F3B] text-[#D4AF37] border border-[#D4AF37]/50 text-[11px] font-semibold px-2.5 py-1 rounded shadow-sm">
              {property.transactionType}
            </span>
            <span className="bg-[#071629]/80 text-white text-[11px] font-medium px-2 py-0.5 rounded">
              {property.possessionStatus}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[11px] uppercase tracking-wider text-[#F5E6BD] font-semibold block">
              Aarvya Verified
            </span>
            <span className="text-2xl font-bold font-poppins text-white">
              {formatPropertyPrice(property.price, property.transactionType)}
            </span>
          </div>
        </div>

        {/* Right: Details & Action */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#667085] mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-semibold text-[#0B1F3B]">{property.locality}</span>
              <span>&bull;</span>
              <span>{property.city}, {property.state}</span>
            </div>

            <h3 className="font-poppins font-bold text-xl text-[#0B1F3B] leading-snug">
              {property.title}
            </h3>

            <p className="text-xs text-[#667085] line-clamp-3 mt-2 leading-relaxed">
              {property.description}
            </p>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 my-3 border-y border-[#E0E6ED] text-xs text-[#0B1F3B]">
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">{property.bhk}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-semibold">{property.area} sq.ft.</span>
              </div>
            </div>

            {/* Amenities Highlights */}
            <div>
              <span className="text-[11px] uppercase font-semibold text-[#667085] block mb-2">
                Amenities & Features
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs text-[#0B1F3B]">
                {property.amenities.slice(0, 4).map((a, i) => (
                  <div key={i} className="flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                    <span className="truncate">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-[#E0E6ED] flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleWishlist(property.id)}
              className={`p-2.5 rounded-lg border transition-colors flex items-center justify-center ${
                wishlisted
                  ? 'bg-red-50 text-red-600 border-red-200'
                  : 'bg-[#F5F7FA] text-[#0B1F3B] border-[#E0E6ED] hover:bg-neutral-100'
              }`}
              title="Save to wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-600' : ''}`} />
            </button>

            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="px-3.5 py-2.5 bg-[#F5F7FA] hover:bg-[#E0E6ED] text-[#0B1F3B] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-[#E0E6ED]"
              title="Call Hinjewadi Advisory Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Call</span>
            </a>

            <Link
              to={`/properties/${property.slug || property.id}`}
              onClick={onClose}
              className="flex-1 py-2.5 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:translate-x-0.5"
            >
              <span>View Full Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
