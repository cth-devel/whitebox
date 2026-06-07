"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2, ArrowRight,
  Zap, ShieldCheck, BadgeDollarSign, MapPin, Headphones, Home,
} from "lucide-react";
import { animate, useInView, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SplitText from "./SplitText";
import WorldGlobe from "./WorldGlobe";
import { Testimonials } from "@/components/ui/unique-testimonial";
import FeatureCarousel from "./FeatureCarousel";

function Counter({ from, to }: { from: number; to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const element = ref.current;
    if (!element || !isInView) return;

    element.textContent = String(from);

    const controls = animate(from, to, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent = Math.round(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to, isInView]);

  return <span ref={ref} />;
}

const FEATURES = [
  {
    title: "Direct Home Delivery",
    description: "Seamless doorstep delivery with zero detours.",
    iconSrc: "/media/home-delivery-original..png", // Note: double dot from upload
  },
  {
    title: "Rapid Transit",
    description: "Nationwide in 48 hours. Global urgency prioritized.",
    iconSrc: "/media/fast-delivery-original.png",
  },
  {
    title: "Unbeatable Value",
    description: "Premium service at market-leading rates.",
    iconSrc: "/media/cost-effective-original.png",
  },
  {
    title: "Secure Handling",
    description: "Expert packaging ensures your items arrive pristine.",
    iconSrc: "/media/secure-handling-original.png",
  },
];

const WHY_ITEMS = [
  { title: "Fast & Reliable",       desc: "Same-day and next-day delivery — right on time, every time.",           Icon: Zap,              accent: "primary" },
  { title: "Safe & Secure",         desc: "We protect what matters — insured and handled with care.",               Icon: ShieldCheck,       accent: "primary" },
  { title: "Competitive Pricing",   desc: "Transparent SAR rates with no hidden fees. 300+ monthly shipments.",     Icon: BadgeDollarSign,   accent: "accent"  },
  { title: "Nationwide Coverage",   desc: "All KSA cities served — from Riyadh to Jeddah, same trusted service.",  Icon: MapPin,            accent: "accent"  },
  { title: "24/7 Support",          desc: "Dedicated team always here — call, WhatsApp, or email anytime.",         Icon: Headphones,        accent: "primary" },
  { title: "Door-to-Door",          desc: "Airport pickup, home delivery — door to door across Saudi Arabia.",      Icon: Home,              accent: "accent"  },
] as const;

const COMPARISON_ROWS = [
  { feature: "Delivery Time", whitebox: "2 days domestic", competitors: "3-5 days" },
  { feature: "Cost", whitebox: "Low rates + partner discounts", competitors: "Higher direct pricing" },
  { feature: "Coverage", whitebox: "Tuwaiq, Laban + nationwide", competitors: "Limited branches" },
  { feature: "Partners", whitebox: "FedEx, DHL, Aramex, more", competitors: "Single provider often" },
];

const WhyWhiteBox = () => {
  return (
    <section
      id="about"
      className="relative pt-4 pb-24 sm:pt-8 sm:pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      aria-label="Why WhiteBox"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-200/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl z-10">
        <RevealOnScroll>
          <div className="w-full flex flex-col items-center mb-10 text-center">

            {/* Editorial eyebrow with hairline rule */}
            <div className="eyebrow-rule text-primary mb-7">
              <span>Why WhiteBox</span>
            </div>

            <SplitText
              text="Experience the WhiteBox Difference"
              tag="h2"
              className="text-display-section font-black text-charcoal mb-5 max-w-4xl"
              splitType="chars"
              delay={30}
              duration={1}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              textAlign="center"
              threshold={0.15}
              rootMargin="-80px"
            />
            <p className="text-charcoal/65 max-w-2xl mx-auto text-lg leading-relaxed mb-8 font-exo">
              In a crowded logistics market, WhiteBox stands apart. We connect your business to the world with{" "}
              <span className="serif-accent text-charcoal">speed, precision, and unmatched value</span>.
            </p>

            {/* Social Proof - replaced with Testimonials */}
            <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 scale-90 sm:scale-100 origin-top">
              <Testimonials />
            </div>
          </div>
        </RevealOnScroll>

        {/* Differentiator cards — editorial 6-grid with material depth */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-20">
          {WHY_ITEMS.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className="relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-white border border-gray-100/80 shadow-[0_1px_2px_rgba(20,14,14,0.03),0_4px_16px_-4px_rgba(20,14,14,0.05)] hover:shadow-[0_2px_4px_rgba(20,14,14,0.04),0_12px_28px_-8px_rgba(247,42,66,0.12)] hover:border-primary/15 transition-all duration-500 group overflow-hidden h-full"
              >
                {/* Subtle top edge highlight */}
                <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                  item.accent === "accent"
                    ? "bg-accent/8 text-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(255,106,19,0.45)]"
                    : "bg-primary/8 text-primary group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_8px_20px_-6px_rgba(247,42,66,0.45)]"
                }`}>
                  <item.Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="text-sm font-bold font-premium text-charcoal mb-1.5 leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[0.72rem] text-charcoal/55 font-exo leading-relaxed hidden sm:block">
                  {item.desc}
                </p>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Main Content Layout: Cards (Left) + Globe (Right) */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">

          {/* Left Column: Feature Carousel (One by One) */}
          <div className="relative h-[600px] flex items-center justify-center">
            <FeatureCarousel features={FEATURES} />
          </div>

          {/* Right Column: World Globe */}
          <RevealOnScroll delay={0.2}>
            <div className="relative w-full flex flex-col items-center lg:items-end">
              {/* Visual Container for Globe matching card aesthetics */}
              <div className="relative w-full max-w-[500px] aspect-square bg-white rounded-full shadow-[0_0_80px_rgba(0,0,0,0.03)] border border-gray-100/50 p-4 flex items-center justify-center overflow-visible">
                {/* Decorative orbital ring */}
                <div className="absolute inset-4 rounded-full border border-dashed border-gray-200/50 animate-[spin_60s_linear_infinite]" />

                {/* Globe Component */}
                <WorldGlobe className="w-full h-full" />

                {/* Status badge floating on globe */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2 z-20 whitespace-nowrap">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-charcoal">Across the Globe Service</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>

        {/* Comparison Section — editorial premium panel */}
        <RevealOnScroll delay={0.2}>
          <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-editorial-lg ring-1 ring-black/5">
            <div className="grid lg:grid-cols-12 bg-white">
              {/* Dark editorial side panel */}
              <div className="lg:col-span-4 grain bg-[#111] p-8 sm:p-12 flex flex-col justify-center text-white relative overflow-hidden">
                {/* Layered dark gradient base */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1518] via-charcoal to-[#0a0808] z-0" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-[110px] translate-y-1/3 -translate-x-1/3" />

                {/* Refined dot grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                />

                <div className="relative z-10">
                  <div className="eyebrow-rule text-white/55 mb-5">
                    <span>The Comparison</span>
                  </div>
                  <h3 className="text-3xl sm:text-[2.5rem] font-black leading-[1.05] mb-5 text-white tracking-tight">
                    How we <span className="serif-accent text-brand-grad">compare</span>
                  </h3>
                  <p className="text-white/55 mb-10 leading-relaxed font-exo text-base max-w-sm">
                    Thousands choose WhiteBox over single-provider services. Here's why.
                  </p>

                  <div className="space-y-4">
                    {["Better coverage", "Faster delivery", "Transparent pricing"].map((label) => (
                      <div key={label} className="flex items-center gap-3 text-white/90">
                        <div className="p-1.5 rounded-full bg-primary/20 text-primary ring-1 ring-primary/30">
                          <CheckCircle2 className="w-4 h-4" strokeWidth={2.25} />
                        </div>
                        <span className="font-semibold tracking-tight font-premium">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col">
                      <span
                        className="text-brand-grad font-black mb-2 tabular-nums num-tabular leading-none"
                        style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "-0.04em" }}
                      >
                        <Counter from={0} to={250000} />+
                      </span>
                      <span className="text-white/55 text-sm font-exo uppercase tracking-[0.2em] font-bold">Happy customers</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Table */}
              <div className="lg:col-span-8 p-6 sm:p-10 overflow-x-auto bg-white/50 backdrop-blur-sm">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest text-charcoal/30 font-sans">Feature</th>
                      <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest text-primary bg-primary/[0.03] rounded-t-xl border-b-2 border-primary/20">
                        WhiteBox Advantage
                      </th>
                      <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest text-charcoal/30 font-sans">Competitors</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr key={idx} className="group hover:bg-gray-50/50 transition-colors duration-300">
                        <td className="py-6 px-6 font-semibold text-charcoal text-sm">{row.feature}</td>
                        <td className="py-6 px-6 bg-primary/[0.02] group-hover:bg-primary/[0.04] transition-colors relative">
                          {/* Accent highlight bar */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                          <span className="inline-flex items-center gap-3 font-semibold text-charcoal">
                            <div className="shrink-0 p-1 rounded-full bg-green-500/10 text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            {row.whitebox}
                          </span>
                        </td>
                        <td className="py-6 px-6 text-charcoal/40 text-sm font-medium">{row.competitors}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>


                <div className="mt-8 flex justify-end">
                  <Link href="#contact" className="track-button w-fit text-lg">
                    <span>Get Instant Quote</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>


      </div >
    </section >
  );
};

export default WhyWhiteBox;
