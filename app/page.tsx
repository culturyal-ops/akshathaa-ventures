'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, animate } from 'framer-motion';
import { MapPin, Search, MoveRight, ArrowDown, ChevronRight, Star, Shield, Clock, Home } from 'lucide-react';
import AnimateIn, { LuxuryReveal } from '@/components/AnimateIn';
import { formatPrice, BANGALORE_LOCATIONS, PROPERTY_TYPES, shouldShowFeatured } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types';

const HERO_IMGS = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=90',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=90',
];
const PH_IMGS = [
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
];
const PH_PROPS = [
  { id:'1', title:'Prestige Lakeside Habitat', location:'Whitefield', price:12500000, bhk:3, area_sqft:1850, type:'flat', is_featured:true, status:'available' },
  { id:'2', title:'Brigade Orchards Villa', location:'Devanahalli', price:28000000, bhk:4, area_sqft:3200, type:'villa', is_featured:true, status:'available' },
  { id:'3', title:'Sobha Dream Acres', location:'Panathur Road', price:7800000, bhk:2, area_sqft:1100, type:'flat', is_featured:true, status:'available' },
  { id:'4', title:'Embassy Springs', location:'Devanahalli', price:45000000, bhk:5, area_sqft:5400, type:'villa', is_featured:true, status:'available' },
  { id:'5', title:'Godrej Splendour', location:'Whitefield', price:9200000, bhk:3, area_sqft:1450, type:'flat', is_featured:true, status:'available' },
  { id:'6', title:'Purva Atmosphere', location:'Hebbal', price:16500000, bhk:3, area_sqft:2100, type:'penthouse', is_featured:true, status:'available' },
];
const TESTIMONIALS = [
  { quote:'Akshathaa Ventures delivered an experience that matched the quality of the property itself. Truly exceptional service from start to finish.', name:'Priya Sharma', role:'Homeowner, Koramangala', initial:'P' },
  { quote:'From the first consultation to handing over the keys, every step was handled with professionalism and genuine care. Highly recommended.', name:'Rajesh Nair', role:'Investor, Whitefield', initial:'R' },
];
const STATS = [
  { value:500, suffix:'+', label:'Properties Sold' },
  { value:10, suffix:'+', label:'Years of Excellence' },
  { value:1000, suffix:'+', label:'Happy Families' },
  { value:24, suffix:'/7', label:'Client Support' },
];
const PROCESS = [
  { num:'01', title:'Discover', desc:'Share your vision. We listen carefully to understand your lifestyle, budget, and aspirations.' },
  { num:'02', title:'Curate', desc:'Our experts handpick properties that match your criteria from our exclusive Bangalore portfolio.' },
  { num:'03', title:'Acquire', desc:'We guide you through every legal and financial step, ensuring a seamless transaction.' },
];
const WHY = [
  { Icon:Star, title:'Curated Luxury', desc:'Every listing is personally vetted for quality, location, and long-term investment potential.' },
  { Icon:Shield, title:'Trusted Expertise', desc:'Over a decade of deep market knowledge across Bangalore\'s most sought-after neighbourhoods.' },
  { Icon:Clock, title:'24/7 Concierge', desc:'Our dedicated team is always available to answer questions and schedule viewings.' },
];

