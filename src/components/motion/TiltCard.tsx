"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SPRING } from "@/lib/motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
};

/**
 * 3D pointer tilt. The card rotates toward the cursor (mouse only) and springs
 * flat on leave. Reduced-motion and touch users get a static, untransformed
 * card. Children should sit on a `preserve-3d` surface for the depth to read.
 */
export function TiltCard({ children, className, max = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), SPRING.soft);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), SPRING.soft);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}
