import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PRODUCT_UI } from "./registry";

/**
 * Guards a failure that is invisible at runtime.
 *
 * When the flagship's slug changed from `qeetid` to `qeet-id`, this registry
 * kept its old key. The lookup simply returned undefined, the product page
 * rendered without its visual, and nothing anywhere reported a problem — the
 * page was still valid, just quietly poorer. A missing image does not throw.
 *
 * So the registry is asserted against the filesystem instead: every key must
 * correspond to a real product file. Renaming a product now fails here.
 */
describe("product visual registry", () => {
  const slugs = readdirSync(join(process.cwd(), "src", "content", "products"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));

  it("finds the product collection", () => {
    expect(slugs.length).toBeGreaterThan(0);
  });

  it.each(Object.keys(PRODUCT_UI))("%s corresponds to a real product", (slug) => {
    expect(slugs).toContain(slug);
  });

  /*
   * Intentionally NOT asserted: that every product has a visual. Planned
   * products have no interface to abstract, and drawing one would invent a
   * screen for software that does not exist.
   */
  it("does not require every product to have one", () => {
    expect(Object.keys(PRODUCT_UI).length).toBeLessThanOrEqual(slugs.length);
  });
});
