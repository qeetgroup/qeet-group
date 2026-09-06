import { cn } from "@/lib/utils";

/**
 * Ambient backdrop for inner-page heroes: a faded hairline grid and film grain.
 * Purely decorative (aria-hidden). Drop into a `relative overflow-hidden` hero
 * section as its first child.
 *
 * The grid is drawn with a two-axis linear-gradient — a line-drawing technique,
 * not a colour blend — and the radial mask fades it into the canvas. Neither
 * introduces a colour gradient.
 *
 * There used to be a third layer here: `bg-mesh`, three radial accent washes
 * behind the grid. It is gone, along with the closing-band glow. On a palette
 * whose whole argument is one signal at ~2% coverage, a soft accent haze across
 * an entire hero is the largest accent surface on the page, and it reads as a
 * product page rather than a corporate one.
 */
export function PageAmbient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-[0.5] mask-[radial-gradient(ellipse_75%_70%_at_50%_-10%,black,transparent_75%)] dark:opacity-[0.35]" />
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
