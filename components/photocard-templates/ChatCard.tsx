import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";

interface ChatCardProps {
  content: GeneratedContent;
}

export function ChatCard({ content }: ChatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[40px] shadow-2xl max-w-md w-full font-sans border border-gray-100 flex flex-col h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2 text-blue-500">
          <ChevronLeft className="w-6 h-6" />
          <span className="text-lg">Back</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mb-1">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={content.author?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                {content.author?.name?.[0] || "VC"}
              </AvatarFallback>
            </Avatar>
          </div>
          <span className="text-xs font-medium text-gray-500">
            {content.author?.name || "iMessage"}
          </span>
        </div>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 px-2 no-scrollbar">
        {/* Timestamp */}
        <div className="text-center">
          <span className="text-xs font-medium text-gray-400">
            Today {content.time || "9:41 AM"}
          </span>
        </div>

        {/* Main Post (Sent by User - Blue Bubble) */}
        <div className="flex justify-end">
          <div className="bg-blue-500 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] text-[17px] leading-snug">
            {content.post}
          </div>
        </div>
        <div className="flex justify-end -mt-2 px-1">
          <span className="text-[10px] font-medium text-gray-400">
            Delivered
          </span>
        </div>

        {/* Replies (Received - Gray Bubble) */}
        {content.comments.map((comment, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* Parent Comment */}
            <div className="flex gap-2 items-end">
              <Avatar className="w-6 h-6 mb-1">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="text-[10px] bg-gray-300">
                  {comment.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 max-w-[75%]">
                <span className="text-xs text-gray-400 ml-3">
                  {comment.username}
                </span>
                <div className="bg-[#e9e9eb] text-black px-4 py-2.5 rounded-2xl rounded-tl-sm text-[17px] leading-snug">
                  {comment.text}
                </div>
              </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="space-y-2">
                {comment.replies.map((reply, j) => (
                  <div key={j} className="flex gap-2 items-end ml-8">
                    <Avatar className="w-5 h-5 mb-1">
                      <AvatarImage src={reply.avatar} />
                      <AvatarFallback className="text-[8px] bg-gray-300">
                        {reply.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1 max-w-[85%]">
                      <span className="text-xs text-gray-400 ml-3">
                        {reply.username}
                      </span>
                      <div className="bg-[#f2f2f5] text-black px-3 py-2 rounded-2xl rounded-tl-sm text-[15px] leading-snug border border-gray-100">
                        {reply.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area (Visual Only) */}
      <div className="mt-4 flex items-center gap-3 px-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
          <span className="text-xl">+</span>
        </div>
        <div className="flex-1 h-9 rounded-full border border-gray-300 bg-white px-3 flex items-center">
          <span className="text-gray-400 text-sm">iMessage</span>
        </div>
      </div>
    </div>
  );
}
