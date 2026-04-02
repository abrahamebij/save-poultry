"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming shadcn is installed
import ChickenScene from "./ChickenScene";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-20 pb-12">
      <div className="container px-4 md:px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Column: Text & CTA */}
        <div className="flex flex-col space-y-6 z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-foreground"
          >
            1 in 5 poultry deaths is <span className="text-primary">preventable.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-[600px]"
          >
            Diagnose. Treat. Save your flock. Your AI veterinary assistant gives you instant, accurate disease detection from a single photo.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-4 pt-4"
          >
            <Link href="/chat">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 shadow-lg shadow-primary/20 transition-all hover:scale-105">
                Start AI Diagnosis
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Three.js Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="h-[400px] lg:h-[600px] w-full relative rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-border shadow-xl flex items-center justify-center"
        >
           {/* Drop your R3F Canvas in here */}
           <ChickenScene />
        </motion.div>

      </div>
    </section>
  );
}