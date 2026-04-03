"use client";

import { motion } from "framer-motion";
import { RiCameraLine, RiChat3Line, RiMedicineBottleLine, RiArrowRightLine } from "react-icons/ri";

const steps = [
  {
    n: "01", icon: RiCameraLine,
    title: "Upload a Photo",
    desc: "Snap or upload a clear photo of the sick bird. Whole body or close-up of the affected area both work. Our AI reads feather condition, eye clarity, comb colour, and posture.",
    tip: "Good lighting + whole bird in frame = best results",
  },
  {
    n: "02", icon: RiChat3Line,
    title: "Chat with Dr. Cluck",
    desc: "Dr. Cluck will ask smart follow-up questions — how long has the bird been sick? Are other birds affected? Any changes in droppings or egg production?",
    tip: "The more detail you share, the more accurate the diagnosis",
  },
  {
    n: "03", icon: RiMedicineBottleLine,
    title: "Get Your Diagnosis",
    desc: "Receive a full breakdown: disease name, confidence %, severity level, symptoms explanation, and step-by-step treatment or action plan.",
    tip: "Results arrive in under 30 seconds",
  },
];

export default function StepsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-xl"
        >
          <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">The Process</p>
          <h2 className="font-display text-4xl font-700 text-text">Three steps to a diagnosis</h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="relative rounded-2xl border border-border bg-surface p-8"
            >
              <p className="font-display text-6xl font-800 text-border leading-none">{step.n}</p>
              <div className="my-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                <step.icon size={23} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-700 text-text">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              <div className="mt-5 rounded-xl bg-surface-2 px-4 py-3 text-xs text-muted">
                💡 {step.tip}
              </div>
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface shadow-sm">
                    <RiArrowRightLine size={14} className="text-subtle" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
