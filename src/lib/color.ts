/**
 * Client-side colour resolution.
 *
 * Needed because our tokens are authored in OKLCH and resolve to `oklch()` or
 * `lab()` in getComputedStyle — neither of which a hex parser or a WebGL
 * uniform can consume. Anything that has to hand a token to a canvas, a shader
 * or a contrast calculation goes through here.
 *
 * Browser-only: every function touches the DOM.
 */

/**
 * Resolves a custom property to a concrete colour string.
 *
 * `getComputedStyle(el).getPropertyValue(token)` is not enough: the computed
 * value of a custom property keeps its `var()` references unsubstituted, so
 * `--color-canvas: var(--color-neutral-950)` comes back literally. Assigning it
 * to a real `color` property and reading that back forces substitution.
 */
export function resolveCssColor(token: string): string {
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;opacity:0;pointer-events:none";
  probe.style.color = `var(${token})`;
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

let ctx: CanvasRenderingContext2D | null | undefined;

/**
 * Converts any CSS colour the browser understands into sRGB bytes.
 *
 * Chrome returns wide-gamut computed colours as `lab()` / `oklch()`, so
 * string-matching for `rgb()` silently fails. Painting onto a 1x1 canvas and
 * reading the pixel back works whatever notation the browser chose.
 */
export function toSrgb(value: string): [number, number, number] | null {
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

/** `#rrggbb`, for APIs that only parse hex. Falls back to black. */
export function toHex(value: string): string {
  const rgb = toSrgb(value);
  if (!rgb) return "#000000";
  return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

/** Resolve a token straight to hex. */
export function tokenToHex(token: string): string {
  return toHex(resolveCssColor(token));
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio between two CSS colours, or null if either won't parse. */
export function contrastRatio(a: string, b: string): number | null {
  const ca = toSrgb(a);
  const cb = toSrgb(b);
  if (!ca || !cb) return null;
  const la = relativeLuminance(ca);
  const lb = relativeLuminance(cb);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
