import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { TiltCard } from "../motion/TiltCard";
import { Spotlight } from "../motion/Spotlight";

type ProductCardProps = {
  name: string;
  description: string;
  tag: string;
  href: string;
  className?: string;
};

/**
 * Glass product card for the home showcase. A 3D-tilt shell wraps a
 * spotlit glass pane: an oversized clipped wordmark motif up top, then the
 * sector, name, and description. Hover lifts the card and swaps the soft
 * elevation for a brand glow. Tilt/spotlight are inert for reduced-motion
 * and touch (see the primitives), so the card stays a clean static panel.
 */
export function ProductCard({ name, description, tag, href, className }: ProductCardProps) {
  return (
    <TiltCard className={cn("h-full", className)}>
      <Spotlight
        size={420}
        color="color-mix(in oklab, var(--color-brand) 14%, transparent)"
        className="h-full rounded-3xl"
      >
        <NextLink
          href={href}
          className="glass-panel group/card relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:p-7"
        >
          {/* Motif: faint dot grid, a soft brand wash that rises on hover, and
              an oversized clipped wordmark watermark (kept monochrome). */}
          <div className="relative mb-7 h-28 overflow-hidden rounded-2xl border border-glass-border bg-canvas/30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-rule-strong)_1px,transparent_1px)] bg-size-[18px_18px] opacity-40 transition-opacity duration-500 group-hover/card:opacity-60" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-brand-soft to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
            <span
              aria-hidden="true"
              className="absolute -bottom-3 left-4 font-serif text-[3.5rem] leading-none text-ink/10 transition-colors duration-500 group-hover/card:text-ink/20"
            >
              {name}
            </span>
          </div>

          <p className="text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
            {tag}
          </p>
          <h3 className="mt-3 font-serif font-normal tracking-[-0.015em] text-ink text-[1.875rem] leading-[1.08] md:text-[2.125rem]">
            {name}
          </h3>
          <p className="mt-3 line-clamp-3 text-body-s text-ink-muted">{description}</p>

          <span className="mt-6 inline-flex items-center gap-1.5 text-body-s font-medium text-ink">
            Read more
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 group-hover/card:translate-x-1"
            >
              →
            </span>
          </span>
        </NextLink>
      </Spotlight>
    </TiltCard>
  );
}
