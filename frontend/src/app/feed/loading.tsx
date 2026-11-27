import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { FeedPostSkeleton } from "@/features/feed/components/FeedPostSkeleton";

export default function FeedLoading() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />

        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 md:px-8 max-w-[720px] w-full mx-auto flex flex-col gap-5">
          <FeedPostSkeleton />
          <FeedPostSkeleton />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
