'use client';

import { Award, Users, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/AnimateIn';
import Link from 'next/link';

const stats = [
  { number: '500+', label: 'Properties Sold' },
  { number: '10+', label: 'Years of Excellence' },
  { number: '1000+', label: 'Happy Families' },
  { number: '24/7', label: 'Client Support' },
];

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero with Large Image ── */}
      <section className="relative flex items-center" style={{ minHeight: '85vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=80"
            alt="Akshathaa Ventures"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.45) 100%)' }} />
        </div>
        <div className="container-site relative z-10">
          <div style={{ maxWidth: 720 }}>
            <AnimateIn direction="up" delay={0.1}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
                Our Story
              </span>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.25}>
              <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(42px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--cream)', marginTop: 24, marginBottom: 28 }}>
                Building Futures<br />Through{' '}
                <em style={{ fontStyle: 'italic', background: 'linear-gradient(120deg, var(--gold-light), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Property
                </em>
              </h1>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.4}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, lineHeight: 1.75, color: 'rgba(247,244,238,0.75)', maxWidth: 560 }}>
                For over a decade, we've been redefining what it means to find a home in Bangalore — combining deep local expertise with unwavering commitment to every client's vision.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Founder Story with Large Image ── */}
      <section style={{ background: 'var(--cream)', paddingBlock: 'var(--sp-15)' }}>
        <div className="container-site">
          {/* Text First */}
          <div style={{ maxWidth: 680, marginBottom: 64 }}>
            <AnimateIn direction="up" delay={0.1}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 1, background: 'var(--gold)' }} />
                Who We Are
              </span>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.2}>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)', marginTop: 20, marginBottom: 32 }}>
                A Decade of Trust,<br />Built One Home at a Time
              </h2>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.3}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, lineHeight: 1.75, color: 'var(--slate)' }}>
                  Akshathaa Ventures was founded with a singular purpose: to make premium real estate accessible, transparent, and rewarding for every client. Over a decade, we have grown from a boutique consultancy into one of Bangalore's most trusted property firms.
                </p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 17, lineHeight: 1.75, color: 'var(--slate)' }}>
                  Our team combines deep local knowledge with a rigorous approach to due diligence, ensuring that every property we present meets our exacting standards for quality, legality, and long-term value.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Large Editorial Image */}
          <AnimateIn direction="up" delay={0.4}>
            <div style={{ position: 'relative', height: 'clamp(400px, 60vh, 680px)', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80"
                alt="Our office"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Floating stat badge */}
              <div style={{ position: 'absolute', bottom: 40, right: 40, background: 'var(--gold)', padding: '32px 40px', minWidth: 200 }}>
                <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 56, fontWeight: 400, lineHeight: 1, color: 'var(--ink)', marginBottom: 8 }}>
                  10+
                </p>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink)' }}>
                  Years of Excellence
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Mission & Vision — Asymmetric Layout ── */}
      <section style={{ background: 'var(--cream-dark)', paddingBlock: 'var(--sp-15)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Mission — spans 7 cols */}
            <AnimateIn direction="right" delay={0.1} className="col-span-1 lg:col-span-7">
              <div style={{ background: 'var(--ink)', padding: 'clamp(48px, 8vw, 80px)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>
                  Our Mission
                </span>
                <span style={{ display: 'block', width: 40, height: 2, background: 'var(--gold)', marginBottom: 32 }} />
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--cream)', marginBottom: 24 }}>
                  Empowering Every Client
                </h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, lineHeight: 1.75, color: 'rgba(247,244,238,0.65)' }}>
                  To deliver transparent, expert-led real estate services that empower clients to make confident decisions — whether buying their first home or expanding a multi-property portfolio. We measure success by the trust our clients place in us, not just the transactions we close.
                </p>
              </div>
            </AnimateIn>

            {/* Vision — spans 5 cols */}
            <AnimateIn direction="left" delay={0.2} className="col-span-1 lg:col-span-5">
              <div style={{ background: 'var(--cream)', padding: 'clamp(48px, 8vw, 80px)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>
                  Our Vision
                </span>
                <span style={{ display: 'block', width: 40, height: 2, background: 'var(--gold)', marginBottom: 32 }} />
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(24px, 2.8vw, 34px)', fontWeight: 400, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 20 }}>
                  Redefining Real Estate
                </h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, lineHeight: 1.75, color: 'var(--slate)' }}>
                  To be the benchmark for integrity and excellence in Bangalore real estate — a firm where every interaction reflects our commitment to quality.
                </p>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Lifestyle Image Break ── */}
      <section style={{ background: 'var(--cream)', paddingBlock: 0 }}>
        <AnimateIn direction="up" delay={0.1}>
          <div style={{ position: 'relative', height: 'clamp(350px, 50vh, 560px)', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
              alt="Luxury living"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: 'var(--gutter)' }}>
              <div style={{ maxWidth: 520 }}>
                <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, lineHeight: 1.15, color: 'white', marginBottom: 16 }}>
                  Every Property Tells a Story
                </h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
                  From first-time buyers to seasoned investors, we tailor our guidance to each client's unique journey.
                </p>
              </div>
            </div>
          </div>
        </AnimateIn>
      </section>

      {/* ── Values — Image + Text Grid ── */}
      <section style={{ background: 'var(--cream)', paddingBlock: 'var(--sp-15)' }}>
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: Large Image */}
            <AnimateIn direction="right" delay={0.1}>
              <div style={{ position: 'relative', height: '100%', minHeight: 520, overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80"
                  alt="Our values"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 60%)' }} />
              </div>
            </AnimateIn>

            {/* Right: Values */}
            <div style={{ background: 'var(--cream-dark)', padding: 'clamp(48px, 8vw, 80px)' }}>
              <AnimateIn direction="left" delay={0.15}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
                  What Drives Us
                </span>
                <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 48 }}>
                  Our Core Values
                </h2>
              </AnimateIn>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
                {[
                  { icon: Award, title: 'Excellence', desc: 'We hold every transaction to the highest standard, ensuring quality outcomes for every client we serve.' },
                  { icon: Users, title: 'Client First', desc: 'Your goals drive every decision we make. We listen, advise, and act in your best interest at every step.' },
                  { icon: MapPin, title: 'Local Expertise', desc: 'Deep knowledge of Bangalore\'s neighbourhoods gives our clients a decisive edge in any market condition.' },
                  { icon: TrendingUp, title: 'Growth Focused', desc: 'We identify opportunities that build lasting wealth, not just transactions that close quickly.' },
                ].map((v, i) => {
                  const Icon = v.icon;
                  return (
                    <AnimateIn key={v.title} direction="left" delay={0.2 + i * 0.08}>
                      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                        <div style={{ width: 44, height: 44, background: 'rgba(212,168,83,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                        </div>
                        <div>
                          <h3 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 20, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>
                            {v.title}
                          </h3>
                          <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, lineHeight: 1.7, color: 'var(--slate)' }}>
                            {v.desc}
                          </p>
                        </div>
                      </div>
                    </AnimateIn>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ background: 'var(--ink)', paddingBlock: 'var(--sp-15)' }}>
        <div className="container-site">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 lg:divide-x lg:divide-white/10">
            {stats.map((s, i) => (
              <AnimateIn key={s.label} direction="up" delay={0.1 + i * 0.08}>
                <div className="text-center lg:px-8 py-8">
                  <p style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(44px, 6vw, 72px)', fontWeight: 400, lineHeight: 1, color: 'var(--gold)', letterSpacing: '-0.02em' }}>
                    {s.number}
                  </p>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(247,244,238,0.4)', marginTop: 16 }}>
                    {s.label}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA with Background Image ── */}
      <section style={{ position: 'relative', paddingBlock: 'var(--sp-15)', minHeight: 520, display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
            alt="Contact us"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 100%)' }} />
        </div>
        <div className="container-site relative z-10">
          <div style={{ maxWidth: 640 }}>
            <AnimateIn direction="up" delay={0.1}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <span style={{ width: 24, height: 1, background: 'var(--gold)' }} />
                Work With Us
              </span>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.2}>
              <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--cream)', marginBottom: 28 }}>
                Ready to Find Your<br />Perfect Property?
              </h2>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.3}>
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 16, lineHeight: 1.75, color: 'rgba(247,244,238,0.7)', marginBottom: 40 }}>
                Let our team guide you through Bangalore's finest properties with the expertise and care you deserve.
              </p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.4}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link href="/listings" style={{ fontFamily: 'Outfit, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'var(--gold)', color: 'var(--ink)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}>
                  Browse Properties <ArrowRight size={14} strokeWidth={2} />
                </Link>
                <Link href="/contact" style={{ fontFamily: 'Outfit, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', background: 'transparent', color: 'var(--cream)', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(247,244,238,0.3)', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(247,244,238,0.1)'; e.currentTarget.style.borderColor = 'var(--cream)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(247,244,238,0.3)'; }}>
                  Contact Us
                </Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </main>
  );
}
