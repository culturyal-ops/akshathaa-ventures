import { supabase } from '@/lib/supabase';

export interface PropertyFilters {
  location?: string;
  type?: string;
  bhk?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

export const getFilteredProperties = async (filters: PropertyFilters) => {
  let query = supabase
    .from('properties')
    .select('*, images:property_images(*)')
    .eq('status', 'available')
    .order('created_at', { ascending: false });

  if (filters.location) query = query.eq('location', filters.location);
  if (filters.type) query = query.eq('type', filters.type);
  if (filters.bhk) query = query.eq('bhk', filters.bhk);
  if (filters.minPrice) query = query.gte('price', filters.minPrice);
  if (filters.maxPrice) query = query.lte('price', filters.maxPrice);

  // Each selected amenity must be present — AND logic, not OR
  if (filters.amenities?.length) {
    filters.amenities.forEach(amenity => {
      query = query.filter('amenities', 'cs', `{"${amenity}"}`);
    });
  }

  const { data, error } = await query;
  if (error) throw error;
  
  // Sort images by display_order
  return data?.map(prop => ({
    ...prop,
    images: prop.images?.sort((a: any, b: any) => a.display_order - b.display_order)
  })) || [];
};
