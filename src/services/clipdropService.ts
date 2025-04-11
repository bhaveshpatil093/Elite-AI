import { get } from "@/lib/storage";

interface ClipdropImageGenerationParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  numInferenceSteps?: number;
  guidanceScale?: number;
}

class ClipdropService {
  private apiKey: string | null = null;
  private readonly baseUrl = "https://clipdrop-api.co/text-to-image/v1";

  constructor() {
    this.loadApiKey();
  }

  private loadApiKey() {
    this.apiKey = get("clipdropApiKey");
    console.log("Clipdrop API key loaded:", this.apiKey ? "Present" : "Not set");
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    console.log("Clipdrop API key set:", apiKey ? "Present" : "Not set");
  }

  async generateImage(params: ClipdropImageGenerationParams): Promise<string> {
    if (!this.apiKey) {
      console.error("Clipdrop API key not set");
      throw new Error("Clipdrop API key not set. Please add your API key in settings.");
    }

    const {
      prompt,
      negativePrompt = "",
      width = 512,
      height = 512,
      numInferenceSteps = 50,
      guidanceScale = 7.5,
    } = params;

    console.log("Generating image with params:", {
      prompt,
      negativePrompt,
      width,
      height,
      numInferenceSteps,
      guidanceScale,
    });

    try {
      const formData = new FormData();
      formData.append('prompt', prompt);
      if (negativePrompt) {
        formData.append('negative_prompt', negativePrompt);
      }
      formData.append('width', width.toString());
      formData.append('height', height.toString());
      formData.append('num_inference_steps', numInferenceSteps.toString());
      formData.append('guidance_scale', guidanceScale.toString());

      console.log("Sending request to Clipdrop API...");
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "x-api-key": this.apiKey,
        },
        body: formData,
      });

      console.log("Clipdrop API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Clipdrop API error response:", errorText);
        throw new Error(`Clipdrop API error: ${response.status} ${errorText}`);
      }

      // Get the image blob
      const imageBlob = await response.blob();
      console.log("Image blob received:", imageBlob.type, imageBlob.size);

      // Convert blob to base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          console.log("Image converted to base64");
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });
    } catch (error) {
      console.error("Clipdrop API error:", error);
      throw new Error(`Failed to generate image: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const clipdropService = new ClipdropService(); 