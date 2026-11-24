import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { CreatePostContainer } from "@/features/create-post/containers/CreatePostContainer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Desktop Left Navigation Bar */}
      <SidebarNav />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar with return to feed */}
        <header className="h-[64px] md:h-[76px] bg-background/90 backdrop-blur-md px-4 sm:px-6 md:px-8 xl:px-10 flex items-center justify-between sticky top-0 z-30 border-b border-border/40">
          <div className="flex items-center gap-3">
            <Link
              href="/feed"
              aria-label="Back to feed"
              className="w-10 h-10 rounded-xl bg-card hover:bg-secondary text-foreground border border-border/60 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <span className="font-heading font-bold text-base md:text-lg text-foreground">
              New Community Submission
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-8 lg:px-8 xl:px-10 w-full">
          <CreatePostContainer />
        </main>
      </div>

      {/* 3. Mobile Navigation Bar */}
      <MobileBottomNav />
    </div>
  );
}
