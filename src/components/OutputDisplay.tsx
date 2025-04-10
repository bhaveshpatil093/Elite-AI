
import React, { ReactNode } from "react";
import { Clipboard, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface OutputDisplayProps {
  title?: string;
  children: ReactNode;
  contentType?: "text" | "image" | "audio" | "code";
  content?: string;
  fileName?: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({
  title,
  children,
  contentType = "text",
  content = "",
  fileName = "download",
}) => {
  const handleCopy = () => {
    if (contentType === "text" || contentType === "code") {
      navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    }
  };

  const handleDownload = () => {
    if (!content) return;

    let dataToDownload, fileExtension;

    switch (contentType) {
      case "text":
        dataToDownload = content;
        fileExtension = "txt";
        break;
      case "code":
        dataToDownload = content;
        fileExtension = "txt";
        break;
      case "image":
        // For image URLs, we need to fetch the image first
        fetch(content)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${fileName}.png`;
            document.body.appendChild(a);
            a.click();
            a.remove();
          })
          .catch(error => {
            console.error("Error downloading image:", error);
            toast.error("Failed to download image");
          });
        return;
      case "audio":
        // For audio blob URLs
        fetch(content)
          .then(response => response.blob())
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${fileName}.mp3`;
            document.body.appendChild(a);
            a.click();
            a.remove();
          })
          .catch(error => {
            console.error("Error downloading audio:", error);
            toast.error("Failed to download audio");
          });
        return;
      default:
        dataToDownload = content;
        fileExtension = "txt";
    }

    if (dataToDownload) {
      const blob = new Blob([dataToDownload], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Download started");
    }
  };

  return (
    <div className="card-glass p-4 rounded-xl w-full relative">
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      
      <div className="relative">
        {children}
      </div>
      
      {(contentType === "text" || contentType === "code") && content && (
        <div className="flex gap-2 mt-3 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
            className="flex items-center gap-1"
          >
            <Clipboard size={16} />
            <span>Copy</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>
      )}
      
      {(contentType === "image" || contentType === "audio") && content && (
        <div className="flex gap-2 mt-3 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OutputDisplay;
