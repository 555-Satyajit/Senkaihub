import { Skeleton } from "@/components/ui/skeleton";

export function ApexGallerySkeleton() {
  const pinHeights = [
    "aspect-[9/16]",
    "aspect-[3/4]",
    "aspect-[2/3]",
    "aspect-[4/5]",
    "aspect-[16/11]",
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[9/16]",
    "aspect-[2/3]",
    "aspect-square",
  ];

  return (
    <div className="flex flex-col gap-5 w-full animate-fade-in">
      {/* Top Filter Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>

      {/* Staggered Pinterest Columns Skeleton */}
      <div className="columns-2 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-5 gap-4 w-full">
        {pinHeights.map((heightClass, index) => (
          <div key={index} className="break-inside-avoid mb-4 flex flex-col gap-2">
            {/* Pin image skeleton with smooth shimmer */}
            <Skeleton className={`w-full ${heightClass} rounded-[20px]`} />

            {/* Title & Creator row skeleton */}
            <div className="px-1 flex flex-col gap-1.5">
              <Skeleton className="h-3.5 w-3/4 rounded-md" />
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-16 h-3 rounded" />
                </div>
                <Skeleton className="w-10 h-3 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
