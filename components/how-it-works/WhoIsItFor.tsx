"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiLeafLine, RiGroupLine, RiShieldCheckLine, RiArrowRightLine, RiAlertLine } from "react-icons/ri";

const cards = [
  {
    icon: RiLeafLine,
    title: "Smallholder Farmers",
    desc: "No vet nearby? Get a fast second opinion before driving hours to a clinic. Free and instant.",
  },
  {
    icon: RiGroupLine,
    title: "Commercial Operations",
    desc: "Catch outbreaks early across large flocks before losses compound. Every hour matters.",
  },
  {
    icon: RiShieldCheckLine,
    title: "Veterinarians",
    desc: "Use as a triage tool — let Dr. Cluck handle first-pass screening so you focus on complex cases.",
  },
];

export default function WhoIsItFor() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6 space-y-16">
        {/* Who cards */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">
              Who It&apos;s For
            </p>
            <h2 className="font-display text-4xl font-700 text-text">
              Built for everyone who keeps birds
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-border bg-surface p-8"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                  <c.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-700 text-text">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5">
          <div className="flex items-start gap-3">
            <RiAlertLine size={18} className="mt-0.5 shrink-0 text-amber-600" />
            <div>
              <p className="font-500 text-amber-800">Important disclaimer</p>
              <p className="mt-1 text-sm leading-relaxed text-amber-700">
                SavePoultry is an AI-powered tool built to assist, not replace,
                professional veterinary diagnosis. All diagnoses should be
                verified by a licensed poultry veterinarian before treatment
                decisions are made. Built as part of the Global Fusion Hackathon
                2026.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-primary px-10 py-14 text-center"
        >
          <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-white/5" />
          <h2 className="font-display text-3xl font-800 text-white">
            Ready to diagnose?
          </h2>
          <p className="mt-3 text-white/75">
            Free. No signup. Just upload and chat.
          </p>
          <Link
            href="/chat"
            className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-500 text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Open Dr. Cluck
            <RiArrowRightLine
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
