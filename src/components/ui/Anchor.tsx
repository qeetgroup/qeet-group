import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { isExternalHref } from "@/lib/utils";

type AnchorProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * The single place this codebase decides between `next/link` and a plain
 * anchor, and the single place `target`/`rel` are set for outbound links.
 *
 * It carries no styling opinions, so the three call sites that each had their
 * own copy of this logic — ui/Link, the footer's link rows and the MDX link
 * mapping — can share it while keeping their own appearance. The footer copy
 * was also emitting external links with no `rel="noopener noreferrer"`; routing
 * it through here fixes that.
 *
 * `mailto:` and `tel:` are external but must not open in a new tab, hence the
 * http-only check on target.
 */
export function Anchor({ href, children, className, ...rest }: AnchorProps) {
  if (isExternalHref(href)) {
    const opensNewTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        target={opensNewTab ? "_blank" : undefined}
        rel={opensNewTab ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={className} {...rest}>
      {children}
    </NextLink>
  );
}
