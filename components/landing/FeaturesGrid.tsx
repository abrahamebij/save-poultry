"use client";

import { motion } from "framer-motion";
import {
  RiCameraLine,
  RiStethoscopeLine,
  RiShieldCheckLine,
  RiTimeLine,
  RiHeartPulseLine,
  RiGlobalLine,
} from "react-icons/ri";

const features = [
  {
    icon: RiCameraLine,
    title: "Photo Diagnosis",
    desc: "Our AI reads feathers, eyes, posture, comb color, and droppings — any photo works.",
    accent: false,
  },
  {
    icon: RiStethoscopeLine,
    title: "AI Vet Chat",
    desc: "Don't just get a result — have a real conversation with Dr. Cluck who asks the right questions.",
    accent: true,
  },
  {
    icon: RiShieldCheckLine,
    title: "Treatment Plans",
    desc: "Every diagnosis comes with action steps: isolate, treat, or when to call a real vet.",
    accent: false,
  },
  {
    icon: RiTimeLine,
    title: "Early Detection",
    desc: "Catch Newcastle, Marek's, Coccidiosis, and more before they wipe out your flock.",
    accent: false,
  },
  {
    icon: RiHeartPulseLine,
    title: "Severity Scoring",
    desc: "Know if it's mild, serious, or critical — at a glance, with confidence percentage.",
    accent: false,
  },
  {
    icon: RiGlobalLine,
    title: "For Everyone",
    desc: "Smallholder farmer or commercial operation — SavePoultry speaks your language.",
    accent: false,
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">
              Why SavePoultry
            </p>
            <h2 className="font-display text-4xl font-700 leading-tight text-text">
              Everything to protect<br />your flock
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted md:text-right">
            Built specifically for poultry — not a generic AI, but a trained veterinary assistant.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              className={`group relative overflow-hidden rounded-2xl border p-7 transition-colors ${
                f.accent
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface hover:border-primary-mid"
              }`}
            >
              {f.accent && (
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              )}
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  f.accent ? "bg-white/20" : "bg-primary-light"
                }`}
              >
                <f.icon size={22} className={f.accent ? "text-white" : "text-primary"} />
              </div>
              <h3
                className={`mb-2 font-display text-lg font-700 ${
                  f.accent ? "text-white" : "text-text"
                }`}
              >
                {f.title}
              </h3>
              <p className={`text-sm leading-relaxed ${f.accent ? "text-white/80" : "text-muted"}`}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
