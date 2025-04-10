
import { toast } from "sonner";

// Types for Claude API
export interface ClaudeTextGenerationParams {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface ClaudeChatParams {
  messages: Array<{role: 'user' | 'assistant', content: string}>;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ClaudeCodeGenerationParams {
  prompt: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}

class ClaudeService {
  private apiKey: string | null = null;
  
  constructor() {
    // Try to get API key from localStorage if previously saved
    this.apiKey = localStorage.getItem('claude_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('claude_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async generateText(params: ClaudeTextGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Anthropic Claude API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: params.model || "claude-3-sonnet-20240229",
          messages: [
            {
              role: "user",
              content: params.prompt
            }
          ],
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

      return data.content[0].text;
    } catch (error) {
      console.error("Error generating text:", error);
      toast.error("Failed to generate text. Please try again.");
      throw error;
    }
  }

  async chat(params: ClaudeChatParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Anthropic Claude API key in settings");
      throw new Error("API key not set");
    }

    try {
      const formattedMessages = params.messages.map(message => ({
        role: message.role,
        content: message.content
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: params.model || "claude-3-sonnet-20240229",
          messages: formattedMessages,
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

      return data.content[0].text;
    } catch (error) {
      console.error("Error in chat:", error);
      toast.error("Failed to generate chat response. Please try again.");
      throw error;
    }
  }

  async generateCode(params: ClaudeCodeGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your Anthropic Claude API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: params.model || "claude-3-opus-20240229",
          messages: [
            {
              role: "user",
              content: `Generate code for: ${params.prompt}. Only respond with the code, no explanations.`
            }
          ],
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

      return data.content[0].text;
    } catch (error) {
      console.error("Error generating code:", error);
      toast.error("Failed to generate code. Please try again.");
      throw error;
    }
  }
}

// Create a singleton instance
export const claudeService = new ClaudeService();
