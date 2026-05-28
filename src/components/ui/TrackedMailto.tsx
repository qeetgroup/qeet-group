"use client";

import { Link } from "./Link";
import { Events, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Plain mailto link that fires a Plausible "Email: Click" event with the
 * inbox + an optional context label (e.g. "contact-channels", "footer").
 */
export function TrackedMailto({
  email,
  context,
  children,
  className,
}: {
  email: string;
  context: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={`mailto:${email}`}
      className={cn("text-ink", className)}
      onClick={() => track(Events.EmailClick, { inbox: email, context })}
    >
      {children}
    </Link>
  );
}
