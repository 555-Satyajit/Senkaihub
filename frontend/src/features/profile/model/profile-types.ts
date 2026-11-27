import { PostItem } from "@/features/feed/model/feed-types";
import { sampleFeedPosts } from "@/features/feed/model/sample-posts";

export interface ClanAchievement {
  id: string;
  title: string;
  description: string;
  tier: "Gold" | "Crimson" | "Diamond";
  unlockedAt?: string;
  isLocked?: boolean;
  progress?: string;
  iconType: "trophy" | "flame" | "shield" | "swords" | "crown" | "star" | "zap" | "target";
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  bannerImage: string;
  followers: string;
  following: string;
  shardsEarned: string;
  bio: string;
  clanName: string;
  level: string; // e.g. "Hunter Level 12"
  nextLevel: string; // e.g. "Level 13"
  levelProgress: number; // e.g. 80
  posts: PostItem[];
  achievements: ClanAchievement[];
}

export const sampleUserProfile: UserProfile = {
  name: "ALTERSKY",
  handle: "@altersky",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
  bannerImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80",
  followers: "2.5K",
  following: "1.3K",
  shardsEarned: "12,256",
  bio: "Shadow Monarch Clan Vanguard. Digital anime illustrator & Solo Leveling enthusiast. Dominating weekly Clan Wars with 42 consecutive raid wins.",
  clanName: "Shadow Monarch Faction",
  level: "Hunter Level 12",
  nextLevel: "Level 13",
  levelProgress: 80,
  posts: [
    ...sampleFeedPosts,
    {
      id: "profile-post-3",
      author: {
        name: "Altersky",
        username: "altersky",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        clan: "Shadow Monarchs",
        clanBadgeColor: "from-purple-600 to-indigo-800",
        verified: true,
      },
      animeTitle: "Jujutsu Kaisen",
      timeAgo: "1d ago",
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
      caption: "Gojo Satoru Domain Expansion: Infinite Void speed-paint on Procreate. 8 hours of work.",
      category: "Fan Art",
      hashtags: ["#JJK", "#GojoSatoru", "#DomainExpansion", "#AnimeArt"],
      likesCount: 3410,
      commentsCount: 142,
      clanPointsEarned: 350,
      viewsCount: "21.5k",
      topLikedBy: {
        username: "megumi_fan",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80",
      },
      otherLikesCount: 3409,
    },
    {
      id: "profile-post-4",
      author: {
        name: "Altersky",
        username: "altersky",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        clan: "Shadow Monarchs",
        clanBadgeColor: "from-purple-600 to-indigo-800",
        verified: true,
      },
      animeTitle: "Demon Slayer",
      timeAgo: "3d ago",
      imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80",
      caption: "Hinokami Kagura dance recreation lighting study. Clan War banner entry.",
      category: "Fan Art",
      hashtags: ["#DemonSlayer", "#Tanjiro", "#HinokamiKagura"],
      likesCount: 2890,
      commentsCount: 96,
      clanPointsEarned: 290,
      viewsCount: "18.2k",
      topLikedBy: {
        username: "rengoku_flame",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80",
      },
      otherLikesCount: 2889,
    },
    {
      id: "profile-post-5",
      author: {
        name: "Altersky",
        username: "altersky",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        clan: "Shadow Monarchs",
        clanBadgeColor: "from-purple-600 to-indigo-800",
        verified: true,
      },
      animeTitle: "Chainsaw Man",
      timeAgo: "5d ago",
      imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
      caption: "Makima street photography portrait cosplay edit.",
      category: "Cosplay",
      hashtags: ["#ChainsawMan", "#MakimaCosplay", "#AnimeCosplay"],
      likesCount: 1950,
      commentsCount: 64,
      clanPointsEarned: 195,
      viewsCount: "12.8k",
      topLikedBy: {
        username: "denji_hero",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      },
      otherLikesCount: 1949,
    },
    {
      id: "profile-post-6",
      author: {
        name: "Altersky",
        username: "altersky",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        clan: "Shadow Monarchs",
        clanBadgeColor: "from-purple-600 to-indigo-800",
        verified: true,
      },
      animeTitle: "One Piece",
      timeAgo: "1w ago",
      imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
      caption: "Gear 5 Luffy storm battle composition for the Grand Line tournament.",
      category: "Fan Art",
      hashtags: ["#OnePiece", "#Gear5", "#Luffy", "#AnimeArt"],
      likesCount: 4520,
      commentsCount: 218,
      clanPointsEarned: 450,
      viewsCount: "34.1k",
      topLikedBy: {
        username: "zoro_swordsman",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
      },
      otherLikesCount: 4519,
    },
  ],
  achievements: [
    {
      id: "ach-1",
      title: "Clan War Champion",
      description: "Led Shadow Monarchs to victory against Straw Hat Fleet with 28k Victory Points.",
      tier: "Crimson",
      unlockedAt: "11/22/2024",
      iconType: "trophy",
    },
    {
      id: "ach-2",
      title: "Master Shard Igniter",
      description: "Earned over 10,000 community Soul Shards across fan art submissions.",
      tier: "Diamond",
      unlockedAt: "11/17/2024",
      iconType: "flame",
    },
    {
      id: "ach-3",
      title: "Shadow Vanguard",
      description: "Completed 50 co-op raid boss events without a single squad wipe.",
      tier: "Gold",
      unlockedAt: "11/10/2024",
      iconType: "shield",
    },
    {
      id: "ach-4",
      title: "Spoiler Shield Guardian",
      description: "Verified accurate episode spoiler tags on 100+ community discussions.",
      tier: "Gold",
      unlockedAt: "10/25/2024",
      iconType: "swords",
    },
    {
      id: "ach-5",
      title: "Top 1% Creator",
      description: "Ranked among the top 1% community anime creators this season.",
      tier: "Crimson",
      unlockedAt: "10/12/2024",
      iconType: "crown",
    },
    {
      id: "ach-6",
      title: "Raid Tactician",
      description: "Coordinated 10 successful guild dungeon conquests in Clan Wars.",
      tier: "Diamond",
      unlockedAt: "09/30/2024",
      iconType: "zap",
    },
    {
      id: "ach-7",
      title: "Legendary Hunter",
      description: "Reach Hunter Level 20 in the seasonal Clan Pass.",
      tier: "Crimson",
      isLocked: true,
      progress: "12/20",
      iconType: "star",
    },
    {
      id: "ach-8",
      title: "Shadow Sovereign",
      description: "Unlock the ultimate Monarch title by securing #1 guild leaderboard.",
      tier: "Gold",
      isLocked: true,
      progress: "Locked",
      iconType: "target",
    },
  ],
};


