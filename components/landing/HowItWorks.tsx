"use client";

import { motion } from "framer-motion";
import { TbCameraPlus, TbBrain, TbStethoscope } from "react-icons/tb";

const steps = [
  {
    title: "1. Snap & Upload",
    description: "Take a clear photo of the affected bird, focusing on visible symptoms like lesions or discoloration.",
    icon: <TbCameraPlus className="w-8 h-8 text-primary" />
  },
  {
    title: "2. AI Analysis",
    description: "Our Gemini-powered AI instantly analyzes the image against thousands of known poultry pathogens.",
    icon: <TbBrain className="w-8 h-8 text-primary" />
  },
  {
    title: "3. Actionable Treatment",
    description: "Receive a structured diagnosis, confidence score, and step-by-step treatment recommendations.",
    icon: <TbStethoscope className="w-8 h-8 text-primary" />
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How SavePoultry Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">Get an accurate diagnosis in three simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}