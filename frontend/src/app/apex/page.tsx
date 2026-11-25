import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ApexContainer } from "@/features/hall-of-fame";

export default function ApexPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Left Vertical Nav Bar (Desktop & Tablets) */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Header Navigation */}
        <TopHeader />

        {/* 3. Apex Canvas - Full width seamless with zero artificial container box */}
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 xl:px-10 py-5">
          <ApexContainer />
        </main>
      </div>

      {/* 4. Bottom Navigation Bar for Mobile */}
      <MobileBottomNav />
    </div>
  );
}
