import { Skeleton } from "@/components/ui/skeleton";

export function ChatPageSkeleton() {
  return (
    <div className="w-full h-[calc(100vh-64px)] md:h-[calc(100vh-84px)] flex bg-background overflow-hidden animate-fade-in">
      {/* 1. Left Conversation Sidebar Skeleton */}
      <div className="w-full md:w-[360px] lg:w-[400px] border-r border-border/50 flex flex-col bg-card/60 shrink-0">
        <div className="p-4 border-b border-border/40">
          <Skeleton className="w-full h-10 rounded-xl" />
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30">
              <Skeleton className="w-12 h-12 rounded-2xl shrink-0" />
              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-24 h-4 rounded" />
                  <Skeleton className="w-10 h-3 rounded" />
                </div>
                <Skeleton className="w-40 h-3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Right Active Conversation Area Skeleton (Desktop) */}
      <div className="hidden md:flex flex-1 flex-col bg-background">
        {/* Chat Header Skeleton */}
        <div className="h-16 px-6 border-b border-border/50 flex items-center justify-between bg-card/40">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-2xl" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="w-28 h-4 rounded" />
              <Skeleton className="w-14 h-3 rounded" />
            </div>
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>

        {/* Message bubbles skeleton */}
        <div className="flex-1 p-6 flex flex-col gap-4 justify-end">
          <div className="flex items-start gap-2 max-w-[65%]">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <Skeleton className="h-14 w-64 rounded-2xl" />
          </div>
          <div className="flex items-end justify-end max-w-[65%] ml-auto">
            <Skeleton className="h-10 w-48 rounded-2xl bg-primary/20" />
          </div>
          <div className="flex items-start gap-2 max-w-[65%]">
            <Skeleton className="w-8 h-8 rounded-full shrink-0" />
            <Skeleton className="h-20 w-80 rounded-2xl" />
          </div>
          <div className="flex items-end justify-end max-w-[65%] ml-auto">
            <Skeleton className="h-12 w-56 rounded-2xl bg-primary/20" />
          </div>
        </div>

        {/* Chat input skeleton */}
        <div className="p-4 border-t border-border/40 bg-card/30">
          <Skeleton className="w-full h-12 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
