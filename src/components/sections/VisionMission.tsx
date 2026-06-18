import { Section } from "../layout/Section";
import { Eyebrow } from "../ui/Eyebrow";
import { FadeRise } from "../motion/FadeRise";
import { Parallax } from "../motion/Parallax";
import { Spotlight } from "../motion/Spotlight";

const statementClass =
  "mt-8 font-serif font-normal text-balance tracking-[-0.01em] text-ink text-[1.75rem] leading-[1.14] sm:text-[2rem] md:mt-10 md:text-[2.5rem] md:leading-[1.16] lg:text-[2.75rem] xl:text-[3rem] lg:leading-[1.18]";

export function VisionMission() {
  return (
    <Section className="border-t border-rule">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <FadeRise>
          <Spotlight
            color="color-mix(in oklab, var(--color-brand) 12%, transparent)"
            className="h-full rounded-3xl"
          >
            <article className="glass-panel h-full rounded-3xl p-8 md:p-10 lg:p-12">
              <Eyebrow>Vision</Eyebrow>
              <p className={statementClass}>
                To create a future of limitless possibilities, where industries and individuals
                thrive through questioning, exploring, and transforming ideas into reality.
              </p>
            </article>
          </Spotlight>
        </FadeRise>

        <FadeRise delay={0.1}>
          <Parallax offset={22} className="h-full">
            <Spotlight
              color="color-mix(in oklab, var(--color-brand) 12%, transparent)"
              className="h-full rounded-3xl"
            >
              <article className="glass-panel h-full rounded-3xl p-8 md:p-10 lg:p-12">
                <Eyebrow>Mission</Eyebrow>
                <p className={statementClass}>
                  To empower people and organizations to adapt, innovate, and transform by embracing
                  curiosity, exploration, and future-focused thinking.
                </p>
              </article>
            </Spotlight>
          </Parallax>
        </FadeRise>
      </div>
    </Section>
  );
}
