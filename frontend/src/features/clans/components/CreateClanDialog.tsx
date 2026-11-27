"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Shield, 
  Crown, 
  Flame, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Lock,
  Swords,
  Users,
  Upload,
  Plus,
  Trash2,
  Camera
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { ClanItem } from "../model/clan-types";

interface CreateClanDialogProps {
  onClanCreated?: (clan: ClanItem) => void;
}

interface ClanRole {
  id: string;
  name: string;
  rankLevel: number;
  badgeColor: string;
  canManageVaults: boolean;
  canLeadWarSquad: boolean;
}

export function CreateClanDialog({ onClanCreated }: CreateClanDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 1: Identity & Uploads
  const [name, setName] = useState("");
  const [motto, setMotto] = useState("");
  const [mascotImage, setMascotImage] = useState<string>(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80"
  );
  const [bannerImage, setBannerImage] = useState<string>(
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80"
  );
  
  const mascotFileRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);

  // Step 2: Custom Hierarchy & Multiple Member Roles
  const [leaderTitle, setLeaderTitle] = useState("Shadow Monarch");
  const [roles, setRoles] = useState<ClanRole[]>([
    {
      id: "role-1",
      name: "Vanguard Commander",
      rankLevel: 2,
      badgeColor: "#ff2a36",
      canManageVaults: true,
      canLeadWarSquad: true,
    },
    {
      id: "role-2",
      name: "Special Grade Hunter",
      rankLevel: 3,
      badgeColor: "#7940cf",
      canManageVaults: false,
      canLeadWarSquad: true,
    },
    {
      id: "role-3",
      name: "Shadow Initiate",
      rankLevel: 4,
      badgeColor: "#3b82f6",
      canManageVaults: false,
      canLeadWarSquad: false,
    },
  ]);

  // Step 3: Permissions
  const [allowPublicJoin, setAllowPublicJoin] = useState(false);
  const [autoRegisterWars, setAutoRegisterWars] = useState(true);
  const [requireMinProgress, setRequireMinProgress] = useState(true);

  // File Upload Handlers (FileReader for robust base64 loading)
  const handleMascotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setMascotImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBannerImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRole = () => {
    const newRole: ClanRole = {
      id: `role-${Date.now()}`,
      name: "Battle Strategist",
      rankLevel: roles.length + 2,
      badgeColor: "#eab308",
      canManageVaults: false,
      canLeadWarSquad: false,
    };
    setRoles([...roles, newRole]);
  };

  const handleUpdateRole = (id: string, updates: Partial<ClanRole>) => {
    setRoles(roles.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  const resetForm = () => {
    setStep(1);
    setIsSuccess(false);
    setName("");
    setMotto("");
  };

  const handleFinish = () => {
    if (!name.trim()) return;

    if (onClanCreated) {
      onClanCreated({
        id: `clan-${Date.now()}`,
        name: name.trim(),
        tier: `Rank: S-Tier Sovereign`,
        category: "all",
        bannerUrl: bannerImage,
        crestUrl: mascotImage,
        motto: motto.trim() || "A sovereign anime faction summoned into Clan Wars.",
        vpBounty: "0 VP",
        rating: 5.0,
        reviewCount: 1,
        memberCount: "1 member",
      });
    }

    setIsSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
      <DialogTrigger render={
        <Button
          className="h-[38px] px-4 rounded-[8px] text-primary-foreground text-[13px] font-semibold flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all"
          style={{ background: "var(--gradient-btn)" }}
        >
          <Crown className="w-4 h-4" />
          <span>Create Clan</span>
        </Button>
      } />

      <DialogContent className="w-[calc(100%-1.5rem)] sm:max-w-[760px] md:max-w-[820px] max-h-[90vh] bg-card border border-border/70 rounded-2xl sm:rounded-3xl p-0 overflow-hidden shadow-2xl flex flex-col">
        {isSuccess ? (
          /* HIGH-END CINEMATIC CLAN CARD SUCCESS */
          <div className="relative flex flex-col overflow-y-auto bg-card">
            {/* Top Banner Cover */}
            <div className="relative w-full h-48 sm:h-56 bg-secondary overflow-hidden shrink-0">
              <Image 
                src={bannerImage} 
                alt="Clan Banner" 
                fill 
                className="object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-black/40" />

              <div className="absolute top-4 left-6 z-10">
                <Badge className="bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg border-0">
                  Clan Established
                </Badge>
              </div>
            </div>

            {/* Content Body */}
            <div className="px-6 sm:px-10 pb-8 pt-0 flex flex-col gap-5 -mt-14 relative z-10">
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div className="flex items-end gap-4">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-[4px] border-card bg-secondary shadow-2xl shrink-0">
                    <Image src={mascotImage} alt={name} fill className="object-cover" />
                  </div>

                  <div className="mb-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading font-black text-2xl sm:text-3xl text-foreground tracking-tight">
                        {name}
                      </h2>
                      <Badge variant="outline" className="text-[10px] font-bold border-accent/40 bg-accent/10 text-accent">
                        S-Tier
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                      <Crown className="w-3.5 h-3.5 text-accent" />
                      <span>Led by <strong className="text-foreground">{leaderTitle}</strong></span>
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => setOpen(false)}
                  className="h-10 px-6 rounded-xl font-bold text-xs sm:text-sm text-primary-foreground shadow-md hover:brightness-110 active:scale-95 transition-all"
                  style={{ background: "var(--gradient-btn)" }}
                >
                  Enter Citadel
                </Button>
              </div>

              {motto && (
                <div className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 text-xs sm:text-sm text-foreground/90 italic">
                  &ldquo;{motto}&rdquo;
                </div>
              )}

              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
                  <span className="text-[11px] text-muted-foreground font-medium">Recruitment</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                    {allowPublicJoin ? "Open Public" : "By Invitation"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
                  <span className="text-[11px] text-muted-foreground font-medium">Clan Wars</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                    {autoRegisterWars ? "Auto-Enrolled" : "Manual"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col">
                  <span className="text-[11px] text-muted-foreground font-medium">Hierarchy</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground mt-0.5">
                    {roles.length + 1} Ranks Configured
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Top Header - ONLY Show full banner cover in Step 1 */}
            {step === 1 ? (
              <div className="relative h-40 sm:h-48 bg-secondary overflow-hidden shrink-0 group">
                <Image
                  src={bannerImage}
                  alt="Clan Cover Banner"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-black/30" />
                
                {/* Cover Upload Trigger Button */}
                <input
                  ref={bannerFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => bannerFileRef.current?.click()}
                  className="absolute top-4 right-5 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 shadow-lg transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-primary" />
                  <span>Upload Cover Banner</span>
                </button>

                {/* Progress Indicator */}
                <div className="absolute top-4 left-6 z-10 flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="bg-black/60 backdrop-blur-md border-white/20 text-[10px] uppercase font-bold text-white flex items-center gap-1.5"
                  >
                    <Crown className="w-3 h-3 text-primary" />
                    Clan Founding Rite
                  </Badge>
                  <span className="text-[11px] font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/20">
                    Step 1 of 3
                  </span>
                </div>
              </div>
            ) : (
              /* Compact Clean Header Bar for Steps 2 and 3 (No redundant cover image) */
              <div className="px-6 py-4 border-b border-border/50 bg-secondary/30 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <Badge 
                    variant="outline" 
                    className="bg-card border-border text-[10px] uppercase font-bold text-primary flex items-center gap-1.5"
                  >
                    <Crown className="w-3 h-3 text-primary" />
                    Clan Founding Rite
                  </Badge>
                  <span className="text-xs font-bold text-foreground">
                    {name || "New Clan"}
                  </span>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
                  Step {step} of 3
                </span>
              </div>
            )}

            {/* Scrollable Form Body Container */}
            <div className={`flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6 scrollbar-none ${step === 1 ? "-mt-8 relative z-20" : ""}`}>
              {/* STEP 1: IDENTITY & VISUALS */}
              {step === 1 && (
                <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                  {/* Clan Mascot Upload Section */}
                  <div className="flex items-center gap-5 p-4 rounded-2xl bg-secondary/30 border border-border/60 backdrop-blur-sm">
                    <input
                      ref={mascotFileRef}
                      type="file"
                      accept="image/*"
                      onChange={handleMascotUpload}
                      className="hidden"
                    />

                    <div 
                      onClick={() => mascotFileRef.current?.click()}
                      className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-primary/50 bg-secondary cursor-pointer group/mascot shadow-xl shrink-0"
                    >
                      <Image src={mascotImage} alt="Mascot Crest" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/mascot:opacity-100 flex flex-col items-center justify-center text-white transition-opacity">
                        <Upload className="w-5 h-5 mb-1 text-primary" />
                        <span className="text-[10px] font-bold">Upload</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                          Clan Mascot Crest
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => mascotFileRef.current?.click()}
                          className="h-7 px-3 text-xs font-semibold rounded-lg border-border/80 hover:bg-secondary/70 gap-1.5 text-foreground"
                        >
                          <Upload className="w-3.5 h-3.5 text-primary" />
                          <span>Choose Image</span>
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        PNG or JPG image representing your clan&apos;s combat mascot or emblem. Appears on clan flags and war rankings.
                      </p>
                    </div>
                  </div>

                  {/* Clean, Modern Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Clan Name */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="clan-name" className="text-xs font-semibold text-foreground/90">
                        Clan Name <span className="text-primary">*</span>
                      </Label>
                      <input
                        id="clan-name"
                        placeholder="e.g. Shadow Monarchs, Phantom Troupe..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoFocus
                        className="w-full h-10 px-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                      />
                    </div>

                    {/* War Cry */}
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="clan-motto" className="text-xs font-semibold text-foreground/90">
                        Battle Cry & War Ethos
                      </Label>
                      <input
                        id="clan-motto"
                        placeholder="e.g. Arise from the shadows. Dominate weekly Clan Wars."
                        value={motto}
                        onChange={(e) => setMotto(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CUSTOM HIERARCHY SYSTEM & MULTIPLE MEMBER ROLES */}
              {step === 2 && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <DialogTitle className="font-heading font-black text-2xl text-foreground">
                        Hierarchy & Custom Roles
                      </DialogTitle>
                      <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                        Define leadership titles and configure rank permissions for your members.
                      </DialogDescription>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddRole}
                      className="gap-1.5 text-xs font-semibold h-8 border-border rounded-lg"
                    >
                      <Plus className="w-3.5 h-3.5 text-primary" />
                      Add Role
                    </Button>
                  </div>

                  {/* Supreme Leader Title */}
                  <div className="flex flex-col gap-2 p-4 rounded-xl bg-secondary/30 border border-border/60">
                    <Label className="text-xs font-bold text-primary flex items-center gap-1.5">
                      <Crown className="w-4 h-4 text-accent" />
                      Supreme Leader Title (Founder)
                    </Label>
                    <input
                      value={leaderTitle}
                      onChange={(e) => setLeaderTitle(e.target.value)}
                      placeholder="e.g. Shadow Monarch, Fleet Captain, Hashira..."
                      className="w-full h-10 px-3.5 rounded-lg bg-card border border-border text-foreground font-semibold text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
                    />
                  </div>

                  {/* Member Roles Builder */}
                  <div className="flex flex-col gap-3 pr-1">
                    <Label className="text-xs font-semibold text-foreground">
                      Clan Sub-Ranks & Member Roles
                    </Label>

                    {roles.map((role) => (
                      <div 
                        key={role.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-xl bg-secondary/30 border border-border/60"
                      >
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <span className="w-6 h-6 rounded-md bg-card border border-border text-[11px] font-bold text-muted-foreground flex items-center justify-center shrink-0">
                            {role.rankLevel}
                          </span>
                          <input
                            value={role.name}
                            onChange={(e) => handleUpdateRole(role.id, { name: e.target.value })}
                            className="h-9 px-3 rounded-lg text-xs bg-card border border-border text-foreground w-full sm:max-w-[240px] focus:outline-none focus:border-primary transition-colors"
                          />
                        </div>

                        {/* Permission Toggles */}
                        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-border/30">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateRole(role.id, { canManageVaults: !role.canManageVaults })}
                              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition-colors ${
                                role.canManageVaults
                                  ? "bg-primary/20 border-primary text-primary"
                                  : "bg-card border-border/80 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              Vault Access
                            </button>

                            <button
                              type="button"
                              onClick={() => handleUpdateRole(role.id, { canLeadWarSquad: !role.canLeadWarSquad })}
                              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border transition-colors ${
                                role.canLeadWarSquad
                                  ? "bg-accent/20 border-accent text-accent"
                                  : "bg-card border-border/80 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              War Commander
                            </button>
                          </div>

                          {roles.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteRole(role.id)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: RECRUITMENT & CITADEL PROTOCOLS */}
              {step === 3 && (
                <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                  <div className="flex flex-col gap-1">
                    <DialogTitle className="font-heading font-black text-2xl text-foreground">
                      Recruitment & Citadel Protocols
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                      Configure recruitment access and Clan War battlefield privileges.
                    </DialogDescription>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Rule 1 */}
                    <div 
                      onClick={() => setAllowPublicJoin(!allowPublicJoin)}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {allowPublicJoin ? "Open Recruitment (Public)" : "Invitation & Trial Only"}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {allowPublicJoin 
                              ? "Any hunter can join immediately without approval." 
                              : "Recruits must pass inspection by your commanders."}
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        allowPublicJoin ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      }`}>
                        {allowPublicJoin && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    {/* Rule 2 */}
                    <div 
                      onClick={() => setAutoRegisterWars(!autoRegisterWars)}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Swords className="w-5 h-5 text-accent shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            Auto-enroll in Weekly Clan Wars
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Members earn Victory Points (VP) for art, cosplay, and discussion contests.
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        autoRegisterWars ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      }`}>
                        {autoRegisterWars && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>

                    {/* Rule 3 */}
                    <div 
                      onClick={() => setRequireMinProgress(!requireMinProgress)}
                      className="flex items-center justify-between p-3.5 rounded-2xl border border-border/60 bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Lock className="w-5 h-5 text-primary shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            Progress-Gated Strategy Vaults
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Only members synced to required episodes can access strategy discussions.
                          </span>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        requireMinProgress ? "bg-primary border-primary text-primary-foreground" : "border-border"
                      }`}>
                        {requireMinProgress && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* STICKY BOTTOM BUTTONS (Always accessible, never requires scrolling to click) */}
            <div className="sticky bottom-0 z-30 bg-card/95 backdrop-blur-md px-6 py-4 border-t border-border/50 flex items-center justify-between shrink-0 shadow-lg">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((prev) => (prev === 3 ? 2 : 1))}
                  className="gap-1.5 text-xs text-foreground hover:bg-secondary rounded-xl"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                  className="text-xs text-muted-foreground hover:text-foreground rounded-xl"
                >
                  Cancel
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  disabled={step === 1 && !name.trim()}
                  onClick={() => setStep((prev) => (prev === 1 ? 2 : 3))}
                  className="gap-1.5 text-xs font-semibold text-primary-foreground px-5 h-9 rounded-xl shadow-md hover:brightness-110 active:scale-95"
                  style={{ background: "var(--gradient-btn)" }}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleFinish}
                  className="gap-2 text-xs font-bold text-primary-foreground px-6 h-9 rounded-xl shadow-lg hover:brightness-110 active:scale-95"
                  style={{ background: "var(--gradient-btn)" }}
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Awaken Clan</span>
                </Button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
