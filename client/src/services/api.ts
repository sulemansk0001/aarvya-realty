import { Property, EnquirySubmission, BlogPost } from '../types';
import { MOCK_PROPERTIES, BLOG_POSTS } from '../data/mockData';

const ENQUIRIES_STORAGE_KEY = 'aarvya_submitted_enquiries';
const CUSTOM_PROPERTIES_STORAGE_KEY = 'aarvya_user_properties';
const NEWSLETTER_STORAGE_KEY = 'aarvya_newsletter_subs';

export const PropertyService = {
  /**
   * Fetch all properties (mock combined with user added ones)
   */
  async getAll(): Promise<Property[]> {
    try {
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch {
      // Backend not yet active, fallback to local storage + mock
    }

    try {
      const custom = localStorage.getItem(CUSTOM_PROPERTIES_STORAGE_KEY);
      const userProps: Property[] = custom ? JSON.parse(custom) : [];
      return [...userProps, ...MOCK_PROPERTIES];
    } catch {
      return MOCK_PROPERTIES;
    }
  },

  async getById(id: string): Promise<Property | undefined> {
    const all = await this.getAll();
    return all.find((p) => p.id === id || p.slug === id);
  },

  async create(propertyData: Partial<Property>): Promise<Property> {
    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Local fallback
    }

    const newProperty: Property = {
      id: 'prop-' + Date.now(),
      slug: (propertyData.title || 'property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: propertyData.title || 'Untitled Property',
      description: propertyData.description || '',
      price: propertyData.price || 0,
      priceDisplay: propertyData.price ? `₹${(propertyData.price / 100000).toFixed(0)} Lakh` : '₹0',
      propertyType: propertyData.propertyType || 'Apartment',
      transactionType: propertyData.transactionType || 'For Sale',
      bhk: propertyData.bhk || '2 BHK',
      bedrooms: propertyData.bedrooms || 2,
      bathrooms: propertyData.bathrooms || 2,
      area: propertyData.area || 1000,
      city: propertyData.city || 'Pune',
      locality: propertyData.locality || 'Hinjawadi',
      state: 'Maharashtra',
      address: propertyData.address || 'Pune, Maharashtra',
      featured: false,
      possessionStatus: propertyData.possessionStatus || 'Ready to Move',
      images: propertyData.images && propertyData.images.length > 0 ? propertyData.images : [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: propertyData.amenities || ['Security', 'Covered Parking', 'Water Supply'],
      specifications: propertyData.specifications || { 'Carpet Area': `${propertyData.area || 1000} sq. ft.` },
      isDemonstration: false,
      createdAt: new Date().toISOString(),
    };

    try {
      const stored = localStorage.getItem(CUSTOM_PROPERTIES_STORAGE_KEY);
      const existing: Property[] = stored ? JSON.parse(stored) : [];
      existing.unshift(newProperty);
      localStorage.setItem(CUSTOM_PROPERTIES_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('Failed to save property in localStorage', e);
    }

    return newProperty;
  },
};

export const EnquiryService = {
  async submitEnquiry(enquiry: EnquirySubmission): Promise<{ success: boolean; message: string }> {
    const payload = {
      ...enquiry,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        return { success: true, message: 'Thank you! Your enquiry has been received. Our Pune property consultants will contact you shortly.' };
      }
    } catch {
      // Backend unavailable, store locally
    }

    try {
      const existing = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(payload);
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Failed to save enquiry in localStorage', e);
    }

    return {
      success: true,
      message: 'Thank you! Your enquiry has been logged successfully. An Aarvya Realty advisor from Hinjewadi Phase 1 will connect with you via +91 84464 16101.',
    };
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) return { success: true, message: 'Subscribed to Aarvya Realty Pune Property Insights successfully!' };
    } catch {
      // Fallback
    }

    try {
      const existing = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
      const list = existing ? JSON.parse(existing) : [];
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(list));
      }
    } catch (e) {
      console.warn('Failed to save newsletter subscriber', e);
    }

    return { success: true, message: 'Subscribed! You will receive verified Pune real estate market updates.' };
  },
};

export const BlogService = {
  async getAll(): Promise<BlogPost[]> {
    return BLOG_POSTS;
  },

  async getBySlug(slug: string): Promise<BlogPost | undefined> {
    return BLOG_POSTS.find((b) => b.slug === slug);
  },
};
