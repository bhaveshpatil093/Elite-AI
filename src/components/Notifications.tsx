
import React, { useState } from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Info, MessageSquare, Zap, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "alert" | "message" | "update";
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      message: "New feature available: Try voice generation!", 
      time: "10 minutes ago", 
      read: false,
      type: "update"
    },
    { 
      id: 2, 
      message: "Your API usage is at 80% this month", 
      time: "2 hours ago", 
      read: false,
      type: "alert"
    },
    { 
      id: 3, 
      message: "Welcome to EliteAI! Start exploring our AI tools.", 
      time: "1 day ago", 
      read: true,
      type: "info"
    },
    { 
      id: 4, 
      message: "Your image generation was completed successfully", 
      time: "3 days ago", 
      read: true,
      type: "info"
    },
    { 
      id: 5, 
      message: "Check out our tutorial on advanced prompting", 
      time: "5 days ago", 
      read: true,
      type: "message"
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  const handleClearAll = () => {
    setNotifications([]);
  };
  
  const filterNotifications = (tab: string) => {
    if (tab === "all") return notifications;
    if (tab === "unread") return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === tab);
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case "info": return <Info size={16} className="text-blue-500" />;
      case "alert": return <Zap size={16} className="text-amber-500" />;
      case "message": return <MessageSquare size={16} className="text-green-500" />;
      case "update": return <Bell size={16} className="text-purple-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell size={18} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            <span>Notifications</span>
            {notifications.length > 0 && (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                  <Check size={14} className="mr-1" />
                  <span className="text-xs">Mark all read</span>
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  <X size={14} className="mr-1" />
                  <span className="text-xs">Clear all</span>
                </Button>
              </div>
            )}
          </SheetTitle>
        </SheetHeader>
        
        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="outline" className="ml-1 bg-primary/10 text-primary text-[10px] h-4 min-w-4 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="update">Updates</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="flex-1 overflow-y-auto">
            {filterNotifications(activeTab).length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Bell size={48} className="text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground">No notifications to display</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filterNotifications(activeTab).map((notification) => (
                  <div 
                    key={notification.id} 
                    className={cn(
                      "p-3 rounded-lg hover:bg-secondary/40 transition-colors relative",
                      !notification.read && "bg-primary/5 border-l-2 border-primary"
                    )}
                  >
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted/80 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          "text-sm",
                          !notification.read && "font-medium"
                        )}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check size={14} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
