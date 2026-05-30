'use client';

/**
 * AnimateIn — luxury scroll-reveal system
 *
 * Two modes:
 *  1. <AnimateIn> wrapping a single element — classic fade/slide in
 *  2. <AnimateIn stagger> wrapping multiple children — each child
 *     animates in sequence: gold line → overline → heading → body → CTA
 *     with 100ms stagger between siblings.
 *
 * The stagger mode is what separates "blocks popping in" from
 * "a scene composing itself."
 */

import { motion, useInView } from 'framer-motion';
import { useRef, Children, isValidElement, cloneElement } from 'react';

// Shared easing — feels expensive, not snappy
const EASE = [0.16, 1, 0.3, 1] as const;

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  /** Stagger mode: animates each direct child in sequence */
  stagger?: boolean;
  /** ms between each child in stagger mode (default 100) */
  staggerMs?: number;
}

export default function AnimateIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.75,
  once = true,
  stagger = false,
  staggerMs = 100,
}: AnimateInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-72px' });

  const offset = {
    up:    { y: 36, x: 0 },
    down:  { y: -36, x: 0 },
    left:  { x: 48, y: 0 },
    right: { x: -48, y: 0 },
    none:  { x: 0, y: 0 },
  }[direction];

  // ── STAGGER MODE ──────────────────────────────────────────────────────
  if (stagger) {
    const items = Children.toArray(children).filter(isValidElement);
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, ...offset }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{
              duration,
              delay: delay + (i * staggerMs) / 1000,
              ease: EASE,
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    );
  }

  // ── SINGLE MODE ───────────────────────────────────────────────────────
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * LuxuryReveal — the full choreographed sequence used for section headers.
 *
 * Renders: gold line → overline → heading → body → optional CTA
 * Each element staggers 110ms after the previous.
 *
 * Usage:
 *   <LuxuryReveal
 *     overline="Featured Listings"
 *     heading={<>Exceptional Properties,<br />Carefully Chosen</>}
 *     body="Handpicked from Bangalore's finest neighbourhoods."
 *     cta={<Link href="/listings">View All</Link>}
 *   />
 */
interface LuxuryRevealProps {
  overline?: React.ReactNode;
  heading: React.ReactNode;
  body?: React.ReactNode;
  cta?: React.ReactNode;
  align?: 'left' | 'center';
  dark?: boolean;
  className?: string;
  headingSize?: string;
}

export function LuxuryReveal({
  overline,
  heading,
  body,
  cta,
  align = 'left',
  dark = false,
  className = '',
  headingSize = 'clamp(28px, 3.5vw, 44px)',
}: LuxuryRevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-72px' });

  const textColor = dark ? 'var(--cream)' : 'var(--ink)';
  const subColor  = dark ? 'rgba(248,245,240,0.55)' : 'var(--stone)';
  const center    = align === 'center';

  const item = (i: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay: i * 0.11, ease: EASE },
  });

  const lineAnim = {
    initial: { scaleX: 0, opacity: 0 },
    animate: inView ? { scaleX: 1, opacity: 1 } : {},
    transition: { duration: 0.65, delay: 0, ease: EASE },
  };

  return (
    <div ref={ref} className={className} style={{ textAlign: center ? 'center' : 'left' }}>
      {/* Gold line */}
      <motion.span
        {...lineAnim}
        style={{
          display: 'block',
          width: 28,
          height: 1,
          background: 'var(--gold)',
          marginBottom: 16,
          transformOrigin: center ? 'center' : 'left',
          ...(center ? { margin: '0 auto 16px' } : {}),
        }}
      />

      {/* Overline */}
      {overline && (
        <motion.p
          {...item(1)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: 16,
          }}
        >
          {overline}
        </motion.p>
      )}

      {/* Heading */}
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          {...item(overline ? 2 : 1)}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: headingSize,
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: textColor,
            marginBottom: body || cta ? 20 : 0,
          }}
        >
          {heading}
        </motion.h2>
      </div>

      {/* Body */}
      {body && (
        <motion.p
          {...item(overline ? 3 : 2)}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            lineHeight: 1.75,
            color: subColor,
            marginBottom: cta ? 28 : 0,
          }}
        >
          {body}
        </motion.p>
      )}

      {/* CTA */}
      {cta && (
        <motion.div {...item(overline ? 4 : 3)}>
          {cta}
        </motion.div>
      )}
    </div>
  );
}
