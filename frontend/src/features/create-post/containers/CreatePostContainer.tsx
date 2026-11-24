"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  UploadCloud, 
  ShieldAlert, 
  Users, 
  X, 
  ArrowLeft,
  ChevronDown,
  Sparkles,
  Swords,
  Smile,
  Check
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CLAN_DESTINATIONS, 
  POST_CLASSIFICATIONS, 
  PostClassification,
  POPULAR_TAGS
} from "../model/create-post-types";
import { sampleUserProfile } from "@/features/profile/model/profile-types";

export function CreatePostContainer() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rawText, setRawText] = useState(
    "Solo Leveling Season 2 shadow army composition study. Exploring the contrast between purple soul shadows and fiery crimson battle auras.\n#SoloLeveling #ShadowMonarch #FanArt"
  );
  const [selectedClan, setSelectedClan] = useState<string>(CLAN_DESTINATIONS[0]);
  const [openClanCombobox, setOpenClanCombobox] = useState(false);
  const [classification, setClassification] = useState<PostClassification>("Fan Art & Illustrations");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80"
  );
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [clanOnly, setClanOnly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse hashtags in real-time
  const { cleanCaption, extractedTags } = useMemo(() => {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const matches = rawText.match(hashtagRegex) || [];
    const uniqueTags = Array.from(new Set(matches));
    const textWithoutTags = rawText.replace(hashtagRegex, "").trim();

    return {
      cleanCaption: textWithoutTags || rawText,
      extractedTags: uniqueTags,
    };
  }, [rawText]);

  const handleAddPopularTag = (tag: string) => {
    if (!rawText.includes(tag)) {
      setRawText((prev) => (prev ? `${prev.trim()} ${tag}` : tag));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (typeof ev.target?.result === "string") {
          setImageUrl(ev.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawText.trim() && !imageUrl) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/feed");
    }, 450);
  };

  return (
    <div className="w-full h-full flex flex-col bg-card">
      {/* 1. Full-Bleed Top Navigation Bar */}
      <header className="h-[64px] md:h-[72px] px-4 sm:px-6 md:px-8 border-b border-border/50 flex items-center justify-between bg-card shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-xl bg-secondary/80 hover:bg-secondary text-foreground border border-border/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cancel and return to feed"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-heading font-black text-base sm:text-lg text-foreground">
            Create new post
          </span>
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || (!rawText.trim() && !imageUrl)}
          className="h-10 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm text-primary-foreground shadow-md hover:brightness-110 border-0 cursor-pointer disabled:opacity-40"
          style={{ background: "var(--gradient-btn)" }}
        >
          {isSubmitting ? "Sharing..." : "Share"}
        </Button>
      </header>

      {/* 2. Full-Page Split Screen Body: Left Media Canvas, Right Details Panel */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-y-auto md:overflow-hidden">
        
        {/* ================= LEFT FULL-HEIGHT MEDIA VIEWPORT (7 cols) ================= */}
        <div className="md:col-span-7 bg-black/60 relative flex items-center justify-center border-b md:border-b-0 md:border-r border-border/50 min-h-[320px] md:h-full overflow-hidden">
          {imageUrl ? (
            <div className="relative w-full h-full min-h-[320px] group flex items-center justify-center">
              <Image
                src={imageUrl}
                alt="Post preview"
                fill
                className={`object-contain transition-all ${isSpoiler ? "blur-xl scale-105" : ""}`}
              />
              
              {/* Spoiler indicator overlay if enabled */}
              {isSpoiler && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 text-center p-4 z-10 pointer-events-none">
                  <ShieldAlert className="w-8 h-8 text-primary" />
                  <span className="text-xs font-bold text-foreground">Spoiler Warning Active</span>
                  <span className="text-[10px] text-muted-foreground">Image will appear blurred to community</span>
                </div>
              )}

              {/* Change / Remove media floating pill */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-20">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-full bg-black/80 hover:bg-black text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="w-9 h-9 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-3 p-8 text-center cursor-pointer select-none group w-full h-full"
            >
              <div className="w-18 h-18 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-105 transition-all shadow-md">
                <UploadCloud className="w-9 h-9 stroke-[1.8]" />
              </div>
              <p className="font-heading font-semibold text-base text-foreground">
                Select anime artwork or photos
              </p>
              <span className="text-xs text-muted-foreground max-w-xs">
                Drag photos and videos here from your device
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl mt-2 text-xs font-semibold pointer-events-none"
              >
                Select from device
              </Button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* ================= RIGHT FULL-HEIGHT DETAILS PANEL (5 cols) ================= */}
        <div className="md:col-span-5 flex flex-col justify-between bg-card p-6 md:p-8 gap-5 overflow-y-auto">
          <div className="flex flex-col gap-5">
            
            {/* User Identity Header */}
            <div className="flex items-center gap-3.5">
              <Avatar className="w-10 h-10 rounded-full ring-2 ring-border/80">
                <AvatarImage src={sampleUserProfile.avatar} alt={sampleUserProfile.name} />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-heading font-bold text-sm text-foreground truncate">
                  {sampleUserProfile.name}
                </span>
                <span className="text-xs text-primary font-semibold">
                  Shadow Monarchs Faction
                </span>
              </div>
            </div>

            {/* Destination & Category Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Searchable Shadcn Command Popover for Clan Selection */}
              <Popover open={openClanCombobox} onOpenChange={setOpenClanCombobox}>
                <PopoverTrigger
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground border border-border/70 transition-colors cursor-pointer"
                >
                  <Swords className="w-3.5 h-3.5 text-primary" />
                  <span className="truncate max-w-[140px]">{selectedClan}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[260px] p-0 bg-card border-border/70 shadow-2xl rounded-xl overflow-hidden">
                  <Command className="bg-transparent">
                    <CommandInput placeholder="Search Clan..." className="h-9 text-xs" />
                    <CommandList className="max-h-56 no-scrollbar p-1">
                      <CommandEmpty className="text-xs text-muted-foreground py-4 text-center">
                        No Clan found.
                      </CommandEmpty>
                      <CommandGroup>
                        {CLAN_DESTINATIONS.map((clan) => (
                          <CommandItem
                            key={clan}
                            value={clan}
                            onSelect={() => {
                              setSelectedClan(clan);
                              setOpenClanCombobox(false);
                            }}
                            className="text-xs font-medium cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-secondary text-foreground flex items-center justify-between"
                          >
                            <span>{clan}</span>
                            {selectedClan === clan && (
                              <Check className="w-3.5 h-3.5 text-primary ml-auto" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Classification dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground border border-border/70 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>{classification}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-card border-border/70 shadow-xl rounded-xl">
                  {POST_CLASSIFICATIONS.map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setClassification(cat)}
                      className="text-xs font-medium cursor-pointer"
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Caption Textarea with scrollbar styling */}
            <div className="flex flex-col gap-1 relative">
              <textarea
                rows={6}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Write a caption and type #hashtags..."
                className="w-full bg-secondary/30 rounded-2xl p-4 border border-border/60 resize-none text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-border leading-relaxed scrollbar-thin"
              />
              <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 px-1 pt-1">
                <button
                  type="button"
                  onClick={() => setRawText((prev) => prev + " 🔥")}
                  className="hover:text-accent transition-colors cursor-pointer"
                >
                  <Smile className="w-4 h-4" />
                </button>
                <span>{rawText.length}/500</span>
              </div>
            </div>

            {/* Extracted Hashtag Badges Preview */}
            <div className="flex flex-col gap-2 pt-3 border-t border-border/40">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-muted-foreground">Hashtags:</span>
                {extractedTags.length > 0 ? (
                  extractedTags.map((tag) => (
                    <span key={tag} className="text-xs font-bold text-primary hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-muted-foreground/60 italic">
                    Type #tag in caption or tap below
                  </span>
                )}
              </div>

              {/* Quick Add Pills */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {POPULAR_TAGS.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddPopularTag(tag)}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50 transition-colors cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Options: Spoiler Guard & Clan Vault Toggle */}
          <div className="flex flex-col gap-3.5 pt-4 border-t border-border/40 text-xs">
            <label htmlFor="spoiler-toggle" className="flex items-center justify-between cursor-pointer select-none">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">Spoiler Warning</span>
              </div>
              <Switch
                id="spoiler-toggle"
                checked={isSpoiler}
                onCheckedChange={setIsSpoiler}
              />
            </label>

            <label htmlFor="clan-toggle" className="flex items-center justify-between cursor-pointer select-none">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-foreground">Clan Vault Only</span>
              </div>
              <Switch
                id="clan-toggle"
                checked={clanOnly}
                onCheckedChange={setClanOnly}
              />
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}
