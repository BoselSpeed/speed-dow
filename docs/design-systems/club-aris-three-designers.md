# Club Aris – Three Designer Personas & Design Systems

## Source Identity: Club Aris (ARIS Nightclub, Moncton, NB)

- **Nature:** 2SLGBTQIA+ safe space / nightclub & bar
- **Location:** Moncton, New Brunswick, Canada
- **Brand personality:** Inclusive, vibrant, safe, celebratory, bold yet welcoming
- **Current visual identity:** White background, yellow/gold accent `#fffd47`, logo wordmark "ARIS"
- **Fonts currently used:** Modak (display), Playfair Display (serif headings), Arimo (body)
- **Visual style:** High-contrast imagery, nightlife photography, community-focused

---

## 1. Premium Minimalist Designer

### Designer Persona
**Name:** Lena Moreau  
**Philosophy:** "Less noise, more presence. Luxury lives in restraint."  
Lena believes a nightclub's website should feel like an invitation to an exclusive, curated experience—not a shout. She strips everything back to let the club's photography and community speak for themselves.

### Design Pillars
- Simplicity and elegance
- Organized white space
- Strong, clear typography
- Club photography as hero content
- Original Club Aris colors only
- Refined user experience

### Color Palette (HEX)
| Role | Color | HEX | Usage |
|------|-------|-----|-------|
| Primary | Deep Charcoal | `#1A1A1A` | Headings, navigation, primary buttons |
| Secondary | Warm Gold | `#FFFD47` | Accents, highlights, CTAs (from identity) |
| Accent | Soft Amber | `#F5E6B3` | Subtle highlights, hover states |
| Background | Off White | `#FFFFFF` | Main page background |
| Surface | Light Grey | `#F7F7F7` | Cards, sections, elevated surfaces |
| Text | Near Black | `#262626` | Body copy |
| Text Muted | Grey | `#737373` | Captions, secondary text |
| Border | Light Grey | `#E5E5E5` | Dividers, input borders |

### Typography System
| Element | Font Family | Weight | Size | Line Height |
|---------|-------------|--------|------|-------------|
| Display / Logo | Modak | 400 | 48px–72px | 1.1 |
| Headings (H1–H3) | Playfair Display | 600–700 | 32px–48px | 1.2 |
| Subheadings | Arimo | 500 | 18px–24px | 1.4 |
| Body | Arimo | 400 | 16px | 1.6 |
| Captions / Small | Arimo | 400 | 12px–14px | 1.4 |
| Button labels | Arimo | 600 | 14px | 1.2 |

### Spacing System (8px base)
| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | 4px | Tight element spacing |
| `space-sm` | 8px | Component padding |
| `space-md` | 16px | Section internal spacing |
| `space-lg` | 32px | Between sections |
| `space-xl` | 64px | Major section gaps |
| `space-xxl` | 128px | Hero vertical padding |

### Buttons
- **Primary:** Charcoal bg, gold text, rounded 6px, hover: gold bg / charcoal text
- **Secondary:** Transparent, charcoal border, charcoal text, hover: charcoal fill / white text
- **Ghost:** No border, gold text, hover: light amber bg

### Cards
- Surface `#F7F7F7`, border `#E5E5E5` 1px, radius 12px, padding `space-lg`, subtle hover lift

### Navigation
- Fixed top, charcoal bg, white text, gold underline on active, hamburger on mobile

### Responsive Breakpoints
| Breakpoint | Min Width | Use |
|------------|-----------|-----|
| Mobile | 320px | Single column, stacked |
| Tablet | 768px | Two-column grids |
| Desktop | 1024px | Multi-column, wide hero |
| Wide | 1440px | Max-width container |

### Animation Guidelines
- Fade-in on load (400ms ease-out)
- Subtle scale on hover (1.02x)
- Smooth scroll
- No flashing or strobing effects

### Hover Effects
- Buttons: background invert
- Links: gold underline
- Cards: slight translateY(-4px), soft shadow

### Interaction States
- Focus: 2px gold outline (accessibility)
- Disabled: 40% opacity, no cursor

### Accessibility
- WCAG AA contrast (charcoal on white = 14.8:1)
- Keyboard navigable
- ARIA labels on all interactive elements
- Reduced motion support

