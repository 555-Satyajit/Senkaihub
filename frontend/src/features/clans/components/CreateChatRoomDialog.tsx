"use client";

import { useState } from "react";
import { Plus, Hash, Lock, Volume2, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CreateChatRoomDialogProps {
  onRoomCreated: (newRoom: {
    name: string;
    description: string;
    topic: string;
    isPrivate: boolean;
  }) => void;
}

export function CreateChatRoomDialog({ onRoomCreated }: CreateChatRoomDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Clean room name into kebab-case format
    const cleanedName = name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    onRoomCreated({
      name: cleanedName,
      description: description.trim() || "A dedicated clan chamber for tactical coordination.",
      topic: topic.trim() || "Live clan discussion",
      isPrivate,
    });

    setName("");
    setDescription("");
    setTopic("");
    setIsPrivate(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button
          size="sm"
          className="h-8 px-3 rounded-lg text-primary-foreground text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:brightness-110 active:scale-95 transition-all"
          style={{ background: "var(--gradient-btn)" }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Room</span>
        </Button>
      } />

      <DialogContent className="sm:max-w-[460px] bg-card border border-border/80 rounded-2xl p-6 shadow-2xl">
        <DialogHeader className="gap-1">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
            <Hash className="w-4 h-4" />
            <span>Chamber Creation</span>
          </div>
          <DialogTitle className="font-heading font-black text-xl text-foreground">
            Create Clan Chat Room
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Establish a dedicated live channel for war raids, art sharing, or member banter. Live chat activates immediately once created.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Room Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-name" className="text-xs font-semibold text-foreground">
              Room Name <span className="text-primary">*</span>
            </Label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-muted-foreground font-bold text-sm">#</span>
              <input
                id="room-name"
                placeholder="e.g. raid-tactics, anime-watch-party, art-critique"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-10 pl-8 pr-3 rounded-lg bg-secondary/40 border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Room Topic */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-topic" className="text-xs font-semibold text-foreground">
              Room Topic / Objective
            </Label>
            <input
              id="room-topic"
              placeholder="e.g. Strategy for weekend raid against rival vanguard"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-secondary/40 border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Room Description */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="room-desc" className="text-xs font-semibold text-foreground">
              Description
            </Label>
            <input
              id="room-desc"
              placeholder="Short guidelines or purpose of this room"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-secondary/40 border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Privacy Toggle */}
          <div 
            onClick={() => setIsPrivate(!isPrivate)}
            className="flex items-center justify-between p-3 rounded-xl border border-border/60 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-accent" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">
                  {isPrivate ? "Private Officers Chamber" : "Public to All Clan Members"}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {isPrivate ? "Only Commanders and Founders can view and message." : "Any clan initiate can participate in live banter."}
                </span>
              </div>
            </div>
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${
              isPrivate ? "bg-primary border-primary text-primary-foreground" : "border-border"
            }`}>
              {isPrivate && <span className="text-[10px] font-bold">✓</span>}
            </div>
          </div>

          <DialogFooter className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="h-8 px-3 rounded-lg text-xs font-semibold text-foreground hover:bg-secondary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
              className="h-8 px-4 rounded-lg text-xs font-semibold text-primary-foreground shadow-md hover:brightness-110 active:scale-95 transition-all"
              style={{ background: "var(--gradient-btn)" }}
            >
              Establish Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
