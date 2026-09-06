import { describe, expect, it } from "vitest";
import { isVisible, publishableOnly, visibleOnly } from "./content-mode";

/*
 * These tests exist because the failure they guard against is silent and
 * expensive: demonstration content reaching a surface that outlives the page —
 * a sitemap entry that gets indexed, an RSS item that lands in a reader, a
 * line in llms.txt that an agent quotes back as a Qeet Group claim.
 *
 * There is no visual signal when that goes wrong. There is only a test.
 */

const real = { data: {} };
const alsoReal = { data: { demo: false } };
const demo = { data: { demo: true } };

describe("content mode", () => {
  it("treats a document with no demo flag as real", () => {
    expect(isVisible(real)).toBe(true);
  });

  it("treats demo: false as real", () => {
    expect(isVisible(alsoReal)).toBe(true);
  });

  describe("publishableOnly — the machine-surface guard", () => {
    it("drops demo documents", () => {
      expect(publishableOnly([real, demo, alsoReal])).toEqual([real, alsoReal]);
    });

    /*
     * The important one. `publishableOnly` and `visibleOnly` agree in verified
     * mode, which makes it tempting to collapse them into a single function.
     * They must NOT be collapsed: in demo mode they diverge, and this is the
     * one that has to keep filtering. Asserting the behaviour directly means a
     * future refactor that unifies them fails here rather than in production.
     */
    it("never emits demo content regardless of mode", () => {
      const out = publishableOnly([demo]);
      expect(out).toHaveLength(0);
    });

    it("preserves order and identity of the documents it keeps", () => {
      const a = { data: { demo: false }, id: "a" };
      const b = { data: {}, id: "b" };
      expect(publishableOnly([a, demo, b])).toEqual([a, b]);
    });
  });

  describe("visibleOnly — the rendering guard", () => {
    it("keeps real documents", () => {
      expect(visibleOnly([real, alsoReal])).toEqual([real, alsoReal]);
    });

    /*
     * Bound to the build-time CONTENT_MODE, which defaults to "verified" — and
     * the default matters more than it looks. Defaulting the other way would
     * mean a production deploy that simply forgot to set the variable would
     * silently publish invented content, so the failure has to land on the safe
     * side of that choice.
     */
    it("hides demo documents under the default (verified) mode", () => {
      expect(process.env.NEXT_PUBLIC_CONTENT_MODE).not.toBe("demo");
      expect(visibleOnly([real, demo])).toEqual([real]);
    });
  });
});
