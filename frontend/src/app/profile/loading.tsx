import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ProfilePageSkeleton } from "@/features/profile/components/ProfilePageSkeleton";

export default function ProfileLoading() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-[64px] md:h-[84px] bg-background/90 backdrop-blur-md px-4 sm:px-6 md:px-8 border-b border-border/40 max-w-[1720px] w-full mx-auto" />

        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 w-full">
          <ProfilePageSkeleton />
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}
