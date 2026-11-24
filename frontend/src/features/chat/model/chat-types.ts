export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  statusBadge?: string; // e.g. "1h", "Active", "AFK"
  clan: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface ChatConversation {
  id: string;
  user: ChatUser;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  messages: ChatMessage[];
}

export const mockChatConversations: ChatConversation[] = [
  {
    id: "conv-1",
    user: {
      id: "u-1",
      name: "Joanna Evans",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      isOnline: true,
      clan: "Shadow Monarchs",
    },
    lastMessage: "See you on the next meeting! 😂",
    lastMessageTime: "34 min",
    unreadCount: 3,
    messages: [
      { id: "m1", senderId: "u-1", text: "Hey AlterSky, are you joining the clan raid tonight?", timestamp: "6:15 PM", isMe: false },
      { id: "m2", senderId: "me", text: "Yeah! Getting my shadow extract ready.", timestamp: "6:20 PM", isMe: true },
      { id: "m3", senderId: "u-1", text: "See you on the next meeting! 😂", timestamp: "6:28 PM", isMe: false },
    ],
  },
  {
    id: "conv-2",
    user: {
      id: "u-2",
      name: "Lana Smith",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      isOnline: false,
      statusBadge: "1h",
      clan: "Demon Slayer Corps",
    },
    lastMessage: "I'm doing my homework, but need to take ...",
    lastMessageTime: "1 hour",
    messages: [
      { id: "m1", senderId: "u-2", text: "Did you catch episode 7 of the Hashira Training?", timestamp: "4:10 PM", isMe: false },
      { id: "m2", senderId: "me", text: "The animation was insane!", timestamp: "4:12 PM", isMe: true },
      { id: "m3", senderId: "u-2", text: "I'm doing my homework, but need to take a break soon...", timestamp: "5:00 PM", isMe: false },
    ],
  },
  {
    id: "conv-3",
    user: {
      id: "u-3",
      name: "Marina Martinez",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
      isOnline: true,
      clan: "Jujutsu Sorcerers",
    },
    lastMessage: "I'm watching Friends, what are u doin? 😍",
    lastMessageTime: "1 hour",
    unreadCount: 1,
    messages: [
      { id: "m1", senderId: "u-3", text: "Hey! What anime are you bingeing this weekend?", timestamp: "4:45 PM", isMe: false },
      { id: "m2", senderId: "u-3", text: "I'm watching Friends, what are u doin? 😍", timestamp: "5:05 PM", isMe: false },
    ],
  },
  {
    id: "conv-4",
    user: {
      id: "u-4",
      name: "Thomas Fricilone",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
      isOnline: false,
      clan: "Straw Hat Fleet",
    },
    lastMessage: "Yeap, I'm going to travel in To...",
    lastMessageTime: "2 hour",
    messages: [
      { id: "m1", senderId: "u-4", text: "Planning the trip to Akihabara next month!", timestamp: "2:30 PM", isMe: false },
      { id: "m2", senderId: "u-4", text: "Yeap, I'm going to travel in Tokyo first.", timestamp: "3:10 PM", isMe: false },
    ],
  },
  {
    id: "conv-5",
    user: {
      id: "u-5",
      name: "Jamie Franco",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      isOnline: false,
      clan: "Akatsuki",
    },
    lastMessage: "I'm watching Friends, what are u doin?",
    lastMessageTime: "3 hour",
    messages: [
      { id: "m1", senderId: "u-5", text: "Hey! Sent you the new chapter scans.", timestamp: "1:00 PM", isMe: false },
    ],
  },
  {
    id: "conv-6",
    user: {
      id: "u-6",
      name: "Willow Rosenberg",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      isOnline: true,
      clan: "Survey Corps",
    },
    lastMessage: "Really find the subject very interesting 😍",
    lastMessageTime: "1 hour",
    unreadCount: 1,
    messages: [
      { id: "m1", senderId: "u-6", text: "Did you read the lore analysis on the founding titan?", timestamp: "12:15 PM", isMe: false },
      { id: "m2", senderId: "u-6", text: "Really find the subject very interesting 😍", timestamp: "12:45 PM", isMe: false },
    ],
  },
];
