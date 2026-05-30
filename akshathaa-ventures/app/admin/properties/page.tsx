'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    const { data } = await supabase
      .from('properties')
      .select('*, images:property_images(*)')
      .order('created_at', { ascending: false });
    
    if (data) setProperties(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (!error) {
      setProperties(properties.filter(p => p.id !== id));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Properties</h1>
        <Link href="/admin/properties/new" className="btn-outline flex items-center gap-2">
          <Plus size={18} strokeWidth={1.5} />
          Add Property
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-20 text-sm uppercase tracking-[0.15em] opacity-50">Loading...</div>
      ) : (
        <div className="bg-[#EDE8DC] overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-[#BFA16A] border-opacity-30">
              <tr>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Title</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Location</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Price</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Type</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Status</th>
                <th className="px-6 py-4 text-left text-xs uppercase tracking-[0.15em] text-[#BFA16A]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BFA16A] divide-opacity-20">
              {properties.map(property => (
                <tr key={property.id}>
                  <td className="px-6 py-4">
                    {property.title}
                    {property.is_featured && (
                      <span className="ml-2 text-xs uppercase tracking-[0.15em] text-[#BFA16A]">★</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{property.location}</td>
                  <td className="px-6 py-4">{formatPrice(property.price)}</td>
                  <td className="px-6 py-4 capitalize">{property.type}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs uppercase tracking-[0.15em] ${
                      property.status === 'available' ? 'text-green-700' :
                      property.status === 'sold' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/properties/edit/${property.id}`}
                        className="text-[#BFA16A] hover:opacity-70"
                      >
                        <Edit size={18} strokeWidth={1.5} />
                      </Link>
                      <button
                        onClick={() => handleDelete(property.id)}
                        className="text-red-700 hover:opacity-70"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
