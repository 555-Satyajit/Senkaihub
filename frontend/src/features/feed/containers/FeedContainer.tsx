import { HeroBannerCard } from "../components/HeroBannerCard";
import { FeedPostCard } from "../components/FeedPostCard";
import { FeedRightSidebar } from "../components/FeedRightSidebar";
import { sampleFeedPosts } from "../model/sample-posts";

export function FeedContainer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-14 gap-6 xl:gap-8 items-start">
      {/* Center Content Column (Hero banner + Posts) */}
      <section className="lg:col-span-7 xl:col-span-9 flex flex-col gap-5 md:gap-6 min-w-0">
        {/* Rally banner visible only on desktop/tablet */}
        <div className="hidden md:block">
          <HeroBannerCard />
        </div>
        {sampleFeedPosts.map((post) => (
          <FeedPostCard key={post.id} post={post} />
        ))}
      </section>

      {/* Right Sidebar Column (Profile, Clan Points, Suggested Creators, Live Chat) */}
      <aside className="hidden lg:block lg:col-span-5 xl:col-span-5 w-full sticky top-[92px] max-h-[calc(100vh-108px)] overflow-y-auto scrollbar-none">
        <FeedRightSidebar />
      </aside>
    </div>
  );
}
