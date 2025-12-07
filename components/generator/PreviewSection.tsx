import { useRef } from "react";
import { GeneratedContent } from "@/hooks/use-photocard";
import { TwitterCard } from "@/components/photocard-templates/TwitterCard";
import { MemeCard } from "@/components/photocard-templates/MemeCard";
import { ChatCard } from "@/components/photocard-templates/ChatCard";
import { MinimalCard } from "@/components/photocard-templates/MinimalCard";
import { FacebookCard } from "@/components/photocard-templates/FacebookCard";
import { DownloadActions } from "./DownloadActions";
import { TemplateSelector } from "./TemplateSelector";

interface PreviewSectionProps {
  content: GeneratedContent | null;
  selectedTemplate: string;
  setSelectedTemplate: (value: string) => void;
}

export function PreviewSection({
  content,
  selectedTemplate,
  setSelectedTemplate,
}: PreviewSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!content) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/30">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">
            Your viral post will appear here
          </p>
          <p className="text-sm">Enter a topic and hit generate!</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "twitter":
        return <TwitterCard content={content} />;
      case "facebook":
        return <FacebookCard content={content} />;
      case "meme":
        return <MemeCard content={content} />;
      case "chat":
        return <ChatCard content={content} />;
      case "minimal":
        return <MinimalCard content={content} />;
      default:
        return <TwitterCard content={content} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TemplateSelector
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />

      <div className="flex justify-center p-4 md:p-8 bg-muted/30 rounded-xl border border-border overflow-hidden">
        <div
          ref={cardRef}
          className="transform transition-all duration-300 hover:scale-[1.01]"
        >
          {renderTemplate()}
        </div>
      </div>

      <DownloadActions targetRef={cardRef} />
    </div>
  );
}
