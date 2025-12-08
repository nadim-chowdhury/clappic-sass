import { GeneratedContent } from "@/components/generator/types";
import { FormattedText } from "@/components/generator/FormattedText";

interface PostRawCardProps {
  content: GeneratedContent;
}

export function PostRawCard({ content }: PostRawCardProps) {
  return (
    <div className="bg-stone-200 text-stone-900 p-4 rounded-none shadow-none max-w-md w-full font-mono border-2 border-stone-800 min-h-[500px] flex flex-col relative">
      {/* Header Bar */}
      <div className="border-b-2 border-stone-800 pb-4 mb-4 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-stone-500">Subject</span>
          <span className="font-bold uppercase tracking-tighter">
            POST_CONTENT_V1
          </span>
        </div>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-full border border-stone-800 bg-transparent" />
          <div className="w-3 h-3 rounded-full border border-stone-800 bg-stone-800" />
          <div className="w-3 h-3 rounded-full border border-stone-800 bg-transparent" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white border border-stone-800 p-6 shadow-[4px_4px_0px_0px_rgba(28,25,23,1)] overflow-hidden flex flex-col">
        <p className="text-xl leading-relaxed whitespace-pre-wrap flex-1 font-medium">
          <FormattedText text={content.post} />
        </p>
      </div>

      {/* Meta Data */}
      <div className="mt-4 pt-4 border-t-2 border-stone-800 grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="uppercase text-stone-500">Author</p>
          <p className="font-bold">{content.author?.handle}</p>
        </div>
        <div className="text-right">
          <p className="uppercase text-stone-500">Timestamp</p>
          <p className="font-bold">{content.time}</p>
        </div>
      </div>

      <div className="absolute top-2 right-2 text-[10px] font-bold opacity-30 rotate-90 origin-top-right">
        RAW_MODE
      </div>
    </div>
  );
}
