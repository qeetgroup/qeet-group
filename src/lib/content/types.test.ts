import { describe, expect, it } from "vitest";
import { statusLabel, type ProductStatus } from "./types";

/*
 * The lifecycle vocabulary is the site's main honesty mechanism: it is what
 * stops a specified-but-unbuilt product from reading as something a visitor
 * could go and buy. These assertions pin the exact wording, because the wording
 * IS the guarantee — and because two of the three labels were chosen against
 * the obvious alternative for reasons that would otherwise be invisible to
 * whoever edits this next.
 */

describe("statusLabel", () => {
  it("covers every member of the union", () => {
    const all: ProductStatus[] = ["available", "development", "planned"];
    for (const status of all) {
      expect(statusLabel(status)).toBeTruthy();
    }
  });

  /*
   * NOT "Generally available". The organisation's own drift register records
   * QC-007: the published profile claims GA on 2026-05-27 while the server's
   * roadmap describes the product as pre-1.0. "Available" is true of the
   * shipped capabilities under either reading; "generally available" picks a
   * side of an unresolved internal contradiction, in public, in Qeet's favour.
   */
  it('says "Available", not "Generally available"', () => {
    expect(statusLabel("available")).toBe("Available");
  });

  /*
   * NOT "Coming soon". "Soon" is a commitment to a date, and there is no date.
   */
  it('says "Planned", not "Coming soon"', () => {
    expect(statusLabel("planned")).toBe("Planned");
    expect(statusLabel("planned")).not.toMatch(/soon/i);
  });

  it("distinguishes in-development from both", () => {
    expect(statusLabel("development")).toBe("In development");
    const labels = new Set(
      (["available", "development", "planned"] as const).map(statusLabel),
    );
    expect(labels.size).toBe(3);
  });

  /*
   * No label may imply availability unless it is the available one. This is
   * the property that actually matters — the specific strings above could
   * reasonably change, but this constraint cannot.
   */
  it("never implies availability for unshipped products", () => {
    for (const status of ["development", "planned"] as const) {
      expect(statusLabel(status)).not.toMatch(/^available$/i);
      expect(statusLabel(status)).not.toMatch(/\blive\b|\bga\b|\bshipped\b/i);
    }
  });
});
