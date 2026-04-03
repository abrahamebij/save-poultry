import { useMutation } from "@tanstack/react-query";
import type { Message } from "@/components/chat/types";

interface DiagnosePayload {
  messages: Message[];
  newMessage: Message;
}

interface DiagnoseResponse {
  text: string;
}

async function diagnose(payload: DiagnosePayload): Promise<DiagnoseResponse> {
  // Build Gemini contents array from full conversation
  const allMessages = payload.messages.filter((m) => m.id !== "welcome");

  const contents = allMessages.map((m) => {
    if (m.role === "user") {
      const parts: object[] = [];
      if (m.image) {
        parts.push({
          inline_data: {
            mime_type: m.image.split(";")[0].split(":")[1],
            data: m.image.split(",")[1],
          },
        });
      }
      if (m.content) parts.push({ text: m.content });
      return { role: "user", parts };
    }
    return { role: "model", parts: [{ text: m.content }] };
  });

  const res = await fetch("/api/diagnose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error ?? "Diagnosis request failed.");
  }

  return res.json();
}

export function useDiagnose() {
  return useMutation<DiagnoseResponse, Error, DiagnosePayload>({
    mutationFn: diagnose,
  });
}