import NextLink from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { StatusPill } from "./StatusPill";

type BentoCardProps = {
  name: string;
  tagline: string;
  stage: string;
  href: string;
  /** The stylized product-UI mock that fills the media area. */
  children: ReactNode;
  className?: string;
};

/**
 * Bento tile for the product showcase. Whole tile is a single link; the media
 * area holds a stylized product UI, and the footer carries the name, sector,
 * tagline, and status. Hover lifts the tile and nudges the "Read more" arrow;
 * the `group/bento` hook lets each product mock add its own micro-motion.
 */
export function BentoCard({
  name,
  tagline,
  stage,
  href,
  children,
  className,
}: BentoCardProps) {
  return (
    <NextLink
      href={href}
      className={cn(
        "group/bento glass-panel relative flex h-full flex-col overflow-hidden rounded-3xl transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className,
      )}
    >
      {/* Media — the stylized product UI on a faint monochrome canvas */}
      <div className="relative min-h-0 flex-1 overflow-hidden border-b border-glass-border bg-canvas/40 p-4 md:p-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,var(--color-rule)_1px,transparent_1px)] bg-size-[16px_16px] opacity-50"
        />
        <div className="relative h-full">{children}</div>
      </div>

      {/* Footer */}
      <div className="flex items-end justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <h3 className="truncate font-serif font-normal tracking-[-0.015em] text-ink text-[1.375rem] leading-none md:text-[1.5rem]">
              {name}
            </h3>
            <StatusPill stage={stage} />
          </div>
          <p className="text-body-s text-ink-muted">{tagline}</p>
        </div>
        <span
          aria-hidden="true"
          className="mb-1 shrink-0 text-ink-subtle transition-all duration-300 group-hover/bento:translate-x-1 group-hover/bento:text-brand"
        >
          →
        </span>
      </div>
    </NextLink>
  );
}
