import { Hero } from "@/components/sections/Hero";
import { PositionStatement } from "@/components/sections/PositionStatement";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
import { IdentitySection } from "@/components/sections/IdentitySection";
import { TechnologyRail } from "@/components/sections/TechnologyRail";
import { IntelligenceSection } from "@/components/sections/IntelligenceSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { ScaleSection } from "@/components/sections/ScaleSection";
import { InsightPreview } from "@/components/sections/InsightPreview";
import { CompanySection } from "@/components/sections/CompanySection";
import { AudiencePaths } from "@/components/sections/AudiencePaths";
import { buildPageMetadata } from "@/lib/seo/meta";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/site";

export const metadata = buildPageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  titleAbsolute: true,
});

/**
 * ============================================================================
 * The homepage, as an argument
 * ============================================================================
 *
 * Eleven sections, in the order a sceptical visitor needs them:
 *
 *   1  Hero          what this organisation is, over media
 *   2  Position      the claim, set as type — nothing to hide behind
 *   3  Ecosystem     the proof of the claim, and the signature interaction
 *   4  Identity      why the ecosystem holds together at all
 *   5  Technology    the capability spread, as a rail rather than six cards
 *   6  Intelligence  the AI story, told as infrastructure not as a chatbot
 *   7  Trust         how we build and what we protect — principles, not badges
 *   8  Scale         the numbers, each carrying its source
 *   9  Insights      evidence of a point of view
 *   10 Company       who is behind it
 *   11 Audience      six ways out, one per visitor
 *
 * The ordering choice worth defending: the ecosystem comes third, immediately
 * after the claim, rather than being saved for later. Everything after it only
 * means something once a visitor understands that these products compose one
 * another — that is the difference between Qeet and a company with a lot of
 * tabs, and it should not be discovered halfway down the page.
 *
 * Products are NOT enumerated here. Sixteen product pitches on a homepage is a
 * catalogue; the navigation and /products exist for that.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PositionStatement />
      <EcosystemSection />
      <IdentitySection />
      <TechnologyRail />
      <IntelligenceSection />
      <TrustSection />
      <ScaleSection />
      <InsightPreview />
      <CompanySection />
      <AudiencePaths />
    </>
  );
}
