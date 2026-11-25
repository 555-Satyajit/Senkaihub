export type ApexMainTab = "gallery" | "hall-of-fame";
export type ApexTimeframe = "daily" | "weekly" | "monthly";
export type ArtCategory = "all" | "fan-art" | "manga" | "cosplay" | "edits";
export type HallOfFameDiscipline = "all" | "fan-art" | "manga" | "anime-edits";

export interface GalleryArtItem {
  id: string;
  title: string;
  aspectRatio: string;
  imageUrl: string;
  category: "fan-art" | "manga" | "cosplay" | "edits";
  animeSeries: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    clan: string;
    clanColor: string;
  };
  shardsCount: number;
  commentsCount: number;
}

export interface HallOfFameEntry {
  id: string;
  rank: number;
  discipline: "fan-art" | "manga" | "anime-edits";
  period: ApexTimeframe;
  title: string;
  animeSeries: string;
  imageUrl: string;
  creator: {
    name: string;
    username: string;
    avatar: string;
    clan: string;
    clanColor: string;
  };
  shardsCount: number;
  commentsCount: number;
  rankChange?: "up" | "down" | "same" | "new";
}
