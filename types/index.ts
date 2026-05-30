export interface Property {
  id: string;
  title: string;
  description: string;
  price: number; // stored in full rupees (e.g. 7500000 = ₹75 Lakhs)
  location: string;
  city: string;
  type: 'flat' | 'villa' | 'plot' | 'commercial' | 'penthouse';
  bhk: number | null;
  area_sqft: number;
  facing: 'North' | 'South' | 'East' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West' | null;
  floor: number | null;
  total_floors: number | null;
  amenities: string[] | null;
  contact_phone: string | null;
  is_featured: boolean;
  status: 'available' | 'sold' | 'rented';
  created_at: string;
  updated_at: string;
  images?: PropertyImage[];
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  property_id: string | null;
  is_read: boolean;
  created_at: string;
}