### Performance Guidelines
- System font fallbacks, optimized images (WebP), lazy-load below fold, critical CSS inline

### Mobile-First Layout
- Single column, touch targets min 44px, hamburger menu, stacked sections

---

## 2. Bold Creative Designer

### Designer Persona
**Name:** Xavier Dubois  
**Philosophy:** "A nightclub doesn't whisper—it declares. The site should pulse with the same energy as the dance floor."  
Xavier treats the website as an extension of the club itself: expressive, unconventional, impossible to ignore. Big typography, big images, dynamic transitions.

### Design Pillars
- Express Club Aris personality
- Unconventional layout
- Large, distinctive headlines
- Large, striking photography
- Engaging transitions
- Strong visual identity

### Color Palette (HEX)
| Role | Color | HEX | Usage |
|------|-------|-----|-------|
| Primary | Electric Violet | `#7B2CBF` | Headings, primary actions |
| Secondary | Warm Gold | `#FFFD47` | Highlights, CTAs (from identity) |
| Accent | Neon Pink | `#FF00FF` | Accent details, hover glows |
| Background | Midnight Black | `#0A0A0A` | Main page background |
| Surface | Deep Charcoal | `#1A1A1A` | Cards, sections |
| Text | Off White | `#F5F5F5` | Body copy |
| Text Muted | Grey | `#A0A0A0` | Captions, secondary |
| Border | Gold | `#FFFD47` | Dividers, accents |

### Typography System
| Element | Font Family | Weight | Size | Line Height |
|---------|-------------|--------|------|-------------|
| Display / Logo | Modak | 400 | 64px–96px | 1.0 |
| Headings | Playfair Display | 700 | 40px–64px | 1.1 |
| Subheadings | Arimo | 600 | 24px–32px | 1.3 |
| Body | Arimo | 400 | 18px | 1.5 |
| Captions | Arimo | 500 | 14px | 1.4 |
| Button labels | Modak | 400 | 16px–20px | 1.1 |

### Spacing System (8px base, generous)
| Token | Value |
|-------|-------|
| `space-xs` | 8px |
| `space-sm` | 16px |
| `space-md` | 24px |
| `space-lg` | 48px |
| `space-xl` | 80px |
| `space-xxl` | 140px |

### Buttons
- **Primary:** Gold bg, black text, Modak font, pill shape, hover: neon pink glow
- **Secondary:** Transparent, gold border, white text, hover: gold fill
- **Outline:** Neon pink border, neon pink text, hover: fill neon pink

### Cards
- Deep charcoal bg, gold border 2px, radius 8px, hover: neon pink inner glow, scale 1.05

### Navigation
- Full-bleed top bar, midnight black, gold logo left, bold links right, mobile overlay menu

### Responsive Breakpoints
| Breakpoint | Min Width |
|------------|-----------|
| Mobile | 320px |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1440px |

### Animation Guidelines
- Entrance: staggered slide-up + fade (600ms)
- Hover: scale + color shift (300ms)
- Page transitions: cross-fade with scale
- Marquee text for announcements

### Hover Effects
- Buttons: neon glow, scale
- Images: grayscale to color, slight zoom
- Links: underline with gold wave

### Interaction States
- Active: pressed scale 0.95
- Focus: thick gold ring

### Accessibility
- WCAG AA contrast on dark mode
- Reduced motion toggle
- Focus visible states

### Performance
- WebP images, lazy load, GPU-accelerated transforms, font-display swap

### Mobile-First
- Stacked layout, large touch targets, swipeable image carousel, collapsible nav

---

## 3. Modern Interactive Designer

### Designer Persona
**Name:** Zara Chen  
**Philosophy:** "Every scroll should reveal something new. The site isn't a brochure—it's an experience."  
Zara builds sites that respond to the user: scroll-triggered reveals, smooth micro-interactions, and a polished feel on every device.

### Design Pillars
- Modern interfaces
- Advanced visual effects
- Professional animations
- Smooth user interaction
- Innovative image/content display
- Excellent mobile & desktop experience

