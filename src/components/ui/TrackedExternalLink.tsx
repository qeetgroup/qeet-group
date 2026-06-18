"use client";

import { Link } from "./Link";
import { Events, track } from "@/lib/analytics";

/**
 * External link wrapper that records a Plausible event with a slug/label
 * pair so the dashboard can break clicks down by product.
 */
export function TrackedExternalLink({
  href,
  slug,
  label,
  className,
  children,
}: {
  href: string;
  slug: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        track(Events.ExternalProductClick, { slug, ...(label ? { label } : {}) })
      }
    >
      {children}
    </Link>
  );
}
