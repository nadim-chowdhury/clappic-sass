import { GeneratedContent } from "@/components/generator/PreviewSection";
import { FormattedText } from "@/components/generator/FormattedText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostModernCardProps {
  content: GeneratedContent;
}

export function PostModernCard({ content }: PostModernCardProps) {
  return (
    <div className="bg-white text-gray-900 p-10 rounded-[40px] shadow-xl max-w-md w-full font-sans border border-gray-100 min-h-[600px] flex flex-col relative overflow-hidden">
      {/* Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 opacity-50" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-50 rounded-tr-full -ml-12 -mb-12 opacity-50" />

      <div className="relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-14 h-14 ring-4 ring-gray-50">
            <AvatarImage src={content.author?.avatar} />
            <AvatarFallback>{content.author?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{content.author?.name}</p>
            <p className="text-sm text-gray-400">@{content.author?.handle}</p>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex items-center">
          <p className="text-3xl font-medium leading-tight text-gray-800">
            <FormattedText text={content.post} />
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 flex justify-between items-center text-sm text-gray-400 font-medium">
          <span>{content.time || "Just now"}</span>
          <div className="flex gap-4">
            <span>{content.likes || "2.4K"} likes</span>
            <span>{content.shares || "840"} shares</span>
          </div>
        </div>
      </div>
    </div>
  );
}
