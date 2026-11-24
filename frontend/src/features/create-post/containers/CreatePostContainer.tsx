"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  UploadCloud, 
  ShieldAlert, 
  Users, 
  X, 
  ChevronDown,
  Smile,
  Check,
  Flame,
  Send
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
  CLAN_DESTINATIONS, 
  POST_CLASSIFICATIONS, 
  PostClassification,
  POPULAR_TAGS
} from "../model/create-post-types";
import { sampleUserProfile } from "@/features/profile/model/profile-types";

export function CreatePostContainer() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [rawText, setRawText] = useState(
    "Solo Leveling Season 2 shadow army composition study. Exploring the contrast between purple soul shadows and fiery crimson battle auras.\n#SoloLeveling #ShadowMonarch #FanArt"
  );
  const [selectedClan, setSelectedClan] = useState<string>(CLAN_DESTINATIONS[0]);
  const [openClanCombobox, setOpenClanCombobox] = useState(false);
  const [classification, setClassification] = useState<PostClassification>("Fan Art & Illustrations");
  const [openCategoryCombobox, setOpenCategoryCombobox] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80"
  );
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [clanOnly, setClanOnly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-expand textarea naturally without internal scrollbars
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(100, textareaRef.current.scrollHeight)}px`;
    }
  }, [rawText]);

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
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      {/* Top Header Row */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border/40 gap-3">
        <div>
          <h1 className="font-heading font-black text-lg sm:text-2xl text-foreground flex items-center gap-2">
            <span>Publish Post</span>
            <Flame className="w-5 h-5 text-primary" />
          </h1>
          <p className="text-xs text-muted-foreground hidden sm:block mt-0.5">
            Share original artwork, chapter theories, or raid strategies to your Clan.
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            className="rounded-xl text-xs font-semibold px-3 sm:px-4 cursor-pointer text-muted-foreground hover:text-foreground h-9"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || (!rawText.trim() && !imageUrl)}
            className="h-9 sm:h-10 px-4 sm:px-6 rounded-xl font-heading font-bold text-xs sm:text-sm text-primary-foreground shadow-md hover:brightness-110 border-0 cursor-pointer disabled:opacity-40"
            style={{ background: "var(--gradient-btn)" }}
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            <span>{isSubmitting ? "Publishing..." : "Publish"}</span>
          </Button>
        </div>
      </div>

      {/* Main Studio Area - Seamless borderless canvas on mobile, elevated card on desktop */}
      <div className="w-full rounded-2xl sm:rounded-[24px] bg-card border border-border/60 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* ================= MEDIA CANVAS: Seamless with zero inner padding border on mobile ================= */}
        <div className="lg:col-span-7 bg-background relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-border/60 min-h-[280px] sm:min-h-[380px] lg:min-h-[540px]">
          {imageUrl ? (
            <div className="relative w-full h-full min-h-[280px] sm:min-h-[380px] lg:min-h-[520px] group flex items-center justify-center">
              <Image
                src={imageUrl}
                alt="Post preview"
                fill
                priority
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
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-20">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-card/90 hover:bg-card text-foreground text-xs font-semibold backdrop-blur-md border border-border/80 transition-all cursor-pointer shadow-xl"
                >
                  Change Photo
                </button>
                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-card/90 hover:bg-card text-foreground flex items-center justify-center backdrop-blur-md border border-border/80 transition-all cursor-pointer shadow-xl"
                  aria-label="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2.5 p-6 sm:p-8 text-center cursor-pointer select-none group w-full h-full"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-105 transition-all shadow-md">
                <UploadCloud className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.8]" />
              </div>
              <p className="font-heading font-semibold text-xs sm:text-sm text-foreground">
                Select anime artwork or photos
              </p>
              <span className="text-[11px] sm:text-xs text-muted-foreground max-w-xs">
                Drag photos and videos here from your device
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl mt-1 text-xs font-semibold pointer-events-none border-border"
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

        {/* ================= DETAILS & CONFIGURATION: Natural auto-expanding layout ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-6 lg:p-7 gap-4 sm:gap-5">
          <div className="flex flex-col gap-4">
            
            {/* User Identity Header */}
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring-2 ring-border/80">
                <AvatarImage src={sampleUserProfile.avatar} alt={sampleUserProfile.name} />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">
                  {sampleUserProfile.name}
                </span>
                <span className="text-[11px] sm:text-xs text-primary font-semibold">
                  Shadow Monarchs Faction
                </span>
              </div>
            </div>

            {/* Clan Destination & Post Category Selectors (Single Clean Row) */}
            <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              {/* 1. Searchable Shadcn Command Popover for Clan Destination */}
              <Popover open={openClanCombobox} onOpenChange={setOpenClanCombobox}>
                <PopoverTrigger
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground border border-border/70 transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[125px] sm:max-w-[140px]">{selectedClan}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[240px] p-0 bg-card border-border/70 shadow-2xl rounded-xl overflow-hidden">
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

              {/* 2. Searchable Shadcn Command Popover for Post Category */}
              <Popover open={openCategoryCombobox} onOpenChange={setOpenCategoryCombobox}>
                <PopoverTrigger
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-xs font-semibold text-foreground border border-border/70 transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[125px] sm:max-w-[140px]">{classification}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[240px] p-0 bg-card border-border/70 shadow-2xl rounded-xl overflow-hidden">
                  <Command className="bg-transparent">
                    <CommandInput placeholder="Search Category..." className="h-9 text-xs" />
                    <CommandList className="max-h-56 no-scrollbar p-1">
                      <CommandEmpty className="text-xs text-muted-foreground py-4 text-center">
                        No category found.
                      </CommandEmpty>
                      <CommandGroup>
                        {POST_CLASSIFICATIONS.map((cat) => (
                          <CommandItem
                            key={cat}
                            value={cat}
                            onSelect={() => {
                              setClassification(cat);
                              setOpenCategoryCombobox(false);
                            }}
                            className="text-xs font-medium cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-secondary text-foreground flex items-center justify-between"
                          >
                            <span>{cat}</span>
                            {classification === cat && (
                              <Check className="w-3.5 h-3.5 text-primary ml-auto" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Natural Borderless Auto-Expanding Caption Area (NO confined scrollbox) */}
            <div className="flex flex-col relative pt-1">
              <textarea
                ref={textareaRef}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Write a caption and type #hashtags..."
                className="w-full bg-transparent border-0 p-0 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 leading-relaxed resize-none overflow-hidden"
              />
              <div className="flex items-center justify-between text-[11px] text-muted-foreground/60 pt-2 border-t border-border/30 mt-2">
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
            <div className="flex flex-col gap-2 pt-1 border-t border-border/40">
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

          {/* Bottom Options: Minimal Toggles */}
          <div className="flex flex-col gap-3 pt-3 border-t border-border/40 text-xs">
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
