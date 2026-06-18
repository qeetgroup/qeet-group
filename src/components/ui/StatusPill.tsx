import { cn } from "@/lib/utils";

/**
 * Maps a product's MDX `stage` to a small status pill. Three real stages exist
 * in content today: "Generally available", "Early access", "Coming soon".
 */
type Tone = "live" | "early" | "soon";

const STAGE_MAP: Record<string, { label: string; tone: Tone }> = {
  "Generally available": { label: "Live", tone: "live" },
  "Early access": { label: "Early access", tone: "early" },
  "Coming soon": { label: "Coming soon", tone: "soon" },
};

const dotTone: Record<Tone, string> = {
  live: "bg-brand",
  early: "bg-brand/60",
  soon: "bg-ink-subtle",
};

export function StatusPill({ stage, className }: { stage: string; className?: string }) {
  const { label, tone } = STAGE_MAP[stage] ?? { label: stage, tone: "soon" as Tone };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-rule bg-canvas/60 px-2.5 py-1 font-sans text-caption font-medium tracking-tight text-ink-muted",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dotTone[tone],
          tone === "live" && "shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-brand)_22%,transparent)]",
        )}
      />
      {label}
    </span>
  );
}
