"use client";

import { useRef } from "react";
import { RiSendPlane2Line, RiImageAddLine, RiCloseLine } from "react-icons/ri";

interface Props {
  input: string;
  setInput: (v: string) => void;
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: () => void;
  onSend: () => void;
  loading: boolean;
}

export default function InputBar({
  input, setInput, imagePreview, onImageChange, onClearImage, onSend, loading,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(); }
  }

  return (
    <div className="shrink-0 border-t border-border bg-surface px-6 py-5">
      <div className="mx-auto max-w-3xl space-y-3">
        {/* Image preview */}
        {imagePreview && (
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="Preview"
                className="h-16 w-16 rounded-xl object-cover border border-border shadow-sm"
              />
              <button
                onClick={onClearImage}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-text text-white shadow"
              >
                <RiCloseLine size={11} />
              </button>
            </div>
            <p className="text-xs text-muted">Image ready to send</p>
          </div>
        )}

        {/* Input row */}
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-muted transition-colors hover:bg-primary-light hover:text-primary"
            title="Attach image"
          >
            <RiImageAddLine size={17} />
          </button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Describe symptoms or ask Dr. Cluck anything…"
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-text placeholder:text-subtle outline-none max-h-36 leading-relaxed"
            style={{ scrollbarWidth: "none" }}
          />

          <button
            onClick={onSend}
            disabled={loading || (!input.trim() && !imagePreview)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-sm transition-all hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RiSendPlane2Line size={15} />
          </button>
        </div>

        <p className="text-center text-[11px] text-subtle">
          Dr. Cluck is an AI assistant · Always confirm with a licensed vet
          before treatment
        </p>
      </div>
    </div>
  );
}
