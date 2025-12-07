import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateWithGemini(
  topic: string,
  tone: string,
  apiKeyOrToken: string
) {
  // Check if it's an API key (starts with AIza) or an OAuth token
  const isApiKey = apiKeyOrToken.startsWith("AIza");

  if (isApiKey) {
    const genAI = new GoogleGenerativeAI(apiKeyOrToken);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a viral social media expert. Generate a "viral" post and 3 replies based on the topic: "${topic}" and tone: "${tone}".
      
      The post should be:
      - Short, punchy, and highly shareable.
      - Optimized for Facebook, Twitter/X or Instagram.
      - No hashtags unless absolutely necessary for the joke.
      
      The replies should be:
      - Realistic user reactions (some agreeing, some roasting, some funny).
      - Short and engaging.
      
      Return ONLY valid JSON in this format:
      {
        "post": "The main post text here",
        "replies": [
          { "username": "@user1", "handle": "user1", "text": "Reply 1 text" },
          { "username": "@user2", "handle": "user2", "text": "Reply 2 text" },
          { "username": "@user3", "handle": "user3", "text": "Reply 3 text" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return parseResponse(text);
  } else {
    // Use REST API with OAuth Token
    const prompt = `
      You are a viral social media expert. Generate a "viral" post and 3 replies based on the topic: "${topic}" and tone: "${tone}".
      
      The post should be:
      - Short, punchy, and highly shareable.
      - Optimized for Facebook, Twitter/X or Instagram.
      - No hashtags unless absolutely necessary for the joke.
      
      The replies should be:
      - Realistic user reactions (some agreeing, some roasting, some funny).
      - Short and engaging.
      
      Return ONLY valid JSON in this format:
      {
        "post": "The main post text here",
        "replies": [
          { "username": "@user1", "handle": "user1", "text": "Reply 1 text" },
          { "username": "@user2", "handle": "user2", "text": "Reply 2 text" },
          { "username": "@user3", "handle": "user3", "text": "Reply 3 text" }
        ]
      }
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKeyOrToken}`,
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
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Gemini API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return parseResponse(text);
  }
}

function parseResponse(text: string) {
  // Clean up markdown code blocks if present
  const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanText);
}
