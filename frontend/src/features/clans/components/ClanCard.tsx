import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Users } from "lucide-react";
import { ClanItem } from "../model/clan-types";
import { Button } from "@/components/ui/button";

interface ClanCardProps {
  clan: ClanItem;
}

export function ClanCard({ clan }: ClanCardProps) {
  return (
    <div className="bg-card rounded-[20px] overflow-hidden flex flex-col border border-border/40 hover:border-border/80 transition-all shadow-md group select-none">
      {/* 1. Card Media Banner (Clickable to Clan Citadel) */}
      <Link href={`/clan/${clan.id}`} className="relative w-full h-[140px] bg-secondary overflow-hidden block cursor-pointer">
        <Image
          src={clan.bannerUrl}
          alt={clan.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        
        {/* Member count pill overlay */}
        <div className="absolute top-3 right-3 bg-card/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-foreground flex items-center gap-1 border border-border/50">
          <Users className="w-3 h-3 text-primary" />
          <span>{clan.memberCount}</span>
        </div>
      </Link>

      {/* 2. Floating Overlapping Crest / Leader Avatar */}
      <div className="px-4 relative flex items-center justify-between -mt-7 z-10">
        <Link href={`/clan/${clan.id}`} className="relative cursor-pointer">
          <div className="relative w-[54px] h-[54px] rounded-full overflow-hidden border-[4px] border-card shadow-lg bg-secondary">
            <Image
              src={clan.crestUrl}
              alt={clan.name}
              fill
              className="object-cover"
            />
          </div>
          {/* Faction emblem icon badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white shadow bg-primary flex items-center justify-center text-primary-foreground">
            <Shield className="w-2.5 h-2.5" />
          </div>
        </Link>

        <Link href={`/clan/${clan.id}`}>
          <Button
            size="sm"
            className="rounded-lg text-primary-foreground font-semibold px-3 h-7 text-[11px] shadow-sm border-0 hover:brightness-110 active:scale-95 cursor-pointer"
            style={{ background: "var(--gradient-btn)" }}
          >
            Enter Citadel
          </Button>
        </Link>
      </div>

      {/* 3. Clan Details */}
      <div className="px-4 pt-2.5 pb-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Name & Tier */}
          <Link href={`/clan/${clan.id}`} className="block group-hover:text-primary transition-colors cursor-pointer">
            <h2 className="font-heading font-bold text-[14px] text-foreground leading-tight truncate">
              {clan.name}
            </h2>
          </Link>
          <span className="text-[10px] text-accent font-semibold block mt-0.5">
            {clan.tier}
          </span>

          {/* Snippet / Motto */}
          <p className="text-[11px] leading-[16px] text-muted-foreground mt-2 line-clamp-3">
            {clan.motto}
          </p>
        </div>

        {/* 4. Footer: Victory Points + Star Rating */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30 text-xs mt-auto">
          <span className="font-bold text-foreground text-[12px] text-primary">
            {clan.vpBounty}
          </span>

          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#E4D96D] text-[#E4D96D]" />
            <span className="font-semibold text-[12px] text-[#E4D96D]">
              {clan.rating.toFixed(1)}
            </span>
            <span className="text-[10px] text-muted-foreground font-medium">
              ({clan.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
