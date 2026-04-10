import { RiLeafLine, RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  onClearChat: () => void;
  messageCount: number;
}

export default function ChatHeader({ onClearChat, messageCount }: Props) {
  return (
    <div className="border-b border-border bg-surface px-6 py-4 shrink-0">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-md">
            <RiLeafLine size={19} className="text-white" />
          </div>
          <span className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full border-2 border-surface bg-success" />
        </div>
        <div>
          <p className="font-display text-[15px] font-700 text-text">
            Dr. Cluck
          </p>
          <p className="text-xs text-muted">AI Poultry Veterinarian · Online</p>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="rounded-full bg-primary-light px-3 py-1 text-xs font-500 text-primary">
            Powered by Gemini 2.5 Flash
          </div>

          {/* Clear chat button — only show if there's more than just the welcome message */}
          {messageCount > 1 && (
            <button
              onClick={onClearChat}
              title="Clear chat history"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-500 text-muted transition-colors hover:border-danger/40 hover:bg-red-50 hover:text-danger"
            >
              <RiDeleteBin6Line size={13} />
              Clear chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
