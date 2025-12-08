import { GeneratedContent } from "@/components/generator/types";
import { FormattedText } from "@/components/generator/FormattedText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CassetteTape } from "lucide-react";

interface PostRetroCardProps {
  content: GeneratedContent;
}

export function PostRetroCard({ content }: PostRetroCardProps) {
  return (
    <div className="bg-[#2b0f54] text-[#ff00ff] p-8 rounded-lg shadow-xl max-w-md w-full font-mono border-4 border-[#00ffff] min-h-[500px] flex flex-col relative overflow-hidden">
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #ff00ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          transform:
            "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)",
        }}
      />

      {/* Sun/Moon Retro Decoration */}
      <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-b from-[#ff0080] to-[#ffcc00] opacity-80 blur-sm" />

      <div className="relative z-10 flex flex-col h-full border-2 border-[#ff00ff] bg-black/40 backdrop-blur-sm p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 border-b-2 border-[#00ffff] pb-4">
          <Avatar className="w-12 h-12 ring-2 ring-[#ff00ff] ring-offset-2 ring-offset-[#2b0f54]">
            <AvatarImage src={content.author?.avatar} />
            <AvatarFallback className="bg-[#00ffff] text-[#2b0f54] font-bold">
              {content.author?.name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-lg text-[#00ffff] uppercase tracking-widest drop-shadow-[2px_2px_0px_rgba(255,0,255,0.5)]">
              {content.author?.name}
            </p>
            <p className="text-xs text-[#ff00ff] uppercase">
              @{content.author?.handle}
            </p>
          </div>
          <CassetteTape className="w-8 h-8 text-[#ffcc00] animate-spin-slow" />
        </div>

        {/* Body */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-bold leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-white to-[#ff00ff] drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] text-center">
            <FormattedText text={content.post} />
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t-2 border-[#ff00ff] flex justify-between items-center text-xs uppercase tracking-[0.2em] text-[#00ffff]">
          <span>{content.time || "198X"}</span>
          <div className="flex gap-4">
            <span className="animate-pulse">REC ●</span>
          </div>
        </div>
      </div>
    </div>
  );
}
