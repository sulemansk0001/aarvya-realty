import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    preferredCity: { type: String, default: 'Pune' },
    preferredLocality: { type: String, default: 'Hinjawadi' },
    budget: { type: String },
    interestedIn: { type: String, default: 'Buying Property' },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    propertyTitle: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ['new', 'contacted', 'scheduled', 'closed'], default: 'new' },
  },
  { timestamps: true }
);

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
