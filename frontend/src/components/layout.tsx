import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Users, MessageSquare, Calendar,
  Settings, Sun, Moon, LogOut, Menu, X
} from 'lucide-react';
import { Button } from './ui/button';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Alumni', href: '/alumni', icon: Users },
    { name: 'Chat', href: '/chat', icon: MessageSquare },
    { name: 'Meetups', href: '/meetups', icon: Calendar },
    { name: 'Profile', href: '/settings', icon: Settings },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 p-2 rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="h-6 w-6 text-gray-700 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-700 dark:text-white" />}
      </button>

      {/* Main Wrapper */}
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
              <h1 className="text-xl font-bold text-blue-600">CSRL Alumni</h1>
            </div>
            <nav className="flex-1 p-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)} // close sidebar on mobile link click
                    className={`flex items-center px-4 py-2 mt-2 text-gray-600 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      location.pathname === item.href
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                        : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="ml-3">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t dark:border-gray-700">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 mr-3" />
                ) : (
                  <Moon className="w-5 h-5 mr-3" />
                )}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start mt-2 text-red-600 dark:text-red-400"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
