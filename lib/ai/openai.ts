import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true, // Note: In production, call via API route
});

export async function generateWithOpenAI(
  topic: string,
  tone: string,
  apiKey?: string
) {
  const client = apiKey
    ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
    : openai;

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

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error("No content generated");

  return JSON.parse(content);
}
