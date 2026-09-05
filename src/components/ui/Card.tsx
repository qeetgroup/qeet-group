import NextLink from "next/link";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, isExternalHref } from "@/lib/utils";

/*
 * One card. This replaces three separate implementations of the same
 * Glass + hover-lift pattern that had drifted to three radii
 * (2xl / 3xl / 2xl), three hover-border alphas (25% / 30% / 25%) and three
 * padding scales. Differences between call sites are now variants, so they
 * cannot drift again.
 *
 * `interactive` carries the hover treatment, so call sites stop repeating
 * the wrapper and its magic colour string.
 */
const card = cva(
  "relative flex flex-col transition-[transform,box-shadow,border-color] duration-base",
  {
    variants: {
      variant: {
        glass: "glass-panel",
        solid: "bg-surface border border-rule",
        outline: "border border-rule",
        ghost: "",
      },
      radius: {
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
      padding: {
        none: "",
        sm: "p-5",
        md: "p-6 md:p-7",
        lg: "p-7 md:p-8",
      },
      interactive: {
        true: "hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg focus-ring",
        false: "",
      },
    },
    defaultVariants: {
      variant: "glass",
      radius: "xl",
      padding: "md",
      interactive: false,
    },
  },
);

export type CardVariants = VariantProps<typeof card>;

type CardProps = CardVariants & {
  children: ReactNode;
  className?: string;
  /** Renders the card as a link. External hrefs get the right rel/target. */
  href?: string;
  /** Element to render when there is no href. */
  as?: ElementType;
  // Element-agnostic, because the card renders as div, a, or NextLink.
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

export function Card({
  children,
  className,
  href,
  as,
  variant,
  radius,
  padding,
  interactive,
  ...rest
}: CardProps) {
  const isInteractive = interactive ?? Boolean(href);
  const classes = cn(
    card({ variant, radius, padding, interactive: isInteractive }),
    className,
  );

  const content = href ? (
    isExternalHref(href) ? (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes} {...rest}>
        {children}
      </a>
    ) : (
      <NextLink href={href} className={classes} {...rest}>
        {children}
      </NextLink>
    )
  ) : (
    (() => {
      const Tag = (as ?? "div") as ElementType;
      return (
        <Tag className={classes} {...rest}>
          {children}
        </Tag>
      );
    })()
  );

  return content;
}
