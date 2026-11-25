"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationList } from "../components/NotificationList";

interface NotificationPopoverProps {
  unreadCount?: number;
}

export function NotificationPopover({ unreadCount = 3 }: NotificationPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        type="button"
        aria-label="Notifications"
        className="relative w-[50px] h-[50px] rounded-[18px] bg-card hover:bg-secondary border border-border/80 text-[#A6A9B6] hover:text-foreground shadow-sm transition-all flex items-center justify-center p-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Bell aria-hidden="true" className="!size-6 stroke-[2]" />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 w-[9px] h-[9px] bg-primary rounded-full ring-2 ring-card shadow-sm pointer-events-none"
          />
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={12}
        className="w-[380px] sm:w-[420px] p-0 bg-card border-border/70 shadow-2xl rounded-2xl overflow-hidden focus:outline-none"
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="h-12 px-4 border-b border-border/50 flex items-center justify-between bg-card/90">
          <h3 className="font-heading font-bold text-sm text-foreground">
            Notifications
          </h3>
          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            View all
          </Link>
        </div>

        {/* Content List */}
        <NotificationList maxHeight="380px" onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
}
