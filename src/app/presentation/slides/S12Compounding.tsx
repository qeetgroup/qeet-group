import { Figure, Item, Lines, Rise, SlideMark, Stagger, Stroke } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 12 — building what compounds.
 *
 * Slide 09 already used a ring, so this cycle is drawn as a line with a return
 * beneath it. Same topology, different figure — two rings in one deck would
 * read as the same claim made twice, and these are different claims: 09 is
 * about how a decision is made, this is about how an organisation accumulates.
 *
 * The return path is the slide's single accent, because the return is the
 * whole idea. A left-to-right chain with no return would be a value stream,
 * which is a much weaker and much more common thing to put on a slide.
 *
 * ---------------------------------------------------------------------------
 * On the wording of the principle
 * ---------------------------------------------------------------------------
 * The organisation's own memo puts this as "the next one costs less to build
 * than the last one did". That is the better sentence and it is not the one
 * used here, because on a slide, in front of investors, "costs less" reads as
 * a measured financial claim — and there is no cost evidence published to
 * support it. So the slide states the design principle instead. The stronger
 * original belongs in the speaker's mouth, where it can be qualified.
 */
const STAGES = [
  "Research",
  "Knowledge",
  "Shared capabilities",
  "Infrastructure",
  "Products",
  "Platforms",
  "New opportunities",
];

/* Column centres for a seven-column grid across a 1000-unit viewBox. */
const CENTRES = [71.4, 214.3, 357.1, 500, 642.9, 785.7, 928.6];

export function S12Compounding({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Building what compounds" />

      <div className="grid-editorial items-baseline">
        <Lines
          as="h2"
          lines={["Nothing here", "starts", "from nothing."]}
          className="col-aside deck-display-s font-display text-ink"
        />
        <Rise delay={0.28} className="col-figure">
          <p className="deck-body font-sans text-ink-muted">
            One product creates foundations another can use. Infrastructure gets
            reused rather than rebuilt. Research generates capabilities,
            capabilities become products, and products send us back to research
            with better questions than we started with.
          </p>
        </Rise>
      </div>

      <div>
        <Stagger as="ol" delay={0.42} className="grid grid-cols-7 gap-[1.2cqw]">
          {STAGES.map((stage, i) => (
            <Item as="li" key={stage}>
              <p className="deck-label tabular-figures font-mono text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="deck-body-s mt-[0.6cqw] font-display text-ink">{stage}</p>
            </Item>
          ))}
        </Stagger>

        <Figure viewBox="0 0 1000 120" className="mt-[1.2cqw] h-[11cqw] w-full">
          <Stroke
            d={`M ${CENTRES[0]} 20 L ${CENTRES[6]} 20`}
            className="stroke-rule-strong"
            delay={0.5}
          />
          {CENTRES.map((x) => (
            <Stroke
              key={x}
              d={`M ${x} 12 L ${x} 28`}
              className="stroke-ink-subtle"
              delay={0.6}
            />
          ))}
          {/* The return. Drawn last and in the accent, because compounding is
              the feedback and not the sequence. */}
          <Stroke
            d={`M ${CENTRES[6]} 28 C 990 92, 980 108, 500 108 C 20 108, 10 92, ${CENTRES[0]} 28`}
            className="stroke-accent"
            delay={1}
          />
        </Figure>
      </div>

      <div className="grid grid-cols-2 gap-[6cqw]">
        <Rise delay={1.2}>
          <p className="deck-label font-mono text-ink-subtle">The design principle</p>
          <p className="deck-heading-s mt-[1.2cqw] font-display text-ink">
            The next one should benefit from everything built before it.
          </p>
        </Rise>
        <Rise delay={1.32}>
          <p className="deck-body font-sans text-ink-muted">
            Which is why the connective layer is not a convenience the
            organisation offers its teams. It is the thing being built — the
            products are what it makes possible.
          </p>
        </Rise>
      </div>
    </div>
  );
}
