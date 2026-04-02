"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "< 5s",
    label: "Rapid Diagnosis",
    description: "Instant identification of common diseases like Fowl Pox or Coccidiosis."
  },
  {
    value: "24/7",
    label: "Always On",
    description: "Veterinary intelligence in your pocket, whenever your flock needs it."
  },
  {
    value: "100%",
    label: "Accessible",
    description: "Designed for everyone from backyard hobbyists to commercial farmers."
  }
];

export default function ImpactMetrics() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl bg-background border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">
                {metric.value}
              </h3>
              <h4 className="text-xl font-semibold text-foreground mb-2">
                {metric.label}
              </h4>
              <p className="text-muted-foreground">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}