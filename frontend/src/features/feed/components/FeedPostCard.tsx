"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Eye, 
  ShieldAlert,
  Sparkles
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { PostItem } from "../model/feed-types";

interface FeedPostCardProps {
  post: PostItem;
}

const sparks = [
  { id: 1, tx: "-14px", ty: "-22px", size: "w-1.5 h-1.5" },
  { id: 2, tx: "14px", ty: "-20px", size: "w-2 h-2" },
  { id: 3, tx: "-20px", ty: "-4px", size: "w-1 h-1" },
  { id: 4, tx: "20px", ty: "-2px", size: "w-1.5 h-1.5" },
  { id: 5, tx: "0px", ty: "-26px", size: "w-2 h-2" },
];

export function FeedPostCard({ post }: FeedPostCardProps) {
  const [sharded, setSharded] = useState(false);
  const [shardsCount, setShardsCount] = useState(post.likesCount);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleShard = () => {
    if (sharded) {
      setSharded(false);
      setShardsCount((prev) => prev - 1);
    } else {
      setSharded(true);
      setShardsCount((prev) => prev + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <Card className="rounded-[20px] md:rounded-[24px] bg-card p-4 sm:p-5 md:p-6 shadow-xl flex flex-col gap-3.5 md:gap-4 border border-border/50 transition-all hover:border-border/80">
      {/* 1. Author & Clan Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <div className="relative shrink-0">
            <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-primary via-accent to-primary">
              <Avatar className="w-10 h-10 md:w-11 md:h-11 rounded-[14px] overflow-hidden">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback className="rounded-[14px] bg-secondary text-foreground font-bold">
                  {post.author.name[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="font-heading font-bold text-xs md:text-sm text-foreground hover:underline cursor-pointer truncate">
                {post.author.username}
              </span>
              <Badge 
                variant="outline"
                className="text-[9px] md:text-[10px] font-semibold px-1.5 py-0 md:px-2 md:py-0.5 rounded-md border-border/80 bg-secondary/80 text-foreground shrink-0"
              >
                {post.author.clan}
              </Badge>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground mt-0.5 truncate">
              <span className="truncate">{post.animeTitle}</span>
              <span>•</span>
              <span className="shrink-0">{post.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Action Button: Follow */}
        <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
          <Button
            size="sm"
            className="rounded-lg text-primary-foreground font-semibold px-3 md:px-4 h-7 md:h-8 text-[11px] md:text-xs shadow-md border-0 hover:brightness-110"
            style={{ background: "var(--gradient-btn)" }}
          >
            Follow
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="More post options"
            className="w-7 h-7 md:w-8 md:h-8 rounded-lg text-muted-foreground hover:bg-secondary/60"
          >
            <MoreHorizontal aria-hidden="true" focusable="false" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 2. Feed Media with Double-Click Shard Support */}
      <div 
        onDoubleClick={toggleShard}
        className="relative w-full aspect-square sm:aspect-[4/3] md:h-[460px] xl:h-[520px] rounded-xl md:rounded-2xl overflow-hidden bg-secondary group select-none cursor-pointer"
      >
        <Image
          src={post.imageUrl}
          alt={post.caption}
          fill
          className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
          priority
        />
        
        {/* Double-tap large centered flame animation */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" aria-hidden="true">
            <div className="animate-shard-pop drop-shadow-[0_0_25px_rgba(255,42,54,0.8)]">
              <SoulShardIcon filled className="w-24 h-24 text-primary" />
            </div>
          </div>
        )}
        
        {/* Top-Right: Category Badge */}
        <Badge 
          className="absolute top-4 right-4 bg-card/85 backdrop-blur-md px-3 py-1 rounded-lg flex items-center gap-1.5 border border-border/60 shadow-lg text-xs font-semibold text-foreground pointer-events-none"
        >
          <Sparkles aria-hidden="true" focusable="false" className="w-3.5 h-3.5 text-accent" />
          <span>{post.category}</span>
        </Badge>

        {/* Top-Left: Progress-Gated Spoiler Warning Badge */}
        {post.spoilerSafeFor && (
          <Badge 
            variant="outline"
            className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border-accent/40 shadow-lg text-[11px] font-bold text-accent pointer-events-none"
          >
            <ShieldAlert aria-hidden="true" focusable="false" className="w-3.5 h-3.5 text-accent" />
            <span>Safe for {post.spoilerSafeFor}</span>
          </Badge>
        )}
      </div>

      {/* 3. Action Bar: Soul Shard with Burst Animation */}
      <div className="flex items-center justify-between pt-1 gap-2">
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap min-w-0">
          {/* Soul Shard Button with spark particles */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShard}
              aria-label={sharded ? "Remove Soul Shard" : "Ignite Soul Shard"}
              aria-pressed={sharded}
              className={`relative h-8 px-2 sm:px-2.5 gap-1.5 rounded-xl transition-all group overflow-visible ${
                sharded 
                  ? "text-primary bg-primary/10 hover:bg-primary/15" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
            >
              <div className={isAnimating ? "animate-shard-pop" : "group-hover:scale-115 transition-transform"}>
                <SoulShardIcon 
                  filled={sharded} 
                  className={`w-4 h-4 ${
                    sharded ? "text-primary filter drop-shadow-[0_0_8px_rgba(255,42,54,0.5)]" : "text-muted-foreground group-hover:text-primary"
                  }`} 
                />
              </div>

              <span className={`text-xs font-semibold ${sharded ? "text-primary font-bold" : "text-foreground"}`}>
                {shardsCount.toLocaleString()}
              </span>

              {isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  {sparks.map((s) => (
                    <span
                      key={s.id}
                      className={`absolute rounded-full bg-primary animate-spark shadow-[0_0_6px_var(--primary)] ${s.size}`}
                      style={
                        {
                          "--tx": s.tx,
                          "--ty": s.ty,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>
              )}
            </Button>
          </div>

          {/* Comment with Count */}
          <Button
            variant="ghost"
            size="sm"
            aria-label={`${post.commentsCount} comments`}
            className="h-8 px-2 sm:px-2.5 gap-1.5 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
          >
            <MessageCircle aria-hidden="true" focusable="false" className="w-4 h-4 md:w-5 md:h-5 stroke-[2]" />
            <span className="text-xs font-semibold">{post.commentsCount}</span>
          </Button>

          {/* Share */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Share post"
            className="w-8 h-8 text-foreground hover:text-primary hover:bg-primary/10 rounded-xl"
          >
            <Send aria-hidden="true" focusable="false" className="w-4 h-4 stroke-[2]" />
          </Button>
        </div>

        {/* Right side: Views Count & Bookmark */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Eye aria-hidden="true" focusable="false" className="w-4 h-4 text-accent stroke-[2]" />
            <span className="font-semibold text-foreground/80">{post.viewsCount} views</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            aria-label="Bookmark post"
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground shrink-0"
          >
            <Bookmark aria-hidden="true" focusable="false" className="w-4 h-4 stroke-[2]" />
          </Button>
        </div>
      </div>

      {/* 4. Social Proof / Sharded By */}
      <div className="flex items-center gap-2.5 text-xs text-foreground font-medium">
        <div className="flex -space-x-2">
          <div className="inline-block h-6 w-6 rounded-full ring-2 ring-card bg-secondary overflow-hidden relative">
            <Image src={post.topLikedBy.avatar} alt="avatar" fill className="object-cover" />
          </div>
        </div>
        <span>
          Sharded by <strong className="font-bold text-foreground">{post.topLikedBy.username}</strong> and{" "}
          <strong className="font-bold text-foreground">{(post.otherLikesCount + (sharded ? 1 : 0)).toLocaleString()} others</strong>
        </span>
      </div>

      {/* 5. Caption & Hashtags */}
      <div className="text-xs md:text-sm leading-relaxed text-foreground/90">
        <span className="font-bold mr-2 text-foreground">{post.author.username}</span>
        {post.caption}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-primary font-medium hover:underline cursor-pointer text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 6. View All Comments Trigger */}
      {post.commentsCount > 0 && (
        <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer -mt-1 font-medium">
          View all {post.commentsCount} comments
        </span>
      )}

      {/* 7. Inline Quick Comment Bar */}
      <div className="flex items-center gap-2 sm:gap-3 pt-2 border-t border-border/40">
        <Avatar className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl overflow-hidden ring-1 ring-border shrink-0">
          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Me" />
          <AvatarFallback className="rounded-xl text-[10px] sm:text-xs">KV</AvatarFallback>
        </Avatar>
        <div className="relative flex-1 bg-background rounded-xl flex items-center p-1 sm:p-1.5 border border-border/50 shadow-inner">
          <Input
            placeholder="Add a comment or hype up the clan..."
            className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-[11px] sm:text-xs shadow-none px-2 h-7 sm:h-8"
          />
          <Button
            size="sm"
            className="rounded-lg text-primary-foreground font-semibold px-3 sm:px-4 h-7 text-[11px] sm:text-xs border-0 shrink-0 hover:brightness-110 active:scale-95 transition-transform"
            style={{ background: "var(--gradient-btn)" }}
          >
            Post
          </Button>
        </div>
      </div>
    </Card>
  );
}
