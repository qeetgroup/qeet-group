import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Anchor } from "./Anchor";
import { cn, isExternalHref } from "@/lib/utils";

type Variant = "default" | "arrow" | "external";

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: Variant;
  underline?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

function ArrowRightGlyph() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="inline-block -translate-y-px"
    >
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightGlyph() {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="inline-block"
    >
      <path
        d="M5.5 10.5L10.5 5.5M10.5 5.5H6M10.5 5.5V10"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Link({
  href,
  children,
  className,
  variant = "default",
  underline = true,
  ...rest
}: LinkProps) {
  const isExternal = isExternalHref(href);
  const resolvedVariant: Variant =
    variant === "default" && isExternal ? "external" : variant;

  const baseClass = cn(
    "group/link inline-flex items-baseline gap-1.5 rounded-sm text-current",
    "focus-ring",
    className,
  );

  const labelClass = cn(
    underline &&
      "underline underline-offset-[5px] decoration-[1px] decoration-current/30 motion-safe:transition-[text-decoration-color] motion-safe:duration-300 group-hover/link:decoration-accent",
  );

  const content = (
    <>
      <span className={labelClass}>{children}</span>
      {resolvedVariant === "arrow" && (
        <span className="inline-block transition-transform motion-safe:duration-300 group-hover/link:translate-x-1">
          <ArrowRightGlyph />
        </span>
      )}
      {resolvedVariant === "external" && (
        <span className="inline-block transition-transform motion-safe:duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5">
          <ArrowUpRightGlyph />
        </span>
      )}
    </>
  );

  return (
    <Anchor href={href} className={baseClass} {...rest}>
      {content}
    </Anchor>
  );
}
