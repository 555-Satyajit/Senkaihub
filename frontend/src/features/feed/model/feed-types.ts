export interface PostAuthor {
  name: string;
  username: string;
  avatar: string;
  clan: string;
  clanBadgeColor: string;
  verified?: boolean;
}

export interface PostItem {
  id: string;
  author: PostAuthor;
  animeTitle: string;
  animeEpisode?: string;
  spoilerSafeFor?: string; // e.g. "Safe for Ep. 12+"
  category: "Fan Art" | "Cosplay" | "Manga Coloring" | "Anime Edit" | "Review";
  caption: string;
  hashtags: string[];
  imageUrl: string;
  likesCount: number;
  commentsCount: number;
  clanPointsEarned: number;
  timeAgo: string;
  viewsCount: string;
  topLikedBy: {
    username: string;
    avatar: string;
  };
  otherLikesCount: number;
  pinnedComment?: {
    user: string;
    text: string;
  };
}
