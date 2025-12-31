import { GoogleGenAI } from "@google/genai";

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { prompt } = await request.json();

    if (!process.env.API_KEY) {
      throw new Error("API_KEY is not set in environment variables");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Using gemini-3-pro-preview for complex reasoning with high thinking budget
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 32768, 
        },
      }
    });

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate content', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}