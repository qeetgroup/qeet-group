import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wrapper for long-form MDX bodies.
 *
 * Sets the reading measure and normalises the first and last child's margins,
 * so a body that opens with a heading does not push a gap above itself. The
 * element styling itself lives in mdx/MDXComponents — this only owns the
 * container.
 */
export function Prose({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-prose [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", className)}>
      {children}
    </div>
  );
}
