"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Optional vertical offset; defaults to the design-system 32px. */
  y?: number;
  /** Delay in seconds before the reveal begins. */
  delay?: number;
};

/**
 * Standard "Ivory Editorial" section reveal:
 *   opacity 0 → 1, y 32 → 0, 0.8s, ease [0.25,0.1,0.25,1], once, -80px margin.
 * Collapses to fade-only when the user prefers reduced motion.
 */
export default function Reveal({
  children,
  y = 32,
  delay = 0,
  ...rest
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
