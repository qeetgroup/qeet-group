"use client";

import { useSyncExternalStore } from "react";

/* ---------------------------------------------------------------------------
 * Contrast is measured from resolved computed styles rather than from numbers
 * typed into this file, so the readouts cannot drift from the tokens — and
 * they re-measure when the theme flips, which matters because several pairings
 * pass in one theme and fail in the other.
 *
 * Resolution goes through useSyncExternalStore rather than an effect: the
 * external system is the CSSOM, getSnapshot reads it, and a MutationObserver
 * on <html class> invalidates when the theme changes. Values are memoized per
 * generation so getSnapshot stays stable across renders.
 * ------------------------------------------------------------------------ */

let generation = 0;
const cache = new Map<string, string>();
const listeners = new Set<() => void>();
let observer: MutationObserver | null = null;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  observer ??= new MutationObserver(() => {
    generation += 1;
    cache.clear();
    for (const l of listeners) l();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      observer?.disconnect();
      observer = null;
    }
  };
}

/**
 * Resolves a custom property to a concrete colour string.
 *
 * `getComputedStyle(html).getPropertyValue(token)` is not enough: a custom
 * property's computed value keeps its `var()` references unsubstituted, so
 * `--color-canvas: var(--color-neutral-950)` comes back literally. Assigning
 * it to a real `color` property and reading that back forces substitution.
 */
function resolveToken(token: string): string {
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;opacity:0;pointer-events:none";
  probe.style.color = `var(${token})`;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

function getSnapshot(token: string): string {
  const key = `${generation}:${token}`;
  let value = cache.get(key);
  if (value === undefined) {
    value = resolveToken(token);
    cache.set(key, value);
  }
  return value;
}

/** Empty until hydration — the CSSOM does not exist on the server. */
function useResolvedToken(token: string): string {
  return useSyncExternalStore(
    subscribe,
    () => getSnapshot(token),
    () => "",
  );
}

/*
 * Chrome returns wide-gamut computed colours as `lab(...)` / `oklch(...)`
 * rather than `rgb(...)`, so string-matching for rgb() silently returns null
 * for every token here. Painting onto a 1x1 canvas and reading the pixel back
 * yields sRGB bytes whatever notation the browser chose.
 */
let ctx: CanvasRenderingContext2D | null | undefined;

function toSrgb(value: string): [number, number, number] | null {
  if (ctx === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    ctx = canvas.getContext("2d", { willReadFrequently: true });
  }
  if (!ctx) return null;
  ctx.clearRect(0, 0, 1, 1);
  ctx.fillStyle = "#000";
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrastRatio(a: string, b: string): number | null {
  const ca = toSrgb(a);
  const cb = toSrgb(b);
  if (!ca || !cb) return null;
  const la = relativeLuminance(ca);
  const lb = relativeLuminance(cb);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Measured contrast between two tokens, with the WCAG verdict for the stated
 * use: `text` needs 4.5:1, `large-text` and `ui` (1.4.11) need 3:1.
 */
export function Contrast({
  fg,
  bg,
  use = "text",
}: {
  fg: string;
  bg: string;
  use?: "text" | "large-text" | "ui";
}) {
  const fgValue = useResolvedToken(fg);
  const bgValue = useResolvedToken(bg);
  const ratio = fgValue && bgValue ? contrastRatio(fgValue, bgValue) : null;

  if (ratio === null) {
    return <span className="font-mono text-caption text-ink-subtle">&mdash;</span>;
  }

  const threshold = use === "text" ? 4.5 : 3;
  const pass = ratio >= threshold;

  return (
    <span
      className="inline-flex items-center gap-1.5 font-mono text-caption tabular-figures"
      title={`${fg} on ${bg} — needs ${threshold}:1 for ${use}`}
    >
      <span className={pass ? "text-ink-muted" : "text-error"}>{ratio.toFixed(2)}:1</span>
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${pass ? "bg-success" : "bg-error"}`}
      />
      <span className="sr-only">{pass ? "passes" : "fails"}</span>
    </span>
  );
}

/** A colour chip printing the token's resolved value beneath it. */
export function Swatch({ token, label }: { token: string; label?: string }) {
  const value = useResolvedToken(token);
  return (
    <div className="min-w-0">
      <div
        className="h-14 w-full rounded-md border border-rule"
        style={{ background: `var(${token})` }}
      />
      <p className="mt-2 truncate font-mono text-caption text-ink">
        {label ?? token.replace("--color-", "")}
      </p>
      <p className="truncate font-mono text-caption text-ink-subtle">{value || " "}</p>
    </div>
  );
}
