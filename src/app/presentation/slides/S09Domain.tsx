import { STATUS_DEFINITION, byRole } from "../portfolio";
import { Item, Slide, SlideBody, SlideFooter, SlideHeader, Stagger, StatusBadge } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 09 — domain products.
 *
 * The ventures built on the foundations. Every one is `development` in the
 * organisation's registry, and the slide says what that word means in the
 * organisation's own definition rather than leaving the audience to guess
 * whether "in development" is a polite word for "nearly launched".
 *
 * Purposes are the registry's, shortened only to fit a column. Qeet AI is
 * described as an infrastructure layer, never as a chatbot, because that is
 * what the registry says it is and what it says it is not.
 */
export function S09Domain({ index }: SlideProps) {
  const products = byRole("domain");

  return (
    <Slide>
      <SlideHeader
        index={index}
        label="Domain products"
        title={["Each venture takes on", "its domain’s hardest problem."]}
      />

      <SlideBody>
        <Stagger as="ul" delay={0.3} className="grid grid-cols-4 gap-[2.4cqw]">
          {products.map((p) => (
            <Item as="li" key={p.slug} className="border-t border-rule-strong pt-[1.6cqw]">
              <p className="deck-heading font-display text-ink">{p.name}</p>
              <StatusBadge status={p.status} className="mt-[0.9cqw]" />
              <p className="deck-body-s mt-[1.2cqw] font-sans text-ink-muted">{p.purpose}</p>
            </Item>
          ))}
        </Stagger>
      </SlideBody>

      <SlideFooter delay={0.9}>
        <span className="text-ink">Development</span> — {STATUS_DEFINITION.development}
      </SlideFooter>
    </Slide>
  );
}
