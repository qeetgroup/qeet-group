"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { SEARCH_TYPE_LABEL, scoreEntry, type SearchEntry } from "@/lib/search";
import { useSearchIndex } from "@/lib/search/use-search-index";

export function SearchBox() {
  // Same static /search-index.json the palette uses. Fetched on mount here,
  // since search is this page's entire purpose.
  const index = useSearchIndex(true);
  // Seeded from `?q=` so the SearchAction contract that websiteSchema()
  // advertises to Google actually resolves. Read on the client rather than
  // from server searchParams so the route stays static — scoring happens in
  // the browser either way, so server-rendering it buys nothing.
  const seed = useSearchParams().get("q")?.slice(0, 128) ?? "";
  const [query, setQuery] = useState(seed);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2 || !index) return [] as Array<SearchEntry & { score: number }>;
    return index
      .map((e) => ({ ...e, score: scoreEntry(e, q) }))
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [index, query]);

  const loading = index === null;
  const showEmpty = query.trim().length >= 2 && results.length === 0 && !loading;

  return (
    <div className="max-w-2xl">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
        autoComplete="off"
        placeholder="Search the site…"
        className={cn(
          "w-full appearance-none border-0 border-b border-rule-strong bg-transparent",
          "py-4 font-display text-heading-xl text-ink placeholder:text-ink-subtle",
          "focus:border-ink transition-colors duration-200",
        )}
      />

      {showEmpty && (
        <p className="mt-10 font-sans text-body text-ink-muted">
          Nothing matched &ldquo;{query.trim()}&rdquo;.
        </p>
      )}

      {results.length > 0 && (
        <ul className="mt-10 md:mt-14">
          {results.map((r, i) => (
            <li key={r.url} className={cn(i !== 0 && "border-t border-rule")}>
              <NextLink
                href={r.url}
                className="block py-6 transition-colors duration-200 focus-ring md:py-8"
              >
                <p className="font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                  {SEARCH_TYPE_LABEL[r.type]}
                </p>
                <h2 className="mt-2 font-display text-balance text-ink text-heading-l">
                  {r.title}
                </h2>
                {r.description && (
                  <p className="mt-2 max-w-measure text-body text-ink-muted">
                    {r.description}
                  </p>
                )}
              </NextLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
