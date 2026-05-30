-- Properties table
CREATE TABLE properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  price BIGINT NOT NULL, -- stored in full rupees (e.g. 7500000 = ₹75 Lakhs)
  location TEXT NOT NULL, -- area name e.g. "Whitefield", "HSR Layout"
  city TEXT NOT NULL DEFAULT 'Bangalore',
  type TEXT NOT NULL CHECK (type IN ('flat', 'villa', 'plot', 'commercial', 'penthouse')),
  bhk INTEGER, -- NULL for plots and commercial
  area_sqft INTEGER NOT NULL,
  facing TEXT CHECK (facing IN ('North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West')),
  floor INTEGER, -- NULL for villa/plot
  total_floors INTEGER,
  amenities TEXT[], -- e.g. ARRAY['parking', 'gym', 'security', 'lift']
  contact_phone TEXT, -- agent WhatsApp number for this listing
  is_featured BOOLEAN DEFAULT false, -- separate from status
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'rented')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property images table
CREATE TABLE property_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0, -- for manual reordering in admin
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiries table
CREATE TABLE enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT, -- made optional, phone is enough in India
  message TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false, -- lets admin mark as read
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Auto-update updated_at on properties
CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_location ON properties(location);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_is_featured ON properties(is_featured);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_property_images_property_id ON property_images(property_id);
CREATE INDEX idx_property_images_order ON property_images(property_id, display_order);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);
CREATE INDEX idx_enquiries_is_read ON enquiries(is_read);

-- Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public: read properties and images
CREATE POLICY "Public can view properties"
  ON properties FOR SELECT USING (true);

CREATE POLICY "Public can view property images"
  ON property_images FOR SELECT USING (true);

-- Admin: full access to properties and images
CREATE POLICY "Admin can manage properties"
  ON properties FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage images"
  ON property_images FOR ALL USING (auth.role() = 'authenticated');

-- Enquiries: public insert, admin full access
CREATE POLICY "Anyone can submit enquiries"
  ON enquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view enquiries"
  ON enquiries FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can update enquiries"
  ON enquiries FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can delete enquiries"
  ON enquiries FOR DELETE USING (auth.role() = 'authenticated');

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING; -- safe to re-run

CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT USING (bucket_id = 'property-images');

CREATE POLICY "Admin can upload images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can update images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can delete images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'property-images' AND auth.role() = 'authenticated');
