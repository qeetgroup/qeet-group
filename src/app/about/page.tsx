import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { FadeRise } from "@/components/motion/FadeRise";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Qeet Group is a multi-company holding built to start, support, and grow companies that take long-term bets on questions worth answering.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Ask better, before answering.",
    body: "We treat the early framing of a problem as the highest-leverage work. Get the question right and the answer eventually finds us; get it wrong and we will execute well in the wrong direction for years. So we slow down at the start.",
  },
  {
    title: "Build for compound returns.",
    body: "We avoid work whose value peaks at launch. Every company is structured to keep getting better — at its product, at its operating discipline, at its understanding of who it serves — for at least a decade. We optimize for the curve, not the spike.",
  },
  {
    title: "Take quality personally.",
    body: "The standards we ship to are not abstract or aspirational. They are the standards we would want a competitor to be held to. If something is not good enough, we say so plainly, in writing, and fix it before anything else.",
  },
  {
    title: "Trust the operator.",
    body: "Subsidiaries have meaningful autonomy. We provide capital, a philosophy, a network, and a quality bar — and then we get out of the way. Our job is to be the kind of holding company we would want backing us if we were running the company.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">About Qeet Group</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-serif font-normal tracking-[-0.015em] text-ink text-[2.75rem] leading-[1.05] sm:text-[3.5rem] md:text-[4.5rem] md:leading-[1.04] lg:text-[5.5rem] lg:leading-[1.02]">
              A holding company for ideas that compound.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              Qeet Group is a multi-company holding built to start, support, and grow companies
              that take long-term bets on questions worth answering. We are organized around
              the conviction that meaningful progress begins with the right question, asked
              early — and the patience to chase the answer for years.
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {/* Why we exist */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Why we exist</Eyebrow>
          </FadeRise>
          <div className="md:col-span-8 lg:col-span-7">
            <FadeRise>
              <p className="text-body-l text-ink">
                Most great companies fail not because the execution was wrong, but because the
                original question was too small. We started Qeet Group to back the opposite —
                companies that begin from genuinely ambitious questions and have the patience
                to chase the answers across years, not quarters. That patience is a structural
                commitment, not a stylistic one.
              </p>
            </FadeRise>
            <FadeRise delay={0.1}>
              <p className="mt-7 text-body text-ink-muted">
                A holding structure lets us treat each company as a long campaign rather than a
                single product bet. Subsidiaries share a philosophy, a quality standard, and a
                refusal to ship work the team cannot be proud of. They do not share a roadmap,
                an org chart, or a thesis. Each company is built for what it is.
              </p>
            </FadeRise>
            <FadeRise delay={0.2}>
              <p className="mt-6 text-body text-ink-muted">
                The work we want to fund is the work that is hard to fund elsewhere — products
                that need a few years before they look like products, and teams that need an
                operating environment that values the question more than the quarter. We are
                building Qeet Group so that work has a home.
              </p>
            </FadeRise>
          </div>
        </div>
      </Section>

      {/* How we work */}
      <Section className="border-t border-rule">
        <FadeRise>
          <Eyebrow>How we work</Eyebrow>
        </FadeRise>
        <ol className="mt-12 md:mt-20">
          {principles.map((p, i) => (
            <FadeRise key={p.title}>
              <li
                className={cn(
                  "grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:gap-8 md:py-14",
                  i !== 0 && "border-t border-rule",
                )}
              >
                <div className="md:col-span-3 lg:col-span-2">
                  <span className="block font-serif font-normal leading-none text-ink-subtle text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="md:col-span-9 lg:col-span-9 lg:col-start-4">
                  <h3 className="mb-3 font-sans font-medium text-[1.25rem] leading-[1.3] text-ink md:text-[1.5rem] md:leading-[1.3]">
                    {p.title}
                  </h3>
                  <p className="max-w-[34rem] text-body text-ink-muted">{p.body}</p>
                </div>
              </li>
            </FadeRise>
          ))}
        </ol>
      </Section>

      {/* Leadership */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Leadership</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              The team will be announced as it comes together.{" "}
              <Link href="/team" className="text-ink">
                More on the team
              </Link>
              .
            </p>
            <p className="mt-5 text-body text-ink-muted">
              If you are a senior operator considering joining a young multi-company holding,
              write to{" "}
              <a
                href="mailto:careers@qeet.in"
                className="text-ink underline decoration-current/30 decoration-[1px] underline-offset-[5px] transition-[text-decoration-color] hover:decoration-brand"
              >
                careers@qeet.in
              </a>
              .
            </p>
          </FadeRise>
        </div>
      </Section>

      {/* Pull-quote */}
      <Section className="border-t border-rule">
        <FadeRise>
          <figure>
            <blockquote className="font-serif italic font-normal text-balance text-ink text-[2rem] leading-[1.2] md:text-[2.75rem] md:leading-[1.16] lg:text-[3.5rem] lg:leading-[1.12]">
              &ldquo;The right question, asked early, makes most of what follows obvious.&rdquo;
            </blockquote>
          </figure>
        </FadeRise>
      </Section>
    </>
  );
}
