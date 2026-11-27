export interface ClanMember {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: string;
  rankLevel: number;
  vpContributed: number;
  isOnline: boolean;
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  sender: {
    username: string;
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
}

export interface ClanChatRoom {
  id: string;
  clanId: string;
  name: string;
  description: string;
  topic?: string;
  isPrivate?: boolean;
  minRankLevel?: number; // Permission level to view/chat
  createdByName: string;
  createdAt: string;
  activeMembersCount: number;
  messages: ChatMessage[];
}

export interface WarMatchParticipant {
  id: string;
  name: string;
  username: string;
  avatar: string;
  clanName: string;
  submissionTitle?: string;
  submissionThumb?: string;
  score?: number;
}

export interface WarDisciplineMatch {
  id: string;
  discipline: "painting" | "singing" | "cosplay" | "puzzle" | "quiz";
  title: string;
  status: "live" | "completed" | "upcoming";
  scheduledTime?: string;
  clanParticipant: WarMatchParticipant;
  rivalParticipant: WarMatchParticipant;
  winnerClanId?: string; // id or clan name of winner if completed
  winnerName?: string;
  vpBounty: number;
}

export interface SeasonWarHistoryItem {
  id: string;
  seasonName: string;
  roundNumber: number;
  matchType: string;
  opponentClanName: string;
  opponentCrestUrl: string;
  clanFinalScore: number;
  opponentFinalScore: number;
  result: "victory" | "defeat" | "draw";
  mvp: string;
  endedDate: string;
}

export interface ClanDetail {
  id: string;
  name: string;
  tier: string;
  category: string;
  bannerUrl: string;
  crestUrl: string;
  motto: string;
  vpBounty: string;
  rating: number;
  reviewCount: number;
  memberCount: string;
  leader: {
    name: string;
    username: string;
    avatar: string;
    title: string;
  };
  warStatus: {
    seasonTitle: string;
    seasonRound: string;
    rivalClanName: string;
    rivalCrestUrl: string;
    clanScore: number;
    rivalScore: number;
    endsIn: string;
    phase: string;
    activeMatches: WarDisciplineMatch[];
    seasonHistory: SeasonWarHistoryItem[];
  };
  chatRooms: ClanChatRoom[];
  members: ClanMember[];
}
