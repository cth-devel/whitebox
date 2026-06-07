"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck, Globe, Plane, PackageOpen, ShieldCheck,
  Clock, Home, Headphones, Package, MapPin, ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
            <div className="eyebrow-rule text-primary mb-7">
              <span>What we offer</span>
            </div>
            <h2 className="text-display-section font-black text-charcoal mb-6 tracking-tight">
              A complete <span className="serif-accent text-brand-grad">logistics</span> service
            </h2>
            <p className="text-charcoal/65 max-w-2xl mx-auto text-lg leading-relaxed font-exo">
              From ground freight across the Kingdom to airport-to-airport worldwide —
              every shipment handled with precision and care.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] ?? Package;
            return (
              <RevealOnScroll key={service.id} delay={idx * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  className="group h-full bg-white rounded-[1.75rem] p-7 sm:p-8 border border-gray-100/80 shadow-editorial hover:shadow-editorial-lg hover:border-primary/15 transition-all duration-500 relative overflow-hidden flex flex-col"
                >
                  {/* Hover wash — kept subtle */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.6] transition-opacity duration-700`} />

                  {/* Top hairline highlight on hover */}
                  <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />

                  {/* Editorial index numeral */}
                  <span className="absolute top-5 right-6 text-[0.65rem] font-bold text-charcoal/25 font-exo tracking-[0.2em] num-tabular">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/60 flex items-center justify-center mb-6 ring-1 ring-inset ring-gray-200/60 group-hover:from-white group-hover:to-white group-hover:ring-primary/20 group-hover:shadow-[0_8px_20px_-6px_rgba(247,42,66,0.25)] transition-all duration-500">
                      <Icon
                        className="w-6 h-6 text-charcoal/85 group-hover:text-primary transition-colors duration-500"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </div>
                    <h3 className="text-lg font-bold font-premium text-charcoal mb-2.5 group-hover:text-primary transition-colors duration-500 tracking-tight leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed font-exo flex-1">
                      {service.desc}
                    </p>

                    {/* Subtle directional arrow on hover */}
                    <div className="mt-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-charcoal/30 group-hover:text-primary transition-colors duration-500 font-exo">
                      <span>Learn more</span>
                      <ArrowRight size={12} className="transition-transform duration-500 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* CTA row — refined pill buttons */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-brand-grad px-8 py-4 text-base font-bold text-white shadow-[0_8px_24px_-6px_rgba(247,42,66,0.45)] hover:shadow-[0_12px_32px_-6px_rgba(247,42,66,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Book a pickup"
            >
              <Package size={18} aria-hidden />
              Book a Pickup
              <ArrowRight size={16} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/track"
              className="group inline-flex items-center gap-2.5 rounded-full border border-charcoal/15 bg-white px-8 py-4 text-base font-bold text-charcoal hover:border-charcoal hover:shadow-editorial transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Track shipment"
            >
              <MapPin size={18} aria-hidden />
              Track Shipment
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default ServicesBento;
