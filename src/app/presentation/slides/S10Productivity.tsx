import { byRole } from "../portfolio";
import {
  Item,
  Rise,
  Slide,
  SlideBody,
  SlideFooter,
  SlideHeader,
  Stagger,
  StatusBadge,
  StatusGlyph,
} from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 10 — the planned productivity suite.
 *
 * The one slide whose whole subject is products that do not exist yet, so it
 * is built to look like it: dashed outlines instead of rules, faint ink
 * instead of full, an empty status glyph on every item, and one PLANNED badge
 * over the band. Seven consecutive "PLANNED" chips would stop being
 * information and become texture; the badge states it once and the glyphs
 * repeat it in shape.
 *
 * The footer is the registry's own description: each has a specification
 * repository and none has implementation code.
 */
export function S10Productivity({ index }: SlideProps) {
  const suite = byRole("productivity");

  return (
    <Slide>
      <SlideHeader
        index={index}
        label="Planned productivity suite"
        title={["A productivity suite —", "specified, not yet built."]}
        lede="Documented product directions — not presented as shipped capabilities."
      />

      <SlideBody>
        <Rise delay={0.25} className="flex items-center justify-between border-t border-dashed border-rule-strong pt-[1.2cqw]">
          <p className="deck-label font-mono text-ink-muted">Qeet productivity suite</p>
          <StatusBadge status="planned" />
        </Rise>

        <Stagger as="ul" delay={0.35} className="mt-[1.6cqw] grid grid-cols-7 gap-[1.2cqw]">
          {suite.map((p) => (
            <Item
              as="li"
              key={p.slug}
              className="border border-dashed border-rule-strong px-[1cqw] pb-[1.2cqw] pt-[1cqw]"
            >
              <StatusGlyph status={p.status} />
              <p className="deck-label mt-[1.4cqw] font-mono text-ink-subtle">Qeet</p>
              <p className="deck-body mt-[0.2cqw] font-display text-ink-muted">{p.short}</p>
            </Item>
          ))}
        </Stagger>
      </SlideBody>

      <SlideFooter delay={0.9}>
        Each has a written specification. None has implementation code.
      </SlideFooter>
    </Slide>
  );
}
