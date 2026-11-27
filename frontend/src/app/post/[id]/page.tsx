import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { sampleFeedPosts } from "@/features/feed/model/sample-posts";
import { PostDetailContainer } from "@/features/post-detail/containers/PostDetailContainer";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = sampleFeedPosts.find((p) => p.id === id) || sampleFeedPosts[0];

  return {
    title: `${post.author.username} on SenkaiHub: "${post.animeTitle}"`,
    description: post.caption,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = sampleFeedPosts.find((p) => p.id === id) || sampleFeedPosts[0];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      {/* 1. Desktop Nav */}
      <SidebarNav />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Header */}
        <TopHeader />

        {/* 3. Post Detail + Reddit Thread Container - Full Width Layout */}
        <main className="flex-1 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 xl:px-10 max-w-[1720px] w-full mx-auto">
          <PostDetailContainer post={post} />
        </main>
      </div>

      {/* 4. Mobile Bottom Nav */}
      <MobileBottomNav />
    </div>
  );
}
