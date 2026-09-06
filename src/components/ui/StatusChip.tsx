// From ./types, NOT the @/lib/content barrel: this component renders inside
// the client-side navigation, and the barrel re-exports the filesystem
// loaders. Importing through it pulls node:fs into the client bundle.
import { statusLabel, type ProductStatus } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * A product's lifecycle status, rendered.
 *
 * This replaces StatusPill, which took a free-text `stage` string, looked it
 * up in a table, and fell through to rendering the raw value when the lookup
 * missed. That meant a typo in frontmatter became a status label on a live
 * page, silently. `ProductStatus` is a closed union, so the same mistake is
 * now a build error.
 *
 * ---------------------------------------------------------------------------
 * Colour is doing real work here, so it is not doing it alone.
 * ---------------------------------------------------------------------------
 * The three statuses form a deliberate ladder of PRESENCE — signal, then
 * dimmed ink, then faint ink — so a portfolio page reads as lifecycle at a
 * glance without anyone parsing labels. But a ladder of prominence is
 * invisible to a colour-blind reader and meaningless to a screen reader, so
 * every chip also carries its text label and the dot marks shape as well as
 * tone: filled for available, hollow for everything else.
 *
 * All six pairings (three statuses × two themes) are asserted by
 * `bun run check:contrast`.
 */
const TONE: Record<ProductStatus, string> = {
  available: "text-status-available",
  development: "text-status-development",
  planned: "text-status-planned",
};

const DOT: Record<ProductStatus, string> = {
  available: "bg-status-available",
  // Hollow, so the distinction survives greyscale and colour-blindness.
  development: "border border-status-development",
  planned: "border border-status-planned",
};

export function StatusChip({
  status,
  className,
  showDot = true,
}: {
  status: ProductStatus;
  className?: string;
  /** Suppress the dot in dense contexts where it becomes noise. */
  showDot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-label uppercase",
        TONE[status],
        className,
      )}
    >
      {showDot && (
        <span
          aria-hidden="true"
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[status])}
        />
      )}
      {statusLabel(status)}
    </span>
  );
}