### Color Palette (HEX)
| Role | Color | HEX | Usage |
|------|-------|-----|-------|
| Primary | Royal Blue | `#3B82F6` | Primary actions, active states |
| Secondary | Warm Gold | `#FFFD47` | Accents (from identity) |
| Accent | Electric Cyan | `#06B6D4` | Highlights, glows |
| Background | Slate | `#0F172A` | Main background |
| Surface | Card Grey | `#1E293B` | Cards, sections |
| Text | White | `#FFFFFF` | Body copy |
| Text Muted | Slate Grey | `#94A3B8` | Secondary text |
| Border | Slate Border | `#334155` | Dividers |

### Typography System
| Element | Font Family | Weight | Size | Line Height |
|---------|-------------|--------|------|-------------|
| Display / Logo | Modak | 400 | 56px–80px | 1.05 |
| Headings | Playfair Display | 600 | 36px–56px | 1.2 |
| Subheadings | Arimo | 500 | 20px–28px | 1.35 |
| Body | Arimo | 400 | 17px | 1.6 |
| Captions | Arimo | 400 | 13px | 1.4 |
| Button labels | Arimo | 600 | 14px | 1.2 |

### Spacing System (8px base)
| Token | Value |
|-------|-------|
| `space-xs` | 8px |
| `space-sm` | 16px |
| `space-md` | 32px |
| `space-lg` | 64px |
| `space-xl` | 96px |
| `space-xxl` | 160px |

### Buttons
- **Primary:** Royal blue bg, white text, radius 8px, hover: electric cyan glow + lift
- **Secondary:** Surface bg, white text, border slate, hover: royal blue fill
- **Icon:** Transparent, icon only, hover: rotate/scale

### Cards
- Card grey bg, slate border 1px, radius 16px, hover: border royal blue, subtle shadow

### Navigation
- Glassmorphism header, backdrop blur, slate bg, royal blue active indicator, mobile drawer

### Responsive Breakpoints
| Breakpoint | Min Width |
|------------|-----------|
| Mobile | 320px |
| Tablet | 768px |
| Desktop | 1024px |
| Wide | 1440px |

### Animation Guidelines
- Scroll-reveal (Intersection Observer)
- Staggered list animations
- Smooth page transitions (framer-motion style)
- Micro-interactions on all buttons

### Hover Effects
- Buttons: glow + translateY(-2px)
- Cards: border color change + shadow
- Images: subtle parallax on move

### Interaction States
- Loading: skeleton states
- Empty: illustrated empty states
- Focus: blue ring 2px

### Accessibility
- WCAG AA, prefers-reduced-motion, focus-visible, ARIA, semantic HTML

### Performance
- Intersection Observer lazy load, WebP, AVIF, critical CSS, code splitting

### Mobile-First
- Touch-first gestures, collapsible nav, sticky CTA bar, optimized image sizes

---

## Website Components (All Designers)

Each design system implements these sections, adapted to its philosophy:

1. **Header & Navigation** – Logo, nav links, CTA, social icons
2. **Hero Section** – Club Aris branding, hero image, primary CTA
3. **About the Club** – Identity, safe space statement, location
4. **Photos & Posts** – Instagram gallery, featured photography
5. **Services / Activities** – Bar, events, dance floor (based on actual account content)
6. **Features** – Safe space, 2SLGBTQIA+ inclusive, venue hire
7. **Contact** – Address, email, hours, map placeholder
8. **Instagram & Social Links** – Instagram embed/link, social icons
9. **Footer** – Copyright, links, socials

---

## Recommendation

**Recommended Designer: Premium Minimalist Designer (Lena Moreau)**

### Reasons:
1. **Authenticity** – Club Aris's existing identity is already clean, white-background, gold-accented. The minimalist approach extends this naturally rather than imposing a foreign aesthetic.
2. **Inclusivity & Safety** – As a 2SLGBTQIA+ safe space, the club's digital presence should feel welcoming and calm, not overwhelming. Minimalism communicates safety and respect.
3. **Photography First** – Nightclub branding lives in its imagery. A restrained layout lets the club's photos and community be the stars.
4. **Performance & Accessibility** – Minimal assets, high contrast, and simple interactions yield fast loads and broad accessibility—critical for a community venue.
5. **Longevity** – Bold trends date quickly; a premium minimal system ages gracefully and remains professional.

The Bold Creative and Modern Interactive systems are excellent for event promotion campaigns, but for the official Club Aris website—a permanent, trustworthy home for the community—the Premium Minimalist approach best reflects the club's true identity.