function CountUp({ target, suffix='' }: { target:number; suffix?:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const count = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(count, target, { duration:2, ease:[0.4,0,0.2,1], onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v)+suffix; } });
    return c.stop;
  }, [inView, target, suffix, count]);
  return <span ref={ref}>0{suffix}</span>;
}

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [loc, setLoc] = useState('');
  const [type, setType] = useState('');
  const [props, setProps] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [tIdx, setTIdx] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const fgO = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMGS.length), 6000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.from('properties').select('*, images:property_images(*)').eq('is_featured', true).eq('status', 'available').order('created_at', { ascending: false }).limit(6);
        if (!error && data?.length) setProps(data.map(p => ({ ...p, images: p.images?.sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order) })));
      } catch { /* use placeholders */ }
      setLoading(false);
    })();
  }, []);

  const display = props.length > 0 ? props : (PH_PROPS as unknown as Property[]);
  const img = (p: Property, i: number) => p.images?.[0]?.image_url ?? PH_IMGS[i % PH_IMGS.length];

  const S: React.CSSProperties = { fontFamily: 'var(--font-heading)' };
  const B: React.CSSProperties = { fontFamily: 'var(--font-body)' };

  return (
    <main>
      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: 'relative', height: '100svh', minHeight: 700, overflow: 'hidden' }}>

        {/* Background slideshow with parallax */}
        <motion.div style={{ position: 'absolute', inset: 0, y: bgY }}>
          <AnimatePresence mode="sync">
            {HERO_IMGS.map((src, i) => i === heroIdx ? (
              <motion.img key={src} src={src} alt="" aria-hidden
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }} />
            ) : null)}
          </AnimatePresence>
        </motion.div>

        {/* Cinematic overlay — dark left, lighter right */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 45%)' }} />

        {/* Hero content — pure aspiration, no search */}
        <motion.div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', opacity: fgO }}>

          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
          >
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--gold)', transformOrigin: 'left' }}
            />
            <span style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Bangalore&apos;s Premier Real Estate
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ overflow: 'hidden', marginBottom: 8 }}>
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...S, fontSize: 'clamp(44px, 6.5vw, 88px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', maxWidth: 820 }}
            >
              Where Ambition
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: 32 }}>
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
              style={{ ...S, fontSize: 'clamp(44px, 6.5vw, 88px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', maxWidth: 820 }}
            >
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(120deg, var(--gold-light) 0%, var(--gold) 60%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Meets Home
              </em>
            </motion.h1>
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ ...B, fontSize: 'clamp(15px, 1.3vw, 18px)', color: 'rgba(248,245,240,0.65)', maxWidth: 480, lineHeight: 1.75, marginBottom: 48 }}
          >
            Handpicked residential and commercial properties across Bangalore&apos;s most coveted neighbourhoods.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 56 }}
          >
            <Link href="/listings"
              style={{ ...B, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'var(--gold)', color: 'var(--ink)', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--gold-light)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 28px rgba(201,169,110,0.35)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--gold)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
              View Properties <MoveRight size={14} strokeWidth={2} />
            </Link>
            <Link href="/contact"
              style={{ ...B, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'transparent', color: 'var(--cream)', fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(248,245,240,0.35)', transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(248,245,240,0.1)'; el.style.borderColor = 'rgba(248,245,240,0.7)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(248,245,240,0.35)'; el.style.transform = 'translateY(0)'; }}>
              Private Consultation
            </Link>
          </motion.div>

          {/* Trust signal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 1.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: 24 }}
          >
            <div style={{ width: 1, height: 32, background: 'rgba(248,245,240,0.15)' }} />
            <span style={{ ...B, fontSize: 12, color: 'rgba(248,245,240,0.45)', letterSpacing: '0.06em' }}>
              500+ properties sold &nbsp;·&nbsp; 10+ years in Bangalore &nbsp;·&nbsp; 1,000+ families served
            </span>
          </motion.div>
        </motion.div>

        {/* Slide indicator — bottom left */}
        <div style={{ position: 'absolute', bottom: 36, left: 'var(--gutter)', zIndex: 20, display: 'flex', gap: 8 }}>
          {HERO_IMGS.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              style={{ width: i === heroIdx ? 28 : 6, height: 2, borderRadius: 1, background: i === heroIdx ? 'var(--gold)' : 'rgba(248,245,240,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)', padding: 0 }} />
          ))}
        </div>

        {/* Scroll cue — bottom right */}
        <div style={{ position: 'absolute', bottom: 32, right: 'var(--gutter)', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ ...B, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(248,245,240,0.35)' }}>Scroll</span>
          <div style={{ width: 1, height: 52, background: 'rgba(248,245,240,0.12)', overflow: 'hidden', position: 'relative' }}>
            <div className="scroll-drop" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'var(--gold)' }} />
          </div>
        </div>
      </section>

      {/* ── SEARCH SECTION — below the fold ── */}
      <section style={{ background: 'var(--black)', borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 0 }}>
            {/* Location */}
            <div style={{ flex: '1 1 180px', display: 'flex', alignItems: 'center', gap: 10, padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <MapPin size={14} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <select value={loc} onChange={e => setLoc(e.target.value)}
                style={{ ...B, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: loc ? 'var(--cream)' : 'rgba(248,245,240,0.35)', width: '100%', cursor: 'pointer' }}>
                <option value="">Any Location</option>
                {BANGALORE_LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            {/* Type */}
            <div style={{ flex: '1 1 160px', display: 'flex', alignItems: 'center', gap: 10, padding: '20px 24px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <Home size={14} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <select value={type} onChange={e => setType(e.target.value)}
                style={{ ...B, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: type ? 'var(--cream)' : 'rgba(248,245,240,0.35)', width: '100%', cursor: 'pointer' }}>
                <option value="">Any Type</option>
                {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </div>
            {/* CTA */}
            <Link href={`/listings${loc || type ? `?location=${loc}&type=${type}` : ''}`}
              style={{ ...B, display: 'flex', alignItems: 'center', gap: 10, padding: '20px 32px', background: 'var(--gold)', color: 'var(--ink)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', flexShrink: 0, transition: 'background 0.25s ease', whiteSpace: 'nowrap' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}>
              <Search size={13} strokeWidth={2} /> Search Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: 'var(--black)', overflow: 'hidden', borderTop: '1px solid rgba(201,169,110,0.12)', borderBottom: '1px solid rgba(201,169,110,0.12)' }}>
        <div className="mq-fwd" aria-hidden>
          {[...Array(8)].map((_, i) => <span key={i} style={{ ...B, display: 'inline-block', padding: '16px 0', paddingRight: 80, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)', whiteSpace: 'nowrap' }}>PREMIUM PROPERTIES&nbsp;&nbsp;·&nbsp;&nbsp;BANGALORE&nbsp;&nbsp;·&nbsp;&nbsp;RESIDENTIAL&nbsp;&nbsp;·&nbsp;&nbsp;COMMERCIAL&nbsp;&nbsp;·&nbsp;&nbsp;LUXURY LIVING</span>)}
        </div>
      </div>

      {/* ── FEATURED PROPERTIES ── */}
      <section style={{ background: 'var(--cream)', paddingBlock: 'var(--sp-15)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}>
            <LuxuryReveal
              overline="Featured Listings"
              heading={<>Exceptional Properties,<br />Carefully Chosen</>}
            />
            <AnimateIn direction="left" delay={0.1}>
              <Link href="/listings" style={{ ...B, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', borderBottom: '1px solid var(--black)', paddingBottom: 2, transition: 'color 0.2s ease, border-color 0.2s ease' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--gold)'; el.style.borderColor = 'var(--gold)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--black)'; el.style.borderColor = 'var(--black)'; }}>
                View All <ChevronRight size={14} strokeWidth={2} />
              </Link>
            </AnimateIn>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
              <div className="skeleton" style={{ gridColumn: 'span 8', height: 520 }} />
              <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="skeleton" style={{ flex: 1, minHeight: 250 }} />
                <div className="skeleton" style={{ flex: 1, minHeight: 250 }} />
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
              {/* Hero card */}
              {display[0] && (
                <AnimateIn className="col-span-12 md:col-span-8" direction="up" delay={0}>
                  <Link href={`/property/${display[0].id}`} style={{ display: 'block', position: 'relative', height: 520, overflow: 'hidden', background: 'var(--cream-warm)' }}
                    className="group">
                    <img src={img(display[0], 0)} alt={display[0].title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} className="group-hover:scale-105" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)' }} />
                    {shouldShowFeatured(display[0]) && (
                      <div style={{ position: 'absolute', top: 20, left: 20, background: 'var(--gold)', color: 'var(--black)', ...B, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '5px 12px' }}>Featured</div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28 }}>
                      <p style={{ ...S, fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 500, color: 'var(--gold)', marginBottom: 6 }}>{formatPrice(display[0].price)}</p>
                      <h3 style={{ ...S, fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 400, color: '#fff', marginBottom: 8, lineHeight: 1.2 }}>{display[0].title}</h3>
                      <p style={{ ...B, fontSize: 13, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <MapPin size={12} strokeWidth={1.5} />{display[0].location}{display[0].bhk ? ` · ${display[0].bhk} BHK` : ''} · {display[0].area_sqft} sq ft
                      </p>
                    </div>
                  </Link>
                </AnimateIn>
              )}
              {/* Stacked right */}
              <div style={{ gridColumn: 'span 12' }} className="md:col-span-4 flex flex-col gap-4">
                {display.slice(1, 3).map((p, i) => (
                  <AnimateIn key={p.id} direction="left" delay={0.1 + i * 0.08}>
                    <Link href={`/property/${p.id}`} style={{ display: 'block', position: 'relative', height: 250, overflow: 'hidden', background: 'var(--cream-warm)' }} className="group">
                      <img src={img(p, i + 1)} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} className="group-hover:scale-105" />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, transparent 60%)' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 }}>
                        <p style={{ ...S, fontSize: 20, fontWeight: 500, color: 'var(--gold)', marginBottom: 4 }}>{formatPrice(p.price)}</p>
                        <h3 style={{ ...S, fontSize: 16, fontWeight: 400, color: '#fff', marginBottom: 4 }}>{p.title}</h3>
                        <p style={{ ...B, fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <MapPin size={11} strokeWidth={1.5} />{p.location}{p.bhk ? ` · ${p.bhk} BHK` : ''}
                        </p>
                      </div>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
              {/* Bottom row */}
              {display.slice(3, 6).map((p, i) => (
                <AnimateIn key={p.id} className="col-span-12 md:col-span-4" direction="up" delay={0.15 + i * 0.08}>
                  <Link href={`/property/${p.id}`} style={{ display: 'block', position: 'relative', height: 340, overflow: 'hidden', background: 'var(--cream-warm)' }} className="group">
                    <img src={img(p, i + 3)} alt={p.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }} className="group-hover:scale-105" />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.82) 0%, transparent 55%)' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 22 }}>
                      <p style={{ ...S, fontSize: 22, fontWeight: 500, color: 'var(--gold)', marginBottom: 4 }}>{formatPrice(p.price)}</p>
                      <h3 style={{ ...S, fontSize: 16, fontWeight: 400, color: '#fff', marginBottom: 4 }}>{p.title}</h3>
                      <p style={{ ...B, fontSize: 12, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={11} strokeWidth={1.5} />{p.location} · {p.area_sqft} sq ft
                      </p>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--black)', paddingBlock: 80, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around', pointerEvents: 'none', overflow: 'hidden' }} aria-hidden>
          {['500','10','1K','24'].map((n, i) => <span key={i} style={{ ...S, fontSize: 'clamp(120px, 18vw, 240px)', fontWeight: 700, lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(201,169,110,0.06)', letterSpacing: '-0.06em', userSelect: 'none', flexShrink: 0 }}>{n}</span>)}
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }} className="md:grid-cols-4">
            {STATS.map((s, i) => (
              <AnimateIn key={s.label} direction="up" delay={i * 0.08}>
                <div style={{ textAlign: 'center', padding: '32px 16px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <p style={{ ...S, fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, lineHeight: 1, color: 'var(--gold)', letterSpacing: '-0.03em', marginBottom: 10 }}>
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                  <p style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(248,245,240,0.35)' }}>{s.label}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: 'var(--cream-warm)', paddingBlock: 'var(--sp-15)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <LuxuryReveal
              overline="How It Works"
              heading="Your Journey to the Perfect Home"
              align="center"
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: 2 }} className="md:grid-cols-3">
            {PROCESS.map((step, i) => (
              <AnimateIn key={step.num} direction="up" delay={i * 0.12}>
                <div style={{ padding: '48px 40px', background: i === 1 ? 'var(--black)' : 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
                  <span style={{ position: 'absolute', top: -16, right: 24, ...S, fontSize: 'clamp(80px, 10vw, 120px)', fontWeight: 700, lineHeight: 1, color: 'transparent', WebkitTextStroke: `1px ${i === 1 ? 'rgba(201,169,110,0.15)' : 'rgba(10,10,10,0.06)'}`, userSelect: 'none', pointerEvents: 'none' }}>{step.num}</span>
                  <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold)', marginBottom: 24 }} />
                  <h3 style={{ ...S, fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 400, color: i === 1 ? 'var(--cream)' : 'var(--black)', marginBottom: 16, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ ...B, fontSize: 14, lineHeight: 1.75, color: i === 1 ? 'rgba(248,245,240,0.55)' : 'var(--stone)' }}>{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ background: 'var(--cream)', paddingBlock: 'var(--sp-15)' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 64, alignItems: 'center' }} className="md:grid-cols-2">
            <AnimateIn direction="right">
              <LuxuryReveal
                overline="Why Choose Us"
                heading={<>A Partner You Can Trust<br />at Every Step</>}
                body="We combine deep local expertise with a personalised approach to help you find not just a property, but a place you truly call home."
                cta={
                  <Link href="/about" style={{ ...B, display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--black)', borderBottom: '1px solid var(--black)', paddingBottom: 2, transition: 'color 0.2s ease, border-color 0.2s ease' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--gold)'; el.style.borderColor = 'var(--gold)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--black)'; el.style.borderColor = 'var(--black)'; }}>
                    Learn About Us <MoveRight size={14} strokeWidth={2} />
                  </Link>
                }
              />
            </AnimateIn>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {WHY.map(({ Icon, title, desc }, i) => (
                <AnimateIn key={title} direction="left" delay={i * 0.1}>
                  <div style={{ display: 'flex', gap: 20, padding: '28px 24px', background: 'var(--cream-warm)', borderLeft: '2px solid transparent', transition: 'border-color 0.3s ease, background 0.3s ease' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderLeftColor = 'var(--gold)'; el.style.background = 'var(--cream)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderLeftColor = 'transparent'; el.style.background = 'var(--cream-warm)'; }}>
                    <div style={{ width: 40, height: 40, background: 'rgba(201,169,110,0.1)', border: '1px solid rgba(201,169,110,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={17} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <h4 style={{ ...S, fontSize: 18, fontWeight: 500, color: 'var(--black)', marginBottom: 6 }}>{title}</h4>
                      <p style={{ ...B, fontSize: 14, lineHeight: 1.65, color: 'var(--stone)' }}>{desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ background: 'var(--black)', paddingBlock: 'var(--sp-15)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 var(--gutter)', textAlign: 'center' }}>
          <AnimateIn direction="up">
            <span style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 48 }}>
              <span style={{ width: 20, height: 1, background: 'var(--gold)', display: 'inline-block' }} />Client Stories
            </span>
          </AnimateIn>
          <div style={{ position: 'relative', minHeight: 220 }}>
            <AnimatePresence mode="wait">
              <motion.div key={tIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}>
                <span style={{ ...S, fontSize: 80, lineHeight: 0.5, color: 'var(--gold)', opacity: 0.2, display: 'block', marginBottom: 16 }}>&ldquo;</span>
                <blockquote style={{ ...S, fontSize: 'clamp(18px, 2.2vw, 26px)', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.55, color: 'var(--cream)', letterSpacing: '-0.01em', marginBottom: 36 }}>
                  {TESTIMONIALS[tIdx].quote}
                </blockquote>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  <div className="pulse-ring" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ ...S, fontSize: 16, fontWeight: 600, color: 'var(--black)' }}>{TESTIMONIALS[tIdx].initial}</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ ...S, fontSize: 15, fontWeight: 500, color: 'var(--cream)' }}>{TESTIMONIALS[tIdx].name}</p>
                    <p style={{ ...B, fontSize: 12, color: 'rgba(248,245,240,0.4)', letterSpacing: '0.04em' }}>{TESTIMONIALS[tIdx].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{ width: i === tIdx ? 24 : 6, height: 6, borderRadius: 3, background: i === tIdx ? 'var(--gold)' : 'rgba(248,245,240,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA with Full-Width Luxury Background ── */}
      <section style={{ position: 'relative', paddingBlock: 'var(--sp-15)', minHeight: 600, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
            alt="Luxury property"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 100%)' }} />
        </div>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', position: 'relative', zIndex: 10, width: '100%' }}>
          <div style={{ maxWidth: 720 }}>
            <LuxuryReveal
              dark
              overline="Your Journey Begins Here"
              heading={<>Ready to Find Your<br />Perfect Property?</>}
              headingSize="clamp(36px, 5vw, 64px)"
              body="Let our experts guide you to the finest homes and investment opportunities across Bangalore. Your dream property is just a conversation away."
              cta={
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <Link href="/listings" style={{ ...B, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'var(--gold)', color: 'var(--ink)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--gold-light)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 28px rgba(201,169,110,0.35)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'var(--gold)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
                    Browse Properties <MoveRight size={14} strokeWidth={2} />
                  </Link>
                  <Link href="/contact" style={{ ...B, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'transparent', color: 'var(--cream)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(247,244,238,0.3)', transition: 'all 0.3s ease' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(247,244,238,0.1)'; el.style.borderColor = 'var(--cream)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.borderColor = 'rgba(247,244,238,0.3)'; }}>
                    Schedule Consultation <ArrowDown size={14} strokeWidth={2} style={{ transform: 'rotate(-45deg)' }} />
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
