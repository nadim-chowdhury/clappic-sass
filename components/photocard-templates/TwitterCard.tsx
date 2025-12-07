import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

interface TwitterCardProps {
  content: GeneratedContent;
}

export function TwitterCard({ content }: TwitterCardProps) {
  return (
    <div className="bg-white text-black p-6 pb-2 rounded-xl border border-gray-200 shadow-xl max-w-md w-full font-sans">
      {/* Main Post */}
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 border border-gray-100">
          <AvatarImage
            src={content.author?.avatar || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{content.author?.name?.[0] || "VC"}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-[15px] text-[#0f1419] truncate">
              {content.author?.name || "Viral Creator"}
            </span>
            {content.author?.verified !== false && (
              <svg
                viewBox="0 0 24 24"
                aria-label="Verified account"
                className="w-[18px] h-[18px] text-[#1d9bf0] fill-current"
              >
                <g>
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </g>
              </svg>
            )}
            <span className="text-gray-500 text-[15px] truncate">
              {content.author?.handle || "viral_god"} · {content.time || "2h"}
            </span>
          </div>
          <p className="mt-1 text-[15px] leading-normal whitespace-pre-wrap text-[#0f1419]">
            {content.post}
          </p>

          {/* Metrics */}
          <div className="flex justify-between mt-3 text-gray-500 text-[13px] max-w-[90%]">
            <div className="flex items-center gap-1.5 group cursor-pointer hover:text-[#1d9bf0]">
              <MessageCircle className="w-[18px] h-[18px] group-hover:bg-[#1d9bf0]/10 rounded-full p-0.5 box-content transition-colors" />
              <span>{content.commentsCount || "5.2k"}</span>
            </div>
            <div className="flex items-center gap-1.5 group cursor-pointer hover:text-[#00ba7c]">
              <Repeat className="w-[18px] h-[18px] group-hover:bg-[#00ba7c]/10 rounded-full p-0.5 box-content transition-colors" />
              <span>{content.shares || "1.2k"}</span>
            </div>
            <div className="flex items-center gap-1.5 group cursor-pointer hover:text-[#f91880]">
              <Heart className="w-[18px] h-[18px] group-hover:bg-[#f91880]/10 rounded-full p-0.5 box-content transition-colors" />
              <span>{content.likes || "15k"}</span>
            </div>
            <div className="flex items-center gap-1.5 group cursor-pointer hover:text-[#1d9bf0]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-[18px] h-[18px] fill-current group-hover:bg-[#1d9bf0]/10 rounded-full p-0.5 box-content transition-colors"
              >
                <g>
                  <path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z" />
                </g>
              </svg>
              <span>{content.views || "450K"}</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-[#1d9bf0]">
              <Share className="w-[18px] h-[18px] group-hover:bg-[#1d9bf0]/10 rounded-full p-0.5 box-content transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 my-4" />

      {/* Replies Section */}
      <div className="">
        {content.comments.map((comment, i) => (
          <div
            key={i}
            className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-lg"
          >
            {/* Parent Comment */}
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 border border-gray-200">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>
                  {comment.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-[#0f1419] truncate">
                    {comment.username}
                  </span>
                  <span className="text-gray-500 text-sm truncate">
                    @{comment.handle}
                  </span>
                  <span className="text-gray-500 text-sm">
                    · {comment.time || "1h"}
                  </span>
                </div>
                <p className="text-[#0f1419] leading-normal whitespace-pre-wrap text-[15px]">
                  {comment.text}
                </p>

                {/* Action Icons for Comment */}
                <div className="flex gap-12 mt-2 text-gray-500">
                  <MessageCircle className="w-4 h-4 cursor-pointer hover:text-blue-400" />
                  <Heart className="w-4 h-4 cursor-pointer hover:text-pink-500" />
                  <Share className="w-4 h-4 cursor-pointer hover:text-green-500" />
                </div>
              </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3 pl-12 space-y-3 relative">
                {/* Connecting line (optional) */}
                <div className="absolute left-[22px] top-[-10px] bottom-4 w-0.5 bg-gray-200 hidden"></div>

                {comment.replies.map((reply, j) => (
                  <div key={j} className="flex gap-3 relative z-10">
                    <Avatar className="w-8 h-8 border border-gray-200">
                      <AvatarImage src={reply.avatar} />
                      <AvatarFallback>
                        {reply.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-[#0f1419] text-sm truncate">
                          {reply.username}
                        </span>
                        <span className="text-gray-500 text-xs truncate">
                          {reply.handle}
                        </span>
                        <span className="text-gray-500 text-xs">
                          · {reply.time || "30m"}
                        </span>
                      </div>
                      <p className="text-[#0f1419] leading-normal text-sm">
                        {reply.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
