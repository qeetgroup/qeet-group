import { Fragment } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail for nested routes. Pairs with breadcrumbSchema()
 * from lib/seo/structured-data — the JSON-LD and the UI should always carry
 * the same items. The current page is rendered as plain text, not a link.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className={cn("font-ui text-caption text-ink-subtle", className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const isCurrent = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              {i > 0 && (
                <li aria-hidden="true" className="text-rule-strong">
                  /
                </li>
              )}
              <li>
                {isCurrent ? (
                  <span aria-current="page" className="text-ink-muted">
                    {item.name}
                  </span>
                ) : (
                  <NextLink
                    href={item.path}
                    className="transition-colors duration-200 hover:text-ink"
                  >
                    {item.name}
                  </NextLink>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
