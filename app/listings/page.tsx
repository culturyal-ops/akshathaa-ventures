'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Home, X, ChevronDown } from 'lucide-react';
import { Property } from '@/types';
import { formatPrice, BANGALORE_LOCATIONS, PROPERTY_TYPES, BHK_OPTIONS, shouldShowFeatured } from '@/lib/utils';
import { getFilteredProperties } from '@/lib/queries/properties';
import AnimateIn from '@/components/AnimateIn';
import { supabase } from '@/lib/supabase';

function ListingsContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showingFallback, setShowingFallback] = useState(false);

  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    type: searchParams.get('type') || '',
    bhk: searchParams.get('bhk') || '',
    minPrice: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchProperties();
    fetchFeaturedProperties();
  }, [filters]);

  async function fetchProperties() {
    setLoading(true);
    setShowingFallback(false);
    
    try {
      const data = await getFilteredProperties({
        location: filters.location || undefined,
        type: filters.type || undefined,
        bhk: filters.bhk ? parseInt(filters.bhk) : undefined,
        minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
        maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
      });
      
      if (data.length === 0) {
        // No matches - show featured properties instead
        setShowingFallback(true);
        setProperties(featuredProperties);
      } else {
        setProperties(data);
      }
    } catch (e) {
      console.error(e);
      setShowingFallback(true);
      setProperties(featuredProperties);
    }
    
    setLoading(false);
  }

  async function fetchFeaturedProperties() {
    try {
      const { data } = await supabase
        .from('properties')
        .select('*, images:property_images(*)')
        .eq('status', 'available')
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (data) {
        const sorted = data.map(p => ({
          ...p,
          images: p.images?.sort((a: { display_order: number }, b: { display_order: number }) => 
            a.display_order - b.display_order
          )
        }));
        setFeaturedProperties(sorted);
        if (properties.length === 0) setProperties(sorted);
      }
    } catch (e) {
      console.error(e);
    }
  }

  function clearFilters() {
    setFilters({ location: '', type: '', bhk: '', minPrice: '', maxPrice: '' });
  }

  const hasActiveFilters = !!(filters.location || filters.type || filters.bhk || filters.minPrice || filters.maxPrice);

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={{ background: 'var(--black)', paddingTop: 120, paddingBottom: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimateIn direction="up">
            <div className="gold-bar" />
            <h1 className="t-display" style={{ color: 'var(--cream)', marginBottom: 'var(--sp-3)' }}>
              Discover Properties
            </h1>
            <p className="t-body-lg" style={{ color: 'rgba(248,245,240,0.6)', maxWidth: 560 }}>
              Curated luxury homes across Bangalore's most prestigious neighbourhoods
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Filters Bar */}
      <section style={{ background: 'var(--cream-warm)', borderBottom: '1px solid var(--cream-mid)', padding: 'var(--sp-5) 0' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', alignItems: 'center' }}>
            
            {/* Location */}
            <div style={{ position: 'relative' }}>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="input"
                style={{ 
                  minWidth: 180,
                  paddingRight: 40,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Locations</option>
                {BANGALORE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)', pointerEvents: 'none' }} />
            </div>

            {/* Type */}
            <div style={{ position: 'relative' }}>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="input"
                style={{ 
                  minWidth: 160,
                  paddingRight: 40,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map(t => (
                  <option key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)', pointerEvents: 'none' }} />
            </div>

            {/* BHK */}
            <div style={{ position: 'relative' }}>
              <select
                value={filters.bhk}
                onChange={(e) => setFilters({ ...filters, bhk: e.target.value })}
                className="input"
                style={{ 
                  minWidth: 140,
                  paddingRight: 40,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Any BHK</option>
                {BHK_OPTIONS.map(b => <option key={b} value={String(b)}>{b} BHK</option>)}
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)', pointerEvents: 'none' }} />
            </div>

            {/* Budget */}
            <div style={{ position: 'relative' }}>
              <select
                onChange={(e) => {
                  const [min, max] = e.target.value.split('-');
                  setFilters({ ...filters, minPrice: min || '', maxPrice: max || '' });
                }}
                className="input"
                style={{ 
                  minWidth: 180,
                  paddingRight: 40,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
                value={filters.minPrice && filters.maxPrice ? `${filters.minPrice}-${filters.maxPrice}` : ''}
              >
                <option value="">Any Budget</option>
                <option value="0-5000000">Under ₹50 L</option>
                <option value="5000000-10000000">₹50 L – ₹1 Cr</option>
                <option value="10000000-20000000">₹1 Cr – ₹2 Cr</option>
                <option value="20000000-50000000">₹2 Cr – ₹5 Cr</option>
                <option value="50000000-999999999">Above ₹5 Cr</option>
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--stone)', pointerEvents: 'none' }} />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={clearFilters}
                className="btn btn-outline"
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <X size={14} strokeWidth={2} />
                <span>Clear</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="section">
        <div className="container">
          
          {/* Results Header */}
          <div style={{ marginBottom: 'var(--sp-6)' }}>
            {showingFallback ? (
              <AnimateIn direction="up">
                <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto var(--sp-8)' }}>
                  <h2 className="t-h2" style={{ color: 'var(--black)', marginBottom: 'var(--sp-2)' }}>
                    No Exact Matches
                  </h2>
                  <p className="t-body" style={{ color: 'var(--stone)' }}>
                    We couldn't find properties matching your criteria. Here are our featured luxury properties instead.
                  </p>
                </div>
              </AnimateIn>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
                <p className="t-body" style={{ color: 'var(--stone)' }}>
                  <span style={{ color: 'var(--black)', fontWeight: 600 }}>{properties.length}</span> {properties.length === 1 ? 'property' : 'properties'} found
                </p>
              </div>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--sp-4)' }} className="md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: 400, borderRadius: 'var(--radius-card)' }} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 'var(--sp-4)' }} className="md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {properties.map((property, idx) => {
                  const showFeatured = shouldShowFeatured(property);
                  const image = property.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80';
                  
                  return (
                    <motion.div
                      key={property.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={`/property/${property.id}`}
                        className="prop-card block group"
                        style={{ height: 400 }}
                      >
                        <div className="relative overflow-hidden" style={{ height: 260 }}>
                          <img
                            src={image}
                            alt={property.title}
                            className="prop-img"
                          />
                          <div className="prop-overlay" />
                          {showFeatured && (
                            <div
                              className="absolute top-4 left-4 t-overline"
                              style={{ 
                                background: 'var(--gold)', 
                                color: 'var(--black)', 
                                padding: '6px 12px'
                              }}
                            >
                              Featured
                            </div>
                          )}
                          <div className="prop-info">
                            <div className="t-h3" style={{ color: 'var(--gold)', marginBottom: 4 }}>
                              {formatPrice(property.price)}
                            </div>
                            <div className="flex items-center gap-2 t-caption" style={{ color: 'rgba(255,255,255,0.7)' }}>
                              <MapPin size={12} strokeWidth={1.5} />
                              {property.location}
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: 'var(--sp-3)', background: 'var(--cream-warm)' }}>
                          <h3 className="t-h3 line-clamp-1" style={{ color: 'var(--black)', marginBottom: 'var(--sp-2)' }}>
                            {property.title}
                          </h3>
                          <div className="flex gap-3 t-caption" style={{ color: 'var(--stone)' }}>
                            {property.bhk && <span>{property.bhk} BHK</span>}
                            {property.bhk && <span>·</span>}
                            <span>{property.area_sqft} sq ft</span>
                            <span>·</span>
                            <span className="capitalize">{property.type}</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)' }}>
        <div className="w-12 h-12 border-2 border-[var(--gold)] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
