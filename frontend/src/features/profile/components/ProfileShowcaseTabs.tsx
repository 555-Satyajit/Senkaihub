"use client";

import { useState } from "react";
import { Image as ImageIcon, Trophy, Flame, Shield, Swords, Award } from "lucide-react";
import { ClanAchievement } from "../model/profile-types";
import { PostItem } from "@/features/feed/model/feed-types";
import { ProfilePostGridItem } from "./ProfilePostGridItem";

interface ProfileShowcaseTabsProps {
  posts: PostItem[];
  achievements: ClanAchievement[];
}

export function ProfileShowcaseTabs({ posts, achievements }: ProfileShowcaseTabsProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "achievements">("posts");

  const getTierBadgeStyle = (tier: ClanAchievement["tier"]) => {
    switch (tier) {
      case "Crimson":
        return "text-primary border-primary/40 bg-primary/10";
      case "Diamond":
        return "text-cyan-400 border-cyan-400/40 bg-cyan-400/10";
      case "Gold":
        return "text-accent border-accent/40 bg-accent/10";
      default:
        return "text-muted-foreground border-border bg-secondary";
    }
  };

  const getIconWrapper = (tier: ClanAchievement["tier"]) => {
    switch (tier) {
      case "Crimson":
        return "bg-primary/10 border-primary/30 text-primary";
      case "Diamond":
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
      case "Gold":
        return "bg-accent/10 border-accent/30 text-accent";
      default:
        return "bg-secondary border-border text-foreground";
    }
  };

  const renderIcon = (type: ClanAchievement["iconType"]) => {
    switch (type) {
      case "trophy":
        return <Trophy className="w-5 h-5" />;
      case "flame":
        return <Flame className="w-5 h-5" />;
      case "shield":
        return <Shield className="w-5 h-5" />;
      case "swords":
        return <Swords className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
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
            TROPHIES <span className="hidden sm:inline">CLAN WAR</span> ({achievements.length})
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

      {/* 2. Clan War Trophies & Achievements Display - Clean Gaming Badges */}
      {activeTab === "achievements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl bg-card border border-border/50 flex items-center justify-between gap-4 transition-colors hover:border-border"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border ${getIconWrapper(
                    ach.tier
                  )}`}
                >
                  {renderIcon(ach.iconType)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-sm text-foreground truncate">
                      {ach.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {ach.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 gap-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getTierBadgeStyle(
                    ach.tier
                  )}`}
                >
                  {ach.tier}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {ach.unlockedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
