
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
  
  constructor() {
    // Try to get API key from localStorage if previously saved
    this.apiKey = localStorage.getItem('gemini_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('gemini_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
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
            contents: [
              {
                parts: [
                  {
                    text: params.prompt,
                  },
                ],
              },
            ],
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
    if (!this.apiKey) {
      toast.error("Please set your Google Gemini API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Generate an image based on this description: ${params.prompt}${
                      params.negativePrompt 
                        ? `. Do not include: ${params.negativePrompt}` 
                        : ""
                    }`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              topP: 0.95,
              topK: 40,
            },
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate image";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      // This is a placeholder - Gemini doesn't actually generate images yet, 
      // it would return a text description of an image
      // In a real implementation, we'd use a different API for image generation
      return `https://source.unsplash.com/random/800x600/?${encodeURIComponent(params.prompt)}`;
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
      throw error;
    }
  }

  async chat(params: GeminiChatParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Google Gemini API key in settings");
      throw new Error("API key not set");
    }

    try {
      const formattedMessages = params.messages.map(message => ({
        role: message.role === 'user' ? 'user' : 'model',
        parts: [{ text: message.content }]
      }));

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: formattedMessages,
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
        const errorMessage = data.error?.message || "Failed to generate chat response";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No content generated");
      }

      // Extract the text from the response
      return data.candidates[0].content.parts[0].text || "";
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to generate chat response. Please try again.");
      throw error;
    }
  }

  async generateCode(params: GeminiCodeGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Google Gemini API key in settings");
      throw new Error("API key not set");
    }

    try {
      const prompt = `Generate ${params.language || ''} code for: ${params.prompt}. Only respond with the code, no explanations.`;
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: params.temperature || 0.2,
              maxOutputTokens: params.maxTokens || 1500,
              topP: 0.8,
              topK: 40,
            },
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        const errorMessage = data.error?.message || "Failed to generate code";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No content generated");
      }

      // Extract the text from the response
      return data.candidates[0].content.parts[0].text || "";
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code. Please try again.");
      throw error;
    }
  }
}

// Create a singleton instance
export const geminiService = new GeminiService();
