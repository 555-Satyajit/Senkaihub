"use client";

import { useEffect, useRef } from "react";
import { HeroBannerCard } from "../components/HeroBannerCard";
import { FeedPostCard } from "../components/FeedPostCard";
import { FeedPostSkeleton } from "../components/FeedPostSkeleton";
import { FeedRightSidebar } from "../components/FeedRightSidebar";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { useInfiniteFeed } from "../hooks/useInfiniteFeed";

export function FeedContainer() {
  const { posts, isLoadingMore, hasMore, loadMore } = useInfiniteFeed();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Modern IntersectionObserver for zero-lag scroll detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      {
        // 350px rootMargin pre-fetches the next batch before the user hits the exact bottom!
        rootMargin: "350px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, loadMore]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-14 gap-6 xl:gap-8 items-start">
      {/* Center Content Column (Hero banner + Infinite Posts) */}
      <section className="lg:col-span-7 xl:col-span-9 flex flex-col gap-5 md:gap-6 min-w-0">
        {/* Rally banner visible only on desktop/tablet */}
        <div className="hidden md:block">
          <HeroBannerCard />
        </div>

        {/* Dynamic Post Feed */}
        {posts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}

        {/* Loading Skeleton during batch fetch */}
        {isLoadingMore && (
          <div className="flex flex-col gap-5">
            <FeedPostSkeleton />
          </div>
        )}

        {/* Bottom Sentinel Trigger (Invisible trigger for IntersectionObserver) */}
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden="true" />

        {/* End of Feed State: Styled with SenkaiHub anime theme instead of generic AI sparkles */}
        {!hasMore && (
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-3">
            {/* Pulsing anime flame soul shard badge */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-md animate-pulse" />
              <div className="w-12 h-12 rounded-2xl bg-secondary/80 border border-primary/40 flex items-center justify-center text-primary relative shadow-lg shadow-primary/10">
                <SoulShardIcon filled className="w-6 h-6 text-primary scale-110" />
              </div>
            </div>

            <div className="flex flex-col gap-1 max-w-sm">
              <h4 className="font-heading font-black text-base text-foreground tracking-tight">
                Scroll Finished
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                You’ve reached the edge of the realm. Check back soon for new anime edits and clan drops.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Right Sidebar Column (Profile, Clan Points, Suggested Creators, Live Chat) */}
      <aside className="hidden lg:block lg:col-span-5 xl:col-span-5 w-full sticky top-[92px] max-h-[calc(100vh-108px)] overflow-y-auto scrollbar-none">
        <FeedRightSidebar />
      </aside>
    </div>
  );
}
