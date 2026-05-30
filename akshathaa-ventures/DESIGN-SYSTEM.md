# Akshathaa Ventures Design System

## Overview
A luxury real estate design system inspired by Sotheby's Realty, Christie's Real Estate, and Four Seasons Residences.

---

## Typography

### Font Families
- **Headings**: `Cormorant Garamond` (serif) — elegant, editorial
- **Body**: `Manrope` (sans-serif) — clean, modern, readable

### Type Scale
```
Display (Hero only):     clamp(40px, 5.5vw, 72px)  | line-height: 1.08 | weight: 400
H1 (Page titles):        clamp(32px, 4vw, 56px)    | line-height: 1.1  | weight: 400
H2 (Section headings):   clamp(26px, 3vw, 40px)    | line-height: 1.15 | weight: 400
H3 (Card titles):        clamp(20px, 2vw, 28px)    | line-height: 1.2  | weight: 400
Overline (Labels):       11px                      | tracking: 0.18em  | weight: 600 | uppercase
Body Large:              clamp(15px, 1.2vw, 17px)  | line-height: 1.75 | weight: 400
Body:                    14px                      | line-height: 1.65 | weight: 400
Caption:                 12px                      | tracking: 0.04em  | weight: 500
```

### Letter Spacing
- Display/H1: `-0.02em` (tight)
- H2/H3: `-0.015em` to `-0.01em`
- Overline/Caption: `0.18em` to `0.04em` (wide)
- Body: normal

---

## Color Palette

### Primary Colors
```css
--black:       #0A0A0A    /* Primary dark */
--black-soft:  #141414    /* Hover states */
--black-mid:   #1E1E1E    /* Elevated surfaces */
--charcoal:    #2C2C2C    /* Secondary dark */
```

### Neutral Colors
```css
--stone:       #6B6B6B    /* Body text */
--stone-light: #9A9A9A    /* Muted text */
```

### Light Colors
```css
--cream:       #F8F5F0    /* Primary background */
--cream-warm:  #F0EBE3    /* Secondary background */
--cream-mid:   #E8E0D5    /* Borders, dividers */
--white:       #FFFFFF    /* Pure white */
```

### Accent Colors
```css
--gold:        #C9A96E    /* Primary accent */
--gold-light:  #DFC08A    /* Hover, highlights */
--gold-dark:   #9A7A45    /* Active states */
--gold-muted:  rgba(201,169,110,0.15)  /* Backgrounds */
```

### Usage Guidelines
- **Black**: Primary text, buttons, headers
- **Stone**: Body copy, secondary text
- **Cream**: Page backgrounds, cards
- **Gold**: CTAs, accents, highlights, hover states

---

## Spacing System (8px base)

```css
--sp-1:  8px    /* Micro spacing */
--sp-2:  16px   /* Small gaps */
--sp-3:  24px   /* Medium gaps */
--sp-4:  32px   /* Large gaps */
--sp-5:  40px   /* Section spacing */
--sp-6:  48px   /* Grid gaps */
--sp-8:  64px   /* Major sections */
--sp-10: 80px   /* Section padding (small) */
--sp-12: 96px   /* Section padding (medium) */
--sp-15: 120px  /* Section padding (large) */
--sp-20: 160px  /* Hero sections */
```

### Application
- **Component padding**: 24px, 32px, 48px
- **Section padding**: 80px, 120px vertical
- **Grid gaps**: 16px, 24px, 48px
- **Element margins**: 8px, 16px, 24px

---

## Layout

### Container
```css
max-width: 1440px
padding-inline: clamp(24px, 4vw, 80px)
margin: 0 auto
```

### Grid System
- 12-column grid
- Gaps: 16px (mobile), 24px (tablet), 48px (desktop)
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

---

## Border Radius

```css
--radius-sm:   4px   /* Small elements */
--radius-md:   8px   /* Medium elements */
--radius-card: 2px   /* Property cards (minimal) */
--radius-form: 4px   /* Form inputs */
```

**Philosophy**: Minimal radius for luxury feel. Sharp corners convey precision.

---

## Shadows

```css
--shadow-sm:  0 1px 3px rgba(10,10,10,0.06), 0 1px 2px rgba(10,10,10,0.04)
--shadow-md:  0 4px 16px rgba(10,10,10,0.08), 0 2px 6px rgba(10,10,10,0.04)
--shadow-lg:  0 16px 48px rgba(10,10,10,0.12), 0 4px 16px rgba(10,10,10,0.06)
--shadow-xl:  0 32px 80px rgba(10,10,10,0.16), 0 8px 24px rgba(10,10,10,0.08)
--shadow-gold: 0 8px 32px rgba(201,169,110,0.2)
```

