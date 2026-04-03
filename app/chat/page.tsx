"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import InputBar from "@/components/chat/InputBar";
import { SYSTEM_PROMPT, WELCOME_MESSAGE } from "@/components/chat/types";
import type { Message } from "@/components/chat/types";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function clearImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function sendMessage() {
    if (!input.trim() && !imageFile) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      image: imagePreview || undefined,
    };

    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    clearImage();
    setLoading(true);

    try {
      const contents = allMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => {
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

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        },
      );

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Sorry, I couldn't process that. Please try again.";

      const severityMatch = text.match(/\b(mild|serious|critical)\b/i);
      const confidenceMatch = text.match(
        /(\d{1,3})%\s*(confidence|certain|sure)/i,
      );
      const diseaseMatch = text.match(
        /\b(Newcastle Disease|Marek's Disease|Coccidiosis|Avian Influenza|Infectious Bronchitis|Fowl Pox|Salmonella|Aspergillosis|Bumblefoot)\b/i,
      );

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: text,
          severity: severityMatch
            ? (severityMatch[1].toLowerCase() as Message["severity"])
            : null,
          confidence: confidenceMatch
            ? parseInt(confidenceMatch[1])
            : undefined,
          disease: diseaseMatch ? diseaseMatch[1] : undefined,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Connection error. Check your `NEXT_PUBLIC_GEMINI_API_KEY` in `.env.local` and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 flex-col overflow-hidden pt-16">
        {/* <ChatHeader /> */}
        <MessageList messages={messages} loading={loading} />
        <InputBar
          input={input}
          setInput={setInput}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onClearImage={clearImage}
          onSend={sendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}