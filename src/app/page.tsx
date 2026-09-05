import { Hero } from "@/components/sections/Hero";
import { PositionStatement } from "@/components/sections/PositionStatement";
import { EcosystemSection } from "@/components/sections/EcosystemSection";
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
 * Seven sections, in the order a corporate visitor needs them:
 *
 *   1  Hero          the organisation's ambition, over media
 *   2  Position      what kind of company Qeet is
 *   3  Ecosystem     the portfolio and its signature interaction
 *   4  Company       the point of view behind the work
 *   5  Scale         the portfolio facts, each carrying its source
 *   6  Insights      evidence of an active corporate voice
 *   7  Audience      a useful next step for every visitor
 *
 * Product architecture, AI, security and engineering retain dedicated routes.
 * Putting each explanation on the homepage made the organisation read like a
 * product specification; this page now establishes the group before offering
 * deeper technical paths through navigation and search.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PositionStatement />
      <EcosystemSection />
      <CompanySection />
      <ScaleSection />
      <InsightPreview />
      <AudiencePaths />
    </>
  );
}
