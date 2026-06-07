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
      className="bg-white border-y border-gray-100 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Trust indicators"
    >
      <div className="mx-auto max-w-7xl">
        {/* Stats row — Exaggerated Minimalism: oversized numbers, tight tracking */}
        <RevealOnScroll>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 mb-12 divide-x divide-gray-100">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center px-4 py-4 sm:px-6"
              >
                <span
                  className="text-brand-grad num-tabular leading-none font-black"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", letterSpacing: "-0.04em" }}
                >
                  {stat.value}
                </span>
                <span className="mt-2 text-[0.65rem] text-charcoal/45 font-exo tracking-[0.1em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Partner logos — infinite scroll marquee */}
        <div className="relative flex overflow-x-hidden" role="list" aria-label="Partner brands">
          <div
            className="flex gap-12 items-center"
            style={{ animation: "scroll 22s linear infinite" }}
          >
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
                role="listitem"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={110}
                  height={44}
                  className="h-9 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
