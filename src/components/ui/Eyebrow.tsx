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
        "font-sans text-label font-medium uppercase text-ink-subtle",
        className,
      )}
    >
      {children}
    </As>
  );
}
