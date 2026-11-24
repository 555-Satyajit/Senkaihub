import Image from "next/image";
import { ChatConversation } from "../model/chat-types";

interface ChatListItemProps {
  conversation: ChatConversation;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ChatListItem({ conversation, isSelected, onSelect }: ChatListItemProps) {
  const { user, lastMessage, lastMessageTime, unreadCount } = conversation;

  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={`w-full p-3 sm:p-3.5 rounded-2xl flex items-center gap-3.5 transition-all text-left cursor-pointer group min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        isSelected
          ? "bg-secondary border border-border shadow-md"
          : "bg-secondary/40 hover:bg-secondary/70 border border-transparent hover:border-border/40"
      }`}
    >
      {/* User Avatar with Status Indicator */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-2xl overflow-hidden relative border border-border/60 group-hover:scale-105 transition-transform">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Online Dot (Green) */}
        {user.isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-card" />
        )}

        {/* Status Badge (e.g. '1h' pill) */}
        {!user.isOnline && user.statusBadge && (
          <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-muted-foreground border border-border ring-2 ring-card shadow-sm">
            {user.statusBadge}
          </span>
        )}
      </div>

      {/* Conversation Meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="font-heading font-semibold text-sm text-foreground truncate">
            {user.name}
          </span>
          <span className="text-[11px] text-muted-foreground/80 shrink-0 font-medium">
            {lastMessageTime}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground truncate group-hover:text-foreground/80 transition-colors">
            {lastMessage}
          </p>

          {/* Blue Unread Count Pill */}
          {Boolean(unreadCount) && (
            <span className="shrink-0 w-5 h-5 rounded-full bg-[#0088ff] text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
