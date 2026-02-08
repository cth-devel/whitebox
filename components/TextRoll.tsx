"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

// Simple utility to merge class names if lib/utils is missing or lacks it
function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
}

const STAGGER = 0.035;

interface TextRollProps extends HTMLMotionProps<"span"> {
    children: string;
    className?: string;
    center?: boolean;
}

export const TextRoll = ({ children, className, center = false, ...props }: TextRollProps) => {
    return (
        <motion.span
            initial="initial"
            whileHover="hovered"
            className={cn("relative inline-block overflow-hidden", className)}
            style={{
                lineHeight: 1, // Adjusted line height for better fit
            }}
            {...props}
        >
            <div className="relative">
                {children.split("").map((l, i) => {
                    const delay = center
                        ? STAGGER * Math.abs(i - (children.length - 1) / 2)
                        : STAGGER * i;

                    return (
                        <motion.span
                            variants={{
                                initial: {
                                    y: 0,
                                },
                                hovered: {
                                    y: "-100%",
                                },
                            }}
                            transition={{
                                ease: "easeInOut",
                                delay,
                            }}
                            className="inline-block whitespace-pre"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    );
                })}
            </div>
            <div className="absolute inset-0">
                {children.split("").map((l, i) => {
                    const delay = center
                        ? STAGGER * Math.abs(i - (children.length - 1) / 2)
                        : STAGGER * i;

                    return (
                        <motion.span
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                hovered: {
                                    y: 0,
                                },
                            }}
                            transition={{
                                ease: "easeInOut",
                                delay,
                            }}
                            className="inline-block whitespace-pre"
                            key={i}
                        >
                            {l}
                        </motion.span>
                    );
                })}
            </div>
        </motion.span>
    );
};
