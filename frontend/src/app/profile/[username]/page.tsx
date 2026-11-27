import { notFound } from "next/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ProfileTopNavbar } from "@/features/profile/components/ProfileTopNavbar";
import { ProfileContainer } from "@/features/profile/containers/ProfileContainer";
import { getProfileByUsername } from "@/features/profile/model/profile-types";

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params;
  if (!username) {
    notFound();
  }

  const profile = getProfileByUsername(username);
  const isOwnProfile = username.toLowerCase() === "altersky";

  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Left Vertical Nav Bar (Desktop & Tablets) */}
      <SidebarNav />

      {/* Main Content Area - Full width with custom Profile Top Navbar (NO right sidebar) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Custom Profile Top Navbar */}
        <ProfileTopNavbar 
          name={profile.name} 
          handle={profile.handle} 
        />

        {/* Profile Canvas */}
        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 w-full">
          <ProfileContainer profile={profile} isOwnProfile={isOwnProfile} />
        </main>
      </div>

      {/* 4. Bottom Navigation Bar for Mobile */}
      <MobileBottomNav />
    </div>
  );
}
