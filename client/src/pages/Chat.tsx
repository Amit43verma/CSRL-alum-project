import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  Search, Send, Phone, Video, MoreVertical, Paperclip, 
  Smile, Check, CheckCheck, Circle, Plus, UserPlus, MessageCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import useChatStore from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

// Ensure this matches your Vite setup
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Chat = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { 
    rooms, 
    messages, 
    currentRoom, // <--- FIXED: Changed from activeRoom to currentRoom
    loadRooms, 
    joinRoom, 
    createRoom, 
    sendMessage, 
    onlineUsers 
  } = useChatStore();
  const { toast } = useToast();
  
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat and Load Rooms
  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  // Handle Deep Linking / URL navigation
  useEffect(() => {
    if (roomId && rooms.length > 0) {
      // If URL has a roomId, join it immediately
      // FIXED: Used currentRoom here
      if (currentRoom?._id !== roomId) {
        joinRoom(roomId);
      }
    }
  }, [roomId, rooms, joinRoom, currentRoom]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle User Search for New Chat
  useEffect(() => {
    const searchUsers = async () => {
      if (!userSearchTerm.trim()) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await axios.get(`${API_URL}/users?name=${userSearchTerm}`);
        const users = (res.data.users || []).filter((u: any) => u._id !== user?.id);
        setSearchResults(users);
      } catch (error) {
        console.error("User search failed", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(searchUsers, 500);
    return () => clearTimeout(timeoutId);
  }, [userSearchTerm, user?.id]);

  const handleRoomSelect = (id: string) => {
    navigate(`/chat/${id}`);
    joinRoom(id);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentRoom) return;
    await sendMessage(newMessage); 
    
    setNewMessage("");
  };

  const handleStartNewChat = async (targetUser: any) => {
    try {
      const existingRoom = rooms.find((r: any) => 
        !r.isGroup && r.members.some((m: any) => m._id === targetUser._id)
      );

      if (existingRoom) {
        handleRoomSelect(existingRoom._id);
      } else {
        const result = await createRoom(targetUser.name, [targetUser._id]);
        if (result.success) {
           handleRoomSelect(result.room._id);
        }
      }
      setIsNewChatOpen(false);
      setUserSearchTerm("");
    } catch (error) {
      toast({ title: "Error", description: "Failed to start chat", variant: "destructive" });
    }
  };

  const getChatPartner = (room: any) => {
    if (!room.members) return { name: "Unknown", avatar: "" };
    const partner = room.members.find((m: any) => m._id !== user?.id) || room.members[0];
    return {
      name: partner?.name || "Unknown User",
      avatar: partner?.avatarUrl || "/placeholder.svg",
      id: partner?._id,
      isOnline: onlineUsers.has(partner?._id)
    };
  };

  const filteredRooms = rooms.filter((room: any) => {
    const partner = getChatPartner(room);
    return partner.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <AppLayout>
      <div className="h-[calc(100vh-4rem)] flex bg-background">
        {/* Sidebar */}
        <div className={`w-full md:w-80 border-r border-border flex flex-col bg-card ${currentRoom ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-border space-y-4">
            <div className="flex items-center justify-between">
               <h2 className="text-xl font-bold">Messages</h2>
               <Dialog open={isNewChatOpen} onOpenChange={setIsNewChatOpen}>
                 <DialogTrigger asChild>
                   <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary">
                     <Plus className="w-5 h-5" />
                   </Button>
                 </DialogTrigger>
                 <DialogContent>
                   <DialogHeader>
                     <DialogTitle>New Conversation</DialogTitle>
                   </DialogHeader>
                   <div className="space-y-4 pt-4">
                     <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                       <Input 
                         placeholder="Search users..." 
                         className="pl-9"
                         value={userSearchTerm}
                         onChange={(e) => setUserSearchTerm(e.target.value)}
                       />
                     </div>
                     <div className="max-h-[300px] overflow-y-auto space-y-2">
                       {searchResults.map((u: any) => (
                         <div 
                           key={u._id} 
                           className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
                           onClick={() => handleStartNewChat(u)}
                         >
                           <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                             <img src={u.avatarUrl || "/placeholder.svg"} alt={u.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                             <p className="font-medium text-sm">{u.name}</p>
                             <p className="text-xs text-muted-foreground">{u.batch}</p>
                           </div>
                           <UserPlus className="w-4 h-4 ml-auto text-muted-foreground" />
                         </div>
                       ))}
                     </div>
                   </div>
                 </DialogContent>
               </Dialog>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 bg-muted/50 border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredRooms.map((room: any) => {
              const partner = getChatPartner(room);
              // FIXED: Used currentRoom here
              const isActive = currentRoom?._id === room._id;
              
              return (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleRoomSelect(room._id)}
                  className={cn(
                    "flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-border/50",
                    isActive ? "bg-muted" : "hover:bg-muted/50"
                  )}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                      <img src={partner.avatar} alt={partner.name} className="w-full h-full object-cover" />
                    </div>
                    {partner.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{partner.name}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {room.updatedAt ? formatDistanceToNow(new Date(room.updatedAt), { addSuffix: true }) : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground truncate">
                        {room.lastMessage?.text || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        {/* FIXED: Used currentRoom for conditional rendering */}
        <div className={`flex-1 flex flex-col ${!currentRoom ? 'hidden md:flex' : 'flex'}`}>
          {currentRoom ? (
            <>
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border bg-card">
                 <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => navigate('/chat')}>
                      <MoreVertical className="w-5 h-5 rotate-90" />
                    </Button>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                       <img src={getChatPartner(currentRoom).avatar} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{getChatPartner(currentRoom).name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {getChatPartner(currentRoom).isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                 </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                {messages.length === 0 && (
                 <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                    <MessageCircle className="w-12 h-12 mb-2" />
                    <p>No messages yet. Say hello!</p>
                 </div>
                )}
                {messages.map((message: any, index: number) => {
                  const isSent = message.sender._id === user?.id;
                  return (
                    <div key={message._id || index} className={`flex ${isSent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${isSent ? "bg-primary text-primary-foreground" : "bg-card shadow-sm"}`}>
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-end gap-1 mt-1 ${isSent ? "text-white/70" : "text-muted-foreground"}`}>
                           <span className="text-[10px]">
                              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </span>
                           {isSent && message.status === 'read' && <CheckCheck className="w-3 h-3" />}
                           {isSent && message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                           {isSent && message.status === 'sent' && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="bg-muted/50 border-0"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
               <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Select a conversation</h3>
                  <Button className="mt-4" onClick={() => setIsNewChatOpen(true)}>Start New Chat</Button>
               </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;