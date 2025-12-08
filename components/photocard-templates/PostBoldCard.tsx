import { GeneratedContent } from "@/components/generator/types";
import { FormattedText } from "@/components/generator/FormattedText";

interface PostBoldCardProps {
  content: GeneratedContent;
}

export function PostBoldCard({ content }: PostBoldCardProps) {
  return (
    <div className="bg-yellow-400 text-black p-8 md:p-12 rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full font-serif border-4 border-black min-h-[500px] flex flex-col justify-center items-center text-center relative overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 bg-black" />
      <div className="absolute top-0 right-0 w-4 h-4 bg-black" />
      <div className="absolute bottom-0 left-0 w-4 h-4 bg-black" />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-black" />

      <div className="relative z-10 space-y-6">
        <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest transform -rotate-2">
          Warning: Viral Content
        </div>

        <p className="text-4xl md:text-5xl font-black uppercase leading-[0.9] tracking-tighter">
          <FormattedText text={content.post} />
        </p>

        <div className="pt-6 flex flex-col items-center gap-2">
          <div className="h-1 w-20 bg-black mb-2" />
          <p className="font-bold text-lg">
            {content.author?.name || "The Author"}
          </p>
        </div>
      </div>
    </div>
  );
}
