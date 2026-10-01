import { byRole } from "../portfolio";
import {
  Figure,
  Item,
  Rise,
  Slide,
  SlideBody,
  SlideFooter,
  SlideHeader,
  Stagger,
  Stroke,
} from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 08 — shared foundations.
 *
 * A two-layer figure: products on top, foundations beneath, arrows pointing
 * DOWN only. Dependency direction is the argument (ARCHITECTURE.md §5:
 * "Dependencies point toward the platform, and never back"), so there is no
 * arrow in the other direction anywhere on the slide.
 *
 * The fifth product is an outline — "the next product" — because the case
 * for building foundations once is about the products that do not exist yet.
 *
 * The footer states the model as what it is: an organisation standard that
 * products adopt, not a claim that every product already composes all four.
 * Only Qeet ID is depended on by everything today; Qeetrix covers almost every
 * front-end; Notify and Logs are "widely but not universally" used.
 *
 * Geometry: five chips on a 5-up grid with a 2.4cqw gap have centres at 7.8,
 * 25.8, 43.8, 61.8 and 79.8cqw of the 87.6cqw content box — x=78…798 in the
 * figure's 876-unit viewBox.
 */
const FOUNDATION_LINE: Record<string, string> = {
  "qeet-id": "Sign-in for Qeet products, through OIDC.",
  qeetrix: "The design-system standard for front-ends.",
  "qeet-notify": "Email, SMS, WhatsApp, push, in-app and webhooks.",
  "qeet-logs": "Privacy-first logs, metrics, traces and audit.",
};

const CENTRES = [78, 258, 438, 618, 798];

export function S08Foundations({ index }: SlideProps) {
  const products = byRole("domain");
  const foundations = byRole("foundation");

  return (
    <Slide>
      <SlideHeader
        index={index}
        label="Shared foundations"
        title={["Build foundations once.", "Let products build on them."]}
        accentIndex={1}
      />

      <SlideBody>
        <Stagger as="ul" delay={0.3} className="grid grid-cols-5 gap-[2.4cqw]">
          {products.map((p) => (
            <Item
              as="li"
              key={p.slug}
              className="border border-rule-strong px-[1.2cqw] py-[0.9cqw] text-center"
            >
              <span className="deck-body-s font-display text-ink-muted">{p.name}</span>
            </Item>
          ))}
          <Item
            as="li"
            className="border border-dashed border-rule-strong px-[1.2cqw] py-[0.9cqw] text-center"
          >
            <span className="deck-body-s font-sans text-ink-subtle">The next product</span>
          </Item>
        </Stagger>

        <Figure viewBox="0 0 876 40" className="h-[4cqw] w-full">
          {CENTRES.map((x, i) => (
            <g key={x}>
              <Stroke
                d={`M ${x} 3 L ${x} 33`}
                className="stroke-ink-subtle"
                dashed={i === CENTRES.length - 1}
                delay={0.55 + i * 0.06}
              />
              <Stroke
                d={`M ${x - 5} 28 L ${x} 34 L ${x + 5} 28`}
                className="stroke-ink-subtle"
                delay={0.85 + i * 0.06}
              />
            </g>
          ))}
        </Figure>

        <Rise delay={0.9}>
          <ul className="grid grid-cols-4 gap-[2.4cqw] border-t border-ink-muted pt-[1.5cqw]">
            {foundations.map((f) => (
              <li key={f.slug}>
                <p className="deck-label font-mono text-accent-text">{f.capability}</p>
                <p className="deck-heading-s mt-[0.6cqw] font-display text-ink">{f.name}</p>
                <p className="deck-body-s mt-[0.5cqw] font-sans text-ink-muted">
                  {FOUNDATION_LINE[f.slug]}
                </p>
              </li>
            ))}
          </ul>
        </Rise>
      </SlideBody>

      <SlideFooter delay={1.2}>
        An organisation standard, adopted product by product. A gap gets closed — never
        rebuilt in parallel.
      </SlideFooter>
    </Slide>
  );
}