export const multiUserProfiles: Record<string, UserProfile> = {
  altersky: sampleUserProfile,
  akirakenji_art: {
    name: "Akira Kenji",
    handle: "@akirakenji_art",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    followers: "8.4K",
    following: "340",
    shardsEarned: "18,450",
    bio: "Apex Grand Champion #1. Concept artist & key animator. Specializing in dark fantasy, Solo Leveling, and cinematic lighting scenes.",
    clanName: "Shadow Monarchs",
    level: "Monarch Sovereign Lv. 24",
    nextLevel: "Level 25",
    levelProgress: 92,
    posts: sampleFeedPosts.slice(0, 3),
    achievements: sampleUserProfile.achievements.slice(0, 5),
  },
  yunacos_official: {
    name: "Yuna Cosplay",
    handle: "@yunacos_official",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    followers: "14.2K",
    following: "610",
    shardsEarned: "24,800",
    bio: "Demon Slayer Corps Cosplay Lead. Prop crafter & costume designer. Winner of SenkaiHub Autumn Cosplay Showcase.",
    clanName: "Demon Slayer Corps",
    level: "Hashira Elite Lv. 19",
    nextLevel: "Level 20",
    levelProgress: 65,
    posts: sampleFeedPosts.slice(1, 4),
    achievements: sampleUserProfile.achievements.slice(1, 6),
  },
  shinjiro_kuro: {
    name: "Shinjiro Kuro",
    handle: "@shinjiro_kuro",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80",
    followers: "6.9K",
    following: "215",
    shardsEarned: "14,200",
    bio: "Gotei 13 First Division Inker. Bleach & dark shonen manga specialist. Digital brush pack creator.",
    clanName: "Gotei 13",
    level: "Captain Class Lv. 16",
    nextLevel: "Level 17",
    levelProgress: 45,
    posts: sampleFeedPosts.slice(2, 5),
    achievements: sampleUserProfile.achievements.slice(2, 7),
  },
  tatsuo_blade: {
    name: "Tatsuo Blade",
    handle: "@tatsuo_blade",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80",
    followers: "5.1K",
    following: "190",
    shardsEarned: "11,800",
    bio: "3D VFX artist & Attack on Titan enthusiast. Recreating high-octane anime action sequences.",
    clanName: "Survey Corps",
    level: "Scout Elite Lv. 14",
    nextLevel: "Level 15",
    levelProgress: 70,
    posts: sampleFeedPosts.slice(0, 3),
    achievements: sampleUserProfile.achievements.slice(0, 4),
  },
  hana_cel: {
    name: "Hana Satoru",
    handle: "@hana_cel",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    followers: "9.3K",
    following: "420",
    shardsEarned: "16,400",
    bio: "Jujutsu High Special Grade sorcerer. AMV creator and color grader.",
    clanName: "Jujutsu High",
    level: "Special Grade Lv. 18",
    nextLevel: "Level 19",
    levelProgress: 88,
    posts: sampleFeedPosts.slice(1, 4),
    achievements: sampleUserProfile.achievements.slice(1, 5),
  },
  levi_ackerman_fan: {
    name: "Levi Fan Club",
    handle: "@levi_ackerman_fan",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80",
    bannerImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    followers: "4.8K",
    following: "110",
    shardsEarned: "8,900",
    bio: "Humanity's strongest soldier stan. Scouting Legion supporter.",
    clanName: "Survey Corps",
    level: "Cadet Vanguard Lv. 10",
    nextLevel: "Level 11",
    levelProgress: 50,
    posts: sampleFeedPosts.slice(2, 4),
    achievements: sampleUserProfile.achievements.slice(2, 5),
  },
};

export function getProfileByUsername(username: string): UserProfile {
  const clean = username.replace(/^@/, "").toLowerCase();
  if (multiUserProfiles[clean]) {
    return multiUserProfiles[clean];
  }
  // Fallback profile if username not found
  return {
    ...sampleUserProfile,
    name: clean.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    handle: `@${clean}`,
    bio: `Passionate anime fan and community member of SenkaiHub. Exploring clans, art galleries, and discussions.`,
  };
}
