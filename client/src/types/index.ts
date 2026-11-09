export type TransactionType = 'For Sale' | 'For Rent';

export type PropertyType =
  | 'Apartment'
  | 'Villa'
  | 'Independent House'
  | 'Row House'
  | 'Penthouse'
  | 'Commercial Office'
  | 'Commercial Shop'
  | 'Plot';

export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'Resale';

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  priceDisplay?: string;
  propertyType: PropertyType;
  transactionType: TransactionType;
  bhk: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sq. ft.
  areaUnit?: string;
  city: string;
  locality: string;
  state: string;
  address: string;
  featured: boolean;
  possessionStatus: PossessionStatus;
  images: string[];
  amenities: string[];
  specifications: Record<string, string>;
  facing?: string;
  furnishing?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  parking?: string;
  floor?: string;
  isDemonstration: boolean;
  createdAt?: string;
}

export interface PropertyFilterParams {
  query?: string;
  city?: string;
  locality?: string;
  transactionType?: string;
  propertyType?: string;
  bhk?: string;
  minPrice?: number;
  maxPrice?: number;
  possessionStatus?: string;
  minArea?: number;
  maxArea?: number;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export interface EnquirySubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  preferredCity?: string;
  preferredLocality?: string;
  budget?: string;
  interestedIn?: string;
  propertyId?: string;
  propertyTitle?: string;
  message: string;
  createdAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface LocationCardData {
  id: string;
  name: string;
  city: string;
  state: string;
  type: 'neighbourhood' | 'city';
  propertyCount: number;
  image: string;
  description: string;
  avgPriceSqFt: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  locality: string;
  city: string;
  review: string;
  rating: number;
  propertyType: string;
  date: string;
  avatar?: string;
  isDemonstration: boolean;
}
