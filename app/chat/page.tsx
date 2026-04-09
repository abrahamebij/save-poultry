"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MessageList from "@/components/chat/MessageList";
import InputBar from "@/components/chat/InputBar";
import { WELCOME_MESSAGE } from "@/components/chat/types";
import { useDiagnose } from "@/hooks/useDiagnose";
import type { Message } from "@/components/chat/types";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate: diagnose, isPending } = useDiagnose();

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

  function sendMessage() {
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

    diagnose(
      { messages: allMessages, newMessage: userMsg },
      {
        onSuccess: (data) => {
          const text = data.text;
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
        },
        onError: (err) => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant",
              content: `Something went wrong: ${err.message}`,
            },
          ]);
        },
      },
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 flex-col overflow-hidden pt-16">
        {/* <ChatHeader /> */}
        <MessageList messages={messages} loading={isPending} />
        <InputBar
          input={input}
          setInput={setInput}
          imagePreview={imagePreview}
          onImageChange={handleImageChange}
          onClearImage={clearImage}
          onSend={sendMessage}
          loading={isPending}
        />
      </div>
    </div>
  );
}
