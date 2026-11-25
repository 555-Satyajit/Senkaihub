"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { NotificationList } from "@/features/notifications/components/NotificationList";

export default function NotificationsPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Desktop Sidebar */}
      <SidebarNav />

      {/* 2. Main Notification Feed Canvas */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Sticky Mobile/Desktop Top Header */}
        <header className="sticky top-0 z-30 h-16 px-4 sm:px-6 lg:px-8 bg-background/95 backdrop-blur-md border-b border-border/40 flex items-center gap-3">
          <Link
            href="/feed"
            aria-label="Back to feed"
            className="w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary text-foreground flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-heading font-black text-xl text-foreground tracking-tight">
            Notification
          </h1>
        </header>

        {/* Full-width seamless list */}
        <main className="flex-1 w-full max-w-4xl mx-auto">
          <NotificationList isFullPage />
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}

