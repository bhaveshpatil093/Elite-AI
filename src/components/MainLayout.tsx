
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useTheme } from "@/components/ThemeProvider";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Notifications from "./Notifications";
import Footer from "./Footer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          size="icon" 
          variant="ghost" 
          onClick={toggleMobileMenu}
          className="bg-background/80 backdrop-blur-md border border-border/20 shadow-md"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Mobile sidebar */}
      <div 
        className={cn(
          "fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-md transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full w-[280px] bg-sidebar">
          <Sidebar onClose={() => setMobileMenuOpen(false)} />
        </div>
        <div 
          className="absolute inset-0 bg-black/10" 
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      </div>
      
      {/* Desktop sidebar */}
      <div className="hidden md:block md:w-64 flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header / Toolbar */}
        <header className="sticky top-0 z-30 w-full h-16 backdrop-blur-lg bg-background/80 border-b border-border/20 px-4 md:px-6 flex items-center justify-end gap-2 shadow-sm">
          <div className="flex-1 md:flex-none md:w-72">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="w-full h-9 pl-9 pr-4 rounded-full bg-muted/50 border border-border/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              />
            </div>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Notifications />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="default" 
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none"
          >
            <span className="text-xs font-medium">Upgrade to Pro</span>
          </Button>
        </header>
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
      
      {/* Animated Gradient Background */}
      <div 
        className={`fixed inset-0 -z-10 transform-gpu overflow-hidden blur-3xl ${resolvedTheme === 'dark' ? 'opacity-8' : 'opacity-15'}`}
        aria-hidden="true"
      >
        <div
          className={`relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 left-[calc(50%-30rem)] rotate-[30deg] bg-gradient-to-tr from-purple-500 via-pink-400 to-violet-600 opacity-30 sm:w-[72.1875rem]`}
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div 
        className={`fixed inset-0 -z-10 transform-gpu overflow-hidden blur-3xl ${resolvedTheme === 'dark' ? 'opacity-8' : 'opacity-15'}`}
        aria-hidden="true"
      >
        <div
          className={`relative aspect-[1155/678] w-[36.125rem] translate-x-1/3 left-[calc(50%+30rem)] -translate-y-1/3 rotate-[30deg] bg-gradient-to-tr from-blue-500 via-emerald-400 to-cyan-600 opacity-30 sm:w-[72.1875rem]`}
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
};

export default MainLayout;
