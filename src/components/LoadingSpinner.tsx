
import React from "react";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = "Loading...",
  size = "md",
}) => {
  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div
        className={`animate-spin rounded-full border-t-2 border-primary ${spinnerSizes[size]} border-r-transparent`}
      />
      {text && <p className={`mt-2 text-muted-foreground ${textSizes[size]}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
