"use client";

import { useState } from "react";
import { 
  Image as ImageIcon, 
  Trophy, 
  Flame, 
  Shield, 
  Swords, 
  Crown, 
  Star, 
  Zap, 
  Target, 
  Lock,
  Award
} from "lucide-react";
import { ClanAchievement } from "../model/profile-types";
import { PostItem } from "@/features/feed/model/feed-types";
import { ProfilePostGridItem } from "./ProfilePostGridItem";

interface ProfileShowcaseTabsProps {
  posts: PostItem[];
  achievements: ClanAchievement[];
}

export function ProfileShowcaseTabs({ posts, achievements }: ProfileShowcaseTabsProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "achievements">("posts");

  const renderIcon = (type: ClanAchievement["iconType"]) => {
    switch (type) {
      case "trophy":
        return <Trophy className="w-8 h-8 stroke-[2.2]" />;
      case "flame":
        return <Flame className="w-8 h-8 stroke-[2.2]" />;
      case "shield":
        return <Shield className="w-8 h-8 stroke-[2.2]" />;
      case "swords":
        return <Swords className="w-8 h-8 stroke-[2.2]" />;
      case "crown":
        return <Crown className="w-8 h-8 stroke-[2.2]" />;
      case "star":
        return <Star className="w-8 h-8 stroke-[2.2]" />;
      case "zap":
        return <Zap className="w-8 h-8 stroke-[2.2]" />;
      case "target":
        return <Target className="w-8 h-8 stroke-[2.2]" />;
      default:
        return <Award className="w-8 h-8 stroke-[2.2]" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Tab Controls Bar */}
      <div className="flex items-center border-b border-border/40 gap-6">
        <button
          type="button"
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 pb-2.5 text-xs sm:text-[14px] font-bold tracking-tight transition-all relative cursor-pointer ${
            activeTab === "posts"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>
            POSTS <span className="hidden sm:inline">& FAN ART</span> ({posts.length})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("achievements")}
          className={`flex items-center gap-2 pb-2.5 text-xs sm:text-[14px] font-bold tracking-tight transition-all relative cursor-pointer ${
            activeTab === "achievements"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>
            ACHIEVEMENTS ({achievements.length})
          </span>
        </button>
      </div>

      {/* 1. Posts Tab Content - Clean Gallery Grid */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {posts.map((post) => (
            <ProfilePostGridItem key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* 2. Reddit / Trailhead Style Circular Collectible Badges Grid */}
      {activeTab === "achievements" && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-7 gap-x-4 py-3">
          {achievements.map((ach) => {
            const isLocked = ach.isLocked;

            // Palette definitions mirroring Reddit/Trailhead 3D golden bevel tokens
            let rimGradient = "from-[#FFB703] via-[#FB8500] to-[#E85D04]"; // Reddit warm golden rim
            let innerCore = "bg-gradient-to-b from-[#1C1635] via-[#241E45] to-[#120F26] text-amber-300";
            let iconColor = "text-amber-300 drop-shadow-[0_2px_8px_rgba(251,133,0,0.6)]";
            let glow = "group-hover:shadow-[0_0_28px_rgba(251,133,0,0.45)]";

            if (ach.tier === "Crimson" && !isLocked) {
              rimGradient = "from-[#FF4D4D] via-[#D90429] to-[#800F2F]";
              innerCore = "bg-gradient-to-b from-[#2B0E17] via-[#380E1C] to-[#16060B] text-rose-300";
              iconColor = "text-rose-400 drop-shadow-[0_2px_8px_rgba(217,4,41,0.7)]";
              glow = "group-hover:shadow-[0_0_28px_rgba(217,4,41,0.5)]";
            } else if (ach.tier === "Diamond" && !isLocked) {
              rimGradient = "from-[#70E000] via-[#38B000] to-[#007200]";
              innerCore = "bg-gradient-to-b from-[#0D2818] via-[#0F3822] to-[#05160E] text-emerald-300";
              iconColor = "text-emerald-300 drop-shadow-[0_2px_8px_rgba(56,176,0,0.6)]";
              glow = "group-hover:shadow-[0_0_28px_rgba(56,176,0,0.5)]";
            }

            if (isLocked) {
              rimGradient = "from-[#3A3D4A] via-[#2A2C35] to-[#1E2027]";
              innerCore = "bg-[#181920] text-muted-foreground/40";
              iconColor = "text-muted-foreground/40";
              glow = "group-hover:shadow-none";
            }

            return (
              <div
                key={ach.id}
                className="group flex flex-col items-center text-center cursor-pointer select-none transition-transform duration-200 hover:-translate-y-1.5"
                title={`${ach.title} - ${ach.description}`}
              >
                {/* 3D Beveled Reddit-Style Medallion */}
                <div
                  className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[3px] bg-gradient-to-b ${rimGradient} shadow-[0_6px_16px_rgba(0,0,0,0.5)] ${glow} transition-all duration-300 flex items-center justify-center`}
                >
                  {/* Subtle Top Specular Sheen (Reddit Badge shine effect) */}
                  <div className="absolute inset-x-2 top-1 h-[38%] rounded-t-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none opacity-80" />

                  {/* Inner Coin Core Surface */}
                  <div
                    className={`w-full h-full rounded-full ${innerCore} flex items-center justify-center relative overflow-hidden border border-black/30 shadow-inner`}
                  >
                    {/* Starfield / Sparkle background pattern inside coin */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.12)_0%,transparent_70%)]" />

                    {/* Medal Character Icon or Lock */}
                    <div className={`relative z-10 transition-transform duration-200 group-hover:scale-110 ${iconColor}`}>
                      {isLocked ? (
                        <Lock className="w-7 h-7 stroke-[2]" />
                      ) : (
                        renderIcon(ach.iconType)
                      )}
                    </div>
                  </div>
                </div>

                {/* Badge Title */}
                <h4
                  className={`font-heading font-semibold text-[11px] sm:text-xs mt-2.5 max-w-[105px] truncate transition-colors ${
                    isLocked ? "text-muted-foreground/70" : "text-foreground group-hover:text-primary"
                  }`}
                >
                  {ach.title}
                </h4>

                {/* Date or Locked Progress Subtitle (like Reddit streaks/dates) */}
                <span className="text-[10px] text-muted-foreground/70 mt-0.5 font-medium">
                  {isLocked ? ach.progress || "Locked" : ach.unlockedAt}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
