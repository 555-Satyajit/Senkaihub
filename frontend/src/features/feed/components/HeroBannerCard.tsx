import { Image as ImageIcon, Smile, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function HeroBannerCard() {
  return (
    <div 
      className="relative overflow-hidden rounded-[26px] p-7 shadow-2xl text-primary-foreground border border-primary/20"
      style={{ background: "var(--gradient-primary)" }}
    >
      <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Badge className="bg-white/20 text-white font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 border-0">
            Clan War Week 4
          </Badge>
          <span className="text-white/80 text-xs font-medium">
            Shadow Monarchs vs. Straw Hat Pirates
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-heading font-black text-primary-foreground tracking-tight leading-tight">
          Share your anime fan art, cosplay, or theories!
        </h1>

        <p className="text-primary-foreground/85 text-xs md:text-sm font-light max-w-2xl leading-relaxed">
          Post your latest creations, tag your clan to earn seasonal Victory Points (VP), and tag spoiler-sensitive discussions with safe watch thresholds.
        </p>

        <div className="mt-3 bg-background/40 backdrop-blur-md rounded-2xl p-2.5 flex items-center gap-2 border border-white/10 shadow-inner">
          <Input
            placeholder="What anime are you watching? Post art, cosplay or clip..."
            className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-xs md:text-sm shadow-none"
          />
          <div className="flex items-center gap-2 shrink-0 pr-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 text-primary-foreground border-0"
              title="Add Media / Fan Art"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 text-primary-foreground border-0"
              title="Add Spoiler Tag"
            >
              <ShieldAlert className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 text-primary-foreground border-0"
            >
              <Smile className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              className="rounded-lg text-primary-foreground font-semibold px-5 h-8 text-xs shadow-md border-0 hover:brightness-110"
              style={{ background: "var(--gradient-btn)" }}
            >
              Share Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
