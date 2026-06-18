"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SEARCH_TYPE_LABEL,
  scoreEntry,
  type SearchEntry,
} from "@/lib/search";
import { cn } from "@/lib/utils";

/**
 * The custom event name the Nav search icon (and anything else) can
 * dispatch to open the palette without taking a dependency on this file.
 *   window.dispatchEvent(new Event(COMMAND_PALETTE_OPEN_EVENT))
 */
export const COMMAND_PALETTE_OPEN_EVENT = "qeet:command-palette:open";

/**
 * ⌘K / Ctrl+K search palette. Lives in the root layout and renders nothing
 * until opened. Listens for the keyboard shortcut globally and for a custom
 * "qeet:command-palette:open" window event so clickable triggers (the Nav
 * search icon) can request it open without importing this module.
 */
export function CommandPalette({ index }: { index: SearchEntry[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIdx(0);
    // Restore focus to whatever triggered the open.
    previouslyFocused.current?.focus?.();
  }, []);

  // Global open/close shortcuts + custom-event subscription.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isModK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isModK) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, onOpenEvent);
    };
  }, [open, close]);

  // When the palette opens: capture the previously-focused element, focus
  // the input, lock body scroll. Reverse on close.
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Slight delay so the input is in the DOM and focusable.
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(id);
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as Array<SearchEntry & { score: number }>;
    if (q.length < 2) return [];
    return index
      .map((e) => ({ ...e, score: scoreEntry(e, q) }))
      .filter((e) => e.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);
  }, [index, query]);

  // Reset selection when results change.
  useEffect(() => {
    setActiveIdx(0);
  }, [results.length]);

  // Keep the active row in view while arrowing through.
  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-cmd-idx="${activeIdx}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx, open]);

  const navigate = useCallback(
    (url: string) => {
      close();
      router.push(url);
    },
    [close, router],
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length > 0) setActiveIdx((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length > 0)
        setActiveIdx((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      const r = results[activeIdx];
      if (r) {
        e.preventDefault();
        navigate(r.url);
      }
    }
  };

  if (!open) return null;

  const q = query.trim();
  const showEmpty = q.length >= 2 && results.length === 0;
  const showHint = q.length === 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Qeet Group"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh] pb-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-rule bg-canvas shadow-2xl">
        <div className="flex items-center gap-3 border-b border-rule px-5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-ink-subtle"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="m20 20-3.5-3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search pages, products, newsroom, memos…"
            autoComplete="off"
            spellCheck={false}
            aria-label="Search"
            aria-controls="command-palette-results"
            aria-activedescendant={
              results[activeIdx] ? `cmd-row-${activeIdx}` : undefined
            }
            className="w-full appearance-none border-0 bg-transparent py-4 font-sans text-[1.0625rem] text-ink placeholder:text-ink-subtle focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded-sm border border-rule bg-canvas px-1.5 py-0.5 font-sans text-caption text-ink-subtle sm:inline-flex">
            Esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {showHint && (
            <p className="px-5 py-8 font-sans text-body-s text-ink-subtle">
              Start typing to search the site.
            </p>
          )}

          {showEmpty && (
            <p className="px-5 py-8 font-sans text-body-s text-ink-muted">
              Nothing matched &ldquo;{q}&rdquo;.
            </p>
          )}

          {results.length > 0 && (
            <ul
              id="command-palette-results"
              role="listbox"
              ref={listRef}
              className="py-2"
            >
              {results.map((r, i) => {
                const isActive = i === activeIdx;
                return (
                  <li key={r.url} role="presentation">
                    <button
                      id={`cmd-row-${i}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-cmd-idx={i}
                      onMouseMove={() => setActiveIdx(i)}
                      onClick={() => navigate(r.url)}
                      className={cn(
                        "flex w-full items-baseline gap-4 px-5 py-3 text-left",
                        "transition-colors duration-100",
                        isActive ? "bg-ink/5" : "bg-transparent",
                      )}
                    >
                      <span className="w-20 shrink-0 font-sans text-caption font-medium uppercase tracking-[0.14em] text-ink-subtle">
                        {SEARCH_TYPE_LABEL[r.type]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-sans text-body text-ink">
                          {r.title}
                        </span>
                        {r.description && (
                          <span className="mt-0.5 block truncate font-sans text-body-s text-ink-muted">
                            {r.description}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Keyboard hint footer */}
        <div className="flex items-center justify-between gap-4 border-t border-rule px-5 py-3 font-sans text-caption text-ink-subtle">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded-sm border border-rule bg-canvas px-1.5 py-0.5">
                ↑
              </kbd>
              <kbd className="rounded-sm border border-rule bg-canvas px-1.5 py-0.5">
                ↓
              </kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded-sm border border-rule bg-canvas px-1.5 py-0.5">
                ↵
              </kbd>
              open
            </span>
          </div>
          <span className="hidden sm:inline">
            Search by Qeet Group
          </span>
        </div>
      </div>
    </div>
  );
}
