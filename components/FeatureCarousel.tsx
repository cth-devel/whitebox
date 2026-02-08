"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
    title: string;
    description: string;
    iconSrc: string;
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

                        {/* Feature Image - Centered & MASSIVE */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] pointer-events-none select-none drop-shadow-2xl transition-transform duration-1000 group-hover:scale-105">
                            <Image
                                src={features[current].iconSrc}
                                alt=""
                                fill
                                className="object-contain" // Full color
                                unoptimized
                            />
                        </div>

                        {/* Content Content - Pushed to bottom & Centered */}
                        <div className="relative z-10 max-w-2xl mt-auto pt-[440px]"> {/* pushed down by padding/margin to clear image */}


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
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FeatureCarousel;
