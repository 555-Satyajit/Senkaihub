"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { HallOfFameEntry, HallOfFameDiscipline, ApexTimeframe } from "../model/apex-types";
import { sampleHallOfFameEntries } from "../model/sample-apex-data";

interface HallOfFameSectionProps {
  timeframe: ApexTimeframe;
}

export function HallOfFameSection({ timeframe }: HallOfFameSectionProps) {
  const [discipline, setDiscipline] = useState<HallOfFameDiscipline>("all");

  const disciplines = [
    { id: "all", label: "All Hall of Fame" },
    { id: "fan-art", label: "Fan Art" },
    { id: "manga", label: "Manga & Manhwa" },
    { id: "anime-edits", label: "Anime & Edits" },
  ] as const;

  const filteredEntries = sampleHallOfFameEntries.filter((entry) => {
    if (discipline === "all") return true;
    return entry.discipline === discipline;
  });

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {disciplines.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDiscipline(d.id)}
              className={`text-xs px-4 py-2 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
                discipline === d.id
                  ? "bg-foreground text-background shadow-md shadow-foreground/10"
                  : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-muted-foreground hidden sm:block">
          Top {timeframe} ranked
        </span>
      </div>

      {/* Pure Pinterest / Instagram Explore Masonry Grid with Prominent Rank Badges */}
      <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-5 gap-4 w-full">
        {filteredEntries.map((entry, index) => (
          <HallOfFamePinCard key={entry.id} entry={entry} index={index} />
        ))}
      </div>
    </div>
  );
}

const sparks = [
  { id: 1, tx: "-14px", ty: "-22px", size: "w-1.5 h-1.5" },
  { id: 2, tx: "14px", ty: "-20px", size: "w-2 h-2" },
  { id: 3, tx: "-20px", ty: "-4px", size: "w-1 h-1" },
  { id: 4, tx: "20px", ty: "-2px", size: "w-1.5 h-1.5" },
  { id: 5, tx: "0px", ty: "-26px", size: "w-2 h-2" },
];

function HallOfFamePinCard({ entry, index }: { entry: HallOfFameEntry; index: number }) {
  const [sharded, setSharded] = useState(false);
  const [shardsCount, setShardsCount] = useState<number>(entry.shardsCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const overlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    };
  }, []);

  const aspectRatios = [
    "aspect-[9/16]",
    "aspect-[3/4]",
    "aspect-[2/3]",
    "aspect-[4/5]",
    "aspect-[16/11]",
    "aspect-square",
  ];
  const aspectClass = aspectRatios[index % aspectRatios.length];

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

    setShowOverlay(true);
    if (overlayTimerRef.current) clearTimeout(overlayTimerRef.current);
    overlayTimerRef.current = setTimeout(() => setShowOverlay(false), 3000);
  }, []);

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap > 0 && timeSinceLastTap < 350) {
      lastTapRef.current = 0;
      igniteShard();
    } else {
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

  const getRankBadgeClasses = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-amber-400 text-black shadow-lg shadow-amber-500/30";
      case 2:
        return "bg-slate-200 text-black shadow-md shadow-slate-300/30";
      case 3:
        return "bg-amber-700 text-white shadow-md shadow-amber-800/30";
      default:
        return "bg-black/60 text-white backdrop-blur-md";
    }
  };

  return (
    <div className="break-inside-avoid mb-4 group/pin flex flex-col gap-2 cursor-pointer select-none">
      {/* 1. Visual Canvas Pin with Clean Rounded Corners */}
      <div
        onPointerUp={handlePointerUp}
        onDoubleClick={(e) => {
          e.stopPropagation();
          igniteShard();
        }}
        className={`relative w-full ${aspectClass} rounded-[20px] overflow-hidden bg-secondary transition-all duration-300 select-none touch-manipulation`}
      >
        <Image
          src={entry.imageUrl}
          alt={entry.title}
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

        {/* Top-Left: Big Bold Rank Number (#1, #2, #3, ...) */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
          <span
            className={`w-8 h-8 rounded-full font-black text-xs sm:text-sm flex items-center justify-center tracking-tight ${getRankBadgeClasses(
              entry.rank
            )}`}
          >
            #{entry.rank}
          </span>
          <span 
            className={`text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-md transition-opacity ${
              showOverlay ? "opacity-100" : "opacity-0 group-hover/pin:opacity-100"
            }`}
          >
            {entry.animeSeries}
          </span>
        </div>

        {/* Bottom Floating Quick Actions on Hover or Tap */}
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
          {entry.title}
        </h4>

        <div className="flex items-center justify-between gap-2 mt-0.5">
          <Link
            href="/profile"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 min-w-0 group/creator hover:opacity-90 transition-opacity"
          >
            <Avatar className="w-5 h-5 rounded-full ring-1 ring-border/50 shrink-0">
              <AvatarImage src={entry.creator.avatar} alt={entry.creator.name} />
              <AvatarFallback>{entry.creator.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate group-hover/creator:text-foreground group-hover/creator:underline">
              {entry.creator.name}
            </span>
          </Link>

          <span
            className="text-[10px] font-bold shrink-0 opacity-80"
            style={{ color: entry.creator.clanColor }}
          >
            {entry.creator.clan}
          </span>
        </div>
      </div>
    </div>
  );
}
