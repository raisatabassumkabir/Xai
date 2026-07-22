import { HeroSection } from "@/components/sections/HeroSection";
import { InsightFlowSection } from "@/components/sections/InsightFlowSection";
import { SignatureInteractionSection } from "@/components/sections/SignatureInteractionSection";
import { DashboardPreviewSection } from "@/components/sections/DashboardPreviewSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative bg-background text-foreground">
      <HeroSection />
      <InsightFlowSection />
      <SignatureInteractionSection />
      <DashboardPreviewSection />
    </main>
  );
}
