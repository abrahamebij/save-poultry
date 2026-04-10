"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiLeafLine, RiDeleteBin6Line } from "react-icons/ri";
import MessageBubble from "./MessageBubble";
import type { Message } from "./types";

interface Props {
  messages: Message[];
  loading: boolean;
  onClearChat: () => void;
}

export default function MessageList({ messages, loading, onClearChat }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="relative flex-1 overflow-y-auto px-6 py-8">
      {/* Floating clear button — only when there's real conversation */}
      {messages.length > 1 && (
        <div className="sticky top-0 z-10 flex justify-end mb-4 pointer-events-none">
          <button
            onClick={onClearChat}
            className="pointer-events-auto flex items-center gap-1.5 rounded-lg border border-border bg-surface/90 px-3 py-1.5 text-xs font-500 text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-danger/40 hover:bg-red-50 hover:text-danger"
          >
            <RiDeleteBin6Line size={12} />
            Clear chat
          </button>
        </div>
      )}

      <div className="mx-auto max-w-3xl space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm">
              <RiLeafLine size={14} className="text-white" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3.5 shadow-sm">
              {[0, 0.18, 0.36].map((delay, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-subtle animate-typing"
                  style={{ animationDelay: `${delay}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}