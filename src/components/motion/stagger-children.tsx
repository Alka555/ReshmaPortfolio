"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/**
 * StaggerChildren — wraps a container and staggers child entrance animations.
 * GPU-friendly: uses opacity + translateY (transform) only.
 * Respects prefers-reduced-motion per ANIMATION_GUIDE.md.
 */
export interface StaggerChildrenProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const reducedChildVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function StaggerChildren({
  children,
  staggerDelay = 0.08,
  className = "",
}: StaggerChildrenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={{
        ...containerVariants,
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
            delayChildren: 0.05,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {/* Wrap each direct child in a motion.div */}
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={shouldReduceMotion ? reducedChildVariants : childVariants}
            >
              {child}
            </motion.div>
          ))
        : (
          <motion.div
            variants={shouldReduceMotion ? reducedChildVariants : childVariants}
          >
            {children}
          </motion.div>
        )}
    </motion.div>
  );
}
