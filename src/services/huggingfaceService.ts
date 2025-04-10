import { toast } from "sonner";

// Types for Hugging Face API
interface HuggingFaceTextGenerationOptions {
  prompt: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
  apiKey: string;
}

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models';

class HuggingFaceService {
  async generateText(options: HuggingFaceTextGenerationOptions): Promise<string> {
    const {
      prompt,
      model,
      maxTokens = 800,
      temperature = 0.7,
      apiKey
    } = options;

    try {
      const response = await fetch(`${HUGGINGFACE_API_URL}/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            return_full_text: false
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate text');
      }

      const data = await response.json();
      return data[0]?.generated_text || '';
    } catch (error) {
      console.error('Error generating text with Hugging Face:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const huggingfaceService = new HuggingFaceService(); 