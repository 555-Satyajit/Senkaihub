"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  MessageCircle, 
  Tv 
} from "lucide-react";
import { ClanBannerGuildIcon } from "@/components/icons/clan-banner-guild-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
  icon?: React.ElementType;
  label: string;
  href: string;
  isAvatar?: boolean;
}

const mobileNavItems: NavItem[] = [
  { icon: Home, label: "Feeds", href: "/feed" },
  { icon: ClanBannerGuildIcon, label: "Clans", href: "/clan-wars" },
  { icon: MessageCircle, label: "Chat", href: "/chat" },
  { icon: Tv, label: "Tracker", href: "/tracker" },
  { label: "Profile", href: "/profile", isAvatar: true },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav 
      aria-label="Mobile Navigation" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border/60 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-around h-[68px] max-w-lg mx-auto relative px-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/feed" && pathname === "/");

          if (isActive) {
            return (
              <div 
                key={item.label} 
                className="relative flex-1 flex flex-col items-center justify-center -top-3.5 group select-none"
              >
                {/* Left Outer Inverted Smooth Curve (Subtractive Hole Flange) */}
                <div 
                  className="absolute -left-3.5 top-3.5 w-3.5 h-3.5 overflow-hidden pointer-events-none" 
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-tr-xl bg-card shadow-[-4px_-4px_0_4px_var(--background)]" />
                </div>

                {/* Sunken Hole Cutout Well blending directly with page background */}
                <div 
                  className="w-14 h-14 rounded-full bg-background border-4 border-card flex items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
                >
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    aria-current="page"
                    className="w-11 h-11 rounded-full flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/40 transition-transform active:scale-95"
                    style={{ background: "var(--gradient-btn)" }}
                  >
                    {item.isAvatar ? (
                      <Avatar className="w-9 h-9 rounded-full ring-2 ring-primary-foreground/40">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Profile" />
                        <AvatarFallback className="text-[10px] bg-secondary text-foreground">KV</AvatarFallback>
                      </Avatar>
                    ) : (
                      Icon && (
                        <Icon 
                          aria-hidden="true" 
                          focusable="false" 
                          className="w-5 h-5 stroke-[2.6]" 
                        />
                      )
                    )}
                  </Link>
                </div>

                {/* Right Outer Inverted Smooth Curve (Subtractive Hole Flange) */}
                <div 
                  className="absolute -right-3.5 top-3.5 w-3.5 h-3.5 overflow-hidden pointer-events-none" 
                  aria-hidden="true"
                >
                  <div className="w-full h-full rounded-tl-xl bg-card shadow-[4px_-4px_0_4px_var(--background)]" />
                </div>

                {/* Active Text Label */}
                <span className="text-[10px] font-bold text-foreground mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-label={item.label}
              className="flex-1 flex flex-col items-center justify-center py-2 text-muted-foreground hover:text-foreground active:scale-95 transition-all select-none"
            >
              <div className="w-10 h-7 flex items-center justify-center">
                {item.isAvatar ? (
                  <Avatar className="w-6 h-6 rounded-full after:border-0">
                    <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="Profile" />
                    <AvatarFallback className="text-[9px] bg-secondary text-foreground">KV</AvatarFallback>
                  </Avatar>
                ) : (
                  Icon && (
                    <Icon 
                      aria-hidden="true" 
                      focusable="false" 
                      className="w-5 h-5 stroke-[1.9] transition-transform" 
                    />
                  )
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium text-muted-foreground">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
