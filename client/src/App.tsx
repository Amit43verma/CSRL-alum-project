import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster as HotToast } from "react-hot-toast"; 
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";

// Stores
import { useAuthStore } from "./store/authStore";
import useChatStore from "./store/chatStore";
import { usePostStore } from "./store/postStore";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Directory from "./pages/Directory";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification"; // <--- IMPORT THIS
import ResetPassword from "./pages/ResetPassword";     // <--- IMPORT THIS
import AdminDashboard from "./pages/AdminDashboard";   // <--- IMPORT THIS (If you added it)

const queryClient = new QueryClient();

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore();
  if (loading) return <div className="flex h-screen items-center justify-center"><span className="loading loading-spinner">Loading...</span></div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Admin Route Wrapper
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthStore();
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/feed" replace />;
  return <>{children}</>;
};

const App = () => {
  const { loadFromStorage, user } = useAuthStore();
  const { initializeSocket: initializeChatSocket, disconnectSocket: disconnectChatSocket } = useChatStore();
  const { initializeSocket: initializePostSocket, disconnectSocket: disconnectPostSocket } = usePostStore();
  const [authLoaded, setAuthLoaded] = useState(false);

  // Load User from LocalStorage on mount
  useEffect(() => {
    loadFromStorage().then(() => setAuthLoaded(true));
  }, [loadFromStorage]);

  // Manage Sockets
  useEffect(() => {
    if (user) {
      initializeChatSocket();
      initializePostSocket();
    } else {
      disconnectChatSocket();
      disconnectPostSocket();
    }
    return () => {
      disconnectChatSocket();
      disconnectPostSocket();
    };
  }, [user, initializeChatSocket, disconnectChatSocket, initializePostSocket, disconnectPostSocket]);

  if (!authLoaded) return null; 

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <HotToast position="top-right" />
          <Toaster />
          <Sonner />
          
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={user ? <Navigate to="/feed" /> : <Index />} />
              <Route path="/login" element={user ? <Navigate to="/feed" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/feed" /> : <Signup />} />
              
              {/* Auth Flow Routes - THESE WERE MISSING */}
              <Route path="/verify-otp" element={<OtpVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/chat/:roomId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/directory" element={<ProtectedRoute><Directory /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Admin Route */}
              <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;