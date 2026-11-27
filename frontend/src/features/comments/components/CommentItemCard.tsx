"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronUp, 
  MoreVertical, 
  EyeOff, 
  Eye, 
  Pin,
  PinOff,
  Pencil,
  Trash2,
  Flag,
  CornerDownRight,
  Check,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SoulShardIcon } from "@/components/icons/soul-shard-icon";
import { CommentItem, CommentReplyReference, CreateCommentPayload } from "../model/comment-types";
import { CommentInputBar } from "./CommentInputBar";

interface CommentItemCardProps {
  comment: CommentItem;
  depth?: number;
  currentUsername?: string;
  postOwnerUsername?: string;
  onVote: (commentId: string, direction: "up" | "down") => void;
  onAddComment: (payload: CreateCommentPayload) => void;
  onEditComment?: (commentId: string, newContent: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onTogglePin?: (commentId: string) => void;
}

export function CommentItemCard({
  comment,
  depth = 0,
  currentUsername = "current_user",
  postOwnerUsername = "akirakenji_art",
  onVote,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onTogglePin,
}: CommentItemCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showSpoiler, setShowSpoiler] = useState(!comment.isSpoiler);
  const [reported, setReported] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const replyCount = comment.replies ? comment.replies.length : 0;

  // Permissions
  const isAuthor = comment.author.username === currentUsername;
  const isPostOwner = postOwnerUsername === currentUsername;

