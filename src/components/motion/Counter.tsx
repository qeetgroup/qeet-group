"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { DURATION, EASE_OUT } from "@/lib/motion";

type CounterProps = {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  /** Seconds for the count-up. */
  duration?: number;
};

/**
 * Counts up to `value` the first time it scrolls into view. Writes to the DOM
 * node directly (no per-frame React renders). SSR renders the final value, so
 * no-JS and reduced-motion users see the correct number immediately.
 */
export function Counter({
  value,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = DURATION.slow + 0.5,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = format(value);
      return;
    }
    el.textContent = format(0);
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = format(v);
      },
    });
    return () => controls.stop();
    // format is derived from the stable props below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value, duration, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
