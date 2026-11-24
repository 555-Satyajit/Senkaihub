"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  X, 
  ChevronDown, 
  Check, 
  ImageIcon, 
  ShieldAlert 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  const [rawText, setRawText] = useState("");
  const [selectedClan, setSelectedClan] = useState<string>(CLAN_DESTINATIONS[0]);
  const [openClanCombobox, setOpenClanCombobox] = useState(false);
  const [classification, setClassification] = useState<PostClassification>("Fan Art & Illustrations");
  const [openCategoryCombobox, setOpenCategoryCombobox] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawText(e.target.value);
  };

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

  const canPost = Boolean(rawText.trim() || imageUrl);

  return (
    <div className="w-full max-w-[620px] mx-auto min-h-[580px] bg-card sm:rounded-[28px] border border-border/70 shadow-2xl flex flex-col justify-between overflow-hidden">
      
      {/* 1. Clean Native Modal Header */}
      <div className="h-14 px-4 sm:px-6 border-b border-border/50 flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-heading font-bold text-base text-foreground">
          Create Post
        </h2>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!canPost || isSubmitting}
          className={`h-8 px-5 rounded-full font-heading font-bold text-xs shadow-sm transition-all border-0 cursor-pointer ${
            canPost
              ? "text-primary-foreground hover:brightness-110 active:scale-95"
              : "bg-secondary text-muted-foreground/50 opacity-60 cursor-not-allowed"
          }`}
          style={canPost ? { background: "var(--gradient-btn)" } : undefined}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </Button>
      </div>

      {/* 2. Scrollable Body: Author + Category Pills + Pure Text Canvas */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col gap-3 overflow-y-auto">
        
        {/* Author Header & Destination Dropdowns */}
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10 rounded-full ring-2 ring-border/80 shrink-0 mt-0.5">
            <AvatarImage src={sampleUserProfile.avatar} alt={sampleUserProfile.name} />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0 flex-1 gap-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-heading font-bold text-sm text-foreground">
                {sampleUserProfile.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-xs font-semibold text-primary truncate">
                Shadow Monarchs
              </span>
            </div>

            {/* Pill Selectors Row - Single Line Flow */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Clan Destination Combobox */}
              <Popover open={openClanCombobox} onOpenChange={setOpenClanCombobox}>
                <PopoverTrigger
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/90 hover:bg-secondary text-xs font-medium text-foreground border border-border/80 transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[140px]">{selectedClan}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[230px] p-0 bg-card border-border/70 shadow-2xl rounded-xl overflow-hidden">
                  <Command className="bg-transparent">
                    <CommandInput placeholder="Search Clan..." className="h-8 text-xs" />
                    <CommandList className="max-h-52 no-scrollbar p-1">
                      <CommandEmpty className="text-xs text-muted-foreground py-3 text-center">
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

              {/* Classification Combobox */}
              <Popover open={openCategoryCombobox} onOpenChange={setOpenCategoryCombobox}>
                <PopoverTrigger
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/90 hover:bg-secondary text-xs font-medium text-foreground border border-border/80 transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[140px]">{classification}</span>
                  <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[230px] p-0 bg-card border-border/70 shadow-2xl rounded-xl overflow-hidden">
                  <Command className="bg-transparent">
                    <CommandInput placeholder="Search Category..." className="h-8 text-xs" />
                    <CommandList className="max-h-52 no-scrollbar p-1">
                      <CommandEmpty className="text-xs text-muted-foreground py-3 text-center">
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
          </div>
        </div>

        {/* Natural Full Canvas Textarea ("What do you want to talk about?") */}
        <textarea
          ref={textareaRef}
          value={rawText}
          onChange={handleTextChange}
          placeholder="What do you want to talk about?"
          className="w-full flex-1 min-h-[160px] sm:min-h-[220px] bg-transparent border-0 p-0 text-base sm:text-lg text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:ring-0 leading-relaxed resize-none mt-2 custom-scrollbar overflow-y-auto"
          autoFocus
        />

        {/* Media Preview Thumbnail (If Photo Added) */}
        {imageUrl && (
          <div className="relative w-full h-[220px] sm:h-[260px] rounded-2xl overflow-hidden border border-border/70 bg-black/40 group mt-2">
            <Image
              src={imageUrl}
              alt="Attached artwork"
              fill
              className={`object-cover transition-all ${isSpoiler ? "blur-md scale-105" : ""}`}
            />
            {isSpoiler && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-1 text-center p-3">
                <ShieldAlert className="w-6 h-6 text-primary" />
                <span className="text-xs font-bold text-foreground">Spoiler Warning Active</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setImageUrl("")}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer shadow-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick Tags Row */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2">
          {POPULAR_TAGS.slice(0, 5).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleAddPopularTag(tag)}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Bottom Action Tray ("Add to your post") */}
      <div className="border-t border-border/50 bg-secondary/20 p-3 sm:p-4 flex flex-col gap-2.5">
        <span className="text-xs font-bold text-muted-foreground px-1">
          Add to your post
        </span>

        {/* 2 Action Tiles: Photo & Spoiler */}
        <div className="grid grid-cols-2 gap-2">
          
          {/* Photo/Video Tile */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-between p-3 rounded-xl bg-card hover:bg-secondary/70 border border-border/60 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center border border-blue-500/20">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span className="font-heading font-semibold text-xs text-foreground">
                Photo/Artwork
              </span>
            </div>
            <span className="text-xs text-muted-foreground group-hover:text-foreground">+</span>
          </button>

          {/* Spoiler Warning Tile */}
          <button
            type="button"
            onClick={() => setIsSpoiler(!isSpoiler)}
            className={`flex items-center justify-between p-3 rounded-xl border transition-all text-left cursor-pointer ${
              isSpoiler
                ? "bg-primary/10 border-primary/40 text-primary"
                : "bg-card hover:bg-secondary/70 border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                isSpoiler ? "bg-primary/20 text-primary border-primary/30" : "bg-red-500/15 text-red-400 border-red-500/20"
              }`}>
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="font-heading font-semibold text-xs text-foreground">
                Spoiler Blur
              </span>
            </div>
            <span className="text-xs">{isSpoiler ? "✓" : "+"}</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
