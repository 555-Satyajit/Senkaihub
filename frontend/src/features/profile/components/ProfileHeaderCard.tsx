"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, UserCheck, UserPlus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { ClanBannerGuildIcon } from "@/components/icons/clan-banner-guild-icon";
import { UserProfile } from "../model/profile-types";

interface ProfileHeaderCardProps {
  profile: UserProfile;
  isOwnProfile?: boolean;
}

export function ProfileHeaderCard({ profile, isOwnProfile = false }: ProfileHeaderCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div className="w-full bg-card rounded-[24px] overflow-hidden border border-border/60 shadow-xl transition-all">
      {/* 1. Profile Banner Cover */}
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] bg-secondary overflow-hidden">
        <Image
          src={profile.bannerImage}
          alt={`${profile.name} banner`}
          fill
          className="object-cover"
          priority
        />
        {/* Subtle Dark Gradient Overlay for optimal contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-black/30 to-black/20" />
      </div>

      {/* 2. Profile Details & Stats Row */}
      <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Left Column: Followers, Following, Shards Earned */}
          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6 order-2 md:order-1 pt-2 md:pt-6">
            <div className="text-center">
              <span className="font-heading font-black text-lg md:text-[20px] text-foreground block leading-tight">
                {profile.followers}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                Followers
              </span>
            </div>

            <div className="w-[1px] h-8 bg-border/80" aria-hidden="true" />

            <div className="text-center">
              <span className="font-heading font-black text-lg md:text-[20px] text-foreground block leading-tight">
                {profile.following}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                Following
              </span>
            </div>

            <div className="w-[1px] h-8 bg-border/80" aria-hidden="true" />

            <div className="text-center flex flex-col items-center">
              <div className="flex items-center gap-1">
                <SoulShardIcon filled className="w-4 h-4 text-primary" />
                <span className="font-heading font-black text-lg md:text-[20px] text-foreground block leading-tight">
                  {profile.shardsEarned}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase font-medium tracking-wider">
                Soul Shards
              </span>
            </div>
          </div>

          {/* Center Column: Avatar + Clan Crest Badge + Identity */}
          <div className="flex flex-col items-center order-1 md:order-2 -mt-16 md:-mt-20 z-10">
            <div className="relative">
              <div className="relative w-[112px] h-[112px] md:w-[124px] md:h-[124px] rounded-full overflow-hidden border-[6px] md:border-[8px] border-card bg-secondary shadow-2xl">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Clan Crest Guild Badge */}
              <div className="absolute bottom-1 right-1 w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-white shadow-lg bg-card flex items-center justify-center">
                <ClanBannerGuildIcon active className="w-6 h-6" />
              </div>
            </div>

            {/* Name, Verified Badge & Clan */}
            <div className="flex items-center gap-1.5 mt-3">
              <h2 className="font-heading font-black text-lg md:text-[20px] text-foreground leading-tight">
                {profile.name}
              </h2>
              <ShieldCheck className="w-4 h-4 text-accent" />
            </div>
            <span className="text-xs md:text-sm text-primary font-medium mt-0.5">
              {profile.clanName}
            </span>

            {/* Action Buttons: Follow/Following & Message for other users OR Edit Profile for own */}
            <div className="flex items-center gap-3 mt-4">
              {isOwnProfile ? (
                <Button
                  size="sm"
                  className="h-[38px] px-6 rounded-[10px] text-[13px] font-semibold text-primary-foreground shadow-md hover:brightness-110 active:scale-95 transition-all border-0 cursor-pointer"
                  style={{ background: "var(--gradient-btn)" }}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={toggleFollow}
                    className={`h-[38px] px-5 rounded-[10px] text-[13px] font-semibold transition-all border-0 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      isFollowing
                        ? "bg-secondary hover:bg-secondary/80 text-foreground"
                        : "text-primary-foreground shadow-md hover:brightness-110"
                    }`}
                    style={isFollowing ? undefined : { background: "var(--gradient-btn)" }}
                  >
                    {isFollowing ? (
                      <>
                        <UserCheck className="w-4 h-4" />
                        Following
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Follow
                      </>
                    )}
                  </Button>
                  <Link
                    href="/chat"
                    className="h-[38px] px-4 rounded-[10px] text-[13px] font-semibold border border-border/80 bg-card hover:bg-secondary text-foreground transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Bio Snippet */}
          <div className="order-3 flex flex-col justify-center text-center md:text-left pt-2 md:pt-6">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider block mb-1">
              {profile.clanName}
            </span>
            <p className="text-xs md:text-[13px] leading-relaxed text-muted-foreground max-w-sm mx-auto md:mx-0">
              {profile.bio}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
