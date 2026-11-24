"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileTopNavbarProps {
  name: string;
  handle: string;
}

export function ProfileTopNavbar({ name, handle }: ProfileTopNavbarProps) {
  const router = useRouter();

  return (
    <header className="h-[64px] md:h-[76px] bg-background/90 backdrop-blur-md px-4 sm:px-6 md:px-8 flex items-center justify-between sticky top-0 z-30 border-b border-border/40">
      {/* Left: Back button + Profile Name & Handle */}
      <div className="flex items-center gap-3.5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-10 h-10 rounded-xl bg-card hover:bg-secondary text-foreground border border-border/60 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div>
          <h1 className="font-heading font-bold text-base md:text-lg text-foreground leading-tight">
            {name}
          </h1>
          <span className="text-xs text-muted-foreground font-medium">
            {handle}
          </span>
        </div>
      </div>

      {/* Right: Share + More Actions */}
      <div className="flex items-center gap-2.5">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-border/70 bg-card hover:bg-secondary text-foreground text-xs font-semibold gap-1.5 h-9 px-3.5 shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="hidden sm:inline">Share Profile</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="More options"
          className="w-9 h-9 rounded-xl bg-card hover:bg-secondary text-muted-foreground border border-border/60"
        >
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
}
