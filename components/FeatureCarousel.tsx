"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
    title: string;
    description: string;
    iconSrc: string;
    /**
     * `"icon"` (default): transparent illustration, rendered floating with drop-shadow.
     * `"portrait"`: real photograph, rendered in a soft rounded frame and cropped to fill.
     */
    variant?: "icon" | "portrait";
}

const FeatureCarousel = ({ features }: { features: Feature[] }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % features.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [features.length]);

    return (
        <div className="w-full h-full relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <div className="w-full h-full bg-white rounded-[3rem] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-end relative overflow-hidden group text-center items-center">
                        {/* Premium Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50/50" />

                        {/* Massive Decorative Circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

                        {features[current].variant === "portrait" ? (
                            // Portrait layout: framed photo on top, caption stacked clearly below — no overlap.
                            <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6 sm:gap-7 w-full">
                                <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-[2rem] overflow-hidden ring-1 ring-charcoal/10 shadow-[0_30px_60px_-20px_rgba(20,14,14,0.28)] transition-transform duration-1000 group-hover:scale-[1.03]">
                                    <Image
                                        src={features[current].iconSrc}
                                        alt=""
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="max-w-md px-2">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl sm:text-4xl font-premium font-normal text-charcoal mb-3 tracking-tight"
                                    >
                                        {features[current].title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-charcoal/60 leading-relaxed text-base sm:text-lg font-exo font-light"
                                    >
                                        {features[current].description}
                                    </motion.p>
                                </div>
                            </div>
                        ) : (
                            // Icon layout: huge floating illustration with caption anchored at the bottom.
                            <>
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] pointer-events-none select-none drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105">
                                    <Image
                                        src={features[current].iconSrc}
                                        alt=""
                                        fill
                                        className="object-contain"
                                        unoptimized
                                    />
                                </div>

                                <div className="relative z-10 max-w-2xl mt-auto pt-[440px]">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl sm:text-5xl font-premium font-normal text-charcoal mb-4 tracking-tight"
                                    >
                                        {features[current].title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-charcoal/60 leading-relaxed text-lg sm:text-2xl font-exo font-light"
                                    >
                                        {features[current].description}
                                    </motion.p>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FeatureCarousel;
