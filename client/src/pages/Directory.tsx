import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, GraduationCap, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { Link } from "react-router-dom";
import useChatStore from "../store/chatStore";
import { useAuthStore } from "../store/authStore";
import { useToast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Directory = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  
  const { user: currentUser } = useAuthStore();
  const { createRoom, rooms } = useChatStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/users`);
        if (res.data.users && Array.isArray(res.data.users)) {
            setUsers(res.data.users);
        } else if (Array.isArray(res.data)) {
            setUsers(res.data);
        } else {
            setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleMessage = async (targetUser: any) => {
    if (!currentUser) return;
    
    try {
      // 1. Check if chat already exists
      const existingRoom = rooms.find((r: any) => 
        !r.isGroup && r.members.some((m: any) => m._id === targetUser._id)
      );

      if (existingRoom) {
        navigate(`/chat/${existingRoom._id}`);
      } else {
        // 2. Create new chat
        const result = await createRoom(targetUser.name, [targetUser._id]);
        if (result.success) {
           navigate(`/chat/${result.room._id}`);
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to start chat", variant: "destructive" });
    }
  };

  // Filter Logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.center?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = filterBatch ? String(u.batch) === filterBatch : true;
    // Don't show current user in directory
    const isNotMe = u._id !== currentUser?.id;
    return matchesSearch && matchesBatch && isNotMe;
  });

  const batches = [...new Set(users.map(u => u.batch).filter(Boolean))].sort().reverse();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold font-display">Alumni Directory</h1>
            <p className="text-muted-foreground mt-1">Connect with {filteredUsers.length} alumni</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-md bg-card/50 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or center..." 
                  className="pl-10 h-11"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                 <select 
                  className="w-full h-11 rounded-md border border-input bg-background px-3"
                  value={filterBatch}
                  onChange={(e) => setFilterBatch(e.target.value)}
                >
                  <option value="">All Batches</option>
                  {batches.map(b => <option key={String(b)} value={String(b)}>{b}</option>)}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-all group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary">
                        <img src={user.avatarUrl || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex gap-1"><GraduationCap className="w-3 h-3"/> {user.batch}</span>
                          <span className="flex gap-1"><MapPin className="w-3 h-3"/> {user.center}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-border flex gap-2">
                       <Link to={`/profile/${user._id}`} className="flex-1">
                          <Button variant="outline" className="w-full">Profile</Button>
                       </Link>
                       <Button 
                         className="flex-1 gap-2" 
                         onClick={() => handleMessage(user)}
                       >
                         <MessageCircle className="w-4 h-4" /> Message
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Directory;