import { toast } from "sonner";

// Types for Hugging Face API
interface HuggingFaceTextGenerationOptions {
  prompt: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
}

interface HuggingFaceImageGenerationOptions {
  prompt: string;
  model: string;
  negativePrompt?: string;
  numInferenceSteps?: number;
  guidanceScale?: number;
}

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';
const API_KEY_STORAGE_KEY = 'huggingface_api_key';

class HuggingFaceService {
  private apiKey: string | null = null;

  constructor() {
    this.loadApiKey();
  }

  private loadApiKey(): void {
    try {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        this.apiKey = storedKey;
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  }

  setApiKey(key: string): void {
    try {
      if (!key.trim()) {
        throw new Error("API key cannot be empty");
      }
      
      this.apiKey = key.trim();
      localStorage.setItem(API_KEY_STORAGE_KEY, key.trim());
      toast.success("Hugging Face API key saved successfully");
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error("Failed to save API key");
      throw error;
    }
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  private async makeRequest(endpoint: string, options: any): Promise<any> {
    if (!this.apiKey) {
      throw new Error("Hugging Face API key not set");
    }

    try {
      const response = await fetch(`${HUGGINGFACE_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Hugging Face API error:', error);
      throw error;
    }
  }

  async generateText(options: HuggingFaceTextGenerationOptions): Promise<string> {
    const {
      prompt,
      model,
      maxTokens = 800,
      temperature = 0.7,
    } = options;

    const data = await this.makeRequest(model, {
      inputs: prompt,
      parameters: {
        max_new_tokens: maxTokens,
        temperature: temperature,
        return_full_text: false
      }
    });

    return data[0]?.generated_text || '';
  }

  async generateImage(options: HuggingFaceImageGenerationOptions): Promise<string> {
    const {
      prompt,
      model,
      negativePrompt = "",
      numInferenceSteps = 50,
      guidanceScale = 7.5,
    } = options;

    const data = await this.makeRequest(model, {
      inputs: prompt,
      parameters: {
        negative_prompt: negativePrompt,
        num_inference_steps: numInferenceSteps,
        guidance_scale: guidanceScale
      }
    });

    return data[0]?.image || '';
  }
}

// Create a singleton instance
export const huggingfaceService = new HuggingFaceService(); 