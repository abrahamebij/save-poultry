import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

const SYSTEM_PROMPT = `You are Dr. Cluck, a highly knowledgeable and warm poultry veterinarian AI assistant. Your job is to help farmers, veterinarians, and poultry owners diagnose sick birds from photos and symptom descriptions.

When a user shares a photo or describes symptoms, analyze carefully and respond with:
1. A likely disease/condition name
2. Your confidence level (as a percentage, e.g. "85% confidence")
3. Severity level — use exactly one of these words: mild, serious, or critical
4. Key symptoms you observed
5. Immediate action steps
6. Whether they should see a real vet

Be warm but professional. If no image is provided, ask follow-up questions about visual symptoms.

Common diseases: Newcastle Disease, Marek's Disease, Coccidiosis, Avian Influenza, Infectious Bronchitis, Fowl Pox, Salmonella, Aspergillosis, Bumblefoot, Egg-bound condition.

Always end with a reminder that you are an AI and a licensed vet should confirm the diagnosis.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured on server." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { contents } = body;

    if (!contents || !Array.isArray(contents)) {
      return NextResponse.json(
        { error: "Invalid request body. Expected { contents: [...] }" },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.json();
      return NextResponse.json(
        { error: err?.error?.message ?? "Gemini API error" },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't process that. Please try again.";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("[/api/diagnose]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}