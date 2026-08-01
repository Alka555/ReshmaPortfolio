"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * FadeIn — GPU-accelerated viewport-triggered entrance animation.
 * Uses opacity + translate (GPU-composited properties only).
 * Respects prefers-reduced-motion per ANIMATION_GUIDE.md.
 * Fires once per scroll session via whileInView + viewport.once.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.35,
  className = "",
  direction = "up",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const offsets = {
    up: { y: 16, x: 0 },
    down: { y: -16, x: 0 },
    left: { x: 16, y: 0 },
    right: { x: -16, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = offsets[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: shouldReduceMotion ? 0 : offset.x,
        y: shouldReduceMotion ? 0 : offset.y,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.19, 1, 0.22, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
