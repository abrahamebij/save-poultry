import { RiLeafLine } from "react-icons/ri";

export default function ChatHeader() {
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
          <p className="font-display text-[15px] font-700 text-text">Dr. Cluck</p>
          <p className="text-xs text-muted">AI Poultry Veterinarian · Online</p>
        </div>
        <div className="ml-auto rounded-full bg-primary-light px-3 py-1 text-xs font-500 text-primary">
          Powered by Gemini 2.5 Flash
        </div>
      </div>
    </div>
  );
}