  const handleInlineSubmit = (payload: CreateCommentPayload) => {
    onAddComment(payload);
    setIsReplying(false);
    setShowReplies(true);
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && onEditComment) {
      onEditComment(comment.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleReport = () => {
    setReported(true);
    setTimeout(() => setReported(false), 3000);
  };

  return (
    <div className={`flex items-start gap-3 sm:gap-4 text-foreground ${depth > 0 ? "mt-3" : "mt-4"}`}>
      {/* Avatar */}
      <Link href={`/profile/${comment.author.username}`} className="shrink-0 mt-0.5">
        <Avatar className={`${depth > 0 ? "w-6 h-6 sm:w-7 sm:h-7" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-full ring-1 ring-border/50`}>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback className="text-[10px] sm:text-xs">
            {comment.author.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </Link>

      {/* Main Comment Body */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        {/* Header: @username, Clan badge, Time + 3-Dots Dropdown */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Link 
              href={`/profile/${comment.author.username}`}
              className="text-xs sm:text-[13px] font-semibold text-foreground hover:underline"
            >
              @{comment.author.username}
            </Link>

            {comment.author.clan && (
              <Badge
                variant="outline"
                className="text-[9px] px-1.5 py-0 h-4 rounded-md border-border bg-secondary/60 text-muted-foreground font-medium shrink-0"
              >
                {comment.author.clan}
              </Badge>
            )}

            {comment.isPinned && (
              <Badge 
                variant="default"
                className="text-[9px] px-1.5 py-0 h-4 bg-accent text-accent-foreground font-semibold flex items-center gap-1"
              >
                <Pin className="w-2.5 h-2.5" /> Pinned by author
              </Badge>
            )}

            <span className="text-[11px] sm:text-xs text-muted-foreground">
              {comment.timeAgo}
            </span>
          </div>

          {/* 3-Dots Menu with Role-Based Permissions */}
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="More options"
                className="w-7 h-7 rounded-full text-muted-foreground hover:text-foreground shrink-0"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </Button>
            } />
            <DropdownMenuContent align="end" className="w-48 bg-card border border-border/80 shadow-xl rounded-xl p-1 z-50">
              {/* Post Owner Options */}
              {isPostOwner && (
                <>
                  <DropdownMenuItem
                    onClick={() => onTogglePin && onTogglePin(comment.id)}
                    className="flex items-center gap-2 text-xs py-2 px-2.5 cursor-pointer rounded-lg hover:bg-secondary/80"
                  >
                    {comment.isPinned ? (
                      <>
                        <PinOff className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>Unpin comment</span>
                      </>
                    ) : (
                      <>
                        <Pin className="w-3.5 h-3.5 text-accent" />
                        <span>Pin comment</span>
                      </>
                    )}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => onDeleteComment && onDeleteComment(comment.id)}
                    className="flex items-center gap-2 text-xs py-2 px-2.5 cursor-pointer rounded-lg text-destructive hover:bg-destructive/15"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    <span>Remove comment</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-border/40" />
                </>
              )}

              {/* Comment Author Options */}
              {isAuthor && !isPostOwner && (
                <>
                  <DropdownMenuItem
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-xs py-2 px-2.5 cursor-pointer rounded-lg hover:bg-secondary/80"
                  >
                    <Pencil className="w-3.5 h-3.5 text-foreground" />
                    <span>Edit comment</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => onDeleteComment && onDeleteComment(comment.id)}
                    className="flex items-center gap-2 text-xs py-2 px-2.5 cursor-pointer rounded-lg text-destructive hover:bg-destructive/15"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    <span>Delete comment</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 bg-border/40" />
                </>
              )}

              {/* Author edit if post owner is also comment author */}
              {isAuthor && isPostOwner && (
                <DropdownMenuItem
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 text-xs py-2 px-2.5 cursor-pointer rounded-lg hover:bg-secondary/80"
                >
                  <Pencil className="w-3.5 h-3.5 text-foreground" />
                  <span>Edit comment</span>
                </DropdownMenuItem>
              )}

              {/* Report option (Available for non-authors, or as standard community reporting) */}
              {!isAuthor && (
                <DropdownMenuItem
                  onClick={handleReport}
                  className="flex items-center gap-2 text-xs py-2 px-2.5 cursor-pointer rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>{reported ? "Reported to Clan mods" : "Report"}</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* WhatsApp Quoted Preview Banner */}
        {comment.replyTo && (
          <div className="my-1 pl-2.5 py-1 border-l-2 border-primary bg-primary/10 rounded-r-lg text-xs flex flex-col gap-0.5">
            <div className="flex items-center gap-1 font-semibold text-primary text-[11px]">
              <CornerDownRight className="w-3 h-3" />
              Replying to @{comment.replyTo.authorUsername}
            </div>
            <div className="text-muted-foreground text-[11px] line-clamp-1 italic">
              &ldquo;{comment.replyTo.snippet}&rdquo;
            </div>
          </div>
        )}

        {/* Comment Text or Inline Edit Mode */}
        {isEditing ? (
          <div className="flex flex-col gap-2 my-1">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={2}
              className="w-full bg-secondary/50 border border-border rounded-xl p-2.5 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary resize-none leading-relaxed"
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditContent(comment.content);
                  setIsEditing(false);
                }}
                className="h-7 px-3 rounded-full text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={!editContent.trim()}
                className="h-7 px-3 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:brightness-110"
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-xs sm:text-[13px] leading-relaxed text-foreground/90">
            {comment.isSpoiler && !showSpoiler ? (
              <div 
                onClick={() => setShowSpoiler(true)}
                className="flex items-center gap-2 p-2 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive-foreground cursor-pointer hover:bg-destructive/20 transition-colors my-1"
              >
                <EyeOff className="w-4 h-4 text-destructive shrink-0" />
                <span className="text-xs font-medium">
                  Spoiler alert ({comment.spoilerEpisode || "Anime Plot"}). Tap to reveal.
                </span>
              </div>
            ) : (
              <div>
                <p className="whitespace-pre-wrap">{comment.content}</p>
                {comment.isSpoiler && (
                  <button
                    onClick={() => setShowSpoiler(false)}
                    className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground mt-1"
                  >
                    <Eye className="w-3 h-3" /> Hide spoiler
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* YouTube Interaction Bar: Like (Flame / Shard) + Reply */}
        <div className="flex items-center gap-2 pt-1 -ml-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote(comment.id, "up")}
            aria-label="Upvote comment"
            className={`h-7 px-2 gap-1.5 rounded-full text-xs transition-colors ${
              comment.userVote === "up" 
                ? "text-primary hover:text-primary font-bold bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SoulShardIcon 
              filled={comment.userVote === "up"} 
              className={`w-3.5 h-3.5 ${comment.userVote === "up" ? "text-primary" : "text-muted-foreground"}`} 
            />
            {comment.shardsCount > 0 && <span>{comment.shardsCount}</span>}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsReplying(!isReplying)}
            className="h-7 px-2.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          >
            Reply
          </Button>
        </div>

        {/* Inline YouTube Reply Box */}
        {isReplying && (
          <div className="pt-2">
            <CommentInputBar
              postId={comment.postId}
              isInlineReply={true}
              placeholder={`Reply to @${comment.author.username}...`}
              activeReply={{
                parentCommentId: comment.parentId || comment.id,
                reference: {
                  id: comment.id,
                  authorUsername: comment.author.username,
                  snippet: comment.content.length > 55 ? comment.content.slice(0, 55) + "..." : comment.content,
                },
              }}
              onCancelReply={() => setIsReplying(false)}
              onSubmitComment={handleInlineSubmit}
            />
          </div>
        )}

        {/* YouTube Style Expandable Replies Dropdown Pill ("978 replies v") */}
        {hasReplies && (
          <div className="pt-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              className="h-8 px-3 rounded-full text-xs font-semibold text-primary hover:bg-primary/10 gap-2 transition-colors"
            >
              {showReplies ? (
                <>
                  <ChevronUp className="w-4 h-4 text-primary" />
                  <span>Hide {replyCount} {replyCount === 1 ? "reply" : "replies"}</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 text-primary" />
                  <span>{replyCount} {replyCount === 1 ? "reply" : "replies"}</span>
                </>
              )}
            </Button>

            {/* Nested Replies Stream */}
            {showReplies && (
              <div className="flex flex-col gap-3 pt-2">
                {comment.replies!.map((reply) => (
                  <CommentItemCard
                    key={reply.id}
                    comment={reply}
                    depth={depth + 1}
                    currentUsername={currentUsername}
                    postOwnerUsername={postOwnerUsername}
                    onVote={onVote}
                    onAddComment={onAddComment}
                    onEditComment={onEditComment}
                    onDeleteComment={onDeleteComment}
                    onTogglePin={onTogglePin}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
