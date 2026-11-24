export type PostCategory = "Fan Art" | "Cosplay" | "Anime Discussion" | "Manga Chapter" | "Theory" | "AMV / Edit";

export interface CreatePostPayload {
  caption: string;
  category: PostCategory;
  animeTitle: string;
  tags: string[];
  imageUrl: string;
  isSpoiler: boolean;
  spoilerEpisode?: string;
  clanExclusive: boolean;
}

export const ANIME_COMMUNITIES = [
  "Solo Leveling",
  "Demon Slayer (Kimetsu no Yaiba)",
  "Jujutsu Kaisen",
  "One Piece",
  "Chainsaw Man",
  "Attack on Titan",
  "Bleach: Thousand-Year Blood War",
  "Frieren: Beyond Journey's End",
  "Naruto / Boruto",
] as const;

export const POST_CATEGORIES: PostCategory[] = [
  "Fan Art",
  "Cosplay",
  "Anime Discussion",
  "Manga Chapter",
  "Theory",
  "AMV / Edit",
];
