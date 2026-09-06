import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

type Tone = "default" | "inverse";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  /** When false, renders children without the constrained Container. */
  contained?: boolean;
  id?: string;
  /** Override default vertical padding. */
  padding?: "default" | "tight" | "none";
};

/* Fluid rhythm from --space-section, so section spacing scales continuously
 * with the viewport instead of stepping at two breakpoints. */
const paddingMap = {
  default: "py-section",
  tight: "py-section-tight",
  none: "",
} as const;

const toneMap: Record<Tone, string> = {
  default: "bg-canvas text-ink",
  /* `on-dark` pins the accent tokens: an inverse band stays dark in the light
   * theme too, so its accent must not follow the theme. */
  inverse: "on-dark bg-inverse text-ink-inverse",
};

export function Section({
  children,
  className,
  tone = "default",
  contained = true,
  padding = "default",
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn(toneMap[tone], paddingMap[padding], className)}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
