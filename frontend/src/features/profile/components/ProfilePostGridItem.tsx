"use client";

import Image from "next/image";
import { MessageCircle, Eye, Sparkles } from "lucide-react";
import { PostItem } from "@/features/feed/model/feed-types";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { Badge } from "@/components/ui/badge";

interface ProfilePostGridItemProps {
  post: PostItem;
}

export function ProfilePostGridItem({ post }: ProfilePostGridItemProps) {
  return (
    <div className="group relative aspect-square rounded-[18px] overflow-hidden bg-card border border-border/40 hover:border-primary/60 transition-all duration-300 shadow-md select-none cursor-pointer">
      {/* Background Media */}
      <Image
        src={post.imageUrl}
        alt={post.caption}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Top Category Badge (Always visible, subtle) */}
      <div className="absolute top-2.5 right-2.5 z-10">
        <Badge className="bg-background/70 backdrop-blur-md text-[10px] font-semibold text-foreground border border-border/50 px-2 py-0.5 gap-1">
          <Sparkles className="w-2.5 h-2.5 text-accent" />
          <span>{post.category}</span>
        </Badge>
      </div>

      {/* Hover Overlay: Dark Glass with Soul Shards and Comments */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 z-20">
        {/* Top meta */}
        <span className="text-[11px] font-semibold text-white/80 truncate">
          {post.animeTitle}
        </span>

        {/* Center Stats (Soul Shards + Comments) */}
        <div className="flex items-center justify-center gap-5 text-white">
          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
            <SoulShardIcon filled className="w-4 h-4 text-primary animate-pulse" />
            <span>{post.likesCount.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm">
            <MessageCircle className="w-4 h-4 fill-white/20 text-white" />
            <span>{post.commentsCount}</span>
          </div>
        </div>

        {/* Bottom Views */}
        <div className="flex items-center justify-between text-[10px] text-white/70">
          <span className="truncate max-w-[140px]">{post.caption}</span>
          <div className="flex items-center gap-1 shrink-0">
            <Eye className="w-3 h-3" />
            <span>14.2k</span>
          </div>
        </div>
      </div>
    </div>
  );
}
