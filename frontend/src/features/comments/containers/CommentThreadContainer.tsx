"use client";

import { useCommentThread } from "../hooks/useCommentThread";
import { CommentItemCard } from "../components/CommentItemCard";
import { CommentInputBar } from "../components/CommentInputBar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommentThreadContainerProps {
  postId: string;
  postOwnerUsername?: string;
  currentUsername?: string;
}

export function CommentThreadContainer({ 
  postId,
  postOwnerUsername = "akirakenji_art",
  currentUsername = "current_user",
}: CommentThreadContainerProps) {
  const {
    comments,
    handleVote,
    addComment,
    editComment,
    deleteComment,
    togglePinComment,
  } = useCommentThread(postId);

  const totalCommentsCount = comments.reduce((acc, curr) => {
    return acc + 1 + (curr.replies ? curr.replies.length : 0);
  }, 0);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. YouTube Header: "X Comments   ☰ Sort by" */}
      <div className="flex items-center gap-6 pt-2">
        <h2 className="font-heading font-bold text-lg sm:text-xl text-foreground tracking-tight">
          {totalCommentsCount.toLocaleString()} Comments
        </h2>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-2 text-xs sm:text-sm font-semibold text-foreground hover:bg-secondary/60 rounded-lg px-2.5"
        >
          <Menu className="w-4 h-4" />
          <span>Sort by</span>
        </Button>
      </div>

      {/* 2. Top-level YouTube Comment Input */}
      <div className="pb-1">
        <CommentInputBar
          postId={postId}
          onSubmitComment={addComment}
        />
      </div>

      {/* 3. YouTube-Style Stream of Comments */}
      <div className="flex flex-col gap-4 sm:gap-5 pt-1">
        {comments.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-xs sm:text-sm">
            No comments yet. Be the first to start the conversation!
          </div>
        ) : (
          comments.map((comment) => (
            <CommentItemCard
              key={comment.id}
              comment={comment}
              depth={0}
              currentUsername={currentUsername}
              postOwnerUsername={postOwnerUsername}
              onVote={handleVote}
              onAddComment={addComment}
              onEditComment={editComment}
              onDeleteComment={deleteComment}
              onTogglePin={togglePinComment}
            />
          ))
        )}
      </div>
    </div>
  );
}
