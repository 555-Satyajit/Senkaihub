"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateClanDialog } from "./CreateClanDialog";
import type { ClanItem } from "../model/clan-types";

interface ClanFilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onClanCreated?: (clan: ClanItem) => void;
}

const filterOptions = [
  { id: "all", label: "All Clans" },
  { id: "shadow-monarchs", label: "Shadow Monarchs" },
  { id: "demon-slayers", label: "Demon Slayer Corps" },
  { id: "jujutsu-high", label: "Jujutsu High" },
  { id: "straw-hats", label: "Straw Hat Fleet" },
  { id: "top-tier", label: "S-Tier Citadels" },
];

export function ClanFilterBar({ selectedCategory, onSelectCategory, onClanCreated }: ClanFilterBarProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5 w-full">
      {/* Title & Actions: "Clans", Create Clan, and Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="font-heading font-black text-2xl md:text-[30px] text-foreground tracking-tight leading-[38px]">
            Clans
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Join a faction, compete in weekly Clan Wars, and conquer raid citadels.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Create a Clan Button */}
          <CreateClanDialog onClanCreated={onClanCreated} />

          <Button
            variant="outline"
            className="h-[38px] px-4 rounded-[8px] bg-transparent border-border/80 hover:bg-secondary/40 text-foreground text-[13px] font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-foreground" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="w-full overflow-x-auto scrollbar-none pb-1">
        <div className="flex items-center gap-2.5">
          {filterOptions.map((opt) => {
            const isActive = selectedCategory === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectCategory(opt.id)}
                className={`h-[42px] px-5 rounded-[8px] text-[13px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-primary-foreground shadow-md hover:brightness-110"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/60 border border-border/40"
                }`}
                style={
                  isActive
                    ? { background: "var(--gradient-btn)" }
                    : undefined
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
