import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PRODUCT_ICON } from "./product-icons";

/**
 * The mirror of components/product-ui/registry.test.ts, asserting the opposite
 * thing on purpose.
 *
 * That registry may cover a SUBSET of products, because a planned product has
 * no interface to abstract. This one must cover ALL of them: an icon states
 * what a product is for, which is known the day it is named, and a product
 * missing its glyph renders as a bare circle in the middle of fourteen
 * labelled ones — a defect that is obvious on screen and silent everywhere
 * else. Adding a product without an icon fails here.
 */
describe("product icon registry", () => {
  const slugs = readdirSync(join(process.cwd(), "src", "content", "products"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  it("finds the product collection", () => {
    expect(slugs.length).toBeGreaterThan(0);
  });

  it.each(slugs)("%s has an icon", (slug) => {
    expect(Object.keys(PRODUCT_ICON)).toContain(slug);
  });

  it.each(Object.keys(PRODUCT_ICON))("%s corresponds to a real product", (slug) => {
    expect(slugs).toContain(slug);
  });

  /*
   * Two products sharing a glyph is not an error the type system can catch —
   * the map would still be exhaustive and still typecheck. It is a design
   * failure that defeats the reason the icons exist, so it is asserted.
   */
  it("gives every product a distinct glyph", () => {
    const glyphs = Object.values(PRODUCT_ICON);
    expect(new Set(glyphs).size).toBe(glyphs.length);
  });
});
