'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'av_cookies_accepted';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Small delay so it doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  if (!visible) return null;

  const B: React.CSSProperties = { fontFamily: 'var(--font-body)' };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 200,
        width: 'min(680px, calc(100vw - 32px))',
        background: 'var(--ink)',
        borderTop: '1px solid rgba(201,169,110,0.25)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        padding: '16px 20px',
        flexWrap: 'wrap',
        animation: 'fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <p style={{ ...B, fontSize: 13, lineHeight: 1.65, color: 'rgba(248,245,240,0.7)', flex: '1 1 280px', margin: 0 }}>
        We use cookies to improve your browsing experience and understand site usage. By continuing to use this site, you agree to our use of cookies.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <Link
          href="/cookie-policy"
          style={{
            ...B,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            color: 'rgba(248,245,240,0.5)',
            textDecoration: 'underline',
            textUnderlineOffset: 3,
            whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,245,240,0.5)')}
        >
          Learn More
        </Link>

        <button
          onClick={accept}
          style={{
            ...B,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '9px 22px',
            background: 'var(--gold)',
            color: 'var(--black)',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold-light)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--gold)')}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
