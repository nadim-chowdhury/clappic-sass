"use client";

import { useState } from "react";
import { InputSection } from "@/components/generator/InputSection";
import { PreviewSection } from "@/components/generator/PreviewSection";
import { toast } from "sonner";

export function HomeContent() {
  const [jsonInput, setJsonInput] = useState("");
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("twitter");

  const formatMetric = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  const handleRender = () => {
    if (!jsonInput.trim()) return;

    setIsLoading(true);
    try {
      const parsed = JSON.parse(jsonInput);

      // Basic validation
      // Support 'comments' (new) or 'replies' (old)
      if (
        !parsed.post ||
        (!Array.isArray(parsed.comments) && !Array.isArray(parsed.replies))
      ) {
        // If 'replies' exists but not 'comments', migrate it
        if (parsed.replies && !parsed.comments) {
          parsed.comments = parsed.replies;
        } else {
          throw new Error(
            "Invalid JSON format. Must have 'post' string and 'comments' array."
          );
        }
      }

      const commentsArray = parsed.comments || [];

      const likes = Math.floor(Math.random() * 50000) + 1000;
      const commentsCount = Math.floor(likes * (Math.random() * 0.1 + 0.01));
      const shares = Math.floor(likes * (Math.random() * 0.2 + 0.05));
      const views = Math.floor(likes * (Math.random() * 20 + 10));

      // Generate random time
      const getRandomTime = () => {
        const timeUnits = ["m", "h", "d"];
        const randomUnit =
          timeUnits[Math.floor(Math.random() * timeUnits.length)];
        if (randomUnit === "m") return Math.floor(Math.random() * 59 + 1) + "m";
        if (randomUnit === "h") return Math.floor(Math.random() * 23 + 1) + "h";
        return Math.floor(Math.random() * 6 + 1) + "d";
      };

      // Generate logical random times
      const minutesToDisplay = (mins: number) => {
        if (mins < 60) return `${mins}m`;
        if (mins < 1440) return `${Math.floor(mins / 60)}h`;
        return `${Math.floor(mins / 1440)}d`;
      };

      // Post time: random between 10 mins and 7 days (10080 mins)
      const postAgeMins = Math.floor(Math.random() * 10000) + 10;
      const postTime = minutesToDisplay(postAgeMins);

      // Generate random gradient
      const gradients = [
        "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
        "bg-gradient-to-tr from-blue-400 via-teal-500 to-green-400",
        "bg-gradient-to-bl from-rose-400 via-fuchsia-500 to-indigo-500",
        "bg-gradient-to-r from-amber-200 via-violet-600 to-sky-900",
        "bg-gradient-to-tl from-fuchsia-600 via-purple-600 to-pink-600",
        "bg-gradient-to-br from-emerald-500 to-lime-600",
        "bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-900",
        "bg-gradient-to-bl from-orange-400 to-rose-400",
      ];
      const randomGradient =
        gradients[Math.floor(Math.random() * gradients.length)];

      // Recursive function to process comments and replies
      const processComments = (items: any[], parentTimeMins: number): any[] => {
        return items.map((item: any) => {
          const itemAgeMins = Math.max(
            1,
            Math.floor(Math.random() * parentTimeMins)
          );
          const newItem = {
            ...item,
            time: minutesToDisplay(itemAgeMins),
          };
          if (item.replies && Array.isArray(item.replies)) {
            newItem.replies = processComments(item.replies, itemAgeMins);
          }
          return newItem;
        });
      };

      const processedComments = processComments(commentsArray, postAgeMins);

      const contentWithMetrics = {
        ...parsed,
        likes: formatMetric(likes),
        commentsCount: formatMetric(commentsCount),
        shares: formatMetric(shares),
        views: formatMetric(views),
        time: postTime,
        gradient: randomGradient,
        comments: processedComments,
      };

      setGeneratedContent(contentWithMetrics);
      toast.success("Photocard rendered successfully!");
    } catch (error: any) {
      console.error("JSON Parse Error:", error);
      if (
        error instanceof SyntaxError &&
        error.message.includes("Expected ',' or '}'")
      ) {
        toast.error(
          'JSON Error: It looks like you have unescaped quotes (like "word") inside your text. Please remove them or escape them (like \\"word\\").'
        );
      } else {
        toast.error("Invalid JSON: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 container max-w-screen-2xl px-4 md:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-top-8 duration-700">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          ✨ JSON to Photocard
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Turn JSON into <span className="text-primary">Viral Photocards</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Paste your AI-generated JSON below to instantly create beautiful
          social media photocards.
        </p>
      </section>

      {/* Generator Interface */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Input */}
        <div className="lg:col-span-5 space-y-8 sticky top-24 z-10">
          <InputSection
            jsonInput={jsonInput}
            setJsonInput={setJsonInput}
            onRender={handleRender}
            isLoading={isLoading}
          />

          {/* Features List (Desktop) */}
          <div className="hidden lg:block space-y-4 p-6 bg-muted/20 rounded-xl border border-border/40">
            <h3 className="font-semibold text-lg">How to use?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                1. Ask ChatGPT/Gemini to generate a viral post JSON.
              </li>
              <li className="flex items-center gap-2">
                2. Paste the JSON into the box above.
              </li>
              <li className="flex items-center gap-2">
                3. Click "Render Photocard".
              </li>
              <li className="flex items-center gap-2">
                4. Download and share!
              </li>
            </ul>
            <div className="mt-4 p-3 bg-background/50 rounded-lg border border-border/50">
              <p className="text-xs font-medium mb-2 text-muted-foreground">
                Copy this prompt:
              </p>
              <code className="block text-xs bg-muted p-2 rounded border border-border select-all cursor-text whitespace-pre-wrap">
                Generate an ULTRA-VIRAL social media post about [TOPIC] with a
                [TONE] tone. Optimize for MAXIMUM reach, engagement, and shares.
                The post should be punchy, relatable, or controversial to
                trigger immediate reactions. Return ONLY raw JSON with this
                format:
                {`
{
  "post": "text",
  "author": {
    "name": "Name",
    "handle": "handle",
    "avatar": "https://images.unsplash.com/photo-..."
  },
  "comments": [
    {
      "username": "User",
      "handle": "handle",
      "text": "comment",
      "avatar": "https://images.unsplash.com/photo-...",
      "replies": [
        {
          "username": "Replier",
          "handle": "handle",
          "text": "reply",
          "avatar": "https://images.unsplash.com/photo-..."
        }
      ]
    }
  ]
}`}
                Ensure all quotes inside strings are escaped. Use realistic
                Unsplash image URLs for avatars. Make the comments spark a
                debate or be meme-worthy.
              </code>
            </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-7">
          <PreviewSection
            content={generatedContent}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        </div>
      </div>
    </main>
  );
}
