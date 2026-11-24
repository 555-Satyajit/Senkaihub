import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CreatePostContainer } from "@/features/create-post/containers/CreatePostContainer";

export default function CreatePostPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Desktop Left Navigation Bar */}
      <SidebarNav />

      {/* 2. Main Content Area matching /feed, /clan-wars, and /profile */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navigation */}
        <TopHeader />

        {/* Content Canvas */}
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 xl:px-10 max-w-[1400px] w-full mx-auto">
          <CreatePostContainer />
        </main>
      </div>

      {/* 3. Mobile Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
