import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CreatePostContainer } from "@/features/create-post/containers/CreatePostContainer";

export default function CreatePostPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Desktop Left Navigation Bar */}
      <SidebarNav />

      {/* 2. Main Content Canvas - Clean native layout (NO redundant nested top headers) */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-3 py-3 sm:px-6 sm:py-6 lg:px-8 w-full flex items-center justify-center">
          <CreatePostContainer />
        </main>
      </div>

      {/* 3. Mobile Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
