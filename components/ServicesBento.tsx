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
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold font-exo tracking-wide uppercase mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-premium font-normal text-charcoal mb-6">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-charcoal/70 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed font-exo">
              Comprehensive shipping solutions — from ground freight across KSA to
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
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-sm transition-all duration-300">
                      <Icon
                        className="w-7 h-7 text-charcoal group-hover:text-primary transition-colors"
                        strokeWidth={1.5}
                        aria-hidden
                      />
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
              aria-label="Book a pickup"
            >
              <Package size={20} aria-hidden />
              Book a Pickup
              <ArrowRight size={18} aria-hidden />
            </Link>
            <Link
              href="/track"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-charcoal hover:border-primary hover:text-primary hover:shadow-lg transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Track shipment"
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
