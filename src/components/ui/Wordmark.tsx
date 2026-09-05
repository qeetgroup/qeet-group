import NextLink from "next/link";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/config/site";

/*
 * The brand lockup: the Qeet mark followed by the group name.
 *
 * This used to render a plain accent-coloured DOT in place of the mark, with a
 * note that ui/Logo held the real SVG "which the press kit and brand-asset work
 * will adopt". Nothing adopted it — Logo sat unused in the tree while the
 * header and footer of a corporate site showed a circle. The mark is the single
 * most-repeated brand element on the site; it should be the actual mark.
 *
 * The logo is INLINE SVG rather than an <img> pointing at public/qeet-mark.svg,
 * and that is load-bearing. That file carries its own `prefers-color-scheme`
 * block to swap the bowl between black and white — but this site's theme is
 * driven by a `.light` class and deliberately ignores the OS preference (see
 * the theme script in app/layout.tsx). An <img> would therefore colour itself
 * from the OS while the page coloured itself from the class, and the two
 * disagree the moment anyone uses the theme toggle. Inline, the mark inherits
 * `currentColor` and simply cannot drift.
 *
 * Nav and Footer each carried their own copy of this lockup, which had already
 * drifted on hover behaviour. One component means it can only change once.
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
      {/* Decorative: the wordmark beside it already names the organisation, and
          the link carries its own aria-label. Announcing "Qeet" twice is noise. */}
      <Logo className="h-[1.15em] w-[1.15em] transition-transform duration-base group-hover:scale-110" />
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
