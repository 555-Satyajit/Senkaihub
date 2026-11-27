"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Palette, 
  Mic2, 
  Sparkles, 
  Puzzle, 
  HelpCircle, 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Swords, 
  ChevronRight,
  ShieldAlert,
  ArrowUpRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClanDetail, WarDisciplineMatch } from "../model/clan-detail-types";

interface ClanWarFrontViewProps {
  clan: ClanDetail;
}

export function ClanWarFrontView({ clan }: ClanWarFrontViewProps) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>("all");
  const [warSubTab, setWarSubTab] = useState<"current" | "history">("current");

  const disciplines = [
    { id: "all", label: "All Disciplines", icon: Swords },
    { id: "painting", label: "Painting / Art", icon: Palette },
    { id: "singing", label: "Singing / Vocals", icon: Mic2 },
    { id: "cosplay", label: "Cosplay & Craft", icon: Sparkles },
    { id: "puzzle", label: "Lore Puzzle", icon: Puzzle },
    { id: "quiz", label: "Anime Trivia Quiz", icon: HelpCircle },
  ];

  const matches = clan.warStatus.activeMatches || [];
  const history = clan.warStatus.seasonHistory || [];

  const filteredMatches = selectedDiscipline === "all"
    ? matches
    : matches.filter((m) => m.discipline === selectedDiscipline);

  const getDisciplineIcon = (disc: string) => {
    switch (disc) {
      case "painting": return <Palette className="w-3.5 h-3.5 text-primary" />;
      case "singing": return <Mic2 className="w-3.5 h-3.5 text-blue-400" />;
      case "cosplay": return <Sparkles className="w-3.5 h-3.5 text-pink-400" />;
      case "puzzle": return <Puzzle className="w-3.5 h-3.5 text-green-400" />;
      case "quiz": return <HelpCircle className="w-3.5 h-3.5 text-accent" />;
      default: return <Swords className="w-3.5 h-3.5 text-primary" />;
    }
  };

  const totalPoints = clan.warStatus.clanScore + clan.warStatus.rivalScore;
  const clanPercentage = Math.round((clan.warStatus.clanScore / totalPoints) * 100);
  const rivalPercentage = 100 - clanPercentage;
  const leadDiff = clan.warStatus.clanScore - clan.warStatus.rivalScore;

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-full overflow-hidden select-none">
      {/* 1. Epic Current War Head-to-Head Marquee Card */}
      <div className="rounded-2xl sm:rounded-3xl bg-card border border-border/70 p-4 sm:p-6 md:p-7 shadow-xl flex flex-col gap-4 sm:gap-5 w-full relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header: Season & Phase info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 relative z-10 w-full">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-primary/20 text-primary border-primary/30 font-bold text-[11px] sm:text-xs px-2.5 py-0.5">
              {clan.warStatus.seasonRound || "Grand Clash 3 of 5"}
            </Badge>
            <span className="text-xs text-muted-foreground font-semibold truncate max-w-[240px] sm:max-w-none">
              {clan.warStatus.seasonTitle || "Genesis Season 1"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-semibold bg-secondary/80 px-2.5 py-1 rounded-full border border-border/60 self-start sm:self-auto shrink-0">
            <Clock className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Time Left: <strong className="text-foreground">{clan.warStatus.endsIn}</strong></span>
          </div>
        </div>

        {/* Rivalry Banner: Responsive Clan vs Rival (Vertical Stack on Mobile, Horizontal on Tablet+) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 sm:py-4 border-y border-border/50 gap-3.5 sm:gap-4 relative z-10 w-full">
          {/* Left Clan (Our Clan) */}
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden relative border-2 border-primary/60 bg-secondary shadow-lg shrink-0">
                <Image src={clan.crestUrl} alt={clan.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h2 className="font-heading font-black text-sm sm:text-lg text-foreground leading-tight truncate">
                    {clan.name}
                  </h2>
                  <Badge className="bg-primary text-primary-foreground text-[9px] sm:text-[10px] font-bold px-1.5 py-0">
                    {clan.tier}
                  </Badge>
                </div>
                <p className="text-xs sm:text-base font-black text-primary mt-0.5 tracking-tight">
                  {clan.warStatus.clanScore.toLocaleString()} <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground">VP</span>
                </p>
              </div>
            </div>
          </div>

          {/* Center VS Divider */}
          <div className="flex items-center justify-center gap-2 sm:flex-col shrink-0 my-1 sm:my-0">
            <div className="h-[1px] bg-border/40 flex-1 sm:hidden" />
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-secondary border border-border flex items-center justify-center font-black text-[10px] sm:text-xs text-foreground shadow-md shrink-0">
              VS
            </div>
            <div className="h-[1px] bg-border/40 flex-1 sm:hidden" />
          </div>

          {/* Right Clan (Rival Clan) */}
          <div className="flex items-center justify-between sm:justify-start sm:flex-row-reverse gap-3 text-left sm:text-right w-full sm:w-auto">
            <div className="flex items-center sm:flex-row-reverse gap-3 min-w-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl overflow-hidden relative border-2 border-accent/60 bg-secondary shadow-lg shrink-0">
                <Image src={clan.warStatus.rivalCrestUrl} alt={clan.warStatus.rivalClanName} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:justify-end flex-wrap">
                  <Badge className="bg-accent/20 text-accent border border-accent/30 text-[9px] sm:text-[10px] font-bold px-1.5 py-0">
                    Challenger
                  </Badge>
                  <h2 className="font-heading font-black text-sm sm:text-lg text-foreground leading-tight truncate">
                    {clan.warStatus.rivalClanName}
                  </h2>
                </div>
                <p className="text-xs sm:text-base font-black text-accent mt-0.5 tracking-tight">
                  {clan.warStatus.rivalScore.toLocaleString()} <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground">VP</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tug-of-War Score Bar */}
        <div className="flex flex-col gap-2 relative z-10 w-full">
          <div className="w-full h-3 sm:h-3.5 rounded-full bg-secondary overflow-hidden flex shadow-inner border border-border/40">
            <div 
              className="bg-primary h-full transition-all duration-500 relative flex items-center justify-end pr-1.5 text-[9px] sm:text-[10px] font-black text-white" 
              style={{ width: `${clanPercentage}%` }} 
            >
              {clanPercentage > 15 && `${clanPercentage}%`}
            </div>
            <div 
              className="bg-accent h-full transition-all duration-500 relative flex items-center justify-start pl-1.5 text-[9px] sm:text-[10px] font-black text-black" 
              style={{ width: `${rivalPercentage}%` }} 
            >
              {rivalPercentage > 15 && `${rivalPercentage}%`}
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] sm:text-xs font-semibold">
            <span className="text-primary flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-primary" />
              <span>+{leadDiff > 0 ? leadDiff.toLocaleString() : 0} VP Lead</span>
            </span>
            <span className="text-accent">
              {rivalPercentage}% Contested
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sub-Navigation Tabs: Current Discipline Duels vs. Season War History */}
      <div className="flex flex-col gap-3 border-b border-border/60 pb-3 w-full">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 w-full">
          <Button
            size="sm"
            onClick={() => setWarSubTab("current")}
            className={`rounded-xl text-xs font-bold px-3 sm:px-4 h-8 sm:h-9 whitespace-nowrap shrink-0 transition-all ${
              warSubTab === "current"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Swords className="w-3.5 h-3.5 mr-1.5" />
            Active Duels ({matches.length})
          </Button>

          <Button
            size="sm"
            onClick={() => setWarSubTab("history")}
            className={`rounded-xl text-xs font-bold px-3 sm:px-4 h-8 sm:h-9 whitespace-nowrap shrink-0 transition-all ${
              warSubTab === "history"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 mr-1.5" />
            Season Archives ({history.length})
          </Button>
        </div>

        {warSubTab === "current" && (
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 w-full">
            {disciplines.map((d) => {
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDiscipline(d.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    selectedDiscipline === d.id
                      ? "bg-foreground text-background font-bold shadow-sm"
                      : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. ACTIVE DISCIPLINE MATCHES LIST */}
      {warSubTab === "current" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {filteredMatches.map((match) => {
            const isCompleted = match.status === "completed";
            const isLive = match.status === "live";

            return (
              <Card 
                key={match.id}
                className="bg-card border border-border/70 rounded-2xl p-3.5 sm:p-5 shadow-md flex flex-col justify-between gap-3.5 transition-all hover:border-border w-full overflow-hidden"
              >
                {/* Match Card Header */}
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 rounded-lg bg-secondary shrink-0">
                      {getDisciplineIcon(match.discipline)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading font-black text-xs sm:text-sm text-foreground truncate">
                        {match.title}
                      </h4>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block truncate">
                        {match.discipline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {isLive && (
                      <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 animate-pulse">
                        LIVE
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5">
                        DONE
                      </Badge>
                    )}
                    {match.status === "upcoming" && (
                      <Badge variant="outline" className="text-muted-foreground text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5">
                        SOON
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Participants Clash Grid: Stacks cleanly on very small mobile, 2 columns on tablet+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 items-stretch py-0.5 w-full">
                  {/* Clan Champion */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col justify-between gap-2 w-full">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-secondary relative shrink-0">
                          <Image src={match.clanParticipant.avatar} alt={match.clanParticipant.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-heading font-bold text-xs text-foreground truncate">
                            {match.clanParticipant.name}
                          </h5>
                          <p className="text-[10px] text-muted-foreground truncate">
                            @{match.clanParticipant.username}
                          </p>
                        </div>
                      </div>

                      {match.clanParticipant.submissionTitle && (
                        <p className="text-[10px] sm:text-[11px] text-foreground/90 font-medium line-clamp-1 italic bg-background/50 px-2 py-1 rounded mt-1.5">
                          &ldquo;{match.clanParticipant.submissionTitle}&rdquo;
                        </p>
                      )}
                    </div>

                    {match.clanParticipant.submissionThumb && (
                      <div className="relative w-full h-28 sm:h-24 rounded-lg overflow-hidden bg-secondary mt-1">
                        <Image src={match.clanParticipant.submissionThumb} alt="Art submission" fill className="object-cover" />
                      </div>
                    )}

                    {match.clanParticipant.score !== undefined && (
                      <div className="flex items-center justify-between pt-1 text-xs border-t border-border/30 mt-1">
                        <span className="text-muted-foreground text-[10px]">Points:</span>
                        <span className="font-bold text-primary">{match.clanParticipant.score.toLocaleString()} VP</span>
                      </div>
                    )}
                  </div>

                  {/* Rival Clan Champion */}
                  <div className="p-2.5 sm:p-3 rounded-xl bg-secondary/30 border border-border/50 flex flex-col justify-between gap-2 w-full">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-secondary relative shrink-0">
                          <Image src={match.rivalParticipant.avatar} alt={match.rivalParticipant.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h5 className="font-heading font-bold text-xs text-foreground truncate">
                            {match.rivalParticipant.name}
                          </h5>
                          <p className="text-[10px] text-muted-foreground truncate">
                            @{match.rivalParticipant.username}
                          </p>
                        </div>
                      </div>

                      {match.rivalParticipant.submissionTitle && (
                        <p className="text-[10px] sm:text-[11px] text-foreground/90 font-medium line-clamp-1 italic bg-background/50 px-2 py-1 rounded mt-1.5">
                          &ldquo;{match.rivalParticipant.submissionTitle}&rdquo;
                        </p>
                      )}
                    </div>

                    {match.rivalParticipant.submissionThumb && (
                      <div className="relative w-full h-28 sm:h-24 rounded-lg overflow-hidden bg-secondary mt-1">
                        <Image src={match.rivalParticipant.submissionThumb} alt="Art submission" fill className="object-cover" />
                      </div>
                    )}

                    {match.rivalParticipant.score !== undefined && (
                      <div className="flex items-center justify-between pt-1 text-xs border-t border-border/30 mt-1">
                        <span className="text-muted-foreground text-[10px]">Points:</span>
                        <span className="font-bold text-accent">{match.rivalParticipant.score.toLocaleString()} VP</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Winner Status Banner or Scheduled Time */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2 text-xs flex-wrap">
                  {isCompleted && match.winnerName ? (
                    <div className="flex items-center gap-1.5 text-green-400 font-bold text-[11px] sm:text-xs truncate">
                      <Trophy className="w-3.5 h-3.5 fill-green-400 shrink-0" />
                      <span className="truncate">Won: {match.winnerName}</span>
                    </div>
                  ) : match.status === "upcoming" ? (
                    <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] sm:text-xs">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{match.scheduledTime}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-primary font-bold text-[11px] sm:text-xs animate-pulse">
                      <Flame className="w-3.5 h-3.5 fill-primary shrink-0" />
                      <span>Voting Open!</span>
                    </div>
                  )}

                  <Badge variant="outline" className="text-[10px] font-bold border-accent/40 text-accent shrink-0 ml-auto">
                    +{match.vpBounty.toLocaleString()} VP
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* 4. SEASON WAR HISTORY ARCHIVE */}
      {warSubTab === "history" && (
        <div className="flex flex-col gap-4 w-full">
          <div className="rounded-2xl bg-card border border-border/70 p-4 sm:p-5 shadow-xl flex flex-col gap-4 w-full overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/40 gap-2">
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-foreground">
                  Genesis Season 1 War Record
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground">
                  Official seasonal battles, multi-disciplinary duels, and clan victories.
                </p>
              </div>

              <Badge className="bg-primary text-primary-foreground font-bold text-xs px-2.5 py-0.5 self-start sm:self-auto">
                2 Wins • 0 Losses
              </Badge>
            </div>

            <div className="divide-y divide-border/40 w-full">
              {history.map((record) => {
                const isWin = record.result === "victory";

                return (
                  <div key={record.id} className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-secondary relative border border-border shrink-0">
                        <Image src={record.opponentCrestUrl} alt={record.opponentClanName} fill className="object-cover" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-secondary text-foreground shrink-0">
                            R{record.roundNumber}
                          </span>
                          <h4 className="font-heading font-bold text-xs sm:text-sm text-foreground truncate">
                            vs. {record.opponentClanName}
                          </h4>
                          {isWin ? (
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 text-[9px] font-bold px-1.5 py-0">
                              VICTORY
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-bold px-1.5 py-0">
                              DEFEAT
                            </Badge>
                          )}
                        </div>

                        <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                          {record.matchType} • {record.endedDate}
                        </p>

                        <p className="text-[10px] sm:text-[11px] text-accent mt-0.5 font-medium truncate">
                          🏆 MVP: {record.mvp}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0 border-t border-border/20 sm:border-0">
                      <span className="text-[10px] font-semibold text-muted-foreground sm:hidden">
                        Final VP Score:
                      </span>
                      <div className="text-right">
                        <p className="text-xs sm:text-sm font-black text-foreground">
                          {record.clanFinalScore.toLocaleString()} - {record.opponentFinalScore.toLocaleString()}
                        </p>
                        <span className="hidden sm:inline-block text-[10px] font-semibold text-muted-foreground">
                          Final VP Score
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
