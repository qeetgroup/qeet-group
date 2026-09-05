import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type HeadingSize =
  | "display-2xl"
  | "display-xl"
  | "display-l"
  | "display-m"
  | "heading-xl"
  | "heading-l"
  | "heading-m"
  | "heading-s";

/**
 * Both variants are Qeet UI — the site sets headings in one face. What differs
 * is WEIGHT, which is where hierarchy comes from once the typeface stops
 * changing:
 *
 *   `display`  600. The announcing voice, and the default.
 *   `sans`     500. For headings that should structure a page without claiming
 *              it — a card title, a sidebar label, the second heading in a
 *              section that already has a display headline.
 *
 * Two headings at 600 competing in one viewport is the most common way a
 * single-face hierarchy collapses; `sans` is the escape hatch for that.
 */
export type HeadingVariant = "display" | "sans";

/*
 * Sizes map straight onto the fluid scale in globals.css. Each token carries
 * its own line-height and letter-spacing, so there is nothing to remember and
 * nothing to re-tune per breakpoint — discrete breakpoint steps are exactly
 * why headlines used to look inconsistent between viewports.
 *
 * This component is the only place display type gets sized.
 */
const sizeMap: Record<HeadingSize, string> = {
  "display-2xl": "text-display-2xl",
  "display-xl": "text-display-xl",
  "display-l": "text-display-l",
  "display-m": "text-display-m",
  "heading-xl": "text-heading-xl",
  "heading-l": "text-heading-l",
  "heading-m": "text-heading-m",
  "heading-s": "text-heading-s",
};

const variantMap: Record<HeadingVariant, string> = {
  // `font-display` carries weight 600 from the base layer; `sans` is the same
  // face stepped down to 500 rather than a different family.
  display: "font-display",
  sans: "font-ui font-medium",
};

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: HeadingVariant;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
  as?: ElementType;
} & Omit<ComponentPropsWithoutRef<"h2">, "className" | "children">;

export function Heading({
  level = 2,
  variant = "display",
  size = "heading-l",
  className,
  children,
  as,
  ...rest
}: HeadingProps) {
  const Tag = (as ?? (`h${level}` as ElementType)) as ElementType;
  return (
    <Tag className={cn(variantMap[variant], sizeMap[size], className)} {...rest}>
      {children}
    </Tag>
  );
}
