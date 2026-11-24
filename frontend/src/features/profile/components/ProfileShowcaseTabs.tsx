"use client";

import { useState } from "react";
import { Image as ImageIcon, Trophy, Award, Flame, Shield, Swords, Grid3X3, List } from "lucide-react";
import { ClanAchievement } from "../model/profile-types";
import { PostItem } from "@/features/feed/model/feed-types";
import { FeedPostCard } from "@/features/feed/components/FeedPostCard";
import { ProfilePostGridItem } from "./ProfilePostGridItem";
import { Badge } from "@/components/ui/badge";

interface ProfileShowcaseTabsProps {
  posts: PostItem[];
  achievements: ClanAchievement[];
}

export function ProfileShowcaseTabs({ posts, achievements }: ProfileShowcaseTabsProps) {
  const [activeTab, setActiveTab] = useState<"posts" | "achievements">("posts");
  const [viewMode, setViewMode] = useState<"grid" | "feed">("grid");

  const renderAchievementIcon = (type: ClanAchievement["iconType"]) => {
    switch (type) {
      case "trophy":
        return <Trophy className="w-5 h-5 text-accent" />;
      case "flame":
        return <Flame className="w-5 h-5 text-primary" />;
      case "shield":
        return <Shield className="w-5 h-5 text-emerald-400" />;
      case "swords":
        return <Swords className="w-5 h-5 text-accent" />;
      default:
        return <Award className="w-5 h-5 text-foreground" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Tab Controls Bar */}
      <div className="flex items-center justify-between border-b border-border/40 gap-2">
        <div className="flex items-center gap-4 sm:gap-6 min-w-0">
          <button
            type="button"
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-1.5 sm:gap-2 pb-2.5 text-xs sm:text-[14px] font-bold tracking-tight transition-all relative cursor-pointer shrink-0 ${
              activeTab === "posts"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              POSTS <span className="hidden sm:inline">& FAN ART</span> ({posts.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("achievements")}
            className={`flex items-center gap-1.5 sm:gap-2 pb-2.5 text-xs sm:text-[14px] font-bold tracking-tight transition-all relative cursor-pointer shrink-0 ${
              activeTab === "achievements"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>
              TROPHIES <span className="hidden sm:inline">CLAN WAR</span> ({achievements.length})
            </span>
          </button>
        </div>

        {/* Action Controls: View Switcher (Grid vs Feed) - desktop only */}
        {activeTab === "posts" && (
          <div className="hidden sm:flex items-center bg-card border border-border/60 rounded-lg p-0.5 mb-2">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("feed")}
              aria-label="Feed card view"
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                viewMode === "feed"
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 1. Posts Tab Content */}
      {activeTab === "posts" && (
        <>
          {viewMode === "grid" ? (
            /* Responsive 3-Column to 4-Column Showcase Gallery Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
              {posts.map((post) => (
                <ProfilePostGridItem key={post.id} post={post} />
              ))}
            </div>
          ) : (
            /* Single column feed card view */
            <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
              {posts.map((post) => (
                <FeedPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}

      {/* 2. Clan War Trophies & Achievements Display */}
      {activeTab === "achievements" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-5 rounded-[20px] bg-card border border-border/40 shadow-lg flex items-start gap-4 hover:border-border/80 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 border border-border/50 group-hover:scale-105 transition-transform">
                {renderAchievementIcon(ach.iconType)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading font-bold text-sm text-foreground truncate">
                    {ach.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md border-accent/40 text-accent bg-accent/10 shrink-0"
                  >
                    {ach.tier} Tier
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {ach.description}
                </p>

                <span className="text-[10px] text-muted-foreground/60 font-medium block mt-2">
                  Unlocked {ach.unlockedAt}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
