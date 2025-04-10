import { toast } from "sonner";

// Types for Stable Diffusion API
export interface StableDiffusionImageGenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
}

class StableDiffusionService {
  private apiKey: string | null = null;
  
  constructor() {
    // Try to get API key from localStorage if previously saved
    this.apiKey = localStorage.getItem('huggingface_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('huggingface_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateImage(params: StableDiffusionImageGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Hugging Face API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: params.prompt,
            parameters: {
              negative_prompt: params.negativePrompt || "",
              width: params.width || 512,
              height: params.height || 512,
              num_inference_steps: params.numInferenceSteps || 50,
              guidance_scale: params.guidanceScale || 7.5,
              seed: Math.floor(Math.random() * 1000000)
            }
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.error || "Failed to generate image";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // The response is the binary image data
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
      throw error;
    }
  }
}

// Create a singleton instance
export const stableDiffusionService = new StableDiffusionService();
