"use client";

import { motion } from "framer-motion";
import { MapPin, Globe } from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";

const LocationFocus = () => {
  return (
    <section
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white"
      aria-label="Location"
    >
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-charcoal to-charcoal/95 p-12 sm:p-16 lg:p-20 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(247,42,66,0.08)_0%,transparent_50%)]" aria-hidden />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f72a42]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#f72a42] flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" aria-hidden />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    Headquartered in Saudi Arabia,
                  </h2>
                  <p className="text-white/80 text-lg sm:text-xl mt-1 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#f72a42]" />
                    Serving the World.
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 px-6 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20">
                <span className="text-sm font-semibold uppercase tracking-wider text-white/90">
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
