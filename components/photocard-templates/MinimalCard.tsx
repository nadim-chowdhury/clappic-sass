import { GeneratedContent } from "@/hooks/use-photocard";
import { Quote } from "lucide-react";

interface MinimalCardProps {
  content: GeneratedContent;
}

export function MinimalCard({ content }: MinimalCardProps) {
  return (
    <div className="bg-white text-black p-10 rounded-none border border-gray-100 shadow-xl max-w-md w-full font-serif flex flex-col items-center text-center relative">
      <Quote className="w-12 h-12 text-gray-200 absolute top-6 left-6 rotate-180" />

      <div className="my-8 relative z-10">
        <p className="text-2xl font-medium leading-relaxed italic">
          "{content.post}"
        </p>
      </div>

      <div className="w-12 h-px bg-gray-300 my-6" />

      <div className="space-y-6 w-full">
        {content.replies.map((reply, i) => (
          <div key={i} className="flex flex-col items-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-1">
              {reply.username}
            </p>
            <p className="text-base text-gray-700">"{reply.text}"</p>
          </div>
        ))}
      </div>

      <Quote className="w-12 h-12 text-gray-200 absolute bottom-6 right-6" />
    </div>
  );
}
