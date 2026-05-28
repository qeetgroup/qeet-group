import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type LedeProps = {
  children: ReactNode;
  className?: string;
};

export function Lede({ children, className }: LedeProps) {
  return (
    <p className={cn("font-sans text-body-l text-ink-muted max-w-[36rem]", className)}>
      {children}
    </p>
  );
}
