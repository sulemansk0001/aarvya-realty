import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true },
    city: { type: String, required: true, default: 'Pune' },
    locality: { type: String, required: true, default: 'Hinjawadi' },
    state: { type: String, required: true, default: 'Maharashtra' },
    address: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ['Apartment', 'Villa', 'Independent House', 'Row House', 'Penthouse', 'Commercial Office', 'Commercial Shop', 'Plot'],
      default: 'Apartment',
    },
    transactionType: {
      type: String,
      enum: ['For Sale', 'For Rent'],
      default: 'For Sale',
    },
    bhk: { type: String, required: true, default: '2 BHK' },
    bedrooms: { type: Number, default: 2 },
    bathrooms: { type: Number, default: 2 },
    price: { type: Number, required: true },
    priceDisplay: { type: String },
    area: { type: Number, required: true }, // in sq. ft.
    areaUnit: { type: String, default: 'sq. ft.' },
    possessionStatus: {
      type: String,
      enum: ['Ready to Move', 'Under Construction', 'Resale'],
      default: 'Ready to Move',
    },
    images: [{ type: String }],
    amenities: [{ type: String }],
    specifications: { type: Map, of: String },
    facing: { type: String, default: 'East' },
    furnishing: {
      type: String,
      enum: ['Unfurnished', 'Semi-Furnished', 'Fully Furnished'],
      default: 'Semi-Furnished',
    },
    parking: { type: String, default: '1 Covered' },
    floor: { type: String },
    featured: { type: Boolean, default: false },
    isDemonstration: { type: Boolean, default: true },
    availabilityStatus: { type: String, enum: ['Available', 'Under Offer', 'Sold'], default: 'Available' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Property = mongoose.model('Property', propertySchema);
