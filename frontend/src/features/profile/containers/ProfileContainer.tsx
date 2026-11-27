import { ProfileHeaderCard } from "../components/ProfileHeaderCard";
import { ProfileLevelProgress } from "../components/ProfileLevelProgress";
import { ProfileShowcaseTabs } from "../components/ProfileShowcaseTabs";
import { UserProfile, sampleUserProfile } from "../model/profile-types";

interface ProfileContainerProps {
  profile?: UserProfile;
  isOwnProfile?: boolean;
}

export function ProfileContainer({ 
  profile = sampleUserProfile, 
  isOwnProfile = false 
}: ProfileContainerProps) {
  return (
    <div className="w-full flex flex-col gap-6 max-w-[1100px] mx-auto pb-10">
      {/* 1. Profile Top Card (Banner + Stats + Avatar + Bio + Action buttons) */}
      <ProfileHeaderCard profile={profile} isOwnProfile={isOwnProfile} />

      {/* 2. XP Level Progress Bar */}
      <ProfileLevelProgress 
        level={profile.level} 
        nextLevel={profile.nextLevel}
        progress={profile.levelProgress} 
      />

      {/* 3. Showcase Tabs (Posts vs Clan War Trophies) */}
      <ProfileShowcaseTabs 
        posts={profile.posts}
        achievements={profile.achievements} 
      />
    </div>
  );
}
