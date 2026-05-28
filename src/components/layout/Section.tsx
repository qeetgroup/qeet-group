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

const paddingMap = {
  default: "py-24 md:py-32 lg:py-40",
  tight: "py-16 md:py-20",
  none: "",
} as const;

const toneMap: Record<Tone, string> = {
  default: "bg-canvas text-ink",
  inverse: "bg-inverse text-ink-inverse",
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
