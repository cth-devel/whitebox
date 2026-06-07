"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, Navigation, MapPin, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import { APP_FEATURES, HEADLINE_LINE1, HEADLINE_LINE2 } from "@/lib/data/features";

const ICON_MAP: Record<string, LucideIcon> = {
  CalendarCheck,
  Navigation,
  MapPin,
};

const AppFeatures = () => {
  return (
    <section
      id="app-features"
      className="relative bg-charcoal py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="App features"
    >
      {/* Atmospheric glows */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-accent/8 rounded-full blur-[100px] pointer-events-none"
        aria-hidden
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-20">

          {/* Left: headline + feature cards */}
          <div className="flex-1 max-w-xl">
            <RevealOnScroll>
              <h2 className="leading-none">
                <span
                  className="block text-brand-grad font-black"
                  style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", letterSpacing: "-0.045em" }}
                >
                  {HEADLINE_LINE1}
                </span>
                <span
                  className="block text-white/85 font-semibold mt-2"
                  style={{ fontSize: "clamp(1.6rem, 4vw, 3.25rem)", letterSpacing: "-0.025em" }}
                >
                  {HEADLINE_LINE2}
                </span>
              </h2>
              <div className="label-eyebrow bg-white/10 text-white/60 mb-6 mt-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                Logistics Management
              </div>
              <p className="text-white/50 font-exo text-lg max-w-sm">
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
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-primary/30 transition-colors duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-grad flex items-center justify-center flex-shrink-0 shadow-glow group-hover:scale-105 transition-transform duration-300">
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

          {/* Right: editorial delivery photo (hidden on small screens) */}
          <div className="hidden lg:flex flex-1 justify-end" aria-hidden>
            <RevealOnScroll delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[540px]"
              >
                {/* Brand-gradient outer glow */}
                <div
                  className="absolute -inset-6 -z-10 bg-brand-grad opacity-[0.18] blur-[90px] rounded-[3rem]"
                  aria-hidden
                />

                {/* Decorative corner ticks */}
                <span className="absolute -top-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-primary/60 rounded-tl-md z-20" aria-hidden />
                <span className="absolute -bottom-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-accent/70 rounded-br-md z-20" aria-hidden />

                {/* Hero image frame */}
                <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),0_0_50px_-10px_rgba(247,42,66,0.25)]">
                  <Image
                    src="/media/secure-handling-original.png"
                    alt="WhiteBox couriers loading a branded delivery van"
                    fill
                    sizes="(min-width: 1024px) 540px, 100vw"
                    className="object-cover"
                    priority={false}
                  />

                  {/* Cinematic gradient overlays */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/10 mix-blend-overlay"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-[1.75rem]"
                    aria-hidden
                  />

                  {/* Top-left: Live tracking chip */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    className="absolute top-5 left-5 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-charcoal/70 border border-white/12 backdrop-blur-md shadow-lg"
                  >
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-70" />
                      <span className="relative rounded-full w-2 h-2 bg-primary" />
                    </span>
                    <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.14em] font-exo">
                      Live tracking
                    </span>
                  </motion.div>

                  {/* Top-right: ETA badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75, duration: 0.6, ease: "easeOut" }}
                    className="absolute top-5 right-5 px-3 py-2 rounded-xl bg-charcoal/70 border border-white/12 backdrop-blur-md shadow-lg text-right"
                  >
                    <div className="text-white/45 text-[8px] font-bold uppercase tracking-[0.18em] font-exo">
                      ETA
                    </div>
                    <div className="text-white text-sm font-premium font-semibold leading-tight">
                      14 min
                    </div>
                  </motion.div>

                  {/* Bottom: stats bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
                    className="absolute bottom-5 left-5 right-5 flex items-stretch gap-3"
                  >
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-charcoal/75 border border-white/10 backdrop-blur-md shadow-lg">
                      <div className="w-9 h-9 rounded-lg bg-brand-grad flex items-center justify-center shadow-glow flex-shrink-0">
                        <ShieldCheck className="w-4.5 h-4.5 text-white" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-white/50 text-[9px] font-bold uppercase tracking-[0.14em] font-exo">
                          On-time rate
                        </div>
                        <div className="text-white text-base font-premium font-semibold leading-tight">
                          99.2%
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center px-4 py-3 rounded-xl bg-charcoal/75 border border-white/10 backdrop-blur-md shadow-lg">
                      <div className="text-white/50 text-[9px] font-bold uppercase tracking-[0.14em] font-exo">
                        Today
                      </div>
                      <div className="text-white text-base font-premium font-semibold leading-tight">
                        1,284 <span className="text-white/40 text-xs font-normal">delivered</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Floating route caption below frame */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.05, duration: 0.6 }}
                  className="mt-5 flex items-center gap-3 text-white/40 font-exo text-xs"
                >
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <span className="uppercase tracking-[0.22em]">Fleet · in motion</span>
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                </motion.div>
              </motion.div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
