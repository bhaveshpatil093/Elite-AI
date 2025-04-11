import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import OutputDisplay from "@/components/OutputDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import { geminiService } from "@/services/geminiService";
import { openaiService } from "@/services/openaiService";
import { huggingfaceService } from "@/services/huggingfaceService";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";

interface ApiModelOption {
  provider: string;
  id: string;
  name: string;
}

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("openai:dall-e-3");

  const modelOptions: ApiModelOption[] = [
    // OpenAI models
    { provider: "openai", id: "openai:dall-e-3", name: "DALL-E 3" },
    { provider: "openai", id: "openai:dall-e-2", name: "DALL-E 2" },
    
    // Hugging Face models
    { provider: "huggingface", id: "huggingface:stable-diffusion-xl", name: "Stable Diffusion XL" },
    { provider: "huggingface", id: "huggingface:stable-diffusion-v1-5", name: "Stable Diffusion v1.5" },
    
    // Gemini (placeholder)
    { provider: "gemini", id: "gemini:image", name: "Gemini (Placeholder)" },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    const [provider, model] = selectedModel.split(":");
    
    // Check if API key is set
    if (provider === "gemini" && !geminiService.getApiKey()) {
      toast.error("Please set your Google Gemini API key in settings");
      return;
    } else if (provider === "openai" && !openaiService.getApiKey()) {
      toast.error("Please set your OpenAI API key in settings");
      return;
    } else if (provider === "huggingface" && !huggingfaceService.getApiKey()) {
      toast.error("Please set your Hugging Face API key in settings");
      return;
    }

    setIsLoading(true);
    setImageUrl("");

    try {
      let response = "";
      
      if (provider === "gemini") {
        response = await geminiService.generateImage({
          prompt,
          negativePrompt,
          width,
          height,
        });
      } else if (provider === "openai") {
        // Map sizes for DALL-E
        let size = "1024x1024";
        if (width === 1792 && height === 1024) size = "1792x1024";
        if (width === 1024 && height === 1792) size = "1024x1792";
        
        response = await openaiService.generateImage({
          prompt,
          size: size as any,
          style: "vivid",
        });
      } else if (provider === "huggingface") {
        response = await huggingfaceService.generateImage({
          prompt,
          model,
          negativePrompt,
          numInferenceSteps: 50,
          guidanceScale: 7.5,
        });
      }
      
      setImageUrl(response);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Determine if we should show size controls based on selected provider
  const showSizeControls = selectedModel.startsWith("huggingface:");
  
  // Determine if we should show negative prompt based on provider
  const showNegativePrompt = selectedModel.startsWith("huggingface:");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-glass p-6 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">Image Generation</h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="model-selector">Model</Label>
            <Select 
              value={selectedModel} 
              onValueChange={setSelectedModel}
            >
              <SelectTrigger id="model-selector" className="w-full">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name} ({model.provider.charAt(0).toUpperCase() + model.provider.slice(1)})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe the image you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          {showNegativePrompt && (
            <div>
              <Label htmlFor="negative-prompt">Negative Prompt (Optional)</Label>
              <Textarea
                id="negative-prompt"
                placeholder="Elements you don't want in the image..."
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="min-h-[60px]"
              />
            </div>
          )}

          {showSizeControls && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  type="number"
                  min={256}
                  max={1024}
                  step={64}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor="height">Height</Label>
                <Input
                  id="height"
                  type="number"
                  min={256}
                  max={1024}
                  step={64}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>
          )}

          {!showSizeControls && selectedModel.startsWith("openai:") && (
            <div>
              <Label htmlFor="size">Size</Label>
              <Select 
                defaultValue="1024x1024"
                onValueChange={(value) => {
                  const [w, h] = value.split("x").map(Number);
                  setWidth(w);
                  setHeight(h);
                }}
              >
                <SelectTrigger id="size" className="w-full">
                  <SelectValue placeholder="Select image size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1024x1024">1024x1024</SelectItem>
                  <SelectItem value="1792x1024">1792x1024</SelectItem>
                  <SelectItem value="1024x1792">1024x1792</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <ImageIcon className="w-4 h-4 mr-2" />
                Generate Image
              </>
            )}
          </Button>
        </div>
      </div>

      {imageUrl && (
        <div className="card-glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Generated Image</h2>
          <OutputDisplay content={imageUrl} type="image" />
        </div>
      )}
    </div>
  );
};

export default ImageGeneration;
