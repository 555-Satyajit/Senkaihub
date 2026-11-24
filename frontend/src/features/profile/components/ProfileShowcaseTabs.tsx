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

      {/* 2. Clan War Trophies & Achievements Display - Collectible Badges Grid (Reddit / Trailhead style) */}
      {activeTab === "achievements" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-2">
          {achievements.map((ach) => {
            const isCrimson = ach.tier === "Crimson";
            const isDiamond = ach.tier === "Diamond";

            // Authentic badge palette & embroidered stitch borders
            const badgeBg = isCrimson
              ? "bg-gradient-to-b from-red-500/20 to-red-950/40 text-primary border-red-500/40 ring-red-500/20 shadow-red-500/10"
              : isDiamond
              ? "bg-gradient-to-b from-cyan-400/20 to-cyan-950/40 text-cyan-400 border-cyan-400/40 ring-cyan-400/20 shadow-cyan-400/10"
              : "bg-gradient-to-b from-amber-400/20 to-amber-950/40 text-amber-400 border-amber-400/40 ring-amber-400/20 shadow-amber-400/10";

            const tierColor = isCrimson
              ? "text-primary bg-primary/10 border-primary/30"
              : isDiamond
              ? "text-cyan-400 bg-cyan-400/10 border-cyan-400/30"
              : "text-amber-400 bg-amber-400/10 border-amber-400/30";

            return (
              <div
                key={ach.id}
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-card border border-border/50 hover:border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer"
              >
                {/* Physical Collectible Circular Patch / Shield Badge */}
                <div className="relative mb-3">
                  {/* Outer stitched ring */}
                  <div
                    className={`w-18 h-18 rounded-full flex items-center justify-center border-2 border-dashed ring-4 ring-offset-2 ring-offset-card transition-transform duration-300 group-hover:scale-110 shadow-lg ${badgeBg}`}
                  >
                    {/* Inner embroidered medal shield */}
                    <div className="w-13 h-13 rounded-full bg-card/80 flex items-center justify-center border border-current shadow-inner">
                      {renderIcon(ach.iconType)}
                    </div>
                  </div>
                </div>

                {/* Badge Title */}
                <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-snug">
                  {ach.description}
                </p>

                {/* Bottom Tier Stamp */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${tierColor}`}
                  >
                    {ach.tier}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-medium">
                    · {ach.unlockedAt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
