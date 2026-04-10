# SavePoultry

**AI-Powered Poultry Health Diagnosis**  
Global Fusion Hackathon 2026 · AgriTech Track

---

## Overview

SavePoultry is a web-based AI platform that helps poultry farmers, veterinarians, and commercial operators diagnose sick birds, explore disease information, and generate treatment protocols — all from a browser, no signup required.

The core insight: millions of smallholder farmers in Sub-Saharan Africa, South Asia, and Southeast Asia lose significant income to preventable poultry diseases every year — not because treatments don't exist, but because early diagnosis is inaccessible. SavePoultry closes that gap.

---

## The Problem

- Poultry farming is a primary income source for over **600 million** smallholder households globally
- Diseases like Newcastle, Marek's, and Coccidiosis can wipe out an entire flock within days
- Most rural farmers have **no access to a vet** — the nearest clinic may be hours away
- By the time a diagnosis is made, the disease has often spread across the entire flock
- **Early detection = lower mortality + lower losses**

---

## The Solution

SavePoultry gives every farmer an AI veterinarian in their pocket — accessible from any browser, on any device, for free.

### Core Features

| Feature | Description |
|---|---|
| **AI Diagnosis Chat** | Conversational AI vet (Dr. Cluck) — upload a photo, describe symptoms, get a full diagnosis with confidence score, severity level, and treatment steps |
| **Quick Scan** | Single photo upload → instant structured diagnosis card in under 30 seconds |
| **Disease Library** | Searchable reference for 10+ major poultry diseases with symptoms, transmission, treatment, and prevention |
| **Treatment Guide** | AI-generated treatment protocols on demand — medications, dosage, isolation, recovery timeline |
| **Outbreak Map** | Regional disease prevalence and seasonal risk data across 6 major poultry-farming regions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Animation | Framer Motion |
| 3D / Hero | Three.js + React Three Fiber + Drei |
| AI Model | Google Gemini 2.5 Flash (vision + text) |
| Data Fetching | TanStack Query v5 (useMutation) |
| Icons | react-icons |
| Fonts | Roboto / Roboto Slab / Roboto Mono (next/font) |

---

## Architecture

```
Browser (Client)
    │
    ▼
Next.js Frontend (React, Framer Motion, R3F)
    │
    │  POST /api/diagnose
    ▼
Next.js API Route (Server-side)        ← API key lives here only
    │
    │  HTTPS request
    ▼
Google Gemini 2.5 Flash API
    │
    ▼
Structured response → parsed → rendered in UI
```

**Key security decision:** The Gemini API key is stored as a server-side environment variable (`GEMINI_API_KEY`) and accessed only in `app/api/diagnose/route.ts`. It is never exposed to the browser or bundled into client-side code.

---

## Project Structure

```
app/
  layout.tsx                  ← Root layout, fonts, QueryProvider
  page.tsx                    ← Landing page
  chat/page.tsx               ← AI Diagnosis Chat
  try/
    page.tsx                  ← Feature hub
    quick-scan/page.tsx       ← Single photo scan
    disease-library/page.tsx  ← Static disease reference
    treatment-guide/page.tsx  ← AI treatment protocols
    outbreak-map/page.tsx     ← Regional outbreak data
  api/
    diagnose/route.ts         ← Gemini proxy (server-side)

components/
  layout/
    Navbar.tsx
    Footer.tsx
  landing/
    Hero.tsx                  ← Three.js scene + copy
    StatsBar.tsx
    FeaturesGrid.tsx
    DiseaseTicker.tsx
    CTASection.tsx
  chat/
    ChatHeader.tsx
    MessageList.tsx
    MessageBubble.tsx
    InputBar.tsx
    types.ts
  how-it-works/
    StepsSection.tsx
    DiseasesSection.tsx
    WhoIsItFor.tsx
  try/
    TryHubCards.tsx
  QueryProvider.tsx

hooks/
  useDiagnose.ts              ← TanStack Query mutation

lib/
  diseases.ts                 ← Hardcoded disease data (10 diseases)
```

---

## Setup & Running

### Prerequisites
- Node.js 20.9+
- pnpm

### Installation

```bash
# Clone and install
pnpm install

# Set up environment
cp .env.local.example .env.local
# Add your Gemini API key (from aistudio.google.com):
# GEMINI_API_KEY=your_key_here

# Run development server
pnpm dev
```

### Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key (server-side only) | Yes |

---

## AI Diagnosis Flow

1. User uploads a photo and/or types a message
2. `useDiagnose` hook sends message history to `/api/diagnose`
3. API route builds a Gemini `contents` array with image (`inline_data`) and text parts
4. Gemini 2.5 Flash responds with diagnosis text
5. Client parses severity, confidence %, and disease name from response
6. `MessageBubble` renders structured badges + formatted text

For Quick Scan and Treatment Guide, the same `/api/diagnose` endpoint is used with a structured JSON prompt — the response is parsed directly into typed result objects.

---

## Key Design Decisions

- **No database, no auth** — completely stateless; conversation history lives in React state per session. This makes deployment trivial and keeps the demo clean.
- **Single API endpoint** — all AI features route through `/api/diagnose`, keeping the surface area small and the key in one place.
- **Hardcoded disease data** — the Disease Library uses static TypeScript data for reliability and zero latency. AI is reserved for diagnosis and treatment generation where it adds genuine value.
- **Light mode** — chosen deliberately; most target users (rural farmers) are on mid-range phones in bright outdoor conditions. Light mode is more readable in sunlight.

---

## Impact Potential

- **Immediate:** Faster diagnosis for smallholder farmers without vet access
- **Economic:** Reduced flock mortality = protected livelihoods
- **Scalability:** No infrastructure needed beyond a browser and internet connection
- **Extensibility:** Can add offline PWA support, local language support (Gemini is multilingual), and telemedicine vet referral

---

## Limitations & Honest Caveats

- AI diagnosis is **not a substitute** for professional veterinary advice
- Accuracy depends on photo quality and symptom description detail
- No persistent data — diagnosis history is lost on page refresh
- Disease library covers 10 diseases; real-world coverage would need expansion
- Outbreak map data is static reference data, not real-time surveillance

---

## Future Scope

- [ ] PWA with offline capability for low-connectivity areas
- [ ] Local language support (Hausa, Swahili, Hindi, Bengali)
- [ ] User accounts + flock health history tracking
- [ ] Integration with real-time FAO/OIE outbreak surveillance data
- [ ] Vet referral network — connect farmers to verified local vets
- [ ] SMS-based diagnosis for feature phones (no smartphone required)
- [ ] Fine-tuned vision model on curated poultry disease image dataset

---

## Team

Built solo for the Global Fusion Hackathon 2026.

---

*SavePoultry — Diagnose your flock. Save lives.*
