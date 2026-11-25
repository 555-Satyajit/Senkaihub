"use client";

import { useState } from "react";
import { Check, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItemData, mockNotifications } from "../model/notification-types";
import { NotificationItem } from "./NotificationItem";

interface NotificationListProps {
  maxHeight?: string;
  onClose?: () => void;
}

export function NotificationList({ maxHeight = "420px" }: NotificationListProps) {
  const [notifications, setNotifications] = useState<NotificationItemData[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "clans">("all");

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isUnread: false } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return n.isUnread;
    if (filter === "clans") return n.type === "clan_war" || n.type === "vault_unlock";
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-card">
      {/* LinkedIn-style Filter Pills + Mark Read */}
      <div className="px-4 py-2.5 border-b border-border/40 flex items-center justify-between gap-2">
        <Tabs
          value={filter}
          onValueChange={(val) => {
            if (val === "all" || val === "unread" || val === "clans") {
              setFilter(val);
            }
          }}
          className="w-auto"
        >
          <TabsList className="h-8 bg-secondary/60 p-0.5 rounded-lg border border-border/50">
            <TabsTrigger value="all" className="text-xs px-2.5 h-7 rounded-md">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs px-2.5 h-7 rounded-md">
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </TabsTrigger>
            <TabsTrigger value="clans" className="text-xs px-2.5 h-7 rounded-md">
              Clans
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {unreadCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleMarkAllAsRead}
            className="text-[11px] font-semibold h-7 px-2 text-muted-foreground hover:text-foreground cursor-pointer flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5 text-primary" />
            <span>Mark read</span>
          </Button>
        )}
      </div>

      {/* Scrollable Notification Items with ScrollArea */}
      <ScrollArea className={`w-full custom-scrollbar scroll-fade-b`} style={{ maxHeight }}>
        {filteredNotifications.length === 0 ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <BellOff className="w-5 h-5 text-muted-foreground/60" />
            </div>
            <p className="text-xs font-medium">No notifications in this tab</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {filteredNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                notification={notif}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
