'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PropertyImage } from '@/types';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

interface ImageReorderProps {
  propertyId: string;
  initialImages: PropertyImage[];
  onUpdate?: () => void;
}

export default function ImageReorder({ propertyId, initialImages, onUpdate }: ImageReorderProps) {
  const [images, setImages] = useState<PropertyImage[]>(
    [...initialImages].sort((a, b) => a.display_order - b.display_order)
  );
  const [updating, setUpdating] = useState(false);

  async function moveImage(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= images.length) return;

    setUpdating(true);

    // Swap in local state
    const newImages = [...images];
    [newImages[index], newImages[swapIndex]] = [newImages[swapIndex], newImages[index]];
    setImages(newImages);

    // Persist new order
    const updates = newImages.map((img, i) => ({
      id: img.id,
      display_order: i
    }));

    await supabase.from('property_images').upsert(updates);
    setUpdating(false);
    onUpdate?.();
  }

  async function deleteImage(imageId: string, imageUrl: string) {
    if (!confirm('Delete this image?')) return;

    setUpdating(true);

    // Extract path from URL
    const urlParts = imageUrl.split('/');
    const path = urlParts.slice(urlParts.indexOf('property-images') + 1).join('/');

    // Delete from storage
    await supabase.storage.from('property-images').remove([path]);

    // Delete from database
    await supabase.from('property_images').delete().eq('id', imageId);

    // Update local state and reorder
    const newImages = images.filter(img => img.id !== imageId);
    const reordered = newImages.map((img, i) => ({ ...img, display_order: i }));
    setImages(reordered);

    // Persist reorder
    const updates = reordered.map(img => ({
      id: img.id,
      display_order: img.display_order
    }));
    await supabase.from('property_images').upsert(updates);

    setUpdating(false);
    onUpdate?.();
  }

  if (images.length === 0) {
    return <p className="text-sm opacity-60">No images uploaded yet.</p>;
  }

  return (
    <div className="space-y-3">
      {images.map((img, i) => (
        <div
          key={img.id}
          className="flex items-center gap-4 bg-[#F5F0E8] p-3 border border-[#BFA16A] border-opacity-30"
        >
          <img
            src={img.image_url}
            alt=""
            className="w-24 h-16 object-cover"
          />
          
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.15em] opacity-60">
              Position {i + 1} {i === 0 && '(Featured)'}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => moveImage(i, 'up')}
              disabled={i === 0 || updating}
              className="p-2 border border-[#BFA16A] border-opacity-30 hover:border-[#BFA16A] disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Move up"
            >
              <ChevronUp size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => moveImage(i, 'down')}
              disabled={i === images.length - 1 || updating}
              className="p-2 border border-[#BFA16A] border-opacity-30 hover:border-[#BFA16A] disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Move down"
            >
              <ChevronDown size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => deleteImage(img.id, img.image_url)}
              disabled={updating}
              className="p-2 border border-red-500 border-opacity-30 hover:border-red-500 text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition"
              title="Delete"
            >
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
