import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

export function Eyebrow({ children, className, as: As = "p" }: EyebrowProps) {
  return (
    <As
      className={cn(
        "font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle",
        className,
      )}
    >
      {children}
    </As>
  );
}
