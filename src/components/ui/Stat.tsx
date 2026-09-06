import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A single figure with its label and supporting context.
 *
 * Numbers use the display face with tabular figures so a row of stats stays
 * optically aligned and does not jitter if a value animates. The accent rule
 * between figure and label is the group's signature detail.
 *
 * Only real, checkable figures belong here. No product publishes measured
 * p95/p99, there are no customers to count, and a PRD target is not a result —
 * so a stat that cannot be sourced should be cut rather than estimated.
 */
type StatProps = {
  /** The figure. Pass a node to animate it (see motion/Counter). */
  value: ReactNode;
  label: string;
  context?: string;
  className?: string;
};

export function Stat({ value, label, context, className }: StatProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="font-display tabular-figures leading-none text-ink text-display-m">
        {value}
      </div>
      <div aria-hidden="true" className="mt-5 h-px w-9 bg-accent" />
      <p className="mt-5 font-sans text-body font-medium text-ink">{label}</p>
      {context ? <p className="mt-1.5 text-body-s text-ink-subtle">{context}</p> : null}
    </div>
  );
}
