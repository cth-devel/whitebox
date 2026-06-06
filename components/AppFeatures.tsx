"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Navigation, MapPin } from "lucide-react";
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
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                <span className="block text-brand-grad">{HEADLINE_LINE1}</span>
                <span className="block text-white/90 text-3xl sm:text-4xl lg:text-5xl font-normal mt-2">
                  {HEADLINE_LINE2}
                </span>
              </h2>
              <p className="mt-6 text-white/50 font-exo text-lg max-w-sm">
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

          {/* Right: stylised phone mockup (hidden on small screens) */}
          <div className="hidden lg:flex flex-1 justify-end" aria-hidden>
            <RevealOnScroll delay={0.2}>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Phone frame */}
                <div className="relative w-64 h-[520px] bg-[#0a0a0a] rounded-[3rem] border-[7px] border-white/15 shadow-[0_0_60px_rgba(247,42,66,0.18),0_40px_80px_rgba(0,0,0,0.55)] overflow-hidden">

                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0a0a0a] rounded-full z-10 border border-white/10" />

                  {/* Status bar */}
                  <div className="flex justify-between items-center px-5 pt-3 pb-2">
                    <span className="text-[10px] text-white/60 font-exo">12:24</span>
                    <span className="text-[9px] text-white/40 font-exo">whiteboxexpress.com</span>
                  </div>

                  {/* App header bar */}
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
