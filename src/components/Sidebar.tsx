
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Type, 
  Image, 
  Video, 
  MessageSquare, 
  Mic, 
  Code,
  Settings, 
  Info,
  Moon,
  Sun,
  Bell,
  User,
  HelpCircle,
  Bookmark,
  Search
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme, setTheme } = useTheme();
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => currentPath === path;

  const navigation = [
    { name: "Dashboard", path: "/", icon: <Home size={20} /> },
    { name: "Text Generation", path: "/text", icon: <Type size={20} /> },
    { name: "Image Generation", path: "/image", icon: <Image size={20} /> },
    { name: "Video Generation", path: "/video", icon: <Video size={20} /> },
    { name: "Chat", path: "/chat", icon: <MessageSquare size={20} />, badge: "New" },
    { name: "Voice", path: "/voice", icon: <Mic size={20} /> },
    { name: "Code Generation", path: "/code", icon: <Code size={20} /> },
    { name: "Bookmarks", path: "/bookmarks", icon: <Bookmark size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
    { name: "About", path: "/about", icon: <Info size={20} /> },
  ];

  const filteredNavigation = searchQuery 
    ? navigation.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : navigation;

  const handleClick = () => {
    if (onClose) onClose();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="h-full bg-sidebar flex flex-col drop-shadow-xl border-r border-sidebar-border/30">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={handleClick}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
            <span className="text-white font-bold">EA</span>
          </div>
          <h1 className="text-sidebar-foreground font-bold text-xl font-poppins tracking-tight group-hover:text-primary transition-colors">EliteAI</h1>
        </Link>
      </div>

      {/* Search */}
      <div className="px-4 mb-2">
        {searchVisible ? (
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 rounded-lg bg-sidebar-accent/50 border border-sidebar-border/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            <button 
              className="absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/70 hover:text-primary"
              onClick={() => {
                setSearchQuery("");
                setSearchVisible(false);
              }}
            >
              <Search size={16} />
            </button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full justify-start text-sidebar-foreground/80 bg-sidebar-accent/20 border-sidebar-border/30 hover:bg-sidebar-accent/40"
            onClick={() => setSearchVisible(true)}
          >
            <Search size={16} />
            <span className="ml-2">Search</span>
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border/20 scrollbar-track-transparent">
        {filteredNavigation.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "sidebar-item group relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                active ? "bg-primary/90 text-primary-foreground font-medium shadow-sm hover:bg-primary/80" : "backdrop-blur-sm",
              )}
              onClick={handleClick}
            >
              <span className={cn(
                "text-primary/80 group-hover:text-primary-foreground/90 transition-colors duration-200",
                active && "text-primary-foreground"
              )}>{item.icon}</span>
              <span className="font-medium">{item.name}</span>
              {item.badge && (
                <Badge variant="outline" className={cn(
                  "ml-auto py-0.5 border-sidebar-border/50 text-xs font-medium",
                  active ? "bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20" 
                         : "bg-sidebar-accent text-sidebar-foreground"
                )}>
                  {item.badge}
                </Badge>
              )}
              <span className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full opacity-0 transition-opacity duration-200",
                active ? "opacity-100" : "group-hover:opacity-30"
              )}></span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-3 py-2">
        <Link 
          to="/profile" 
          className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/30 border border-sidebar-border/20 hover:bg-sidebar-accent/50 transition-colors cursor-pointer"
          onClick={handleClick}
        >
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
            <User size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">User Profile</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Manage your account</p>
          </div>
        </Link>
      </div>

      {/* Theme Toggle */}
      <div className="px-4 py-3">
        <button 
          onClick={toggleTheme} 
          className="sidebar-item w-full flex justify-between items-center hover:shadow-sm hover:bg-sidebar-accent/40 backdrop-blur-sm"
        >
          <span className="font-medium flex items-center gap-3">
            <span className="text-primary/80">
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </span>
            Theme
          </span>
          <div className="h-5 w-10 rounded-full bg-sidebar-accent/50 relative flex items-center px-1">
            <div className={cn(
              "absolute h-3.5 w-3.5 rounded-full bg-primary transition-transform duration-200",
              theme === "dark" ? "translate-x-4" : "translate-x-0"
            )}></div>
          </div>
        </button>
      </div>

      {/* Help & Support */}
      <div className="px-4 py-2">
        <button className="sidebar-item w-full flex items-center gap-3 hover:bg-sidebar-accent/40">
          <HelpCircle size={20} className="text-primary/80" />
          <span className="font-medium">Help & Support</span>
        </button>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border/30">
        <div className="text-xs text-sidebar-foreground/60 text-center">
          EliteAI Platform<br /><span className="text-primary/60 font-medium">v1.2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
