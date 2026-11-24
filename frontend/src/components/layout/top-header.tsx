import Image from "next/image";
import Link from "next/link";
import { Search, Bell, MessageSquare, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopHeader() {
  return (
    <header className="h-[64px] md:h-[84px] bg-background/90 backdrop-blur-md px-4 sm:px-6 md:px-8 xl:px-10 flex items-center justify-between gap-3 md:gap-6 sticky top-0 z-30 border-b border-border/40 md:border-b-0 max-w-[1720px] w-full mx-auto">
      {/* Brand Logo - Distinct on mobile */}
      <Link href="/feed" className="flex items-center gap-2.5 shrink-0" aria-label="SenkaiHub Home">
        <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden ring-1 ring-primary/40 shadow-sm md:hidden">
          <Image
            src="/mainlogo.png"
            alt="SenkaiHub Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Link>

      {/* Desktop Search Bar matching Figma Rectangle 6339 (526px x 52px, scalable on 2k+) */}
      <div className="relative hidden md:block w-full max-w-[526px] xl:max-w-[580px] h-[52px]">
        <Search 
          aria-hidden="true" 
          focusable="false" 
          className="absolute left-5 top-1/2 -translate-y-1/2 !size-5 text-[#A6A9B6] pointer-events-none stroke-[2.2]" 
        />
        <Input
          type="search"
          aria-label="Search posts, clans, and anime topics"
          placeholder="Search"
          className="w-full h-full pl-14 pr-5 rounded-[18px] bg-card border border-border/80 text-foreground placeholder:text-[#A6A9B6] placeholder:font-medium text-[15px] shadow-sm hover:border-border focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
        />
      </div>

      {/* Mobile-Only Actions: Search + Plus Create Post + Notification */}
      <div className="flex md:hidden items-center gap-2 ml-auto">
        {/* Search Icon Button */}
        <Button
          variant="ghost"
          aria-label="Search anime and clans"
          className="w-9 h-9 rounded-xl bg-card hover:bg-secondary border border-border/80 text-[#A6A9B6] hover:text-foreground shadow-sm transition-all flex items-center justify-center p-0"
        >
          <Search aria-hidden="true" focusable="false" className="w-4 h-4 stroke-[2.2]" />
        </Button>

        {/* Plus Icon for Creating Post */}
        <Button
          size="icon"
          aria-label="Create Post"
          className="w-9 h-9 rounded-xl text-primary-foreground shadow-md border-0 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center"
          style={{ background: "var(--gradient-btn)" }}
        >
          <Plus aria-hidden="true" focusable="false" className="w-5 h-5 stroke-[2.6]" />
        </Button>

        {/* Notifications Button */}
        <div className="relative w-9 h-9">
          <Button
            variant="ghost"
            aria-label="Notifications"
            className="w-9 h-9 rounded-xl bg-card hover:bg-secondary border border-border/80 text-[#A6A9B6] hover:text-foreground shadow-sm transition-all flex items-center justify-center p-0"
          >
            <Bell aria-hidden="true" focusable="false" className="w-4 h-4 stroke-[2]" />
          </Button>
          <span 
            aria-hidden="true"
            className="absolute top-1 right-1 w-2 h-2 bg-[#E46C5B] rounded-full ring-2 ring-card shadow-sm pointer-events-none" 
          />
        </div>
      </div>

      {/* Desktop Right Utility Buttons */}
      <div className="hidden md:flex items-center gap-3.5 shrink-0">
        {/* Notifications Button */}
        <div className="relative w-[50px] h-[50px]">
          <Button
            variant="ghost"
            aria-label="Notifications"
            className="w-[50px] h-[50px] rounded-[18px] bg-card hover:bg-secondary border border-border/80 text-[#A6A9B6] hover:text-foreground shadow-sm transition-all flex items-center justify-center p-0"
          >
            <Bell aria-hidden="true" focusable="false" className="!size-6 stroke-[2]" />
          </Button>
          <span 
            aria-hidden="true"
            className="absolute top-1 right-1 w-[9px] h-[9px] bg-[#E46C5B] rounded-full ring-2 ring-card shadow-sm pointer-events-none" 
          />
        </div>

        {/* Messages Button */}
        <div className="relative w-[50px] h-[50px]">
          <Button
            variant="ghost"
            aria-label="Messages"
            className="w-[50px] h-[50px] rounded-[18px] bg-card hover:bg-secondary border border-border/80 text-[#A6A9B6] hover:text-foreground shadow-sm transition-all flex items-center justify-center p-0"
          >
            <MessageSquare aria-hidden="true" focusable="false" className="!size-6 stroke-[2]" />
          </Button>
        </div>

        {/* User Profile Avatar Link */}
        <div className="relative w-[50px] h-[50px]">
          <Link
            href="/profile"
            aria-label="View Profile"
            className="block w-[50px] h-[50px] rounded-[18px] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Avatar className="w-[50px] h-[50px] rounded-[18px] after:border-0 overflow-hidden shadow-sm hover:ring-2 hover:ring-primary/60 transition-all">
              <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80" alt="Kevin" className="object-cover rounded-[18px]" />
              <AvatarFallback className="rounded-[18px] bg-secondary text-foreground font-semibold">
                KV
              </AvatarFallback>
            </Avatar>
            <span className="absolute top-1 right-1 w-[9px] h-[9px] bg-[#65EFAD] rounded-full ring-2 ring-card shadow-sm pointer-events-none" />
          </Link>
        </div>
      </div>
    </header>
  );
}
