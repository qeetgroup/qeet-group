import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Small status/label pill. Tones map to the semantic colour roles rather than
 * to specific hues, so a badge means the same thing in both themes.
 *
 * `dot` renders a leading indicator — used by product status, where the dot
 * carries the state at a glance and the label spells it out.
 */
const badge = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-caption font-medium tracking-tight",
  {
    variants: {
      tone: {
        neutral: "border-rule bg-canvas/60 text-ink-muted",
        accent: "border-accent/30 bg-accent-faint text-accent-text",
        success: "border-success/30 bg-success/10 text-success",
        warning: "border-warning/30 bg-warning/10 text-warning",
        error: "border-error/30 bg-error/10 text-error",
        outline: "border-rule-interactive bg-transparent text-ink",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const dotTone = {
  neutral: "bg-ink-subtle",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  outline: "bg-ink-subtle",
} as const;

export type BadgeTone = keyof typeof dotTone;

type BadgeProps = VariantProps<typeof badge> & {
  children: ReactNode;
  className?: string;
  /** Show a leading state dot. `glow` adds a halo, for the strongest state. */
  dot?: boolean | "glow";
};

export function Badge({ children, className, tone = "neutral", dot = false }: BadgeProps) {
  return (
    <span className={cn(badge({ tone }), className)}>
      {dot ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-1.5 w-1.5 shrink-0 rounded-full",
            dotTone[(tone ?? "neutral") as BadgeTone],
            dot === "glow" &&
              "shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_22%,transparent)]",
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
