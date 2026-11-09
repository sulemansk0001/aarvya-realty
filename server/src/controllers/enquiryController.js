import { Enquiry } from '../models/Enquiry.js';

const IN_MEMORY_ENQUIRIES = [];

export const submitEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, preferredCity, preferredLocality, budget, interestedIn, propertyId, propertyTitle, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and Indian phone number are required.' });
    }

    const payload = {
      name,
      email: email || 'enquiry@aarvya.in',
      phone,
      preferredCity: preferredCity || 'Pune',
      preferredLocality: preferredLocality || 'Hinjawadi',
      budget: budget || '₹50 Lakh – ₹1 Crore',
      interestedIn: interestedIn || 'Buying Property',
      property: propertyId || null,
      propertyTitle: propertyTitle || 'Direct Consultancy Request',
      message: message || 'Interested in Pune real estate advisory.',
      createdAt: new Date(),
    };

    try {
      const saved = await Enquiry.create(payload);
      return res.status(201).json({
        success: true,
        message: 'Your enquiry has been received by Aarvya Realty Pune. Our advisory desk will reach out shortly.',
        data: saved,
      });
    } catch {
      IN_MEMORY_ENQUIRIES.unshift(payload);
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your enquiry has been logged with Aarvya Realty (Hinjewadi Phase 1). We will contact you at +91 84464 16101.',
        data: payload,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getEnquiries = async (req, res, next) => {
  try {
    try {
      const list = await Enquiry.find().sort({ createdAt: -1 });
      if (list && list.length > 0) return res.json(list);
    } catch {}
    res.json(IN_MEMORY_ENQUIRIES);
  } catch (error) {
    next(error);
  }
};
