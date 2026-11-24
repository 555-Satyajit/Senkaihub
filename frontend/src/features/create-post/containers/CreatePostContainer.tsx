"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  UploadCloud, 
  Send, 
  ShieldAlert, 
  Users, 
  Flame, 
  ImageIcon, 
  Eye, 
  MessageCircle, 
  Bookmark, 
  X,
  Swords,
  Tag
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
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
  const [classification, setClassification] = useState<PostClassification>("Fan Art & Illustrations");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80"
  );
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [clanOnly, setClanOnly] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically parse all hashtags from the text area in real-time
  const { cleanCaption, extractedTags } = useMemo(() => {
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const matches = rawText.match(hashtagRegex) || [];
    const uniqueTags = Array.from(new Set(matches));
    
    // Strip hashtags from the main text body for clean preview display
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
    <div className="w-full max-w-[1360px] mx-auto py-2 sm:py-4">
      {/* 2-Column Responsive Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
        
        {/* ================= LEFT COLUMN: Publishing Destination & Inputs (7 cols) ================= */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="bg-card rounded-[24px] border border-border/60 shadow-xl p-5 sm:p-7 flex flex-col gap-5">
            <div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-foreground flex items-center gap-2">
                <span>Create Submission</span>
                <Flame className="w-5 h-5 text-primary" />
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Choose which Clan banner or Public feed you are contributing to.
              </p>
            </div>

            {/* Posting Destination: Clan vs Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="clan-select" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-primary" />
                  <span>Posting To (Clan / Feed)</span>
                </Label>
                <Select value={selectedClan} onValueChange={(val) => val && setSelectedClan(val)}>
                  <SelectTrigger id="clan-select" className="w-full bg-secondary/50 border-border/70 h-11 rounded-xl cursor-pointer">
                    <SelectValue placeholder="Select Clan destination" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/80 max-h-64">
                    {CLAN_DESTINATIONS.map((clan) => (
                      <SelectItem key={clan} value={clan} className="cursor-pointer">
                        {clan}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="classification-select" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-accent" />
                  <span>Post Classification</span>
                </Label>
                <Select value={classification} onValueChange={(val) => val && setClassification(val as PostClassification)}>
                  <SelectTrigger id="classification-select" className="w-full bg-secondary/50 border-border/70 h-11 rounded-xl cursor-pointer">
                    <SelectValue placeholder="Select classification" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/80">
                    {POST_CLASSIFICATIONS.map((cat) => (
                      <SelectItem key={cat} value={cat} className="cursor-pointer">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Media Upload Area */}
            <div className="flex flex-col gap-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Media & Artwork
              </Label>
              {imageUrl ? (
                <div className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-border/80 bg-black/40 group shadow-md">
                  <Image
                    src={imageUrl}
                    alt="Uploaded preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-semibold gap-1.5 rounded-xl cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4" /> Change Image
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => setImageUrl("")}
                      className="text-xs font-semibold gap-1.5 rounded-xl cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-[200px] rounded-2xl border-2 border-dashed border-border/80 hover:border-border bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 select-none"
                >
                  <div className="w-12 h-12 rounded-xl bg-card border border-border/70 flex items-center justify-center text-muted-foreground shadow-sm">
                    <UploadCloud className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <p className="font-heading font-semibold text-xs text-foreground">
                    Click to select artwork from device
                  </p>
                  <span className="text-[10px] text-muted-foreground">
                    PNG, JPG, WebP, GIF (High-res supported)
                  </span>
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

            {/* Caption Textarea with Natural Hashtag Typing */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="caption-input" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Post Caption & Tags
                </Label>
                <span className="text-[11px] text-muted-foreground">
                  Type <span className="text-primary font-bold">#tag</span> anywhere in text
                </span>
              </div>
              <textarea
                id="caption-input"
                rows={4}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Write your anime thoughts, raid notes, and tag #Series #Art..."
                className="w-full rounded-2xl bg-secondary/40 border border-border/60 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus:outline-none focus:border-border/90 transition-all leading-relaxed"
              />
            </div>

            {/* Red Hashtag Badges extracted in real time */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-muted-foreground">Detected Tags:</span>
                {extractedTags.length > 0 ? (
                  extractedTags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 rounded-md text-xs font-bold text-primary bg-primary/10 border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground/60 italic">
                    No hashtags yet (type #hashtag in caption or click below)
                  </span>
                )}
              </div>

              {/* Quick Tag Pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[11px] text-muted-foreground/80">Add quick:</span>
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddPopularTag(tag)}
                    className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-secondary/70 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/50 transition-colors cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Clean Minimal Protective Options */}
            <div className="flex items-center gap-6 py-2 border-t border-border/40">
              <label htmlFor="spoiler-toggle" className="flex items-center gap-2 cursor-pointer select-none">
                <Switch
                  id="spoiler-toggle"
                  checked={isSpoiler}
                  onCheckedChange={setIsSpoiler}
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-primary" />
                  Spoiler Warning
                </span>
              </label>

              <label htmlFor="clan-toggle" className="flex items-center gap-2 cursor-pointer select-none">
                <Switch
                  id="clan-toggle"
                  checked={clanOnly}
                  onCheckedChange={setClanOnly}
                />
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                  Clan Vault Only
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/40">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                className="rounded-xl text-xs font-semibold px-4 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || (!rawText.trim() && !imageUrl)}
                className="h-10 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm text-primary-foreground shadow-lg shadow-primary/25 gap-2 border-0 hover:brightness-110 cursor-pointer disabled:opacity-40"
                style={{ background: "var(--gradient-btn)" }}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Publishing..." : "Publish Post"}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: Live Feed Card Preview (5 cols) ================= */}
        <div className="lg:col-span-5 flex flex-col gap-3 sticky top-24">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Live Feed Preview</span>
            </span>
            <Badge variant="outline" className="text-[10px] text-accent border-accent/40 bg-accent/10 px-2 py-0.5">
              What users will see
            </Badge>
          </div>

          {/* Actual Feed Post Card Rendering */}
          <Card className="rounded-[22px] bg-card p-4 sm:p-5 shadow-2xl flex flex-col gap-3.5 border border-border/60 transition-all">
            {/* Author info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <Avatar className="w-10 h-10 rounded-[14px] overflow-hidden ring-1 ring-border/80">
                  <AvatarImage src={sampleUserProfile.avatar} alt={sampleUserProfile.name} />
                  <AvatarFallback className="rounded-[14px] bg-secondary text-foreground font-bold">
                    SK
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-heading font-bold text-sm text-foreground truncate">
                      {sampleUserProfile.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-primary bg-primary/10 border border-primary/20">
                      Shadow Monarchs
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground/80">{selectedClan}</span>
                    <span>•</span>
                    <span>Just now</span>
                  </div>
                </div>
              </div>

              <Badge variant="secondary" className="text-[10px] font-semibold border-border">
                {classification}
              </Badge>
            </div>

            {/* Artwork Preview with Spoiler Overlay check */}
            {imageUrl ? (
              <div className="relative aspect-video w-full rounded-[16px] overflow-hidden bg-black/40 border border-border/60 group">
                <Image
                  src={imageUrl}
                  alt="Live Preview"
                  fill
                  className={`object-cover transition-all ${isSpoiler ? "blur-xl scale-110" : ""}`}
                />
                {isSpoiler && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center gap-1 text-center p-4">
                    <ShieldAlert className="w-6 h-6 text-primary" />
                    <span className="text-xs font-bold text-foreground">Episode Spoiler Protected</span>
                    <span className="text-[10px] text-muted-foreground">Tap to view hidden content</span>
                  </div>
                )}
                {clanOnly && (
                  <div className="absolute top-2.5 left-2.5">
                    <Badge className="bg-background/80 backdrop-blur-md text-accent border border-accent/40 text-[10px] font-bold">
                      Clan Vault Only
                    </Badge>
                  </div>
                )}
              </div>
            ) : (
              <div className="aspect-video w-full rounded-[16px] bg-secondary/30 border border-dashed border-border/70 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-8 h-8 stroke-[1.5] opacity-50 mb-1" />
                <span className="text-xs">No media uploaded</span>
              </div>
            )}

            {/* Caption & Red Hashtags in Live Card */}
            <div className="flex flex-col gap-2">
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed break-words">
                {cleanCaption || "Your post description will appear here..."}
              </p>

              {extractedTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {extractedTags.map((tag) => (
                    <span key={tag} className="text-xs font-bold text-primary hover:underline cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between pt-2.5 border-t border-border/40 text-muted-foreground text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                  <SoulShardIcon className="w-4 h-4" />
                  <span className="font-semibold text-foreground">0</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                  <MessageCircle className="w-4 h-4" />
                  <span>0</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 hover:text-foreground transition-colors cursor-pointer" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
