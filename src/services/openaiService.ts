
import { toast } from "sonner";

// Types for OpenAI API
export interface OpenAITextGenerationParams {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface OpenAIImageGenerationParams {
  prompt: string;
  n?: number;
  size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792";
  style?: "vivid" | "natural";
}

export interface OpenAIChatParams {
  messages: Array<{role: 'system' | 'user' | 'assistant', content: string}>;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface OpenAICodeGenerationParams {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

class OpenAIService {
  private apiKey: string | null = null;
  
  constructor() {
    // Try to get API key from localStorage if previously saved
    this.apiKey = localStorage.getItem('openai_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('openai_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateText(params: OpenAITextGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your OpenAI API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: params.model || "gpt-3.5-turbo-instruct",
          prompt: params.prompt,
          max_tokens: params.maxTokens || 800,
          temperature: params.temperature || 0.7
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate text";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      return data.choices[0].text.trim();
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Failed to generate text. Please try again.");
      throw error;
    }
  }

  async generateImage(params: OpenAIImageGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your OpenAI API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          prompt: params.prompt,
          n: params.n || 1,
          size: params.size || "1024x1024",
          style: params.style || "vivid"
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate image";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      return data.data[0].url;
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
      throw error;
    }
  }

  async chat(params: OpenAIChatParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your OpenAI API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: params.model || "gpt-3.5-turbo",
          messages: params.messages,
          max_tokens: params.maxTokens || 800,
          temperature: params.temperature || 0.7
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate chat response";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to generate chat response. Please try again.");
      throw error;
    }
  }

  async generateCode(params: OpenAICodeGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your OpenAI API key in settings");
      throw new Error("API key not set");
    }

    try {
      const messages = [
        {
          role: "system",
          content: "You are a helpful assistant that generates code. Respond with only the code, no explanations."
        },
        {
          role: "user",
          content: `Generate ${params.prompt}`
        }
      ];
      
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: params.model || "gpt-3.5-turbo",
          messages: messages,
          max_tokens: params.maxTokens || 1500,
          temperature: params.temperature || 0.2
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate code";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code. Please try again.");
      throw error;
    }
  }
}

// Create a singleton instance
export const openaiService = new OpenAIService();
