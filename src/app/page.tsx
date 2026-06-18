import { Hero } from "@/components/sections/Hero";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { ProductsBento } from "@/components/sections/ProductsBento";
import { Platform } from "@/components/sections/Platform";
import { Philosophy } from "@/components/sections/Philosophy";
import { VisionMission } from "@/components/sections/VisionMission";
import { ProofMetrics } from "@/components/sections/ProofMetrics";
import { EditorialQuote } from "@/components/sections/EditorialQuote";
import { NewsroomPreview } from "@/components/sections/NewsroomPreview";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <ProductsBento />
      <Platform />
      <Philosophy />
      <VisionMission />
      <ProofMetrics />
      <EditorialQuote />
      <NewsroomPreview />
      <ClosingCTA />
    </>
  );
}
