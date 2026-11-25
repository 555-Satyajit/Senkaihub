"use client";

import { useState } from "react";
import { Trophy, Palette } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApexMainTab, ApexTimeframe } from "../model/apex-types";
import { ArtGallerySection } from "../components/ArtGallerySection";
import { HallOfFameSection } from "../components/HallOfFameSection";

export function ApexContainer() {
  const [mainTab, setMainTab] = useState<ApexMainTab>("gallery");
  const [timeframe, setTimeframe] = useState<ApexTimeframe>("weekly");

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header with Two Big Tabs: Art Gallery vs Hall of Fame */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border/40">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-foreground tracking-tight">
            The Apex
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            The pinnacle of SenkaiHub — explore community art or inspect seasonal champions.
          </p>
        </div>

        {/* Primary Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMainTab("gallery")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mainTab === "gallery"
                ? "bg-foreground text-background shadow-md shadow-foreground/10"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Art Gallery</span>
          </button>

          <button
            type="button"
            onClick={() => setMainTab("hall-of-fame")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              mainTab === "hall-of-fame"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/40"
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Hall of Fame</span>
          </button>
        </div>
      </div>

      {/* 2. Tab Content Display */}
      {mainTab === "gallery" ? (
        /* Tab A: Pinterest-Style Pure Art Gallery */
        <ArtGallerySection />
      ) : (
        /* Tab B: Hall of Fame (Pixiv/ArtStation-Style Visual Rankings) */
        <div className="flex flex-col gap-6 w-full">
          {/* Timeframe Switcher */}
          <div className="flex items-center justify-between gap-3">
            <Tabs
              value={timeframe}
              onValueChange={(val) => setTimeframe(val as ApexTimeframe)}
              className="shrink-0"
            >
              <TabsList className="h-9 bg-secondary/80 p-1 rounded-xl border border-border/60">
                <TabsTrigger value="daily" className="text-xs px-3.5 h-7 rounded-lg cursor-pointer font-bold">
                  Daily
                </TabsTrigger>
                <TabsTrigger value="weekly" className="text-xs px-3.5 h-7 rounded-lg cursor-pointer font-bold">
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="text-xs px-3.5 h-7 rounded-lg cursor-pointer font-bold">
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <HallOfFameSection timeframe={timeframe} />
        </div>
      )}
    </div>
  );
}
