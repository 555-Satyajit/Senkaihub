import { Smile, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  recipientName: string;
}

export function ChatInput({ value, onChange, onSubmit, recipientName }: ChatInputProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="p-3 sm:px-6 sm:py-4 flex items-end gap-3 shrink-0 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] bg-background border-t border-border/40"
    >
      <div className="relative flex-1 min-w-0 bg-secondary/50 hover:bg-secondary/70 focus-within:bg-secondary border border-border/60 rounded-2xl flex items-center px-4 py-2.5 min-h-[52px] transition-all">
        <textarea
          value={value}
          onBlur={() => {
            // Reset any rogue viewport scroll on iOS when virtual keyboard closes
            setTimeout(() => {
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }, 100);
          }}
          onChange={(e) => {
            onChange(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder={`Message ${recipientName}...`}
          rows={1}
          className="w-full max-h-[140px] bg-transparent border-0 p-0 text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-0 resize-none leading-relaxed custom-scrollbar [word-break:break-word] self-center"
        />
        <button
          type="button"
          onClick={() => onChange(value ? `${value} 🔥` : "🔥")}
          className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer ml-2.5 shrink-0 self-center"
          aria-label="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>
      </div>

      <Button
        type="submit"
        disabled={!value.trim()}
        className="w-13 h-13 rounded-full p-0 flex items-center justify-center shrink-0 shadow-lg shadow-primary/25 cursor-pointer border-0 transition-transform active:scale-95 disabled:opacity-40 mb-0.5"
        style={{ background: "var(--gradient-btn)" }}
        aria-label="Send message"
      >
        <Send className="w-5 h-5 text-white -ml-0.5" />
      </Button>
    </form>
  );
}
