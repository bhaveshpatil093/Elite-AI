
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "light",
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if user has previously selected a theme
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
      return savedTheme;
    }
    
    return "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Handle system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      if (theme === "system") {
        const newTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(newTheme);
        updateDocumentClass(newTheme);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Update the theme when it changes
  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setResolvedTheme(systemTheme);
      updateDocumentClass(systemTheme);
    } else {
      setResolvedTheme(theme as "light" | "dark");
      updateDocumentClass(theme as "light" | "dark");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const updateDocumentClass = (theme: "light" | "dark") => {
    const root = window.document.documentElement;
    
    // Remove the previous theme class
    root.classList.remove("light", "dark");
    
    // Add the current theme class
    root.classList.add(theme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme, 
        resolvedTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
