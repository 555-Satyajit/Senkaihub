import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ChatPageSkeleton } from "@/features/chat/components/ChatPageSkeleton";

export default function ChatLoading() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />

        <main className="flex-1 w-full overflow-hidden">
          <ChatPageSkeleton />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
