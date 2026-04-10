"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  RiChat3Line,
  RiCameraLine,
  RiBookOpenLine,
  RiMedicineBottleLine,
  RiMapPin2Line,
  RiArrowRightLine,
} from "react-icons/ri";

const tools = [
  {
    href: "/chat",
    icon: RiChat3Line,
    label: "AI Diagnosis Chat",
    tagline: "Talk to Dr. Cluck",
    desc: "Upload a photo of your sick bird and have a full conversation with Dr. Cluck — your AI poultry vet. Get disease name, severity, and treatment steps.",
    badge: "Most Popular",
    accent: true,
    cta: "Start Chat",
  },
  {
    href: "/try/quick-scan",
    icon: RiCameraLine,
    label: "Quick Scan",
    tagline: "One photo, instant result",
    desc: "No chat needed. Upload a single photo and get an immediate structured diagnosis card — disease, confidence %, severity, and next steps.",
    badge: "Fastest",
    accent: false,
    cta: "Scan a Bird",
  },
  {
    href: "/try/disease-library",
    icon: RiBookOpenLine,
    label: "Disease Library",
    tagline: "Know your enemy",
    desc: "Browse all 10 major poultry diseases. Symptoms, visual signs, transmission, treatment, prevention — everything in one searchable reference.",
    badge: "10 Diseases",
    accent: false,
    cta: "Browse Library",
  },
  {
    href: "/try/treatment-guide",
    icon: RiMedicineBottleLine,
    label: "Treatment Guide",
    tagline: "AI-generated protocols",
    desc: "Enter a disease or symptom and get a full AI-generated treatment protocol: medications, dosage guidance, isolation steps, and recovery timeline.",
    badge: "AI Powered",
    accent: false,
    cta: "Get Treatment",
  },
  {
    href: "/try/outbreak-map",
    icon: RiMapPin2Line,
    label: "Outbreak Map",
    tagline: "Know what's spreading",
    desc: "See which diseases are most prevalent by region and season. Know what to watch out for before it hits your flock.",
    badge: "Reference",
    accent: false,
    cta: "View Map",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
} as Variants;

export default function TryHubCards() {
  return (
    <section className="pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {tools.map((tool) => (
            <motion.div key={tool.href} variants={fadeUp}>
              <Link href={tool.href} className="group block h-full">
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.2 }}
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-colors ${
                    tool.accent
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface hover:border-primary-mid"
                  }`}
                >
                  {/* Decorative circle on accent card */}
                  {tool.accent && (
                    <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                  )}

                  {/* Badge */}
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                        tool.accent ? "bg-white/20" : "bg-primary-light"
                      }`}
                    >
                      <tool.icon size={23} className={tool.accent ? "text-white" : "text-primary"} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-500 ${
                        tool.accent
                          ? "bg-white/20 text-white"
                          : "bg-primary-light text-primary"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <p className={`text-xs font-500 uppercase tracking-wider mb-1 ${tool.accent ? "text-white/60" : "text-primary"}`}>
                    {tool.tagline}
                  </p>
                  <h3
                    className={`font-display text-xl font-700 mb-2 ${
                      tool.accent ? "text-white" : "text-text"
                    }`}
                  >
                    {tool.label}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed flex-1 ${
                      tool.accent ? "text-white/75" : "text-muted"
                    }`}
                  >
                    {tool.desc}
                  </p>

                  {/* CTA */}
                  <div
                    className={`mt-6 flex items-center gap-1.5 text-sm font-500 ${
                      tool.accent ? "text-white" : "text-primary"
                    }`}
                  >
                    {tool.cta}
                    <RiArrowRightLine
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}