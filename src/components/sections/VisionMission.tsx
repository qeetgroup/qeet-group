import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeRise } from "../motion/FadeRise";

export function VisionMission() {
  return (
    <Section className="border-t border-rule">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">
        <FadeRise>
          <article>
            <Eyebrow>Vision</Eyebrow>
            <p className="mt-8 font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[2rem] leading-[1.12] md:mt-10 md:text-[2.5rem] md:leading-[1.14] lg:text-[3rem] lg:leading-[1.16]">
              To create a future of limitless possibilities, where industries and individuals
              thrive through questioning, exploring, and transforming ideas into reality.
            </p>
          </article>
        </FadeRise>
        <FadeRise delay={0.1}>
          <article>
            <Eyebrow>Mission</Eyebrow>
            <p className="mt-8 font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[2rem] leading-[1.12] md:mt-10 md:text-[2.5rem] md:leading-[1.14] lg:text-[3rem] lg:leading-[1.16]">
              To empower people and organizations to adapt, innovate, and transform by embracing
              curiosity, exploration, and future-focused thinking.
            </p>
          </article>
        </FadeRise>
      </div>
    </Section>
  );
}
