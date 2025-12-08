import { GeneratedContent } from "@/components/generator/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormattedText } from "@/components/generator/FormattedText";
import { Heart, MessageCircle, Repeat2, Share, BarChart2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TwitterCardProps {
  content: GeneratedContent;
  isDarkMode?: boolean;
}

export function TwitterCard({ content, isDarkMode = false }: TwitterCardProps) {
  // Layered Verified Icon: Blue Background + White Check
  const verifiedIcon = (
    <div className="relative w-5 h-5 flex items-center justify-center">
      {/* Background: Blue Starburst/Cog */}
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
        alt="verified"
        width={24}
        height={24}
      />
    </div>
  );

  const textColor = isDarkMode ? "text-white" : "text-[#0f1419]";
  const subTextColor = isDarkMode ? "text-[#71767b]" : "text-[#536471]";
  const borderColor = isDarkMode ? "border-[#2f3336]" : "border-[#eff3f4]";
  const bgColor = isDarkMode ? "bg-black" : "bg-white";
  const hoverBg = isDarkMode ? "hover:bg-[#16181c]" : "hover:bg-[#f7f9f9]";

  return (
    <div
      className={cn(
        "p-6 pb-3 rounded-xl shadow-2xl max-w-md w-full font-sans border transition-colors duration-300",
        bgColor,
        borderColor
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={content.author?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{content.author?.name?.[0] || "VC"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 group cursor-pointer">
              <span
                className={cn(
                  "font-bold text-[15px] hover:underline",
                  textColor
                )}
              >
                {content.author?.name || "Viral Creator"}
              </span>
              {content.author?.verified !== false && verifiedIcon}
            </div>
            <span className={cn("text-[15px]", subTextColor)}>
              @{content.author?.handle || "viral_god"}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "text-2xl leading-4 cursor-pointer hover:bg-opacity-10 rounded-full p-2 w-8 h-8 flex items-center justify-center transition-colors",
            subTextColor,
            hoverBg
          )}
        >
          ...
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p
          className={cn("text-[20px] leading-8 whitespace-pre-wrap", textColor)}
        >
          <FormattedText text={content.post} />
        </p>
      </div>

      {/* Date */}
      <div className="mb-4">
        <span
          className={cn(
            "text-[15px] hover:underline cursor-pointer",
            subTextColor
          )}
        >
          {content.time ? `${content.time} ago` : "8:42 PM · Jun 21, 2024"}
        </span>
        <span className={cn("mx-1", subTextColor)}>·</span>
        <span className={cn("font-bold", textColor)}>
          {content.views || "4.2M"}
        </span>{" "}
        <span className={subTextColor}>Views</span>
      </div>

      {/* Metrics Divider */}
      <div className={cn("h-px w-full my-1", borderColor)} />

      {/* Metrics */}
      <div
        className={cn(
          "flex justify-between items-center py-2 px-2 border-y",
          borderColor
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 group cursor-pointer text-sm transition-colors",
            subTextColor,
            "hover:text-blue-500"
          )}
        >
          <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
            <MessageCircle className="w-[1.25rem] h-[1.25rem]" />
          </div>
          <span>{content.commentsCount || "542"}</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 group cursor-pointer text-sm transition-colors",
            subTextColor,
            "hover:text-green-500"
          )}
        >
          <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors">
            <Repeat2 className="w-[1.25rem] h-[1.25rem]" />
          </div>
          <span>{content.shares || "12K"}</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 group cursor-pointer text-sm transition-colors",
            subTextColor,
            "hover:text-pink-500"
          )}
        >
          <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
            <Heart className="w-[1.25rem] h-[1.25rem]" />
          </div>
          <span>{content.likes || "45K"}</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 group cursor-pointer text-sm transition-colors",
            subTextColor,
            "hover:text-blue-500"
          )}
        >
          <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
            <BarChart2 className="w-[1.25rem] h-[1.25rem]" />
          </div>
          <span>{content.views || "1M"}</span>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 group cursor-pointer text-sm transition-colors",
            subTextColor,
            "hover:text-blue-500"
          )}
        >
          <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors">
            <Share className="w-[1.25rem] h-[1.25rem]" />
          </div>
        </div>
      </div>

      <div className={cn("h-px w-full my-1", borderColor)} />

      {/* Comments / Thread */}
      {content.comments && content.comments.length > 0 && (
        <div className="mt-2">
          {content.comments.map((comment, i) => (
            <div key={i} className={cn("pt-3")}>
              {/* Parent Comment */}
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 pb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={cn(
                        "font-bold text-[15px] hover:underline cursor-pointer",
                        textColor
                      )}
                    >
                      {comment.username}
                    </span>
                    <span className={cn("text-[15px]", subTextColor)}>
                      @{comment.handle} · {comment.time || "2h"}
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-[15px] whitespace-pre-wrap mt-0.5",
                      textColor
                    )}
                  >
                    <FormattedText text={comment.text} />
                  </p>
                </div>
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div
                  className={cn(
                    "ml-12 pl-4 border-l-2 space-y-3 mb-3",
                    isDarkMode ? "border-slate-800" : "border-slate-200"
                  )}
                >
                  {comment.replies.map((reply, j) => (
                    <div key={j} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={reply.avatar} />
                        <AvatarFallback>{reply.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "font-bold text-sm hover:underline cursor-pointer",
                              textColor
                            )}
                          >
                            {reply.username}
                          </span>
                          <span className={cn("text-sm", subTextColor)}>
                            @{reply.handle}
                          </span>
                        </div>
                        <p className={cn("text-sm mt-0.5", textColor)}>
                          <FormattedText text={reply.text} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
