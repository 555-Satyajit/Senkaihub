"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Send, 
  ShieldAlert, 
  Users, 
  Hash, 
  Flame,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ImageUploaderDropzone } from "../components/ImageUploaderDropzone";
import { 
  ANIME_COMMUNITIES, 
  POST_CATEGORIES, 
  PostCategory, 
  CreatePostPayload 
} from "../model/create-post-types";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";

export function CreatePostContainer() {
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [animeTitle, setAnimeTitle] = useState<string>(ANIME_COMMUNITIES[0]);
  const [category, setCategory] = useState<PostCategory>("Fan Art");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [spoilerEpisode, setSpoilerEpisode] = useState("");
  const [clanExclusive, setClanExclusive] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["#AnimeArt", "#SoloLeveling"]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/^#*/, "");
      if (cleaned && !tags.includes(`#${cleaned}`)) {
        setTags([...tags, `#${cleaned}`]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;

    setIsSubmitting(true);
    const payload: CreatePostPayload = {
      caption,
      animeTitle,
      category,
      imageUrl,
      isSpoiler,
      spoilerEpisode: isSpoiler ? spoilerEpisode : undefined,
      clanExclusive,
      tags,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/feed");
      }, 900);
    }, 600);
  };

  return (
    <div className="w-full max-w-[840px] mx-auto py-2 sm:py-6 flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-foreground flex items-center gap-2.5">
            <span>Publish to Chronicle</span>
            <Flame className="w-6 h-6 text-primary fill-primary/20" />
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Share original fan art, cosplay, chapter theories, and earn Clan Victory Points.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border/60 shadow-sm">
          <SoulShardIcon filled className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground">+50 VP Reward</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* 1. Anime Series Selector & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="anime-select" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Anime Community / Series
            </Label>
            <Select value={animeTitle} onValueChange={(val) => val && setAnimeTitle(val)}>
              <SelectTrigger id="anime-select" className="w-full bg-card border-border/80 h-11 rounded-xl">
                <SelectValue placeholder="Select anime series" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/80">
                {ANIME_COMMUNITIES.map((anime) => (
                  <SelectItem key={anime} value={anime}>
                    {anime}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="category-select" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Post Classification
            </Label>
            <Select value={category} onValueChange={(val) => val && setCategory(val as PostCategory)}>
              <SelectTrigger id="category-select" className="w-full bg-card border-border/80 h-11 rounded-xl">
                <SelectValue placeholder="Select classification" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border/80">
                {POST_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 2. Media Dropzone */}
        <ImageUploaderDropzone imageUrl={imageUrl} onChange={setImageUrl} />

        {/* 3. Caption / Description Textarea */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="caption" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Caption & Strategy Note
          </Label>
          <Textarea
            id="caption"
            placeholder="Share your inspiration, technique details, or anime episode context..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={4}
            className="w-full rounded-2xl bg-card border-border/80 p-4 text-sm text-foreground placeholder:text-muted-foreground/60 resize-none focus-visible:border-primary"
          />
        </div>

        {/* 4. Hashtags Generator */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="hashtags" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Hashtags
          </Label>
          <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-card border border-border/80 min-h-[48px]">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs font-semibold px-2.5 py-1 rounded-lg gap-1 border border-border/60 hover:bg-destructive/20 hover:text-destructive hover:border-destructive/40 transition-colors cursor-pointer"
                onClick={() => handleRemoveTag(tag)}
              >
                <span>{tag}</span>
                <span className="text-[10px] font-bold">×</span>
              </Badge>
            ))}
            <div className="flex items-center gap-1 flex-1 min-w-[120px]">
              <Hash className="w-3.5 h-3.5 text-muted-foreground ml-1" />
              <Input
                id="hashtags"
                type="text"
                placeholder="Add tags (press Enter)..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="border-0 bg-transparent h-7 p-0 text-xs focus-visible:ring-0 shadow-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Clan & Spoiler Protective Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border/70 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 border border-border/60">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <Label htmlFor="spoiler-toggle" className="text-xs font-bold text-foreground cursor-pointer block">
                  Episode Spoiler Tag
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Blur content until tapped by user
                </p>
              </div>
            </div>
            <Switch
              id="spoiler-toggle"
              checked={isSpoiler}
              onCheckedChange={setIsSpoiler}
            />
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border/70 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-accent shrink-0 border border-border/60">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <Label htmlFor="clan-toggle" className="text-xs font-bold text-foreground cursor-pointer block">
                  Clan War Vault Exclusive
                </Label>
                <p className="text-[11px] text-muted-foreground">
                  Visible only to Shadow Monarch members
                </p>
              </div>
            </div>
            <Switch
              id="clan-toggle"
              checked={clanExclusive}
              onCheckedChange={setClanExclusive}
            />
          </div>
        </div>

        {/* 6. Action Submission */}
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
            type="submit"
            disabled={isSubmitting || !caption.trim()}
            className="h-11 px-6 rounded-xl font-heading font-bold text-sm text-primary-foreground shadow-lg shadow-primary/25 gap-2 border-0 hover:brightness-110 cursor-pointer disabled:opacity-50"
            style={{ background: "var(--gradient-btn)" }}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 animate-bounce" />
                <span>Published to Feed!</span>
              </>
            ) : isSubmitting ? (
              <span>Publishing...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Publish Post</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
