import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StepsSection from "@/components/how-it-works/StepsSection";
import DiseasesSection from "@/components/how-it-works/DiseasesSection";
import WhoIsItFor from "@/components/how-it-works/WhoIsItFor";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page header */}
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary-light opacity-40 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-500 uppercase tracking-[0.15em] text-primary">
              How SavePoultry Works
            </p>
            <h1 className="font-display text-5xl font-800 leading-tight text-text">
              From photo to diagnosis
              <br />
              in under 30 seconds
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              SavePoultry combines Google Gemini&apos;s vision AI with deep
              poultry medicine knowledge to give you fast, structured,
              actionable diagnoses — right from your browser.
            </p>
          </div>
        </div>
      </section>

      <StepsSection />
      <DiseasesSection />
      <WhoIsItFor />
      <Footer />
    </div>
  );
}
