import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import OutputDisplay from "@/components/OutputDisplay";
import { huggingfaceService } from "@/services/huggingfaceService";
import { openaiService } from "@/services/openaiService";
import { getApiKey, handleSaveApiKey } from "@/lib/apiKeys";

interface ApiModelOption {
  provider: string;
  models: {
    id: string;
    name: string;
  }[];
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

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          temperature: temperature
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Text Generation</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <Label htmlFor="model">Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {modelOptions
                .find(option => option.provider === selectedProvider)
                ?.models.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
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

        <div>
          <Label htmlFor="prompt">Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <div>
          <Label>Temperature: {temperature}</Label>
          <Slider
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
            min={0}
            max={1}
            step={0.1}
          />
        </div>

        <div>
          <Label>Max Tokens: {maxTokens}</Label>
          <Slider
            value={[maxTokens]}
            onValueChange={(value) => setMaxTokens(value[0])}
            min={100}
            max={2000}
            step={100}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Generating..." : "Generate Text"}
        </Button>
      </form>

      {result ? (
        <OutputDisplay title="Generated Text" content={result} />
      ) : error ? (
        <div className="text-red-500 mt-4">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default TextGeneration;
