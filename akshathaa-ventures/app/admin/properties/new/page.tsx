'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { BANGALORE_LOCATIONS, PROPERTY_TYPES, BHK_OPTIONS, FACING_OPTIONS, AMENITIES_OPTIONS } from '@/lib/utils';
import { Upload } from 'lucide-react';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'flat',
    bhk: '2',
    area_sqft: '',
    facing: '',
    floor: '',
    total_floors: '',
    contact_phone: '',
    is_featured: false,
    status: 'available'
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData: any = {
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: formData.location,
        city: 'Bangalore',
        type: formData.type,
        area_sqft: parseInt(formData.area_sqft),
        is_featured: formData.is_featured,
        status: formData.status,
        amenities: selectedAmenities.length > 0 ? selectedAmenities : null,
        contact_phone: formData.contact_phone || null,
        facing: formData.facing || null,
        floor: formData.floor ? parseInt(formData.floor) : null,
        total_floors: formData.total_floors ? parseInt(formData.total_floors) : null
      };

      // Only add bhk for relevant property types
      if (['flat', 'villa', 'penthouse'].includes(formData.type)) {
        propertyData.bhk = parseInt(formData.bhk);
      }

      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (propertyError) throw propertyError;

      // Upload images
      if (images.length > 0 && property) {
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const fileName = `${property.id}/${Date.now()}-${image.name}`;
          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(fileName, image);

          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('property-images')
              .getPublicUrl(fileName);

            await supabase
              .from('property_images')
              .insert([{
                property_id: property.id,
                image_url: publicUrl,
                is_featured: i === 0,
                display_order: i
              }]);
          }
        }
      }

      router.push('/admin/properties');
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Error creating property');
    } finally {
      setLoading(false);
    }
  }

  function toggleAmenity(amenity: string) {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  }

  return (
    <div>
      <h1 className="text-5xl mb-12" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Add New Property</h1>

      <form onSubmit={handleSubmit} className="bg-[#EDE8DC] p-8 max-w-4xl">
        <div className="space-y-8">
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Title *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              placeholder="Luxury 3BHK Apartment in Whitefield"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={5}
              className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              placeholder="Describe the property..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Price (₹) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
                placeholder="7500000"
              />
              <p className="text-xs opacity-60 mt-2">Enter full amount in rupees (e.g., 7500000 for ₹75 Lakhs)</p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Location *</label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              >
                <option value="">Select Location</option>
                {BANGALORE_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Property Type *</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              >
                {PROPERTY_TYPES.map(type => (
                  <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                ))}
              </select>
            </div>

            {['flat', 'villa', 'penthouse'].includes(formData.type) && (
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">BHK *</label>
                <select
                  required
                  value={formData.bhk}
                  onChange={(e) => setFormData({...formData, bhk: e.target.value})}
                  className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
                >
                  {BHK_OPTIONS.map(bhk => (
                    <option key={bhk} value={bhk}>{bhk} BHK</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Area (sq ft) *</label>
              <input
                type="number"
                required
                value={formData.area_sqft}
                onChange={(e) => setFormData({...formData, area_sqft: e.target.value})}
                className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
                placeholder="1200"
              />
            </div>
          </div>

          {formData.type === 'flat' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Facing</label>
                <select
                  value={formData.facing}
                  onChange={(e) => setFormData({...formData, facing: e.target.value})}
                  className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
                >
                  <option value="">Select Facing</option>
                  {FACING_OPTIONS.map(facing => (
                    <option key={facing} value={facing}>{facing}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Floor</label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) => setFormData({...formData, floor: e.target.value})}
                  className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Total Floors</label>
                <input
                  type="number"
                  value={formData.total_floors}
                  onChange={(e) => setFormData({...formData, total_floors: e.target.value})}
                  className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
                  placeholder="12"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AMENITIES_OPTIONS.map(amenity => (
                <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Contact Phone (WhatsApp)</label>
            <input
              type="tel"
              value={formData.contact_phone}
              onChange={(e) => setFormData({...formData, contact_phone: e.target.value})}
              className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              placeholder="+919876543210"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Status *</label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-4 bg-[#F5F0E8] border border-[#BFA16A] border-opacity-30 focus:outline-none focus:border-[#BFA16A]"
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-8">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                className="w-4 h-4"
              />
              <label htmlFor="is_featured" className="text-xs uppercase tracking-[0.15em] text-[#BFA16A]">
                Mark as Featured
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] mb-3 text-[#BFA16A]">Images</label>
            <div className="border-2 border-dashed border-[#BFA16A] border-opacity-30 p-8 text-center bg-[#F5F0E8]">
              <Upload className="mx-auto text-[#BFA16A] mb-3" size={48} strokeWidth={1} />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && setImages(Array.from(e.target.files))}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer text-[#BFA16A] hover:opacity-70 text-sm uppercase tracking-[0.15em]"
              >
                Click to upload images
              </label>
              {images.length > 0 && (
                <p className="text-sm opacity-60 mt-3">{images.length} image(s) selected</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-outline disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Property'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-[#BFA16A] border-opacity-30 hover:border-opacity-60 text-sm uppercase tracking-[0.15em] transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
