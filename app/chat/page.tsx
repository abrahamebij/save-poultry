"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiSendPlane2Line,
  RiImageAddLine,
  RiCloseLine,
  RiLeafLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiErrorWarningLine,
} from "react-icons/ri";
import Navbar from "@/components/Navbar";

type Severity = "mild" | "serious" | "critical" | null;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string; // base64 preview
  severity?: Severity;
  confidence?: number;
  disease?: string;
}

const SYSTEM_PROMPT = `You are Dr. Cluck, a highly knowledgeable and warm poultry veterinarian AI assistant. Your job is to help farmers, veterinarians, and poultry owners diagnose sick birds from photos and symptom descriptions.

When a user shares a photo or describes symptoms, analyze carefully and respond with:
1. A likely disease/condition name
2. Your confidence level (as a percentage)
3. Severity level — one of: mild, serious, or critical
4. Key symptoms you observed or that match
5. Immediate action steps (treatment/isolation/etc.)
6. Whether they should see a real vet

Format your diagnosis clearly. Be warm but professional. If no image is provided, ask follow-up questions about specific visual symptoms (comb color, feather condition, droppings, posture, eyes).

Common poultry diseases to consider: Newcastle Disease, Marek's Disease, Coccidiosis, Avian Influenza, Infectious Bronchitis, Fowl Pox, Salmonella, Aspergillosis, Bumblefoot, Egg-bound condition.

Always end responses with a reminder that you are an AI assistant and that a licensed veterinarian should be consulted for definitive diagnosis and treatment. Keep responses conversational but structured.`;

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm **Dr. Cluck** 🐔, your AI poultry veterinarian.\n\nI can help you diagnose health issues in your birds. To get started:\n\n• **Upload a photo** of the sick bird using the image button\n• **Describe the symptoms** you're noticing — how long, which birds, any changes in behavior\n\nThe more detail you give me, the more accurate my diagnosis will be. What's going on with your flock today?",
};

