import { ShieldCheck, Plus, Send, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";

const suggestedCreators = [
  {
    name: "Faraz Tariq",
    status: "Super Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "Tina Tzoo",
    status: "Cosplay Master",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    name: "MKBHD Anime",
    status: "Top Reviewer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    verified: false,
  },
];

const liveChatMessages = [
  {
    user: "BigDaddy",
    message: "Who is voting for the Demon Slayer clan today?",
    time: "2m ago",
    online: true,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
  },
  {
    user: "NoobPlayer69",
    message: "Episode 12 spoiler vault is totally fire!!",
    time: "4m ago",
    online: true,
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80",
  },
  {
    user: "Mr Jam",
    message: "Tip sent! Check your Buncoins balance.",
    time: "10m ago",
    online: false,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80",
  },
];

export function FeedRightSidebar() {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. User Clan & Soul Shards Status Card */}
      <div className="rounded-[24px] bg-card p-6 shadow-xl relative overflow-hidden border border-border/40">
        <div 
          className="absolute top-0 right-0 w-40 h-40 rounded-full blur-2xl pointer-events-none"
          style={{ background: "var(--gradient-primary-glow)" }}
        />
        
        {/* Card Header: Clan Profile & Online Dot */}
        <div className="flex items-center justify-between">
          <span className="font-heading font-black text-xs text-muted-foreground uppercase tracking-wider">
            CLAN PROFILE
          </span>
          <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] font-semibold gap-1 px-2.5 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
          </Badge>
        </div>

        {/* Profile Details */}
        <div className="mt-5 flex items-center gap-3.5">
          <Avatar className="w-14 h-14 rounded-2xl ring-2 ring-primary/40 shadow-md">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" alt="Altersky" />
            <AvatarFallback className="rounded-2xl bg-secondary text-foreground font-black">
              AL
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading font-bold text-base text-foreground tracking-tight">ALTERSKY</h3>
              <ShieldCheck className="w-4 h-4 text-accent" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Shadow Monarch Faction</p>
          </div>
        </div>

        {/* Followers / Following Stats Row */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-secondary/60 border border-border/50 rounded-2xl py-3 text-center transition-colors hover:bg-secondary/80">
            <span className="block font-heading font-black text-lg text-foreground">25</span>
            <span className="text-[11px] text-muted-foreground font-medium">Followers</span>
          </div>
          <div className="bg-secondary/60 border border-border/50 rounded-2xl py-3 text-center transition-colors hover:bg-secondary/80">
            <span className="block font-heading font-black text-lg text-foreground">14</span>
            <span className="text-[11px] text-muted-foreground font-medium">Following</span>
          </div>
        </div>

        {/* Soul Shards Metric Section - Clean, Spacious, and Elegant */}
        <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 shadow-sm">
              <SoulShardIcon filled className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="font-heading font-black text-2xl text-foreground tracking-tight leading-none">
                12,256
              </div>
              <div className="text-[11px] text-muted-foreground font-medium tracking-normal mt-1 truncate">
                Soul Shards Collected
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 bg-accent/10 border border-accent/25 px-3 py-1.5 rounded-xl">
            <Trophy className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="text-xs font-bold text-accent">Tier 3</span>
          </div>
        </div>
      </div>

      {/* 2. Suggested For You Widget */}
      <div className="rounded-[24px] bg-card p-6 shadow-xl flex flex-col gap-3 border border-border/40">
        <div className="flex items-center justify-between">
          <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground">
            Suggested For You
          </h4>
          <Button variant="link" className="text-[11px] text-muted-foreground hover:text-primary p-0 h-auto">
            See All
          </Button>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {suggestedCreators.map((creator) => (
            <div key={creator.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="w-10 h-10 rounded-xl ring-1 ring-border/50">
                  <AvatarImage src={creator.avatar} alt={creator.name} />
                  <AvatarFallback className="rounded-xl text-xs">{creator.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-xs text-foreground truncate">{creator.name}</p>
                    {creator.verified && <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />}
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate">{creator.status}</p>
                </div>
              </div>
              <Button
                size="sm"
                className="rounded-lg h-7 px-3 text-[11px] text-primary-foreground font-semibold shrink-0 border-0 hover:brightness-110"
                style={{ background: "var(--gradient-btn)" }}
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Live Chat Widget */}
      <div className="rounded-[24px] bg-card p-6 shadow-xl flex flex-col gap-3 border border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-foreground">
              Live Clan Chat
            </h4>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <Button
            size="sm"
            variant="outline"
            className="rounded-xl h-7 px-2.5 text-[11px] border-primary/40 text-primary hover:bg-primary/10 font-semibold gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>Add Group</span>
          </Button>
        </div>

        <ScrollArea className="h-44 pr-2">
          <div className="flex flex-col gap-3">
            {liveChatMessages.map((msg) => (
              <div key={msg.user} className="flex items-start gap-2.5 text-xs">
                <div className="relative shrink-0">
                  <Avatar className="w-8 h-8 rounded-xl ring-1 ring-border/50">
                    <AvatarImage src={msg.avatar} alt={msg.user} />
                    <AvatarFallback className="rounded-xl text-[10px]">{msg.user[0]}</AvatarFallback>
                  </Avatar>
                  {msg.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px] text-foreground">{msg.user}</span>
                    <span className="text-[9px] text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug truncate">
                    {msg.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Live Chat Message Input */}
        <div className="relative mt-1">
          <Input
            placeholder="Send message..."
            aria-label="Send message to live clan chat"
            className="h-10 rounded-xl bg-background border-border text-xs pr-12 focus-visible:ring-primary"
          />
          <Button
            size="icon"
            aria-label="Send message"
            className="absolute right-1 top-1 h-8 w-8 rounded-lg text-primary-foreground border-0 hover:brightness-110"
            style={{ background: "var(--gradient-btn)" }}
          >
            <Send aria-hidden="true" focusable="false" className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
