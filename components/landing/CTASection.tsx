"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-primary px-10 py-20 text-center"
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-white/5" />
          <div className="pointer-events-none absolute right-32 top-8 h-20 w-20 rounded-full bg-white/10" />

          <p className="mb-3 text-sm font-500 uppercase tracking-[0.15em] text-white/60">
            Free · No account needed · Instant results
          </p>
          <h2 className="font-display text-4xl font-800 text-white md:text-5xl">
            Your flock can&apos;t wait.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/75">
            Upload a photo, describe the symptoms, and Dr. Cluck will have a
            diagnosis for you in seconds.
          </p>
          <Link
            href="/chat"
            className="group mt-10 inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 font-500 text-primary shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Start Free Diagnosis
            <RiArrowRightLine
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
