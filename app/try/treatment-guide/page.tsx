"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { diseases } from "@/lib/diseases";
import {
  RiMedicineBottleLine,
  RiSearchLine,
  RiArrowRightLine,
  RiTimeLine,
  RiAlertLine,
  RiShieldCheckLine,
} from "react-icons/ri";

interface TreatmentProtocol {
  disease: string;
  urgency: "routine" | "urgent" | "emergency";
  isolation: string;
  medications: { name: string; dosage: string; duration: string }[];
  supportiveCare: string[];
  recoveryTimeline: string;
  whenToCallVet: string[];
  fullText: string;
}

async function fetchTreatment(query: string): Promise<TreatmentProtocol> {
  const res = await fetch("/api/treatment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const body = await res.json();

  // Surface server-side error messages directly
  if (!res.ok) {
    throw new Error(body?.error ?? "Failed to generate treatment guide.");
  }

  try {
    const parsed = JSON.parse(body.text);
    return { ...parsed, fullText: body.text };
  } catch {
    throw new Error(
      "Could not parse the treatment protocol. Please try again.",
    );
  }
}

const urgencyConfig = {
  routine: {
    label: "Routine",
    cls: "bg-green-100 text-green-700 border-green-200",
  },
  urgent: {
    label: "Urgent",
    cls: "bg-amber-100 text-amber-700 border-amber-200",
  },
  emergency: {
    label: "Emergency",
    cls: "bg-red-100 text-red-700 border-red-200",
  },
};

const suggestions = diseases.map((d) => d.name);

export default function TreatmentGuidePage() {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const {
    mutate: getProtocol,
    data: protocol,
    isPending,
    reset,
    error,
  } = useMutation({
    mutationFn: fetchTreatment,
  });

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(query.toLowerCase()) && query.length > 0,
  );

  function handleSearch() {
    if (!query.trim()) return;
    setShowSuggestions(false);
    reset();
    getProtocol(query.trim());
  }

  function handleSuggestion(name: string) {
    setQuery(name);
    setShowSuggestions(false);
    reset();
    getProtocol(name);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">
            Treatment Guide
          </p>
          <h1 className="font-display text-4xl font-800 text-text">
            AI Treatment Protocols
          </h1>
          <p className="mt-3 text-muted">
            Enter a disease name or symptom and get a complete AI-generated
            treatment protocol — medications, dosage, isolation, and recovery
            timeline.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        {/* Search */}
        <div className="relative mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <RiSearchLine size={17} className="shrink-0 text-subtle" />
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                    reset();
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="e.g. Newcastle Disease, bloody droppings, leg paralysis…"
                  className="flex-1 bg-transparent text-sm text-text placeholder:text-subtle outline-none"
                />
              </div>

              {/* Autocomplete */}
              <AnimatePresence>
                {showSuggestions && filtered.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className="absolute top-full left-0 right-0 z-20 mt-1 overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
                  >
                    {filtered.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleSuggestion(s)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-text hover:bg-surface-2 transition-colors"
                      >
                        <RiMedicineBottleLine
                          size={14}
                          className="shrink-0 text-primary"
                        />
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={handleSearch}
              disabled={!query.trim() || isPending}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-500 text-white shadow-sm transition-all hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPending ? "Generating…" : "Get Protocol"}
              {!isPending && <RiArrowRightLine size={15} />}
            </button>
          </div>

          {/* Quick suggestions */}
          {!protocol && !isPending && (
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="w-full text-xs text-subtle mb-1">
                Common searches:
              </p>
              {[
                "Newcastle Disease",
                "Coccidiosis",
                "Marek's Disease",
                "Fowl Pox",
                "Bumblefoot",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-muted hover:border-primary-mid hover:text-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Loading */}
        {isPending && (
          <div className="flex flex-col items-center gap-4 py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" />
            <p className="text-sm text-muted">
              Generating treatment protocol for{" "}
              <strong className="text-text">{query}</strong>…
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
            {(error as Error).message}
          </div>
        )}

        {/* Result */}
        <AnimatePresence>
          {protocol && !isPending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">
                    Treatment Protocol
                  </p>
                  <h2 className="font-display text-2xl font-800 text-text">
                    {protocol.disease}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-500 ${urgencyConfig[protocol.urgency].cls}`}
                >
                  <RiAlertLine size={12} />
                  {urgencyConfig[protocol.urgency].label}
                </span>
              </div>

              {/* Isolation */}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-500 uppercase tracking-wider text-amber-700">
                  <RiAlertLine size={12} /> Isolation Instructions
                </p>
                <p className="text-sm text-amber-800">{protocol.isolation}</p>
              </div>

              {/* Medications */}
              {protocol.medications.length > 0 && (
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <p className="mb-4 flex items-center gap-1.5 text-xs font-500 uppercase tracking-wider text-muted">
                    <RiMedicineBottleLine size={12} /> Medications
                  </p>
                  <div className="space-y-3">
                    {protocol.medications.map((med, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 rounded-xl bg-surface-2 p-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-700 text-white">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-500 text-text">{med.name}</p>
                          <p className="text-sm text-muted">{med.dosage}</p>
                          <p className="mt-1 flex items-center gap-1 text-xs text-subtle">
                            <RiTimeLine size={11} /> {med.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supportive care + recovery */}
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <p className="mb-3 text-xs font-500 uppercase tracking-wider text-muted">
                    Supportive Care
                  </p>
                  <ul className="space-y-2">
                    {protocol.supportiveCare.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-text"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-surface p-6">
                  <p className="mb-3 text-xs font-500 uppercase tracking-wider text-muted">
                    Recovery Timeline
                  </p>
                  <p className="text-sm leading-relaxed text-text">
                    {protocol.recoveryTimeline}
                  </p>
                </div>
              </div>

              {/* When to call vet */}
              <div className="rounded-2xl border border-primary-mid bg-primary-light p-6">
                <p className="mb-3 flex items-center gap-1.5 text-xs font-500 uppercase tracking-wider text-primary">
                  <RiShieldCheckLine size={12} /> Call a Vet If…
                </p>
                <ul className="space-y-2">
                  {protocol.whenToCallVet.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-primary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-subtle text-center pt-2">
                AI-generated protocol. Always confirm with a licensed
                veterinarian before treating.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}