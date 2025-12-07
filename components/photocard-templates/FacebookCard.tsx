import { GeneratedContent } from "@/hooks/use-photocard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2, Globe } from "lucide-react";

interface FacebookCardProps {
  content: GeneratedContent;
}

export function FacebookCard({ content }: FacebookCardProps) {
  return (
    <div className="bg-white text-black p-4 rounded-xl border border-gray-300 shadow-sm max-w-md w-full font-sans">
      {/* Header */}
      <div className="flex gap-2 mb-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold text-sm leading-tight">Viral Creator</div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>2h</span>
            <span>·</span>
            <Globe className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-base leading-normal whitespace-pre-wrap">
          {content.post}
        </p>
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center text-gray-500 text-sm mb-3">
        <div className="flex items-center gap-1">
          <div className="bg-blue-500 rounded-full p-1">
            <ThumbsUp className="w-2 h-2 text-white fill-current" />
          </div>
          <span>245</span>
        </div>
        <div className="flex gap-3">
          <span>54 Comments</span>
          <span>12 Shares</span>
        </div>
      </div>

      <div className="h-px bg-gray-200 mb-2" />

      {/* Actions */}
      <div className="flex justify-between px-4 mb-2">
        <button className="flex items-center gap-2 text-gray-500 font-medium text-sm hover:bg-gray-100 px-4 py-2 rounded-md transition-colors">
          <ThumbsUp className="w-5 h-5" />
          Like
        </button>
        <button className="flex items-center gap-2 text-gray-500 font-medium text-sm hover:bg-gray-100 px-4 py-2 rounded-md transition-colors">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>
        <button className="flex items-center gap-2 text-gray-500 font-medium text-sm hover:bg-gray-100 px-4 py-2 rounded-md transition-colors">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      <div className="h-px bg-gray-200 mb-4" />

      {/* Comments */}
      <div className="space-y-3">
        {content.replies.map((reply, i) => (
          <div key={i} className="flex gap-2">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs font-bold">
                {reply.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-2xl px-3 py-2 flex-1">
              <div className="font-bold text-xs text-gray-900">
                {reply.username}
              </div>
              <div className="text-sm text-gray-800 leading-snug">
                {reply.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
