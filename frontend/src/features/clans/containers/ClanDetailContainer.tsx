"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Shield,
  Swords,
  Users,
  MessageSquare,
  Flame,
  Trophy,
  Star,
  Share2,
  Lock,
  Layers,
  LayoutGrid,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClanDetail } from "../model/clan-detail-types";
import { ClanLiveChatContainer } from "../components/ClanLiveChatContainer";
import { ClanWarFrontView } from "../components/ClanWarFrontView";
import { ClanLeaderCommandSuite } from "../components/ClanLeaderCommandSuite";
import { ClanSidebar } from "../components/ClanSidebar";
import { FeedPostCard } from "@/features/feed/components/FeedPostCard";
import { sampleFeedPosts } from "@/features/feed/model/sample-posts";

interface ClanDetailContainerProps {
  clan: ClanDetail;
}

export function ClanDetailContainer({ clan }: ClanDetailContainerProps) {
  const router = useRouter();
  // "feed" is the primary first tab!
  const [activeTab, setActiveTab] = useState<"feed" | "chat" | "wars" | "members">("feed");
  const [clanData, setClanData] = useState<ClanDetail>(clan);
  const [isCommandSuiteOpen, setIsCommandSuiteOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  // Quick check if current simulated user is the Sovereign / Leader
  const isLeader = true; // Enabled for the clan owner to manage their Citadel

  const handleUpdateClan = (updated: Partial<ClanDetail>) => {
    setClanData((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Filter posts created by this clan's members
  const clanPosts = sampleFeedPosts.filter(
    (p) => p.author.clan.toLowerCase().includes(clan.name.toLowerCase()) || p.author.username === clan.leader.username
  );

  const displayPosts = clanPosts.length > 0 ? clanPosts : sampleFeedPosts;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Top Nav Back button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-foreground -ml-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-semibold">Back to Clans</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Share clan"
          className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>

      {/* 1. Full-Bleed Clan Citadel Cover Banner & Info */}
      <div className="rounded-3xl bg-card border border-border/70 overflow-hidden shadow-xl flex flex-col">
        <div className="relative w-full h-44 sm:h-64 bg-secondary overflow-hidden">
          <Image
            src={clanData.bannerUrl}
            alt={clanData.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-black/30" />

          {/* War Tier Overlay Badge */}
          <div className="absolute top-4 left-6 z-10">
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg border-0">
              {clanData.tier}
            </Badge>
          </div>
        </div>

        {/* Floating Mascot Crest & Clan Actions */}
        <div className="px-6 sm:px-8 pb-6 flex flex-col gap-4 -mt-12 sm:-mt-14 relative z-10">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex items-end gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-[4px] border-card bg-secondary shadow-2xl shrink-0">
                <Image src={clanData.crestUrl} alt={clanData.name} fill className="object-cover" />
              </div>

              <div className="mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-heading font-black text-2xl sm:text-3xl text-foreground tracking-tight">
                    {clanData.name}
                  </h1>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                  <Crown className="w-3.5 h-3.5 text-accent" />
                  <span>Led by <strong className="text-foreground">{clanData.leader.title} {clanData.leader.name}</strong></span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Sovereign Leader Edit / Citadel Command Suite Button */}
              {isLeader && (
                <Button
                  onClick={() => setIsCommandSuiteOpen(true)}
                  className="h-9 px-4 rounded-xl font-bold text-xs sm:text-sm bg-secondary text-foreground hover:bg-secondary/80 border border-accent/40 shadow-md flex items-center gap-1.5 transition-all hover:border-accent"
                >
                  <Crown className="w-3.5 h-3.5 text-accent" />
                  <span>Citadel Command</span>
                </Button>
              )}

              <Button
                onClick={() => setIsJoined(!isJoined)}
                className={`h-9 px-5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${isJoined
                    ? "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
                    : "text-primary-foreground hover:brightness-110 active:scale-95"
                  }`}
                style={!isJoined ? { background: "var(--gradient-btn)" } : undefined}
              >
                {isJoined ? "Member (Joined)" : "Join Clan"}
              </Button>
            </div>
          </div>

          {/* Battle Motto */}
          {clanData.motto && (
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic max-w-3xl">
              "{clanData.motto}"
            </p>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">War Points</span>
              <span className="text-sm font-bold text-primary mt-0.5">{clanData.vpBounty}</span>
            </div>

            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Warriors</span>
              <span className="text-sm font-bold text-foreground mt-0.5">{clanData.memberCount}</span>
            </div>

            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Rating</span>
              <span className="text-sm font-bold text-accent flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-accent" />
                {clanData.rating} ({clanData.reviewCount})
              </span>
            </div>

            <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Status</span>
              <span className="text-sm font-bold text-green-400 mt-0.5">Active War Phase</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Navigation Tabs - Citadel Chronicle (Clan Feed) is First! */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-border/50 pb-2 overflow-x-auto scrollbar-none w-full max-w-full">
        {/* TAB 1: Chronicle (Feed) */}
        <button
          onClick={() => setActiveTab("feed")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${activeTab === "feed"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
        >
          <LayoutGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Citadel Chronicle</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-semibold">
            {displayPosts.length}
          </span>
        </button>

        {/* TAB 2: Council Chambers (Chat) */}
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${activeTab === "chat"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
        >
          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Council Chambers</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-white font-semibold">
            {clan.chatRooms.length}
          </span>
        </button>

        {/* TAB 3: War Front (Raid & Wars) */}
        <button
          onClick={() => setActiveTab("wars")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${activeTab === "wars"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
        >
          <Swords className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>War Front</span>
        </button>

        {/* TAB 4: Vanguard Legion (Roster) */}
        <button
          onClick={() => setActiveTab("members")}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${activeTab === "members"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
        >
          <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Vanguard Legion</span>
        </button>
      </div>

      {/* 3. Tab Contents */}
      {/* PRIMARY TAB: CLAN FEED - 100% Full Width (No Sidebars) */}
      {activeTab === "feed" && (
        <div className="flex flex-col gap-5 w-full">
          {/* Quick post bar for clan members spanning full width */}
          <div className="p-4 rounded-2xl bg-card border border-border/60 shadow-sm flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-secondary relative shrink-0">
                <Image src={clan.leader.avatar} alt="Avatar" fill className="object-cover" />
              </div>
              <span className="text-xs text-muted-foreground truncate">
                Share war art, cosplay, or raid strategy with {clan.name}...
              </span>
            </div>
            <Link href="/create-post" className="shrink-0">
              <Button
                size="sm"
                className="rounded-lg text-primary-foreground text-xs font-semibold px-4 h-8 shadow-sm hover:brightness-110 active:scale-95"
                style={{ background: "var(--gradient-btn)" }}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Post
              </Button>
            </Link>
          </div>

          {/* Clan Post Stream spanning 100% Full Width */}
          <div className="flex flex-col gap-5 w-full">
            {displayPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CHAT */}
      {activeTab === "chat" && (
        <ClanLiveChatContainer
          clanId={clan.id}
          initialRooms={clan.chatRooms}
          userRole={clan.leader.title}
          currentUsername={clan.leader.username}
        />
      )}

      {/* TAB 3: WAR FRONT (Current War, Duels, Disciplines, Season History) */}
      {activeTab === "wars" && (
        <ClanWarFrontView clan={clan} />
      )}

      {/* TAB 4: ROSTER */}
      {activeTab === "members" && (
        <div className="p-6 rounded-2xl bg-card border border-border/70 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/50">
            <h3 className="font-heading font-bold text-base text-foreground">
              Clan Roster ({clan.members.length} Warriors)
            </h3>
            <span className="text-xs text-muted-foreground font-semibold">
              Rank Order
            </span>
          </div>

          <div className="divide-y divide-border/30">
            {clan.members.map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary relative">
                      <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                    </div>
                    {m.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 ring-2 ring-card" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">
                      {m.name} <span className="text-muted-foreground font-normal">@{m.username}</span>
                    </h4>
                    <p className="text-[11px] text-muted-foreground">{m.role} • {m.joinedAt}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant="outline" className="text-xs font-bold text-primary border-primary/30">
                    {m.vpContributed.toLocaleString()} VP
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Citadel Command Center (Leader Suite Modal) */}
      <ClanLeaderCommandSuite
        clan={clanData}
        isOpen={isCommandSuiteOpen}
        onClose={() => setIsCommandSuiteOpen(false)}
        onUpdateClan={handleUpdateClan}
      />
    </div>
  );
}
