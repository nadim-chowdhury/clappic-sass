import { useState } from "react";
import { AIProvider } from "@/lib/ai/factory";

export interface GeneratedContent {
  post: string;
  replies: {
    username: string;
    handle: string;
    text: string;
  }[];
}

export function usePhotocard() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Savage");
  const [provider, setProvider] = useState<AIProvider>("gemini");
  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, provider }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate");
      }

      setGeneratedContent(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    topic,
    setTopic,
    tone,
    setTone,
    provider,
    setProvider,
    generatedContent,
    isLoading,
    error,
    generate,
  };
}
