"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

/* ── LocationFocus ──────────────────────────────────────────────────────
   Editorial manifesto moment. Breaks the card rhythm of surrounding
   sections with a magazine-style pull-quote on a dark grain surface.
   Asymmetric: oversized serif quote on the left, route stack on the right.
─────────────────────────────────────────────────────────────────────── */

const ROUTES = [
  { code: "RUH", city: "Riyadh",  note: "HQ · Tuwaiq & Laban" },
  { code: "JED", city: "Jeddah",  note: "Red Sea gateway" },
  { code: "DMM", city: "Dammam",  note: "Eastern Province" },
  { code: "MED", city: "Medina",  note: "Northwest hub" },
  { code: "TUU", city: "Tabuk",   note: "NEOM corridor" },
  { code: "AHB", city: "Abha",    note: "Southern reach" },
];

const LocationFocus = () => {
  return (
    <section
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-charcoal overflow-hidden"
      aria-label="Location & coverage"
    >
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="absolute -top-32 -left-20 w-[560px] h-[560px] bg-primary/12 rounded-full blur-[140px] pointer-events-none" aria-hidden />
      <div className="absolute -bottom-40 -right-20 w-[640px] h-[640px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" aria-hidden />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* ── LEFT: Manifesto pull-quote ──────────────────────────── */}
            <div className="lg:col-span-7 relative">
              {/* Top eyebrow with hairlines */}
              <div className="flex items-center gap-3 mb-8">
                <span className="block h-px w-10 bg-white/40" />
                <span className="text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em] text-white/55">
                  A note from the Kingdom
                </span>
              </div>

              {/* Oversized opening serif quote mark */}
              <div
                className="absolute -top-2 -left-2 text-brand-grad serif-accent leading-none select-none pointer-events-none"
                style={{ fontSize: "clamp(7rem, 14vw, 12rem)", opacity: 0.18 }}
                aria-hidden
              >
                “
              </div>

              {/* The pull-quote itself */}
              <motion.blockquote
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <p
                  className="text-white font-black leading-[0.98] tracking-tight"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)", letterSpacing: "-0.035em" }}
                >
                  Headquartered in{" "}
                  <span className="serif-accent text-brand-grad">Riyadh.</span>
                  <br />
                  Wired into{" "}
                  <span className="serif-accent text-brand-grad">every</span>{" "}
                  city the Kingdom calls home —
                  and the world it ships to.
                </p>

                {/* Attribution line */}
                <footer className="mt-10 flex items-center gap-4 text-white/55 font-exo text-sm">
                  <span className="block h-px w-12 bg-white/30" />
                  <cite className="not-italic">
                    <span className="text-white/80 font-bold tracking-tight">WhiteBox Express</span>
                    <span className="mx-2 text-white/30">·</span>
                    <span className="uppercase tracking-[0.2em] text-[0.65rem] font-bold">Est 2014</span>
                  </cite>
                </footer>
              </motion.blockquote>
            </div>

            {/* ── RIGHT: Route stack ──────────────────────────────────── */}
            <div className="lg:col-span-5 lg:pt-2">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em] text-white/55">
                  Network · 6 cities
                </p>
                <p className="text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em] text-white/40">
                  + Global via partners
                </p>
              </div>

              <ul className="divide-y divide-white/8 border-y border-white/12">
                {ROUTES.map((r, i) => (
                  <motion.li
                    key={r.code}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center justify-between gap-4 py-4 px-1 hover:px-4 hover:bg-white/[0.03] transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-baseline gap-5 min-w-0">
                      <span className="text-white/30 text-[0.65rem] font-bold font-exo num-tabular tracking-[0.18em] shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-brand-grad font-black tracking-tight shrink-0"
                        style={{ fontSize: "1.5rem", letterSpacing: "-0.02em" }}
                      >
                        {r.code}
                      </span>
                      <div className="min-w-0">
                        <p className="text-white text-base font-bold tracking-tight">{r.city}</p>
                        <p className="text-white/45 text-xs font-exo">{r.note}</p>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-white/25 group-hover:text-primary group-hover:rotate-12 transition-all duration-300 shrink-0"
                      aria-hidden
                    />
                  </motion.li>
                ))}
              </ul>

              {/* Foot strip — Made in KSA mark */}
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white/45 text-[0.6rem] font-bold font-exo uppercase tracking-[0.22em]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-70" />
                    <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  All routes operational
                </div>
                <span className="px-3 py-1.5 rounded-full bg-primary/12 border border-primary/25 text-primary text-[0.6rem] font-bold uppercase tracking-[0.22em] font-exo">
                  Made in KSA
                </span>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default LocationFocus;
