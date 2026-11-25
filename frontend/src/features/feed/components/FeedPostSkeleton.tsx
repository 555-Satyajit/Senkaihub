import { Skeleton } from "@/components/ui/skeleton";

export function FeedPostSkeleton() {
  return (
    <div className="w-full bg-card rounded-[24px] border border-border/70 p-4 sm:p-5 flex flex-col gap-4 animate-pulse">
      {/* Header: Author + Meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-11 h-11 rounded-2xl bg-secondary" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="w-32 h-4 rounded bg-secondary" />
            <Skeleton className="w-20 h-3 rounded bg-secondary" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded-full bg-secondary" />
      </div>

      {/* Caption skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="w-3/4 h-3.5 rounded bg-secondary" />
        <Skeleton className="w-1/2 h-3.5 rounded bg-secondary" />
      </div>

      {/* Main image placeholder */}
      <Skeleton className="w-full h-72 sm:h-96 rounded-2xl bg-secondary/80" />

      {/* Footer action bar */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-8 rounded-full bg-secondary" />
          <Skeleton className="w-12 h-8 rounded-full bg-secondary" />
        </div>
        <Skeleton className="w-20 h-6 rounded-md bg-secondary" />
      </div>
    </div>
  );
}
