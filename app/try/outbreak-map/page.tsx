"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RiMapPin2Line, RiAlertLine, RiCalendarLine } from "react-icons/ri";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/outbreak-map/Globe"), {
  ssr: false,
});

const poultryRegions = [
  {
    name: "Atlanta, USA",
    location: [33.75, -84.39],
    size: 0.07,
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "Very High",
  },
  {
    name: "São Paulo, Brazil",
    location: [-23.55, -46.63],
    size: 0.08,
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "High",
  },
  {
    name: "Rotterdam, Netherlands",
    location: [51.92, 4.48],
    size: 0.06,
    disease: "Newcastle Disease",
    severity: "Medium",
  },
  {
    name: "Lagos, Nigeria",
    location: [6.52, 3.38],
    size: 0.085,
    disease: "Newcastle Disease (ND)",
    severity: "Very High",
  },
  {
    name: "Riyadh, Saudi Arabia",
    location: [24.71, 46.68],
    size: 0.055,
    disease: "Newcastle Disease",
    severity: "High",
  },
  {
    name: "Delhi, India",
    location: [28.61, 77.21],
    size: 0.065,
    disease: "Newcastle Disease (ND)",
    severity: "Very High",
  },
  {
    name: "Beijing, China",
    location: [39.9, 116.41],
    size: 0.07,
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "High",
  },
  {
    name: "Bangkok, Thailand",
    location: [13.76, 100.5],
    size: 0.06,
    disease: "Newcastle Disease",
    severity: "High",
  },
  {
    name: "Sydney, Australia",
    location: [-33.87, 151.21],
    size: 0.05,
    disease: "Avian Influenza",
    severity: "Medium",
  },
  {
    name: "Moscow, Russia",
    location: [55.76, 37.62],
    size: 0.055,
    disease: "Newcastle Disease",
    severity: "Medium-High",
  },
  {
    name: "Mexico City, Mexico",
    location: [19.43, -99.13],
    size: 0.05,
    disease: "Newcastle Disease",
    severity: "High",
  },
  {
    name: "Nairobi, Kenya",
    location: [-1.29, 36.82],
    size: 0.045,
    disease: "Newcastle Disease (ND)",
    severity: "Very High",
  },
  {
    name: "Istanbul, Turkey",
    location: [41.01, 28.98],
    size: 0.05,
    disease: "Highly Pathogenic Avian Influenza (HPAI)",
    severity: "High",
  },
];


interface RegionData {
  region: string;
  countries: string[];
  topDiseases: {
    name: string;
    severity: "mild" | "serious" | "critical";
    prevalence: "low" | "medium" | "high";
  }[];
  seasonalRisk: string;
  alert?: string;
}

const regions: RegionData[] = [
  {
    region: "West Africa",
    countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal", "Cameroon"],
    topDiseases: [
      { name: "Newcastle Disease", severity: "critical", prevalence: "high" },
      {
        name: "Infectious Bronchitis",
        severity: "serious",
        prevalence: "high",
      },
      { name: "Marek's Disease", severity: "serious", prevalence: "medium" },
      { name: "Coccidiosis", severity: "serious", prevalence: "high" },
    ],
    seasonalRisk:
      "Year-round risk; peaks during harmattan season (Nov–Feb) due to dry dusty conditions increasing respiratory disease spread.",
    alert:
      "Newcastle Disease remains endemic — vaccination is critical for all unvaccinated flocks.",
  },
  {
    region: "East Africa",
    countries: ["Kenya", "Ethiopia", "Tanzania", "Uganda", "Rwanda"],
    topDiseases: [
      { name: "Newcastle Disease", severity: "critical", prevalence: "high" },
      { name: "Fowl Pox", severity: "mild", prevalence: "high" },
      { name: "Salmonellosis", severity: "serious", prevalence: "medium" },
      { name: "Coccidiosis", severity: "serious", prevalence: "medium" },
    ],
    seasonalRisk:
      "Rainy seasons (Mar–May, Oct–Dec) increase coccidiosis and Salmonella risk due to wet litter conditions.",
  },
  {
    region: "South & Southeast Asia",
    countries: ["India", "Bangladesh", "Vietnam", "Indonesia", "Thailand"],
    topDiseases: [
      { name: "Avian Influenza", severity: "critical", prevalence: "high" },
      { name: "Newcastle Disease", severity: "critical", prevalence: "high" },
      {
        name: "Infectious Bronchitis",
        severity: "serious",
        prevalence: "high",
      },
      { name: "Gumboro Disease", severity: "serious", prevalence: "medium" },
    ],
    seasonalRisk:
      "Avian Influenza outbreaks more frequent Oct–Feb during migratory bird season. High biosecurity essential.",
    alert:
      "Active HPAI H5N1 surveillance ongoing in several countries — report sudden flock deaths immediately.",
  },
  {
    region: "Latin America",
    countries: ["Brazil", "Mexico", "Colombia", "Argentina", "Peru"],
    topDiseases: [
      { name: "Newcastle Disease", severity: "critical", prevalence: "medium" },
      {
        name: "Infectious Bronchitis",
        severity: "serious",
        prevalence: "high",
      },
      { name: "Marek's Disease", severity: "serious", prevalence: "medium" },
      { name: "Fowl Pox", severity: "mild", prevalence: "medium" },
    ],
    seasonalRisk:
      "IBV circulation year-round. Rainy season increases Coccidiosis risk in backyard flocks.",
  },
  {
    region: "Europe & North America",
    countries: ["USA", "Canada", "UK", "France", "Germany"],
    topDiseases: [
      { name: "Avian Influenza", severity: "critical", prevalence: "medium" },
      {
        name: "Infectious Bronchitis",
        severity: "serious",
        prevalence: "medium",
      },
      { name: "Marek's Disease", severity: "serious", prevalence: "low" },
      { name: "Coccidiosis", severity: "serious", prevalence: "low" },
    ],
    seasonalRisk:
      "HPAI outbreaks linked to autumn and spring migration (Sep–Nov, Feb–Apr). Commercial flocks largely protected by vaccination.",
    alert:
      "HPAI H5N1 outbreaks reported in wild birds and some commercial operations.",
  },
  {
    region: "Middle East & North Africa",
    countries: ["Egypt", "Morocco", "Saudi Arabia", "Iran", "Turkey"],
    topDiseases: [
      { name: "Newcastle Disease", severity: "critical", prevalence: "high" },
      { name: "Avian Influenza", severity: "critical", prevalence: "medium" },
      {
        name: "Infectious Bronchitis",
        severity: "serious",
        prevalence: "high",
      },
      { name: "Aspergillosis", severity: "serious", prevalence: "medium" },
    ],
    seasonalRisk:
      "Dusty, dry conditions year-round increase Aspergillosis risk. Newcastle Disease endemic in the region.",
  },
];

