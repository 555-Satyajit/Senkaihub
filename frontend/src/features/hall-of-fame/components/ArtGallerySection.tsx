"use client";

import { useState } from "react";
import { ArtCategory } from "../model/apex-types";
import { sampleGalleryArt } from "../model/sample-apex-data";
import { PinterestArtCard } from "./PinterestArtCard";

export function ArtGallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<ArtCategory>("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "fan-art", label: "Fan Art" },
    { id: "manga", label: "Manga Inks" },
    { id: "cosplay", label: "Cosplay" },
    { id: "edits", label: "Anime Edits" },
  ] as const;

  const filteredItems = sampleGalleryArt.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Pinterest Pill Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-xs px-4 py-2 rounded-full font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-foreground text-background shadow-md shadow-foreground/10"
                : "bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* True Pinterest Masonry Columns (2 on mobile, 3 on tablet, 4 on desktop, 5 on wide screens) */}
      <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-5 gap-4 w-full">
        {filteredItems.map((item) => (
          <PinterestArtCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
