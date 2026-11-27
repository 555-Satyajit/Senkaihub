"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Settings, 
  Crown, 
  Shield, 
  Upload, 
  Users, 
  Swords, 
  Trash2, 
  Plus, 
  Check, 
  UserCheck, 
  UserX, 
  ShieldAlert,
  Palette,
  Mic2,
  Sparkles,
  Puzzle,
  HelpCircle,
  Lock,
  Globe
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ClanDetail } from "../model/clan-detail-types";

interface ClanLeaderCommandSuiteProps {
  clan: ClanDetail;
  isOpen: boolean;
  onClose: () => void;
  onUpdateClan: (updated: Partial<ClanDetail>) => void;
}

export function ClanLeaderCommandSuite({
  clan,
  isOpen,
  onClose,
  onUpdateClan,
}: ClanLeaderCommandSuiteProps) {
  const [activeTab, setActiveTab] = useState<"citadel" | "roles" | "recruitment" | "war">("citadel");

  // Form states
  const [name, setName] = useState(clan.name);
  const [motto, setMotto] = useState(clan.motto);
  const [leaderTitle, setLeaderTitle] = useState(clan.leader.title);
  const [bannerUrl, setBannerUrl] = useState(clan.bannerUrl);
  const [crestUrl, setCrestUrl] = useState(clan.crestUrl);

  // Sub-roles
  const [roles, setRoles] = useState([
    { id: "r-1", name: "Vanguard Commander", hasVaultAccess: true, isWarCommander: true },
    { id: "r-2", name: "Special Grade Hunter", hasVaultAccess: true, isWarCommander: false },
    { id: "r-3", name: "Shadow Initiate", hasVaultAccess: false, isWarCommander: false },
  ]);
  const [newRoleName, setNewRoleName] = useState("");

  // Recruitment policy
  const [recruitmentPolicy, setRecruitmentPolicy] = useState<"open" | "approval" | "invite">("approval");
  const [pendingApplicants, setPendingApplicants] = useState([
    { id: "app-1", name: "Tanjiro Kamado", username: "sun_breather", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80", powerTier: "Tier 2", appliedTime: "2 hours ago" },
    { id: "app-2", name: "Megumi Fushiguro", username: "shadow_puppeteer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80", powerTier: "Tier 3", appliedTime: "5 hours ago" },
  ]);

  // War Champions Nominees
  const [champions, setChampions] = useState({
    painting: "Akira Kenji (@akirakenji_art)",
    cosplay: "Elena V (@shadow_healer)",
    singing: "Ryu Jin (@ryu_assassin)",
    puzzle: "Kai Vance (@kai_shadow)",
    quiz: "Akira Kenji (@akirakenji_art)",
  });

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const crestInputRef = useRef<HTMLInputElement>(null);

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") setBannerUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrestUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") setCrestUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;
    setRoles([
      ...roles,
      { id: `r-${Date.now()}`, name: newRoleName.trim(), hasVaultAccess: false, isWarCommander: false }
    ]);
    setNewRoleName("");
  };

  const handleToggleVault = (roleId: string) => {
    setRoles(roles.map(r => r.id === roleId ? { ...r, hasVaultAccess: !r.hasVaultAccess } : r));
  };

  const handleToggleCommander = (roleId: string) => {
    setRoles(roles.map(r => r.id === roleId ? { ...r, isWarCommander: !r.isWarCommander } : r));
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter(r => r.id !== roleId));
  };

  const handleAcceptApplicant = (id: string) => {
    setPendingApplicants(prev => prev.filter(a => a.id !== id));
  };

  const handleRejectApplicant = (id: string) => {
    setPendingApplicants(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveChanges = () => {
    onUpdateClan({
      name,
      motto,
      bannerUrl,
      crestUrl,
      leader: {
        ...clan.leader,
        title: leaderTitle
      }
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[850px] w-[calc(100%-1.5rem)] max-h-[90vh] bg-card border-border/80 p-0 overflow-hidden flex flex-col rounded-3xl shadow-2xl">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-border/50 bg-secondary/30 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center border border-primary/30 shrink-0">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="font-heading font-black text-lg sm:text-xl text-foreground">
                Citadel Command Center
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                Supreme Leader Administration Suite • {clan.name}
              </DialogDescription>
            </div>
          </div>

          <Badge className="bg-accent/20 text-accent border border-accent/40 font-bold text-xs px-2.5 py-1 shrink-0 hidden sm:inline-flex">
            Sovereign Access
          </Badge>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-border/40 overflow-x-auto scrollbar-none bg-card">
          <button
            onClick={() => setActiveTab("citadel")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
              activeTab === "citadel"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Citadel Identity</span>
          </button>

          <button
            onClick={() => setActiveTab("roles")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
              activeTab === "roles"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Ranks & Privileges ({roles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("recruitment")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
              activeTab === "recruitment"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Recruitment ({pendingApplicants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("war")}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
              activeTab === "war"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>War Champions</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-5">
          {/* TAB 1: CITADEL IDENTITY */}
          {activeTab === "citadel" && (
            <div className="flex flex-col gap-5">
              {/* Cover Banner Editing */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-foreground">Citadel Cover Banner</label>
                <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden bg-secondary border border-border group">
                  <Image src={bannerUrl} alt="Cover Banner" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      size="sm" 
                      onClick={() => bannerInputRef.current?.click()}
                      className="bg-card/90 text-foreground hover:bg-card text-xs font-bold gap-2"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Replace Banner
                    </Button>
                  </div>
                </div>
                <input 
                  type="file" 
                  ref={bannerInputRef} 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleBannerUpload} 
                />
              </div>

              {/* Crest & Name Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div className="sm:col-span-1 flex flex-col items-center gap-2">
                  <label className="text-xs font-bold text-foreground">Clan Mascot Crest</label>
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/50 bg-secondary shadow-lg group">
                    <Image src={crestUrl} alt="Crest" fill className="object-cover" />
                    <button 
                      onClick={() => crestInputRef.current?.click()}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold"
                    >
                      Change
                    </button>
                  </div>
                  <input 
                    type="file" 
                    ref={crestInputRef} 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleCrestUpload} 
                  />
                </div>

                <div className="sm:col-span-3 flex flex-col gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground">Clan Official Name</label>
                    <Input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-10 rounded-xl bg-secondary/50 border-border text-xs sm:text-sm mt-1"
                      placeholder="e.g. Shadow Monarchs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground">Supreme Leader Title (Founder)</label>
                    <Input 
                      value={leaderTitle}
                      onChange={(e) => setLeaderTitle(e.target.value)}
                      className="h-10 rounded-xl bg-secondary/50 border-border text-xs sm:text-sm mt-1 text-primary font-bold"
                      placeholder="e.g. Shadow Monarch, Captain, Guildmaster"
                    />
                  </div>
                </div>
              </div>

              {/* Clan Battle Motto */}
              <div>
                <label className="text-xs font-bold text-foreground">Battle Motto & Citadel Mantra</label>
                <textarea
                  value={motto}
                  onChange={(e) => setMotto(e.target.value)}
                  rows={2}
                  className="w-full mt-1 p-3 rounded-xl bg-secondary/50 border border-border text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Enter clan war cry or bio..."
                />
              </div>
            </div>
          )}

          {/* TAB 2: ROLES & PRIVILEGES */}
          {activeTab === "roles" && (
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                Configure your rank hierarchy and grant privileges like <strong>Vault Access</strong> (spoiler lore unlocking) and <strong>War Commander</strong> (match roster locks).
              </div>

              {/* Add New Role */}
              <div className="flex gap-2">
                <Input
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Create rank (e.g., Grand Inquisitor)..."
                  className="h-10 rounded-xl bg-secondary/50 border-border text-xs sm:text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleAddRole()}
                />
                <Button 
                  onClick={handleAddRole} 
                  className="h-10 px-4 rounded-xl text-xs font-bold shrink-0 text-primary-foreground"
                  style={{ background: "var(--gradient-btn)" }}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add Rank
                </Button>
              </div>

              {/* Existing Sub-Roles List */}
              <div className="flex flex-col gap-2.5">
                {roles.map((r) => (
                  <div key={r.id} className="p-3.5 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-card border border-border flex items-center justify-center text-xs font-black text-foreground">
                        <Shield className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="font-heading font-bold text-xs sm:text-sm text-foreground">
                        {r.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => handleToggleVault(r.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                          r.hasVaultAccess
                            ? "bg-red-500/20 text-red-400 border-red-500/30"
                            : "bg-secondary text-muted-foreground border-border/60"
                        }`}
                      >
                        Vault Access
                      </button>

                      <button
                        onClick={() => handleToggleCommander(r.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                          r.isWarCommander
                            ? "bg-amber-500/20 text-accent border-amber-500/30"
                            : "bg-secondary text-muted-foreground border-border/60"
                        }`}
                      >
                        War Commander
                      </button>

                      <button
                        onClick={() => handleDeleteRole(r.id)}
                        className="w-8 h-8 rounded-lg bg-secondary/80 hover:bg-destructive/20 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors ml-auto sm:ml-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RECRUITMENT & PENDING APPLICANTS */}
          {activeTab === "recruitment" && (
            <div className="flex flex-col gap-4">
              {/* Recruitment Policy Setting */}
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border/60 flex flex-col gap-3">
                <label className="text-xs font-bold text-foreground">Citadel Admission Policy</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    onClick={() => setRecruitmentPolicy("open")}
                    className={`p-3 rounded-xl border flex flex-col text-left transition-all ${
                      recruitmentPolicy === "open"
                        ? "bg-primary/10 border-primary text-foreground"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold text-xs text-foreground">Open Doors</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1">Anyone can join instantly without approval.</span>
                  </button>

                  <button
                    onClick={() => setRecruitmentPolicy("approval")}
                    className={`p-3 rounded-xl border flex flex-col text-left transition-all ${
                      recruitmentPolicy === "approval"
                        ? "bg-primary/10 border-primary text-foreground"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold text-xs text-foreground">Leader Review</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1">Applicants must be approved by Sovereign.</span>
                  </button>

                  <button
                    onClick={() => setRecruitmentPolicy("invite")}
                    className={`p-3 rounded-xl border flex flex-col text-left transition-all ${
                      recruitmentPolicy === "invite"
                        ? "bg-primary/10 border-primary text-foreground"
                        : "bg-card border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold text-xs text-foreground">Secret Order</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1">Private invitation code required.</span>
                  </button>
                </div>
              </div>

              {/* Pending Applicants List */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-xs text-foreground uppercase tracking-wider">
                    Pending Admission Requests ({pendingApplicants.length})
                  </h4>
                  {pendingApplicants.length === 0 && (
                    <span className="text-xs text-muted-foreground">Queue is clear!</span>
                  )}
                </div>

                {pendingApplicants.map((app) => (
                  <div key={app.id} className="p-3.5 rounded-2xl bg-secondary/30 border border-border/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-secondary relative shrink-0">
                        <Image src={app.avatar} alt={app.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-heading font-bold text-xs text-foreground truncate">{app.name}</h5>
                          <Badge variant="outline" className="text-[9px] font-bold text-accent border-accent/40">{app.powerTier}</Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground">@{app.username} • Applied {app.appliedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptApplicant(app.id)}
                        className="h-8 px-3 rounded-lg text-xs font-bold text-primary-foreground bg-green-600 hover:bg-green-500"
                      >
                        <UserCheck className="w-3.5 h-3.5 mr-1" />
                        Pledge
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRejectApplicant(app.id)}
                        className="h-8 px-2 rounded-lg text-xs font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <UserX className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WAR CHAMPIONS NOMINATION */}
          {activeTab === "war" && (
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                Appoint the official warriors representing <strong>{clan.name}</strong> across the 5 seasonal disciplines. Their performance earns Victory Points for the citadel.
              </div>

              <div className="flex flex-col gap-3">
                {/* 1. Painting / Art */}
                <div className="p-3.5 rounded-xl bg-card border border-border/60 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-secondary text-primary">
                      <Palette className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-xs text-foreground">Painting & Fan Art Champion</h5>
                      <span className="text-[10px] text-muted-foreground">Digital / Traditional Illustrations</span>
                    </div>
                  </div>
                  <Input 
                    value={champions.painting} 
                    onChange={(e) => setChampions({...champions, painting: e.target.value})}
                    className="h-8 w-full sm:w-60 rounded-lg bg-secondary/50 text-xs text-foreground"
                  />
                </div>

                {/* 2. Singing / Vocals */}
                <div className="p-3.5 rounded-xl bg-card border border-border/60 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-secondary text-blue-400">
                      <Mic2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-xs text-foreground">Singing & Vocalist Champion</h5>
                      <span className="text-[10px] text-muted-foreground">Anime OST & Vocal Covers</span>
                    </div>
                  </div>
                  <Input 
                    value={champions.singing} 
                    onChange={(e) => setChampions({...champions, singing: e.target.value})}
                    className="h-8 w-full sm:w-60 rounded-lg bg-secondary/50 text-xs text-foreground"
                  />
                </div>

                {/* 3. Cosplay & Craft */}
                <div className="p-3.5 rounded-xl bg-card border border-border/60 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-secondary text-pink-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-xs text-foreground">Cosplay & Craft Champion</h5>
                      <span className="text-[10px] text-muted-foreground">Costumes, Props & Armor</span>
                    </div>
                  </div>
                  <Input 
                    value={champions.cosplay} 
                    onChange={(e) => setChampions({...champions, cosplay: e.target.value})}
                    className="h-8 w-full sm:w-60 rounded-lg bg-secondary/50 text-xs text-foreground"
                  />
                </div>

                {/* 4. Lore Puzzle */}
                <div className="p-3.5 rounded-xl bg-card border border-border/60 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-secondary text-green-400">
                      <Puzzle className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-xs text-foreground">Lore & Cipher Solver</h5>
                      <span className="text-[10px] text-muted-foreground">Anime Glyphs & Timeline Puzzles</span>
                    </div>
                  </div>
                  <Input 
                    value={champions.puzzle} 
                    onChange={(e) => setChampions({...champions, puzzle: e.target.value})}
                    className="h-8 w-full sm:w-60 rounded-lg bg-secondary/50 text-xs text-foreground"
                  />
                </div>

                {/* 5. Anime Trivia Quiz */}
                <div className="p-3.5 rounded-xl bg-card border border-border/60 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-secondary text-accent">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-xs text-foreground">Trivia Quizmaster</h5>
                      <span className="text-[10px] text-muted-foreground">Speed Gauntlet Trivia</span>
                    </div>
                  </div>
                  <Input 
                    value={champions.quiz} 
                    onChange={(e) => setChampions({...champions, quiz: e.target.value})}
                    className="h-8 w-full sm:w-60 rounded-lg bg-secondary/50 text-xs text-foreground"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-border/60 bg-card/95 backdrop-blur-md flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-xs font-semibold rounded-xl"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSaveChanges}
            className="rounded-xl text-primary-foreground text-xs sm:text-sm font-bold px-5 h-9 shadow-md hover:brightness-110 active:scale-95"
            style={{ background: "var(--gradient-btn)" }}
          >
            <Check className="w-4 h-4 mr-1.5" />
            Seal & Enact Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
