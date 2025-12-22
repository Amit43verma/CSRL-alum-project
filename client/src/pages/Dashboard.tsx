import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Eye, 
  Heart,
  ArrowUpRight,
  Clock,
  Bell,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Connections", value: "248", change: "+12", icon: Users, trend: "up" },
  { label: "Profile Views", value: "1,429", change: "+23%", icon: Eye, trend: "up" },
  { label: "Messages", value: "34", change: "5 new", icon: MessageCircle, trend: "neutral" },
  { label: "Events Joined", value: "8", change: "+2", icon: Calendar, trend: "up" },
];

const recentActivity = [
  { type: "connection", user: "Sarah Chen", action: "accepted your connection request", time: "2 hours ago", avatar: "SC" },
  { type: "like", user: "Michael Park", action: "liked your post", time: "5 hours ago", avatar: "MP" },
  { type: "comment", user: "Emily Watson", action: "commented on your photo", time: "1 day ago", avatar: "EW" },
  { type: "event", user: "Tech Alumni Meetup", action: "starts tomorrow at 6 PM", time: "Reminder", avatar: "TA" },
];

const upcomingEvents = [
  { title: "Annual Alumni Gala", date: "Dec 15, 2025", attendees: 234, type: "Networking" },
  { title: "Tech Industry Panel", date: "Dec 20, 2025", attendees: 89, type: "Career" },
  { title: "Virtual Coffee Chat", date: "Dec 22, 2025", attendees: 45, type: "Social" },
];

const quickActions = [
  { label: "Update Profile", path: "/profile", icon: Star },
  { label: "Browse Directory", path: "/directory", icon: Users },
  { label: "View Events", path: "/events", icon: Calendar },
  { label: "Send Message", path: "/chat", icon: MessageCircle },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome back, John! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in your alumni network today.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.change}
                    </Badge>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View All
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white text-sm font-medium">
                        {activity.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{activity.user}</span>{" "}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.time}
                        </p>
                      </div>
                      {activity.type === "like" && (
                        <Heart className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions & Upcoming Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Quick Actions */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.path}>
                      <Button
                        variant="outline"
                        className="w-full h-auto py-4 flex flex-col items-center gap-2 hover:bg-primary/5 hover:border-primary/30"
                      >
                        <action.icon className="w-5 h-5 text-primary" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  <Link to="/events">
                    <Button variant="ghost" size="sm" className="text-primary">
                      See All
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-sm text-foreground">{event.title}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.attendees} attending
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
