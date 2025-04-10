
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface APIKeyInputProps {
  serviceName: string;
  apiKeyName: string;
  onSave: (apiKey: string) => void;
  currentKey: string | null;
}

const APIKeyInput: React.FC<APIKeyInputProps> = ({
  serviceName,
  apiKeyName,
  onSave,
  currentKey,
}) => {
  const [apiKey, setApiKey] = useState(currentKey || "");
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error(`Please enter a valid ${serviceName} API key`);
      return;
    }
    
    onSave(apiKey);
    toast.success(`${serviceName} API key saved`);
  };

  return (
    <div className="space-y-3 p-4 card-glass">
      <Label htmlFor={apiKeyName}>{serviceName} API Key</Label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            id={apiKeyName}
            type={showApiKey ? "text" : "password"}
            placeholder={`Enter your ${serviceName} API key`}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <Button onClick={handleSave}>Save</Button>
      </div>
      <p className="text-xs text-muted-foreground">
        {currentKey
          ? "API key is set. You can update it if needed."
          : `Enter your ${serviceName} API key to use ${serviceName} features.`}
      </p>
    </div>
  );
};

export default APIKeyInput;
