import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, SlidersHorizontal, Layers } from 'lucide-react';

interface PropertySearchProps {
  initialType?: string;
  className?: string;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ initialType = 'For Sale', className = '' }) => {
  const navigate = useNavigate();
  const [transactionType, setTransactionType] = useState<string>(initialType);
  const [locality, setLocality] = useState<string>('');
  const [propertyType, setPropertyType] = useState<string>('');
  const [bhk, setBhk] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [possession, setPossession] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (transactionType) params.append('type', transactionType);
    if (locality) params.append('locality', locality);
    if (propertyType) params.append('propertyType', propertyType);
    if (bhk) params.append('bhk', bhk);
    if (possession) params.append('possession', possession);

    if (budget) {
      if (budget === 'under-50l') {
        params.append('maxPrice', '5000000');
      } else if (budget === '50l-1cr') {
        params.append('minPrice', '5000000');
        params.append('maxPrice', '10000000');
      } else if (budget === '1cr-2cr') {
        params.append('minPrice', '10000000');
        params.append('maxPrice', '20000000');
      } else if (budget === 'above-2cr') {
        params.append('minPrice', '20000000');
      }
    }

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-5xl mx-auto bg-white rounded-xl shadow-card border border-[#E0E6ED] overflow-hidden ${className}`}>
      {/* Search Header Tabs: Buy / Rent / Commercial */}
      <div className="flex border-b border-[#E0E6ED] bg-[#F5F7FA]">
        <button
          type="button"
          onClick={() => {
            setTransactionType('For Sale');
            setPropertyType('');
          }}
          className={`flex-1 py-3.5 px-6 text-sm font-semibold transition-all duration-200 border-b-2 text-center ${
            transactionType === 'For Sale' && propertyType !== 'Commercial Office'
              ? 'border-[#D4AF37] text-[#0B1F3B] bg-white font-poppins'
              : 'border-transparent text-[#667085] hover:text-[#0B1F3B]'
          }`}
        >
          Buy Property in Pune
        </button>
        <button
          type="button"
          onClick={() => {
            setTransactionType('For Rent');
            setPropertyType('');
          }}
          className={`flex-1 py-3.5 px-6 text-sm font-semibold transition-all duration-200 border-b-2 text-center ${
            transactionType === 'For Rent'
              ? 'border-[#D4AF37] text-[#0B1F3B] bg-white font-poppins'
              : 'border-transparent text-[#667085] hover:text-[#0B1F3B]'
          }`}
        >
          Rent Flats & Homes
        </button>
        <button
          type="button"
          onClick={() => {
            setTransactionType('For Sale');
            setPropertyType('Commercial Office');
          }}
          className={`flex-1 py-3.5 px-6 text-sm font-semibold transition-all duration-200 border-b-2 text-center ${
            propertyType === 'Commercial Office'
              ? 'border-[#D4AF37] text-[#0B1F3B] bg-white font-poppins'
              : 'border-transparent text-[#667085] hover:text-[#0B1F3B]'
          }`}
        >
          Commercial Spaces
        </button>
      </div>

      {/* Main Search Inputs Grid */}
      <form onSubmit={handleSearch} className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Field 1: Locality / Neighbourhood in Pune */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Location / Locality</span>
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded-md text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
            >
              <option value="">All Pune Localities</option>
              <option value="Baner">Baner</option>
              <option value="Hinjawadi">Hinjawadi (Phase 1, 2, 3)</option>
              <option value="Wakad">Wakad</option>
              <option value="Kharadi">Kharadi (EON / WTC)</option>
              <option value="Viman Nagar">Viman Nagar</option>
              <option value="Kothrud">Kothrud</option>
              <option value="Bavdhan">Bavdhan</option>
              <option value="Pimple Saudagar">Pimple Saudagar</option>
              <option value="Balewadi">Balewadi High Street</option>
              <option value="Aundh">Aundh</option>
              <option value="Magarpatta">Magarpatta City / Hadapsar</option>
            </select>
          </div>

          {/* Field 2: Property Type */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Property Type</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded-md text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
            >
              <option value="">All Property Types</option>
              <option value="Apartment">Apartment / High-rise Flat</option>
              <option value="Villa">Luxury Villa</option>
              <option value="Independent House">Independent House</option>
              <option value="Plot">Residential Plot / Land</option>
              <option value="Commercial Office">Commercial Office</option>
              <option value="Retail Store">Retail Store / Showroom</option>
            </select>
          </div>

          {/* Field 3: BHK Configuration */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Configuration (BHK)</span>
            </label>
            <select
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded-md text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
            >
              <option value="">Any BHK</option>
              <option value="1 BHK">1 BHK</option>
              <option value="2 BHK">2 BHK</option>
              <option value="3 BHK">3 BHK</option>
              <option value="4 BHK">4+ BHK / Penthouse</option>
            </select>
          </div>

          {/* Field 4: Budget Range */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-semibold text-[#667085] uppercase tracking-wider flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Budget (INR)</span>
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded-md text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors"
            >
              <option value="">Any Budget</option>
              <option value="under-50l">Under ₹50 Lakh</option>
              <option value="50l-1cr">₹50 Lakh – ₹1 Crore</option>
              <option value="1cr-2cr">₹1 Crore – ₹2 Crore</option>
              <option value="above-2cr">Above ₹2 Crore</option>
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showAdvanced && (
          <div className="pt-3 border-t border-[#E0E6ED] grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-150 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#667085] mb-1">
                Possession Status
              </label>
              <select
                value={possession}
                onChange={(e) => setPossession(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B]"
              >
                <option value="">All Statuses</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Resale">Resale</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#667085] mb-1">
                City / Region
              </label>
              <input
                type="text"
                value="Pune, Maharashtra"
                disabled
                className="w-full px-3 py-2 bg-neutral-100 border border-[#E0E6ED] rounded text-sm text-[#667085] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#667085] mb-1">
                Currency
              </label>
              <input
                type="text"
                value="Indian Rupee (₹ INR)"
                disabled
                className="w-full px-3 py-2 bg-neutral-100 border border-[#E0E6ED] rounded text-sm text-[#667085] cursor-not-allowed"
              />
            </div>
          </div>
        )}

        {/* Search Bottom Bar: Toggle Advanced & Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-medium text-[#667085] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] font-semibold text-sm rounded-md transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-goldGlow"
          >
            <Search className="w-4 h-4" />
            <span>Find Properties</span>
          </button>
        </div>
      </form>
    </div>
  );
};
