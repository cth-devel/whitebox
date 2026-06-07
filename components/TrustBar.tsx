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
                className={`flex flex-col items-center text-center px-4 py-2 sm:px-6 ${
                  i > 0 ? "sm:border-l border-gray-100" : ""
                } ${i === 2 ? "border-l border-gray-100 sm:border-l" : ""}`}
              >
                <span
                  className="text-brand-grad num-tabular leading-[0.9] font-black"
                  style={{ fontSize: "clamp(2.75rem, 6.5vw, 5rem)", letterSpacing: "-0.045em" }}
                >
                  {stat.value}
                </span>
                <span className="mt-3 text-[0.65rem] text-charcoal/45 font-exo tracking-[0.16em] uppercase font-bold">
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

          <div className="relative w-full marquee-fade" role="list" aria-label="Partner brands">
            <div
              className="flex gap-16 items-center"
              style={{ animation: "scroll 26s linear infinite" }}
            >
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 grayscale hover:grayscale-0 opacity-55 hover:opacity-100 transition-all duration-500"
                  role="listitem"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={120}
                    height={44}
                    className="h-10 w-auto object-contain"
                    unoptimized
                  />
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
