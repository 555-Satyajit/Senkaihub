import { ProfileHeaderCard } from "../components/ProfileHeaderCard";
import { ProfileLevelProgress } from "../components/ProfileLevelProgress";
import { ProfileShowcaseTabs } from "../components/ProfileShowcaseTabs";
import { sampleUserProfile } from "../model/profile-types";

export function ProfileContainer() {
  return (
    <div className="w-full flex flex-col gap-6 max-w-[1100px] mx-auto pb-10">
      {/* 1. Profile Top Card (Banner + Stats + Avatar + Bio + Action buttons) */}
      <ProfileHeaderCard profile={sampleUserProfile} />

      {/* 2. XP Level Progress Bar */}
      <ProfileLevelProgress 
        level={sampleUserProfile.level} 
        nextLevel={sampleUserProfile.nextLevel}
        progress={sampleUserProfile.levelProgress} 
      />

      {/* 3. Showcase Tabs (Posts vs Clan War Trophies) */}
      <ProfileShowcaseTabs 
        posts={sampleUserProfile.posts}
        achievements={sampleUserProfile.achievements} 
      />
    </div>
  );
}
