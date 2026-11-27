"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Hash, 
  Send, 
  Lock, 
  Users, 
  Volume2, 
  MessageSquare, 
  Sparkles,
  Info
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClanChatRoom, ChatMessage } from "../model/clan-detail-types";
import { CreateChatRoomDialog } from "./CreateChatRoomDialog";

interface ClanLiveChatContainerProps {
  clanId: string;
  initialRooms: ClanChatRoom[];
  userRole?: string;
  currentUsername?: string;
}

export function ClanLiveChatContainer({
  clanId,
  initialRooms,
  userRole = "Shadow Monarch",
  currentUsername = "akirakenji_art",
}: ClanLiveChatContainerProps) {
  const [rooms, setRooms] = useState<ClanChatRoom[]>(initialRooms);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(
    initialRooms.length > 0 ? initialRooms[0].id : null
  );
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeRoom = rooms.find((r) => r.id === activeRoomId) || null;

  // Auto-scroll to bottom of live messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeRoom?.messages]);

  const handleRoomCreated = (newRoomData: {
    name: string;
    description: string;
    topic: string;
    isPrivate: boolean;
  }) => {
    const newRoom: ClanChatRoom = {
      id: `room-${Date.now()}`,
      clanId,
      name: newRoomData.name,
      description: newRoomData.description,
      topic: newRoomData.topic,
      isPrivate: newRoomData.isPrivate,
      createdByName: "You",
      createdAt: "Just now",
      activeMembersCount: 1,
      messages: [
        {
          id: `msg-${Date.now()}`,
          roomId: `room-${Date.now()}`,
          sender: {
            username: currentUsername,
            name: "You",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
            role: userRole,
          },
          content: `Welcome to the #${newRoomData.name} live chamber!`,
          timestamp: "Just now",
        },
      ],
    };

    setRooms((prev) => [...prev, newRoom]);
    setActiveRoomId(newRoom.id);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeRoomId) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: activeRoomId,
      sender: {
        username: currentUsername,
        name: "You",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
        role: userRole,
      },
      content: inputMessage.trim(),
      timestamp: "Just now",
    };

    setRooms((prev) =>
      prev.map((room) =>
        room.id === activeRoomId
          ? { ...room, messages: [...room.messages, newMsg] }
          : room
      )
    );

    setInputMessage("");
  };

  return (
    <div className="flex flex-col lg:flex-row h-[620px] rounded-2xl bg-card border border-border/70 overflow-hidden shadow-xl">
      {/* 1. Left Sidebar: Channels / Chat Room Directory */}
      <div className="w-full lg:w-64 bg-secondary/30 border-b lg:border-b-0 lg:border-r border-border/60 flex flex-col shrink-0">
        <div className="p-3.5 flex items-center justify-between border-b border-border/50">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="font-heading font-bold text-xs uppercase tracking-wider text-foreground">
              Clan Rooms
            </span>
          </div>

          {/* New Room Creation Trigger */}
          <CreateChatRoomDialog onRoomCreated={handleRoomCreated} />
        </div>

        {/* Room List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-none">
          {rooms.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground flex flex-col items-center gap-2">
              <Info className="w-5 h-5 text-muted-foreground/60" />
              <span>No active chat rooms. Create a room above to activate live clan chat.</span>
            </div>
          ) : (
            rooms.map((room) => {
              const isActive = room.id === activeRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all group ${
                    isActive
                      ? "bg-primary/15 text-primary font-bold border border-primary/30 shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {room.isPrivate ? (
                      <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
                    ) : (
                      <Hash className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                    )}
                    <span className="text-xs truncate">{room.name}</span>
                  </div>

                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-secondary text-muted-foreground shrink-0">
                    {room.messages.length}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 2. Main Live Chat Chamber (Active Only When a Room Exists) */}
      <div className="flex-1 flex flex-col bg-background/50 min-w-0">
        {activeRoom ? (
          <>
            {/* Room Header Banner */}
            <div className="px-4 py-3 border-b border-border/60 bg-card/60 backdrop-blur-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center text-primary shrink-0">
                  <Hash className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm text-foreground truncate">
                      #{activeRoom.name}
                    </h3>
                    {activeRoom.isPrivate && (
                      <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-accent/40 text-accent font-semibold">
                        Officers Only
                      </Badge>
                    )}
                  </div>
                  {activeRoom.topic && (
                    <p className="text-[11px] text-muted-foreground truncate">
                      {activeRoom.topic}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>{activeRoom.activeMembersCount} hunters</span>
              </div>
            </div>

            {/* Live Message History Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
              {activeRoom.messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 text-foreground group">
                  <Avatar className="w-8 h-8 rounded-full ring-1 ring-border shrink-0 mt-0.5">
                    <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                    <AvatarFallback className="text-[10px]">
                      {msg.sender.name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-xs text-foreground">
                        {msg.sender.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold px-1.5 py-0 rounded bg-secondary">
                        {msg.sender.role}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {msg.timestamp}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-foreground/90 mt-1 leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Live Message Input Bar */}
            <form 
              onSubmit={handleSendMessage}
              className="p-3 border-t border-border/60 bg-card/80 backdrop-blur-sm flex items-center gap-2"
            >
              <input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message #${activeRoom.name}...`}
                className="flex-1 h-10 px-3.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />

              <Button
                type="submit"
                size="icon"
                disabled={!inputMessage.trim()}
                className="w-10 h-10 rounded-xl text-primary-foreground shadow-md hover:brightness-110 active:scale-95 transition-all disabled:opacity-40"
                style={{ background: "var(--gradient-btn)" }}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </Button>
            </form>
          </>
        ) : (
          /* Empty State: If no room exists, prompt creation */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <div className="w-16 h-16 rounded-2xl bg-secondary/50 border border-border/80 flex items-center justify-center text-primary mb-3 shadow-inner">
              <MessageSquare className="w-8 h-8 text-muted-foreground/50 stroke-1" />
            </div>
            <h4 className="font-heading font-bold text-base text-foreground">
              No Live Chat Room Created Yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mt-1 mb-5">
              Live clan chat is enabled only after creating a dedicated chat room. Founders and commanders can establish channels for raids, anime talk, and strategy.
            </p>
            <CreateChatRoomDialog onRoomCreated={handleRoomCreated} />
          </div>
        )}
      </div>
    </div>
  );
}
