import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageCircle,
  Share2,
  ThumbsUp,
  MoreHorizontal,
  Globe,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FacebookCardProps {
  content: GeneratedContent;
  isDarkMode?: boolean;
}

export function FacebookCard({
  content,
  isDarkMode = false,
}: FacebookCardProps) {
  const bgColor = isDarkMode ? "bg-[#0f1117]" : "bg-white";
  const textColor = isDarkMode ? "text-slate-50" : "text-[#050505]";
  const secondaryTextColor = isDarkMode ? "text-slate-400" : "text-[#65676B]";
  const borderColor = isDarkMode ? "border-slate-800" : "border-gray-200";
  const hoverBg = isDarkMode ? "hover:bg-[#1e293b]" : "hover:bg-gray-100";
  const commentBg = isDarkMode ? "bg-[#1e293b]" : "bg-[#F0F2F5]";
  const ringColor = isDarkMode ? "ring-[#0f1117]" : "ring-white";

  const verifiedIcon = (
    <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );

  return (
    <div
      className={cn(
        "max-w-md w-full rounded-xl shadow-lg font-sans border transition-colors duration-300 p-1",
        bgColor,
        borderColor,
        textColor
      )}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-start">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10 border border-black/5">
            <AvatarImage
              src={content.author?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{content.author?.name?.[0] || "VC"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "font-semibold text-[15px] hover:underline cursor-pointer",
                  textColor
                )}
              >
                {content.author?.name || "Viral Creator"}
              </span>
              {content.author?.verified !== false && (
                <div className="bg-blue-500 rounded-full p-[2px] w-3.5 h-3.5 flex items-center justify-center">
                  {verifiedIcon}
                </div>
              )}
            </div>
            <div
              className={cn(
                "flex items-center gap-1 text-[13px]",
                secondaryTextColor
              )}
            >
              <span className="hover:underline cursor-pointer">
                {content.time || "2h"}
              </span>
              <span>·</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>
        <button
          className={cn(
            "p-2 rounded-full transition-colors",
            hoverBg,
            secondaryTextColor
          )}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-4">
        <p
          className={cn(
            "text-[15px] leading-normal whitespace-pre-wrap",
            textColor
          )}
        >
          {content.post}
        </p>
      </div>

      {/* Metrics Bar */}
      <div className="px-4 py-2.5 flex justify-between items-center">
        <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
          <div className="flex -space-x-1">
            {/* Haha Emoji (Yellow) */}
            <div
              className={cn(
                "w-[18px] h-[18px] rounded-full bg-[#f7b928] flex items-center justify-center ring-2 z-30",
                ringColor
              )}
            >
              😆
            </div>
            {/* Heart Emoji (Red) */}
            <div
              className={cn(
                "w-[18px] h-[18px] rounded-full bg-red-500 flex items-center justify-center ring-2 z-20",
                ringColor
              )}
            >
              <Heart className="w-2.5 h-2.5 text-white fill-current" />
            </div>
            {/* Like Emoji (Blue) */}
            <div
              className={cn(
                "w-[18px] h-[18px] rounded-full bg-blue-500 flex items-center justify-center ring-2 z-10",
                ringColor
              )}
            >
              <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
            </div>
          </div>
          <span className={cn("text-[13px]", secondaryTextColor)}>
            {content.likes || "1.2K"}
          </span>
        </div>
        <div className={cn("flex gap-3 text-[13px]", secondaryTextColor)}>
          <span className="hover:underline cursor-pointer">
            {content.commentsCount || "420"} comments
          </span>
          <span className="hover:underline cursor-pointer">
            {content.shares || "56"} shares
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className={cn("px-2 py-1 mx-4 border-t border-b mb-2", borderColor)}>
        <div className="flex">
          <button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors font-medium text-[15px]",
              hoverBg,
              secondaryTextColor
            )}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors font-medium text-[15px]",
              hoverBg,
              secondaryTextColor
            )}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md transition-colors font-medium text-[15px]",
              hoverBg,
              secondaryTextColor
            )}
          >
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {content.comments && content.comments.length > 0 && (
        <div className="px-4 pb-4 space-y-4">
          <div
            className={cn(
              "text-[15px] font-semibold cursor-pointer hover:underline",
              secondaryTextColor
            )}
          >
            Most relevant
          </div>
          {content.comments.map((comment, i) => (
            <div key={i} className="flex gap-2">
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>{comment.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                {/* Comment Bubble */}
                <div className="inline-block">
                  <div className={cn("rounded-2xl px-3 py-2", commentBg)}>
                    <div
                      className={cn(
                        "font-semibold text-[13px] hover:underline cursor-pointer text-left",
                        textColor
                      )}
                    >
                      {comment.username}
                    </div>
                    <p
                      className={cn("text-[15px] leading-[1.3333]", textColor)}
                    >
                      {comment.text}
                    </p>
                  </div>
                  {/* Interaction Links */}
                  <div
                    className={cn(
                      "flex items-center gap-4 mt-1 ml-3 text-[12px] font-bold",
                      secondaryTextColor
                    )}
                  >
                    <span className="cursor-pointer hover:underline">Like</span>
                    <span className="cursor-pointer hover:underline">
                      Reply
                    </span>
                    <span className="font-normal cursor-pointer hover:underline">
                      {comment.time || "1h"}
                    </span>
                  </div>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-2 pl-2 space-y-2 border-l-2 border-transparent">
                    {comment.replies.map((reply, j) => (
                      <div key={j} className="flex gap-2">
                        <Avatar className="w-6 h-6 mt-1 cursor-pointer">
                          <AvatarImage src={reply.avatar} />
                          <AvatarFallback>{reply.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="inline-block">
                            <div
                              className={cn("rounded-2xl px-3 py-2", commentBg)}
                            >
                              <div
                                className={cn(
                                  "font-semibold text-[12px] hover:underline cursor-pointer text-left",
                                  textColor
                                )}
                              >
                                {reply.username}
                              </div>
                              <p
                                className={cn(
                                  "text-[14px] leading-[1.3333]",
                                  textColor
                                )}
                              >
                                {reply.text}
                              </p>
                            </div>
                            <div
                              className={cn(
                                "flex items-center gap-4 mt-1 ml-3 text-[11px] font-bold",
                                secondaryTextColor
                              )}
                            >
                              <span className="cursor-pointer hover:underline">
                                Like
                              </span>
                              <span className="cursor-pointer hover:underline">
                                Reply
                              </span>
                              <span className="font-normal cursor-pointer hover:underline">
                                {reply.time || "30m"}
                              </span>
                            </div>
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
      )}
    </div>
  );
}
