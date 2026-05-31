'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Properties', href: '/listings' },
  { label: 'About',      href: '/about' },
  { label: 'Contact',    href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', fn, { passive: true });
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          background: solid ? 'rgba(248,245,240,0.97)' : 'transparent',
          backdropFilter: solid ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(16px)' : 'none',
          borderBottom: solid ? '1px solid rgba(232,224,213,0.8)' : '1px solid transparent',
          boxShadow: solid ? '0 1px 12px rgba(10,10,10,0.04)' : 'none',
        }}
      >
        <div style={{
          maxWidth: 'var(--max-w)', margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 80px)',
          height: 72,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: 2, flexShrink: 0 }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              color: solid ? 'var(--black)' : '#fff',
              transition: 'color 0.4s ease',
              textShadow: solid ? 'none' : '0 2px 12px rgba(0,0,0,0.4)',
            }}>
              Akshathaa
            </span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
            }}>
              Ventures
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 40, display: 'flex' }}>
            {NAV.map(link => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: solid ? (active ? 'var(--gold)' : 'var(--black)') : (active ? 'var(--gold)' : 'rgba(248,245,240,0.9)'),
                    transition: 'color 0.3s ease',
                    textShadow: solid ? 'none' : '0 1px 8px rgba(0,0,0,0.4)',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--gold)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.color = solid ? 'var(--black)' : 'rgba(248,245,240,0.9)'; }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute', bottom: -4, left: 0,
                    width: active ? '100%' : '0%',
                    height: 1,
                    background: 'var(--gold)',
                    transition: 'width 0.3s ease',
                  }} />
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link
              href="/contact"
              className="hidden md:inline-flex"
              style={{
                fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '10px 24px',
                border: `1px solid ${solid ? 'var(--black)' : 'rgba(248,245,240,0.5)'}`,
                color: solid ? 'var(--black)' : 'var(--cream)',
                background: 'transparent', transition: 'all 0.3s ease',
                alignItems: 'center',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = solid ? 'var(--black)' : 'var(--cream)'; el.style.color = solid ? 'var(--cream)' : 'var(--black)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = solid ? 'var(--black)' : 'var(--cream)'; }}
            >
              Enquire
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden"
              aria-label="Open menu"
              style={{ background: 'none', border: 'none', color: solid ? 'var(--black)' : '#fff', padding: 4, cursor: 'pointer' }}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'var(--black)', display: 'flex', flexDirection: 'column' }}
          >
            {/* Overlay top bar */}
            <div style={{ height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 clamp(16px, 4vw, 32px)' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 500, color: 'var(--cream)' }}>
                Akshathaa <span style={{ color: 'var(--gold)' }}>Ventures</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ background: 'none', border: 'none', color: 'rgba(248,245,240,0.6)', padding: 4, cursor: 'pointer' }}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Links */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(24px, 6vw, 48px)' }}>
              {NAV.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'clamp(36px, 10vw, 52px)',
                      fontWeight: 400,
                      letterSpacing: '-0.02em',
                      color: pathname === link.href ? 'var(--gold)' : 'var(--cream)',
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                    onMouseLeave={e => (e.currentTarget.style.color = pathname === link.href ? 'var(--gold)' : 'var(--cream)')}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 + NAV.length * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ padding: '0 clamp(24px, 6vw, 48px) 48px' }}
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: 'block', textAlign: 'center', padding: '18px',
                  background: 'var(--gold)', color: 'var(--black)',
                  fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
              >
                Enquire Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
