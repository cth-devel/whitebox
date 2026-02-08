"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

const RevealOnScroll = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const directions = {
    up: { y: 48, x: 0 },
    down: { y: -48, x: 0 },
    left: { x: 48, y: 0 },
    right: { x: -48, y: 0 },
  };

  const d = directions[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: d.x, y: d.y }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: d.x, y: d.y }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
