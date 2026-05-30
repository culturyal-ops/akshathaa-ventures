'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize, MessageCircle, Phone, Mail, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types';
import { formatPrice } from '@/lib/utils';
import AnimateIn from '@/components/AnimateIn';

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (params.id) fetchProperty(params.id as string);
  }, [params.id]);

  async function fetchProperty(id: string) {
    const { data } = await supabase
      .from('properties')
      .select('*, images:property_images(*)')
      .eq('id', id)
      .single();
    if (data) setProperty(data);
  }

  function prevImage() {
    if (!property?.images?.length) return;
    setSelectedImage(i => (i - 1 + property.images!.length) % property.images!.length);
  }

  function nextImage() {
    if (!property?.images?.length) return;
    setSelectedImage(i => (i + 1) % property.images!.length);
  }

  if (!property) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '2px solid var(--gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p className="section-label">Loading property...</p>
        </div>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi, I am interested in ${property.title} at ${property.location}`);
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMsg}`;
  const images = property.images || [];

  return (
    <main style={{ fontFamily: 'Outfit, sans-serif', background: 'var(--cream)' }}>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && images.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setLightbox(false)}>
            <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 24, right: 24, color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 28, lineHeight: 1 }}>&#x2715;</button>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: 12 }}>
              <ChevronLeft size={24} />
            </button>
            <motion.img key={selectedImage} src={images[selectedImage]?.image_url} alt={property.title}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
              style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain' }} onClick={(e) => e.stopPropagation()} />
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: 12 }}>
              <ChevronRight size={24} />
            </button>
            <p style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'Outfit, sans-serif' }}>
              {selectedImage + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back nav */}
      <div style={{ paddingTop: '7rem', paddingBottom: '1rem' }} className="container-site">
        <Link href="/listings" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--slate)')}>
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to Listings
        </Link>
      </div>

      <div className="container-site" style={{ paddingBottom: '6rem' }}>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Left: images + details */}
          <div className="lg:col-span-2">
            <AnimateIn direction="up">
              <div style={{ position: 'relative', overflow: 'hidden', cursor: 'zoom-in', marginBottom: 12 }} className="group"
                onClick={() => images.length > 0 && setLightbox(true)}>
                {images.length > 0 ? (
                  <>
                    <AnimatePresence mode="sync">
                      <motion.img key={selectedImage} src={images[selectedImage]?.image_url} alt={property.title}
                        style={{ width: '100%', height: 'clamp(320px, 45vw, 520px)', objectFit: 'cover', display: 'block' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
                    </AnimatePresence>
                    {images.length > 1 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); prevImage(); }} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', padding: 8, opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100">
                          <ChevronLeft size={18} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); nextImage(); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer', padding: 8, opacity: 0, transition: 'opacity 0.3s' }} className="group-hover:opacity-100">
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ width: '100%', height: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream-dark)' }}>
                    <Maximize size={64} strokeWidth={1} style={{ opacity: 0.2 }} />
                  </div>
                )}
              </div>
            </AnimateIn>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 40 }}>
                {images.map((img, idx) => (
                  <button key={img.id} onClick={() => setSelectedImage(idx)}
                    style={{ flexShrink: 0, overflow: 'hidden', border: `2px solid ${selectedImage === idx ? 'var(--gold)' : 'transparent'}`, opacity: selectedImage === idx ? 1 : 0.55, transition: 'all 0.3s', cursor: 'pointer', background: 'none', padding: 0 }}>
                    <img src={img.image_url} alt="" style={{ width: 80, height: 60, objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}

            <AnimateIn direction="up" delay={0.1}>
              <div style={{ marginBottom: 32 }}>
                <span className="gold-rule" style={{ display: 'block' }} />
                <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--ink)', fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-0.03em', fontWeight: 700, marginBottom: 12 }}>
                  {property.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--slate)', marginBottom: 20, fontSize: 15 }}>
                  <MapPin size={16} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span>{property.location}, Bangalore</span>
                </div>
                <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--gold)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {formatPrice(property.price)}
                </p>
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 48 }}>
                {[
                  { label: 'BHK', value: property.bhk ?? 'N/A' },
                  { label: 'Area', value: `${property.area_sqft} sq ft` },
                  { label: 'Type', value: property.type },
                ].map((spec) => (
                  <div key={spec.label} style={{ background: 'var(--cream-dark)', padding: '24px 16px', textAlign: 'center' }}>
                    <p className="section-label" style={{ marginBottom: 8 }}>{spec.label}</p>
                    <p style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--ink)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, textTransform: 'capitalize' }}>{spec.value}</p>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn direction="up" delay={0.2}>
              <div style={{ marginBottom: 48 }}>
                <span className="gold-rule" style={{ display: 'block' }} />
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--ink)', fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Description</h2>
                <p style={{ color: 'var(--slate)', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: 15 }}>{property.description}</p>
              </div>
            </AnimateIn>

            {property.amenities && property.amenities.length > 0 && (
              <AnimateIn direction="up" delay={0.25}>
                <div style={{ marginBottom: 48 }}>
                  <span className="gold-rule" style={{ display: 'block' }} />
                  <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--ink)', fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Amenities</h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {property.amenities.map((a: string) => (
                      <span key={a} style={{ padding: '8px 16px', background: 'var(--cream-dark)', border: '1px solid rgba(212,168,83,0.2)', fontSize: 13, color: 'var(--slate)' }}>{a}</span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>

          {/* Right: contact sidebar */}
          <div className="lg:col-span-1">
            <AnimateIn direction="left" delay={0.2}>
              <div style={{ position: 'sticky', top: 112 }}>
                <div style={{ background: 'var(--ink)', padding: 32, marginBottom: 12 }}>
                  <span className="gold-rule" style={{ display: 'block' }} />
                  <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', color: 'var(--cream)', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                    Interested in this property?
                  </h3>
                  <p style={{ color: 'rgba(247,244,238,0.5)', fontSize: 14, marginBottom: 28 }}>Our team is ready to help you.</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MessageCircle size={16} strokeWidth={1.5} /><span>WhatsApp</span>
                    </a>
                    <a href="tel:+919876543210" className="btn btn-gold-outline" style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Phone size={16} strokeWidth={1.5} /><span>Call Now</span>
                    </a>
                    <a href="mailto:info@akshathaaventures.com" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 24px', border: '1px solid rgba(247,244,238,0.15)', color: 'rgba(247,244,238,0.6)', fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(247,244,238,0.4)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(247,244,238,0.6)'; e.currentTarget.style.borderColor = 'rgba(247,244,238,0.15)'; }}>
                      <Mail size={15} strokeWidth={1.5} /><span>Email Us</span>
                    </a>
                  </div>
                </div>
                <div style={{ background: 'var(--cream-dark)', padding: 24 }}>
                  <p className="section-label" style={{ marginBottom: 16 }}>Contact Details</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--slate)')}>
                      <Phone size={14} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0 }} />+91 98765 43210
                    </a>
                    <a href="mailto:info@akshathaaventures.com" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--slate)', textDecoration: 'none', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--slate)')}>
                      <Mail size={14} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0 }} />info@akshathaaventures.com
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>

        </div>
      </div>
    </main>
  );
}
