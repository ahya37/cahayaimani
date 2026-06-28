// Package types
export interface Package {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  type: PackageType;
  category: PackageCategory;
  destination: string;
  departureCity: string;
  duration: number;
  price: number;
  originalPrice?: number;
  departureDate: string;
  returnDate: string;
  airline: string;
  airlineImage?: string;
  hotelRating: number;
  hotelName: string;
  seatsTotal: number;
  seatsAvailable: number;
  images: string[];
  facilities: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryItem[];
  termsConditions: string[];
  faqs: FAQ[];
  travelId: string;
  travel: TravelCompany;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isVisaIncluded: boolean;
  isMealsIncluded: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PackageType = 'open' | 'private';

export type PackageCategory =
  | 'umrah'
  | 'haji-khusus'
  | 'tour-domestik'
  | 'tour-internasional'
  | 'wisata-halal'
  | 'study-tour'
  | 'corporate-gathering'
  | 'mice';

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

// Travel Company types
export interface TravelCompany {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  email: string;
  website?: string;
  isVerified: boolean;
  verificationDate?: string;
  rating: number;
  totalReviews: number;
  totalPackages: number;
  totalCustomers: number;
  establishedYear: number;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}

// Booking types
export interface Booking {
  id: string;
  code: string;
  packageId: string;
  packageName: string;
  customerId: string;
  customer: Customer;
  passengers: Passenger[];
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  paidAmount: number;
  departureDate: string;
  createdAt: string;
  updatedAt: string;
  timeline: BookingTimeline[];
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'departed'
  | 'completed'
  | 'cancelled';

export type PaymentStatus =
  | 'unpaid'
  | 'partial'
  | 'paid'
  | 'refunded';

export interface BookingTimeline {
  status: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
}

// Customer types
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  nik: string;
  passportNumber?: string;
  passportExpiry?: string;
}

export interface Passenger {
  id: string;
  name: string;
  relationship: string;
  nik: string;
  passportNumber?: string;
  passportExpiry?: string;
  birthDate: string;
  gender: 'male' | 'female';
  phone?: string;
  email?: string;
}

// Review types
export interface Review {
  id: string;
  rating: number;
  comment: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  packageId: string;
  travelId: string;
  createdAt: string;
  reply?: ReviewReply;
}

export interface ReviewReply {
  content: string;
  repliedAt: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'travel' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
}

// Search & Filter types
export interface SearchFilters {
  destination?: string;
  departureCity?: string;
  departureDate?: string;
  travelId?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
  airline?: string;
  hotelRating?: number;
  packageType?: PackageType;
  category?: PackageCategory;
  isVisaIncluded?: boolean;
  isMealsIncluded?: boolean;
}

export interface SearchParams {
  query?: string;
  filters?: SearchFilters;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'departure' | 'popularity';
  page?: number;
  limit?: number;
}

// Stats types
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  totalPackages: number;
  upcomingDepartures: number;
  pendingPayments: number;
}
