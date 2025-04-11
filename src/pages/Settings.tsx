import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/components/ThemeProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ApiKeySelector, { ApiProvider } from "@/components/ApiKeySelector";
import { geminiService } from "@/services/geminiService";
import { elevenLabsService } from "@/services/elevenLabsService";
import { openaiService } from "@/services/openaiService";
import { claudeService } from "@/services/claudeService";
import { stableDiffusionService } from "@/services/stableDiffusionService";
import { huggingfaceService } from "@/services/huggingfaceService";
import { clipdropService } from "@/services/clipdropService";
import { Moon, Sun, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { set } from "@/lib/storage";

const Settings = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");

  const apiProviders: ApiProvider[] = [
    {
      id: "gemini",
      name: "Google Gemini",
      description: "Google's generative AI models for text, chat, and code generation.",
      docsUrl: "https://aistudio.google.com/app/apikey",
    },
    {
      id: "elevenlabs",
      name: "ElevenLabs",
      description: "State-of-the-art text to speech API.",
      docsUrl: "https://elevenlabs.io/app/api-key",
    },
    {
      id: "openai",
      name: "OpenAI",
      description: "Advanced AI models for text, images, chat, and code generation.",
      docsUrl: "https://platform.openai.com/api-keys",
    },
    {
      id: "claude",
      name: "Anthropic Claude",
      description: "Anthropic's Claude models for text, chat, and code generation.",
      docsUrl: "https://console.anthropic.com/account/keys",
    },
    {
      id: "huggingface",
      name: "Hugging Face",
      description: "Access to various open-source models including Llama 2 and Mistral.",
      docsUrl: "https://huggingface.co/settings/tokens",
    },
    {
      id: "clipdrop",
      name: "Clipdrop",
      description: "Clipdrop API for image generation.",
      docsUrl: "https://clipdrop.co/api",
    }
  ];

  const textGenProviders: ApiProvider[] = apiProviders.filter(p => 
    ["gemini", "openai", "claude", "huggingface"].includes(p.id)
  );

  const imageGenProviders: ApiProvider[] = apiProviders.filter(p => 
    ["gemini", "openai", "huggingface"].includes(p.id)
  );

  const voiceGenProviders: ApiProvider[] = apiProviders.filter(p => 
    ["elevenlabs"].includes(p.id)
  );

  const handleSaveApiKey = (providerId: string, apiKey: string) => {
    switch (providerId) {
      case "gemini":
        geminiService.setApiKey(apiKey);
        set("geminiApiKey", apiKey);
        break;
      case "elevenlabs":
        elevenLabsService.setApiKey(apiKey);
        break;
      case "openai":
        openaiService.setApiKey(apiKey);
        set("openaiApiKey", apiKey);
        break;
      case "claude":
        claudeService.setApiKey(apiKey);
        break;
      case "huggingface":
        huggingfaceService.setApiKey(apiKey);
        set("huggingfaceApiKey", apiKey);
        break;
      case "clipdrop":
        clipdropService.setApiKey(apiKey);
        set("clipdropApiKey", apiKey);
        break;
    }
  };

  const getApiKey = (providerId: string): string | null => {
    switch (providerId) {
      case "gemini":
        return geminiService.getApiKey();
      case "elevenlabs":
        return elevenLabsService.getApiKey();
      case "openai":
        return openaiService.getApiKey();
      case "claude":
        return claudeService.getApiKey();
      case "huggingface":
        return huggingfaceService.getApiKey();
      case "clipdrop":
        return clipdropService.getApiKey();
      default:
        return null;
    }
  };

  const handleSave = () => {
    if (!selectedProvider || !apiKey) {
      toast.error("Please select a provider and enter an API key");
      return;
    }

    try {
      handleSaveApiKey(selectedProvider, apiKey);
      toast.success("API key saved successfully");
      setApiKey("");
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-glass p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="appearance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4">
            <h2 className="text-xl font-semibold">Appearance</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {resolvedTheme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <Label htmlFor="theme-mode">Theme Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-5 w-5" />
                  <Switch 
                    id="theme-mode" 
                    checked={resolvedTheme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                  <Moon className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <Label htmlFor="system-theme">Use system theme</Label>
                <Switch 
                  id="system-theme" 
                  checked={theme === "system"}
                  onCheckedChange={(checked) => setTheme(checked ? "system" : resolvedTheme)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="api-keys">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">API Keys</h2>
              
              <p className="text-muted-foreground mb-4">
                Configure your API keys to use the AI services. Your keys are stored securely in your browser's local storage and are not sent to our servers.
              </p>
              
              <div className="card-glass p-4 rounded-lg">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="all">All Providers</TabsTrigger>
                    <TabsTrigger value="text">Text Generation</TabsTrigger>
                    <TabsTrigger value="image">Image Generation</TabsTrigger>
                    <TabsTrigger value="voice">Voice Generation</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all">
                    <ApiKeySelector 
                      providers={apiProviders}
                      onSaveApiKey={handleSaveApiKey}
                      getApiKey={getApiKey}
                    />
                  </TabsContent>
                  
                  <TabsContent value="text">
                    <ApiKeySelector 
                      providers={textGenProviders}
                      onSaveApiKey={handleSaveApiKey}
                      getApiKey={getApiKey}
                    />
                  </TabsContent>
                  
                  <TabsContent value="image">
                    <ApiKeySelector 
                      providers={imageGenProviders}
                      onSaveApiKey={handleSaveApiKey}
                      getApiKey={getApiKey}
                    />
                  </TabsContent>
                  
                  <TabsContent value="voice">
                    <ApiKeySelector 
                      providers={voiceGenProviders}
                      onSaveApiKey={handleSaveApiKey}
                      getApiKey={getApiKey}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="card-glass p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Help & Resources</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">AI Models & APIs</h3>
            <p className="text-muted-foreground">
              EliteAI supports multiple AI providers and models. Configure your API keys in the settings to use these services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiProviders.map(provider => (
              <div key={provider.id} className="p-4 rounded-lg bg-card">
                <h4 className="font-medium">{provider.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{provider.description}</p>
                <a 
                  href={provider.docsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Get API Key
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">Select Provider</Label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select an API provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini">Google Gemini</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="huggingface">Hugging Face</SelectItem>
                <SelectItem value="clipdrop">Clipdrop</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedProvider && (
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder={`Enter your ${selectedProvider} API key`}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          )}

          <Button onClick={handleSave} disabled={!selectedProvider || !apiKey}>
            Save API Key
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
