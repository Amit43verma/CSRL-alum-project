import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  MessageCircle, 
  Calendar, 
  Users, 
  User, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Globe,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Sun,
  Moon,
  ShieldCheck
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuthStore } from "../../store/authStore";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Feed", path: "/feed" },
    { icon: Users, label: "Directory", path: "/directory" },
    { icon: MessageCircle, label: "Messages", path: "/chat" },
    // { icon: Calendar, label: "Events", path: "/events" }, // Uncomment if you implement events
  ];

  // Add Admin Dashboard if user is admin
  if (user?.role === "admin") {
    navItems.splice(1, 0, { icon: LayoutDashboard, label: "Admin", path: "/admin" });
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-card/95 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/feed" className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-primary" />
              <span className="text-xl font-display font-bold text-gradient hidden sm:inline">
                AlumniConnect
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-1 mx-4">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex flex-col items-center gap-0.5 h-14 px-4 rounded-xl",
                      location.pathname === item.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </Button>
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                    <div className="w-8 h-8 bg-secondary rounded-full overflow-hidden">
                       <img src={user?.avatarUrl || "/placeholder.svg"} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="hidden sm:block text-left mr-1">
                        <p className="text-xs font-semibold leading-none">{user?.name}</p>
                        <p className="text-[10px] text-muted-foreground leading-none mt-1">{user?.role}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 hidden sm:block text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user?.id}`} className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                     <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed top-16 left-0 right-0 z-40 bg-card border-b border-border shadow-lg md:hidden"
        >
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 mb-1",
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-16 min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  );
};