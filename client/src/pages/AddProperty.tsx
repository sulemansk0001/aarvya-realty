import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyService } from '../services/api';
import { PropertyType, TransactionType, PossessionStatus } from '../types';
import { Building, PlusCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { ScrollAnimation } from '../components/common/ScrollAnimation';

export const AddProperty: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    propertyType: 'Apartment' as PropertyType,
    transactionType: 'For Sale' as TransactionType,
    bhk: '2 BHK',
    bedrooms: '2',
    bathrooms: '2',
    area: '',
    city: 'Pune',
    locality: 'Hinjawadi',
    address: '',
    possessionStatus: 'Ready to Move' as PossessionStatus,
    imageUrl: '',
    amenities: 'Security, Covered Parking, Power Backup, Water Supply',
  });

  const [status, setStatus] = useState<{ loading: boolean; message: string; success: boolean } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.area) return;

    setStatus({ loading: true, message: '', success: false });

    try {
      const created = await PropertyService.create({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        propertyType: form.propertyType,
        transactionType: form.transactionType,
        bhk: form.bhk,
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        area: Number(form.area),
        city: form.city,
        locality: form.locality,
        state: 'Maharashtra',
        address: form.address || `${form.locality}, ${form.city}, Maharashtra`,
        possessionStatus: form.possessionStatus,
        images: form.imageUrl ? [form.imageUrl] : [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
        ],
        amenities: form.amenities.split(',').map((s) => s.trim()).filter(Boolean),
        isDemonstration: false,
      });

      setStatus({ loading: false, message: 'Property submitted successfully! Redirecting...', success: true });
      setTimeout(() => {
        navigate(`/properties/${created.slug || created.id}`);
      }, 1500);
    } catch (err) {
      setStatus({ loading: false, message: 'Failed to submit property listing.', success: false });
    }
  };

  return (
    <div className="bg-[#F5F7FA] min-h-screen py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fade-in" duration={500}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              Owner & Advisory Submissions
            </span>
            <h1 className="text-3xl font-poppins font-bold text-[#0B1F3B]">
              List Your Property in Pune
            </h1>
            <p className="mt-2 text-sm text-[#667085]">
              Provide accurate details about your residential or commercial asset to reach genuine homebuyers in Maharashtra.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="slide-up" delay={100} duration={600}>
          <div className="bg-white rounded-2xl border border-[#E0E6ED] p-8 sm:p-10 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                Property Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Spacious 2 BHK Corner Apartment in Baner"
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>

            {/* Transaction & Property Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  Transaction Type *
                </label>
                <select
                  value={form.transactionType}
                  onChange={(e) => setForm({ ...form, transactionType: e.target.value as TransactionType })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  Property Category *
                </label>
                <select
                  value={form.propertyType}
                  onChange={(e) => setForm({ ...form, propertyType: e.target.value as PropertyType })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Apartment">Apartment / Flat</option>
                  <option value="Villa">Independent Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial Office">Commercial Office</option>
                  <option value="Commercial Shop">Commercial Shop</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  BHK Configuration *
                </label>
                <select
                  value={form.bhk}
                  onChange={(e) => setForm({ ...form, bhk: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                  <option value="Commercial">Commercial / Studio</option>
                </select>
              </div>
            </div>

            {/* Price & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  Price in INR (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="e.g. 8500000 for ₹85 Lakh"
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  Super Built-up Area (sq. ft.) *
                </label>
                <input
                  type="number"
                  required
                  value={form.area}
                  onChange={(e) => setForm({ ...form, area: e.target.value })}
                  placeholder="e.g. 1050"
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
                />
              </div>
            </div>

            {/* Locality & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={form.city}
                  disabled
                  className="w-full px-3.5 py-2.5 bg-neutral-100 border border-[#E0E6ED] rounded text-sm text-neutral-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  Pune Locality *
                </label>
                <select
                  value={form.locality}
                  onChange={(e) => setForm({ ...form, locality: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Hinjawadi">Hinjawadi</option>
                  <option value="Baner">Baner</option>
                  <option value="Wakad">Wakad</option>
                  <option value="Kharadi">Kharadi</option>
                  <option value="Viman Nagar">Viman Nagar</option>
                  <option value="Kothrud">Kothrud</option>
                  <option value="Bavdhan">Bavdhan</option>
                  <option value="Pimple Saudagar">Pimple Saudagar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                  Possession Status *
                </label>
                <select
                  value={form.possessionStatus}
                  onChange={(e) => setForm({ ...form, possessionStatus: e.target.value as PossessionStatus })}
                  className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Ready to Move">Ready to Move</option>
                  <option value="Under Construction">Under Construction</option>
                  <option value="Resale">Resale</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                Society Name / Detailed Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. Near Pan Card Club Road, Baner, Pune 411045"
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                Property Description *
              </label>
              <textarea
                rows={4}
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe key highlights, balcony views, ventilation, interior fixtures, and nearby landmarks..."
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white resize-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-semibold text-[#0B1F3B] mb-1">
                Photograph URL (Unsplash or direct image link)
              </label>
              <input
                type="url"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-3.5 py-2.5 bg-[#F5F7FA] border border-[#E0E6ED] rounded text-sm text-[#0B1F3B] focus:outline-none focus:border-[#D4AF37] focus:bg-white"
              />
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-[#E0E6ED]">
              <button
                type="submit"
                disabled={status?.loading}
                className="w-full py-3 bg-[#D4AF37] hover:bg-[#B9952D] text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Property for Review</span>
              </button>
            </div>

            {status && (
              <p className={`text-xs p-3 rounded ${status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </ScrollAnimation>
    </div>
  </div>
);
};
