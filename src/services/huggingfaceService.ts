import { toast } from "sonner";

// Types for Hugging Face API
export interface HuggingFaceTextGenerationParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
}

const HUGGINGFACE_API_KEY = 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'; // Default API key
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';

class HuggingFaceService {
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

  async generateText(params: HuggingFaceTextGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Hugging Face API key in settings");
      throw new Error("API key not set");
    }

    try {
      const model = params.model || "meta-llama/Llama-2-7b-chat-hf";
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            inputs: params.prompt,
            parameters: {
              max_new_tokens: params.maxTokens || 800,
              temperature: params.temperature || 0.7,
              top_p: 0.95,
              top_k: 50,
              repetition_penalty: 1.1
            }
          })
        }
      );

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.error || "Failed to generate text";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data[0]?.generated_text || "";
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Failed to generate text. Please try again.");
      throw error;
    }
  }
}

// Create a singleton instance
export const huggingfaceService = new HuggingFaceService(); 