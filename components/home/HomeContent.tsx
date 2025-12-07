"use client";

import { useState, useEffect } from "react";
import { InputSection } from "@/components/generator/InputSection";
import { PreviewSection } from "@/components/generator/PreviewSection";
import { usePhotocard } from "@/hooks/use-photocard";
import { toast } from "sonner";

interface HomeContentProps {
  session: any;
}

export function HomeContent({ session }: HomeContentProps) {
  const {
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
  } = usePhotocard();

  const [selectedTemplate, setSelectedTemplate] = useState("twitter");

  // Show error toast when error state changes
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="flex-1 container max-w-screen-2xl px-4 md:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-top-8 duration-700">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          ✨ AI-Powered Viral Content
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Turn Ideas into <span className="text-primary">Viral Photocards</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
          Generate savage replies, funny memes, and epic threads instantly using
          AI. Just type a topic, pick a vibe, and let the magic happen.
        </p>
      </section>

      {/* Generator Interface */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Input */}
        <div className="lg:col-span-5 space-y-8 sticky top-24 z-10">
          <InputSection
            topic={topic}
            setTopic={setTopic}
            tone={tone}
            setTone={setTone}
            provider={provider}
            setProvider={setProvider}
            onGenerate={generate}
            isLoading={isLoading}
            session={session}
          />

          {/* Features List (Desktop) */}
          <div className="hidden lg:block space-y-4 p-6 bg-muted/20 rounded-xl border border-border/40">
            <h3 className="font-semibold text-lg">Why use Clappic?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                ✅ <span className="text-foreground">AI-Generated</span> unique
                content every time
              </li>
              <li className="flex items-center gap-2">
                ✅ <span className="text-foreground">Multi-style</span>{" "}
                templates (X, Meme, Chat)
              </li>
              <li className="flex items-center gap-2">
                ✅ <span className="text-foreground">Instant Download</span> for
                social sharing
              </li>
              <li className="flex items-center gap-2">
                ✅ <span className="text-foreground">Savage & Funny</span> modes
                included
              </li>
            </ul>
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
