import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { sampleClanDetails } from "@/features/clans/model/sample-clan-details";
import { ClanDetailContainer } from "@/features/clans/containers/ClanDetailContainer";

interface ClanPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ClanPageProps): Promise<Metadata> {
  const { id } = await params;
  const clan = sampleClanDetails[id] || sampleClanDetails["clan-1"];

  return {
    title: `${clan.name} — Clan Citadel | SenkaiHub`,
    description: clan.motto,
  };
}

export default async function ClanPage({ params }: ClanPageProps) {
  const { id } = await params;
  const clan = sampleClanDetails[id] || sampleClanDetails["clan-1"];

  if (!clan) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Left Vertical Nav Bar */}
      <SidebarNav />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Header Navigation */}
        <TopHeader />

        {/* 3. Clan Citadel Canvas */}
        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 max-w-[1720px] w-full mx-auto">
          <ClanDetailContainer clan={clan} />
        </main>
      </div>

      {/* 4. Bottom Navigation Bar for Mobile */}
      <MobileBottomNav />
    </div>
  );
}
