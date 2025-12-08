import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Twitter,
  Facebook,
  MessageCircle,
  Sparkles,
  Quote,
  LayoutTemplate,
} from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (value: string) => void;
  subTemplate?: string;
  setSubTemplate?: (value: string) => void;
}

const templates = [
  {
    id: "twitter",
    name: "Twitter X",
    icon: Twitter,
    color: "bg-black text-white border-zinc-800",
    activeColor: "ring-zinc-500",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600 text-white border-blue-500",
    activeColor: "ring-blue-400",
  },
  {
    id: "gradient",
    name: "Viral",
    icon: Sparkles,
    color:
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-transparent",
    activeColor: "ring-purple-400",
    isNew: true,
  },
  {
    id: "meme",
    name: "Meme",
    icon: LayoutTemplate,
    color: "bg-white text-black border-gray-200",
    activeColor: "ring-gray-400",
  },
  {
    id: "chat",
    name: "Chat",
    icon: MessageCircle,
    color: "bg-green-500 text-white border-green-400",
    activeColor: "ring-green-400",
  },
  {
    id: "minimal",
    name: "Minimal",
    icon: Quote,
    color: "bg-gray-50 text-gray-900 border-gray-200",
    activeColor: "ring-gray-300",
  },
  {
    id: "post-only",
    name: "Post Only",
    icon: LayoutTemplate,
    color: "bg-indigo-600 text-white border-indigo-500",
    activeColor: "ring-indigo-400",
    isNew: true,
  },
];

const postOnlyTemplates = [
  {
    id: "bold",
    name: "Bold",
    description: "High impact",
    color: "bg-yellow-400 text-black",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean & airy",
    color: "bg-white text-black border border-gray-200",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Cyberpunk",
    color: "bg-slate-900 text-cyan-400",
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Serif & Gold",
    color: "bg-[#FDFBF7] text-slate-800 border-stone-200",
  },
  {
    id: "vibrant",
    name: "Vibrant",
    description: "Gradient",
    color:
      "bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 text-white",
  },
  {
    id: "raw",
    name: "Raw",
    description: "Brutalist",
    color: "bg-stone-200 text-stone-800 border-2 border-stone-800",
  },
  {
    id: "retro",
    name: "Retro",
    description: "Vaporwave",
    color: "bg-[#2b0f54] text-[#ff00ff] border-[#00ffff]",
    isNew: true,
  },
  {
    id: "glitch",
    name: "Glitch",
    description: "Cyberpunk",
    color: "bg-neutral-950 text-green-500 border-red-500",
    isNew: true,
  },
];

export function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
  subTemplate,
  setSubTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Choose Style</Label>
        <span className="text-xs text-muted-foreground">
          {templates.length} styles available
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {templates.map((template) => {
          const Icon = template.icon;
          const isSelected = selectedTemplate === template.id;

          return (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={cn(
                "relative group flex flex-col items-center justify-center gap-3 p-4 h-24 rounded-xl border-2 transition-all duration-200",
                "hover:shadow-md",
                isSelected
                  ? cn("ring-2 ring-offset-2", template.activeColor)
                  : "hover:border-primary/50",
                template.color
              )}
            >
              {template.isNew && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                  NEW
                </span>
              )}
              <Icon className="w-6 h-6" />
              <span className="font-medium text-sm">{template.name}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Selector for Post Only */}
      {selectedTemplate === "post-only" && setSubTemplate && (
        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-sm font-semibold text-muted-foreground">
            Select Style
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {postOnlyTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSubTemplate(t.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all",
                  subTemplate === t.id
                    ? "ring-2 ring-offset-2 ring-primary border-transparent"
                    : "border-transparent hover:bg-muted",
                  t.color
                )}
              >
                <span className="font-bold text-sm">{t.name}</span>
                <span className="text-[10px] opacity-80">{t.description}</span>
                {/* @ts-ignore */}
                {t.isNew && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
