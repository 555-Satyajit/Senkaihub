/**
 * Anime/gaming inspired prefixes, elements, and suffixes for cool gamertag/handle generation
 */
const PREFIXES = [
  "Shadow", "Crimson", "Void", "Solar", "Phantom", 
  "Astral", "Echo", "Frost", "Rogue", "Zenith", 
  "Nexus", "Nova", "Kuro", "Shiro", "Ryu", 
  "Akuma", "Hikari", "Vortex", "Slayer", "Apex"
];

const NOUNS = [
  "Shinobi", "Ronin", "Valkyrie", "Blade", "Titan", 
  "Specter", "Kitsune", "Phoenix", "Cipher", "Samurai", 
  "Reaper", "Striker", "Wraith", "Sentinel", "Drifter", 
  "Ghost", "Sage", "Raven", "Hunter", "Wanderer"
];

export function generateCoolUsername(): string {
  const prefix = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const num = Math.floor(10 + Math.random() * 89); // 2-digit number (10-99)
  return `${prefix}${noun}_${num}`;
}

export function generateAlternativeUsernames(base?: string): string[] {
  const results: string[] = [];
  const cleanBase = base ? base.replace(/[^a-zA-Z0-9]/g, "") : "";
  
  if (cleanBase && cleanBase.length >= 3) {
    const p = PREFIXES[Math.floor(Math.random() * PREFIXES.length)];
    const n = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    results.push(`${cleanBase}_${n}`);
    results.push(`${p}_${cleanBase}`);
    results.push(`${cleanBase}${Math.floor(100 + Math.random() * 899)}`);
  } else {
    for (let i = 0; i < 3; i++) {
      results.push(generateCoolUsername());
    }
  }
  return results;
}

// 24 curated avatar IDs from the 380 avatars in /avatars/
export const POPULAR_AVATARS = [
  "/avatars/1.svg",
  "/avatars/2.svg",
  "/avatars/3.svg",
  "/avatars/4.svg",
  "/avatars/5.svg",
  "/avatars/6.svg",
  "/avatars/7.svg",
  "/avatars/8.svg",
  "/avatars/9.svg",
  "/avatars/10.svg",
  "/avatars/11.svg",
  "/avatars/12.svg",
  "/avatars/13.svg",
  "/avatars/14.svg",
  "/avatars/15.svg",
  "/avatars/16.svg",
  "/avatars/17.svg",
  "/avatars/18.svg",
  "/avatars/19.svg",
  "/avatars/20.svg",
  "/avatars/21.svg",
  "/avatars/22.svg",
  "/avatars/23.svg",
  "/avatars/24.svg",
];
