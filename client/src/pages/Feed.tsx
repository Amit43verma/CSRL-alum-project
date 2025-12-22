import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/AppLayout";
import { usePostStore } from "../store/postStore";
import { useAuthStore } from "../store/authStore";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify"; // <--- IMPORT THIS

const Feed = () => {
  const { user } = useAuthStore();
  const { posts, loadFeed, createPost, likePost, loading: postsLoading } = usePostStore();
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    await createPost(newPostContent, null); 
    setNewPostContent("");
  };

  const handleLike = (postId: string) => {
    likePost(postId);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="h-20 bg-primary/10"></div>
              <CardContent className="pt-0 -mt-10">
                <div className="w-20 h-20 bg-background rounded-full border-4 border-card mx-auto mb-4 overflow-hidden">
                    <img src={user?.avatarUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.batch} • {user?.center}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Create Post Widget */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-secondary">
                     <img src={user?.avatarUrl || "/placeholder.svg"} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Share something with your network..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="bg-muted/50 border-0 h-12 mb-4"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground"><ImageIcon className="w-5 h-5 mr-2" />Photo</Button>
                      </div>
                      <Button onClick={handleCreatePost} disabled={!newPostContent.trim()} className="bg-primary text-primary-foreground">
                        <Send className="w-4 h-4 mr-2" /> Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts List */}
            {postsLoading && <p className="text-center text-muted-foreground">Loading posts...</p>}
            
            {!postsLoading && posts.length === 0 && (
                <p className="text-center text-muted-foreground py-10">No posts yet. Be the first to share something!</p>
            )}

            {posts.map((post: any, index: number) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
                             <img src={post.user?.avatarUrl || "/placeholder.svg"} alt={post.user?.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{post.user?.name || "Unknown User"}</h4>
                          <p className="text-sm text-muted-foreground">{post.user?.role || "Alumni"}</p>
                          <p className="text-xs text-muted-foreground">
                            {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ""}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon"><MoreHorizontal className="w-5 h-5" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* --- CHANGED SECTION START --- */}
                    {/* Using prose class to style HTML content */}
                    <div 
                      className="text-foreground mb-4 leading-relaxed prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                    />
                    {/* --- CHANGED SECTION END --- */}
                    
                    {post.mediaUrl && (
                      <div className="rounded-xl overflow-hidden mb-4">
                         <img src={`http://localhost:5000${post.mediaUrl}`} alt="Post content" className="w-full h-auto" />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`gap-2 ${post.likes?.includes(user?.id) ? "text-red-500" : "text-muted-foreground"}`}
                        onClick={() => handleLike(post._id)}
                      >
                        <Heart className={`w-5 h-5 ${post.likes?.includes(user?.id) ? "fill-current" : ""}`} />
                        {post.likesCount || post.likes?.length || 0}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <MessageCircle className="w-5 h-5" />
                        {post.commentsCount || post.comments?.length || 0}
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                        <Share2 className="w-5 h-5" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
             {/* Future widgets */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Feed;