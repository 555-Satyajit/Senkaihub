"use client";

import { useState, useCallback } from "react";
import { PostItem } from "../model/feed-types";
import { sampleFeedPosts } from "../model/sample-posts";

// Helper to generate simulated next page posts with unique IDs
function generateMockBatch(pageNumber: number): PostItem[] {
  const titles = [
    "Jujutsu Kaisen Season 3",
    "Chainsaw Man",
    "Attack on Titan",
    "Bleach: Thousand-Year Blood War",
    "Frieren: Beyond Journey's End",
  ];

  const captions = [
    "Ryomen Sukuna malevolent shrine domain expansion concept art! Took 20 hours in Clip Studio Paint 🔥",
    "Denji and Pochita tribute animation reel. The colors came out so vibrant on this frame!",
    "Levi Ackerman forest battle recreation. Checking in for the Clan War rally points ⚔️",
    "Ichigo Kurosaki Bankai redesign with dual blades. What do you think of this color palette?",
    "Frieren looking up at the shooting stars after 80 years. Quiet moment captured in watercolor style.",
  ];

  const images = [
    "https://images.unsplash.com/photo-1563089145-599997674d42?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
  ];

  return Array.from({ length: 3 }).map((_, i) => {
    const template = sampleFeedPosts[i % sampleFeedPosts.length];
    const itemIndex = (pageNumber - 1) * 3 + i;
    return {
      ...template,
      id: `post-page-${pageNumber}-${i}-${Date.now()}`,
      animeTitle: titles[itemIndex % titles.length],
      caption: captions[itemIndex % captions.length],
      imageUrl: images[itemIndex % images.length],
      likesCount: template.likesCount + itemIndex * 47,
      commentsCount: template.commentsCount + (itemIndex % 12),
      timeAgo: `${itemIndex + 3}h ago`,
    };
  });
}

export function useInfiniteFeed() {
  const [posts, setPosts] = useState<PostItem[]>(sampleFeedPosts);
  const [page, setPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Maximum mock pages before simulating end of feed
  const MAX_PAGES = 5;

  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate real network fetch latency (800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (page >= MAX_PAGES) {
      setHasMore(false);
      setIsLoadingMore(false);
      return;
    }

    const nextPage = page + 1;
    const newPosts = generateMockBatch(nextPage);

    setPosts((prev) => [...prev, ...newPosts]);
    setPage(nextPage);
    setIsLoadingMore(false);
  }, [isLoadingMore, hasMore, page]);

  return {
    posts,
    isLoadingMore,
    hasMore,
    loadMore,
  };
}
