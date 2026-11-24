"use client";

import { useState } from "react";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ChatContainer } from "@/features/chat/containers/ChatContainer";

export default function ChatPage() {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  return (
    <div className="fixed inset-0 w-full h-full flex bg-background text-foreground overflow-hidden select-none">
      {/* 1. Desktop Left Navigation Bar */}
      <SidebarNav />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        <main
          className={`flex-1 w-full min-h-0 h-full flex flex-col overflow-hidden ${
            isMobileChatOpen
              ? "pb-0"
              : "pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0"
          }`}
        >
          <ChatContainer onMobileChatOpenChange={setIsMobileChatOpen} />
        </main>
      </div>

      {/* 3. Mobile Navigation Bar - Hidden dynamically when inside active conversation */}
      {!isMobileChatOpen && <MobileBottomNav />}
    </div>
  );
}
