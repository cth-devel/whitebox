"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import RevealOnScroll from "./RevealOnScroll";

const STATS = [
  { value: "15+",  label: "Years Experience"   },
  { value: "300+", label: "Shipments / Month"   },
  { value: "6",    label: "Carrier Partners"    },
  { value: "24/7", label: "Customer Support"    },
];

const PARTNERS = [
  { src: "/media/partners/fedex.svg",  alt: "FedEx"       },
  { src: "/media/partners/aramex.svg", alt: "Aramex"      },
  { src: "/media/partners/dhl.svg",    alt: "DHL"         },
  { src: "/media/partners/naqel.svg",  alt: "Naqel"       },
  { src: "/media/partners/smsa.svg",   alt: "SMSA"        },
  { src: "/media/partners/JT.svg",     alt: "J&T Express" },
];

const TrustBar = () => {
  return (
    <section
      className="bg-white border-y border-gray-100 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial section opener — left-aligned, magazine masthead style */}
        <RevealOnScroll>
          <div className="flex items-end justify-between mb-10 sm:mb-12 pb-5 border-b border-charcoal/10">
            <div>
              <p className="text-[0.6rem] font-bold font-exo uppercase tracking-[0.28em] text-charcoal/40 mb-2">
                The numbers
              </p>
              <h2 className="text-charcoal font-black tracking-tight" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", letterSpacing: "-0.025em" }}>
                A decade of <span className="serif-accent text-brand-grad inline-block leading-[1.18] pt-[0.06em] pb-[0.04em] px-[0.04em] -mx-[0.04em] align-baseline">trusted</span> shipments.
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-3 text-charcoal/40 text-[0.6rem] font-bold font-exo uppercase tracking-[0.22em]">
              <span className="num-tabular">2014 — Present</span>
              <span className="block h-px w-8 bg-charcoal/20" />
            </div>
          </div>
        </RevealOnScroll>

        {/* Stats row — editorial: oversized tabular numerals with hairline dividers */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-14 sm:mb-16">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col items-start text-left px-4 py-2 sm:px-7 ${
                  i > 0 ? "sm:border-l border-charcoal/8" : ""
                } ${i === 2 ? "border-l border-charcoal/8 sm:border-l" : ""}`}
              >
                {/* Tiny index */}
                <span className="absolute top-0 right-3 text-[0.55rem] font-bold text-charcoal/25 font-exo tracking-[0.2em] num-tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-brand-grad num-tabular font-black inline-block"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)", letterSpacing: "-0.045em", lineHeight: 1.15, paddingTop: "0.1em", paddingBottom: "0.06em" }}
                >
                  {stat.value}
                </span>
                <span className="mt-3 text-[0.65rem] text-charcoal/50 font-exo tracking-[0.16em] uppercase font-bold">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Partner reel — premium centered eyebrow + faded marquee edges */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3 text-charcoal/40">
            <span className="h-px w-12 bg-charcoal/15" />
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] font-exo">
              Trusted carrier partners
            </span>
            <span className="h-px w-12 bg-charcoal/15" />
          </div>

          <div className="relative w-full marquee-fade overflow-hidden" role="list" aria-label="Partner brands">
            <div
              className="flex w-max items-center"
              style={{ animation: "scroll 32s linear infinite" }}
            >
              {[0, 1].map((groupIdx) => (
                <div
                  key={groupIdx}
                  className="flex gap-24 items-center pr-24 shrink-0"
                  aria-hidden={groupIdx === 1 ? true : undefined}
                >
                  {PARTNERS.map((p, i) => (
                    <div
                      key={`${groupIdx}-${i}`}
                      className="flex-shrink-0 grayscale hover:grayscale-0 opacity-55 hover:opacity-100 transition-all duration-500"
                      role="listitem"
                    >
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={150}
                        height={56}
                        className="h-12 sm:h-14 w-auto object-contain"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
