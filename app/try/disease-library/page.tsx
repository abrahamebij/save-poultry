"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { diseases } from "@/lib/diseases";
import { RiSearchLine, RiVirusLine, RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const severityConfig = {
  mild: { cls: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
  serious: { cls: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  critical: { cls: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
};

const typeColors: Record<string, string> = {
  Viral: "bg-purple-50 text-purple-700 border-purple-200",
  Bacterial: "bg-blue-50 text-blue-700 border-blue-200",
  Parasitic: "bg-orange-50 text-orange-700 border-orange-200",
  Fungal: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Nutritional: "bg-teal-50 text-teal-700 border-teal-200",
};

const filters = ["All", "Viral", "Bacterial", "Parasitic", "Fungal", "mild", "serious", "critical"];

export default function DiseaseLibraryPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = diseases.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.symptoms.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchFilter =
      activeFilter === "All" || d.type === activeFilter || d.severity === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">Disease Library</p>
          <h1 className="font-display text-4xl font-800 text-text">Know your enemy</h1>
          <p className="mt-3 text-muted max-w-xl">
            A complete reference for the most common and dangerous poultry diseases — symptoms, causes, treatment, and prevention.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 pb-24">
        {/* Search + filter */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
            <RiSearchLine size={17} className="shrink-0 text-subtle" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by disease name or symptom…"
              className="flex-1 bg-transparent text-sm text-text placeholder:text-subtle outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-500 transition-colors capitalize ${
                  activeFilter === f
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-muted hover:border-primary-mid hover:text-text"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <p className="text-xs text-subtle">{filtered.length} disease{filtered.length !== 1 ? "s" : ""} found</p>
        </div>

        {/* Disease list */}
        <div className="space-y-3">
          {filtered.map((disease) => {
            const isOpen = expandedId === disease.id;
            const { cls, dot } = severityConfig[disease.severity];

            return (
              <motion.div
                key={disease.id}
                layout
                className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
              >
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(isOpen ? null : disease.id)}
                  className="flex w-full items-center gap-4 p-5 text-left hover:bg-surface-2 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                    <RiVirusLine size={18} className="text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-display font-700 text-text">{disease.name}</p>
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-500 ${cls}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                        {disease.severity}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-[11px] font-500 ${typeColors[disease.type]}`}>
                        {disease.type}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted line-clamp-1">{disease.description}</p>
                  </div>

                  {isOpen ? (
                    <RiArrowUpSLine size={18} className="shrink-0 text-subtle" />
                  ) : (
                    <RiArrowDownSLine size={18} className="shrink-0 text-subtle" />
                  )}
                </button>

                {/* Expanded content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-border px-5 pb-6 pt-5 grid gap-5 md:grid-cols-2">
                        {/* Meta */}
                        <div className="md:col-span-2 grid grid-cols-3 gap-3">
                          {[
                            { label: "Incubation", val: disease.incubation },
                            { label: "Mortality", val: disease.mortality },
                            { label: "Affects", val: disease.affectedSpecies.slice(0, 2).join(", ") },
                          ].map((m) => (
                            <div key={m.label} className="rounded-xl bg-surface-2 p-3">
                              <p className="text-[11px] text-subtle uppercase tracking-wider">{m.label}</p>
                              <p className="mt-0.5 text-sm font-500 text-text">{m.val}</p>
                            </div>
                          ))}
                        </div>

                        {/* Symptoms */}
                        <div>
                          <p className="mb-2 text-xs font-500 uppercase tracking-wider text-muted">Symptoms</p>
                          <ul className="space-y-1">
                            {disease.symptoms.map((s) => (
                              <li key={s} className="flex items-start gap-2 text-sm text-text">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Visual Signs */}
                        <div>
                          <p className="mb-2 text-xs font-500 uppercase tracking-wider text-muted">Visual Signs</p>
                          <ul className="space-y-1">
                            {disease.visualSigns.map((s) => (
                              <li key={s} className="flex items-start gap-2 text-sm text-text">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Transmission */}
                        <div>
                          <p className="mb-2 text-xs font-500 uppercase tracking-wider text-muted">Transmission</p>
                          <ul className="space-y-1">
                            {disease.transmission.map((s) => (
                              <li key={s} className="flex items-start gap-2 text-sm text-text">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Treatment */}
                        <div>
                          <p className="mb-2 text-xs font-500 uppercase tracking-wider text-muted">Treatment</p>
                          <ul className="space-y-1">
                            {disease.treatment.map((s) => (
                              <li key={s} className="flex items-start gap-2 text-sm text-text">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prevention */}
                        <div className="md:col-span-2">
                          <p className="mb-2 text-xs font-500 uppercase tracking-wider text-muted">Prevention</p>
                          <div className="flex flex-wrap gap-2">
                            {disease.prevention.map((p) => (
                              <span key={p} className="rounded-lg border border-primary-mid bg-primary-light px-3 py-1 text-xs text-primary">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-border bg-surface p-12 text-center">
              <p className="font-display text-lg font-700 text-text">No diseases found</p>
              <p className="mt-2 text-sm text-muted">Try a different search term or filter</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}