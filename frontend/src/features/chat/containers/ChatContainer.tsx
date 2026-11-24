"use client";

import { useState, useRef } from "react";
import { Search, Edit } from "lucide-react";
import { ChatConversation, mockChatConversations } from "../model/chat-types";
import { ChatListItem } from "../components/ChatListItem";
import { ChatHeader } from "../components/ChatHeader";
import { ChatMessageBubble } from "../components/ChatMessageBubble";
import { ChatInput } from "../components/ChatInput";

interface ChatContainerProps {
  onMobileChatOpenChange?: (open: boolean) => void;
}

export function ChatContainer({ onMobileChatOpenChange }: ChatContainerProps) {
  const [conversations, setConversations] = useState<ChatConversation[]>(mockChatConversations);
  const [selectedChatId, setSelectedChatId] = useState<string>(mockChatConversations[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const setMobileChatOpen = (open: boolean) => {
    setIsMobileChatOpen(open);
    onMobileChatOpenChange?.(open);
  };

  const filteredConversations = conversations.filter((c) =>
    c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeChat = conversations.find((c) => c.id === selectedChatId) || conversations[0];

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    setMobileChatOpen(true);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: undefined } : c))
    );
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      senderId: "me",
      text: messageInput.trim(),
      timestamp: "Just now",
      isMe: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedChatId
          ? {
              ...c,
              lastMessage: newMsg.text,
              lastMessageTime: "Just now",
              messages: [...c.messages, newMsg],
            }
          : c
      )
    );

    setMessageInput("");
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="w-full h-full min-h-0 flex-1 flex flex-col md:flex-row overflow-hidden bg-background">
      
      {/* LEFT COLUMN: Chat List */}
      <div
        className={`w-full md:w-[380px] lg:w-[420px] shrink-0 border-r border-border/50 flex flex-col min-h-0 h-full bg-background ${
          isMobileChatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Sticky Page Header: Title + Search */}
        <div className="sticky top-0 z-20 px-4 pt-3.5 pb-3 sm:px-5 border-b border-border/40 bg-background/95 backdrop-blur-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="font-heading font-black text-xl text-foreground tracking-tight">
              Messages
            </h1>
            <button
              type="button"
              className="w-9 h-9 rounded-full bg-secondary/70 hover:bg-secondary text-foreground flex items-center justify-center transition-colors cursor-pointer"
              title="New Message"
              aria-label="New Message"
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search"
              aria-label="Search conversations"
              className="w-full h-11 pl-4 pr-11 rounded-2xl bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Conversation List with scroll-fade */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-2.5 custom-scrollbar scroll-fade-b pb-16 md:pb-6 touch-pan-y">
          {filteredConversations.map((conv) => (
            <ChatListItem
              key={conv.id}
              conversation={conv}
              isSelected={conv.id === selectedChatId}
              onSelect={handleSelectChat}
            />
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: Active Conversation Window */}
      <div
        className={`flex-1 min-h-0 h-full flex flex-col bg-background/50 ${
          !isMobileChatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Active Chat Header */}
        <ChatHeader
          user={activeChat.user}
          onBack={() => setMobileChatOpen(false)}
        />

        {/* Message Stream */}
        <div className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain touch-pan-y scroll-fade-y custom-scrollbar">
          <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
            {activeChat.messages.map((msg) => (
              <ChatMessageBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Sticky Message Input Bar */}
        <ChatInput
          value={messageInput}
          onChange={setMessageInput}
          onSubmit={handleSendMessage}
          recipientName={activeChat.user.name}
        />
      </div>
    </div>
  );
}
