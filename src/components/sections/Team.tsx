import { Section } from "../layout/Section";
import { SectionHeader } from "../ui/SectionHeader";
import { Link } from "../ui/Link";
import { FadeRise } from "../motion/FadeRise";
import { Magnetic } from "../motion/Magnetic";

/**
 * Group-level team teaser. Honest for a young, pre-launch holding — the team
 * is still forming, so this invites rather than fabricating people/photos.
 */
export function Team() {
  return (
    <Section className="border-t border-rule">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
        <FadeRise className="md:col-span-5">
          <SectionHeader index="06" eyebrow="The Team" title="The people behind the bet." />
        </FadeRise>
        <FadeRise delay={0.1} className="md:col-span-7 lg:col-span-6">
          <p className="text-body-l text-ink">
            A small, senior team runs the group itself — not the products. We set the philosophy,
            hold the quality bar, and back the operators who build each company.
          </p>
          <p className="mt-5 max-w-[34rem] text-body text-ink-muted">
            We&rsquo;ll introduce everyone as the team comes together. If you&rsquo;re a senior
            operator who thinks in decades, there&rsquo;s room to build here.
          </p>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:gap-10">
            <Magnetic strength={0.4}>
              <Link href="/team" variant="arrow" className="text-body text-ink">
                Meet the team
              </Link>
            </Magnetic>
            <Magnetic strength={0.4}>
              <Link href="/careers" variant="arrow" className="text-body text-ink">
                See open roles
              </Link>
            </Magnetic>
          </div>
        </FadeRise>
      </div>
    </Section>
  );
}
