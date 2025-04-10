interface DeepSeekTextGenerationOptions {
  prompt: string;
  model: string;
  maxTokens?: number;
  temperature?: number;
  apiKey: string;
}

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

class DeepSeekService {
  async generateText(options: DeepSeekTextGenerationOptions): Promise<string> {
    const {
      prompt,
      model,
      maxTokens = 800,
      temperature = 0.7,
      apiKey
    } = options;

    try {
      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature: temperature
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to generate text');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error generating text with DeepSeek:', error);
      throw error;
    }
  }
}

export const deepseekService = new DeepSeekService(); 