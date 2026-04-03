import { motion } from "framer-motion";
import { RiCheckboxCircleLine, RiAlertLine, RiErrorWarningLine, RiLeafLine } from "react-icons/ri";
import type { Message, Severity } from "./types";

function SeverityBadge({ severity }: { severity: Severity }) {
  if (!severity) return null;
  const map = {
    mild: { label: "Mild", cls: "bg-green-100 text-green-700", Icon: RiCheckboxCircleLine },
    serious: { label: "Serious", cls: "bg-amber-100 text-amber-700", Icon: RiAlertLine },
    critical: { label: "Critical — Act Now", cls: "bg-red-100 text-red-700", Icon: RiErrorWarningLine },
  };
  const { label, cls, Icon } = map[severity];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-500 ${cls}`}>
      <Icon size={11} />{label}
    </span>
  );
}

function renderContent(text: string) {
  return text.split("\n").map((line, i) => {
    const html = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    if (line.startsWith("•") || line.startsWith("-")) {
      return (
        <li key={i} className="ml-4 list-disc text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html.replace(/^[•\-]\s*/, "") }} />
      );
    }
    return <p key={i} className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary shadow-sm">
          <RiLeafLine size={14} className="text-white" />
        </div>
      )}

      <div className={`max-w-[78%] space-y-2 ${
        isUser
          ? "rounded-2xl rounded-tr-sm bg-primary px-4 py-3"
          : "rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3.5 shadow-sm"
      }`}>
        {/* Image */}
        {msg.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={msg.image} alt="Uploaded bird" className="mb-2 max-h-52 w-full rounded-xl object-cover" />
        )}

        {/* Diagnosis badges */}
        {!isUser && (msg.severity || msg.confidence || msg.disease) && (
          <div className="flex flex-wrap items-center gap-2 pb-1">
            {msg.disease && (
              <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-500 text-text border border-border">
                {msg.disease}
              </span>
            )}
            <SeverityBadge severity={msg.severity ?? null} />
            {msg.confidence && (
              <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-500 text-primary">
                {msg.confidence}% confidence
              </span>
            )}
          </div>
        )}

        {/* Text */}
        <div className={`space-y-1.5 ${isUser ? "text-white" : "text-text"}`}>
          {renderContent(msg.content)}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-2 border border-border text-xs font-700 text-muted">
          U
        </div>
      )}
    </motion.div>
  );
}
