import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import APIKeyInput from "@/components/APIKeyInput";
import { toast } from "sonner";

export interface ApiProvider {
  id: string;
  name: string;
  description: string;
  docsUrl: string;
}

interface ApiKeySelectorProps {
  providers: ApiProvider[];
  onSaveApiKey: (providerId: string, apiKey: string) => void;
  getApiKey: (providerId: string) => string | null;
}

const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({
  providers,
  onSaveApiKey,
  getApiKey,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  useEffect(() => {
    if (providers.length > 0) {
      setSelectedProvider(providers[0].id);
    }
  }, [providers]);

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
  };

  const currentProvider = providers.find(provider => provider.id === selectedProvider);

  if (providers.length === 0) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No API providers available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="provider-select">Select AI Provider</Label>
        <Select value={selectedProvider} onValueChange={handleProviderChange}>
          <SelectTrigger id="provider-select" className="w-full">
            <SelectValue placeholder="Select AI provider" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentProvider && (
        <APIKeyInput
          serviceName={currentProvider.name}
          apiKeyName={`${currentProvider.id}_api_key`}
          onSave={(apiKey) => onSaveApiKey(currentProvider.id, apiKey)}
          currentKey={getApiKey(currentProvider.id)}
        />
      )}

      {currentProvider && (
        <div className="text-sm text-muted-foreground">
          <p>{currentProvider.description}</p>
          <a 
            href={currentProvider.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline mt-2 inline-block"
          >
            Get {currentProvider.name} API Key
          </a>
        </div>
      )}
    </div>
  );
};

export default ApiKeySelector;
