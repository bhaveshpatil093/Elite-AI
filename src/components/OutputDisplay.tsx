import React from "react";

interface OutputDisplayProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ title, content, children }) => {
  return (
    <div className="mt-4 p-4 border rounded-lg bg-background">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="whitespace-pre-wrap">{content}</div>
      {children}
    </div>
  );
};

export default OutputDisplay;
