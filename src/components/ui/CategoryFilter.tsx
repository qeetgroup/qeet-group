"use client";

import { cn } from "@/lib/utils";

export type CategoryChip = { value: string; count: number };

type Props = {
  categories: CategoryChip[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
};

export function CategoryFilter({ categories, active, onChange, className }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Filter posts by category"
      className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}
    >
      {categories.map((c) => {
        const isActive = c.value === active;
        return (
          <button
            key={c.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(c.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-sans text-body-s transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
              isActive
                ? "border-ink bg-ink text-canvas"
                : "border-rule text-ink-muted hover:border-rule-strong hover:text-ink",
            )}
          >
            <span>{c.value}</span>
            <span aria-hidden="true" className="text-ink-subtle">
              {isActive ? "" : c.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
