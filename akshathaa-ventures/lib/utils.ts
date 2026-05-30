export function formatPrice(price: number): string {
  if (price >= 10_000_000) {
    return `₹${(price / 10_000_000).toFixed(2)} Cr`;
  } else if (price >= 100_000) {
    return `₹${(price / 100_000).toFixed(2)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3');
}

export function isValidIndianPhone(phone: string): boolean {
  // Indian mobile numbers: 10 digits starting with 6-9, optional +91 prefix
  return /^(\+91)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}

export function normalizePhoneNumber(phone: string): string {
  // Remove spaces and ensure +91 prefix
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('+91')) return cleaned;
  if (cleaned.startsWith('91')) return `+${cleaned}`;
  return `+91${cleaned}`;
}

export const BANGALORE_LOCATIONS = [
  'Whitefield',
  'Koramangala',
  'HSR Layout',
  'Hebbal',
  'Indiranagar',
  'Jayanagar',
  'Marathahalli',
  'Electronic City',
  'Yelahanka',
  'Bannerghatta Road',
  'JP Nagar',
  'BTM Layout',
  'Sarjapur Road',
  'Bellandur'
];

export const PROPERTY_TYPES = ['flat', 'villa', 'plot', 'commercial', 'penthouse'] as const;
export const BHK_OPTIONS = [1, 2, 3, 4, 5];

export const FACING_OPTIONS = [
  'North',
  'South',
  'East',
  'West',
  'North-East',
  'North-West',
  'South-East',
  'South-West'
] as const;

export const AMENITIES_OPTIONS = [
  'Parking',
  'Gym',
  'Swimming Pool',
  'Security',
  'Lift',
  'Power Backup',
  'Club House',
  'Children Play Area',
  'Garden',
  'Intercom',
  'Maintenance Staff',
  'Water Supply',
  'Visitor Parking'
];

// Helper to check if property should show featured badge
export function shouldShowFeatured(property: { is_featured: boolean; status: string }): boolean {
  return property.is_featured && property.status === 'available';
}
