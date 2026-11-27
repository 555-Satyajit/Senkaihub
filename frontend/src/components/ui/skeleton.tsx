import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-shimmer rounded-xl bg-secondary/70 relative overflow-hidden", className)}
      {...props}
    />
  );
}

export { Skeleton };
