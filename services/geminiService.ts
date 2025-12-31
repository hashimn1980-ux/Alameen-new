import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesignAdvice = async (prompt: string): Promise<string> => {
  try {
    // Using gemini-3-pro-preview as requested for complex reasoning
    // Setting thinkingBudget to max (32768) as per requirements for "Think more when needed"
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768, 
        },
        // We do NOT set maxOutputTokens here to allow the model to manage the remaining budget for output
        // based on the heavy thinking budget allocated.
      }
    });

    return response.text || "I processed the request but could not generate a textual response.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `An error occurred while consulting the design intelligence: ${error.message}`;
  }
};