interface ProfileLevelProgressProps {
  level: string; // e.g. "Hunter Level 12"
  nextLevel: string; // e.g. "Level 13"
  progress: number; // e.g. 80
}

export function ProfileLevelProgress({ level, nextLevel, progress }: ProfileLevelProgressProps) {
  return (
    <div className="w-full flex items-center justify-between gap-4 py-2 select-none">
      {/* Current Level */}
      <span className="font-heading font-black text-xs md:text-sm text-foreground shrink-0">
        {level}
      </span>

      {/* Progress Track with Crimson Gradient Fill */}
      <div className="flex-1 relative h-[18px] rounded-full bg-secondary overflow-hidden border border-border/40">
        <div
          className="h-full rounded-full flex items-center justify-end pr-2.5 transition-all duration-500 shadow-[0_0_12px_rgba(255,42,54,0.4)]"
          style={{
            width: `${progress}%`,
            background: "var(--gradient-btn)",
          }}
        >
          <span className="text-[10px] font-black text-primary-foreground tracking-tight">
            {progress}%
          </span>
        </div>
      </div>

      {/* Next Level Indicator */}
      <span className="text-xs font-semibold text-muted-foreground shrink-0">
        Next: <span className="text-foreground">{nextLevel}</span>
      </span>
    </div>
  );
}
