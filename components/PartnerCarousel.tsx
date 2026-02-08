"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const PARTNERS = [
  { name: "FedEx", src: "/media/partners/fedex.svg" },
  { name: "Aramex", src: "/media/partners/aramex.svg" },
  { name: "DHL", src: "/media/partners/dhl.svg" },
  { name: "Naqel", src: "/media/partners/naqel.svg" },
  { name: "SMSA", src: "/media/partners/smsa.svg" },
  { name: "J&T Express", src: "/media/partners/JT.svg" },
];

const SLOT_WIDTH_PX = 180;
const GAP_PX = 64; // 4rem
const COPY_WIDTH_PX = PARTNERS.length * SLOT_WIDTH_PX + PARTNERS.length * GAP_PX;

const PartnerCarousel = () => {
  return (
    <section
      id="partners"
      className="pt-6 sm:pt-8 pb-8 sm:pb-10 bg-white overflow-hidden"
      aria-label="Our partners"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold uppercase tracking-widest text-charcoal/35 mb-6 sm:mb-8"
        >
          Our Trusted Carriers
        </motion.p>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex flex-nowrap"
          style={{ width: COPY_WIDTH_PX * 2 }}
          animate={{ x: [0, -COPY_WIDTH_PX] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
        >
          {[1, 2].map((copy) => (
            <div
              key={copy}
              className="flex flex-shrink-0 flex-nowrap items-center"
              style={{ width: COPY_WIDTH_PX, gap: `${GAP_PX}px` }}
            >
              {PARTNERS.map((partner) => (
                <div
                  key={`${partner.name}-${copy}`}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: SLOT_WIDTH_PX }}
                >
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={160}
                    height={64}
                    className="max-h-14 sm:max-h-16 md:max-h-[4.5rem] w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-[filter]"
                    unoptimized
                  />
                </div>
              ))}
              {/* Trailing spacer so the gap after last logo equals gap between logos for seamless loop */}
              <div className="flex-shrink-0" style={{ width: 0, minWidth: 0 }} aria-hidden />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerCarousel;
