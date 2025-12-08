import { GeneratedContent } from "@/components/generator/types";
import { FormattedText } from "@/components/generator/FormattedText";
import { AlertTriangle, Terminal } from "lucide-react";

interface PostGlitchCardProps {
  content: GeneratedContent;
}

export function PostGlitchCard({ content }: PostGlitchCardProps) {
  return (
    <div className="bg-neutral-950 text-green-500 p-2 rounded-none max-w-md w-full font-mono min-h-[500px] flex flex-col relative overflow-hidden clip-path-polygon">
      {/* Glitch Overlay Effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMzgxNzE3IiAvPgo8L3N2Zz4=')] opacity-20 pointer-events-none" />

      {/* Red/Blue offset borders */}
      <div className="absolute inset-0 border-l-4 border-red-600 opacity-50 mix-blend-screen translate-x-[2px]" />
      <div className="absolute inset-0 border-r-4 border-blue-600 opacity-50 mix-blend-screen -translate-x-[2px]" />

      <div className="relative z-10 flex flex-col h-full bg-black border border-neutral-800 p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-2 text-red-500">
            <AlertTriangle className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">
              System_Error
            </span>
          </div>
          <div className="text-right">
            <span className="block text-xs text-neutral-500">USER_ID</span>
            <span className="font-bold text-white tracking-wider">
              {content.author?.handle || "UNKNOWN"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center relative">
          {/* Glitch Shadows */}
          <p className="absolute top-0 left-0 w-full text-2xl md:text-3xl font-bold leading-tight text-red-600 opacity-40 translate-x-[-2px] translate-y-[-2px] select-none blur-[1px]">
            <FormattedText text={content.post} />
          </p>
          <p className="absolute top-0 left-0 w-full text-2xl md:text-3xl font-bold leading-tight text-blue-600 opacity-40 translate-x-[2px] translate-y-[2px] select-none blur-[1px]">
            <FormattedText text={content.post} />
          </p>

          {/* Main Text */}
          <p className="relative z-10 text-2xl md:text-3xl font-bold leading-tight text-white mix-blend-hard-light">
            <FormattedText text={content.post} />
            <span className="inline-block w-3 h-8 bg-green-500 ml-1 animate-pulse align-middle" />
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-neutral-800 flex justify-between items-end text-[10px] text-neutral-400 font-mono">
          <div className="flex flex-col gap-1">
            <span>RAM: 64KB OK</span>
            <span>LOAD: "VIRAL_POST.EXE"</span>
          </div>
          <Terminal className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-4 w-full animate-scanline pointer-events-none" />
    </div>
  );
}
