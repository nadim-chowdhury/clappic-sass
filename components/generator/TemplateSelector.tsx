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
];

export function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
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
                "hover:scale-[1.02] hover:shadow-md",
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
    </div>
  );
}
