import { ChatMessage } from "../model/chat-types";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const { text, timestamp, isMe } = message;

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div
        className={`max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed transition-all break-words whitespace-pre-wrap overflow-hidden [word-break:break-word] ${
          isMe
            ? "text-primary-foreground rounded-br-xs shadow-md shadow-primary/25"
            : "bg-secondary/90 text-foreground rounded-bl-xs border border-border/60"
        }`}
        style={isMe ? { background: "var(--gradient-btn)" } : undefined}
      >
        {text}
      </div>
      <span className="text-[10px] text-muted-foreground/70 mt-1 px-1">
        {timestamp}
      </span>
    </div>
  );
}
