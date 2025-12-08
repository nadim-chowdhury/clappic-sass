import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormattedText } from "@/components/generator/FormattedText";
import { Phone, Video, Info, Heart, Send, ImageIcon } from "lucide-react";

interface ChatCardProps {
  content: GeneratedContent;
}

export function ChatCard({ content }: ChatCardProps) {
  return (
    <div className="bg-white p-6 rounded-[32px] shadow-2xl max-w-md w-full font-sans flex flex-col min-h-[600px] h-auto relative overflow-hidden border border-gray-50">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-50 pb-4 mb-6 z-10 relative">
        <Avatar className="w-11 h-11 border border-gray-100">
          <AvatarImage
            src={content.author?.avatar || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>{content.author?.name?.[0] || "VC"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-[15px] text-gray-900 leading-tight">
            {content.author?.name || "Viral Creator"}
          </span>
          <span className="text-xs text-gray-400 font-medium">Active now</span>
        </div>
        <div className="ml-auto flex items-center gap-4 text-indigo-500/80">
          <Phone className="w-5 h-5" />
          <Video className="w-6 h-6" />
          <Info className="w-5 h-5 text-gray-300" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 space-y-6 overflow-visible">
        {/* Timestamp */}
        <div className="text-center">
          <span className="text-[10px] font-semibold text-gray-300 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {content.time || "Today"}
          </span>
        </div>

        {/* Main Post (Sent by User - Gradient) */}
        <div className="flex flex-col items-end gap-1">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white px-5 py-3 rounded-[22px] rounded-br-[4px] shadow-lg shadow-indigo-500/20 max-w-[85%] text-[16px] leading-[1.45] font-normal">
            <FormattedText text={content.post} />
          </div>
          <span className="text-[10px] font-medium text-gray-300 mr-1">
            Sent
          </span>
        </div>

        {/* Replies (Received) */}
        {content.comments.map((comment, i) => (
          <div key={i} className="space-y-4">
            {/* Parent Comment */}
            <div className="flex gap-3 items-end group">
              <Avatar className="w-8 h-8 mb-1 ring-2 ring-white shadow-sm">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback className="bg-gray-100 text-xs font-bold text-gray-600">
                  {comment.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 max-w-[80%]">
                <span className="text-[10px] text-gray-400 ml-3 font-medium">
                  {comment.username}
                </span>
                <div className="bg-gray-100 text-gray-900 px-5 py-3 rounded-[22px] rounded-bl-[4px] text-[15px] leading-snug group-hover:bg-gray-200/80 transition-colors">
                  <FormattedText text={comment.text} />
                </div>
              </div>
            </div>

            {/* Nested Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="pl-12 space-y-3 relative">
                {/* Visual Thread Line */}
                <div className="absolute left-[20px] top-[-10px] bottom-6 w-[2px] bg-gray-100 rounded-full" />

                {comment.replies.map((reply, j) => (
                  <div key={j} className="flex gap-2 items-end relative z-10">
                    <Avatar className="w-6 h-6 mb-1 ring-2 ring-white">
                      <AvatarImage src={reply.avatar} />
                      <AvatarFallback className="bg-gray-100 text-[8px]">
                        {reply.username[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col gap-1">
                      <div className="bg-white border border-gray-100 text-gray-800 px-4 py-2 rounded-[18px] text-sm leading-snug shadow-sm">
                        <FormattedText text={reply.text} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-8 pt-0 flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 cursor-pointer hover:bg-indigo-100 transition-colors">
          <ImageIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 bg-gray-100 rounded-full h-11 px-5 flex items-center text-sm text-gray-400 hover:bg-gray-200/50 transition-colors cursor-text">
          Message...
        </div>
        <div className="text-violet-500 cursor-pointer hover:scale-110 transition-transform">
          <Heart className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
