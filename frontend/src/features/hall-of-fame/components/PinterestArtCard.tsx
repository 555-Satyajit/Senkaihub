"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { GalleryArtItem } from "../model/apex-types";

interface PinterestArtCardProps {
  item: GalleryArtItem;
}

const sparks = [
  { id: 1, tx: "-14px", ty: "-22px", size: "w-1.5 h-1.5" },
  { id: 2, tx: "14px", ty: "-20px", size: "w-2 h-2" },
  { id: 3, tx: "-20px", ty: "-4px", size: "w-1 h-1" },
  { id: 4, tx: "20px", ty: "-2px", size: "w-1.5 h-1.5" },
  { id: 5, tx: "0px", ty: "-26px", size: "w-2 h-2" },
];

export function PinterestArtCard({ item }: PinterestArtCardProps) {
  const [sharded, setSharded] = useState(false);
  const [shardsCount, setShardsCount] = useState<number>(item.shardsCount);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    };
  }, []);

  const igniteShard = useCallback(() => {
    setSharded((prev) => {
      if (prev) {
        setShardsCount((c) => c - 1);
        return false;
      } else {
        setShardsCount((c) => c + 1);
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 650);
        return true;
      }
    });

    // Reveal the action overlay so user sees the flame count incremented
    setShowOverlay(true);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
  }, []);

  // Standard Instagram / TikTok double-tap pattern for touch screens:
  // Tap 1 records timestamp. Tap 2 within 350ms triggers ignition!
  // If tap gap > 350ms, it's just a single tap that toggles the overlay.
  const handlePointerUp = (e: React.PointerEvent) => {
    // Only handle touch pointers (mouse handles onDoubleClick)
    if (e.pointerType === "mouse") return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap > 0 && timeSinceLastTap < 350) {
      // Confirmed exact 2 taps!
      lastTapRef.current = 0; // reset
      igniteShard();
    } else {
      // First tap
      lastTapRef.current = now;
      setShowOverlay((prev) => {
        const next = !prev;
        if (next) {
          if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
          overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 3500);
        }
        return next;
      });
    }
  };

  const handleShardButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    igniteShard();
  };

  return (
    <div className="break-inside-avoid mb-4 group/pin flex flex-col gap-2 cursor-pointer select-none">
      {/* 1. Pinterest Visual Pin Container */}
      <div 
        onPointerUp={handlePointerUp}
        onDoubleClick={(e) => {
          e.stopPropagation();
          igniteShard();
        }}
        className={`relative w-full ${item.aspectRatio} rounded-[20px] overflow-hidden bg-secondary transition-all duration-300 select-none touch-manipulation`}
      >
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover group-hover/pin:brightness-90 transition-all duration-300 pointer-events-none"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Double-tap large centered flame animation */}
        {isAnimating && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30" aria-hidden="true">
            <div className="animate-shard-pop drop-shadow-[0_0_25px_rgba(255,42,54,0.8)]">
              <SoulShardIcon filled className="w-20 h-20 text-primary" />
            </div>
          </div>
        )}

        {/* Hover / Tap Dim Overlay */}
        <div 
          className={`absolute inset-0 bg-black/35 transition-opacity duration-200 pointer-events-none ${
            showOverlay ? "opacity-100" : "opacity-0 group-hover/pin:opacity-100"
          }`} 
        />

        {/* Top-Left Category Tag */}
        <div 
          className={`absolute top-3 left-3 transition-opacity duration-200 z-10 pointer-events-none ${
            showOverlay ? "opacity-100" : "opacity-0 group-hover/pin:opacity-100"
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md">
            {item.animeSeries}
          </span>
        </div>

        {/* Bottom Floating Quick Actions (visible on hover OR when tapped/double-tapped on mobile) */}
        <div 
          className={`absolute bottom-3 left-3 right-3 transition-all duration-200 flex items-center justify-between z-20 ${
            showOverlay 
              ? "opacity-100 translate-y-0 pointer-events-auto" 
              : "opacity-0 translate-y-1 pointer-events-none group-hover/pin:opacity-100 group-hover/pin:translate-y-0 group-hover/pin:pointer-events-auto"
          }`}
        >
          {/* Flame Ignition Button (Zero background box) */}
          <div className="relative">
            <button
              type="button"
              onClick={handleShardButtonClick}
              aria-label={sharded ? "Remove Soul Shard" : "Ignite Soul Shard"}
              className={`h-8 px-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer relative overflow-visible ${
                sharded
                  ? "text-primary drop-shadow-[0_0_10px_rgba(255,42,54,0.4)]"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <div className={isAnimating ? "animate-shard-pop" : "group-hover/pin:scale-110 transition-transform"}>
                <SoulShardIcon 
                  filled={sharded} 
                  className={`w-4 h-4 ${
                    sharded ? "text-primary filter drop-shadow-[0_0_8px_rgba(255,42,54,0.6)]" : "text-white/90"
                  }`} 
                />
              </div>

              <span className={`drop-shadow font-semibold ${sharded ? "text-primary font-bold" : "text-white"}`}>
                {shardsCount.toLocaleString()}
              </span>

              {/* Spark particle burst explosion */}
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
            </button>
          </div>

          {/* Share & Options circular buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Share pin"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-background/85 hover:bg-background text-foreground backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              aria-label="More options"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-full bg-background/85 hover:bg-background text-foreground backdrop-blur-md flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Beneath-Pin Meta (Title + Creator Row with Profile Link) */}
      <div className="px-1 flex flex-col gap-1">
        <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug group-hover/pin:underline">
          {item.title}
        </h4>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <Link
            href="/profile"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 min-w-0 group/creator hover:opacity-90 transition-opacity"
          >
            <Avatar className="w-5 h-5 rounded-full ring-1 ring-border/50 shrink-0">
              <AvatarImage src={item.author.avatar} alt={item.author.name} />
              <AvatarFallback>{item.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate group-hover/creator:text-foreground group-hover/creator:underline">
              {item.author.name}
            </span>
          </Link>

          <span
            className="text-[10px] font-bold shrink-0 opacity-80"
            style={{ color: item.author.clanColor }}
          >
            {item.author.clan}
          </span>
        </div>
      </div>
    </div>
  );
}