function SeverityBadge({ severity }: { severity: Severity }) {
  if (!severity) return null;
  const config = {
    mild: { label: "Mild", className: "bg-green-100 text-green-700", icon: RiCheckboxCircleLine },
    serious: { label: "Serious", className: "bg-amber-100 text-amber-700", icon: RiAlertLine },
    critical: { label: "Critical", className: "bg-red-100 text-red-700", icon: RiErrorWarningLine },
  };
  const { label, className, icon: Icon } = config[severity];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-600 ${className}`}>
      <Icon size={12} />
      {label}
    </span>
  );
}

function formatContent(text: string) {
  // Very basic markdown-like rendering
  return text
    .split("\n")
    .map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      if (line.startsWith("•")) {
        return <li key={i} className="ml-3 list-none" dangerouslySetInnerHTML={{ __html: bold }} />;
      }
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
    });
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    if (fileRef.current) fileRef.current.value = "";
  }

  async function sendMessage() {
    if (!input.trim() && !imageFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      image: imagePreview || undefined,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    clearImage();
    setLoading(true);

    try {
      // Build Gemini API contents array
      const contents = updatedMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => {
          if (m.role === "user") {
            const parts: object[] = [];
            if (m.image) {
              const base64Data = m.image.split(",")[1];
              const mimeType = m.image.split(";")[0].split(":")[1];
              parts.push({ inline_data: { mime_type: mimeType, data: base64Data } });
            }
            if (m.content) parts.push({ text: m.content });
            return { role: "user", parts };
          } else {
            return { role: "model", parts: [{ text: m.content }] };
          }
        });

      // If only welcome message exists, contents will be empty — add the user message
      if (contents.length === 0) {
        const parts: object[] = [];
        if (userMessage.image) {
          const base64Data = userMessage.image.split(",")[1];
          const mimeType = userMessage.image.split(";")[0].split(":")[1];
          parts.push({ inline_data: { mime_type: mimeType, data: base64Data } });
        }
        if (userMessage.content) parts.push({ text: userMessage.content });
        contents.push({ role: "user", parts });
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        }
      );

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't process that. Please try again.";

      // Parse severity and confidence from response
      const severityMatch = text.match(/\b(mild|serious|critical)\b/i);
      const confidenceMatch = text.match(/(\d{1,3})%\s*(confidence|certain|accurate)/i);
      const diseaseMatch = text.match(
        /\b(Newcastle|Marek|Coccidiosis|Avian Influenza|Infectious Bronchitis|Fowl Pox|Salmonella|Aspergillosis|Bumblefoot)\b/i
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: text,
        severity: severityMatch
          ? (severityMatch[1].toLowerCase() as Severity)
          : null,
        confidence: confidenceMatch ? parseInt(confidenceMatch[1]) : undefined,
        disease: diseaseMatch ? diseaseMatch[1] : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "I ran into an issue connecting to my systems. Please check your API key in `.env.local` and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />

      <div className="flex flex-1 flex-col overflow-hidden pt-16">
        {/* Chat header */}
        <div className="border-b border-border bg-surface px-6 py-4">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <RiLeafLine size={18} className="text-white" />
            </div>
            <div>
              <p className="font-display text-base font-700 text-text">Dr. Cluck</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                AI Poultry Veterinarian · Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-3xl space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-800 text-white">
                      Dr
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] space-y-2 ${
                      msg.role === "user"
                        ? "rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-white"
                        : "rounded-2xl rounded-tl-sm bg-surface border border-border px-4 py-3 text-text"
                    }`}
                  >
                    {/* Image preview in user message */}
                    {msg.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={msg.image}
                        alt="Uploaded bird"
                        className="mb-2 max-h-48 w-full rounded-lg object-cover"
                      />
                    )}

                    {/* Diagnosis badges */}
                    {msg.role === "assistant" && (msg.severity || msg.confidence || msg.disease) && (
                      <div className="flex flex-wrap items-center gap-2 pb-1">
                        {msg.disease && (
                          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-600 text-text">
                            {msg.disease}
                          </span>
                        )}
                        <SeverityBadge severity={msg.severity ?? null} />
                        {msg.confidence && (
                          <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-600 text-primary">
                            {msg.confidence}% confidence
                          </span>
                        )}
                      </div>
                    )}

                    {/* Message text */}
                    <div className={`space-y-1.5 text-sm ${msg.role === "user" ? "text-white" : "text-text"}`}>
                      {formatContent(msg.content)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading dots */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-800 text-white">
                  Dr
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full bg-muted animate-typing"
                      style={{ animationDelay: `${delay}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-surface px-6 py-4">
          <div className="mx-auto max-w-3xl">
            {/* Image preview strip */}
            {imagePreview && (
              <div className="mb-3 flex items-center gap-2">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-14 w-14 rounded-lg object-cover border border-border"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-text text-white"
                  >
                    <RiCloseLine size={12} />
                  </button>
                </div>
                <p className="text-xs text-muted">Image attached · ready to send</p>
              </div>
            )}

            <div className="flex items-end gap-3 rounded-2xl border border-border bg-background p-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              {/* Image upload button */}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                onClick={() => fileRef.current?.click()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-muted transition-colors hover:bg-primary-light hover:text-primary"
              >
                <RiImageAddLine size={18} />
              </button>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe symptoms or ask Dr. Cluck anything…"
                rows={1}
                className="flex-1 resize-none bg-transparent text-sm text-text placeholder:text-subtle outline-none max-h-32"
                style={{ scrollbarWidth: "none" }}
              />

              {/* Send button */}
              <button
                onClick={sendMessage}
                disabled={loading || (!input.trim() && !imageFile)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <RiSendPlane2Line size={16} />
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-subtle">
              Dr. Cluck is an AI assistant. Always consult a licensed veterinarian for definitive diagnosis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}