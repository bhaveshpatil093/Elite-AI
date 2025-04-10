
import { toast } from "sonner";

export interface VoiceGenerationParams {
  text: string;
  voiceId?: string;
  stability?: number;
  similarity?: number;
  modelId?: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  preview_url: string;
  category?: string;
}

class ElevenLabsService {
  private apiKey: string | null = null;
  private defaultVoiceId = "EXAVITQu4vr4xnSDxMaL"; // Default voice - Sarah
  private defaultModelId = "eleven_monolingual_v1";
  
  constructor() {
    // Try to get API key from localStorage if previously saved
    this.apiKey = localStorage.getItem('elevenlabs_api_key');
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('elevenlabs_api_key', apiKey);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  async getVoices(): Promise<Voice[]> {
    if (!this.apiKey) {
      toast.error("Please set your ElevenLabs API key in settings");
      throw new Error("API key not set");
    }

    try {
      const response = await fetch("https://api.elevenlabs.io/v1/voices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching voices: ${response.statusText}`);
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error("Error fetching voices:", error);
      toast.error("Failed to fetch voices. Please check your API key.");
      return [];
    }
  }

  async generateSpeech(params: VoiceGenerationParams): Promise<string> {
    if (!this.apiKey) {
      toast.error("Please set your ElevenLabs API key in settings");
      throw new Error("API key not set");
    }

    const voiceId = params.voiceId || this.defaultVoiceId;
    const modelId = params.modelId || this.defaultModelId;

    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "xi-api-key": this.apiKey,
          },
          body: JSON.stringify({
            text: params.text,
            model_id: modelId,
            voice_settings: {
              stability: params.stability || 0.5,
              similarity_boost: params.similarity || 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error generating speech: ${response.statusText}`);
      }

      // Convert the response to a blob
      const audioBlob = await response.blob();
      
      // Create a URL for the audio blob
      const audioUrl = URL.createObjectURL(audioBlob);
      return audioUrl;
    } catch (error) {
      console.error("Error generating speech:", error);
      toast.error("Failed to generate speech. Please try again.");
      throw error;
    }
  }
}

// Create a singleton instance
export const elevenLabsService = new ElevenLabsService();
