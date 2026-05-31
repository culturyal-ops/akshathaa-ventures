'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import AnimateIn, { LuxuryReveal } from '@/components/AnimateIn';
import { supabase } from '@/lib/supabase';
import { isValidIndianPhone, normalizePhoneNumber } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    if (!isValidIndianPhone(formData.phone)) {
      setErrors({ phone: 'Valid 10-digit Indian mobile number required' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('enquiries').insert([{
      name: formData.name,
      phone: normalizePhoneNumber(formData.phone),
      email: formData.email || null,
      message: formData.message || null,
    }]);
    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    }
    setLoading(false);
  }

  const S: React.CSSProperties = { fontFamily: 'var(--font-heading)' };
  const B: React.CSSProperties = { fontFamily: 'var(--font-body)' };

  return (
    <div style={{ background: 'var(--cream)', minHeight: '100vh' }}>

      {/* HERO */}
      <section style={{ position: 'relative', height: '100svh', minHeight: 640, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1920&q=90"
          alt="" aria-hidden
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 55%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 50%)' }} />
        <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', paddingTop: 80 }}>
          <AnimateIn direction="up" delay={0.1}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <span style={{ display: 'block', width: 32, height: 1, background: 'var(--gold)' }} />
              <span style={{ ...B, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--gold)' }}>Akshathaa Ventures</span>
            </div>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.2}>
            <h1 style={{ ...S, fontSize: 'clamp(44px, 6.5vw, 84px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', marginBottom: 8, maxWidth: 760 }}>Schedule a</h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.3}>
            <h1 style={{ ...S, fontSize: 'clamp(44px, 6.5vw, 84px)', fontWeight: 400, lineHeight: 1.0, letterSpacing: '-0.03em', color: '#fff', marginBottom: 32, maxWidth: 760 }}>
              <em style={{ fontStyle: 'italic', background: 'linear-gradient(120deg, var(--gold-light) 0%, var(--gold) 60%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Private Consultation</em>
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.4}>
            <p style={{ ...B, fontSize: 'clamp(15px, 1.2vw, 17px)', color: 'rgba(255,255,255,0.65)', maxWidth: 460, lineHeight: 1.75, marginBottom: 44 }}>
              Speak directly with our advisors about premium properties across Bangalore&apos;s most coveted neighbourhoods.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.5}>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="tel:+919876543210" className="btn btn-gold" style={{ ...B }}><Phone size={14} strokeWidth={2} /> Call Now</a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light" style={{ ...B }}><MessageCircle size={14} strokeWidth={1.5} /> WhatsApp</a>
            </div>
          </AnimateIn>
          <AnimateIn direction="none" delay={0.8}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 56 }}>
              <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.12)' }} />
              <span style={{ ...B, fontSize: 12, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}>500+ properties sold &nbsp;·&nbsp; 10+ years in Bangalore &nbsp;·&nbsp; 1,000+ families served</span>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FLOATING CARDS */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 var(--gutter)', marginTop: -80, position: 'relative', zIndex: 20, paddingBottom: 96 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, alignItems: 'start' }} className="lg:grid-cols-[1fr_360px]">

          {/* FORM CARD */}
          <AnimateIn direction="up" delay={0.1}>
            <div style={{ background: '#fff', boxShadow: 'var(--shadow-xl)', padding: 'clamp(36px, 5vw, 56px)' }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold)', marginBottom: 20 }} />
              <h2 style={{ ...S, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 400, lineHeight: 1.15, color: 'var(--ink)', marginBottom: 8 }}>Send Us a Message</h2>
              <p style={{ ...B, fontSize: 14, color: 'var(--stone)', lineHeight: 1.7, marginBottom: 36 }}>Share your requirements and we&apos;ll connect you with the right properties within 24 hours.</p>
              {submitted ? (
                <div style={{ padding: '48px 0', textAlign: 'center' }}>
                  <div style={{ width: 64, height: 64, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,169,110,0.1)', borderRadius: '50%' }}>
                    <CheckCircle size={28} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                  </div>
                  <h3 style={{ ...S, fontSize: 26, fontWeight: 400, color: 'var(--ink)', marginBottom: 8 }}>Message Received</h3>
                  <p style={{ ...B, fontSize: 14, color: 'var(--stone)', marginBottom: 24 }}>Thank you. We&apos;ll be in touch within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} style={{ ...B, fontSize: 13, color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textDecoration: 'underline' }}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="max-sm:grid-cols-1">
                    <div>
                      <label style={{ ...B, display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Name *</label>
                      <input type="text" required placeholder="Your full name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="input" style={{ ...B }} />
                    </div>
                    <div>
                      <label style={{ ...B, display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: errors.phone ? '#e05252' : 'var(--gold)', marginBottom: 8 }}>Phone *</label>
                      <input type="tel" required placeholder="Your 10-digit mobile number" value={formData.phone} onChange={e => { setFormData({ ...formData, phone: e.target.value }); setErrors({}); }} className="input" style={{ ...B, borderColor: errors.phone ? '#e05252' : undefined }} />
                      {errors.phone && <p style={{ ...B, fontSize: 12, color: '#e05252', marginTop: 6 }}>{errors.phone}</p>}
                    </div>
                  </div>
                  <div>
                    <label style={{ ...B, display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Email <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <input type="email" placeholder="your@email.com (optional)" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="input" style={{ ...B }} />
                  </div>
                  <div>
                    <label style={{ ...B, display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Message <span style={{ opacity: 0.45, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                    <textarea rows={4} placeholder="Tell us about your requirements..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="input" style={{ ...B, resize: 'none' }} />
                  </div>
                  <div style={{ paddingTop: 8 }}>
                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ ...B, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                      {loading ? 'Sending…' : <><Send size={14} strokeWidth={2} /> Send Message</>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </AnimateIn>

          {/* CONTACT INFO CARD */}
          <AnimateIn direction="up" delay={0.2}>
            <div style={{ background: 'var(--ink)', boxShadow: 'var(--shadow-xl)', padding: 'clamp(32px, 4vw, 44px)' }}>
              <span style={{ display: 'block', width: 28, height: 1, background: 'var(--gold)', marginBottom: 20 }} />
              <h2 style={{ ...S, fontSize: 'clamp(22px, 2.5vw, 28px)', fontWeight: 400, color: 'var(--cream)', marginBottom: 8 }}>Contact Information</h2>
              <p style={{ ...B, fontSize: 13, color: 'rgba(248,245,240,0.4)', lineHeight: 1.65, marginBottom: 36 }}>Reach us through any of these channels.</p>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {([
                  { Icon: Phone,  label: 'Phone',  value: '+91 98765 43210',            sub: 'Mon–Sat, 9 AM – 7 PM',      href: 'tel:+919876543210' },
                  { Icon: Mail,   label: 'Email',  value: 'info@akshathaaventures.com', sub: 'We respond within 24 hours', href: 'mailto:info@akshathaaventures.com' },
                  { Icon: MapPin, label: 'Office', value: 'Bangalore, Karnataka',        sub: 'India',                     href: undefined },
                  { Icon: Clock,  label: 'Hours',  value: 'Mon – Sat',                   sub: '9:00 AM – 7:00 PM',         href: undefined },
                ] as const).map(({ Icon, label, value, sub, href }, i, arr) => (
                  <div key={label} style={{ display: 'flex', gap: 16, padding: '20px 0', borderBottom: i < arr.length - 1 ? '1px solid rgba(248,245,240,0.07)' : 'none' }}>
                    <div style={{ width: 40, height: 40, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.15)' }}>
                      <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p style={{ ...B, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 5 }}>{label}</p>
                      {href ? (
                        <a href={href} style={{ ...B, display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--cream)', marginBottom: 3, transition: 'color 0.2s', wordBreak: 'break-all' }} onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={e => (e.currentTarget.style.color = 'var(--cream)')}>{value}</a>
                      ) : (
                        <p style={{ ...B, fontSize: 14, fontWeight: 500, color: 'var(--cream)', marginBottom: 3 }}>{value}</p>
                      )}
                      <p style={{ ...B, fontSize: 12, color: 'rgba(248,245,240,0.32)' }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>

      {/* WHATSAPP CTA */}
      <section style={{ background: 'var(--black)', paddingBlock: 96 }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 var(--gutter)', textAlign: 'center' }}>
          <AnimateIn direction="up" delay={0.1}>
            <div style={{ width: 52, height: 52, margin: '0 auto 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(201,169,110,0.08)', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '50%' }}>
              <MessageCircle size={22} strokeWidth={1.5} style={{ color: 'var(--gold)' }} />
            </div>
            <h2 style={{ ...S, fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: 'var(--cream)', marginBottom: 16, letterSpacing: '-0.02em' }}>Prefer WhatsApp?</h2>
            <p style={{ ...B, fontSize: 15, color: 'rgba(248,245,240,0.45)', lineHeight: 1.75, marginBottom: 40 }}>Get instant responses for quick queries and property information.</p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ ...B }}><MessageCircle size={15} strokeWidth={1.5} /> Chat on WhatsApp</a>
          </AnimateIn>
        </div>
      </section>

    </div>
  );
}
