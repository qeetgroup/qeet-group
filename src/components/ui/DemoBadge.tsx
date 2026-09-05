import { cn } from "@/lib/utils";

/**
 * Marks demonstration content wherever it is rendered.
 *
 * This is the visible half of the demo mechanism; the invisible half keeps the
 * same content out of sitemap.xml, RSS and structured data. Both are needed
 * and neither is sufficient: the exclusions protect everyone the content
 * reaches after it leaves the page, and this protects the person reading it.
 *
 * The wording is "Illustrative" rather than "Demo" or "Sample" — those read as
 * internal jargon to a visitor who has no idea the site has a content mode.
 */
export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-rule-interactive px-2 py-0.5 font-mono text-label uppercase text-ink-subtle",
        className,
      )}
    >
      Illustrative
    </span>
  );
}
