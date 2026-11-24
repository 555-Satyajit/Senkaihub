"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Home, 
  MessageCircle, 
  Tv, 
  Plus, 
  Settings, 
  LogOut 
} from "lucide-react";
import { ClanBannerGuildIcon } from "@/components/icons/clan-banner-guild-icon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

// 4 clean main feed sections (Profile is already in top header and right sidebar)
const topNavItems: NavItem[] = [
  { icon: Home, label: "Feeds", href: "/feed" },
  { icon: ClanBannerGuildIcon, label: "Clans", href: "/clan-wars" },
];

const bottomNavItems: NavItem[] = [
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Tv, label: "Tracker", href: "/tracker" },
];

export function SidebarNav() {
  const pathname = usePathname();

  const renderNavItem = (item: NavItem) => {
    const Icon = item.icon;
    const isActive = pathname === item.href || (item.href === "/feed" && pathname === "/");

    if (isActive) {
      return (
        <div key={item.label} className="relative w-full my-2">
          {/* Top smooth inverted fillet into background canvas */}
          <div className="absolute right-0 -top-6 w-6 h-6 overflow-hidden pointer-events-none z-20" aria-hidden="true">
            <div className="w-full h-full rounded-br-[20px] bg-card shadow-[0_12px_0_0_var(--background)]" />
          </div>

          {/* Subtracted Cutout Tab extending flush to the canvas edge */}
          <div className="w-full h-20 bg-background rounded-l-[32px] flex items-center justify-center pl-2 relative z-10">
            <Link
              href={item.href}
              aria-current="page"
              aria-label={item.label}
              className="w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/35 transition-transform hover:scale-105 active:scale-95"
              style={{ background: "var(--gradient-btn)" }}
            >
              {item.label === "Clans" ? (
                <Icon active className="w-7 h-7" />
              ) : (
                <Icon aria-hidden="true" focusable="false" className="w-7 h-7 stroke-[2.2]" />
              )}
            </Link>
          </div>

          {/* Bottom smooth inverted fillet into background canvas */}
          <div className="absolute right-0 -bottom-6 w-6 h-6 overflow-hidden pointer-events-none z-20" aria-hidden="true">
            <div className="w-full h-full rounded-tr-[20px] bg-card shadow-[0_-12px_0_0_var(--background)]" />
          </div>
        </div>
      );
    }

    return (
      <Tooltip key={item.label}>
        <TooltipTrigger
          render={
            <Link
              href={item.href}
              aria-label={item.label}
              className="w-14 h-14 my-2 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-secondary/40 flex items-center justify-center transition-all duration-200 group"
            />
          }
        >
          {item.label === "Clans" ? (
            <Icon 
              className="w-7 h-7 transition-transform group-hover:scale-110" 
            />
          ) : (
            <Icon aria-hidden="true" focusable="false" className="w-7 h-7 stroke-[1.8] transition-transform group-hover:scale-110" />
          )}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="font-medium text-xs">{item.label}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <aside className="hidden md:flex w-[126px] shrink-0 bg-card rounded-r-[37px] flex-col items-center py-7 justify-between h-screen sticky top-0 z-40 select-none">
      <div className="flex flex-col items-center w-full">
        {/* Brand / Custom Logo */}
        <Link 
          href="/feed" 
          aria-label="SenkaiHub Home"
          className="flex flex-col items-center justify-center mb-6 group"
        >
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-2 ring-primary/40 group-hover:ring-primary group-hover:scale-105 transition-all shadow-lg shadow-primary/20">
            <Image
              src="/mainlogo.png"
              alt="SenkaiHub Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>

        {/* Navigation list: Top items (Feeds, Clans) */}
        <nav aria-label="Main Navigation" className="flex flex-col items-center w-full">
          {topNavItems.map(renderNavItem)}

          {/* Create Post Button in the MIDDLE - Neutral unselected state matching other nav buttons */}
          <div className="my-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    aria-label="Create Post"
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200 group active:scale-95 cursor-pointer"
                  />
                }
              >
                <Plus aria-hidden="true" focusable="false" className="w-7 h-7 stroke-[1.9] transition-transform group-hover:scale-110" />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold text-xs">Create Post</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Navigation list: Bottom items (Chat, Tracker) */}
          {bottomNavItems.map(renderNavItem)}
        </nav>
      </div>

      {/* Footer Nav / Utilities (Settings, Logout) */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Link
                href="/settings"
                aria-label="Settings"
                className="w-11 h-11 rounded-2xl text-muted-foreground hover:bg-secondary/40 hover:text-foreground flex items-center justify-center transition-colors"
              />
            }
          >
            <Settings aria-hidden="true" focusable="false" className="w-5 h-5 stroke-[1.8]" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-medium text-xs">Settings</p>
          </TooltipContent>
        </Tooltip>

        <div className="w-8 h-[1px] bg-muted-foreground/20 my-1" aria-hidden="true" />

        <Tooltip>
          <TooltipTrigger
            aria-label="Logout"
            className="w-11 h-11 rounded-2xl text-muted-foreground hover:bg-destructive/15 hover:text-destructive flex items-center justify-center transition-colors cursor-pointer"
          >
            <LogOut aria-hidden="true" focusable="false" className="w-5 h-5 stroke-[1.8]" />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p className="font-medium text-xs text-destructive">Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
