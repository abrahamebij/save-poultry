"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Stars } from "@react-three/drei";
import { RiArrowRightLine, RiShieldCheckLine } from "react-icons/ri";
import { Suspense } from "react";

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 8, 6]} color="#4ade80" intensity={3} />
      <pointLight position={[-6, -4, -4]} color="#bbf7d0" intensity={1.5} />
      <Stars radius={60} depth={30} count={800} factor={3} fade speed={0.6} />
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.4}>
        <Sphere args={[1.9, 80, 80]}>
          <MeshDistortMaterial
            color="#1B6B3A"
            distort={0.38}
            speed={2.2}
            roughness={0.15}
            metalness={0.3}
          />
        </Sphere>
      </Float>
      {/* Smaller satellite orb */}
      <Float speed={2.8} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.3, 0.3]}>
        <Sphere args={[0.55, 40, 40]} position={[2.8, 1.2, -1]}>
          <MeshDistortMaterial
            color="#F4A228"
            distort={0.5}
            speed={3}
            roughness={0.2}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-16">
      {/* Subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Large pale circle behind 3D */}
      <div className="pointer-events-none absolute right-0 top-10 h-[700px] w-[700px] -translate-y-10 translate-x-1/4 rounded-full bg-primary-light opacity-60 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary-mid bg-primary-light px-4 py-1.5 text-xs font-500 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-primary opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            AgriTech AI · Global Fusion Hackathon 2026
          </div>

          <h1 className="font-display text-[3.6rem] font-800 leading-[1.08] tracking-tight text-text lg:text-[4.2rem]">
            Diagnose your<br />
            flock.<br />
            <span className="text-primary">Save lives.</span>
          </h1>

          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted">
            Upload a photo of your sick bird and chat with <strong className="text-text font-500">Dr. Cluck</strong> —
            your AI poultry vet. Get disease detection, severity scores, and
            treatment plans in under 30 seconds.
          </p>

          {/* Trust signals */}
          <div className="mt-5 flex items-center gap-4 text-xs text-subtle">
            <span className="flex items-center gap-1.5">
              <RiShieldCheckLine size={13} className="text-primary" />
              94% accuracy
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <RiShieldCheckLine size={13} className="text-primary" />
              12+ diseases
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <RiShieldCheckLine size={13} className="text-primary" />
              Free · No signup
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/chat"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-500 text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
            >
              Start Free Diagnosis
              <RiArrowRightLine size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-500 text-text shadow-sm transition-all hover:bg-surface-2 hover:border-primary-mid"
            >
              See how it works
            </Link>
          </div>
        </motion.div>

        {/* Right: Three.js canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden h-[560px] w-full lg:block"
        >
          <Suspense fallback={null}>
            <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
              <HeroScene />
            </Canvas>
          </Suspense>

          {/* Floating stat cards */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute left-4 top-16 rounded-2xl border border-border bg-surface/90 px-5 py-4 shadow-xl backdrop-blur-sm"
          >
            <p className="font-display text-2xl font-700 text-primary">94%</p>
            <p className="text-xs text-muted">Diagnosis accuracy</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="absolute bottom-24 right-4 rounded-2xl border border-border bg-surface/90 px-5 py-4 shadow-xl backdrop-blur-sm"
          >
            <p className="font-display text-2xl font-700 text-accent">12+</p>
            <p className="text-xs text-muted">Diseases detected</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="absolute bottom-52 left-8 rounded-2xl border border-border bg-surface/90 px-5 py-4 shadow-xl backdrop-blur-sm"
          >
            <p className="font-display text-2xl font-700 text-text">&lt;30s</p>
            <p className="text-xs text-muted">Response time</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-subtle">
        <span className="text-[11px] uppercase tracking-widest">Scroll</span>
        <span className="h-6 w-px bg-border" />
      </div>
    </section>
  );
}
