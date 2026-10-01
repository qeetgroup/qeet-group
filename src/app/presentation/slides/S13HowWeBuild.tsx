import { Item, Slide, SlideBody, SlideHeader, Stagger } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 13 — how Qeet builds.
 *
 * The philosophy as operating practice: five habits, one line each, no
 * repository-level rules. Each is a principle the organisation's context
 * states in its own words — evidence over confident documentation, security
 * as the policy that outranks everything, contracts over shortcuts, and the
 * rule that a roadmap entry is never cited as a shipped capability.
 *
 * The fifth is "learn from real use", not "learn from production": the second
 * would quietly imply every product is deployed, and several are not.
 */
const PRACTICES = [
  {
    name: "Question with evidence",
    line: "Claims change when the evidence changes.",
  },
  {
    name: "Secure by design",
    line: "Authentication, authorisation and tenant isolation, from the start.",
  },
  {
    name: "Explicit contracts",
    line: "Products meet through published APIs, packages and events.",
  },
  {
    name: "Ship reality",
    line: "A roadmap item is never presented as a shipped capability.",
  },
  {
    name: "Learn from real use",
    line: "Build, deploy, observe, learn — and ask the next question.",
  },
];

export function S13HowWeBuild({ index }: SlideProps) {
  return (
    <Slide>
      <SlideHeader
        index={index}
        label="How Qeet builds"
        title={["The philosophy,", "as operating practice."]}
        accentIndex={1}
      />

      <SlideBody>
        <Stagger as="ol" delay={0.3}>
          {PRACTICES.map((p, i) => (
            <Item
              as="li"
              key={p.name}
              className="deck-grid items-baseline border-t border-rule-strong py-[1.05cqw] last:border-b"
            >
              <span className="deck-label tabular-figures col-span-1 font-mono text-ink-subtle">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="deck-heading-s col-span-4 font-display text-ink">{p.name}</span>
              <span className="deck-body-s col-span-7 font-sans text-ink-muted">{p.line}</span>
            </Item>
          ))}
        </Stagger>
      </SlideBody>
    </Slide>
  );
}
