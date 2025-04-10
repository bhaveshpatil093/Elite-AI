
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className={`${theme === 'dark' ? 'card-glass-dark' : 'card-glass'} p-8 text-center max-w-md mx-auto animate-scale-in`}>
        <div className="flex justify-center mb-6">
          <AlertTriangle size={48} className="text-primary" />
        </div>
        <h1 className="text-6xl font-bold mb-6 text-primary font-poppins">404</h1>
        <p className="text-2xl text-foreground mb-4 font-poppins">Oops! Page not found</p>
        <p className="text-muted-foreground mb-6">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/">
          <Button className="btn-gradient">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
