
import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/20 shadow-sm backdrop-blur-lg bg-background/80 py-4 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="h-4 w-4 fill-red-500 text-red-500 animate-pulse" />
          <span>by Team Elite</span>
          <span className="ml-1">🇮🇳</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Twitter
          </a>
        </div>
        
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} EliteAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
