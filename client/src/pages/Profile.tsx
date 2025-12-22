import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuthStore } from "../store/authStore";
import useChatStore from "../store/chatStore";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();
  const { createRoom, rooms } = useChatStore();
  const { toast } = useToast();
  
  const [profileUser, setProfileUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const isOwnProfile = !id || id === currentUser?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (isOwnProfile) {
          setProfileUser(currentUser);
        } else {
          const res = await axios.get(`${API_URL}/users/${id}`);
          setProfileUser(res.data.user || res.data); // Handle potential wrapper
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id, currentUser, isOwnProfile]);

  const handleMessage = async () => {
    if (!profileUser || isOwnProfile) return;

    try {
      const existingRoom = rooms.find((r: any) => 
        !r.isGroup && r.members.some((m: any) => m._id === profileUser._id)
      );

      if (existingRoom) {
        navigate(`/chat/${existingRoom._id}`);
      } else {
        const result = await createRoom(profileUser.name, [profileUser._id]);
        if (result.success) {
           navigate(`/chat/${result.room._id}`);
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to start chat", variant: "destructive" });
    }
  };

  if (loading) return <AppLayout><div className="p-10 text-center">Loading...</div></AppLayout>;
  if (!profileUser) return <AppLayout><div className="p-10 text-center">User not found</div></AppLayout>;

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Card className="border-0 shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-primary/10"></div>
          <CardContent className="pt-0 relative">
            <div className="flex flex-col md:flex-row items-end justify-between -mt-12 mb-4">
              <div className="flex items-end gap-4">
                <div className="w-32 h-32 bg-background rounded-full border-4 border-card overflow-hidden">
                   <img src={profileUser.avatarUrl || "/placeholder.svg"} className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h1 className="text-3xl font-bold">{profileUser.name}</h1>
                  <p className="text-muted-foreground">{profileUser.role}</p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 md:mt-0">
                {!isOwnProfile && (
                  <Button onClick={handleMessage} className="gap-2">
                    <MessageCircle className="w-4 h-4" /> Message
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                   <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="w-4 h-4" /> {profileUser.email}
                   </div>
                   <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-4 h-4" /> Batch: {profileUser.batch}
                   </div>
                   <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" /> Center: {profileUser.center}
                   </div>
                </div>
                <div>
                   <h3 className="font-semibold mb-2">Bio</h3>
                   <p className="text-sm text-muted-foreground">
                      {profileUser.bio || "No bio available."}
                   </p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;