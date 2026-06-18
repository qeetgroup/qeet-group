import { Hero } from "@/components/sections/Hero";
import { ProductsBento } from "@/components/sections/ProductsBento";
import { HowWeBuild } from "@/components/sections/HowWeBuild";
import { Structure } from "@/components/sections/Structure";
import { Philosophy } from "@/components/sections/Philosophy";
import { VisionMission } from "@/components/sections/VisionMission";
import { OurStory } from "@/components/sections/OurStory";
import { ProofMetrics } from "@/components/sections/ProofMetrics";
import { FoundersNote } from "@/components/sections/FoundersNote";
import { Team } from "@/components/sections/Team";
import { HomeFaq } from "@/components/sections/HomeFaq";
import { NewsroomPreview } from "@/components/sections/NewsroomPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <ProductsBento />
      <VisionMission />
      <HowWeBuild />
      <Structure />
      <OurStory />
      <ProofMetrics />
      <FoundersNote />
      <Team />
      <HomeFaq />
      <NewsroomPreview />
      <ClosingCTA />
    </>
  );
}
