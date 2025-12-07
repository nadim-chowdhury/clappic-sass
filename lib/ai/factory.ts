import { generateWithOpenAI } from "./openai";
import { generateWithGemini } from "./gemini";

export type AIProvider = "openai" | "gemini";

export async function generateContent(
  provider: AIProvider,
  topic: string,
  tone: string,
  apiKey?: string
) {
  if (provider === "openai") {
    return generateWithOpenAI(topic, tone, apiKey);
  } else if (provider === "gemini") {
    if (!apiKey) {
      throw new Error("API Key is required for Gemini");
    }
    return generateWithGemini(topic, tone, apiKey);
  }

  throw new Error("Invalid AI Provider");
}
