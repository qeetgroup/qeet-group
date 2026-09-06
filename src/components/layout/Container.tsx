import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * `prose` is a reading measure, `narrow` suits centred editorial content,
 * `default` is the standard page width and `wide` is for full-bleed grids.
 * Pages that need a tighter measure ask for a width here rather than dropping
 * an inline `max-w-2xl` — that is how several content widths drifted apart.
 */
export type ContainerWidth = "prose" | "narrow" | "default" | "wide" | "full";

const widthMap: Record<ContainerWidth, string> = {
  prose: "max-w-prose",
  narrow: "max-w-narrow",
  default: "max-w-default",
  wide: "max-w-wide",
  full: "max-w-none",
};

type ContainerProps = {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
  as?: ElementType;
};

export function Container({
  children,
  className,
  width = "default",
  as: As = "div",
}: ContainerProps) {
  return (
    <As className={cn("mx-auto w-full px-(--space-gutter)", widthMap[width], className)}>
      {children}
    </As>
  );
}
