import Image from "next/image";
import { Link2, ShieldCheck } from "lucide-react";
import { UserProfile } from "../model/profile-types";
import { Button } from "@/components/ui/button";
import { ClanBannerGuildIcon } from "@/components/icons/clan-banner-guild-icon";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";

interface ProfileHeaderCardProps {
  profile: UserProfile;
}

export function ProfileHeaderCard({ profile }: ProfileHeaderCardProps) {
  return (
    <div className="w-full flex flex-col rounded-[24px] bg-card overflow-hidden border border-border/40 shadow-xl relative">
      {/* 1. Cinematic Anime Banner */}
      <div className="w-full h-[180px] md:h-[220px] relative overflow-hidden flex items-start justify-end p-4">
        <Image
          src={profile.bannerImage}
          alt="Clan Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-black/40 to-black/20" />

        {/* Chain Link Button */}
        <button
          type="button"
          aria-label="Copy profile link"
          className="relative z-10 w-10 h-10 rounded-xl bg-card/75 backdrop-blur-md hover:bg-card text-foreground flex items-center justify-center border border-border/60 shadow transition-all cursor-pointer"
        >
          <Link2 className="w-5 h-5 -rotate-45" />
        </button>
      </div>

      {/* 2. Main Profile Content Section */}
      <div className="px-5 pb-6 pt-2 relative">
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

            {/* Action Buttons: Follow and Message */}
            <div className="flex items-center gap-3 mt-4">
              <Button
                size="sm"
                className="h-[38px] px-6 rounded-[10px] text-[13px] font-semibold text-primary-foreground shadow-md hover:brightness-110 active:scale-95 transition-all border-0 cursor-pointer"
                style={{ background: "var(--gradient-btn)" }}
              >
                Follow
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-[38px] px-5 rounded-[10px] text-[13px] font-semibold border-border/80 bg-card hover:bg-secondary text-foreground transition-all cursor-pointer"
              >
                Message
              </Button>
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
