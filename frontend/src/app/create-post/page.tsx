import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CreatePostContainer } from "@/features/create-post/containers/CreatePostContainer";

export default function CreatePostPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Desktop Left Navigation Bar */}
      <SidebarNav />

      {/* 2. Main Full-Page Canvas - Direct full-bleed layout, no floating nested box */}
      <main className="flex-1 h-screen overflow-y-auto w-full flex flex-col">
        <CreatePostContainer />
      </main>

      {/* 3. Mobile Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
