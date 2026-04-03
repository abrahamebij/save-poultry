"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "94%", label: "Diagnosis Accuracy" },
  { value: "< 30s", label: "Time to Result" },
  { value: "12+", label: "Diseases Detected" },
  { value: "Free", label: "Always Free" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="font-display text-[2.6rem] font-800 leading-none text-primary">
                {stat.value}
              </span>
              <span className="text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
