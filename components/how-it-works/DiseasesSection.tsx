"use client";

import { motion } from "framer-motion";
import { RiVirusLine } from "react-icons/ri";

const diseases = [
  { name: "Newcastle Disease", severity: "critical", type: "Viral", desc: "Twisted neck, drooping wings, high mortality" },
  { name: "Marek's Disease", severity: "serious", type: "Viral", desc: "Paralysis, weight loss, leg weakness" },
  { name: "Coccidiosis", severity: "serious", type: "Parasitic", desc: "Bloody droppings, lethargy, ruffled feathers" },
  { name: "Avian Influenza", severity: "critical", type: "Viral", desc: "Swollen head, purple comb, sudden death" },
  { name: "Infectious Bronchitis", severity: "serious", type: "Viral", desc: "Gasping, nasal discharge, egg drop" },
  { name: "Fowl Pox", severity: "mild", type: "Viral", desc: "Wart-like lesions on comb and skin" },
  { name: "Salmonellosis", severity: "serious", type: "Bacterial", desc: "Diarrhoea, weakness, sudden chick death" },
  { name: "Aspergillosis", severity: "serious", type: "Fungal", desc: "Respiratory distress, gasping, listlessness" },
];

const severityConfig: Record<string, { cls: string; dot: string }> = {
  mild: { cls: "bg-green-50 text-green-700 border-green-200", dot: "bg-green-500" },
  serious: { cls: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
  critical: { cls: "bg-red-50 text-red-700 border-red-200", dot: "bg-red-500" },
};

export default function DiseasesSection() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">Coverage</p>
          <h2 className="font-display text-4xl font-700 text-text">Diseases we detect</h2>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Dr. Cluck is trained on the most common and deadly poultry diseases, with built-in severity assessment.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          {diseases.map((d, i) => {
            const { cls, dot } = severityConfig[d.severity];
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="flex items-start gap-4 rounded-xl border border-border p-5 hover:border-primary-mid transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-2">
                  <RiVirusLine size={18} className="text-muted" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-500 text-text">{d.name}</p>
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-500 ${cls}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
                      {d.severity}
                    </span>
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[11px] text-subtle border border-border">
                      {d.type}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted">{d.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
