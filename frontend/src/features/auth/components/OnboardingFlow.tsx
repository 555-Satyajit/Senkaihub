"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dices, Check, ArrowRight, User, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateCoolUsername, POPULAR_AVATARS } from "../lib/username-generator";

interface OnboardingFlowProps {
  initialEmail?: string;
  onComplete?: (profile: { username: string; avatarUrl: string }) => void;
}

export function OnboardingFlow({ initialEmail, onComplete }: OnboardingFlowProps) {
  const router = useRouter();
  const [username, setUsername] = useState("Shinobi_01");
  const [selectedAvatar, setSelectedAvatar] = useState(POPULAR_AVATARS[0]);
  const [avatarPoolOffset, setAvatarPoolOffset] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Generate randomized cool username on client mount to prevent SSR hydration mismatch
  React.useEffect(() => {
    setUsername(generateCoolUsername());
  }, []);

  // Generates 16 avatars dynamically from the 380 pool
  const visibleAvatars = React.useMemo(() => {
    const list: string[] = [];
    for (let i = 1; i <= 16; i++) {
      const idx = ((avatarPoolOffset + i - 1) % 380) + 1;
      list.push(`/avatars/${idx}.svg`);
    }
    return list;
  }, [avatarPoolOffset]);

  const handleShuffleUsername = () => {
    setUsername(generateCoolUsername());
    setValidationError(null);
  };

  const handleShuffleAvatars = () => {
    setAvatarPoolOffset((prev) => (prev + 16) % 380);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    if (!cleanUsername) {
      setValidationError("Please enter a username.");
      return;
    }
    if (cleanUsername.length < 3) {
      setValidationError("Username must be at least 3 characters.");
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setValidationError("Only letters, numbers, and underscores are allowed.");
      return;
    }

    try {
      setIsSubmitting(true);
      setValidationError(null);
      // Persist chosen profile or trigger hook
      if (onComplete) {
        onComplete({ username: cleanUsername, avatarUrl: selectedAvatar });
      } else {
        await new Promise((r) => setTimeout(r, 600));
        router.push("/feed");
      }
    } catch {
      setValidationError("Failed to complete profile setup. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-[500px] rounded-[24px] bg-card border border-border/80 p-6 sm:p-8 shadow-2xl relative">
      <CardContent className="p-0 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center shrink-0">
              <Image
                src="/mainlogo.png"
                alt="SenkaiHub Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-heading font-black tracking-wider text-xl uppercase text-foreground">
              Senkai<span className="text-primary">Hub</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Create your profile
          </h1>
          <p className="text-xs text-muted-foreground">
            {initialEmail ? `Setting up account for ${initialEmail}` : "Pick your avatar and handle to start exploring clans"}
          </p>
        </div>

        {validationError && (
          <div
            role="alert"
            className="p-3 text-xs rounded-xl bg-destructive/15 border border-destructive/30 text-destructive-foreground font-medium"
          >
            {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Avatar Selection Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Choose Avatar
              </Label>
              <button
                type="button"
                onClick={handleShuffleAvatars}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>More avatars</span>
              </button>
            </div>

            {/* Currently selected preview banner */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-muted/40 border border-border/60">
              <div className="relative w-16 h-16 rounded-2xl bg-secondary/80 border-2 border-primary overflow-hidden shrink-0 shadow-md">
                <Image
                  src={selectedAvatar}
                  alt="Selected avatar"
                  fill
                  className="object-cover p-1"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-sm font-bold text-foreground truncate">
                  @{username || "username"}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Click any avatar below to customize your clan appearance
                </span>
              </div>
            </div>

            {/* Grid of Avatars */}
            <ScrollArea className="h-44 w-full rounded-2xl border border-border/60 bg-muted/20 p-2.5">
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2.5">
                {visibleAvatars.map((avatarPath) => {
                  const isSelected = selectedAvatar === avatarPath;
                  return (
                    <button
                      key={avatarPath}
                      type="button"
                      onClick={() => setSelectedAvatar(avatarPath)}
                      className={`relative aspect-square rounded-xl bg-secondary/60 hover:bg-secondary p-1.5 transition-all flex items-center justify-center cursor-pointer border ${
                        isSelected
                          ? "border-primary ring-2 ring-primary/40 bg-secondary"
                          : "border-border/60 hover:border-border"
                      }`}
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={avatarPath}
                          alt="Avatar option"
                          fill
                          className="object-contain"
                        />
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Username Section */}
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center justify-between">
              <Label htmlFor="onboarding-username" className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Username
              </Label>
              <button
                type="button"
                onClick={handleShuffleUsername}
                className="text-xs text-primary font-medium hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Roll cool username</span>
              </button>
            </div>

            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
                aria-hidden="true"
              />
              <Input
                id="onboarding-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setValidationError(null);
                }}
                maxLength={24}
                required
                placeholder="e.g. ShadowRonin_42"
                className="h-11 pl-10 pr-24 rounded-xl bg-muted/50 border-border/80 text-foreground placeholder:text-muted-foreground/60 text-sm focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary font-medium"
              />
              <button
                type="button"
                onClick={handleShuffleUsername}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg text-xs font-semibold bg-secondary hover:bg-secondary/80 text-foreground transition-all cursor-pointer border border-border/60"
              >
                Shuffle
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Letters, numbers, and underscores. You can change this later.
            </p>
          </div>

          {/* Complete Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl text-primary-foreground font-semibold text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer mt-1"
            style={{ background: "var(--gradient-btn)" }}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="flex items-center justify-center gap-2">
                Complete Setup & Enter <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
