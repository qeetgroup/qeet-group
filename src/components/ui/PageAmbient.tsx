import { cn } from "@/lib/utils";

/**
 * Lightweight ambient backdrop for inner-page heroes. A static gradient mesh
 * masked to fade downward, plus film grain — the same vocabulary as the home
 * hero but without the animated blobs or parallax, so it stays cheap on
 * content pages. Purely decorative (aria-hidden). Drop into a `relative
 * overflow-hidden` hero section as its first child.
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
      <div className="bg-mesh absolute inset-0 opacity-70 mask-[radial-gradient(ellipse_85%_75%_at_50%_-10%,black,transparent_80%)]" />
      <div className="bg-grain absolute inset-0" />
    </div>
  );
}
