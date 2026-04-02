"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RiCameraLine,
  RiChat3Line,
  RiMedicineBottleLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiLeafLine,
  RiGroupLine,
  RiAlertLine,
} from "react-icons/ri";
import Navbar from "@/components/Navbar";

const steps = [
  {
    number: "01",
    icon: RiCameraLine,
    title: "Upload a Photo",
    desc: "Take a clear photo of your sick bird — whole body or close-up of affected area. Our AI reads feather condition, eye clarity, comb color, posture, and more.",
    tip: "Good lighting + whole bird in frame = best results",
  },
  {
    number: "02",
    icon: RiChat3Line,
    title: "Chat with Dr. Cluck",
    desc: "Dr. Cluck will ask smart follow-up questions — how long has the bird been sick? Are other birds affected? Have you noticed changes in droppings or egg production?",
    tip: "The more you share, the more accurate the diagnosis",
  },
  {
    number: "03",
    icon: RiMedicineBottleLine,
    title: "Get Your Diagnosis",
    desc: "Receive a full breakdown: disease name, confidence %, severity level, symptom explanation, and a step-by-step treatment or action plan.",
    tip: "Results in under 30 seconds",
  },
];

const diseases = [
  { name: "Newcastle Disease", severity: "critical", desc: "Viral — respiratory distress, twisted neck, high mortality" },
  { name: "Marek's Disease", severity: "serious", desc: "Viral — paralysis, weight loss, tumors" },
  { name: "Coccidiosis", severity: "serious", desc: "Parasitic — bloody droppings, lethargy, ruffled feathers" },
  { name: "Avian Influenza", severity: "critical", desc: "Viral — swollen head, sudden death, cyanotic comb" },
  { name: "Infectious Bronchitis", severity: "serious", desc: "Viral — gasping, nasal discharge, drop in egg production" },
  { name: "Fowl Pox", severity: "mild", desc: "Viral — wart-like lesions on skin and comb" },
  { name: "Salmonellosis", severity: "serious", desc: "Bacterial — diarrhea, weakness, sudden death in chicks" },
  { name: "Aspergillosis", severity: "serious", desc: "Fungal — respiratory distress, gasping, listlessness" },
];

const severityColors: Record<string, string> = {
  mild: "bg-green-100 text-green-700",
  serious: "bg-amber-100 text-amber-700",
  critical: "bg-red-100 text-red-700",
};

const whoCards = [
  { icon: RiLeafLine, title: "Smallholder Farmers", desc: "No vet nearby? Get a fast second opinion before driving hours to a clinic." },
  { icon: RiGroupLine, title: "Commercial Operations", desc: "Catch outbreaks early across large flocks before losses compound." },
  { icon: RiShieldCheckLine, title: "Veterinarians", desc: "Use as a triage tool — let Dr. Cluck handle first-pass screening." },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HEADER ── */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary-light opacity-40 blur-3xl" />
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="mb-3 text-sm font-600 uppercase tracking-wider text-primary">
              How SavePoultry Works
            </p>
            <h1 className="font-display text-5xl font-800 leading-tight text-text">
              From photo to diagnosis in under 30 seconds
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              SavePoultry combines Google Gemini's vision AI with deep poultry medicine knowledge to give you
              fast, structured, actionable diagnoses — right from your phone or browser.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STEPS ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative rounded-2xl border border-border bg-surface p-8"
              >
                {/* Step number */}
                <p className="font-display text-5xl font-800 text-border">{step.number}</p>

                <div className="my-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <step.icon size={24} className="text-primary" />
                </div>

                <h3 className="font-display text-xl font-700 text-text">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>

                <div className="mt-4 rounded-lg bg-surface-2 px-3 py-2 text-xs text-muted">
                  💡 {step.tip}
                </div>

                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-5 top-1/2 hidden -translate-y-1/2 md:flex">
                    <RiArrowRightLine size={20} className="text-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISEASES DETECTED ── */}
      <section className="border-y border-border bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="mb-2 text-sm font-600 uppercase tracking-wider text-primary">Disease Coverage</p>
            <h2 className="font-display text-4xl font-800 text-text">Diseases we detect</h2>
            <p className="mt-3 text-muted">
              Dr. Cluck is trained to identify the most common and deadly poultry diseases — with severity assessment included.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-4 md:grid-cols-2"
          >
            {diseases.map((d) => (
              <motion.div
                key={d.name}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-border p-5"
              >
                <RiAlertLine size={18} className="mt-0.5 shrink-0 text-muted" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-600 text-text">{d.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-600 ${severityColors[d.severity]}`}>
                      {d.severity}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="mb-2 text-sm font-600 uppercase tracking-wider text-primary">Who It's For</p>
            <h2 className="font-display text-4xl font-800 text-text">Built for everyone who keeps birds</h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 md:grid-cols-3"
          >
            {whoCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-border bg-surface p-7"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light">
                  <card.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-700 text-text">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── DISCLAIMER + CTA ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6 space-y-6">
          {/* Disclaimer */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
            <div className="flex items-start gap-3">
              <RiAlertLine size={18} className="mt-0.5 shrink-0 text-amber-600" />
              <div>
                <p className="font-600 text-amber-800">Important disclaimer</p>
                <p className="mt-1 text-sm text-amber-700">
                  SavePoultry is an AI-powered tool built to assist, not replace, professional veterinary diagnosis.
                  All diagnoses should be verified by a licensed poultry veterinarian before treatment decisions are made.
                  This tool was built as part of a hackathon project.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-primary p-10 text-center"
          >
            <h2 className="font-display text-3xl font-800 text-white">Ready to diagnose?</h2>
            <p className="mt-3 text-white/80">
              It's free. No signup needed. Just upload and chat.
            </p>
            <Link
              href="/chat"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-700 text-primary transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Open Dr. Cluck
              <RiArrowRightLine size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <span className="font-display text-sm font-700 text-text">
            Save<span className="text-primary">Poultry</span>
          </span>
          <p className="text-xs text-subtle">
            Built for Global Fusion Hackathon 2026 · AI diagnosis is not a substitute for professional veterinary advice.
          </p>
        </div>
      </footer>
    </div>
  );
}