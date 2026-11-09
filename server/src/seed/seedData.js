import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Property } from '../models/Property.js';
import { User } from '../models/User.js';
import { Blog } from '../models/Blog.js';

dotenv.config();

const SEED_PROPERTIES = [
  {
    title: 'Premium 2 BHK Modern Apartment',
    slug: 'premium-2-bhk-apartment-baner',
    description: 'Thoughtfully designed 2 BHK residence located in the prime residential enclave of Baner, Pune. Features an open-concept living and dining area, modular Italian-styled kitchen with granite platform, cross-ventilated bedrooms, and a scenic balcony overlooking the Baner hillscapes.',
    city: 'Pune',
    locality: 'Baner',
    state: 'Maharashtra',
    address: 'Near Pan Card Club Road, Baner, Pune 411045',
    propertyType: 'Apartment',
    transactionType: 'For Sale',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    price: 8500000,
    priceDisplay: '₹85 Lakh',
    area: 1050,
    possessionStatus: 'Ready to Move',
    featured: true,
    isDemonstration: true,
    facing: 'East',
    furnishing: 'Semi-Furnished',
    parking: '1 Covered',
    floor: '8th of 14',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['24/7 Security', 'Swimming Pool', 'Gymnasium', 'Covered Parking', 'Clubhouse'],
  },
  {
    title: 'Modern 3 BHK Luxury Residence',
    slug: 'modern-3-bhk-residence-kharadi',
    description: 'An elegant high-rise 3 BHK flat situated moments away from EON Free Zone and World Trade Center in Kharadi, Pune. Offers panoramic city skyline views, expansive master suite with wooden flooring, imported vitrified tiles, designer sanitary fittings, and smart home provisions.',
    city: 'Pune',
    locality: 'Kharadi',
    state: 'Maharashtra',
    address: 'Near EON IT Park, Kharadi, Pune 411014',
    propertyType: 'Apartment',
    transactionType: 'For Sale',
    bhk: '3 BHK',
    bedrooms: 3,
    bathrooms: 3,
    price: 13500000,
    priceDisplay: '₹1.35 Cr',
    area: 1450,
    possessionStatus: 'Ready to Move',
    featured: true,
    isDemonstration: true,
    facing: 'North-East',
    furnishing: 'Unfurnished',
    parking: '2 Covered Reserved',
    floor: '12th of 22',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Infinity Pool', 'Sky Lounge', 'Gymnasium', '3-Tier Security', 'EV Charging'],
  },
  {
    title: 'Spacious 2 BHK Near IT Hub',
    slug: 'spacious-2-bhk-hinjawadi-phase-1',
    description: 'Perfect for tech professionals working in Rajiv Gandhi Infotech Park, Hinjawadi Phase 1. This peaceful residential apartment features generous natural lighting, modern finishes, separate utility area, and seamless connectivity to Mumbai-Pune Expressway.',
    city: 'Pune',
    locality: 'Hinjawadi',
    state: 'Maharashtra',
    address: 'Phase 1, Hinjawadi, Pune 411057',
    propertyType: 'Apartment',
    transactionType: 'For Sale',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    price: 6800000,
    priceDisplay: '₹68 Lakh',
    area: 980,
    possessionStatus: 'Ready to Move',
    featured: true,
    isDemonstration: true,
    facing: 'East',
    furnishing: 'Semi-Furnished',
    parking: '1 Covered',
    floor: '5th of 11',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Gym', 'Central Park', 'CCTV Security', 'Power Backup'],
  },
];

export const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aarvya_realty';
  try {
    await mongoose.connect(uri);
    console.log('[Seed] Connected to MongoDB');

    // Seed Properties
    const count = await Property.countDocuments();
    if (count === 0) {
      await Property.insertMany(SEED_PROPERTIES);
      console.log(`[Seed] Seeded ${SEED_PROPERTIES.length} demonstration properties.`);
    }

    // Seed default admin user
    const adminExists = await User.findOne({ email: 'admin@aarvyarealty.in' });
    if (!adminExists) {
      await User.create({
        name: 'Aarvya Admin',
        email: 'admin@aarvyarealty.in',
        password: 'AdminPassword123!',
        phone: '+91 84464 16101',
        role: 'admin',
      });
      console.log('[Seed] Created default admin account: admin@aarvyarealty.in');
    }
    console.log('[Seed] Seeding completed.');
  } catch (err) {
    console.warn('[Seed] Seeding skipped (Database offline or non-blocking):', err.message);
  }
};

if (process.argv[1].endsWith('seedData.js')) {
  seedDatabase().then(() => process.exit(0));
}
