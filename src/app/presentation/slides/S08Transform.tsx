import { Chain, Lines, Rise, SlideMark } from "./primitives";
import type { SlideProps } from "./types";

/**
 * Slide 08 — Transform.
 *
 * The strongest slide in the deck, and the one that earns the largest type
 * outside the two bookends.
 *
 * The chain carries the argument through presence rather than through labels.
 * Everything before the threshold is set in faint ink; the threshold itself is
 * a full-height accent rule; everything after it is full ink. The reader sees
 * where reality starts before reading a word of it, and because the ladder is
 * one of prominence rather than hue, it survives greyscale and a projector
 * with a broken colour profile.
 *
 * Only one stage sits past the threshold. That asymmetry is the point: four
 * of these five states are work, and one of them is a result.
 */
const STAGES = [
  { label: "Idea", note: "Worth writing down." },
  { label: "Research", note: "Worth understanding properly." },
  { label: "Prototype", note: "Worth testing." },
  { label: "Development", note: "Worth building." },
  { label: "Production", note: "Built, deployed, used, measured, improved." },
];

export function S08Transform({ index }: SlideProps) {
  return (
    <div className="deck-slide justify-between">
      <SlideMark index={index} label="Transform" />

      <Lines
        as="h2"
        lines={["Vision is decoration", "until it ships."]}
        className="deck-display max-w-[74cqw] font-display text-ink"
      />

      <div>
        <Rise delay={0.3}>
          <p className="deck-label font-mono text-ink-subtle">
            Everything to the left of the rule is work. Only what is to its
            right is a result.
          </p>
        </Rise>
        <Chain stages={STAGES} thresholdAfter={3} className="mt-[2cqw]" />
      </div>

      <div className="grid grid-cols-2 gap-[6cqw]">
        <Rise delay={0.86}>
          <p className="deck-heading-s font-display text-ink">
            Reality must be distinguished from aspiration.
          </p>
        </Rise>
        <Rise delay={0.98}>
          <p className="deck-body font-sans text-ink-muted">
            A roadmap entry may not be cited as a shipped capability. It is a
            rule about language, and it is enforced rather than encouraged —
            which is the only version of such a rule that survives a quarter
            under pressure.
          </p>
        </Rise>
      </div>
    </div>
  );
}
