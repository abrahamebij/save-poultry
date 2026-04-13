# SavePoultry

*AI-Powered Poultry Health Diagnosis for Farmers, Vets, and Commercial Operators*

## 🐔 Overview

**SavePoultry** is a web-based AI platform that helps poultry farmers diagnose sick birds, explore disease information, and generate treatment protocols — all from a browser, no signup required.

![Cover Image](https://i.ibb.co/hFKxTMhC/2b65769e-7f97-460c-b136-1633153df13e.png)

The core insight: millions of smallholder farmers across Sub-Saharan Africa, South Asia, and Southeast Asia lose significant income to preventable poultry diseases every year — not because treatments don't exist, but because early diagnosis is inaccessible. A vet may be hours away. By the time they arrive, the disease has spread.

SavePoultry puts an AI veterinarian in every farmer's pocket.

## 📍 Demo

- [Web link](https://save-poultry.vercel.app/)
- [Slides Download](https://github.com/abrahamebij/save-poultry/raw/refs/heads/master/public/slides.pptx)
- [Youtube Demo](https://www.youtube.com/watch?v=ZXjJqsvPbSo)

![Demo](https://i.ibb.co/7xFZ61HD/Cover-Gifonline-video-cutter-com-ezgif-com-video-to-gif-converter.gif)

## 🎮 Core Features

### AI Diagnosis Chat
- Conversational chat with **Dr. Cluck** — a warm, knowledgeable AI poultry veterinarian
- Upload a photo of the sick bird mid-conversation for visual diagnosis
- Every response includes: disease name, confidence %, severity level (mild / serious / critical), observed symptoms, and treatment steps
- Chat history persists across sessions via localStorage — pick up where you left off
- Clear chat button resets to Dr. Cluck's welcome message

### Quick Scan
- No chat needed — upload a single photo and get an instant structured diagnosis card
- Returns disease, confidence %, severity, observed symptoms, and immediate action steps in under 30 seconds
- Spinner overlay during analysis, clean result card on completion

### Disease Library
- Searchable, filterable reference for 10 major poultry diseases
- Filter by disease type (Viral, Bacterial, Parasitic, Fungal) or severity
- Each entry includes: description, symptoms, visual signs, causes, transmission routes, treatment, prevention tips, incubation period, and mortality rate
- Accordion layout — expand any disease for full detail

### Treatment Guide
- Enter a disease name or symptom and get a full AI-generated treatment protocol
- Autocomplete suggestions from the disease library
- Protocol includes: urgency level, isolation instructions, medications with dosage and duration, supportive care steps, recovery timeline, and when to call a real vet
- Dedicated API route with strict JSON-only prompting — robust against model formatting variance

### Outbreak Map
- Regional disease prevalence data across 6 major poultry-farming regions
- Select a region to see top diseases, prevalence levels (low / medium / high), seasonal risk patterns, and active alerts
- Static reference data sourced from published veterinary and FAO reports

## 🧠 How the AI Works

Every AI feature routes through a Next.js API proxy — the Gemini API key never touches the browser.

```
Browser → POST /api/diagnose (or /api/treatment)
              ↓
         Next.js API Route        ← GEMINI_API_KEY lives here only
              ↓
         Gemini 2.5 Flash API
              ↓
         Structured response → parsed → rendered in UI
```

The chat and Quick Scan use `/api/diagnose` with a Dr. Cluck system prompt and full conversation history. The Treatment Guide uses a separate `/api/treatment` route with a strict JSON-API system prompt and lower temperature (`0.3`) for predictable structured output. The server validates `JSON.parse` before responding — malformed responses never reach the client.

## 📦 Tech Stack

| Layer         | Technology                         |
| ------------- | ---------------------------------- |
| Framework     | Next.js 16 (App Router)            |
| Language      | TypeScript                         |
| Styling       | Tailwind CSS v4                    |
| Components    | shadcn/ui                          |
| Animation     | Framer Motion                      |
| 3D / Hero     | React Three Fiber + Drei           |
| AI Model      | Google Gemini 2.5 Flash            |
| Data Fetching | TanStack Query v5                  |
| Fonts         | Roboto / Roboto Slab / Roboto Mono |

## 🔧 Setup & Installation

### Prerequisites
- Node.js 20.9+
- pnpm

### Installation

```bash
git clone https://github.com/your-username/savepoultry.git
cd savepoultry

pnpm install
```

### Environment

```bash
cp .env.local.example .env.local
```

Add your Gemini API key to `.env.local`:

```env
GEMINI_API_KEY=your_key_here
```

Get a free key at [aistudio.google.com](https://aistudio.google.com) — no credit card required.

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🛠 Project Structure

```
└── 📁savepoultry
    └── 📁app
        └── 📁api
            ├── 📁diagnose
            │   └── route.ts          # Chat + Quick Scan — Gemini proxy
            └── 📁treatment
                └── route.ts          # Treatment Guide — JSON-enforced route
        └── 📁chat
            └── page.tsx              # Dr. Cluck AI chat
        └── 📁try
            ├── page.tsx              # Feature hub
            └── 📁quick-scan
            └── 📁disease-library
            └── 📁treatment-guide
            └── 📁outbreak-map
        └── 📁how-it-works
            └── page.tsx
        ├── layout.tsx
        ├── page.tsx                  # Landing page
        └── globals.css
    └── 📁components
        └── 📁layout
            ├── Navbar.tsx
            └── Footer.tsx
        └── 📁landing
            ├── Hero.tsx              # Three.js scene + headline
            ├── StatsBar.tsx
            ├── FeaturesGrid.tsx
            ├── DiseaseTicker.tsx
            └── CTASection.tsx
        └── 📁chat
            ├── MessageList.tsx       # Floating clear chat button lives here
            ├── MessageBubble.tsx
            ├── InputBar.tsx
            └── types.ts
        └── 📁how-it-works
        └── 📁try
            └── TryHubCards.tsx
        └── QueryProvider.tsx
    └── 📁hooks
        └── useDiagnose.ts            # TanStack Query mutation for chat
    └── 📁lib
        └── diseases.ts               # Static disease data (10 diseases)
```

## 🎯 Problem & Solution

**Problem:** When a bird gets sick on a smallholder farm, the farmer has no fast way to know what it is. Vets are scarce, expensive, and far away. By the time a diagnosis is made, the disease has spread — sometimes to the entire flock. For families where poultry is a primary income source, that's a financial catastrophe.

**Solution:** SavePoultry gives any farmer with a smartphone a trained AI veterinarian on demand. Upload a photo, describe the symptoms, and get a structured diagnosis with treatment steps in under 30 seconds — for free, no account needed.

## ✅ What's Next

1. **Offline PWA** — works without internet for low-connectivity rural areas
2. **Local language support** — Hausa, Swahili, Hindi, Bengali
3. **Flock health tracker** — log symptoms over time, track which birds are affected
4. **Vet referral network** — connect farmers to verified local veterinarians
5. **Live outbreak data** — integrate FAO/OIE real-time surveillance feeds
6. **SMS diagnosis** — for feature phones with no smartphone or data access
