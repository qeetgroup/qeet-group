import type { ReactNode } from "react";
import { Figure, type FigureAspect } from "@/components/media/Figure";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/components/ui/Link";
import { FadeRise } from "@/components/motion/FadeRise";
import { RevealLines } from "@/components/motion/RevealLines";
import type { MediaSlot } from "@/config/media";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * EditorialFeature — the site's main alternative to a card grid
 * ============================================================================
 *
 * Cards are the default because they are easy, and a page of them reads as a
 * catalogue: every item the same size, therefore every item the same
 * importance, therefore no argument being made. Corporate sites that hold
 * attention alternate large asymmetric splits instead — a single idea per
 * band, with the media doing real work.
 *
 * This is that band. Text and media in a 5/7 split rather than 6/6, because an
 * even split has no subject; `flip` alternates the side so a run of them has
 * rhythm rather than repetition.
 *
 * Anything that can be composed is a slot (`children`, `aside`) rather than a
 * prop, so the ecosystem map, the identity figure and a photograph can all
 * occupy the media side without this component knowing what any of them are.
 */

type EditorialFeatureProps = {
  eyebrow?: string;
  /** One entry per visual line — see RevealLines. */
  headline: string[];
  accentLine?: number;
  children?: ReactNode;
  cta?: { href: string; label: string };
  /** Registry slot for the media side. Ignored when `media` is supplied. */
  slot?: MediaSlot;
  aspect?: FigureAspect;
  /** Arbitrary media — a figure, a diagram, an interactive component. */
  media?: ReactNode;
  /** Puts the media on the left. Alternate down a page. */
  flip?: boolean;
  className?: string;
};

export function EditorialFeature({
  eyebrow,
  headline,
  accentLine,
  children,
  cta,
  slot,
  aspect = "portrait",
  media,
  flip = false,
  className,
}: EditorialFeatureProps) {
  return (
    <div className={cn("grid-editorial items-center", className)}>
      <div
        className={cn(
          "col-lede",
          // Ordering is a desktop-only concern. On a phone the text always
          // leads, because a reader who has just arrived at a section needs
          // to know what it is before being shown a picture of it.
          flip ? "lg:order-2 lg:col-start-7" : "lg:order-1",
        )}
      >
        {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
        <RevealLines
          as="h2"
          lines={headline}
          accentIndex={accentLine}
          className="text-balance font-display text-ink text-display-l"
        />
        {children && (
          <FadeRise className="mt-8 max-w-prose text-body-l text-ink-muted md:mt-10">
            {children}
          </FadeRise>
        )}
        {cta && (
          <FadeRise className="mt-10">
            <Link href={cta.href} variant="arrow" className="text-body text-ink">
              {cta.label}
            </Link>
          </FadeRise>
        )}
      </div>

      <div className={cn("col-figure", flip ? "lg:order-1 lg:col-start-1" : "lg:order-2")}>
        <FadeRise>
          {media ?? (slot ? <Figure slot={slot} aspect={aspect} sizes="(min-width: 1024px) 50vw, 100vw" /> : null)}
        </FadeRise>
      </div>
    </div>
  );
}
