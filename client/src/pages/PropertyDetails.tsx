import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Compass,
  Car,
  CheckCircle2,
  Phone,
  Mail,
  Heart,
  Share2,
  ShieldCheck,
  Building,
  Info,
  ChevronRight,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { PropertyService, EnquiryService } from '../services/api';
import { Property } from '../types';
import { formatINR, formatPropertyPrice, COMPANY_DETAILS, calculateHomeLoanEMI } from '../utils/formatters';
import { useWishlist } from '../context/WishlistContext';
import { PropertyCard } from '../components/properties/PropertyCard';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: 'Hello, I am interested in this property. Please share further details and arrange a site visit.',
  });
  const [enquiryStatus, setEnquiryStatus] = useState<{ loading: boolean; message: string; success: boolean } | null>(null);

  // Wishlist state
  const { isWishlisted, toggleWishlist } = useWishlist();

  // Quick mini EMI calculation
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [tenureYears, setTenureYears] = useState<number>(20);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const found = await PropertyService.getById(id);
        if (found) {
          setProperty(found);
          const all = await PropertyService.getAll();
          const similar = all.filter((p) => p.id !== found.id && (p.locality === found.locality || p.bhk === found.bhk)).slice(0, 3);
          setSimilarProperties(similar);
        }
      } catch (err) {
        console.error('Error fetching property details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property || !enquiryForm.name || !enquiryForm.phone) return;

    setEnquiryStatus({ loading: true, message: '', success: false });
    const res = await EnquiryService.submitEnquiry({
      name: enquiryForm.name,
      email: enquiryForm.email || `${enquiryForm.name.toLowerCase().replace(/\s+/g, '')}@lead.aarvya.in`,
      phone: enquiryForm.phone,
      propertyId: property.id,
      propertyTitle: property.title,
      preferredLocality: property.locality,
      message: enquiryForm.message,
    });

    setEnquiryStatus({ loading: false, message: res.message, success: res.success });
    if (res.success) {
      setEnquiryForm({ name: '', phone: '', email: '', message: '' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#667085]">Loading property details from Pune database...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-xl border border-[#E0E6ED] text-center max-w-md shadow-card">
          <h2 className="text-2xl font-poppins font-bold text-[#0B1F3B]">Property Not Found</h2>
          <p className="text-sm text-[#667085] mt-2 mb-6">
            The property listing you requested could not be located or may have been updated.
          </p>
          <Link
            to="/properties"
            className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(property.id);
  const downPaymentAmount = Math.round((property.price * downPaymentPercent) / 100);
  const emiData = calculateHomeLoanEMI(property.price, downPaymentAmount, 8.5, tenureYears);

  return (
    <div className="bg-[#F5F7FA] min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#E0E6ED] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <Link to="/" className="hover:text-[#D4AF37]">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/properties" className="hover:text-[#D4AF37]">Properties</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to={`/properties?locality=${property.locality}`} className="hover:text-[#D4AF37]">{property.locality}</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#0B1F3B] font-medium truncate max-w-[200px] sm:max-w-none">
                {property.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleWishlist(property.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                  wishlisted ? 'bg-red-50 text-red-600 border-red-200' : 'bg-[#F5F7FA] text-[#0B1F3B] border-[#E0E6ED] hover:bg-neutral-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{wishlisted ? 'Saved' : 'Save'}</span>
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: property.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Property link copied to clipboard!');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-[#F5F7FA] text-[#0B1F3B] border border-[#E0E6ED] hover:bg-neutral-100"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Title, Locality & Pricing Header Bar */}
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#D4AF37] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded uppercase">
                  {property.transactionType}
                </span>
                <span className="bg-[#0B1F3B] text-white text-[11px] font-medium px-2.5 py-0.5 rounded">
                  {property.possessionStatus}
                </span>
                {property.isDemonstration && (
                  <span className="bg-amber-100 text-amber-900 border border-amber-300/60 text-[10px] font-medium px-2 py-0.5 rounded">
                    Demonstration Showcase
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-4xl font-poppins font-bold text-[#0B1F3B]">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-[#667085] mt-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>{property.address}</span>
              </div>
            </div>

            <div className="lg:text-right">
              <span className="text-xs uppercase font-medium text-[#667085] tracking-wider block">
                {property.transactionType === 'For Rent' ? 'Monthly Rent' : 'All-Inclusive Guidance Price'}
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold font-poppins text-[#D4AF37]">
                {formatPropertyPrice(property.price, property.transactionType)}
              </span>
              <span className="text-xs text-[#667085] block mt-0.5">
                Approx. ₹{Math.round(property.price / property.area).toLocaleString('en-IN')}/sq.ft.
              </span>
            </div>
          </div>
        </ScrollAnimation>

        {/* Image Gallery */}
        <ScrollAnimation animation="zoom-in" delay={100} duration={600}>
          <div className="mb-10 space-y-3">
            <div className="relative aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden border border-[#E0E6ED] bg-neutral-900 shadow-card group">
              <img
                src={property.images[selectedImageIndex] || property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
                Photo {selectedImageIndex + 1} of {property.images.length}
              </div>
            </div>

            {/* Thumbnails row */}
            {property.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all duration-200 cursor-pointer ${
                      selectedImageIndex === idx ? 'border-[#D4AF37] shadow-md scale-105' : 'border-transparent opacity-75 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollAnimation>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Details, Specs, Amenities, Calculator (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Overview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-card transition-all duration-250 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#667085] block">Configuration</span>
                  <span className="text-sm font-bold font-poppins text-[#0B1F3B]">{property.bhk}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-card transition-all duration-250 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#667085] block">Bathrooms</span>
                  <span className="text-sm font-bold font-poppins text-[#0B1F3B]">{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-card transition-all duration-250 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#667085] block">Super Area</span>
                  <span className="text-sm font-bold font-poppins text-[#0B1F3B]">{property.area} sq.ft.</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E0E6ED] shadow-subtle hover:border-[#D4AF37] hover:-translate-y-1 hover:shadow-card transition-all duration-250 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F5F7FA] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-[#667085] block">Facing</span>
                  <span className="text-sm font-bold font-poppins text-[#0B1F3B]">{property.facing || 'East'}</span>
                </div>
              </div>
            </div>

            {/* Property Overview / Description */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E0E6ED] shadow-subtle hover:shadow-card transition-shadow space-y-4">
              <h2 className="text-xl font-poppins font-bold text-[#0B1F3B]">
                Property Overview
              </h2>
              <p className="text-sm text-[#0B1F3B] leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E0E6ED] shadow-subtle hover:shadow-card transition-shadow space-y-4">
              <h2 className="text-xl font-poppins font-bold text-[#0B1F3B]">
                Property Specifications & Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 pt-2">
                <div className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                  <span className="text-[#667085]">Property Type</span>
                  <span className="font-semibold text-[#0B1F3B]">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                  <span className="text-[#667085]">Transaction Type</span>
                  <span className="font-semibold text-[#0B1F3B]">{property.transactionType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                  <span className="text-[#667085]">Possession Status</span>
                  <span className="font-semibold text-[#0B1F3B]">{property.possessionStatus}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                  <span className="text-[#667085]">Floor</span>
                  <span className="font-semibold text-[#0B1F3B]">{property.floor || 'Middle Floor'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                  <span className="text-[#667085]">Furnishing</span>
                  <span className="font-semibold text-[#0B1F3B]">{property.furnishing || 'Semi-Furnished'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                  <span className="text-[#667085]">Parking Slot</span>
                  <span className="font-semibold text-[#0B1F3B]">{property.parking || '1 Reserved'}</span>
                </div>
                {property.specifications &&
                  Object.entries(property.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-[#E0E6ED] text-xs hover:bg-[#F5F7FA] px-2 rounded transition-colors">
                      <span className="text-[#667085]">{key}</span>
                      <span className="font-semibold text-[#0B1F3B]">{val}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E0E6ED] shadow-subtle hover:shadow-card transition-shadow space-y-4">
              <h2 className="text-xl font-poppins font-bold text-[#0B1F3B]">
                Amenities & Society Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-[#0B1F3B] bg-[#F5F7FA] p-3 rounded-lg border border-[#E0E6ED]/70 hover:border-[#D4AF37] hover:bg-white hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick EMI Estimator for this Property */}
            {property.transactionType === 'For Sale' && (
              <div className="bg-[#F5F7FA] p-6 sm:p-8 rounded-xl border border-[#E0E6ED] shadow-subtle space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E0E6ED]">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-lg font-poppins font-bold text-[#0B1F3B]">
                      Estimated Loan EMI for this Home
                    </h3>
                  </div>
                  <span className="text-xs text-[#667085]">8.5% p.a. standard</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-[#667085] block mb-1">
                      Down Payment: {downPaymentPercent}% ({formatINR(downPaymentAmount)})
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      step={5}
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#667085] block mb-1">
                      Loan Tenure: {tenureYears} Years
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={5}
                      value={tenureYears}
                      onChange={(e) => setTenureYears(Number(e.target.value))}
                      className="w-full accent-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-[#E0E6ED] flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#667085] block">Estimated Monthly Instalment</span>
                    <span className="text-2xl font-bold font-poppins text-[#D4AF37]">
                      {formatINR(emiData.monthlyEMI)}
                      <span className="text-xs font-normal text-[#667085]"> /mo</span>
                    </span>
                  </div>
                  <Link
                    to="/#calculator"
                    className="text-xs text-[#D4AF37] font-semibold hover:underline"
                  >
                    Customise in Full Calculator &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Aarvya Advisory Desk & Enquiry Form (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl border border-[#E0E6ED] shadow-card overflow-hidden sticky top-28">
              {/* Header Box */}
              <div className="bg-[#0B1F3B] text-white p-6">
                <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1">
                  Pune Property Advisory
                </span>
                <h3 className="text-lg font-poppins font-bold text-white">
                  Aarvya Realty Advisory Desk
                </h3>
                <p className="text-xs text-neutral-300 mt-1">
                  Direct consultant representation &bull; Office in {COMPANY_DETAILS.address}
                </p>

                <div className="mt-4 pt-3 border-t border-neutral-700 flex flex-col gap-2 text-xs">
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                    className="flex items-center gap-2 text-white hover:text-[#D4AF37] transition-colors font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{COMPANY_DETAILS.phoneDisplay}</span>
                  </a>
                  <a
                    href={`mailto:${COMPANY_DETAILS.email}`}
                    className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="truncate">{COMPANY_DETAILS.email}</span>
                  </a>
                </div>
              </div>

              {/* Enquiry Form */}
              <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                <h4 className="text-sm font-poppins font-bold text-[#0B1F3B]">
                  Schedule Site Visit or Enquire
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                    Indian Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={enquiryForm.phone}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={enquiryForm.email}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                    placeholder="you@domain.com"
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                    Message / Preferred Day for Site Visit
                  </label>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3 py-2 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-xs text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={enquiryStatus?.loading}
                  className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded transition-colors duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Send Property Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {enquiryStatus && (
                  <p className={`text-xs p-2.5 rounded ${enquiryStatus.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {enquiryStatus.message}
                  </p>
                )}

                <div className="pt-2 text-[11px] text-[#667085] flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  <span>Your enquiry is sent directly to Aarvya Realty advisors. We respect your privacy.</span>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E0E6ED]">
            <ScrollAnimation animation="fade-in" duration={500}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Recommendations
                  </span>
                  <h3 className="text-2xl font-poppins font-bold text-[#0B1F3B]">
                    Similar Properties in {property.locality} & Pune
                  </h3>
                </div>
                <Link to="/properties" className="text-xs font-semibold text-[#D4AF37] hover:underline">
                  View All &rarr;
                </Link>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p, idx) => (
                <ScrollAnimation key={p.id} animation="slide-up" delay={idx * 100} duration={600}>
                  <PropertyCard property={p} />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
