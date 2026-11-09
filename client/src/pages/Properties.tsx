import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Filter,
  Grid,
  List,
  Search,
  SlidersHorizontal,
  X,
  Heart,
  ChevronDown,
  Building,
  RefreshCw,
} from 'lucide-react';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertyService } from '../services/api';
import { Property } from '../types';
import { formatPropertyPrice } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const Properties: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  const { wishlistIds } = useWishlist();

  // Filters state from URL query or defaults
  const query = searchParams.get('q') || '';
  const selectedCity = searchParams.get('city') || '';
  const selectedLocality = searchParams.get('locality') || '';
  const transactionType = searchParams.get('type') || '';
  const propertyType = searchParams.get('propertyType') || '';
  const bhk = searchParams.get('bhk') || '';
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 0;
  const possessionStatus = searchParams.get('possession') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  const showWishlistOnly = searchParams.get('wishlist') === 'true';

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      try {
        const data = await PropertyService.getAll();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties', err);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  // Update URL search parameters
  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        if (showWishlistOnly && !wishlistIds.includes(p.id)) return false;
        if (selectedCity && p.city.toLowerCase() !== selectedCity.toLowerCase()) return false;
        if (selectedLocality && p.locality.toLowerCase() !== selectedLocality.toLowerCase()) return false;
        if (transactionType && p.transactionType.toLowerCase() !== transactionType.toLowerCase()) return false;
        if (propertyType && p.propertyType.toLowerCase() !== propertyType.toLowerCase()) return false;
        if (bhk && p.bhk.toLowerCase() !== bhk.toLowerCase()) return false;
        if (possessionStatus && p.possessionStatus.toLowerCase() !== possessionStatus.toLowerCase()) return false;
        if (minPrice > 0 && p.price < minPrice) return false;
        if (maxPrice > 0 && p.price > maxPrice) return false;
        if (query) {
          const q = query.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchLoc = p.locality.toLowerCase().includes(q);
          const matchCity = p.city.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchCity && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'area-desc') return b.area - a.area;
        return (b.createdAt || '').localeCompare(a.createdAt || '');
      });
  }, [
    properties,
    showWishlistOnly,
    wishlistIds,
    selectedCity,
    selectedLocality,
    transactionType,
    propertyType,
    bhk,
    possessionStatus,
    minPrice,
    maxPrice,
    query,
    sortBy,
  ]);

  const hasActiveFilters =
    Boolean(query || selectedCity || selectedLocality || transactionType || propertyType || bhk || possessionStatus || minPrice || maxPrice || showWishlistOnly);

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-[#667085] mb-2">
              <span>Home</span>
              <span>/</span>
              <span className="text-[#D4AF37] font-semibold">Properties</span>
              {showWishlistOnly && (
                <>
                  <span>/</span>
                  <span className="text-red-500 font-semibold">Saved Properties</span>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-poppins font-bold text-[#0B1F3B]">
                  {showWishlistOnly
                    ? 'Your Saved Properties'
                    : selectedLocality
                    ? `Properties in ${selectedLocality}, Pune`
                    : 'Real Estate Properties in Pune & Maharashtra'}
                </h1>
                <p className="text-sm text-[#667085] mt-1">
                  Showing {filteredProperties.length} verified demonstration listings with authentic Maharashtra specifications.
                </p>
              </div>

              {/* Mobile Filter Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E0E6ED] rounded-md text-sm font-semibold text-[#0B1F3B] shadow-sm self-start"
              >
                <Filter className="w-4 h-4 text-[#D4AF37]" />
                <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
              </button>
            </div>
          </div>
        </ScrollAnimation>

        {/* Search & Active Badges Row */}
        <ScrollAnimation animation="slide-up" delay={100} duration={550}>
          <div className="bg-white p-4 rounded-xl border border-[#E0E6ED] shadow-subtle mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#667085] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => updateFilter('q', e.target.value)}
                placeholder="Search by locality, project name, or BHK (e.g. Baner, Wakad, 2 BHK)..."
                className="w-full pl-10 pr-4 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded-md text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Wishlist quick filter pill */}
              <button
                onClick={() => updateFilter('wishlist', showWishlistOnly ? '' : 'true')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold border transition-colors ${
                  showWishlistOnly
                    ? 'bg-red-50 text-red-600 border-red-200'
                    : 'bg-[#F5F7FA] text-[#0B1F3B] border-[#E0E6ED] hover:bg-neutral-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-red-600' : ''}`} />
                <span>Saved ({wishlistIds.length})</span>
              </button>

              {/* Sorting select */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#667085] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => updateFilter('sort', e.target.value)}
                  className="px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded-md text-xs font-medium text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="area-desc">Area: Largest First</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-[#E0E6ED] rounded-md overflow-hidden bg-[#F5F7FA]">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-[#D4AF37] text-white' : 'text-[#667085] hover:text-[#0B1F3B]'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-[#D4AF37] text-white' : 'text-[#667085] hover:text-[#0B1F3B]'
                  }`}
                  aria-label="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Layout Grid: Sidebar Filters (desktop) + Property Listing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols on lg) */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-xl border border-[#E0E6ED] shadow-subtle space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0E6ED]">
              <div className="flex items-center gap-2 text-sm font-poppins font-bold text-[#0B1F3B]">
                <Filter className="w-4 h-4 text-[#D4AF37]" />
                <span>Filter Properties</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-[#D4AF37] hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Filter 1: Transaction Type */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] uppercase tracking-wider mb-2">
                Transaction
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['', 'For Sale', 'For Rent'].map((item) => (
                  <button
                    key={item || 'all'}
                    type="button"
                    onClick={() => updateFilter('type', item)}
                    className={`py-2 px-3 rounded border text-center transition-colors ${
                      transactionType === item
                        ? 'bg-[#D4AF37] text-white border-[#D4AF37] font-semibold'
                        : 'bg-[#F5F7FA] text-[#0B1F3B] border-[#E0E6ED] hover:border-neutral-400'
                    }`}
                  >
                    {item || 'All'}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 2: Pune Locality */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] uppercase tracking-wider mb-2">
                Pune Locality
              </label>
              <select
                value={selectedLocality}
                onChange={(e) => updateFilter('locality', e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">All Pune Localities</option>
                <option value="Baner">Baner</option>
                <option value="Hinjawadi">Hinjawadi</option>
                <option value="Wakad">Wakad</option>
                <option value="Kharadi">Kharadi</option>
                <option value="Viman Nagar">Viman Nagar</option>
                <option value="Kothrud">Kothrud</option>
                <option value="Bavdhan">Bavdhan</option>
                <option value="Pimple Saudagar">Pimple Saudagar</option>
              </select>
            </div>

            {/* Filter 3: BHK Configuration */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] uppercase tracking-wider mb-2">
                BHK Configuration
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK'].map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => updateFilter('bhk', bhk === b ? '' : b)}
                    className={`py-2 px-3 rounded border text-center transition-colors ${
                      bhk === b
                        ? 'bg-[#D4AF37] text-white border-[#D4AF37] font-semibold'
                        : 'bg-[#F5F7FA] text-[#0B1F3B] border-[#E0E6ED] hover:border-neutral-400'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 4: Property Category */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] uppercase tracking-wider mb-2">
                Property Category
              </label>
              <select
                value={propertyType}
                onChange={(e) => updateFilter('propertyType', e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">All Categories</option>
                <option value="Apartment">Apartment / Flats</option>
                <option value="Villa">Independent Villa</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Commercial Office">Commercial Office</option>
              </select>
            </div>

            {/* Filter 5: Possession Status */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] uppercase tracking-wider mb-2">
                Possession Status
              </label>
              <select
                value={possessionStatus}
                onChange={(e) => updateFilter('possession', e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="">All Statuses</option>
                <option value="Ready to Move">Ready to Move</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Resale">Resale</option>
              </select>
            </div>

            {/* Direct Consultation Box */}
            <div className="pt-4 border-t border-[#E0E6ED] bg-[#F5F7FA] -mx-6 -mb-6 p-6 rounded-b-xl">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D4AF37] block mb-1">
                Pune Advisory Desk
              </span>
              <p className="text-xs text-[#667085] mb-3">
                Need a tailored property shortlist in Hinjewadi or Baner?
              </p>
              <a
                href="tel:+918446416101"
                className="w-full py-2 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white text-xs font-semibold rounded text-center block transition-colors"
              >
                Call: +91 84464 16101
              </a>
            </div>
          </aside>

          {/* Properties Listing Area (9 cols on lg) */}
          <main className="lg:col-span-9">
            {/* Active Filter Chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-[#667085] font-medium">Applied Filters:</span>
                {selectedLocality && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0E6ED] rounded-full text-xs text-[#0B1F3B]">
                    Locality: {selectedLocality}
                    <button onClick={() => updateFilter('locality', '')}>
                      <X className="w-3 h-3 text-[#667085] hover:text-red-500" />
                    </button>
                  </span>
                )}
                {transactionType && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0E6ED] rounded-full text-xs text-[#0B1F3B]">
                    {transactionType}
                    <button onClick={() => updateFilter('type', '')}>
                      <X className="w-3 h-3 text-[#667085] hover:text-red-500" />
                    </button>
                  </span>
                )}
                {bhk && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0E6ED] rounded-full text-xs text-[#0B1F3B]">
                    {bhk}
                    <button onClick={() => updateFilter('bhk', '')}>
                      <X className="w-3 h-3 text-[#667085] hover:text-red-500" />
                    </button>
                  </span>
                )}
                {propertyType && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#E0E6ED] rounded-full text-xs text-[#0B1F3B]">
                    Type: {propertyType}
                    <button onClick={() => updateFilter('propertyType', '')}>
                      <X className="w-3 h-3 text-[#667085] hover:text-red-500" />
                    </button>
                  </span>
                )}
                {showWishlistOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 border border-red-200 rounded-full text-xs text-red-600 font-semibold">
                    Saved Only
                    <button onClick={() => updateFilter('wishlist', '')}>
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-[#D4AF37] hover:underline font-semibold ml-2"
                >
                  Reset All
                </button>
              </div>
            )}

            {/* Property Cards View */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg border border-[#E0E6ED] p-4 aspect-[4/5] animate-pulse" />
                ))}
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl border border-[#E0E6ED] p-12 text-center max-w-lg mx-auto space-y-4">
                <Building className="w-12 h-12 text-[#D4AF37] mx-auto opacity-70" />
                <h3 className="font-poppins font-bold text-xl text-[#0B1F3B]">
                  No matching properties found
                </h3>
                <p className="text-sm text-[#667085]">
                  We couldn't find any properties matching your current filter criteria. Try expanding your search or contact our Pune advisory team for unlisted inventory.
                </p>
                <div className="pt-2">
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-white text-xs font-semibold rounded hover:bg-[#B9952D] transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((prop, idx) => (
                  <ScrollAnimation key={prop.id} animation="slide-up" delay={(idx % 6) * 70} duration={550}>
                    <PropertyCard property={prop} />
                  </ScrollAnimation>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((prop, idx) => (
                  <ScrollAnimation key={prop.id} animation="slide-up" delay={(idx % 6) * 70} duration={550}>
                    <div
                      className="group bg-white rounded-xl border border-[#E0E6ED] overflow-hidden hover:border-[#D4AF37] hover:shadow-cardHover hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row"
                    >
                      <div className="sm:w-72 relative aspect-[16/10] sm:aspect-auto flex-shrink-0 overflow-hidden bg-neutral-100">
                        <img
                          src={prop.images[0]}
                          alt={prop.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <span className="absolute top-2 left-2 bg-[#0B1F3B]/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded">
                          {prop.transactionType}
                        </span>
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-xs text-[#667085] mb-1">
                            {prop.locality}, {prop.city} &bull; {prop.possessionStatus}
                          </div>
                          <h3 className="font-poppins font-bold text-lg text-[#0B1F3B] group-hover:text-[#D4AF37] transition-colors">
                            <a href={`/properties/${prop.slug || prop.id}`}>{prop.title}</a>
                          </h3>
                          <p className="text-xs text-[#667085] line-clamp-2 mt-1.5 leading-relaxed">
                            {prop.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-[#E0E6ED] mt-3 flex flex-wrap items-center justify-between gap-3">
                          <div className="text-lg font-bold font-poppins text-[#D4AF37]">
                            {formatPropertyPrice(prop.price, prop.transactionType)}
                          </div>
                          <div className="text-xs text-[#0B1F3B] flex items-center gap-3">
                            <span className="font-medium">{prop.bhk}</span>
                            <span>&bull;</span>
                            <span className="font-medium">{prop.area} sq.ft.</span>
                            <Link
                              to={`/properties/${prop.slug || prop.id}`}
                              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B9952D] text-[#0B1F3B] rounded-lg text-xs font-bold transition-all duration-200 shadow-sm hover:translate-x-0.5"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
