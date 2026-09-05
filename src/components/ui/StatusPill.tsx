import { Badge, type BadgeTone } from "./Badge";

/**
 * A product's MDX `stage`, rendered as a status badge.
 *
 * The vocabulary here is deliberately closed. Product status on this site must
 * come from a verified source — qeet-context, the product's own *-context repo,
 * or its STATUS.md — never from a hand-picked string, so an unrecognised stage
 * falls back to the most conservative reading rather than inventing a tone.
 */
const STAGE_MAP: Record<string, { label: string; tone: BadgeTone; glow?: boolean }> = {
  "Generally available": { label: "Live", tone: "accent", glow: true },
  "Early access": { label: "Early access", tone: "accent" },
  Preview: { label: "Preview", tone: "neutral" },
  "Coming soon": { label: "Coming soon", tone: "neutral" },
  Planned: { label: "Planned", tone: "neutral" },
};

export function StatusPill({ stage, className }: { stage: string; className?: string }) {
  const entry = STAGE_MAP[stage] ?? { label: stage, tone: "neutral" as BadgeTone };
  return (
    <Badge tone={entry.tone} dot={entry.glow ? "glow" : true} className={className}>
      {entry.label}
    </Badge>
  );
}
