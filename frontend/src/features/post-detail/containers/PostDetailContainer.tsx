"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Eye, 
  ShieldAlert 
} from "lucide-react";
import { PostItem } from "@/features/feed/model/feed-types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FeedRightSidebar } from "@/features/feed/components/FeedRightSidebar";
import { CommentThreadContainer } from "@/features/comments";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";

interface PostDetailContainerProps {
  post: PostItem;
}

const sparks = [
  { id: 1, tx: "-14px", ty: "-22px", size: "w-1.5 h-1.5" },
  { id: 2, tx: "14px", ty: "-20px", size: "w-2 h-2" },
  { id: 3, tx: "-20px", ty: "-4px", size: "w-1 h-1" },
  { id: 4, tx: "20px", ty: "-2px", size: "w-1.5 h-1.5" },
  { id: 5, tx: "0px", ty: "-26px", size: "w-2 h-2" },
];

export function PostDetailContainer({ post }: PostDetailContainerProps) {
  const router = useRouter();
  const [sharded, setSharded] = useState(false);
  const [shardsCount, setShardsCount] = useState(post.likesCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastTapRef = useState<{ time: number }>({ time: 0 })[0];

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

  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTapRef.time < 300) {
      toggleShard();
      lastTapRef.time = 0;
    } else {
      lastTapRef.time = now;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-foreground -ml-2 rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-semibold">Back to Feed</span>
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Share post"
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Bookmark post"
            className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Grid: Responsive 2-column layout matching the Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-14 gap-6 xl:gap-8 items-start">
        {/* Left / Center Column: Post Content + Comments Stream seamlessly together (NO BOX IN BOX) */}
        <div className="lg:col-span-7 xl:col-span-9 flex flex-col gap-6">
          {/* Post Content */}
          <div className="flex flex-col gap-3.5 md:gap-4">
            {/* 1. Author & Clan Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
                <Link href={`/profile/${post.author.username}`} className="relative shrink-0 group/avatar">
                  <div className="p-[2px] rounded-full bg-gradient-to-tr from-primary via-accent to-primary group-hover/avatar:brightness-110 transition-all flex items-center justify-center">
                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden relative bg-secondary">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                  </div>
                </Link>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Link 
                      href={`/profile/${post.author.username}`}
                      className="font-heading font-bold text-xs md:text-sm text-foreground hover:underline cursor-pointer truncate"
                    >
                      {post.author.username}
                    </Link>
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

              <div className="flex items-center gap-2 shrink-0">
                <Badge 
                  variant="secondary"
                  className="text-[10px] sm:text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded-lg border border-border"
                >
                  {post.category}
                </Badge>
              </div>
            </div>

            {/* 2. Media with Double-Click / Double-Tap Shard Ignition */}
            <div 
              onDoubleClick={toggleShard}
              onTouchEnd={handleTouchEnd}
              className="relative w-full aspect-square sm:aspect-[4/3] md:h-[460px] xl:h-[520px] rounded-2xl overflow-hidden bg-secondary select-none cursor-pointer group"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption}
                fill
                priority
                className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
              />

              {/* Double-tap large centered flame animation */}
              {isAnimating && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20" aria-hidden="true">
                  <div className="animate-shard-pop drop-shadow-[0_0_25px_rgba(255,42,54,0.8)]">
                    <SoulShardIcon filled className="w-24 h-24 text-primary" />
                  </div>
                </div>
              )}

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

            {/* 3. Action Bar: Feed-identical Soul Shard Button */}
            <div className="flex items-center justify-between pt-1 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {/* Soul Shard Pill matching feed */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleShard}
                    aria-label={sharded ? "Remove Soul Shard" : "Ignite Soul Shard"}
                    aria-pressed={sharded}
                    className={`relative h-8 px-2 gap-1.5 rounded-xl transition-all group overflow-visible hover:bg-secondary/40 ${
                      sharded 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-primary"
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
                      {shardsCount.toLocaleString()} Shards
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
              </div>

              {/* Views count */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Eye aria-hidden="true" focusable="false" className="w-4 h-4 text-accent stroke-[2]" />
                <span className="font-semibold text-foreground/80">{post.viewsCount} views</span>
              </div>
            </div>

            {/* Caption */}
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
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-border/40 w-full" />

          {/* Comment Thread (Directly part of the page stream, no card wrapper) */}
          <CommentThreadContainer 
            postId={post.id} 
            postOwnerUsername={post.author.username}
          />
        </div>

        {/* Right Sidebar: Clan Profile, Suggested, Clan Wars */}
        <aside className="hidden lg:block lg:col-span-5 xl:col-span-5 sticky top-20">
          <FeedRightSidebar />
        </aside>
      </div>
    </div>
  );
}
