import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "in-person" | "virtual" | "hybrid";
  attendees: number;
  maxAttendees: number;
  image: string;
  tags: string[];
  isRegistered: boolean;
}

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const events: Event[] = [
    {
      id: "1",
      title: "Annual Alumni Reunion 2025",
      description: "Join us for our biggest networking event of the year! Connect with fellow alumni, enjoy great food, and celebrate our community.",
      date: "December 15, 2025",
      time: "6:00 PM - 10:00 PM",
      location: "Grand Ballroom, University Campus",
      type: "in-person",
      attendees: 234,
      maxAttendees: 500,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
      tags: ["Networking", "Reunion", "Food"],
      isRegistered: true,
    },
    {
      id: "2",
      title: "Tech Industry Panel Discussion",
      description: "Learn from industry leaders about the latest trends in technology and get career advice from successful alumni.",
      date: "December 20, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual (Zoom)",
      type: "virtual",
      attendees: 89,
      maxAttendees: 200,
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800",
      tags: ["Tech", "Career", "Panel"],
      isRegistered: false,
    },
    {
      id: "3",
      title: "Startup Founders Meetup",
      description: "Connect with fellow alumni entrepreneurs, share experiences, and explore collaboration opportunities.",
      date: "January 10, 2026",
      time: "7:00 PM - 9:00 PM",
      location: "Innovation Hub, Downtown",
      type: "hybrid",
      attendees: 45,
      maxAttendees: 100,
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
      tags: ["Startup", "Networking", "Business"],
      isRegistered: false,
    },
    {
      id: "4",
      title: "Alumni Mentorship Program Kickoff",
      description: "Be part of our new mentorship program connecting experienced professionals with recent graduates.",
      date: "January 15, 2026",
      time: "5:00 PM - 7:00 PM",
      location: "Career Center",
      type: "in-person",
      attendees: 67,
      maxAttendees: 150,
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
      tags: ["Mentorship", "Career", "Growth"],
      isRegistered: true,
    },
  ];

  const getTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "in-person":
        return "bg-accent text-accent-foreground";
      case "virtual":
        return "bg-primary text-primary-foreground";
      case "hybrid":
        return "bg-highlight text-highlight-foreground";
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground mt-1">Discover and join alumni events</p>
          </div>
          <Button className="bg-gradient-primary hover:shadow-glow gap-2 w-fit">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        {/* Search & Filters */}
        <Card className="border-0 shadow-lg mb-6">
          <CardContent className="py-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-9 bg-muted/50 border-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-muted/50 p-1 mb-6">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-card">
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="registered" className="data-[state=active]:bg-card">
              My Events
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-card">
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <Badge className={`absolute top-4 left-4 ${getTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      {event.isRegistered && (
                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                          Registered
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 text-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4 text-primary" />
                          {event.attendees} / {event.maxAttendees} attendees
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        {event.isRegistered ? (
                          <Button variant="outline" className="flex-1">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button className="flex-1 bg-gradient-primary hover:shadow-glow">
                            Register Now
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registered">
            <div className="grid md:grid-cols-2 gap-6">
              {events
                .filter((e) => e.isRegistered)
                .map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <CardContent className="pt-4">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">No Past Events</h3>
                <p className="text-muted-foreground text-sm">
                  Past events will appear here after they've concluded.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Events;
