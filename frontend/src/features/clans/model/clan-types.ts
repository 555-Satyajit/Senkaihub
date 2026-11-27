export interface ClanItem {
  id: string;
  name: string;
  tier: string;
  category: "all" | "shadow-monarchs" | "demon-slayers" | "jujutsu-high" | "straw-hats" | "top-tier";
  bannerUrl: string;
  crestUrl: string;
  motto: string;
  vpBounty: string;
  rating: number;
  reviewCount: number;
  memberCount: string;
}

export const sampleClans: ClanItem[] = [
  {
    id: "clan-1",
    name: "Shadow Monarchs",
    tier: "Rank: Grandmaster S-Tier",
    category: "shadow-monarchs",
    bannerUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    crestUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    motto: "Rise from the shadows. Dominating seasonal Clan Wars with disciplined necromancy and raid tactics.",
    vpBounty: "142,800 VP",
    rating: 4.9,
    reviewCount: 340,
    memberCount: "3.4k hunters",
  },
  {
    id: "clan-2",
    name: "Demon Slayer Corps",
    tier: "Rank: Hashira Division",
    category: "demon-slayers",
    bannerUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    crestUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
    motto: "Total concentration breathing. Elite vanguard standing firm against seasonal boss raids and rival clans.",
    vpBounty: "118,200 VP",
    rating: 4.9,
    reviewCount: 285,
    memberCount: "2.8k slayers",
  },
  {
    id: "clan-3",
    name: "Jujutsu Sorcerers",
    tier: "Rank: Special Grade",
    category: "jujutsu-high",
    bannerUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    crestUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    motto: "Domain expansion warfare. High-damage burst clan specializing in rapid tournament eliminations.",
    vpBounty: "95,400 VP",
    rating: 4.8,
    reviewCount: 198,
    memberCount: "1.9k sorcerers",
  },
  {
    id: "clan-4",
    name: "Straw Hat Fleet",
    tier: "Rank: Emperor Tier",
    category: "straw-hats",
    bannerUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    crestUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    motto: "Conquer the Grand Line. Massive alliance built on unstoppable team synergy and legendary raid expeditions.",
    vpBounty: "210,000 VP",
    rating: 5.0,
    reviewCount: 512,
    memberCount: "5.1k pirates",
  },
  {
    id: "clan-5",
    name: "Akatsuki Renegades",
    tier: "Rank: S-Rank Mercenaries",
    category: "top-tier",
    bannerUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    crestUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    motto: "Ruthless coordinated skirmishes. Small, elite strike squad controlling the seasonal Victory Point territory.",
    vpBounty: "88,900 VP",
    rating: 4.9,
    reviewCount: 164,
    memberCount: "820 shinobi",
  },
  {
    id: "clan-6",
    name: "Survey Corps Legion",
    tier: "Rank: Garrison Vanguard",
    category: "top-tier",
    bannerUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
    crestUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    motto: "Dedicate your hearts. Defensive mastery holding the central citadel through all war phases.",
    vpBounty: "76,500 VP",
    rating: 4.8,
    reviewCount: 130,
    memberCount: "1.4k soldiers",
  },
];
