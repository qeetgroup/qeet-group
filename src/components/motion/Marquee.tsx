"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
};

/**
 * Infinite horizontal marquee. Renders the track twice for a seamless loop
 * (driven by the `marquee` keyframe in globals.css), pauses on hover, and
 * collapses to a static wrapped row for reduced-motion users. The duplicate
 * track is aria-hidden so assistive tech reads the content once.
 */
export function Marquee({ children, className, speed = 36, reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={cn("flex flex-wrap items-center gap-x-12 gap-y-6", className)}>
        {children}
      </div>
    );
  }

  const trackStyle = {
    animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
  };

  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        className="flex min-w-full shrink-0 items-center justify-around gap-12 pr-12 will-change-transform group-hover/marquee:[animation-play-state:paused]"
        style={trackStyle}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex min-w-full shrink-0 items-center justify-around gap-12 pr-12 will-change-transform group-hover/marquee:[animation-play-state:paused]"
        style={trackStyle}
      >
        {children}
      </div>
    </div>
  );
}
