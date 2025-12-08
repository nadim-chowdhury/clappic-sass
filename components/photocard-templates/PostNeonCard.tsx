import { GeneratedContent } from "@/components/generator/PreviewSection";
import { FormattedText } from "@/components/generator/FormattedText";

interface PostNeonCardProps {
  content: GeneratedContent;
}

export function PostNeonCard({ content }: PostNeonCardProps) {
  return (
    <div className="bg-slate-950 text-cyan-400 p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] max-w-md w-full font-mono border border-cyan-500/30 min-h-[500px] flex flex-col relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#083344_1px,transparent_1px),linear-gradient(to_bottom,#083344_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

      <div className="relative z-10 flex flex-col h-full border border-cyan-500/20 p-6 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex justify-between items-center border-b border-cyan-500/30 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
            <span className="text-xs uppercase tracking-widest">
              {content.author?.handle || "SYSTEM"}
            </span>
          </div>
          <span className="text-xs text-cyan-600">
            ID: {Math.floor(Math.random() * 99999)}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl md:text-2xl leading-relaxed text-center drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            &gt; <FormattedText text={content.post} />{" "}
            <span className="animate-pulse">_</span>
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-cyan-500/30 flex justify-between text-[10px] uppercase text-cyan-700">
          <span>Encryption: ON</span>
          <span>{content.time || "00:00:00"}</span>
        </div>
      </div>
    </div>
  );
}
