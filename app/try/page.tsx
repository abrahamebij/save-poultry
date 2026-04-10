import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import TryHubCards from "@/components/try/TryHubCards";

export default function TryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden pt-28 pb-12">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary-light opacity-40 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-xs font-500 uppercase tracking-[0.15em] text-primary">
            SavePoultry Tools
          </p>
          <h1 className="font-display text-5xl font-800 leading-tight text-text">
            Everything your flock needs
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            AI-powered tools built specifically for poultry health — from instant diagnosis to disease knowledge and treatment guides.
          </p>
        </div>
      </section>

      <TryHubCards />
      <Footer />
    </div>
  );
}