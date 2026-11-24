export type PostClassification =
  | "Fan Art & Illustrations"
  | "Clan Raid Strategy"
  | "Manga & Theory"
  | "Cosplay Showcase"
  | "Battle Clips / AMV";

export interface CreatePostPayload {
  caption: string;
  clanName: string;
  classification: PostClassification;
  tags: string[];
  imageUrl: string;
  isSpoiler: boolean;
  clanOnly: boolean;
}

export const CLAN_DESTINATIONS = [
  "Public Feed (All Clans)",
  "Shadow Monarchs",
  "Demon Slayer Corps",
  "Jujutsu Sorcerers",
  "Straw Hat Fleet",
  "Akatsuki Renegades",
  "Survey Corps Legion",
] as const;

export const POST_CLASSIFICATIONS: PostClassification[] = [
  "Fan Art & Illustrations",
  "Clan Raid Strategy",
  "Manga & Theory",
  "Cosplay Showcase",
  "Battle Clips / AMV",
];

export const POPULAR_TAGS = [
  "#SoloLeveling",
  "#DemonSlayer",
  "#JJK",
  "#OnePiece",
  "#ClanWars",
  "#FanArt",
  "#RaidStrategy",
];
