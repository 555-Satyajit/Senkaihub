import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { FeedContainer } from "@/features/feed";

export default function FeedPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Left Vertical Nav Bar (Desktop & Tablets) */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Header Navigation */}
        <TopHeader />

        {/* 3. Feed Canvas */}
        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 max-w-[1720px] w-full mx-auto">
          <FeedContainer />
        </main>
      </div>

      {/* 4. Bottom Navigation Bar for Mobile */}
      <MobileBottomNav />
    </div>
  );
}
