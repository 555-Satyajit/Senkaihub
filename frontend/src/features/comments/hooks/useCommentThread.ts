"use client";

import { useState, useCallback } from "react";
import { CommentItem, CommentReplyReference, CreateCommentPayload } from "../model/comment-types";
import { sampleCommentsByPostId } from "../model/sample-comments";

export function useCommentThread(postId: string) {
  const [comments, setComments] = useState<CommentItem[]>(() => {
    return sampleCommentsByPostId[postId] || [];
  });

  // Active reply target
  const [activeReply, setActiveReply] = useState<{
    parentCommentId: string;
    reference: CommentReplyReference;
  } | null>(null);

  const clearActiveReply = useCallback(() => {
    setActiveReply(null);
  }, []);

  const setReplyTarget = useCallback((parentCommentId: string, reference: CommentReplyReference) => {
    setActiveReply({ parentCommentId, reference });
  }, []);

  // Upvote / Downvote (Soul Shards)
  const handleVote = useCallback((commentId: string, direction: "up" | "down") => {
    const updateInTree = (list: CommentItem[]): CommentItem[] => {
      return list.map((item) => {
        if (item.id === commentId) {
          const currentVote = item.userVote;
          let newVote: "up" | "down" | null = direction;
          let diff = 0;

          if (currentVote === direction) {
            newVote = null;
            diff = direction === "up" ? -1 : 1;
          } else if (currentVote === null) {
            diff = direction === "up" ? 1 : -1;
          } else {
            diff = direction === "up" ? 2 : -2;
          }

          return {
            ...item,
            userVote: newVote,
            shardsCount: item.shardsCount + diff,
          };
        }

        if (item.replies && item.replies.length > 0) {
          return {
            ...item,
            replies: updateInTree(item.replies),
          };
        }

        return item;
      });
    };

    setComments((prev) => updateInTree(prev));
  }, []);

  // Add Comment / Reply
  const addComment = useCallback((payload: CreateCommentPayload) => {
    const newComment: CommentItem = {
      id: `comm-${Date.now()}`,
      postId: payload.postId,
      author: {
        name: "You",
        username: "current_user",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
        clan: "Shadow Monarchs",
        clanBadgeColor: "#7940CF",
      },
      content: payload.content,
      createdAt: new Date().toISOString(),
      timeAgo: "Just now",
      shardsCount: 1,
      userVote: "up",
      parentId: payload.parentId || null,
      replyTo: payload.replyTo || undefined,
      isSpoiler: payload.isSpoiler || false,
      replies: [],
    };

    if (!payload.parentId) {
      setComments((prev) => [newComment, ...prev]);
    } else {
      const insertReply = (list: CommentItem[]): CommentItem[] => {
        return list.map((item) => {
          if (item.id === payload.parentId) {
            return {
              ...item,
              replies: [...(item.replies || []), newComment],
            };
          }
          if (item.replies && item.replies.length > 0) {
            return {
              ...item,
              replies: insertReply(item.replies),
            };
          }
          return item;
        });
      };

      setComments((prev) => insertReply(prev));
    }

    setActiveReply(null);
  }, []);

  // Edit Comment (for comment author)
  const editComment = useCallback((commentId: string, newContent: string) => {
    const updateContent = (list: CommentItem[]): CommentItem[] => {
      return list.map((item) => {
        if (item.id === commentId) {
          return { ...item, content: newContent };
        }
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: updateContent(item.replies) };
        }
        return item;
      });
    };

    setComments((prev) => updateContent(prev));
  }, []);

  // Delete / Remove Comment (for comment author OR post owner)
  const deleteComment = useCallback((commentId: string) => {
    const removeFromTree = (list: CommentItem[]): CommentItem[] => {
      return list
        .filter((item) => item.id !== commentId)
        .map((item) => {
          if (item.replies && item.replies.length > 0) {
            return { ...item, replies: removeFromTree(item.replies) };
          }
          return item;
        });
    };

    setComments((prev) => removeFromTree(prev));
  }, []);

  // Toggle Pin Comment (for post owner)
  const togglePinComment = useCallback((commentId: string) => {
    const updatePin = (list: CommentItem[]): CommentItem[] => {
      return list.map((item) => {
        if (item.id === commentId) {
          return { ...item, isPinned: !item.isPinned };
        }
        // Unpin others if pinning this one at top level
        if (item.replies && item.replies.length > 0) {
          return { ...item, replies: updatePin(item.replies) };
        }
        return item;
      });
    };

    setComments((prev) => updatePin(prev));
  }, []);

  return {
    comments,
    activeReply,
    setReplyTarget,
    clearActiveReply,
    handleVote,
    addComment,
    editComment,
    deleteComment,
    togglePinComment,
  };
}
