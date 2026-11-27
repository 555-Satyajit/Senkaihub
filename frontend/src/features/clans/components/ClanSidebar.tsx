"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Trophy, 
  Swords, 
  Flame, 
  Users, 
  Crown, 
  Hash, 
  Lock,
  ChevronRight,
  Shield,
  Clock
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClanDetail } from "../model/clan-detail-types";

interface ClanSidebarProps {
  clan: ClanDetail;
  onSelectChatRoom?: (roomId: string) => void;
}

export function ClanSidebar({ clan, onSelectChatRoom }: ClanSidebarProps) {
  const onlineMembers = clan.members.filter((m) => m.isOnline);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. Active Clan War Widget */}
      <Card className="rounded-2xl bg-card border border-border/60 p-4 shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
            <Swords className="w-3.5 h-3.5 text-accent" />
            Active War Matchup
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {clan.warStatus.endsIn}
          </span>
        </div>

        <div className="flex items-center justify-between py-2 border-y border-border/40">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl overflow-hidden relative bg-secondary border border-border">
              <Image src={clan.crestUrl} alt={clan.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-heading font-bold text-xs text-foreground truncate max-w-[100px]">{clan.name}</p>
              <p className="text-[11px] font-bold text-primary">{clan.warStatus.clanScore.toLocaleString()} VP</p>
            </div>
          </div>

          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            VS
          </span>

          <div className="flex items-center gap-2 text-right">
            <div>
              <p className="font-heading font-bold text-xs text-foreground truncate max-w-[100px]">{clan.warStatus.rivalClanName}</p>
              <p className="text-[11px] font-bold text-accent">{clan.warStatus.rivalScore.toLocaleString()} VP</p>
            </div>
            <div className="w-9 h-9 rounded-xl overflow-hidden relative bg-secondary border border-border">
              <Image src={clan.warStatus.rivalCrestUrl} alt={clan.warStatus.rivalClanName} fill className="object-cover" />
            </div>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden flex">
          <div 
            className="bg-primary h-full transition-all" 
            style={{ width: `${(clan.warStatus.clanScore / (clan.warStatus.clanScore + clan.warStatus.rivalScore)) * 100}%` }} 
          />
          <div 
            className="bg-accent h-full transition-all" 
            style={{ width: `${(clan.warStatus.rivalScore / (clan.warStatus.clanScore + clan.warStatus.rivalScore)) * 100}%` }} 
          />
        </div>
      </Card>

      {/* 2. Clan Chat Rooms Quick Access */}
      <Card className="rounded-2xl bg-card border border-border/60 p-4 shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-primary" />
            Live Chambers
          </span>
          <span className="text-[10px] text-muted-foreground font-semibold">
            {clan.chatRooms.length} rooms
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {clan.chatRooms.map((room) => (
            <div 
              key={room.id}
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-secondary/30 hover:bg-secondary/60 transition-colors text-xs text-foreground cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                {room.isPrivate ? (
                  <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
                ) : (
                  <Hash className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                )}
                <span className="truncate font-semibold">{room.name}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-semibold px-1.5 py-0.2 rounded bg-card">
                {room.messages.length}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Online Clan Warriors */}
      <Card className="rounded-2xl bg-card border border-border/60 p-4 shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-green-400" />
            Active Warriors
          </span>
          <span className="text-[10px] font-semibold text-green-400">
            {onlineMembers.length} Online
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {clan.members.slice(0, 4).map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary relative">
                    <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                  </div>
                  {member.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-card" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="font-heading font-bold text-xs text-foreground truncate">{member.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{member.role}</p>
                </div>
              </div>

              <span className="text-[10px] font-bold text-primary shrink-0">
                +{member.vpContributed.toLocaleString()} VP
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
