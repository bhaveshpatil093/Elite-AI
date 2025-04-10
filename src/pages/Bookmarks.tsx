
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Image, Type, Video, MessageSquare, Code, Mic, Star, Clock, Trash2, PenLine, FolderPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const Bookmarks = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("all");
  
  const bookmarks = [
    {
      id: 1,
      title: "Product Description Generator",
      description: "AI tool that creates compelling product descriptions for e-commerce.",
      type: "text",
      tags: ["marketing", "e-commerce"],
      createdAt: "2 days ago",
      favorite: true
    },
    {
      id: 2,
      title: "Company Logo Design",
      description: "Modern logo design for tech startup using image generation.",
      type: "image",
      tags: ["design", "branding"],
      createdAt: "1 week ago",
      favorite: false
    },
    {
      id: 3,
      title: "Product Demo Script",
      description: "Script for product demonstration video for software launch.",
      type: "text",
      tags: ["marketing", "script"],
      createdAt: "3 days ago",
      favorite: true
    },
    {
      id: 4,
      title: "Customer Support Bot",
      description: "Intelligent bot trained on company FAQs for customer service.",
      type: "chat",
      tags: ["support", "automation"],
      createdAt: "5 days ago",
      favorite: false
    },
    {
      id: 5,
      title: "Homepage Hero Animation",
      description: "Explainer video for website homepage to showcase product features.",
      type: "video",
      tags: ["marketing", "website"],
      createdAt: "1 day ago",
      favorite: true
    },
    {
      id: 6,
      title: "React Component Generator",
      description: "Generate React components with proper TypeScript typings.",
      type: "code",
      tags: ["development", "frontend"],
      createdAt: "4 days ago",
      favorite: false
    }
  ];
  
  const filteredBookmarks = activeTab === "all" 
    ? bookmarks 
    : activeTab === "favorites" 
      ? bookmarks.filter(b => b.favorite) 
      : bookmarks.filter(b => b.type === activeTab);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text": return <Type size={20} className="text-blue-500" />;
      case "image": return <Image size={20} className="text-purple-500" />;
      case "video": return <Video size={20} className="text-pink-500" />;
      case "chat": return <MessageSquare size={20} className="text-green-500" />;
      case "code": return <Code size={20} className="text-orange-500" />;
      case "voice": return <Mic size={20} className="text-cyan-500" />;
      default: return <Star size={20} className="text-yellow-500" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "text": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "image": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "video": return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "chat": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "code": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "voice": return "bg-cyan-500/10 text-cyan-500 border-cyan-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bookmarks</h1>
          <p className="text-muted-foreground">Save and organize your favorite AI-generated content</p>
        </div>
        <Button className="gap-2">
          <FolderPlus size={16} />
          New Collection
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList className="grid grid-cols-3 sm:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <div className="relative w-full sm:w-auto">
            <input 
              type="text" 
              placeholder="Search bookmarks..." 
              className="h-9 px-3 py-2 rounded-md bg-background border border-input w-full"
            />
          </div>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          {filteredBookmarks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-muted/30 rounded-lg border border-border/50">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star size={32} className="text-primary/70" />
              </div>
              <h3 className="text-xl font-medium mb-2">No bookmarks found</h3>
              <p className="text-muted-foreground mb-6">You haven't saved any {activeTab !== "all" && activeTab !== "favorites" ? activeTab : ""} bookmarks yet.</p>
              <Button>Create Something New</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map((bookmark) => (
                <Card 
                  key={bookmark.id} 
                  className={cn(
                    "overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all hover:scale-[1.01] duration-300",
                    theme === 'dark' ? 'bg-card/40 backdrop-blur-sm' : 'bg-card/90 backdrop-blur-sm'
                  )}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-muted/50">
                          {getTypeIcon(bookmark.type)}
                        </div>
                        <Badge variant="secondary" className={getTypeBadgeColor(bookmark.type)}>
                          {bookmark.type.charAt(0).toUpperCase() + bookmark.type.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex">
                        <Button variant="ghost" size="icon" className={bookmark.favorite ? "text-yellow-500" : "text-muted-foreground"}>
                          <Star size={16} />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mt-2">{bookmark.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{bookmark.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2">
                      {bookmark.tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="bg-muted/50 hover:bg-muted text-muted-foreground">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock size={12} className="mr-1" />
                      {bookmark.createdAt}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PenLine size={14} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Bookmarks;
