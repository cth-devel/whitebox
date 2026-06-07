"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextRoll } from "./TextRoll";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8"
      aria-label="Hero"
    >
      {/* Video background — untouched */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        aria-hidden
      >
        <source src="/media/whitebox.webm" type="video/webm" />
      </video>

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70 pointer-events-none"
        aria-hidden
      />

      {/* Subtle orange glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] bg-accent/10 blur-[90px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
        <div className="flex-1">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white leading-[0.97] drop-shadow-md flex flex-wrap gap-x-[0.22em]"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)", letterSpacing: "-0.035em" }}
          >
            <TextRoll className="text-white">Shipping</TextRoll>
            <TextRoll className="text-white">Redefined</TextRoll>
            <TextRoll className="text-white">across</TextRoll>
            {/* Red-to-orange gradient accent on "Saudi Arabia" — plain spans so the
                background-clip gradient actually paints (TextRoll splits per-letter
                children that would inherit transparent fill with no background). */}
            <span className="text-brand-grad inline-block leading-none">Saudi</span>
            <span className="text-brand-grad inline-block leading-none">Arabia</span>
            <TextRoll className="text-white">&</TextRoll>
            <TextRoll className="text-white">The</TextRoll>
            <TextRoll className="text-white">World.</TextRoll>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-xl drop-shadow-sm font-exo"
          >
            Fast · Safe · Reliable — Your Trusted Logistics Partner in KSA
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {/* Primary CTA */}
            <Link
              href="#contact"
              className="track-button open-box-icon"
              style={{ "--main-size": "1.25em" } as React.CSSProperties}
              aria-label="Ship Now"
            >
              <span>Ship Now</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box">
                <path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8" />
                <path d="M12 12v10.08" />
                <g className="box-lid origin-center">
                  <path d="M3 8l9-5 9 5-9 5-9-5z" />
                </g>
              </svg>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#rates"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-base text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:border-white/60 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Get a rate quote"
            >
              Get a Quote
              <ArrowRight size={18} aria-hidden />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-1 flex justify-center items-center min-h-[280px] lg:min-h-[400px]"
          aria-hidden
        >
          <HeroLogo />
        </motion.div>
      </div>
    </section>
  );
};

const HeroLogo = () => {
  return (
    <motion.div
      className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center"
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src="/media/whiteboxlogo.svg"
        alt=""
        width={320}
        height={320}
        className="w-full h-full object-contain drop-shadow-2xl"
        unoptimized
        aria-hidden
      />
    </motion.div>
  );
};

export default Hero;
