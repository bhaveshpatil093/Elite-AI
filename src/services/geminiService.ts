import { toast } from "sonner";

// Types for Gemini API
export interface GeminiTextGenerationParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

export interface GeminiImageGenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
}

export interface GeminiChatParams {
  messages: Array<{role: 'user' | 'model', content: string}>;
  temperature?: number;
  maxTokens?: number;
}

export interface GeminiCodeGenerationParams {
  prompt: string;
  language?: string;
  maxTokens?: number;
  temperature?: number;
}

class GeminiService {
  private apiKey: string | null = null;
  private readonly API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
  
  constructor() {
    // Try to get API key from localStorage if previously saved
    this.apiKey = localStorage.getItem('gemini_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('gemini_api_key', apiKey);
    toast.success("Google Gemini API key saved successfully");
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  private async makeRequest(endpoint: string, body: any): Promise<any> {
    if (!this.apiKey) {
      throw new Error("API key not set");
    }

    try {
      const response = await fetch(
        `${this.API_BASE_URL}/${endpoint}?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "API request failed";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error("API request error:", error);
      toast.error("Failed to make API request. Please try again.");
      throw error;
    }
  }

  async generateText(params: GeminiTextGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Google Gemini API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: params.prompt }]
            }],
            generationConfig: {
              temperature: params.temperature || 0.7,
              maxOutputTokens: params.maxTokens || 800,
              topP: 0.8,
              topK: 40,
            },
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate text";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No content generated");
      }

      // Extract the text from the response
      return data.candidates[0].content.parts[0].text || "";
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Failed to generate text. Please try again.");
      throw error;
    }
  }

  async generateImage(params: GeminiImageGenerationParams): Promise<string> {
    try {
      const data = await this.makeRequest('gemini-pro-vision:generateContent', {
        contents: [{
          parts: [{
            text: `Generate an image based on this description: ${params.prompt}${
              params.negativePrompt 
                ? `. Do not include: ${params.negativePrompt}` 
                : ""
            }`
          }]
        }],
        generationConfig: {
          temperature: 0.9,
          topP: 0.95,
          topK: 40,
        },
      });

      // This is a placeholder - Gemini doesn't actually generate images yet
      return `https://source.unsplash.com/random/800x600/?${encodeURIComponent(params.prompt)}`;
    } catch (error) {
      console.error("Error generating image:", error);
      throw error;
    }
  }

  async chat(params: GeminiChatParams): Promise<string> {
    try {
      const formattedMessages = params.messages.map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }]
      }));

      const data = await this.makeRequest('gemini-pro:generateContent', {
        contents: formattedMessages,
        generationConfig: {
          temperature: params.temperature || 0.7,
          maxOutputTokens: params.maxTokens || 800,
          topP: 0.8,
          topK: 40,
        },
      });

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No content generated");
      }

      return data.candidates[0].content.parts[0].text || "";
    } catch (error) {
      console.error("Error in chat:", error);
      throw error;
    }
  }

  async generateCode(params: GeminiCodeGenerationParams): Promise<string> {
    try {
      const prompt = params.language 
        ? `Generate ${params.language} code for: ${params.prompt}`
        : params.prompt;

      const data = await this.makeRequest('gemini-pro:generateContent', {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: params.temperature || 0.7,
          maxOutputTokens: params.maxTokens || 800,
          topP: 0.8,
          topK: 40,
        },
      });

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No content generated");
      }

      return data.candidates[0].content.parts[0].text || "";
    } catch (error) {
      console.error("Error generating code:", error);
      throw error;
    }
  }
}

// Create a singleton instance
export const geminiService = new GeminiService();
