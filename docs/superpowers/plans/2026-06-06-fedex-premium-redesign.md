# WhiteBox Express — FedEx-Tier Premium Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign WhiteBox Express into a premium FedEx-tier logistics site with red+orange theme, poster-sourced services/rates/features, and a working rate calculator — all on branch `redesign/fedex-premium`.

**Architecture:** Centralize palette tokens in Tailwind config; add typed content data files under `lib/data/`; build new sections as isolated components; restyle existing components to use new tokens. No backend, no new heavy deps.

**Tech Stack:** Next.js 14 App Router · Tailwind CSS · Framer Motion · Lucide React · TypeScript

**Note on "testing":** This is a pure UI project with no test framework. "Verify" steps mean: run `npm run dev`, open browser, confirm visual output. Build step confirms no TypeScript errors.

---

## File Map

**Create:**
- `lib/data/services.ts` — 8 poster services with icons + descriptions
- `lib/data/rates.ts` — rate table data + `calculateRate()` function
- `lib/data/contact.ts` — real contact details from posters
- `lib/data/features.ts` — "One tap" app feature trio
- `components/TrustBar.tsx` — stats strip + partner carousel wrapper
- `components/AppFeatures.tsx` — "One tap, and we're on the way" dark band
- `components/RateQuote.tsx` — pricing table + interactive calculator

**Modify:**
- `tailwind.config.ts` — add `accent` orange token + gradient utilities
- `app/globals.css` — add `--accent` CSS variable + gradient class
- `components/Hero.tsx` — gradient text on "Saudi Arabia", add second CTA
- `components/WhyWhiteBox.tsx` — expand with poster differentiators
- `components/ServicesBento.tsx` — replace inline data with `lib/data/services.ts`
- `components/ContactSection.tsx` — add real contact card
- `components/Footer.tsx` — replace placeholder contact data with real data
- `components/Navigation.tsx` — add "Rates" nav link + "Get a Quote" CTA
- `app/page.tsx` — wire in new components in correct order

---

## Task 1: Palette Tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1.1: Add orange accent token to Tailwind**

