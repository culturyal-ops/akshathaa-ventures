'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const WA_URL = `https://wa.me/919945453605?text=${encodeURIComponent('Hello Akshathaa Ventures, I would like to know more about your properties. Please share details.')}`;

export default function WhatsAppButton() {
  const [showScroll, setShowScroll] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Scroll-to-top visibility
    const onScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Tooltip after 6 seconds
    const t = setTimeout(() => setShowTooltip(true), 6000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const btnBase: React.CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    flexShrink: 0,
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 28,
      right: 24,
      zIndex: 150,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
    }}>

      {/* Scroll to top — only when scrolled */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          ...btnBase,
          background: 'rgba(14,14,18,0.88)',
          color: 'var(--gold)',
          border: '1px solid rgba(201,169,110,0.25)',
          opacity: showScroll ? 1 : 0,
          pointerEvents: showScroll ? 'auto' : 'none',
          transform: showScroll ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = showScroll ? 'translateY(0)' : 'translateY(12px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.22)';
        }}
      >
        <ArrowUp size={18} strokeWidth={2} />
      </button>

      {/* WhatsApp button + tooltip */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Tooltip */}
        {showTooltip && (
          <div style={{
            position: 'absolute',
            bottom: 58,
            right: 0,
            background: 'var(--ink)',
            color: 'var(--cream)',
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            padding: '8px 14px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            border: '1px solid rgba(201,169,110,0.2)',
            animation: 'fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
            pointerEvents: 'none',
          }}>
            Need help finding a property?
            {/* Arrow */}
            <span style={{
              position: 'absolute',
              bottom: -5,
              right: 18,
              width: 10,
              height: 10,
              background: 'var(--ink)',
              border: '1px solid rgba(201,169,110,0.2)',
              borderTop: 'none',
              borderLeft: 'none',
              transform: 'rotate(45deg)',
            }} />
          </div>
        )}

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          onClick={() => setShowTooltip(false)}
          style={{
            ...btnBase,
            width: 52,
            height: 52,
            background: '#25D366',
            color: '#fff',
            boxShadow: '0 4px 24px rgba(37,211,102,0.35)',
            textDecoration: 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(37,211,102,0.45)';
            setShowTooltip(false);
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(37,211,102,0.35)';
          }}
        >
          {/* WhatsApp SVG */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

    </div>
  );
}
