export const generateDesignAdvice = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "I processed the request but could not generate a textual response.";
  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    return `An error occurred while consulting the design intelligence: ${error.message}`;
  }
};