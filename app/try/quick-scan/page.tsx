"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  RiCameraLine,
  RiUpload2Line,
  RiCheckboxCircleLine,
  RiAlertLine,
  RiErrorWarningLine,
  RiRefreshLine,
  RiCloseLine,
} from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";

interface ScanResult {
  disease: string;
  confidence: number;
  severity: "mild" | "serious" | "critical";
  symptoms: string[];
  immediateActions: string[];
  vetRequired: boolean;
  fullText: string;
}

async function quickScan(imageBase64: string): Promise<ScanResult> {
  const mimeType = imageBase64.split(";")[0].split(":")[1];
  const data = imageBase64.split(",")[1];

  const res = await fetch("/api/diagnose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            { inline_data: { mime_type: mimeType, data } },
            {
              text: `Analyse this photo of a chicken/poultry bird and provide a structured diagnosis. 
Respond in this exact JSON format (no markdown, just raw JSON):
{
  "disease": "disease name or 'Appears Healthy' if no issues found",
  "confidence": 85,
  "severity": "mild|serious|critical",
  "symptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "immediateActions": ["action 1", "action 2", "action 3"],
  "vetRequired": true
}`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) throw new Error("Scan failed. Please try again.");
  const body = await res.json();

  try {
    const clean = body.text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    return { ...parsed, fullText: body.text };
  } catch {
    // Fallback parse from text
    return {
      disease: "Unable to parse",
      confidence: 0,
      severity: "mild",
      symptoms: [],
      immediateActions: ["Please try again with a clearer photo"],
      vetRequired: false,
      fullText: body.text,
    };
  }
}

const severityConfig = {
  mild: { label: "Mild", cls: "bg-green-100 text-green-700 border-green-200", icon: RiCheckboxCircleLine, bar: "bg-green-500" },
  serious: { label: "Serious", cls: "bg-amber-100 text-amber-700 border-amber-200", icon: RiAlertLine, bar: "bg-amber-500" },
  critical: { label: "Critical — Act Now", cls: "bg-red-100 text-red-700 border-red-200", icon: RiErrorWarningLine, bar: "bg-red-500" },
};

export default function QuickScanPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { mutate: scan, data: result, isPending, reset } = useMutation({
    mutationFn: quickScan,
  });

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result as string;
      setPreview(b64);
      scan(b64);
    };
    reader.readAsDataURL(file);
  }

  function handleReset() {
    setPreview(null);
    reset();
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">Quick Scan</p>
          <h1 className="font-display text-4xl font-800 text-text">One photo. Instant diagnosis.</h1>
          <p className="mt-3 text-muted">No chat needed — upload a clear photo and get a structured result in seconds.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-24">
        {/* Upload zone */}
        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer rounded-2xl border-2 border-dashed border-border bg-surface p-16 text-center transition-colors hover:border-primary hover:bg-primary-light/30"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
              <RiUpload2Line size={28} className="text-primary" />
            </div>
            <p className="font-display text-lg font-700 text-text">Upload a photo of your bird</p>
            <p className="mt-2 text-sm text-muted">Click to browse · JPG, PNG, WEBP supported</p>
            <p className="mt-1 text-xs text-subtle">Whole body or close-up of affected area</p>
          </motion.div>
        )}

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

        {/* Preview + result */}
        <AnimatePresence>
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* Image preview with reset */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Scan preview" className="max-h-72 w-full object-cover" />
                <button
                  onClick={handleReset}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-text/70 text-white backdrop-blur-sm hover:bg-text transition-colors"
                >
                  <RiCloseLine size={15} />
                </button>
                {isPending && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border border-t-primary" />
                      <p className="text-sm font-500 text-text">Dr. Cluck is analysing…</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Result card */}
              {result && !isPending && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
                >
                  {/* Severity bar */}
                  <div className={`h-1.5 w-full ${severityConfig[result.severity].bar}`} />

                  <div className="p-7 space-y-6">
                    {/* Disease + badges */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">Diagnosis</p>
                        <h2 className="font-display text-2xl font-800 text-text">{result.disease}</h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-500 ${severityConfig[result.severity].cls}`}>
                          {/* <severityConfig[result.severity].icon size={12} /> */}
                          {severityConfig[result.severity].label}
                        </span>
                        <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-500 text-primary">
                          {result.confidence}% confidence
                        </span>
                        {result.vetRequired && (
                          <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-500 text-red-600">
                            Vet Required
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Symptoms */}
                    {result.symptoms.length > 0 && (
                      <div>
                        <p className="mb-2.5 text-xs font-500 uppercase tracking-wider text-muted">Observed Symptoms</p>
                        <div className="flex flex-wrap gap-2">
                          {result.symptoms.map((s) => (
                            <span key={s} className="rounded-lg bg-surface-2 border border-border px-3 py-1 text-sm text-text">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Immediate actions */}
                    {result.immediateActions.length > 0 && (
                      <div>
                        <p className="mb-2.5 text-xs font-500 uppercase tracking-wider text-muted">Immediate Actions</p>
                        <ol className="space-y-2">
                          {result.immediateActions.map((action, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-text">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-700 text-white mt-0.5">
                                {i + 1}
                              </span>
                              {action}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-500 text-text hover:bg-surface-2 transition-colors"
                      >
                        <RiRefreshLine size={15} />
                        Scan Another Bird
                      </button>
                      <a
                        href="/chat"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-500 text-white hover:bg-primary-hover transition-colors"
                      >
                        <RiCameraLine size={15} />
                        Get Full Diagnosis in Chat
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}