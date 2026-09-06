import { describe, expect, it } from "vitest";
import { cn, isExternalHref } from "./utils";

/*
 * These lock down the tailwind-merge configuration. Without the custom class
 * groups in utils.ts, tailwind-merge treats every `text-*` class as a possible
 * font-size and silently drops the size from `cn("text-display-xl","text-ink")`
 * — every heading on the site would collapse to body size with no error. The
 * failure is invisible, so it needs a test.
 */
describe("cn", () => {
  describe("custom font-size scale coexists with text colour", () => {
    it.each([
      ["text-display-2xl", "text-ink"],
      ["text-display-xl", "text-ink"],
      ["text-display-l", "text-ink-inverse"],
      ["text-display-m", "text-ink-subtle"],
      ["text-heading-xl", "text-accent-text"],
      ["text-heading-l", "text-ink"],
      ["text-heading-m", "text-ink"],
      ["text-heading-s", "text-ink"],
      ["text-body-l", "text-ink-muted"],
      ["text-body", "text-ink-muted"],
      ["text-body-s", "text-ink-subtle"],
      ["text-caption", "text-ink-subtle"],
      ["text-label", "text-ink-subtle"],
    ])("keeps both %s and %s", (size, colour) => {
      const result = cn(size, colour);
      expect(result).toContain(size);
      expect(result).toContain(colour);
    });
  });

  describe("later class wins within a group", () => {
    it.each([
      [["text-display-2xl", "text-display-m"], "text-display-m"],
      [["text-ink", "text-ink-muted"], "text-ink-muted"],
      [["rounded-md", "rounded-full"], "rounded-full"],
      [["py-section", "py-4"], "py-4"],
      [["py-4", "py-section"], "py-section"],
      [["max-w-prose", "max-w-narrow"], "max-w-narrow"],
      [["duration-fast", "duration-slow"], "duration-slow"],
      [["z-nav", "z-modal"], "z-modal"],
      [["shadow-md", "shadow-glow"], "shadow-glow"],
      [["bg-surface", "bg-accent"], "bg-accent"],
      [["ease-expo", "ease-soft"], "ease-soft"],
    ])("%j resolves to %s", (input, expected) => {
      expect(cn(...input)).toBe(expected);
    });
  });

  it("keeps font family and font weight, which share the `font-` prefix", () => {
    expect(cn("font-display", "font-medium")).toBe("font-display font-medium");
  });

  it("lets a caller override a component default", () => {
    // The pattern every primitive relies on: base classes then className.
    expect(cn("rounded-md bg-surface text-body", "rounded-full")).toBe(
      "bg-surface text-body rounded-full",
    );
  });

  it("ignores falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("flattens arrays and objects via clsx", () => {
    expect(cn(["a", "b"], { c: true, d: false })).toBe("a b c");
  });
});

describe("isExternalHref", () => {
  it.each(["https://qeet.in", "http://x.test", "mailto:a@b.c", "tel:+15551234"])(
    "treats %s as external",
    (href) => expect(isExternalHref(href)).toBe(true),
  );

  it.each(["/about", "/products/qeetid", "#anchor", "./relative"])(
    "treats %s as internal",
    (href) => expect(isExternalHref(href)).toBe(false),
  );
});
