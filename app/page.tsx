import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import ImpactMetrics from "@/components/landing/ImpactMetrics";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-hidden">
      <HeroSection />
      <HowItWorks />
      <ImpactMetrics />
    </main>
  );
}
