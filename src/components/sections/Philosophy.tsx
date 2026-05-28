import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { PhilosophyBlock } from "../ui/PhilosophyBlock";
import { FadeRise } from "../motion/FadeRise";

const blocks = [
  {
    letter: "Q" as const,
    word: "Question",
    headline: "Progress begins with the right question.",
    body: "We challenge conventional wisdom, isolate the problems that matter, and seek the deeper understanding most teams skip past in their rush to ship. The discipline of asking well is rarer than it sounds — and it changes what counts as a good answer.",
  },
  {
    letter: "E" as const,
    word: "Exploration",
    headline: "Curiosity, made operational.",
    body: "Research, experimentation, and the patient discovery of methods that haven't been tried in our domain yet. Exploration is the practice that keeps an organization's answers from getting stale — and the one most organizations starve when they get serious about scale.",
  },
  {
    letter: "E" as const,
    word: "Envision",
    headline: "Designing for what compounds.",
    body: "We work toward bold, specific futures, not just next-quarter targets. A clear vision is what tells you which trade-offs are temporary, which ones compound, and which ones quietly determine the kind of company you're going to be.",
  },
  {
    letter: "T" as const,
    word: "Transformation",
    headline: "Vision is decoration until it ships.",
    body: "Building the things that reshape industries and improve lives — and then actually shipping them. Vision without execution is decoration; execution without vision is wasted motion. The point is to deliver the future you said you'd build, on the timeline you said you'd build it.",
  },
];

export function Philosophy() {
  return (
    <Section id="philosophy">
      <FadeRise>
        <Eyebrow>The Philosophy</Eyebrow>
      </FadeRise>
      <div className="mt-12 md:mt-20">
        {blocks.map((block, i) => (
          <FadeRise key={block.word}>
            <PhilosophyBlock {...block} isFirst={i === 0} />
          </FadeRise>
        ))}
      </div>
    </Section>
  );
}
