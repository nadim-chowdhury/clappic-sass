import { useRef, useState } from "react";
import { TwitterCard } from "@/components/photocard-templates/TwitterCard";
import { MemeCard } from "@/components/photocard-templates/MemeCard";
import { ChatCard } from "@/components/photocard-templates/ChatCard";
import { MinimalCard } from "@/components/photocard-templates/MinimalCard";
import { FacebookCard } from "@/components/photocard-templates/FacebookCard";
import { GradientCard } from "@/components/photocard-templates/GradientCard";
import { DownloadActions } from "./DownloadActions";
import { TemplateSelector } from "./TemplateSelector";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun } from "lucide-react";

export interface Comment {
  username: string;
  handle: string;
  text: string;
  avatar?: string;
  time?: string;
  replies?: Comment[];
}

export interface GeneratedContent {
  post: string;
  author?: {
    name: string;
    handle: string;
    avatar?: string;
    verified?: boolean;
  };
  comments: Comment[];
  likes?: string;
  commentsCount?: string;
  shares?: string;
  views?: string;
  time?: string;
  gradient?: string;
}

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
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    const props = { content, isDarkMode };
    switch (selectedTemplate) {
      case "twitter":
        // @ts-ignore
        return <TwitterCard {...props} />;
      case "facebook":
        // @ts-ignore
        return <FacebookCard {...props} />;
      case "meme":
        return <MemeCard content={content} />;
      case "gradient":
        return <GradientCard content={content} />;
      case "chat":
        return <ChatCard content={content} />;
      case "minimal":
        return <MinimalCard content={content} />;
      default:
        // @ts-ignore
        return <TwitterCard {...props} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />

        {(selectedTemplate === "twitter" ||
          selectedTemplate === "facebook") && (
          <div className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1.5 shadow-sm">
            <Sun className="w-4 h-4 text-muted-foreground" />
            <Switch
              id="dark-mode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Moon className="w-4 h-4 text-muted-foreground" />
            <Label htmlFor="dark-mode" className="sr-only">
              Dark Mode
            </Label>
          </div>
        )}
      </div>

      <div className="flex justify-center p-4 md:p-8 bg-muted/30 rounded-xl border border-border overflow-hidden">
        <div ref={cardRef} className="transform transition-all duration-300">
          {renderTemplate()}
        </div>
      </div>

      <DownloadActions targetRef={cardRef} />
    </div>
  );
}
