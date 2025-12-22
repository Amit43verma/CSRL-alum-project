import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, MapPin, Briefcase, GraduationCap, Link as LinkIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAuthStore } from "../store/authStore";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const Settings = () => {
  const { user, updateUser } = useAuthStore();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
    location: user?.center || "", // Using center as location
    skills: user?.skills?.join(", ") || "",
    linkedin: user?.socialLinks?.linkedin || "",
    github: user?.socialLinks?.github || "",
    website: user?.socialLinks?.website || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Process skills from comma-separated string to array
      const skillsArray = formData.skills.split(",").map(s => s.trim()).filter(Boolean);
      
      const payload = {
        name: formData.name,
        bio: formData.bio,
        center: formData.location, // allow updating center/location
        skills: skillsArray,
        socialLinks: {
            linkedin: formData.linkedin,
            github: formData.github,
            website: formData.website
        }
      };

      const res = await axios.put(`${API_URL}/users/profile`, payload);
      
      // Update local store
      updateUser(res.data);
      
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not save changes. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>
        
        <div className="grid gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your public profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <User className="w-4 h-4" /> Full Name
                      </label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Center / Location
                      </label>
                      <Input 
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})} 
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    <Textarea 
                      placeholder="Tell us about yourself..." 
                      className="min-h-[100px]"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Briefcase className="w-4 h-4" /> Skills (Comma separated)
                    </label>
                    <Input 
                      placeholder="React, Node.js, Leadership..." 
                      value={formData.skills}
                      onChange={(e) => setFormData({...formData, skills: e.target.value})}
                    />
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <h3 className="font-medium">Social Links</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Input 
                          placeholder="LinkedIn URL" 
                          value={formData.linkedin}
                          onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Input 
                          placeholder="GitHub URL" 
                          value={formData.github}
                          onChange={(e) => setFormData({...formData, github: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Input 
                          placeholder="Portfolio Website" 
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={loading} className="w-full md:w-auto gap-2">
                      {loading ? "Saving..." : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;