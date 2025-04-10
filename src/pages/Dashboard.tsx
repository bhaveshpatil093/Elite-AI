
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Type, 
  Image, 
  Video, 
  MessageSquare, 
  Mic, 
  Code,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Star,
  BarChart,
  Calendar
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("tools");
  
  const tools = [
    {
      title: "Text Generation",
      description: "Create professional content with advanced AI",
      icon: <Type size={40} className="text-primary" />,
      path: "/text",
      popular: true
    },
    {
      title: "Image Generation",
      description: "Transform ideas into stunning visuals",
      icon: <Image size={40} className="text-primary" />,
      path: "/image",
      new: true
    },
    {
      title: "Video Generation",
      description: "Create engaging video content effortlessly",
      icon: <Video size={40} className="text-primary" />,
      path: "/video",
    },
    {
      title: "Chat",
      description: "Have intelligent conversations with AI",
      icon: <MessageSquare size={40} className="text-primary" />,
      path: "/chat",
      popular: true
    },
    {
      title: "Voice Generation",
      description: "Convert text to natural-sounding speech",
      icon: <Mic size={40} className="text-primary" />,
      path: "/voice",
    },
    {
      title: "Code Generation",
      description: "Generate code in multiple languages",
      icon: <Code size={40} className="text-primary" />,
      path: "/code",
    },
  ];

  const recentProjects = [
    { id: 1, title: "Marketing Campaign Copy", type: "Text", date: "3 hours ago", starred: true },
    { id: 2, title: "Product Showcase Video", type: "Video", date: "Yesterday", starred: false },
    { id: 3, title: "Landing Page Design", type: "Image", date: "2 days ago", starred: true },
    { id: 4, title: "Customer Support Bot", type: "Chat", date: "1 week ago", starred: false },
  ];

  const usageStats = [
    { title: "API Calls", value: "1,287", change: "+12.5%", icon: <Zap size={20} className="text-green-500" /> },
    { title: "Active Projects", value: "23", change: "+5", icon: <TrendingUp size={20} className="text-blue-500" /> },
    { title: "Usage Time", value: "34h", change: "+2.3h", icon: <Clock size={20} className="text-purple-500" /> },
  ];

  const upcomingEvents = [
    { date: "Apr 15", title: "New AI Model Release", description: "Improved performance for image generation" },
    { date: "Apr 22", title: "Webinar: Advanced Prompting", description: "Learn to craft perfect prompts" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <section className={cn(
        "p-8 md:p-10 rounded-xl text-center space-y-8 relative overflow-hidden",
        theme === 'dark' ? 'card-glass-dark' : 'card-glass',
        "border border-primary/10 shadow-xl"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl"></div>
        
        <div className="relative">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 -z-10 animate-pulse blur-2xl rounded-full bg-primary/20"></div>
              <Sparkles size={56} className="text-primary" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-poppins bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Welcome to EliteAI
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-muted-foreground mt-4">
            Unlock the power of AI to transform your ideas into reality with our comprehensive suite of creative tools.
          </p>
          <div className="flex flex-wrap justify-center gap-5 pt-6">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/text">
                <Zap size={16} className="mr-1" />
                Try Text Generation
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 bg-background/50 backdrop-blur-sm">
              <Link to="/image">
                <Image size={16} className="mr-1" />
                Explore Images
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="tools" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
          <TabsTrigger value="recent">Recent Projects</TabsTrigger>
          <TabsTrigger value="stats">Usage Stats</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>

        {/* AI Tools Tab */}
        <TabsContent value="tools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card 
                key={index} 
                className={cn(
                  "overflow-hidden border border-border/50 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] duration-300",
                  theme === 'dark' ? 'bg-card/40 backdrop-blur-sm' : 'bg-card/90 backdrop-blur-sm'
                )}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
                      {tool.icon}
                    </div>
                    <div className="flex gap-2">
                      {tool.popular && (
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                          Popular
                        </Badge>
                      )}
                      {tool.new && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                          New
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-poppins">{tool.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{tool.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    asChild 
                    variant="ghost" 
                    className="flex items-center gap-2 text-primary hover:bg-primary/5 transition-all group w-full justify-between"
                  >
                    <Link to={tool.path}>
                      <span>Try it now</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Projects Tab */}
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={20} />
                Recent Projects
              </CardTitle>
              <CardDescription>Your most recently created content and projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map(project => (
                  <div key={project.id} className="flex items-center justify-between p-3 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                        {project.type === "Text" && <Type size={20} className="text-primary" />}
                        {project.type === "Image" && <Image size={20} className="text-primary" />}
                        {project.type === "Video" && <Video size={20} className="text-primary" />}
                        {project.type === "Chat" && <MessageSquare size={20} className="text-primary" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">{project.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className={project.starred ? "text-yellow-500" : "text-muted-foreground"}>
                        <Star size={16} />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ArrowRight size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Projects</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Usage Stats Tab */}
        <TabsContent value="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usageStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardDescription className="flex items-center gap-2">
                    {stat.icon}
                    {stat.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-sm font-medium text-green-500">{stat.change}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart size={20} />
                Monthly Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[200px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>API Usage Chart Placeholder</p>
                <p className="text-sm">Interactive chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar size={20} />
                Upcoming Events
              </CardTitle>
              <CardDescription>Stay updated with the latest EliteAI events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex gap-4 p-3 rounded-lg border border-border/40 hover:bg-muted/30 transition-colors">
                    <div className="h-14 w-14 rounded-md bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                      <span className="text-xs font-medium">2023</span>
                      <span className="text-sm font-bold">{event.date}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">View All Events</Button>
              <Button variant="outline">Add to Calendar</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Start Guide */}
      <section className={`${theme === 'dark' ? 'card-glass-dark' : 'card-glass'} p-6 md:p-8 rounded-xl border border-border/50`}>
        <h2 className="text-2xl font-bold mb-6 font-poppins flex items-center gap-2">
          <Zap size={20} className="text-primary" />
          Quick Start Guide
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
          <li className="animate-slide-in p-3 rounded-lg hover:bg-primary/5 transition-colors border border-border/20" style={{ animationDelay: '0.1s' }}>
            Set up your API keys in the <Link to="/settings" className="text-primary hover:underline font-medium">Settings</Link> page
          </li>
          <li className="animate-slide-in p-3 rounded-lg hover:bg-primary/5 transition-colors border border-border/20" style={{ animationDelay: '0.2s' }}>
            Choose one of the AI tools from the dashboard or sidebar
          </li>
          <li className="animate-slide-in p-3 rounded-lg hover:bg-primary/5 transition-colors border border-border/20" style={{ animationDelay: '0.3s' }}>
            Enter your prompt or parameters and generate content
          </li>
          <li className="animate-slide-in p-3 rounded-lg hover:bg-primary/5 transition-colors border border-border/20" style={{ animationDelay: '0.4s' }}>
            Download or copy your results
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Dashboard;
