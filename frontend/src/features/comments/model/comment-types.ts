export interface CommentAuthor {
  name: string;
  username: string;
  avatar: string;
  clan: string;
  clanBadgeColor?: string;
  verified?: boolean;
}

export interface CommentReplyReference {
  id: string;
  authorUsername: string;
  snippet: string;
}

export interface CommentItem {
  id: string;
  postId: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  timeAgo: string;
  shardsCount: number; // Reddit/SenkaiHub upvotes
  userVote?: "up" | "down" | null;
  replyTo?: CommentReplyReference; // WhatsApp-style quote context
  parentId?: string | null;
  replies?: CommentItem[];
  isPinned?: boolean;
  isSpoiler?: boolean;
  spoilerEpisode?: string;
}

export interface CreateCommentPayload {
  postId: string;
  content: string;
  parentId?: string | null;
  replyTo?: CommentReplyReference | null;
  isSpoiler?: boolean;
}
