import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import StatsBar from "@/components/landing/StatsBar";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import DiseaseTicker from "@/components/landing/DiseaseTicker";
import CTASection from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <StatsBar />
      <FeaturesGrid />
      <DiseaseTicker />
      <CTASection />
      <Footer />
    </div>
  );
}
