import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OutputDisplay from "@/components/OutputDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import { geminiService } from "@/services/geminiService";
import { toast } from "sonner";
import { Code } from "lucide-react";
import { getApiKey, handleSaveApiKey } from "@/lib/apiKeys";
import { huggingfaceService } from "@/services/huggingfaceService";
import { openaiService } from "@/services/openaiService";

const CodeGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [temperature, setTemperature] = useState(0.3);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modelOptions: ApiModelOption[] = [
    {
      provider: "huggingface",
      models: [
        { id: "meta-llama/Llama-2-7b-chat-hf", name: "Llama 2 7B Chat" },
        { id: "meta-llama/Llama-2-13b-chat-hf", name: "Llama 2 13B Chat" },
        { id: "mistralai/Mistral-7B-Instruct-v0.1", name: "Mistral 7B Instruct" }
      ]
    },
    {
      provider: "openai",
      models: [
        { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
        { id: "gpt-4", name: "GPT-4" }
      ]
    }
  ];

  const [selectedModel, setSelectedModel] = useState<string>('meta-llama/Llama-2-7b-chat-hf');
  const [selectedProvider, setSelectedProvider] = useState<string>('huggingface');
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

  useEffect(() => {
    const storedApiKey = getApiKey('huggingface');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    // Reset model selection when provider changes
    if (provider === 'huggingface') {
      setSelectedModel('meta-llama/Llama-2-7b-chat-hf');
    } else if (provider === 'openai') {
      setSelectedModel('gpt-3.5-turbo');
    }
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(e.target.value);
    handleSaveApiKey('huggingface', e.target.value);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      if (!apiKey) {
        throw new Error('Hugging Face API key is required');
      }

      let response;
      if (selectedProvider === 'huggingface') {
        response = await huggingfaceService.generateText({
          prompt: `Generate code in ${language} for: ${prompt}`,
          model: selectedModel,
          maxTokens: 512,
          temperature: temperature,
          apiKey: apiKey
        });
      } else {
        response = await openaiService.generateText({
          prompt: `Generate code in ${language} for: ${prompt}`,
          model: selectedModel,
          maxTokens: 512,
          temperature: temperature,
          apiKey: apiKey
        });
      }

      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-glass p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Code Generation</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe what code you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="temperature">
              Temperature: {temperature.toFixed(1)}
            </Label>
            <Slider
              id="temperature"
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Lower values make code more structured and reliable, higher values make it more creative.
            </p>
          </div>

          <div>
            <Label htmlFor="provider">Provider</Label>
            <Select value={selectedProvider} onValueChange={handleProviderChange}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="huggingface">Hugging Face</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Textarea
              id="apiKey"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={handleApiKeyChange}
              className="min-h-[120px]"
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            <Code className="mr-2 h-4 w-4" />
            Generate Code
          </Button>
        </div>
      </div>

      {/* Results Section */}
      {isLoading ? (
        <LoadingSpinner text="Generating code..." />
      ) : result ? (
        <OutputDisplay 
          title="Generated Code" 
          contentType="code"
          content={result}
          fileName={`generated-code.${language}`}
        >
          <pre className="bg-secondary/30 p-4 rounded-lg overflow-x-auto">
            <code>{result}</code>
          </pre>
        </OutputDisplay>
      ) : error ? (
        <div className="text-red-500">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default CodeGeneration;
