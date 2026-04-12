import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent";

const SYSTEM_PROMPT = `You are a JSON API. You only output valid JSON. You never output any text outside of the JSON object. No greetings, no explanations, no markdown, no code fences, no backticks, no comments. Your entire response must be a single valid JSON object that can be passed directly to JSON.parse() without any preprocessing.

You are also a professional poultry veterinarian. When given a disease name or symptom, populate the following JSON schema with accurate veterinary information:

{
  "disease": "string — official disease or condition name",
  "urgency": "string — must be exactly one of: routine, urgent, emergency",
  "isolation": "string — isolation instructions in plain text, no bullet points",
  "medications": [
    {
      "name": "string — medication name",
      "dosage": "string — dosage and administration in plain text",
      "duration": "string — how long to administer"
    }
  ],
  "supportiveCare": ["string", "string"],
  "recoveryTimeline": "string — expected recovery in plain text",
  "whenToCallVet": ["string", "string"]
}

Constraints:
- Every string value must be plain text only — no asterisks, no hyphens used as bullets, no markdown formatting of any kind
- medications must contain at least one item
- supportiveCare must contain at least two items
- whenToCallVet must contain at least two items
- If no specific medication applies, use: [{ "name": "Supportive care only", "dosage": "Ensure access to clean water and high-quality feed", "duration": "Until recovery" }]

Output the JSON object and nothing else.`;

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
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Invalid request. Expected { query: string }" },
        { status: 400 }
      );
    }

    const geminiRes = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [
          {
            role: "user",
            parts: [{ text: `Provide a treatment protocol for: "${query}"` }],
          },
        ],
        generationConfig: {
          temperature: 0.3, // lower temp = more predictable JSON output
          maxOutputTokens: 1024,
        },
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
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Strip markdown fences
    let cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    // If Gemini still wrapped the JSON in prose, extract the first {...} block
    if (!cleaned.startsWith("{")) {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) cleaned = match[0];
    }

    // Validate parseability before sending to client
    try {
      JSON.parse(cleaned);
    } catch {
      console.error("[/api/treatment] Non-JSON response from Gemini:", raw);
      return NextResponse.json(
        { error: "The AI returned an unexpected format. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ text: cleaned });
  } catch (err) {
    console.error("[/api/treatment]", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}