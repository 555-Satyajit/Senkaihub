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

      {/* 2. Clan War Trophies & Achievements Display - Hexagonal Trophy Cabinet / Medallion Showcase */}
      {activeTab === "achievements" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 py-2">
          {achievements.map((ach) => {
            const isCrimson = ach.tier === "Crimson";
            const isDiamond = ach.tier === "Diamond";
            const isGold = ach.tier === "Gold";

            const glowColor = isCrimson
              ? "shadow-[0_0_24px_-4px_rgba(239,68,68,0.35)] border-primary/50 group-hover:border-primary"
              : isDiamond
              ? "shadow-[0_0_24px_-4px_rgba(34,211,238,0.35)] border-cyan-400/50 group-hover:border-cyan-400"
              : "shadow-[0_0_24px_-4px_rgba(245,158,11,0.35)] border-accent/50 group-hover:border-accent";

            const hexBg = isCrimson
              ? "from-primary/20 via-primary/5 to-transparent text-primary"
              : isDiamond
              ? "from-cyan-400/20 via-cyan-400/5 to-transparent text-cyan-400"
              : "from-accent/20 via-accent/5 to-transparent text-accent";

            const badgePill = isCrimson
              ? "bg-primary/20 text-primary border-primary/40"
              : isDiamond
              ? "bg-cyan-400/20 text-cyan-400 border-cyan-400/40"
              : "bg-accent/20 text-accent border-accent/40";

            return (
              <div
                key={ach.id}
                className="group relative flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-b from-card to-card/60 border border-border/60 hover:border-border transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg overflow-hidden select-none"
              >
                {/* Background ambient radial glow */}
                <div
                  className={`absolute -top-12 -left-12 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity ${
                    isCrimson ? "bg-primary" : isDiamond ? "bg-cyan-400" : "bg-accent"
                  }`}
                />

                {/* Hexagonal Medal Emblemed Container */}
                <div className="relative my-2">
                  <div
                    className={`w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center border-2 bg-gradient-to-br ${hexBg} ${glowColor} transition-all duration-300 group-hover:rotate-0 group-hover:scale-105`}
                  >
                    <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-300">
                      {renderIcon(ach.iconType)}
                    </div>
                  </div>
                </div>

                {/* Tier Ribbon */}
                <div className="mt-4 mb-1.5">
                  <span
                    className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${badgePill}`}
                  >
                    {ach.tier} RANK
                  </span>
                </div>

                {/* Trophy Title */}
                <h3 className="font-heading font-bold text-xs sm:text-sm text-foreground line-clamp-1 mt-1 group-hover:text-primary transition-colors">
                  {ach.title}
                </h3>

                {/* Lore / Description */}
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                  {ach.description}
                </p>

                {/* Unlocked date footer */}
                <span className="text-[9px] font-semibold text-muted-foreground/60 mt-3 pt-2 border-t border-border/40 w-full">
                  Unlocked {ach.unlockedAt}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
