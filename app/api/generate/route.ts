import { NextResponse } from "next/server";
import { generateContent, AIProvider } from "@/lib/ai/factory";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { topic, tone, provider } = await req.json();

    if (!topic || !tone) {
      return NextResponse.json(
        { error: "Topic and Tone are required" },
        { status: 400 }
      );
    }

    // Use server-side environment variables or user access token
    let apiKey =
      provider === "openai"
        ? process.env.OPENAI_API_KEY
        : process.env.GOOGLE_API_KEY;

    // If Gemini and user has access token, PREFER the access token
    // This allows "Gemini via Google Login" to work even if a (potentially invalid) key exists in .env
    if (provider === "gemini" && session.accessToken) {
      apiKey = session.accessToken;
    }

    if (!apiKey) {
      return NextResponse.json(
        {
          error: `Server configuration error: Missing API key for ${provider}. Please sign in again or contact support.`,
        },
        { status: 500 }
      );
    }

    const result = await generateContent(
      (provider as AIProvider) || "openai",
      topic,
      tone,
      apiKey
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Generation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate content" },
      { status: 500 }
    );
  }
}
