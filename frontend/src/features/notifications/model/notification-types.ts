export type NotificationType = "comment" | "like" | "follow" | "tag" | "clan_war" | "vault_unlock";

export interface NotificationItemData {
  id: string;
  type: NotificationType;
  actor: {
    name: string;
    avatar: string;
  };
  content: string; // e.g. "Commented On Your Post", "Liked Your Post."
  targetPreview?: string; // Optional context or quote
  time: string; // e.g. "Just now", "1 Hour ago", "Yesterday"
  isUnread: boolean;
  linkHref?: string;
}

export const mockNotifications: NotificationItemData[] = [
  {
    id: "notif-1",
    type: "comment",
    actor: {
      name: "Reny Lewis",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    content: "Commented On Your Post",
    targetPreview: "The shading on Sung Jin-woo's daggers is insane!",
    time: "Just now",
    isUnread: true,
    linkHref: "/feed",
  },
  {
    id: "notif-2",
    type: "like",
    actor: {
      name: "Reny Lewis",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    },
    content: "Liked Your Post.",
    time: "1 Hour ago",
    isUnread: true,
    linkHref: "/feed",
  },
  {
    id: "notif-3",
    type: "follow",
    actor: {
      name: "Reny Lewis",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    },
    content: "Started Following You",
    time: "3 Hours ago",
    isUnread: true,
    linkHref: "/profile",
  },
  {
    id: "notif-4",
    type: "tag",
    actor: {
      name: "Reny Lewis",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    },
    content: "Tagged You In A Post",
    targetPreview: "Solo Leveling Raid Tactics discussion",
    time: "6 Hours ago",
    isUnread: false,
    linkHref: "/feed",
  },
  {
    id: "notif-5",
    type: "clan_war",
    actor: {
      name: "Shadow Monarchs",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
    },
    content: "Declared War on Demon Slayer Corps!",
    time: "8 Hours ago",
    isUnread: false,
    linkHref: "/clan-wars",
  },
  {
    id: "notif-6",
    type: "comment",
    actor: {
      name: "Reny Lewis",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    },
    content: "Commented On Your Post.",
    time: "14 Hours ago",
    isUnread: false,
    linkHref: "/feed",
  },
  {
    id: "notif-7",
    type: "follow",
    actor: {
      name: "Reny Lewis",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    },
    content: "Started Following You",
    time: "Yesterday",
    isUnread: false,
    linkHref: "/profile",
  },
  {
    id: "notif-8",
    type: "vault_unlock",
    actor: {
      name: "Solo Leveling Clan Vault",
      avatar: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=150&auto=format&fit=crop&q=80",
    },
    content: "Unlocked Secret Concept Art Tier 3",
    time: "Yesterday",
    isUnread: false,
    linkHref: "/feed",
  },
];
