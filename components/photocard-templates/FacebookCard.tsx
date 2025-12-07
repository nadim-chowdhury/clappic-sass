import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageCircle, Share2, Globe, Heart } from "lucide-react";

interface FacebookCardProps {
  content: GeneratedContent;
}

export function FacebookCard({ content }: FacebookCardProps) {
  return (
    <div className="bg-white text-black rounded-xl border border-gray-200 shadow-sm max-w-md w-full font-sans overflow-hidden p-1">
      {/* Header */}
      <div className="p-3 flex gap-2 items-start">
        <Avatar className="w-10 h-10 border border-gray-100">
          <AvatarImage
            src={content.author?.avatar || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{content.author?.name?.[0] || "VC"}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[15px] leading-tight text-[#050505]">
              {content.author?.name || "Viral Creator"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>{content.time || "2h"}</span>
            <span>·</span>
            <Globe className="w-3 h-3" />
          </div>
        </div>
        <div className="text-gray-500">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-3">
        <p className="text-[15px] leading-normal whitespace-pre-wrap text-[#050505]">
          {content.post}
        </p>
      </div>

      {/* Stats */}
      <div className="px-3 py-2 flex justify-between items-center text-gray-500 text-sm border-b border-gray-100">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="bg-blue-500 rounded-full p-1 border-2 border-white z-20">
              <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
            </div>
            <div className="bg-red-500 rounded-full p-1 border-2 border-white z-10">
              <Heart className="w-2.5 h-2.5 text-white fill-current" />
            </div>
          </div>
          <span className="ml-1 hover:underline cursor-pointer">
            {content.likes || "2.4K"}
          </span>
        </div>
        <div className="flex gap-3 text-gray-500">
          <span className="hover:underline cursor-pointer">
            {content.commentsCount || "542"} Comments
          </span>
          <span className="hover:underline cursor-pointer">
            {content.shares || "128"} Shares
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between px-2 py-1">
        <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 font-medium text-[15px] hover:bg-gray-50 px-2 py-2 rounded-md transition-colors">
          <ThumbsUp className="w-5 h-5" />
          Like
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 font-medium text-[15px] hover:bg-gray-50 px-2 py-2 rounded-md transition-colors">
          <MessageCircle className="w-5 h-5" />
          Comment
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 font-medium text-[15px] hover:bg-gray-50 px-2 py-2 rounded-md transition-colors">
          <Share2 className="w-5 h-5" />
          Share
        </button>
      </div>

      {/* Comments Preview */}
      <div className="bg-gray-50/50 p-3 space-y-3 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-600 cursor-pointer hover:underline">
          View more comments
        </div>
        {content.comments.map((comment, i) => (
          <div key={i} className="flex gap-2 group">
            <Avatar className="w-8 h-8 mt-0.5">
              <AvatarImage src={comment.avatar} />
              <AvatarFallback className="bg-gray-200 text-gray-600 text-xs font-bold">
                {comment.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block">
                <div className="font-bold text-[13px] text-[#050505] cursor-pointer hover:underline">
                  {comment.username}
                </div>
                <div className="text-[15px] text-[#050505] leading-snug">
                  {comment.text}
                </div>
              </div>
              <div className="flex gap-3 mt-1 ml-1 text-xs font-bold text-gray-500">
                <span className="cursor-pointer hover:underline">Like</span>
                <span className="cursor-pointer hover:underline">Reply</span>
                <span className="font-normal text-gray-400">
                  {comment.time || "1h"}
                </span>
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-2 space-y-2">
                  {comment.replies.map((reply, j) => (
                    <div key={j} className="flex gap-2">
                      <Avatar className="w-6 h-6 mt-0.5">
                        <AvatarImage src={reply.avatar} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-[10px] font-bold">
                          {reply.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-2xl px-3 py-1.5 inline-block">
                          <div className="font-bold text-[12px] text-[#050505] cursor-pointer hover:underline">
                            {reply.username}
                          </div>
                          <div className="text-[14px] text-[#050505] leading-snug">
                            {reply.text}
                          </div>
                        </div>
                        <div className="flex gap-3 mt-1 ml-1 text-[11px] font-bold text-gray-500">
                          <span className="cursor-pointer hover:underline">
                            Like
                          </span>
                          <span className="cursor-pointer hover:underline">
                            Reply
                          </span>
                          <span className="font-normal text-gray-400">
                            {reply.time || "30m"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
