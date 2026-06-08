"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextRoll } from "./TextRoll";
import { ArrowRight } from "lucide-react";

/* ── Editorial Hero ─────────────────────────────────────────────────────
   Video preserved. Original TextRoll headline + floating brand logo at
   center stage. Editorial frame layered around it:
   – section-edge viewfinder corner marks
   – vertical wordmark on right edge
   – bottom Bloomberg-style live ticker with KPIs / scroll hint
─────────────────────────────────────────────────────────────────────── */

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden pt-14 sm:pt-12 pb-14 px-4 sm:px-6 lg:px-10"
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
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/40 to-charcoal/80 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_30%,transparent_45%,rgba(0,0,0,0.50)_100%)] pointer-events-none"
        aria-hidden
      />
      {/* Asymmetric brand glows */}
      <div
        className="absolute -bottom-24 left-[8%] w-[640px] h-[260px] bg-primary/15 blur-[110px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 right-[6%] w-[520px] h-[220px] bg-accent/12 blur-[100px] pointer-events-none"
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

      {/* ── Main content grid — original headline + floating logo
           items-start (was items-center) pulls the headline up so more
           content sits inside the corner viewfinder frame. ─────────── */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex-1 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-16">
        <div className="flex-1">
          {/* Premium eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow-rule text-white/70 mb-3 sm:mb-4"
          >
            <span>Premium logistics · Saudi Arabia</span>
          </motion.div>

          {/* Original TextRoll headline — restored with serif-italic gradient
              on "Saudi Arabia" */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            /* leading-[1.08] gives Playfair italic descenders/ascenders the
               vertical room they need; gap-y-2 stops adjacent wrapped lines
               from colliding when italic glyphs overshoot their box. */
            className="font-black text-white drop-shadow-md flex flex-wrap gap-x-[0.22em] gap-y-2"
            style={{
              fontSize: "clamp(2.75rem, 7vw, 6rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
          >
            <TextRoll className="text-white">Shipping</TextRoll>
            <TextRoll className="text-white">Redefined</TextRoll>
            <TextRoll className="text-white">across</TextRoll>
            {/* Plain spans so background-clip gradient paints (TextRoll splits
                per-letter children with transparent fill that wouldn't show).
                Trailing margin gives italic right-bearing room so the closing
                "i" / "a" don't visually crash into the next word. */}
            <span className="text-brand-grad serif-accent inline-block leading-[1.08] pr-[0.08em]">Saudi</span>
            <span className="text-brand-grad serif-accent inline-block leading-[1.08] pr-[0.08em]">Arabia</span>
            <TextRoll className="text-white">&</TextRoll>
            <TextRoll className="text-white">The</TextRoll>
            <TextRoll className="text-white">World.</TextRoll>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-lg sm:text-xl text-white/85 max-w-xl drop-shadow-sm font-exo leading-relaxed"
          >
            Fast, safe, and meticulously handled — your trusted logistics partner across the Kingdom and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* Primary CTA */}
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

            {/* Secondary CTA — refined glass with hairline ring */}
            <Link
              href="#rates"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3 font-semibold text-base text-white/95 border border-white/25 bg-white/[0.06] backdrop-blur-md hover:bg-white/[0.12] hover:border-white/50 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              aria-label="Get a rate quote"
            >
              Get a Quote
              <ArrowRight size={17} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Trust micro-row beneath CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-5 text-xs text-white/55 font-exo"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="uppercase tracking-[0.18em] font-bold text-white/70">Live · 24/7</span>
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="uppercase tracking-[0.18em]">15+ years · 250k+ shipments</span>
          </motion.div>
        </div>

        {/* Floating brand logo — self-center so it sits mid-column even
            though the headline anchors at items-start on the parent grid. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 flex justify-center items-center min-h-[280px] lg:min-h-[400px] lg:self-center lg:mt-16"
          aria-hidden
        >
          <HeroLogo />
        </motion.div>
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
            Fast · Reliable · Secure
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

/* ── Floating brand logo — gentle hover loop ────────────────────────── */
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

/* ── Corner viewfinder marks for editorial framing ──────────────────── */
const CornerMarks = () => {
  const base = "absolute z-10 w-5 h-5 border-white/30";
  return (
    <>
      <span className={`${base} top-16 left-4 sm:top-20 sm:left-8 border-l border-t`} aria-hidden />
      <span className={`${base} top-16 right-4 sm:top-20 sm:right-8 border-r border-t`} aria-hidden />
      <span className={`${base} bottom-4 left-4 sm:bottom-8 sm:left-8 border-l border-b`} aria-hidden />
      <span className={`${base} bottom-4 right-4 sm:bottom-8 sm:right-8 border-r border-b`} aria-hidden />
    </>
  );
};

export default Hero;
