"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  children: ReactNode;
  className?: string;
  /** Diameter of the glow in px. */
  size?: number;
  /** Centre colour of the radial glow. Defaults to a faint ink wash. */
  color?: string;
};

/**
 * Cursor-following radial glow, generalised from the original company-row
 * hover. Tracks the pointer via CSS custom properties (no per-frame React
 * renders) and fades in on hover. Reused on glass cards and the dark CTA.
 * Decorative — hidden for reduced-motion.
 */
export function Spotlight({ children, className, size = 480, color }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  const glow = color ?? "color-mix(in oklab, var(--color-ink) 6%, transparent)";

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group/spot relative isolate", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 motion-reduce:hidden"
        style={{
          background: `radial-gradient(${size}px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${glow}, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
