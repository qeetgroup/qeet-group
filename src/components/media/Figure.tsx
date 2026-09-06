import Image from "next/image";
import { MEDIA, type MediaSlot, type Photo } from "@/config/media";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * Figure — the only way a photograph enters this site
 * ============================================================================
 *
 * Every image goes through here, which is what makes the media system a system
 * rather than a convention. Four things are guaranteed by construction:
 *
 *   • The frame is consistent — one aspect set, one loading surface, one
 *     scrim vocabulary, so figures sit on the page as one material.
 *   • Dimensions are always known, so nothing reflows on load.
 *   • Alt text comes from the registry, written next to the reason the image
 *     exists rather than improvised at a call site.
 *   • Credit travels with the asset and cannot be dropped by forgetting it.
 *
 * This is a server component. The scroll-linked motion described in the motion
 * system lives in the client wrapper, because the majority of figures on the
 * site are static and should not ship JavaScript to be so.
 */

export type FigureAspect = "hero" | "editorial" | "portrait" | "rail" | "still" | "free";

const ASPECT: Record<FigureAspect, string> = {
  hero: "aspect-hero",
  editorial: "aspect-editorial",
  portrait: "aspect-portrait",
  rail: "aspect-rail",
  still: "aspect-still",
  // Lets the image's own ratio stand — used where the frame is sized by its grid cell.
  free: "",
};

export type FigureScrim = "none" | "bottom" | "full" | "side";

const SCRIM: Record<FigureScrim, string> = {
  none: "",
  bottom: "scrim-bottom",
  full: "scrim-full",
  side: "scrim-side",
};

type FigureProps = {
  /** A registry slot, or an explicit photo for content-supplied imagery. */
  slot?: MediaSlot;
  photo?: Photo;
  aspect?: FigureAspect;
  scrim?: FigureScrim;
  /**
   * Overrides the registry alt. Use where the same asset appears in two places
   * meaning different things — otherwise leave it and fix the registry.
   */
  alt?: string;
  /** Set on the LCP image only. */
  priority?: boolean;
  /** Required for correct srcset selection; defaults to full-viewport. */
  sizes?: string;
  caption?: string;
  className?: string;
  /** Content layered over the media — headline, kicker. Sits above the scrim. */
  children?: React.ReactNode;
};

export function Figure({
  slot,
  photo,
  aspect = "editorial",
  scrim = "none",
  alt,
  priority = false,
  sizes = "100vw",
  caption,
  className,
  children,
}: FigureProps) {
  const asset = photo ?? (slot ? (MEDIA[slot] as Photo) : undefined);

  /*
   * A missing slot renders nothing rather than throwing. A corporate site
   * losing one decorative image is a blemish; the same site returning a 500 in
   * production because a registry key was renamed is an outage. The typed
   * MediaSlot union already makes this near-unreachable — this is the backstop
   * for `photo` coming from content.
   */
  if (!asset || asset.kind !== "photo") return null;

  const isDecorative = asset.alt === "" && !alt;

  return (
    <figure className={cn("relative", className)}>
      <div
        className={cn(
          "relative overflow-hidden",
          ASPECT[aspect],
          "figure-qeet",
          SCRIM[scrim],
        )}
      >
        <Image
          src={asset.src}
          width={asset.width}
          height={asset.height}
          alt={alt ?? asset.alt}
          sizes={sizes}
          priority={priority}
          // Only the LCP image is eager; everything else waits until it is
          // plausibly needed.
          loading={priority ? undefined : "lazy"}
          quality={75}
          className="h-full w-full object-cover"
          // Decorative images are hidden from assistive technology entirely
          // rather than announced with an empty name.
          aria-hidden={isDecorative || undefined}
        />
        {children}
      </div>

      {(caption || asset.credit) && (
        <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-caption text-ink-subtle">
          {caption && <span className="text-ink-muted">{caption}</span>}
          {asset.credit && <span className="font-mono text-label uppercase">{asset.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