**Usage**: Subtle, soft shadows only. Avoid harsh drop shadows.

---

## Transitions

```css
--ease:          cubic-bezier(0.4, 0, 0.2, 1)  /* Standard easing */
--ease-out:      cubic-bezier(0, 0, 0.2, 1)    /* Exit animations */
--duration:      300ms                          /* Standard duration */
--duration-slow: 600ms                          /* Slow, elegant */
```

### Animation Principles
- **Hover**: 300ms ease
- **Page transitions**: 600ms ease-out
- **Scroll animations**: 700ms cubic-bezier(0.16, 1, 0.3, 1)
- **Image zoom**: 700ms ease

---

## Components

### Buttons

#### Primary Button
```css
background: var(--black)
color: var(--cream)
padding: 14px 32px
font-size: 12px
font-weight: 600
letter-spacing: 0.12em
text-transform: uppercase
border: 1px solid var(--black)
transition: all 300ms ease
```

#### Gold Button
```css
background: var(--gold)
color: var(--black)
/* Same sizing as primary */
```

#### Outline Button
```css
background: transparent
color: var(--black)
border: 1px solid var(--black)
/* Hover: fill with black, text becomes cream */
```

### Property Cards

#### Large Hero Card
- Height: 520px
- Image: full bleed with gradient overlay
- Overlay: `linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)`
- Hover: scale image 1.05, duration 700ms

#### Medium Card
- Height: 340px
- Same overlay pattern
- Price in gold, title in white

#### Small Card
- Height: 250px
- Stacked layout
- Minimal info

### Form Inputs
```css
padding: 14px 16px
font-size: 14px
background: var(--white)
border: 1px solid var(--cream-mid)
border-radius: var(--radius-form)
transition: border-color 300ms, box-shadow 300ms
```

**Focus state**:
```css
border-color: var(--gold)
box-shadow: 0 0 0 3px rgba(201,169,110,0.12)
```

---

## Page Sections

### Hero Section
- Height: 100svh (min 680px)
- Full-screen background image
- Layered gradient overlays
- Parallax scroll effect
- Max content width: 760px

### Featured Properties
- Asymmetric grid layout
- 1 large hero card (8 cols) + 2 stacked cards (4 cols)
- 3 medium cards below (4 cols each)
- Gap: 16px

### Stats Section
- Black background
- Large outlined numbers in background
- 4-column grid
- Animated count-up on scroll

### Process Section
- 3-column grid
- Middle card inverted (black background)
- Large outlined step numbers
- Minimal padding

### Testimonial Section
- Black background
- Centered layout (max 800px)
- Large quote mark
- Carousel with dots
- Pulse animation on avatar

---

## Best Practices

### DO
✓ Use 8px spacing increments
✓ Maintain consistent typography scale
✓ Use subtle shadows and transitions
✓ Keep borders minimal (1px, subtle colors)
✓ Use gold sparingly for accents
✓ Ensure high contrast for readability
✓ Use Cormorant Garamond for all headings
✓ Use Manrope for all body text

### DON'T
✗ Mix font families within same category
✗ Use arbitrary spacing values
✗ Overuse gold (it loses impact)
✗ Use heavy shadows or borders
✗ Use bright, saturated colors
✗ Create cluttered layouts
✗ Use more than 3 font sizes per section
✗ Ignore the 8px spacing system

---

## Accessibility

- Minimum contrast ratio: 4.5:1 for body text
- Minimum contrast ratio: 3:1 for large text
- Focus states: visible gold outline
- Alt text: required for all images
- Semantic HTML: proper heading hierarchy
- Keyboard navigation: full support

---

## Performance

- Images: WebP format, lazy loading
- Fonts: preload critical fonts
- Animations: use transform and opacity only
- Code splitting: per-route
- Critical CSS: inline above-the-fold styles

---

## Inspiration References

- **Sotheby's Realty**: Editorial typography, luxury spacing
- **Christie's Real Estate**: Sophisticated color palette, minimal design
- **Four Seasons Residences**: Premium imagery, elegant transitions
- **Aman Residences**: Zen minimalism, breathing room
- **Prestige Group**: Indian luxury aesthetic
