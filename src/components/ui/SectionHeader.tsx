import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeaderProps = {
  /** Two-digit index, e.g. "01". Renders before the eyebrow label. */
  index?: string;
  eyebrow: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Consistent section intro used across the homepage for rhythm: a numbered
 * eyebrow ("01 — Products"), an optional serif title, and an optional lede.
 * Pure layout — wrap in <FadeRise> at the call site for entrance motion.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {index && (
        <div className={cn("h-px w-8 bg-brand", align === "center" && "mx-auto")} />
      )}
      <Eyebrow className="flex items-center gap-2.5">
        {index && (
          <>
            <span className="tabular-nums text-ink">{index}</span>
            <span aria-hidden="true" className="text-rule-strong">
              —
            </span>
          </>
        )}
        {eyebrow}
      </Eyebrow>
      {title && (
        <h2 className="text-balance font-display font-semibold tracking-tight text-ink text-[2rem] leading-[1.07] md:text-[2.6rem] lg:text-[3.1rem] lg:leading-[1.05]">
          {title}
        </h2>
      )}
      {description && (
        <p
          className={cn(
            "max-w-[42rem] text-body-l text-ink-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
