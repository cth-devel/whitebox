# WhiteBox Express — FedEx-Tier Premium Redesign

**Date:** 2026-06-06
**Branch:** `redesign/fedex-premium` (master untouched)
**Status:** Approved design → ready for implementation plan

## 1. Goal

Redesign the existing WhiteBox single-page site into a modern, premium, FedEx-tier
courier/logistics site that also works as an **advertising / lead-gen landing page**
for the Saudi market. Pull all services, pricing, and contact data from the client's
recent AI-generated posters and present them beautifully, **without recreating the
hero video or changing the logo**.

## 2. Hard constraints (do not break)

- **Hero video** (`public/media/whitebox.webm`) stays exactly as-is.
- **Logo** stays the current `public/media/whiteboxlogo.svg` (NOT the poster logo).
- **Red `#f72a42` remains the primary color.** We add orange as an accent — we do
  not rebrand to the poster's purple.
- English-only for now, but structure tokens/content so Arabic + RTL can be added
  later without a rewrite.
- No heavy new dependencies. Stay on Next.js 14 / Tailwind / Framer Motion / lucide.

## 3. Aesthetic direction

"FedEx-tier logistics, Saudi-proud." Clean, confident, high-trust.

### Palette (tokens)
- `--primary` red `#f72a42` (unchanged) — primary brand, key accents.
- `--accent` orange `#FF6A13` (NEW) — energy accent, CTA gradients, highlights.
- `--charcoal` `#1a1a1a` — text + dark "advertising" band backgrounds.
- White + soft grey `#d7d7d3` — light sections.
- Signature gradient: red→orange (`#f72a42` → `#FF6A13`) for hero accent words,
  badges, primary buttons.
- Dark bands use charcoal/near-black with a **subtle** red/orange glow ("balanced &
  premium" — not the poster's vivid purple neon). No purple anywhere.

### Typography
Keep the existing font system (PT Sans Narrow "premium", Exo, Playfair, Inter body).
Tighten the type scale for premium rhythm. No font swaps in this pass.

### Motion
Keep Framer Motion reveal-on-scroll. Add a few high-impact staggered page-load
moments. Respect `prefers-reduced-motion`. Durations 150–300ms for interactions.

## 4. Page structure (single page + retained sub-pages)

Order optimized for an advertising/lead-gen flow. **NEW** = added from posters.

1. **Hero** — unchanged video + floating logo. Retheme the "Saudi Arabia" accent
   words to a red→orange gradient. Add a second CTA "Get a Quote" beside "Ship Now".
2. **Trust bar + Partner carousel** — "15 years · Door-to-Door · Nationwide" strip
   above the existing infinite partner carousel (FedEx, Aramex, DHL, Naqel, SMSA, J&T).
   Restyle to red/orange.
3. **Why WhiteBox** — existing interactive cards, expanded with poster differentiators:
   Safe & Secure, Fast Delivery, 24/7 Support, Competitive Pricing, Nationwide Coverage.
4. **Services grid (8)** — Domestic Cargo; International Cargo (Sea & Air); Airport-to-
   Airport Worldwide; From other countries to KSA (all cities); Safe & Secure
   Transportation; On-Time Delivery; Door-to-Door Service; Dedicated Customer Support.
5. **NEW — "One tap, and we're on the way"** (poster #1): dark premium band, app-style
   feature trio: **Schedule Pickup · Redirect Your Package · Track Locations**.
6. **NEW — Rate Quotation** (table + calculator): polished pricing table AND an
   interactive calculator. See §5.
7. **Location focus** — "HQ in KSA, serving the world" — existing, restyled.
8. **Contact** — existing branches (Tuwaiq/Laban maps) + WhatsApp quote form, plus a
   NEW contact card with phone/email (see §6).
9. **Footer** — restyled; all contact + service links; "Made in KSA".

Retained sub-pages (`/about`, `/track`, `/courier-services-saudi-arabia-2026`) get the
new palette tokens applied but no structural redesign in this pass.

## 5. Rate Quotation section (NEW)

Domestic rates, SAR, **excl. VAT**. Data lives in a typed data file.

| Service area | Weight | Rate (SAR) | Note |
|---|---|---|---|
| Inside Riyadh | up to 5 kg | 35 | Same-day |
| Inside Riyadh | up to 5 kg | 30 | Next-day |
| Inside Riyadh | 5–15 kg | 40 | Same-day |
| Inside Riyadh | 5–15 kg | 35 | Next-day |
| Outside Riyadh | up to 5 kg | 45 | Within 2–3 days |
| Outside Riyadh | 5–15 kg | 50 | Within 2–3 days |

- After 15 kg: **+4 SAR per extra kg**.
- Rate quote valid for **monthly 300 shipments or above**.
- Terms shown: domestic within KSA only; excl. VAT; timing varies by location/conditions;
  fragile items must be properly packed.

**Calculator:** inputs = destination (Inside/Outside Riyadh), weight (kg), speed
(same/next-day where applicable). Output = computed SAR estimate using the table +
per-kg overage. CTA "Send on WhatsApp" prefills a message to `966533989986`
(reuse existing WhatsApp pattern). Pure client-side; no backend.

## 6. Contact data (from posters)

- Main phone: **0533989986**
- Sales (Asif Asharaf): **0570204637**
- Email: **whiteboxaircargo@gmail.com**
- WhatsApp: `966533989986` (existing)
- Branches: Tuwaiq, Laban (Riyadh) — existing map embeds retained.

## 7. Architecture / implementation approach

- **Tokens first:** add `accent` (orange) + gradient utilities to `tailwind.config.ts`
  and `globals.css`. Replace scattered hardcoded `#f72a42` usages with tokens where it
  helps consistency (do not change the red value).
- **Typed content modules** under `content/` (or `lib/data/`): `services.ts`,
  `rates.ts`, `contact.ts`, `features.ts`. Components render from these so the site is
  ad-editable and future-translatable.
- **New components:** `AppFeatures.tsx` (section 5), `RateQuote.tsx` + `RateCalculator`
  (section 6), `TrustBar.tsx` (section 2 strip), `ContactCard.tsx` (section 8 addition).
- **Restyle existing** components to the red/orange system; keep their structure and
  animations. Reuse `RevealOnScroll`.
- Accessibility: maintain 4.5:1 contrast on dark bands, visible focus rings, alt text,
  labeled inputs, `prefers-reduced-motion`. (Per ui-ux-pro-max / web-design-guidelines.)
- Verify locally with `npm run dev` + screenshots before completion.

## 8. Out of scope (YAGNI)

- Arabic translation / RTL (structure only, not implemented now).
- Backend, auth, real tracking integration, payments.
- Replacing the hero video or logo.
- Redesigning sub-pages beyond palette application.
- Purple/poster rebrand.

## 9. Success criteria

- Red stays primary; orange accent applied cohesively; no purple.
- All poster services, the rate table + working calculator, app-feature trio, and
  contact details are present and clearly presented.
- Hero video + logo unchanged; site builds (`npm run build`) and runs clean.
- Premium, FedEx-tier feel verified via local screenshots on desktop + mobile widths.
- All work isolated on `redesign/fedex-premium`; `master` untouched.
