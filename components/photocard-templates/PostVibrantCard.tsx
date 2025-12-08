import { GeneratedContent } from "@/components/generator/types";
import { FormattedText } from "@/components/generator/FormattedText";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface PostVibrantCardProps {
  content: GeneratedContent;
}

export function PostVibrantCard({ content }: PostVibrantCardProps) {
  return (
    <div
      className={cn(
        "bg-gradient-to-br from-red-500 via-blue-500 to-purple-600 text-white p-6 rounded-[40px] shadow-2xl max-w-md w-full font-sans min-h-[500px] flex flex-col relative overflow-hidden"
      )}
    >
      {/* Glass Layer */}
      <div className="absolute inset-3 bg-white/10 backdrop-blur-3xl rounded-[32px] border border-white/20" />

      <div className="relative z-10 flex flex-col h-full p-6">
        <div className="flex justify-between items-start">
          <div className="bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
            <span className="text-xs font-bold tracking-wider uppercase">
              ✨ Viral
            </span>
          </div>
          <Sparkles className="w-6 h-6 text-yellow-300 fill-current animate-pulse" />
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center my-8">
          <p className="text-4xl md:text-5xl font-black leading-none tracking-tight drop-shadow-lg">
            <FormattedText text={content.post} />
          </p>
        </div>

        <div className="mt-auto flex items-center gap-3 bg-black/20 p-3 rounded-2xl backdrop-blur-sm">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 overflow-hidden shrink-0">
            <img
              src={content.author?.avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm truncate">{content.author?.name}</p>
            <p className="text-xs text-white/70 truncate">
              @{content.author?.handle}
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-sm">{content.likes}</p>
            <p className="text-[10px] text-white/70 uppercase">Likes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
