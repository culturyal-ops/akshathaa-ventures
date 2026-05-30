'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--black)', color: 'var(--cream)' }}>
      {/* Gold top line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--gold) 30%, var(--gold) 70%, transparent)' }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '80px var(--gutter) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 32, paddingBottom: 64, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Brand — 4 cols */}
          <div style={{ gridColumn: 'span 12' }} className="lg:col-span-4">
            <div style={{ gridColumn: '1 / 5' }}>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 500, color: 'var(--cream)', letterSpacing: '-0.01em', marginBottom: 4 }}>Akshathaa</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 9, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Ventures · Premium Real Estate</div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.75, color: 'rgba(248,245,240,0.45)', maxWidth: 300 }}>
                Bangalore's trusted partner for premium residential and commercial properties. Curated for those who demand the finest.
              </p>
              <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
                {['IG', 'FB', 'YT'].map((label, i) => (
                  <a key={i} href="#" aria-label={label} style={{ width: 36, height: 36, border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(248,245,240,0.4)', transition: 'all 0.3s ease', fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--gold)'; el.style.color = 'var(--gold)'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(248,245,240,0.4)'; }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick links — 2 cols */}
          <div style={{ gridColumn: 'span 6' }} className="md:col-span-2">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Navigation</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['/', 'Home'], ['/listings', 'Properties'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(248,245,240,0.5)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,245,240,0.5)')}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Property types — 2 cols */}
          <div style={{ gridColumn: 'span 6' }} className="md:col-span-2">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Properties</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Apartments', 'Villas', 'Penthouses', 'Plots', 'Commercial'].map(t => (
                <Link key={t} href={`/listings?type=${t.toLowerCase()}`} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(248,245,240,0.5)', transition: 'color 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,245,240,0.5)')}>
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact — 4 cols */}
          <div style={{ gridColumn: 'span 12' }} className="md:col-span-4">
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24 }}>Contact</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[
                { Icon: Phone, text: '+91 98765 43210', href: 'tel:+919876543210' },
                { Icon: Mail, text: 'info@akshathaaventures.com', href: 'mailto:info@akshathaaventures.com' },
                { Icon: MapPin, text: 'Bangalore, Karnataka, India', href: undefined },
              ].map(({ Icon, text, href }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
                  {href ? (
                    <a href={href} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(248,245,240,0.5)', transition: 'color 0.2s ease', lineHeight: 1.5 }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--cream)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,245,240,0.5)')}>
                      {text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(248,245,240,0.5)', lineHeight: 1.5 }}>{text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Newsletter */}
            <div style={{ marginTop: 32 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(248,245,240,0.4)', marginBottom: 12 }}>Get exclusive listings in your inbox</p>
              <div style={{ display: 'flex', gap: 0 }}>
                <input type="email" placeholder="Your email" style={{ flex: 1, padding: '11px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none', color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }} />
                <button style={{ padding: '11px 20px', background: 'var(--gold)', border: 'none', color: 'var(--black)', fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-dark)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '24px 0' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(248,245,240,0.25)' }}>
            &copy; {year} Akshathaa Ventures. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'RERA Compliance'].map(l => (
              <a key={l} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(248,245,240,0.25)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(248,245,240,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,245,240,0.25)')}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
