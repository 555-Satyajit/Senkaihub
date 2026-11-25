import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Heart, UserPlus, AtSign, Swords, Key, MoreHorizontal, Trash2, CheckCircle2 } from "lucide-react";
import { NotificationItemData } from "../model/notification-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationItemProps {
  notification: NotificationItemData;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const { id, type, actor, content, time, isUnread, linkHref } = notification;

  const renderTypeIcon = () => {
    switch (type) {
      case "comment":
        return <MessageSquare className="w-2.5 h-2.5 text-blue-400" />;
      case "like":
        return <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />;
      case "follow":
        return <UserPlus className="w-2.5 h-2.5 text-emerald-400" />;
      case "tag":
        return <AtSign className="w-2.5 h-2.5 text-amber-400" />;
      case "clan_war":
        return <Swords className="w-2.5 h-2.5 text-primary" />;
      case "vault_unlock":
        return <Key className="w-2.5 h-2.5 text-accent" />;
      default:
        return null;
    }
  };

  const itemContent = (
    <div
      className={`w-full py-3.5 px-4 sm:px-5 flex items-start gap-3.5 transition-colors group cursor-pointer ${
        isUnread ? "bg-secondary/40 hover:bg-secondary/70" : "hover:bg-secondary/30"
      }`}
    >
      {/* Squircle Avatar with Sub-badge */}
      <div className="relative shrink-0 mt-0.5">
        <div className="w-11 h-11 rounded-2xl overflow-hidden relative border border-border/60 group-hover:scale-105 transition-transform bg-secondary">
          <Image
            src={actor.avatar}
            alt={actor.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Small Type Action Overlay */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-card border border-border/80 flex items-center justify-center shadow-sm">
          {renderTypeIcon()}
        </div>
      </div>

      {/* Text & Timing */}
      <div className="flex-1 min-w-0 pr-1">
        <p className="text-sm leading-snug text-foreground">
          <span className="font-heading font-bold text-foreground hover:underline">
            {actor.name}
          </span>{" "}
          <span className="text-muted-foreground font-normal">{content}</span>
        </p>
        <span className="text-[12px] text-muted-foreground/80 mt-1 block font-medium">
          {time}
        </span>
      </div>

      {/* Right Actions: Unread Dot + Dropdown Menu */}
      <div className="flex items-center gap-2 shrink-0 self-center" onClick={(e) => e.stopPropagation()}>
        {isUnread && (
          <span
            className="w-2 h-2 rounded-full bg-primary ring-2 ring-background shrink-0"
            aria-label="Unread notification"
          />
        )}

        <DropdownMenu>
          <DropdownMenuTrigger
            className="w-8 h-8 rounded-full opacity-60 hover:opacity-100 hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer focus-visible:outline-none"
            aria-label="Notification actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 bg-card border-border/70 shadow-xl rounded-xl p-1">
            {isUnread && onMarkAsRead && (
              <DropdownMenuItem
                onClick={() => onMarkAsRead(id)}
                className="text-xs font-medium cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-secondary text-foreground flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Mark as read</span>
              </DropdownMenuItem>
            )}
            {onDelete && (
              <DropdownMenuItem
                onClick={() => onDelete(id)}
                className="text-xs font-medium cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-destructive/10 text-destructive flex items-center gap-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="border-b border-border/30 last:border-b-0">
      {linkHref ? (
        <Link href={linkHref} className="block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          {itemContent}
        </Link>
      ) : (
        itemContent
      )}
    </div>
  );
}