const prevalenceConfig = {
  low: { cls: "bg-green-100 text-green-700", label: "Low" },
  medium: { cls: "bg-amber-100 text-amber-700", label: "Medium" },
  high: { cls: "bg-red-100 text-red-700", label: "High" },
};

const severityDot = {
  mild: "bg-green-500",
  serious: "bg-amber-500",
  critical: "bg-red-500",
};

export default function OutbreakMapPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedRegion = regions.find((r) => r.region === selected);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-2 text-xs font-500 uppercase tracking-[0.15em] text-primary">
            Outbreak Map
          </p>
          <h1 className="font-display text-4xl font-800 text-text">
            Know what&apos;s spreading
          </h1>
          <p className="mt-3 text-muted max-w-xl">
            Regional disease prevalence and seasonal risk data to help you stay
            ahead of outbreaks before they reach your flock.
          </p>
        </div>
      </section>

      <Globe />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Region list */}
          <div className="lg:col-span-2 space-y-3">
            {regions.map((region) => (
              <motion.button
                key={region.region}
                onClick={() =>
                  setSelected(selected === region.region ? null : region.region)
                }
                whileHover={{ x: 3 }}
                className={`w-full rounded-2xl border p-5 text-left transition-colors ${
                  selected === region.region
                    ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                    : "border-border bg-surface hover:border-primary-mid"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <RiMapPin2Line
                        size={15}
                        className={
                          selected === region.region
                            ? "text-white/70"
                            : "text-primary"
                        }
                      />
                      <p
                        className={`font-display font-700 ${selected === region.region ? "text-white" : "text-text"}`}
                      >
                        {region.region}
                      </p>
                    </div>
                    <p
                      className={`mt-0.5 text-xs ${selected === region.region ? "text-white/60" : "text-subtle"}`}
                    >
                      {region.countries.slice(0, 3).join(", ")}
                      {region.countries.length > 3
                        ? ` +${region.countries.length - 3}`
                        : ""}
                    </p>
                  </div>
                  {region.alert && (
                    <RiAlertLine
                      size={15}
                      className={
                        selected === region.region
                          ? "text-white/80 shrink-0"
                          : "text-amber-500 shrink-0"
                      }
                    />
                  )}
                </div>

                {/* Top disease dots */}
                <div className="mt-3 flex gap-1.5">
                  {region.topDiseases.slice(0, 4).map((d) => (
                    <span
                      key={d.name}
                      title={d.name}
                      className={`h-2 w-2 rounded-full ${severityDot[d.severity]} ${selected === region.region ? "opacity-80" : ""}`}
                    />
                  ))}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            {!selectedRegion ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
                    <RiMapPin2Line size={24} className="text-primary" />
                  </div>
                  <p className="font-display font-700 text-text">
                    Select a region
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Click a region to see disease prevalence and seasonal risk
                    data
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                key={selectedRegion.region}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                {/* Header */}
                <div>
                  <h2 className="font-display text-2xl font-800 text-text">
                    {selectedRegion.region}
                  </h2>
                  <p className="mt-1 text-sm text-muted">
                    {selectedRegion.countries.join(" · ")}
                  </p>
                </div>

                {/* Alert */}
                {selectedRegion.alert && (
                  <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <RiAlertLine
                      size={16}
                      className="mt-0.5 shrink-0 text-amber-600"
                    />
                    <p className="text-sm text-amber-800">
                      {selectedRegion.alert}
                    </p>
                  </div>
                )}

                {/* Seasonal risk */}
                <div className="rounded-2xl border border-border bg-surface p-5">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-500 uppercase tracking-wider text-muted">
                    <RiCalendarLine size={12} /> Seasonal Risk Pattern
                  </p>
                  <p className="text-sm leading-relaxed text-text">
                    {selectedRegion.seasonalRisk}
                  </p>
                </div>

                {/* Disease table */}
                <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                  <div className="border-b border-border px-5 py-3">
                    <p className="text-xs font-500 uppercase tracking-wider text-muted">
                      Disease Prevalence
                    </p>
                  </div>
                  <div className="divide-y divide-border">
                    {selectedRegion.topDiseases.map((d) => (
                      <div
                        key={d.name}
                        className="flex items-center justify-between px-5 py-3.5"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2.5 w-2.5 rounded-full shrink-0 ${severityDot[d.severity]}`}
                          />
                          <span className="text-sm font-500 text-text">
                            {d.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-500 ${prevalenceConfig[d.prevalence].cls}`}
                          >
                            {prevalenceConfig[d.prevalence].label} prevalence
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-subtle">
                  Data based on published veterinary reports and FAO
                  surveillance. For official outbreak alerts, consult your
                  national veterinary authority.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
