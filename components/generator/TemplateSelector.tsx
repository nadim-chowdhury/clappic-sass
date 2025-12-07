import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TemplateSelectorProps {
  selectedTemplate: string;
  setSelectedTemplate: (value: string) => void;
}

const templates = [
  { id: "twitter", name: "Twitter X", color: "bg-blue-500" },
  { id: "facebook", name: "Facebook", color: "bg-blue-600" },
  { id: "meme", name: "Dark Meme", color: "bg-black border border-white" },
  { id: "chat", name: "Group Chat", color: "bg-green-500" },
  {
    id: "minimal",
    name: "Minimalist",
    color: "bg-white border border-gray-200 text-black",
  },
];

export function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
}: TemplateSelectorProps) {
  return (
    <div className="space-y-3">
      <Label>Choose Style</Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={cn(
              "h-16 rounded-lg border-2 transition-all flex items-center justify-center font-medium text-sm shadow-sm hover:scale-105",
              selectedTemplate === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-transparent opacity-70 hover:opacity-100",
              template.color
            )}
          >
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}