Replace `tailwind.config.ts` with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f72a42",
        accent:  "#FF6A13",
        secondary: "#d7d7d3",
        charcoal: "#1a1a1a",
      },
      fontFamily: {
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        premium: ["var(--font-pt-sans-narrow)", "PT Sans Narrow", "sans-serif"],
        exo:     ["var(--font-exo)", "Exo", "sans-serif"],
      },
      backgroundImage: {
        glass:        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        "brand-grad": "linear-gradient(135deg, #f72a42 0%, #FF6A13 100%)",
      },
      boxShadow: {
        glow:       "0 0 20px rgba(247, 42, 66, 0.4)",
        "glow-lg":  "0 0 40px rgba(247, 42, 66, 0.5)",
        "glow-accent": "0 0 20px rgba(255, 106, 19, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 1.2: Add CSS variable + gradient utilities to globals.css**

At the top of `app/globals.css`, update the `:root` block and add two utility classes:

```css
:root {
  --primary: #f72a42;
  --accent:  #FF6A13;
  --secondary: #d7d7d3;
  --charcoal: #1a1a1a;
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
}
```

Also add after the `:root` block (before `html {`):

```css
/* Brand gradient text helper */
.text-brand-grad {
  background: linear-gradient(135deg, #f72a42 0%, #FF6A13 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Brand gradient background helper */
.bg-brand-grad {
  background: linear-gradient(135deg, #f72a42 0%, #FF6A13 100%);
}
```

Also update `.cursor-glow` and `::selection` to add accent awareness (keep existing red values — no change needed there).

- [ ] **Step 1.3: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add orange accent token (#FF6A13) + brand gradient utilities"
```

---

## Task 2: Content Data Files

**Files:**
- Create: `lib/data/services.ts`
- Create: `lib/data/rates.ts`
- Create: `lib/data/contact.ts`
- Create: `lib/data/features.ts`

- [ ] **Step 2.1: Create `lib/data/services.ts`**

```bash
mkdir -p lib/data
```

```ts
// lib/data/services.ts
export interface Service {
  id: string;
  title: string;
  desc: string;
  iconName: string; // lucide icon name used in ServicesBento
  gradient: string; // Tailwind gradient classes for hover
}

export const SERVICES: Service[] = [
  {
    id: "domestic",
    title: "Domestic Cargo",
    desc: "Fast, reliable ground delivery across every city in Saudi Arabia.",
    iconName: "Truck",
    gradient: "from-red-50 to-white",
  },
  {
    id: "international",
    title: "International Cargo",
    desc: "Sea & Air freight solutions connecting KSA to the world.",
    iconName: "Globe",
    gradient: "from-sky-50 to-white",
  },
  {
    id: "airport",
    title: "Airport to Airport",
    desc: "Worldwide airport-to-airport service for time-critical cargo.",
    iconName: "Plane",
    gradient: "from-blue-50 to-white",
  },
  {
    id: "import",
    title: "Import to KSA",
    desc: "From any country, delivered to all KSA cities door-to-door.",
    iconName: "PackageOpen",
    gradient: "from-amber-50 to-white",
  },
  {
    id: "secure",
    title: "Safe & Secure",
    desc: "Full-coverage protection and insurance on every shipment.",
    iconName: "ShieldCheck",
    gradient: "from-emerald-50 to-white",
  },
  {
    id: "ontime",
    title: "On-Time Delivery",
    desc: "Same-day and next-day options — we guarantee your timeline.",
    iconName: "Clock",
    gradient: "from-orange-50 to-white",
  },
  {
    id: "door",
    title: "Door-to-Door",
    desc: "We pick up from your door and deliver to theirs, every time.",
    iconName: "Home",
    gradient: "from-rose-50 to-white",
  },
  {
    id: "support",
    title: "24/7 Support",
    desc: "Dedicated customer service — always here when you need us.",
    iconName: "Headphones",
    gradient: "from-purple-50 to-white",
  },
];
```

- [ ] **Step 2.2: Create `lib/data/rates.ts`**

```ts
// lib/data/rates.ts
export type ServiceArea = "inside-riyadh" | "outside-riyadh";
export type DeliverySpeed = "same-day" | "next-day";

export interface RateRow {
  area: ServiceArea;
  minWeight: number; // exclusive lower bound (0 means "from 0 kg")
  maxWeight: number; // inclusive upper bound
  sameDayRate: number;
  nextDayRate: number | null; // null = not available for this zone
  deliveryNote: string;
}

export const RATE_TABLE: RateRow[] = [
  {
    area: "inside-riyadh",
    minWeight: 0,
    maxWeight: 5,
    sameDayRate: 35,
    nextDayRate: 30,
    deliveryNote: "Same / Next Day",
  },
  {
    area: "inside-riyadh",
    minWeight: 5,
    maxWeight: 15,
    sameDayRate: 40,
    nextDayRate: 35,
    deliveryNote: "Same / Next Day",
  },
  {
    area: "outside-riyadh",
    minWeight: 0,
    maxWeight: 5,
    sameDayRate: 45,
    nextDayRate: null,
    deliveryNote: "Within 2–3 Days",
  },
  {
    area: "outside-riyadh",
    minWeight: 5,
    maxWeight: 15,
    sameDayRate: 50,
    nextDayRate: null,
    deliveryNote: "Within 2–3 Days",
  },
];

export const EXTRA_KG_RATE = 4; // SAR per kg over 15 kg
export const MIN_MONTHLY_SHIPMENTS = 300; // rate valid for 300+ monthly shipments

/**
 * Returns the SAR rate for given inputs, or null if inputs are invalid.
 * For Outside Riyadh, speed is ignored (always standard 2-3 day rate).
 */
export function calculateRate(
  area: ServiceArea,
  weight: number,
  speed: DeliverySpeed
): number | null {
  if (weight <= 0) return null;

  // Use weight capped at 15 to find the base tier; add overage separately
  const baseWeight = Math.min(weight, 15);

  const row = RATE_TABLE.find(
    (r) =>
      r.area === area &&
      baseWeight > r.minWeight &&
      baseWeight <= r.maxWeight
  ) ?? RATE_TABLE.find((r) => r.area === area && r.maxWeight === 15); // fallback for exactly 0

  if (!row) return null;

  const baseRate =
    speed === "next-day" && row.nextDayRate !== null
      ? row.nextDayRate
      : row.sameDayRate;

  const extraKg = Math.max(0, weight - 15);
  return baseRate + extraKg * EXTRA_KG_RATE;
}
```

- [ ] **Step 2.3: Create `lib/data/contact.ts`**

```ts
// lib/data/contact.ts
export const CONTACT = {
  mainPhone: "0533989986",
  salesPhone: "0570204637",
  salesName: "Asif Asharaf",
  salesTitle: "Sales Manager",
  email: "whiteboxaircargo@gmail.com",
  whatsapp: "966533989986", // without +, used in wa.me links
  branches: [
    { id: "tuwaiq" as const, label: "Tuwaiq Branch" },
    { id: "laban" as const,  label: "Laban Branch" },
  ],
  mapEmbeds: {
    tuwaiq: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3628.3037382398993!2d46.5677502!3d24.5787117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f196a5a9293bd%3A0x1e84197431aac9d!2zV2hpdGUgQm94IEV4cHJlc3Mg2YTZhNi02K3ZhiDYp9mE2LNYsdmK2Lk!5e0!3m2!1sen!2sin!4v1770466924851!5m2!1sen!2sin",
    laban:  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.749268202912!2d46.5645147!3d24.632325199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1f0079acc7bd%3A0xdd5e9e4d33b82c72!2zV2hpdGUgQm94IEV4cHJlc3Mg2YTZhNi02K3ZhiDYp9mE2LNYsdmK2Lk!5e0!3m2!1sen!2sin!4v1770466974514!5m2!1sen!2sin",
  },
} as const;
```

- [ ] **Step 2.4: Create `lib/data/features.ts`**

```ts
// lib/data/features.ts
export interface AppFeature {
  id: string;
  label: string;
  desc: string;
  iconName: string; // lucide icon name
}

export const APP_FEATURES: AppFeature[] = [
  {
    id: "schedule",
    label: "Schedule Pickup",
    desc: "Book a collection at your door in seconds.",
    iconName: "CalendarCheck",
  },
  {
    id: "redirect",
    label: "Redirect Package",
    desc: "Change delivery address mid-transit, hassle-free.",
    iconName: "Navigation",
  },
  {
    id: "track",
    label: "Track Locations",
    desc: "Real-time updates from pickup to doorstep.",
    iconName: "MapPin",
  },
];

export const HEADLINE_LINE1 = "One tap,";
export const HEADLINE_LINE2 = "and we're on the way";
```

- [ ] **Step 2.5: Commit data files**

```bash
git add lib/
git commit -m "feat: add typed content data files (services, rates, contact, features)"
```

---

## Task 3: TrustBar Component

**Files:**
- Create: `components/TrustBar.tsx`

The trust bar sits between the hero and the partner carousel — a thin strip showing key stats plus the existing partner logos row (currently `PartnerCarousel`). This replaces the current raw partner carousel section.

- [ ] **Step 3.1: Create `components/TrustBar.tsx`**

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";

const STATS = [
  { value: "15+", label: "Years Experience" },
  { value: "300+", label: "Shipments / Month" },
  { value: "6",    label: "Carrier Partners" },
  { value: "24/7", label: "Customer Support" },
];

const PARTNERS = [
  { src: "/media/partners/fedex.svg",  alt: "FedEx"      },
  { src: "/media/partners/aramex.svg", alt: "Aramex"     },
  { src: "/media/partners/dhl.svg",    alt: "DHL"        },
  { src: "/media/partners/naqel.svg",  alt: "Naqel"      },
  { src: "/media/partners/smsa.svg",   alt: "SMSA"       },
  { src: "/media/partners/JT.svg",     alt: "J&T Express"},
];

const TrustBar = () => {
  return (
    <section
      className="bg-white border-y border-gray-100 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl">
        {/* Stats row */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-3xl sm:text-4xl font-premium font-bold text-brand-grad">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-charcoal/60 font-exo tracking-wide uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Partner logos — infinite scroll */}
        <div className="relative flex overflow-x-hidden gap-0">
          <div className="flex gap-10 items-center animate-[scroll_18s_linear_infinite] whitespace-nowrap">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div key={i} className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={100}
                  height={40}
                  className="h-9 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
```

- [ ] **Step 3.2: Add the scroll keyframe animation to globals.css**

Append to `app/globals.css`:

```css
/* Infinite partner scroll */
@keyframes scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

- [ ] **Step 3.3: Commit**

```bash
git add components/TrustBar.tsx app/globals.css
git commit -m "feat: add TrustBar with stats strip and animated partner logos"
```

---

## Task 4: Restyle Hero

**Files:**
- Modify: `components/Hero.tsx`

Apply red→orange gradient to "Saudi Arabia" accent text. Add second CTA "Get a Quote".

- [ ] **Step 4.1: Replace `components/Hero.tsx`**

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextRoll } from "./TextRoll";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      aria-label="Hero"
    >
      {/* Video background — untouched */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden
      >
        <source src="/media/whitebox.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70 pointer-events-none"
        aria-hidden
      />

      {/* Subtle orange glow bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-accent/10 blur-[80px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-md flex flex-wrap gap-x-[0.25em]"
          >
            <TextRoll className="text-white">Shipping</TextRoll>
            <TextRoll className="text-white">Redefined</TextRoll>
            <TextRoll className="text-white">across</TextRoll>
            {/* Gradient accent text on "Saudi Arabia" */}
            <TextRoll className="text-brand-grad text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Saudi</TextRoll>
            <TextRoll className="text-brand-grad text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">Arabia</TextRoll>
            <TextRoll className="text-white">&</TextRoll>
            <TextRoll className="text-white">The</TextRoll>
            <TextRoll className="text-white">World.</TextRoll>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-xl drop-shadow-sm font-exo"
          >
            Fast · Safe · Reliable — Your Trusted Logistics Partner
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* Primary CTA — Ship Now */}
            <Link
              href="#contact"
              className="track-button open-box-icon"
              style={{ "--main-size": "1.25em" } as React.CSSProperties}
              aria-label="Ship Now"
            >
              <span>Ship Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box">
                <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8" />
                <path d="M12 12v10.08" />
                <g className="box-lid origin-center">
                  <path d="M3 8l9-5 9 5-9 5-9-5z" />
                </g>
              </svg>
            </Link>

            {/* Secondary CTA — Get a Quote */}
            <Link
              href="#rates"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-base text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300"
              aria-label="Get a Rate Quote"
            >
              Get a Quote
              <ArrowRight size={18} aria-hidden />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 flex justify-center items-center min-h-[280px] lg:min-h-[400px]"
          aria-hidden
        >
          <HeroLogo />
        </motion.div>
      </div>
    </section>
  );
};

const HeroLogo = () => {
  return (
    <motion.div
      className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/media/whiteboxlogo.svg"
        alt=""
        width={320}
        height={320}
        className="w-full h-full object-contain drop-shadow-2xl"
        unoptimized
        aria-hidden
      />
    </motion.div>
  );
};

export default Hero;
```

- [ ] **Step 4.2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: hero — red-to-orange gradient on accent text + Get a Quote CTA"
```

---

## Task 5: Restyle WhyWhiteBox

**Files:**
- Modify: `components/WhyWhiteBox.tsx` (read first, then restyle accent colors to use `text-accent` / `bg-accent` on icon backgrounds for the "energy" cards)

- [ ] **Step 5.1: Read current file**

```bash
cat components/WhyWhiteBox.tsx
```

- [ ] **Step 5.2: Update card data to include poster differentiators**

In `components/WhyWhiteBox.tsx`, locate the `cards` / `features` array (whatever the component calls it) and replace or expand it with:

```tsx
const WHY_ITEMS = [
  {
    title: "Fast & Reliable",
    desc: "Same-day and next-day delivery options right on time, every time.",
    icon: Zap,
    accent: "primary",
  },
  {
    title: "Safe & Secure",
    desc: "We protect what matters — insured, handled with care on every shipment.",
    icon: ShieldCheck,
    accent: "primary",
  },
  {
    title: "Competitive Pricing",
    desc: "Transparent SAR rate card with no hidden fees. 300+ monthly shipments qualify.",
    icon: BadgeDollarSign,
    accent: "accent",
  },
  {
    title: "Nationwide Coverage",
    desc: "All KSA cities covered — from Riyadh to Jeddah, same trusted service.",
    icon: MapPin,
    accent: "accent",
  },
  {
    title: "24/7 Support",
    desc: "Dedicated customer team always here for you — call, WhatsApp, or email.",
    icon: Headphones,
    accent: "primary",
  },
  {
    title: "Door-to-Door",
    desc: "Airport pickup, home delivery — door to door anywhere in Saudi Arabia.",
    icon: Home,
    accent: "accent",
  },
];
```

For the icon container, use:
- `accent === "primary"` → `bg-primary/10 text-primary`  
- `accent === "accent"` → `bg-accent/10 text-accent`

Add required imports: `import { Zap, ShieldCheck, BadgeDollarSign, MapPin, Headphones, Home } from "lucide-react";`

Apply the accent color logic to the icon div className:
```tsx
className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${
  item.accent === "accent"
    ? "bg-accent/10 text-accent"
    : "bg-primary/10 text-primary"
}`}
```

- [ ] **Step 5.3: Commit**

```bash
git add components/WhyWhiteBox.tsx
git commit -m "feat: WhyWhiteBox — 6 poster differentiators with red/orange accent icons"
```

---

## Task 6: Restyle ServicesBento

**Files:**
- Modify: `components/ServicesBento.tsx`

Replace the inline service array with the typed data from `lib/data/services.ts`. Map `iconName` strings to Lucide components.

- [ ] **Step 6.1: Replace `components/ServicesBento.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck, Globe, Plane, PackageOpen, ShieldCheck,
  Clock, Home, Headphones, Package, MapPin, ArrowRight,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { SERVICES } from "@/lib/data/services";

const ICON_MAP: Record<string, LucideIcon> = {
  Truck, Globe, Plane, PackageOpen, ShieldCheck,
  Clock, Home, Headphones, Package, MapPin,
};

const ServicesBento = () => {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
      aria-label="Our Services"
    >
      <div className="relative mx-auto max-w-7xl z-10">
        <RevealOnScroll>
          <div className="w-full flex flex-col items-center mb-16 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold font-exo tracking-wide uppercase mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-premium font-normal text-charcoal mb-6">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-charcoal/70 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-exo">
              Comprehensive shipping solutions — from road freight across KSA to
              airport-to-airport worldwide, handled with precision and care.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] ?? Package;
            return (
              <RevealOnScroll key={service.id} delay={idx * 0.05}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group h-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-primary/10 transition-all duration-300 relative overflow-hidden flex flex-col"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <Icon className="w-7 h-7 text-charcoal group-hover:text-primary transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-premium font-normal text-charcoal mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed font-exo">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA row */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#e0253a] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Book a Pickup"
            >
              <Package size={20} aria-hidden />
              Book a Pickup
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-charcoal hover:border-primary hover:text-primary hover:shadow-lg transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Track Shipment"
            >
              <MapPin size={20} aria-hidden />
              Track Shipment
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesBento;
```

- [ ] **Step 6.2: Commit**

```bash
git add components/ServicesBento.tsx
git commit -m "feat: ServicesBento — 8 poster services from typed data, red accent styling"
```

---

## Task 7: AppFeatures Component ("One tap, and we're on the way")

**Files:**
- Create: `components/AppFeatures.tsx`

Dark premium band with headline, phone mockup on right, 3 feature cards staggered on left.

- [ ] **Step 7.1: Create `components/AppFeatures.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Navigation, MapPin } from "lucide-react";
import { LucideIcon } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { APP_FEATURES, HEADLINE_LINE1, HEADLINE_LINE2 } from "@/lib/data/features";

const ICON_MAP: Record<string, LucideIcon> = {
  CalendarCheck, Navigation, MapPin,
};

const AppFeatures = () => {
  return (
    <section
      id="app-features"
      className="relative bg-charcoal py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="App features"
    >
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-accent/8 rounded-full blur-[100px] pointer-events-none" aria-hidden />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-20">

          {/* Left: headline + feature cards */}
          <div className="flex-1 max-w-xl">
            <RevealOnScroll>
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                <span className="block text-brand-grad">{HEADLINE_LINE1}</span>
                <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl font-normal mt-2">
                  {HEADLINE_LINE2}
                </span>
              </h2>
              <p className="mt-6 text-white/50 font-exo text-lg">
                Manage all your shipments from one place — fast, intuitive, and built for business.
              </p>
            </RevealOnScroll>

            <div className="mt-12 space-y-5">
              {APP_FEATURES.map((feature, i) => {
                const Icon = ICON_MAP[feature.iconName] ?? MapPin;
                return (
                  <RevealOnScroll key={feature.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-grad flex items-center justify-center flex-shrink-0 shadow-glow-accent group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" strokeWidth={2} aria-hidden />
                      </div>
                      <div>
                        <h3 className="text-white font-premium text-xl font-semibold mb-1">
                          {feature.label}
                        </h3>
                        <p className="text-white/55 font-exo text-sm leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          {/* Right: stylized phone mockup */}
          <div className="flex-1 flex justify-center lg:justify-end" aria-hidden>
            <RevealOnScroll delay={0.2}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Phone frame */}
                <div className="relative w-64 h-[520px] bg-[#0a0a0a] rounded-[3rem] border-[7px] border-white/15 shadow-[0_0_60px_rgba(247,42,66,0.2),0_40px_80px_rgba(0,0,0,0.6)] overflow-hidden">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0a0a0a] rounded-full z-10 border border-white/10" />
                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 pt-3 pb-2 text-[10px] text-white/60 font-exo">
                    <span>12:24</span>
                    <span className="text-[9px]">whiteboxexpress.com</span>
                  </div>
                  {/* App header */}
                  <div className="px-4 py-3 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-grad flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">W</span>
                      </div>
                      <div>
                        <div className="text-white text-[11px] font-bold leading-tight">WhiteBox</div>
                        <div className="text-white/40 text-[9px]">Express</div>
                      </div>
                    </div>
                  </div>
                  {/* Screen content */}
                  <div className="px-4 py-4">
                    <p className="text-white text-[13px] font-premium font-semibold mb-5">
                      Manage your shipments
                    </p>
                    {APP_FEATURES.map((feature, i) => {
                      const Icon = ICON_MAP[feature.iconName] ?? MapPin;
                      return (
                        <motion.div
                          key={feature.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                          className="flex items-center gap-3 py-4 border-b border-white/8 last:border-0"
                        >
                          <div className="w-10 h-10 rounded-full border-2 border-primary/60 flex items-center justify-center bg-primary/10">
                            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                          </div>
                          <span className="text-white/80 text-[11px] font-bold uppercase tracking-wider">
                            {feature.label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Glow behind phone */}
                <div className="absolute inset-0 -z-10 bg-brand-grad opacity-10 blur-[60px] scale-110 rounded-[3rem]" />
              </motion.div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
```

- [ ] **Step 7.2: Commit**

```bash
git add components/AppFeatures.tsx
git commit -m "feat: AppFeatures — dark premium 'One tap' band with phone mockup and feature cards"
```

---

## Task 8: RateQuote Component (Table + Calculator)

**Files:**
- Create: `components/RateQuote.tsx`

Two-column section: left = styled pricing table from `RATE_TABLE`, right = interactive calculator. Calculator computes SAR from area + weight + speed, with a WhatsApp CTA.

- [ ] **Step 8.1: Create `components/RateQuote.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Send, Info } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import {
  RATE_TABLE, EXTRA_KG_RATE, MIN_MONTHLY_SHIPMENTS,
  calculateRate, ServiceArea, DeliverySpeed,
} from "@/lib/data/rates";
import { CONTACT } from "@/lib/data/contact";

const AREA_LABELS: Record<ServiceArea, string> = {
  "inside-riyadh":  "Inside Riyadh",
  "outside-riyadh": "Outside Riyadh",
};

const RateQuote = () => {
  const [area, setArea]   = useState<ServiceArea>("inside-riyadh");
  const [weight, setWeight] = useState<string>("");
  const [speed, setSpeed] = useState<DeliverySpeed>("same-day");
  const [result, setResult] = useState<number | null>(null);

  const weightNum = parseFloat(weight);
  const isValidWeight = !isNaN(weightNum) && weightNum > 0;

  const handleCalculate = () => {
    if (!isValidWeight) return;
    const rate = calculateRate(area, weightNum, speed);
    setResult(rate);
  };

  const handleWhatsApp = () => {
    if (result === null) return;
    const msg = `Hello WhiteBox, I'd like to confirm a rate quote.\n\n📍 Area: ${AREA_LABELS[area]}\n⚖️ Weight: ${weightNum} kg\n🚀 Speed: ${speed === "same-day" ? "Same Day" : "Next Day"}\n💰 Estimated Rate: ${result} SAR\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section
      id="rates"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50"
      aria-label="Rate Quotation"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold font-exo tracking-wide uppercase mb-4">
              Transparent Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-premium font-normal text-charcoal mb-4">
              Rate <span className="text-brand-grad">Quotation</span>
            </h2>
            <p className="text-charcoal/60 font-exo text-lg max-w-2xl mx-auto">
              Domestic logistics & delivery services within Saudi Arabia.
              Rates below are <strong>excl. VAT</strong> and valid for{" "}
              {MIN_MONTHLY_SHIPMENTS}+ monthly shipments.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

          {/* Pricing Table */}
          <RevealOnScroll delay={0.05}>
            <div className="rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="bg-charcoal px-6 py-5 flex items-center justify-between">
                <h3 className="text-white font-premium text-xl">Domestic Rates (SAR)</h3>
                <span className="text-white/40 text-xs font-exo uppercase tracking-wide">Excl. VAT</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label="Domestic shipping rate table">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left py-3 px-5 font-semibold text-charcoal/70 font-exo uppercase text-xs tracking-wide">Zone</th>
                      <th className="text-left py-3 px-3 font-semibold text-charcoal/70 font-exo uppercase text-xs tracking-wide">Weight</th>
                      <th className="text-center py-3 px-3 font-semibold text-primary font-exo uppercase text-xs tracking-wide">SAR</th>
                      <th className="text-left py-3 px-3 font-semibold text-charcoal/70 font-exo uppercase text-xs tracking-wide">Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RATE_TABLE.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                      >
                        <td className="py-4 px-5 font-premium text-charcoal font-semibold">
                          {AREA_LABELS[row.area]}
                        </td>
                        <td className="py-4 px-3 font-exo text-charcoal/70 whitespace-nowrap">
                          {row.minWeight === 0 ? `up to ${row.maxWeight}` : `${row.minWeight}–${row.maxWeight}`} kg
                        </td>
                        <td className="py-4 px-3 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="inline-block px-3 py-1 rounded-lg bg-primary text-white font-bold text-sm">
                              {row.sameDayRate}
                            </span>
                            {row.nextDayRate !== null && (
                              <span className="inline-block px-3 py-1 rounded-lg bg-accent/15 text-accent font-bold text-sm">
                                {row.nextDayRate}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-3 font-exo text-charcoal/60 text-xs">
                          {row.deliveryNote}
                          {row.nextDayRate !== null && (
                            <span className="block text-accent/70">same / next day</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footnotes */}
              <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-charcoal/60 font-exo">
                  <Info size={14} className="text-accent flex-shrink-0 mt-0.5" aria-hidden />
                  <span>After 15 kg: <strong className="text-charcoal">+{EXTRA_KG_RATE} SAR</strong> per additional kg.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-charcoal/60 font-exo">
                  <Info size={14} className="text-primary flex-shrink-0 mt-0.5" aria-hidden />
                  <span>Valid for <strong className="text-charcoal">{MIN_MONTHLY_SHIPMENTS}+ monthly shipments.</strong> Rates excl. VAT. Timing may vary by location.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-charcoal/60 font-exo">
                  <Info size={14} className="text-charcoal/40 flex-shrink-0 mt-0.5" aria-hidden />
                  <span>Fragile items must be properly packed before dispatch.</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Calculator */}
          <RevealOnScroll delay={0.15}>
            <div className="relative rounded-3xl bg-white border border-gray-100 shadow-[0_4px_30px_rgb(0,0,0,0.04)] p-8 overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" aria-hidden />

              <h3 className="relative text-2xl font-premium text-charcoal mb-8 flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                  <Calculator className="w-6 h-6" aria-hidden />
                </div>
                Calculate Your Rate
              </h3>

              <div className="relative space-y-6">

                {/* Area selector */}
                <fieldset>
                  <legend className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3 font-exo">
                    Delivery Zone
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(["inside-riyadh", "outside-riyadh"] as ServiceArea[]).map((a) => (
                      <label
                        key={a}
                        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 cursor-pointer font-exo text-sm font-semibold transition-all duration-200 ${
                          area === a
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-charcoal/60 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          value={a}
                          checked={area === a}
                          onChange={() => { setArea(a); setResult(null); }}
                          className="sr-only"
                        />
                        {AREA_LABELS[a]}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Weight input */}
                <div>
                  <label htmlFor="calc-weight" className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-2 font-exo">
                    Weight (kg)
                  </label>
                  <input
                    id="calc-weight"
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={weight}
                    onChange={(e) => { setWeight(e.target.value); setResult(null); }}
                    placeholder="e.g. 3.5"
                    className="w-full rounded-2xl border-0 bg-gray-50 px-5 py-4 text-charcoal text-lg font-semibold shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-primary transition-all placeholder:text-gray-400 placeholder:font-normal placeholder:text-base"
                    aria-describedby="weight-hint"
                  />
                  <p id="weight-hint" className="mt-1.5 text-xs text-charcoal/40 font-exo">
                    For weight &gt;15 kg, +{EXTRA_KG_RATE} SAR per kg is added automatically.
                  </p>
                </div>

                {/* Speed selector — only for Inside Riyadh */}
                {area === "inside-riyadh" && (
                  <fieldset>
                    <legend className="block text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3 font-exo">
                      Delivery Speed
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {([
                        { value: "same-day" as DeliverySpeed, label: "Same Day" },
                        { value: "next-day" as DeliverySpeed, label: "Next Day" },
                      ]).map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border-2 cursor-pointer font-exo text-sm font-semibold transition-all duration-200 ${
                            speed === opt.value
                              ? "border-accent bg-accent/5 text-accent"
                              : "border-gray-200 text-charcoal/60 hover:border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="speed"
                            value={opt.value}
                            checked={speed === opt.value}
                            onChange={() => { setSpeed(opt.value); setResult(null); }}
                            className="sr-only"
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}

                {/* Calculate button */}
                <button
                  type="button"
                  onClick={handleCalculate}
                  disabled={!isValidWeight}
                  className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent px-6 py-4 font-bold text-white text-lg shadow-md hover:shadow-lg hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:opacity-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  aria-label="Calculate shipping rate"
                >
                  Calculate Rate
                </button>

                {/* Result */}
                {result !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl bg-gradient-to-br from-charcoal to-[#2a2a2a] p-6 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-white/60 text-sm font-exo uppercase tracking-wide mb-2">
                      Estimated Rate
                    </p>
                    <p className="text-5xl font-bold text-brand-grad tabular-nums">
                      {result}
                      <span className="text-2xl text-white/70 font-normal ml-2">SAR</span>
                    </p>
                    <p className="text-white/40 text-xs font-exo mt-2">
                      {AREA_LABELS[area]} · {weightNum} kg
                      {area === "inside-riyadh" ? ` · ${speed === "same-day" ? "Same Day" : "Next Day"}` : " · Within 2–3 Days"}
                      {" "}· Excl. VAT
                    </p>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="mt-5 group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] px-6 py-4 font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3"
                      aria-label="Confirm quote on WhatsApp"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-in-out" />
                      <Send className="w-5 h-5 relative z-10" strokeWidth={2.5} aria-hidden />
                      <span className="relative z-10">Confirm on WhatsApp</span>
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default RateQuote;
```

- [ ] **Step 8.2: Commit**

```bash
git add components/RateQuote.tsx
git commit -m "feat: RateQuote — pricing table + interactive calculator with WhatsApp CTA"
```

---

## Task 9: Update ContactSection

**Files:**
- Modify: `components/ContactSection.tsx`

Add a contact card above the maps/form, showing real phone numbers and email from `CONTACT`.

- [ ] **Step 9.1: Import CONTACT at top of ContactSection.tsx**

Add after the existing imports:

```tsx
import { CONTACT } from "@/lib/data/contact";
import { Phone, Mail } from "lucide-react";
```

- [ ] **Step 9.2: Add contact card block**

Inside the `<div className="mx-auto max-w-7xl">`, after the section heading/description and before the grid (`<div className="mt-14 grid...`), insert:

```tsx
{/* Contact card */}
<RevealOnScroll delay={0.05}>
  <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
    {/* Main phone */}
    <a
      href={`tel:${CONTACT.mainPhone}`}
      className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
      aria-label={`Call main number ${CONTACT.mainPhone}`}
    >
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
        <Phone size={20} aria-hidden />
      </div>
      <div>
        <p className="text-xs text-charcoal/50 font-exo uppercase tracking-wide">Main</p>
        <p className="font-premium font-semibold text-charcoal">{CONTACT.mainPhone}</p>
      </div>
    </a>

    {/* Sales phone */}
    <a
      href={`tel:${CONTACT.salesPhone}`}
      className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-accent/20 transition-all duration-300"
      aria-label={`Call sales ${CONTACT.salesPhone}`}
    >
      <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 flex-shrink-0">
        <Phone size={20} aria-hidden />
      </div>
      <div>
        <p className="text-xs text-charcoal/50 font-exo uppercase tracking-wide">{CONTACT.salesName}</p>
        <p className="font-premium font-semibold text-charcoal">{CONTACT.salesPhone}</p>
      </div>
    </a>

    {/* Email */}
    <a
      href={`mailto:${CONTACT.email}`}
      className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
      aria-label={`Email ${CONTACT.email}`}
    >
      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0">
        <Mail size={20} aria-hidden />
      </div>
      <div>
        <p className="text-xs text-charcoal/50 font-exo uppercase tracking-wide">Email</p>
        <p className="font-premium font-semibold text-charcoal text-sm">{CONTACT.email}</p>
      </div>
    </a>
  </div>
</RevealOnScroll>
```

Also update the existing WhatsApp CTA `wa.me` number to use `CONTACT.whatsapp` (replace hardcoded `966533989986` with `CONTACT.whatsapp`).

- [ ] **Step 9.3: Commit**

```bash
git add components/ContactSection.tsx
git commit -m "feat: ContactSection — add real contact card (phones + email from poster data)"
```

---

## Task 10: Update Footer

**Files:**
- Modify: `components/Footer.tsx`

Replace placeholder contact data with real data from `CONTACT`. Update the decorative glow to use accent instead of blue.

- [ ] **Step 10.1: Update FOOTER_LINKS.contact array**

Add import at top:
```tsx
import { CONTACT } from "@/lib/data/contact";
```

Replace the `contact` array in `FOOTER_LINKS`:
```tsx
contact: [
  { icon: MapPin,  text: "Tuwaiq & Laban Branches, Riyadh, KSA" },
  { icon: Phone,   text: CONTACT.mainPhone,  href: `tel:${CONTACT.mainPhone}` },
  { icon: Phone,   text: CONTACT.salesPhone, href: `tel:${CONTACT.salesPhone}` },
  { icon: Mail,    text: CONTACT.email,      href: `mailto:${CONTACT.email}` },
],
```

Update the contact list item rendering to handle optional `href`:
```tsx
{FOOTER_LINKS.contact.map((item, idx) => {
  const Icon = item.icon;
  const Tag = item.href ? "a" : "div";
  return (
    <li key={idx} className="flex gap-4 group">
      <Tag
        {...(item.href ? { href: item.href } : {})}
        className="flex gap-4 group hover:no-underline"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
          <Icon size={18} aria-hidden />
        </div>
        <span className="text-white/70 font-exo group-hover:text-white transition-colors duration-300 py-2">
          {item.text}
        </span>
      </Tag>
    </li>
  );
})}
```

Also replace the blue decorative circle:
```tsx
// Change from:
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 ...
// To:
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 ...
```

- [ ] **Step 10.2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: Footer — real contact data, orange accent replaces blue decorative element"
```

---

## Task 11: Update Navigation

**Files:**
- Modify: `components/Navigation.tsx`

Add "Rates" link and a "Get a Quote" secondary CTA alongside the existing "Track" button.

- [ ] **Step 11.1: Update NAV_LINKS array**

```tsx
const NAV_LINKS = [
  { href: "/",          label: "Home"     },
  { href: "/#services", label: "Services" },
  { href: "/#rates",    label: "Rates"    },
  { href: "/about",     label: "About"    },
  { href: "/#contact",  label: "Contact"  },
];
```

- [ ] **Step 11.2: Add "Get a Quote" link to desktop nav**

After the `Track` nav item `<li>`, add:
```tsx
<li>
  <Link
    href="/#rates"
    className={`ml-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
      useDarkNav
        ? "text-accent hover:text-[#e05e0f] hover:bg-accent/5"
        : "text-white/90 hover:text-white hover:bg-white/10"
    }`}
  >
    Get a Quote
  </Link>
</li>
```

In the mobile menu, add a "Get a Quote" link after the Track link:
```tsx
<li>
  <Link
    href="/#rates"
    onClick={handleCloseMobileMenu}
    className="block py-3 text-accent hover:text-[#e05e0f] font-semibold transition-colors font-exo"
  >
    Get a Quote
  </Link>
</li>
```

- [ ] **Step 11.3: Commit**

```bash
git add components/Navigation.tsx
git commit -m "feat: Navigation — add Rates nav link and Get a Quote CTA"
```

---

## Task 12: Wire Page Composition

**Files:**
- Modify: `app/page.tsx`

Remove the old `PartnerCarousel` (absorbed into `TrustBar`) and add the new components in the correct order.

- [ ] **Step 12.1: Replace `app/page.tsx`**

```tsx
"use client";

import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import WhyWhiteBox from "@/components/WhyWhiteBox";
import ServicesBento from "@/components/ServicesBento";
import AppFeatures from "@/components/AppFeatures";
import RateQuote from "@/components/RateQuote";
import LocationFocus from "@/components/LocationFocus";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <main id="main" role="main">
        <Hero />
        <TrustBar />
        <WhyWhiteBox />
        <ServicesBento />
        <AppFeatures />
        <RateQuote />
        <LocationFocus />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
```

- [ ] **Step 12.2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire new page composition — TrustBar, AppFeatures, RateQuote in correct order"
```

---

## Task 13: Install Dependencies & Build Verification

**Files:**
- No file changes (verification only)

- [ ] **Step 13.1: Install deps and run dev server**

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Verify:
- Hero video plays, logo floats, "Saudi Arabia" shows red→orange gradient
- Two CTAs visible: "Ship Now" and "Get a Quote"
- TrustBar shows 4 stat numbers + 6 partner logos scrolling
- WhyWhiteBox shows 6 cards with red/orange icon accents
- ServicesBento shows 8 service cards
- AppFeatures dark band with "One tap" headline, phone mockup, 3 feature rows
- RateQuote: rate table on left, calculator on right
  - Select Inside Riyadh, enter 3 kg, Same Day → click Calculate → shows 35 SAR
  - Select Inside Riyadh, enter 3 kg, Next Day → 30 SAR
  - Select Inside Riyadh, enter 20 kg, Same Day → 40 + (20-15)*4 = 60 SAR
  - Select Outside Riyadh, enter 3 kg → shows 45 SAR (no speed selector visible)
  - "Confirm on WhatsApp" opens WhatsApp with pre-filled message
- ContactSection shows 3-card row (main phone, sales phone, email) above maps
- Footer shows real contact data (0533989986, 0570204637, whiteboxaircargo@gmail.com)
- Navigation shows Rates link and Get a Quote

- [ ] **Step 13.2: Type check**

```bash
npm run build
```

Expected: Builds without TypeScript errors.

If there are type errors, fix the specific errors by reading the output. Common fixes:
- Missing `"use client"` on components using hooks → add directive
- `LucideIcon` type import from `"lucide-react"` → already imported in plan
- Unused import warnings → remove unused imports

- [ ] **Step 13.3: Mobile verification**

In browser DevTools, set viewport to 375px (iPhone). Verify:
- Hero text wraps cleanly, both CTAs stack vertically
- TrustBar shows 2-column stats grid, partner logos still scroll
- AppFeatures: phone mockup disappears on small screens (add `hidden lg:flex` to phone div if needed)
- RateQuote: stacks to single column, calculator shows below table
- ContactSection cards stack to single column

- [ ] **Step 13.4: Final commit**

```bash
git add -A
git commit -m "feat: WhiteBox premium redesign complete on redesign/fedex-premium

- Red+orange brand gradient system
- TrustBar with stats + partner logos
- 8 poster-sourced services
- AppFeatures dark band with phone mockup
- RateQuote table + interactive calculator
- Real contact data throughout
- Navigation updated with Rates + Get a Quote"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Red `#f72a42` kept primary — Task 1 adds orange only as accent
- [x] Hero video untouched — Task 4 only changes CSS text + adds a CTA
- [x] Logo untouched — `whiteboxlogo.svg` reference unchanged
- [x] "One tap" app feature band — Task 7 `AppFeatures`
- [x] Rate table + calculator — Task 8 `RateQuote` with `calculateRate()`
- [x] 8 poster services — Task 6 `ServicesBento` via `lib/data/services.ts`
- [x] Real contact data — Tasks 9, 10; `lib/data/contact.ts`
- [x] Trust bar — Task 3 `TrustBar`
- [x] Nav updates — Task 11
- [x] Footer — Task 10
- [x] All on `redesign/fedex-premium` branch — all commits go there

**Placeholder scan:** No TBDs, no "fill in later", all code blocks complete.

**Type consistency:**
- `ServiceArea`, `DeliverySpeed` defined in `lib/data/rates.ts` Task 2.2, imported correctly in `RateQuote.tsx` Task 8.
- `CONTACT` defined in `lib/data/contact.ts` Task 2.3, imported in Tasks 9, 10.
- `APP_FEATURES`, `HEADLINE_LINE1/2` defined in `lib/data/features.ts` Task 2.4, imported in Task 7.
- `SERVICES` defined in `lib/data/services.ts` Task 2.1, imported in Task 6.
- `LucideIcon` import pattern consistent across Tasks 6, 7.
- `calculateRate()` signature: `(area: ServiceArea, weight: number, speed: DeliverySpeed) => number | null` — matches usage in Task 8.

**WhyWhiteBox note:** Task 5 says "read first then modify" — the engineer must read the current `WhyWhiteBox.tsx` to find the exact array name. This is intentional; the file structure varies.
