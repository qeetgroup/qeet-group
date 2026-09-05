import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Lede } from "@/components/ui/Lede";
import { Link } from "@/components/ui/Link";
import { PageAmbient } from "@/components/ui/PageAmbient";
import { FadeRise } from "@/components/motion/FadeRise";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/seo/structured-data";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/meta";

export const metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "Common questions about Qeet Group — how the organisation is structured, which products are available, what we claim about security, and how to reach the right inbox.",
  path: "/company/faq",
});

type FaqGroup = {
  heading: string;
  items: Array<{ question: string; answer: string }>;
};

/*
 * ============================================================================
 * The questions, rewritten
 * ============================================================================
 *
 * The previous set answered a different company. It described a fund-adjacent
 * holding structure ("do you take outside LP capital", "what stage do you
 * back", "do subsidiaries ever fail or get sold"), and its product answers
 * listed protocol names for four paragraphs and quoted a free-tier price.
 *
 * Three rules applied here:
 *
 *   1. Answer the question a visitor actually has, not the one that is
 *      flattering to answer.
 *   2. No protocol names, no pricing. Both belong on the product's own site,
 *      where they can be kept current; a marketing FAQ quoting a price is a
 *      commitment nobody will remember to update.
 *   3. Where the honest answer is "no" or "not yet", say that first.
 *
 * These render into FAQPage structured data, so every answer here is a claim
 * made to a search engine as well as a reader.
 */
const groups: FaqGroup[] = [
  {
    heading: "The organisation",
    items: [
      {
        question: "What is Qeet Group?",
        answer:
          "One technology organisation building a connected ecosystem of software products. The products are built by different teams for different problems, and they share an identity layer, a design foundation, and a set of engineering standards that does not change per product.",
      },
      {
        question: "Is it a holding company?",
        answer:
          "It was described that way early on, and the description undersold what is actually being built. The products here are not independent ventures that happen to share a shareholder — they depend on each other. Signing in once reaches all of them because they use the same identity layer, and that is a technical relationship, not a financial one.",
      },
      {
        question: "Where is Qeet Group based?",
        answer:
          "India, and remote-first in how it works.",
      },
      {
        question: "How many products are there?",
        answer:
          "The products page lists all of them, grouped by what has actually shipped. Rather than quote a number here that will drift, it is worth saying what the number means: only some of them are available today, several are being built, and the rest are specified but not started. Each product page says which it is.",
      },
    ],
  },
  {
    heading: "Products and availability",
    items: [
      {
        question: "Which products can I use today?",
        answer:
          "The products page groups everything by lifecycle — available, in development, and planned — and that grouping is generated from the portfolio rather than written by hand. Anything shown as available is running in production.",
      },
      {
        question: "Why do some products have no link?",
        answer:
          "Because there is nothing to link to yet. A product that is planned or still being built has no site to visit, and pointing at a reserved address that does not resolve would be worse than saying so plainly.",
      },
      {
        question: "What does Qeet ID do?",
        answer:
          "It is how people prove who they are across everything Qeet builds, and how an organisation decides what each person may do once they are in. Sign in once, reach what you are entitled to, and have a record of it afterwards. The detail lives at id.qeet.in.",
      },
      {
        question: "Do the products work independently?",
        answer:
          "Mostly, but that is not the point of them. Each is useful alone; each is more useful alongside the others, because they share the layer that knows who someone is and what they may see.",
      },
    ],
  },
  {
    heading: "Security and trust",
    items: [
      {
        question: "Do you hold security certifications?",
        answer:
          "No. Formal attestation is on the roadmap and is not claimed anywhere on this site. What can be stated is the security baseline every product is built to, which is set out on the security page.",
      },
      {
        question: "How do I report a vulnerability?",
        answer:
          "Write to security@qeet.in. We would rather hear about something uncomfortable early than read about it later.",
      },
    ],
  },
  {
    heading: "Working with us",
    items: [
      {
        question: "Are you hiring?",
        answer:
          "Not through an open process, and there is no roles list. We are in conversations with people who could lead work inside the portfolio. If that is you, write to careers@qeet.in with what you have shipped that you are proud of.",
      },
      {
        question: "How do partnerships work?",
        answer:
          "Write to partnerships@qeet.in with what you have in mind — integrations, distribution, or building something jointly.",
      },
      {
        question: "How long do you take to respond?",
        answer:
          "A few business days for most enquiries. Press usually moves fastest.",
      },
    ],
  },
  {
    heading: "Press and media",
    items: [
      {
        question: "Where do I find logos and brand assets?",
        answer:
          "The press page has the wordmarks, the mark, and a short fact sheet. Please do not recolour the marks or pair them with messaging that misrepresents the organisation.",
      },
      {
        question: "Are interviews and quotes available?",
        answer:
          "Yes. Write to press@qeet.in with the angle, the publication, and the deadline. We try to respond within two business days.",
      },
    ],
  },
];

export default function FaqPage() {
  const allFaqs = groups.flatMap((g) => g.items);

  return (
    <>
      <JsonLd data={faqPageSchema(allFaqs)} />

      {/* Hero */}
      <section className="relative isolate overflow-hidden pb-20 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-32">
        <PageAmbient />
        <Container>
          <FadeRise>
            <Eyebrow className="mb-10 md:mb-14">FAQ</Eyebrow>
          </FadeRise>
          <FadeRise delay={0.1}>
            <h1 className="text-balance font-display text-ink text-display-xl">
              Questions, asked early.
            </h1>
          </FadeRise>
          <FadeRise delay={0.35} className="mt-10 max-w-2xl md:mt-12">
            <Lede>
              The things people ask us most. If you don&rsquo;t see what
              you&rsquo;re looking for,{" "}
              <Link href="/contact" className="text-ink">
                get in touch
              </Link>
              .
            </Lede>
          </FadeRise>
        </Container>
      </section>

      {groups.map((group) => (
        <Section key={group.heading} className="border-t border-rule" padding="tight">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <FadeRise className="md:col-span-4">
              <Eyebrow>{group.heading}</Eyebrow>
            </FadeRise>
            <div className="md:col-span-8 lg:col-span-7">
              <dl>
                {group.items.map((item, i) => (
                  <FadeRise key={item.question}>
                    <div
                      className={cn(
                        "py-8 md:py-10",
                        i !== 0 && "border-t border-rule",
                      )}
                    >
                      <dt className="font-display text-balance text-ink text-heading-m">
                        {item.question}
                      </dt>
                      <dd className="mt-4 max-w-[40rem] text-body text-ink-muted">
                        {item.answer}
                      </dd>
                    </div>
                  </FadeRise>
                ))}
              </dl>
            </div>
          </div>
        </Section>
      ))}

      {/* Still have a question */}
      <Section className="border-t border-rule">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <FadeRise className="md:col-span-4">
            <Eyebrow>Still have a question</Eyebrow>
          </FadeRise>
          <FadeRise className="md:col-span-8 lg:col-span-7">
            <p className="text-body-l text-ink">
              Write to the address that fits best.
            </p>
            <p className="mt-5 max-w-[34rem] text-body text-ink-muted">
              <Link href="mailto:partnerships@qeet.in" className="text-ink">
                partnerships@qeet.in
              </Link>{" "}
              for partnership or commercial conversations.{" "}
              <Link href="mailto:press@qeet.in" className="text-ink">
                press@qeet.in
              </Link>{" "}
              for media. Anything else,{" "}
              <Link href="/contact" className="text-ink">
                use the contact form
              </Link>{" "}
              and we&rsquo;ll route it to the right person.
            </p>
          </FadeRise>
        </div>
      </Section>
    </>
  );
}
