import Link from "next/link";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatUser } from "../model/chat-types";

interface ChatHeaderProps {
  user: ChatUser;
  onBack: () => void;
}

export function ChatHeader({ user, onBack }: ChatHeaderProps) {
  // Derive profile handle from user name or fallback
  const userHandle = user.name.toLowerCase().replace(/\s+/g, "_");

  return (
    <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 border-b border-border/50 flex items-center justify-between bg-card/95 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="md:hidden w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer -ml-1 shrink-0"
          aria-label="Back to messages"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <Link
          href={`/profile/${userHandle}`}
          className="flex items-center gap-3 min-w-0 group/profile hover:opacity-90 transition-opacity"
          title="View profile"
        >
          <div className="relative shrink-0">
            <Avatar className="w-10 h-10 rounded-2xl ring-1 ring-border/80 group-hover/profile:ring-primary/60 transition-all">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {user.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-card" />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="font-heading font-bold text-sm text-foreground truncate group-hover/profile:text-primary transition-colors">
              {user.name}
            </h2>
            <span className="text-[11px] text-muted-foreground">
              {user.isOnline ? "Active now" : "Offline"}
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-1 text-muted-foreground shrink-0">
        <button
          type="button"
          className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center hover:text-foreground transition-colors cursor-pointer"
          aria-label="More options"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
