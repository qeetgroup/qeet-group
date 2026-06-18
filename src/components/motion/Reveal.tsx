"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DURATION, EASE_OUT } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Line-mask reveal: the child slides up from behind a clipped edge on
 * scroll-into-view. Best for single-line display phrases (it clips overflow,
 * so multi-line content should be split into one `Reveal` per line).
 * Reduced-motion renders the text in place.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={cn("inline-block", className)}>{children}</span>;
  }

  return (
    <span className={cn("inline-block overflow-hidden pb-[0.12em] align-bottom", className)}>
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "115%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  );
}
