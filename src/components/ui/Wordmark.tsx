import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/config/site";

/*
 * The brand lockup: the identity-core dot — a small echo of the hero's graph
 * signature — followed by the group name in the display face.
 *
 * Nav and Footer each carried their own copy, which had already drifted on
 * hover behaviour (the footer tinted the text, the nav did not). One component
 * means the lockup can only change in one place.
 *
 * Note this is the *wordmark*, not the Qeet mark itself: ui/Logo holds the real
 * SVG mark, which the press kit and brand-asset work will adopt.
 */
type WordmarkProps = {
  /** Link destination. Pass null to render as plain text (e.g. inside a heading). */
  href?: string | null;
  /** Tint the text on hover. The footer does; the nav deliberately does not. */
  tintOnHover?: boolean;
  className?: string;
};

export function Wordmark({ href = "/", tintOnHover = false, className }: WordmarkProps) {
  const inner = (
    <>
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent transition-transform duration-base group-hover:scale-125"
      />
      {SITE_NAME}
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-2.5 font-display font-semibold leading-none tracking-[-0.03em] text-ink",
    "text-[clamp(1.375rem,1.2rem+0.6vw,1.625rem)]",
    tintOnHover && "transition-colors duration-fast hover:text-accent-text",
    className,
  );

  if (href === null) return <span className={classes}>{inner}</span>;

  return (
    <NextLink href={href} aria-label={`${SITE_NAME} home`} className={cn(classes, "rounded-sm focus-ring")}>
      {inner}
    </NextLink>
  );
}
