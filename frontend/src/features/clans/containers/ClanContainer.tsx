"use client";

import { useState } from "react";
import { ClanFilterBar } from "../components/ClanFilterBar";
import { ClanCard } from "../components/ClanCard";
import { sampleClans } from "../model/clan-types";
import { FeedRightSidebar } from "@/features/feed/components/FeedRightSidebar";

export function ClanContainer() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredClans = selectedCategory === "all"
    ? sampleClans
    : sampleClans.filter((c) => c.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-14 gap-6 xl:gap-8 items-start">
      {/* Main Column: Filter bar + 3-Column Clan Card Grid */}
      <section className="lg:col-span-7 xl:col-span-9 flex flex-col gap-6 min-w-0">
        <ClanFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 3-column grid matching Figma Rectangle 6407, 6408, 6409 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-5">
          {filteredClans.map((clan) => (
            <ClanCard key={clan.id} clan={clan} />
          ))}
        </div>
      </section>

      {/* Right Sidebar Column - Sticky aligned with top header */}
      <aside className="hidden lg:block lg:col-span-5 xl:col-span-5 w-full sticky top-[92px] max-h-[calc(100vh-108px)] overflow-y-auto scrollbar-none">
        <FeedRightSidebar />
      </aside>
    </div>
  );
}
