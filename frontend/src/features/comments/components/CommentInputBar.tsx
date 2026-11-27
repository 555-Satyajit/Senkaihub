"use client";

import { useState, useRef, useEffect } from "react";
import { Smile, AlertTriangle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CommentReplyReference, CreateCommentPayload } from "../model/comment-types";

interface CommentInputBarProps {
  postId: string;
  activeReply?: {
    parentCommentId: string;
    reference: CommentReplyReference;
  } | null;
  onCancelReply?: () => void;
  onSubmitComment: (payload: CreateCommentPayload) => void;
  isInlineReply?: boolean;
  placeholder?: string;
  initialContent?: string;
}

export function CommentInputBar({
  postId,
  activeReply,
  onCancelReply,
  onSubmitComment,
  isInlineReply = false,
  placeholder = "Add a comment...",
  initialContent = "",
}: CommentInputBarProps) {
  const [content, setContent] = useState(initialContent);
  const [isFocused, setIsFocused] = useState(false);
  const [isSpoiler, setIsSpoiler] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize without default browser scrollbar
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [content]);

  const handleCancel = () => {
    setContent("");
    setIsFocused(false);
    setIsSpoiler(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    if (onCancelReply) {
      onCancelReply();
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) return;

    onSubmitComment({
      postId,
      content: content.trim(),
      parentId: activeReply?.parentCommentId || null,
      replyTo: activeReply?.reference || null,
      isSpoiler,
    });

    setContent("");
    setIsFocused(false);
    setIsSpoiler(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const showActions = isFocused || content.trim().length > 0 || isInlineReply;

  return (
    <div className="w-full flex items-start gap-3 sm:gap-4 my-2">
      {/* Avatar */}
      <Avatar className={`${isInlineReply ? "w-6 h-6 sm:w-7 sm:h-7" : "w-9 h-9 sm:w-10 sm:h-10"} rounded-full overflow-hidden shrink-0 mt-0.5`}>
        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="Current user" />
        <AvatarFallback className="text-xs">U</AvatarFallback>
      </Avatar>

      {/* YouTube Style Animated Underline Input */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="relative w-full">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              adjustHeight();
            }}
            onFocus={() => setIsFocused(true)}
            rows={1}
            placeholder={placeholder}
            className="w-full bg-transparent border-0 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none pb-1.5 resize-none leading-relaxed overflow-hidden block scrollbar-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          />

          {/* Static gray underline */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/80" />

          {/* YouTube animated expanding underline from center */}
          <div 
            className={`absolute bottom-0 left-0 right-0 h-[2px] bg-foreground transition-transform duration-200 ease-out origin-center ${
              isFocused ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>

        {/* YouTube Action Buttons Row (Only when focused or non-empty) */}
        {showActions && (
          <div className="flex items-center justify-between pt-2.5 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                aria-label="Add emoji"
                className="w-8 h-8 rounded-full text-muted-foreground hover:text-foreground"
              >
                <Smile className="w-4 h-4" />
              </Button>

              <button
                type="button"
                onClick={() => setIsSpoiler(!isSpoiler)}
                className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors ${
                  isSpoiler
                    ? "bg-destructive/20 text-destructive border border-destructive/40"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                {isSpoiler ? "Spoiler Marked" : "Spoiler"}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="rounded-full text-xs font-semibold px-3.5 h-8 text-foreground hover:bg-secondary/70"
              >
                Cancel
              </Button>

              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="rounded-full text-xs font-semibold px-4 h-8 bg-primary text-primary-foreground hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all"
              >
                {isInlineReply ? "Reply" : "Comment"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
