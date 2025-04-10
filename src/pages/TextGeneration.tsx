import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OutputDisplay from "@/components/OutputDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import { geminiService } from "@/services/geminiService";
import { openaiService } from "@/services/openaiService";
import { claudeService } from "@/services/claudeService";
import { huggingfaceService } from "@/services/huggingfaceService";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface ApiModelOption {
  provider: string;
  id: string;
  name: string;
}

const TextGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(800);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('meta-llama/Llama-2-7b-chat-hf');
  const [selectedProvider, setSelectedProvider] = useState<string>('huggingface');
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!apiKey) {
        throw new Error('Hugging Face API key is required');
      }

      let response;
      if (selectedProvider === 'huggingface') {
        response = await huggingfaceService.generateText({
          prompt: prompt,
          model: selectedModel,
          maxTokens: maxTokens,
          temperature: temperature,
          apiKey: apiKey
        });
      } else {
        response = await openaiService.generateText({
          prompt: prompt,
          model: selectedModel,
          maxTokens: maxTokens,
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="card-glass p-6">
        <h1 className="text-2xl font-bold mb-4">Text Generation</h1>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="model">Select Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="temperature">Temperature: {temperature}</Label>
              <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="maxTokens">Max Tokens: {maxTokens}</Label>
              <Slider
                id="maxTokens"
                min={100}
                max={4000}
                step={100}
                value={[maxTokens]}
                onValueChange={(value) => setMaxTokens(value[0])}
              />
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>

      {result && (
        <div className="card-glass p-6">
          <h2 className="text-xl font-semibold mb-4">Generated Text</h2>
          <OutputDisplay content={result} />
        </div>
      )}
    </div>
  );
};

export default TextGeneration;
