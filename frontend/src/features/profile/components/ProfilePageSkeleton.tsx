import { Skeleton } from "@/components/ui/skeleton";

export function ProfilePageSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 max-w-[1100px] mx-auto pb-10 animate-fade-in">
      {/* 1. Profile Top Card Skeleton */}
      <div className="w-full bg-card rounded-[24px] overflow-hidden border border-border/60 shadow-xl">
        {/* Banner Skeleton */}
        <Skeleton className="w-full h-[180px] sm:h-[220px] md:h-[260px] rounded-none" />

        {/* Details Grid */}
        <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Stats */}
            <div className="flex items-center justify-center md:justify-start gap-6 order-2 md:order-1 pt-2 md:pt-6">
              <div className="flex flex-col items-center gap-1.5">
                <Skeleton className="w-14 h-5 rounded" />
                <Skeleton className="w-12 h-3 rounded" />
              </div>
              <div className="w-[1px] h-8 bg-border/80" />
              <div className="flex flex-col items-center gap-1.5">
                <Skeleton className="w-14 h-5 rounded" />
                <Skeleton className="w-12 h-3 rounded" />
              </div>
              <div className="w-[1px] h-8 bg-border/80" />
              <div className="flex flex-col items-center gap-1.5">
                <Skeleton className="w-16 h-5 rounded" />
                <Skeleton className="w-14 h-3 rounded" />
              </div>
            </div>

            {/* Avatar & Name */}
            <div className="flex flex-col items-center order-1 md:order-2 -mt-16 md:-mt-20 z-10">
              <Skeleton className="w-[112px] h-[112px] md:w-[124px] md:h-[124px] rounded-full border-[6px] border-card shadow-2xl" />
              <Skeleton className="w-36 h-6 rounded-md mt-3" />
              <Skeleton className="w-24 h-4 rounded mt-1.5" />
              <div className="flex items-center gap-3 mt-4">
                <Skeleton className="w-28 h-9 rounded-[10px]" />
                <Skeleton className="w-24 h-9 rounded-[10px]" />
              </div>
            </div>

            {/* Bio snippet */}
            <div className="order-3 flex flex-col items-center md:items-start pt-2 md:pt-6 gap-2">
              <Skeleton className="w-28 h-3.5 rounded" />
              <Skeleton className="w-full max-w-sm h-3 rounded" />
              <Skeleton className="w-3/4 max-w-sm h-3 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. XP Level Progress Skeleton */}
      <div className="w-full bg-card p-4 md:p-5 rounded-2xl border border-border/60 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <Skeleton className="w-28 h-4 rounded" />
          <Skeleton className="w-16 h-4 rounded" />
        </div>
        <Skeleton className="w-full h-3 rounded-full" />
      </div>

      {/* 3. Showcase Tabs Grid Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-24 h-8 rounded-full" />
          <Skeleton className="w-28 h-8 rounded-full" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full aspect-square rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
