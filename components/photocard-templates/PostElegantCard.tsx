import { GeneratedContent } from "@/components/generator/types";
import { FormattedText } from "@/components/generator/FormattedText";
import { cn } from "@/lib/utils";

interface PostElegantCardProps {
  content: GeneratedContent;
}

export function PostElegantCard({ content }: PostElegantCardProps) {
  return (
    <div className="bg-[#FDFBF7] text-slate-800 p-12 rounded-none shadow-sm max-w-md w-full font-serif border border-stone-200 min-h-[500px] flex flex-col items-center justify-between relative overflow-hidden">
      {/* Border Inset */}
      <div className="absolute inset-4 border border-stone-300 pointer-events-none" />

      {/* Header */}
      <div className="z-10 text-center space-y-2 pt-4">
        <div className="w-1 h-8 bg-amber-400 mx-auto" />
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
          The Words of
        </p>
        <p className="text-lg font-bold italic font-sans text-stone-800">
          {content.author?.name || "Author"}
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-8">
        <p className="text-3xl md:text-4xl text-center font-medium leading-tight text-slate-900 drop-shadow-sm">
          &ldquo;
          <FormattedText text={content.post} />
          &rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="z-10 pb-4 flex flex-col items-center gap-2">
        <div className="text-amber-500 text-xl">✦</div>
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          {content.time || "Recently"}
        </p>
      </div>
    </div>
  );
}
