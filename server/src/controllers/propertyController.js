import { Property } from '../models/Property.js';

// In-memory fallback if MongoDB is not active
const FALLBACK_PROPERTIES = [
  {
    _id: 'prop-pune-01',
    id: 'prop-pune-01',
    slug: 'premium-2-bhk-apartment-baner',
    title: 'Premium 2 BHK Modern Apartment',
    description: 'Thoughtfully designed 2 BHK residence located in the prime residential enclave of Baner, Pune. Features an open-concept living and dining area, modular Italian-styled kitchen with granite platform, cross-ventilated bedrooms, and a scenic balcony overlooking the Baner hillscapes.',
    price: 8500000,
    priceDisplay: '₹85 Lakh',
    propertyType: 'Apartment',
    transactionType: 'For Sale',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: 1050,
    city: 'Pune',
    locality: 'Baner',
    state: 'Maharashtra',
    address: 'Near Pan Card Club Road, Baner, Pune 411045',
    featured: true,
    possessionStatus: 'Ready to Move',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['24/7 Security', 'Swimming Pool', 'Gymnasium', 'Covered Parking', 'Clubhouse'],
    specifications: { 'Super Built-up Area': '1,050 sq. ft.', 'Carpet Area': '812 sq. ft.' },
    facing: 'East',
    furnishing: 'Semi-Furnished',
    parking: '1 Covered',
    floor: '8th of 14',
    isDemonstration: true,
  },
  {
    _id: 'prop-pune-02',
    id: 'prop-pune-02',
    slug: 'modern-3-bhk-residence-kharadi',
    title: 'Modern 3 BHK Luxury Residence',
    description: 'An elegant high-rise 3 BHK flat situated moments away from EON Free Zone and World Trade Center in Kharadi, Pune. Offers panoramic city skyline views, expansive master suite with wooden flooring, imported vitrified tiles, designer sanitary fittings, and smart home provisions.',
    price: 13500000,
    priceDisplay: '₹1.35 Cr',
    propertyType: 'Apartment',
    transactionType: 'For Sale',
    bhk: '3 BHK',
    bedrooms: 3,
    bathrooms: 3,
    area: 1450,
    city: 'Pune',
    locality: 'Kharadi',
    state: 'Maharashtra',
    address: 'Near EON IT Park, Kharadi, Pune 411014',
    featured: true,
    possessionStatus: 'Ready to Move',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Infinity Pool', 'Sky Lounge', 'Gymnasium', '3-Tier Security', 'EV Charging'],
    specifications: { 'Super Built-up Area': '1,450 sq. ft.', 'Carpet Area': '1,120 sq. ft.' },
    facing: 'North-East',
    furnishing: 'Unfurnished',
    parking: '2 Covered Reserved',
    floor: '12th of 22',
    isDemonstration: true,
  },
  {
    _id: 'prop-pune-03',
    id: 'prop-pune-03',
    slug: 'spacious-2-bhk-hinjawadi-phase-1',
    title: 'Spacious 2 BHK Near IT Hub',
    description: 'Perfect for tech professionals working in Rajiv Gandhi Infotech Park, Hinjawadi Phase 1. This peaceful residential apartment features generous natural lighting, modern finishes, separate utility area, and seamless connectivity to Mumbai-Pune Expressway.',
    price: 6800000,
    priceDisplay: '₹68 Lakh',
    propertyType: 'Apartment',
    transactionType: 'For Sale',
    bhk: '2 BHK',
    bedrooms: 2,
    bathrooms: 2,
    area: 980,
    city: 'Pune',
    locality: 'Hinjawadi',
    state: 'Maharashtra',
    address: 'Phase 1, Hinjawadi, Pune 411057',
    propertyType: 'Apartment',
    featured: true,
    possessionStatus: 'Ready to Move',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    ],
    amenities: ['Gym', 'Central Park', 'CCTV Security', 'Power Backup'],
    specifications: { 'Super Built-up Area': '980 sq. ft.', 'Carpet Area': '750 sq. ft.' },
    facing: 'East',
    furnishing: 'Semi-Furnished',
    parking: '1 Covered',
    floor: '5th of 11',
    isDemonstration: true,
  },
];

export const getProperties = async (req, res, next) => {
  try {
    const { city, locality, type, propertyType, bhk, minPrice, maxPrice, q } = req.query;

    let query = {};
    if (city) query.city = new RegExp(city, 'i');
    if (locality) query.locality = new RegExp(locality, 'i');
    if (type) query.transactionType = type;
    if (propertyType) query.propertyType = propertyType;
    if (bhk) query.bhk = bhk;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (q) {
      const regex = new RegExp(q, 'i');
      query.$or = [{ title: regex }, { locality: regex }, { description: regex }];
    }

    try {
      const properties = await Property.find(query).sort({ createdAt: -1 });
      if (properties && properties.length > 0) {
        return res.json(properties);
      }
    } catch {
      // Fallback
    }

    // Return in-memory fallback
    return res.json(FALLBACK_PROPERTIES);
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let prop;
    try {
      prop = await Property.findOne({ $or: [{ _id: id }, { slug: id }] });
    } catch {
      // Ignore id format issues and search fallback
    }

    if (!prop) {
      prop = FALLBACK_PROPERTIES.find((p) => p.id === id || p.slug === id || p._id === id);
    }

    if (!prop) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(prop);
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (req, res, next) => {
  try {
    const data = req.body;
    const slug = data.slug || (data.title || 'prop').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    try {
      const created = await Property.create({
        ...data,
        slug,
        isDemonstration: false,
      });
      return res.status(201).json(created);
    } catch {
      // Local memory fallback
      const newProp = {
        _id: 'prop-' + Date.now(),
        id: 'prop-' + Date.now(),
        ...data,
        slug,
        isDemonstration: false,
        createdAt: new Date().toISOString(),
      };
      FALLBACK_PROPERTIES.unshift(newProp);
      return res.status(201).json(newProp);
    }
  } catch (error) {
    next(error);
  }
};
