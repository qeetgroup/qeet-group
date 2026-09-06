import { describe, expect, it } from "vitest";
import { isLive, LIVE_HOSTS } from "./live-hosts";
import { ORG_PROPERTIES } from "./site";

/**
 * The failure being guarded is a corporate site linking to hosts that do not
 * exist. When this was checked, seven of the product zones the site referenced
 * were NXDOMAIN and one more 404ed at its root — every one of them rendered as
 * a normal link.
 *
 * Nothing here can check DNS (a test suite must not depend on the network), so
 * what is asserted is the DISCIPLINE: that the gate rejects by default, that a
 * host must be listed explicitly to pass, and that unreachable properties are
 * still described rather than silently dropped.
 */
describe("live-host gate", () => {
  it("rejects an unlisted host", () => {
    expect(isLive("https://pay.qeet.in")).toBe(false);
    expect(isLive("https://logs.qeet.in")).toBe(false);
  });

  it("accepts a listed host", () => {
    expect(isLive("https://id.qeet.in")).toBe(true);
    expect(isLive("https://docs.qeet.in")).toBe(true);
  });

  /*
   * ui.qeet.in has DNS and answers requests — it just 404s at the root. The
   * bar is "a visitor who clicks this arrives somewhere", not "the host
   * exists", so it must not pass.
   */
  it("rejects a host that resolves but serves nothing", () => {
    expect(isLive("https://ui.qeet.in")).toBe(false);
  });

  it("rejects undefined and malformed input rather than throwing", () => {
    expect(isLive(undefined)).toBe(false);
    expect(isLive("")).toBe(false);
    expect(isLive("not a url")).toBe(false);
  });

  it("ignores a www. prefix", () => {
    expect(isLive("https://www.qeet.in")).toBe(true);
  });

  it("fails closed — an empty allowlist would link to nothing", () => {
    for (const host of LIVE_HOSTS) {
      expect(isLive(`https://${host}`)).toBe(true);
    }
    expect(isLive("https://example.com")).toBe(false);
  });

  /*
   * Properties that are not live are still LISTED — they are just not links.
   * Dropping them would hide the roadmap from the people most interested in it.
   */
  it("keeps unreachable organisation properties in the list", () => {
    const hrefs = ORG_PROPERTIES.map((p) => p.href);
    expect(hrefs).toContain("https://apis.qeet.in");
    expect(hrefs.some((h) => !isLive(h))).toBe(true);
  });
});
