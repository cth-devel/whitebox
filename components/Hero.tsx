"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextRoll } from "./TextRoll";
import { ArrowRight } from "lucide-react";

/* ── Editorial Hero ─────────────────────────────────────────────────────
   Asymmetric 12-col composition. Video preserved.
   Left: oversized display headline with serif italic gradient pull.
   Right: editorial spec panel — index numeral, three pillar stats,
          live operations status, refined brand mark.
   Edges: vertical wordmark (right), date/route ticker (bottom hairline).
─────────────────────────────────────────────────────────────────────── */

const CITIES = ["RIYADH", "JEDDAH", "DAMMAM", "DHAHRAN", "MEDINA", "TABUK"];

const Hero = () => {
  const [now, setNow] = useState<Date | null>(null);
  const [cityIdx, setCityIdx] = useState(0);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    const c = setInterval(() => setCityIdx((i) => (i + 1) % CITIES.length), 2200);
    return () => {
      clearInterval(t);
      clearInterval(c);
    };
  }, []);

  const timeStr = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
    : "00:00:00";

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden pt-20 pb-14 px-4 sm:px-6 lg:px-10"
      aria-label="Hero"
    >
      {/* ── Video background — untouched ─────────────────────────────── */}
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

      {/* ── Editorial overlay stack ──────────────────────────────────── */}
      {/* Layer 1: deep neutral base for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/45 to-charcoal/85 pointer-events-none"
        aria-hidden
      />
      {/* Layer 2: heavy left-side wash (newsprint columnar weight) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-charcoal/65 via-transparent to-charcoal/35 pointer-events-none"
        aria-hidden
      />
      {/* Layer 3: bottom warm brand wash */}
      <div
        className="absolute -bottom-40 left-[-10%] right-[-10%] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(247,42,66,0.22)_0%,rgba(255,106,19,0.10)_35%,transparent_70%)] pointer-events-none"
        aria-hidden
      />
      {/* Layer 4: subtle radial vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(130%_75%_at_50%_25%,transparent_40%,rgba(0,0,0,0.55)_100%)] pointer-events-none"
        aria-hidden
      />

      {/* ── Corner viewfinder marks (editorial framing) ──────────────── */}
      <CornerMarks />

      {/* ── Vertical wordmark — right edge (desktop only) ─────────────── */}
      <div
        className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 z-10 select-none pointer-events-none"
        aria-hidden
      >
        <div
          className="text-white/35 text-[0.65rem] font-bold font-exo uppercase tracking-[0.5em] whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          WhiteBox Express · Saudi Arabia · Est 2014
        </div>
      </div>

      {/* ── Editorial issue mark — top-left ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto max-w-[88rem] w-full flex items-center justify-between mb-10 sm:mb-14 mt-2"
        aria-hidden
      >
        <div className="flex items-center gap-3 text-white/55 text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em]">
          <span className="block h-px w-8 bg-white/40" />
          <span>Vol. XI · No. 01</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-white/55 text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em]">
          <span>Riyadh · KSA</span>
          <span className="block h-px w-8 bg-white/40" />
        </div>
      </motion.div>

      {/* ── Main content grid ────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-[88rem] w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

        {/* ─ LEFT: Headline & CTAs (lg:col-span-8) ─────────────────── */}
        <div className="lg:col-span-8">
          {/* Eyebrow rule */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow-rule text-white/70 mb-7"
          >
            <span>The premium logistics network</span>
          </motion.div>

          {/* Massive editorial headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white leading-[0.9] drop-shadow-md"
            style={{ letterSpacing: "-0.045em" }}
          >
            <span
              className="block"
              style={{ fontSize: "clamp(3.5rem, 9.5vw, 9rem)" }}
            >
              Shipping,
            </span>
            <span
              className="block -mt-1"
              style={{ fontSize: "clamp(3.5rem, 9.5vw, 9rem)" }}
            >
              <TextRoll className="text-white inline-block">redefined.</TextRoll>
            </span>

            {/* Sub-line — smaller, with serif italic pull */}
            <span
              className="block mt-6 font-medium text-white/85"
              style={{ fontSize: "clamp(1.25rem, 2.6vw, 2rem)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              Built for the Kingdom &amp; routed{" "}
              <span className="serif-accent text-brand-grad">across the world.</span>
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-base sm:text-lg text-white/65 max-w-lg drop-shadow-sm font-exo leading-relaxed"
          >
            Same-day across Riyadh. Next-day across the Kingdom.
            Six carrier partners, one trusted operator.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#contact"
              className="track-button open-box-icon"
              style={{ "--main-size": "1.15em" } as React.CSSProperties}
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

            <Link
              href="#rates"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-semibold text-base text-white/95 border border-white/20 bg-white/[0.04] backdrop-blur-md hover:bg-white/[0.10] hover:border-white/45 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
              aria-label="Get a rate quote"
            >
              Get a Quote
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>

        {/* ─ RIGHT: Editorial spec panel (lg:col-span-4) ───────────── */}
        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 lg:justify-self-end w-full max-w-md"
          aria-label="Live operations summary"
        >
          <div className="relative grain rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-2xl p-7 sm:p-8 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
            {/* Corner accent ticks */}
            <span className="absolute top-3 left-3 w-3 h-3 border-l-2 border-t-2 border-primary/70" aria-hidden />
            <span className="absolute top-3 right-3 w-3 h-3 border-r-2 border-t-2 border-accent/70" aria-hidden />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-l-2 border-b-2 border-white/30" aria-hidden />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-r-2 border-b-2 border-white/30" aria-hidden />

            {/* Card header */}
            <div className="flex items-start justify-between mb-7">
              <div>
                <p className="text-[0.6rem] font-bold text-white/45 font-exo uppercase tracking-[0.24em] mb-2">
                  Operations
                </p>
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                    <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-white text-sm font-bold font-exo tracking-tight">
                    Live · {timeStr} <span className="text-white/45 font-normal">AST</span>
                  </span>
                </div>
              </div>
              {/* Oversized editorial index */}
              <div className="text-right leading-none">
                <p className="text-[0.55rem] font-bold text-white/40 font-exo uppercase tracking-[0.28em] mb-1">
                  Issue
                </p>
                <p
                  className="text-white font-black num-tabular leading-none"
                  style={{ fontSize: "2.75rem", letterSpacing: "-0.05em" }}
                >
                  01
                </p>
              </div>
            </div>

            {/* Routing strip — cycling city */}
            <div className="relative flex items-center gap-3 py-3 px-4 rounded-lg bg-white/[0.04] border border-white/8 mb-7 overflow-hidden">
              <span className="text-[0.6rem] font-bold text-white/45 font-exo uppercase tracking-[0.22em] shrink-0">
                Routing
              </span>
              <span className="block h-3 w-px bg-white/15 shrink-0" />
              <div className="relative flex-1 min-w-0">
                <motion.span
                  key={cityIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-white text-sm font-bold tracking-[0.18em] font-exo"
                >
                  → {CITIES[cityIdx]}
                </motion.span>
              </div>
              <ArrowRight size={12} className="text-white/40 shrink-0" aria-hidden />
            </div>

            {/* 3-up pillar stats — hairline divided */}
            <dl className="grid grid-cols-3 gap-0 divide-x divide-white/10">
              {[
                { kpi: "11", unit: "yrs", label: "Operating" },
                { kpi: "250k", unit: "+",  label: "Shipments" },
                { kpi: "6",   unit: "",   label: "Carriers" },
              ].map((s, i) => (
                <div key={i} className={`flex flex-col ${i === 0 ? "pr-3" : i === 2 ? "pl-3" : "px-3"}`}>
                  <dt className="text-[0.55rem] font-bold text-white/40 font-exo uppercase tracking-[0.22em] mb-2 order-2">
                    {s.label}
                  </dt>
                  <dd className="order-1 leading-none">
                    <span
                      className="text-brand-grad font-black num-tabular"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", letterSpacing: "-0.04em" }}
                    >
                      {s.kpi}
                    </span>
                    <span className="text-white/55 text-xs font-bold ml-0.5 align-baseline">
                      {s.unit}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* Bottom: refined brand mark */}
            <div className="mt-7 pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/media/whiteboxlogo.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain"
                  unoptimized
                  aria-hidden
                />
                <div className="leading-tight">
                  <p className="text-white text-xs font-bold tracking-tight">WhiteBox</p>
                  <p className="text-white/45 text-[0.6rem] font-exo uppercase tracking-[0.22em]">Express</p>
                </div>
              </div>
              <Link
                href="/track"
                className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60 hover:text-primary transition-colors flex items-center gap-1.5 font-exo"
              >
                Track
                <ArrowRight size={11} aria-hidden />
              </Link>
            </div>
          </div>
        </motion.aside>
      </div>

      {/* ── Bottom hairline ticker (Bloomberg-style live strip) ──────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-12 sm:mt-16 mx-auto max-w-[88rem] w-full"
        aria-hidden
      >
        <div className="border-t border-white/15 pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.6rem] font-bold font-exo uppercase tracking-[0.22em] text-white/50">
          <span className="flex items-center gap-2 text-white/70">
            <span className="block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Delivering · 1,284 shipments today
          </span>
          <span className="hidden sm:inline-block h-3 w-px bg-white/20" />
          <span className="hidden sm:inline">On-time rate · <span className="text-white num-tabular">99.2%</span></span>
          <span className="hidden md:inline-block h-3 w-px bg-white/20" />
          <span className="hidden md:inline">Avg pickup · <span className="text-white num-tabular">14 min</span></span>
          <span className="hidden lg:inline-block h-3 w-px bg-white/20" />
          <span className="hidden lg:inline ml-auto text-white/40">Scroll to explore ↓</span>
        </div>
      </motion.div>
    </section>
  );
};

/* ── Corner viewfinder marks for editorial framing ──────────────────── */
const CornerMarks = () => {
  const base = "absolute z-10 w-5 h-5 border-white/30";
  return (
    <>
      <span className={`${base} top-20 left-4 sm:top-24 sm:left-8 border-l border-t`} aria-hidden />
      <span className={`${base} top-20 right-4 sm:top-24 sm:right-8 border-r border-t`} aria-hidden />
      <span className={`${base} bottom-4 left-4 sm:bottom-8 sm:left-8 border-l border-b`} aria-hidden />
      <span className={`${base} bottom-4 right-4 sm:bottom-8 sm:right-8 border-r border-b`} aria-hidden />
    </>
  );
};

export default Hero;
