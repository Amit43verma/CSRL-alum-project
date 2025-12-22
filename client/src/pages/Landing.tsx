import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, MessageCircle, Globe, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-network.png";
import iconConnect from "@/assets/icon-connect.png";
import iconCelebrate from "@/assets/icon-celebrate.png";
import iconReunite from "@/assets/icon-reunite.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Globe className="w-8 h-8 text-primary" />
              <span className="text-2xl font-display font-bold text-gradient">AlumniConnect</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link to="/login">
                <Button variant="ghost" className="font-semibold">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:shadow-glow">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
                Connect with
                <span className="text-gradient block mt-2">Alumni Worldwide</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join thousands of alumni building meaningful connections, sharing experiences, and creating opportunities together.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow text-lg px-8 py-6 rounded-full">
                    Join the Network
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2">
                  Learn More
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
                <div>
                  <div className="text-4xl font-bold text-gradient">10K+</div>
                  <div className="text-sm text-muted-foreground mt-1">Active Alumni</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient">500+</div>
                  <div className="text-sm text-muted-foreground mt-1">Events</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gradient">50+</div>
                  <div className="text-sm text-muted-foreground mt-1">Countries</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img src={heroImage} alt="Alumni Network" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
              </div>
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-lg font-semibold"
              >
                🎓 Join Today
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-display font-bold mb-4">
              Everything You Need to
              <span className="text-gradient block mt-2">Stay Connected</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to help alumni reconnect, network, and grow together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: iconConnect,
                title: "Global Network",
                description: "Connect with alumni across the globe, discover opportunities, and build meaningful relationships",
                color: "from-primary to-accent",
              },
              {
                icon: iconReunite,
                title: "Reunite & Grow",
                description: "Organize reunions, mentorship programs, and professional networking events with ease",
                color: "from-accent to-highlight",
              },
              {
                icon: iconCelebrate,
                title: "Celebrate Together",
                description: "Share achievements, milestones, and memories with your alumni community",
                color: "from-highlight to-primary",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-8 hover-lift group"
              >
                <div className="relative w-20 h-20 mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 rounded-2xl`}></div>
                  <img src={feature.icon} alt={feature.title} className="relative z-10 w-full h-full object-contain p-2" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-12 h-12 text-accent mb-4" />
              <h2 className="text-4xl font-display font-bold mb-6">
                Real-time Communication
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Experience seamless conversations with WhatsApp-like features including instant messaging, read receipts, typing indicators, and online status tracking.
              </p>
              <div className="space-y-4">
                {[
                  { icon: MessageCircle, text: "Instant messaging with delivery status" },
                  { icon: Users, text: "Create and manage group chats" },
                  { icon: Calendar, text: "Share and coordinate events" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-foreground"
                  >
                    <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass p-8 rounded-3xl shadow-xl">
                <div className="space-y-4">
                  {[
                    { name: "Sarah Chen", message: "Great to reconnect!", time: "2m ago", online: true },
                    { name: "James Wilson", message: "See you at the reunion!", time: "5m ago", online: true },
                    { name: "Maria Garcia", message: "Thanks for the opportunity!", time: "1h ago", online: false },
                  ].map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-4 bg-card rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
                        {chat.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent rounded-full border-2 border-card"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{chat.name}</p>
                          <span className="text-xs text-muted-foreground">{chat.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAxNmMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAgMTZjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl font-display font-bold mb-6">
              Ready to Reconnect with Your Alumni Community?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of alumni who are already building meaningful connections and creating opportunities together.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl">
                  Create Free Account
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-2 border-white text-white hover:bg-white/10">
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>10,000+ Active Users</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>50+ Countries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>100% Free to Join</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-6 h-6 text-primary" />
                <span className="text-xl font-display font-bold">AlumniConnect</span>
              </div>
              <p className="text-secondary-foreground/70">
                Building bridges between alumni worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-secondary-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-secondary-foreground/70">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-foreground/20 pt-8 text-center text-secondary-foreground/70">
            <p>&copy; 2025 AlumniConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
