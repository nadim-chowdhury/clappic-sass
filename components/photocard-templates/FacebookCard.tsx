import { GeneratedContent, Comment } from "@/components/generator/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormattedText } from "@/components/generator/FormattedText";
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
  page = 0,
  itemsPerPage = 3,
  overrideComments,
}: FacebookCardProps & {
  page?: number;
  itemsPerPage?: number;
  overrideComments?: Comment[];
}) {
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

  // Pagination logic
  const comments = content.comments || [];
  let currentComments: Comment[] = [];
  let commentLabel = "";

  if (overrideComments) {
    currentComments = overrideComments;
    commentLabel = `Viewing ${currentComments.length} comment${
      currentComments.length > 1 ? "s" : ""
    }`;
  } else {
    const startIdx = (page - 1) * itemsPerPage;
    currentComments =
      page === 0 ? [] : comments.slice(startIdx, startIdx + itemsPerPage);
    commentLabel = `Comments ${startIdx + 1}-${Math.min(
      startIdx + itemsPerPage,
      comments.length
    )}`;
  }

  return (
    <div
      className={cn(
        "w-md rounded-xl shadow-lg font-sans border transition-colors duration-300 p-1 aspect-square flex flex-col overflow-hidden relative",
        bgColor,
        borderColor,
        textColor
      )}
    >
      {page === 0 ? (
        <>
          {/* Header */}
          <div className="p-4 flex justify-between items-start shrink-0">
            <div className="flex gap-3">
              <Avatar className="w-12 h-12 border border-black/5">
                <AvatarImage
                  src={
                    content.author?.avatar || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>
                  {content.author?.name?.[0] || "VC"}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      "font-semibold text-[18px] hover:underline cursor-pointer",
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
                    "flex items-center gap-1 text-[14px]",
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
          <div className="px-4 pb-4 mt-1 flex-1 overflow-hidden relative">
            <p
              className={cn(
                "text-[18px] leading-normal whitespace-pre-wrap max-h-full overflow-hidden text-ellipsis",
                textColor
              )}
            >
              <FormattedText text={content.post} />
            </p>
          </div>

          {/* Metrics & Actions pushed to bottom */}
          <div className="mt-auto shrink-0">
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
            <div
              className={cn(
                "px-2 py-1 mx-4 border-t border-b mb-2",
                borderColor
              )}
            >
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

            {/* Small footer for page 0 to indicate more content */}
            {comments.length > 0 && (
              <div
                className={cn(
                  "px-4 pb-2 text-[12px] text-center",
                  secondaryTextColor
                )}
              >
                Swipe for comments &rarr;
              </div>
            )}
          </div>
        </>
      ) : (
        /* Comments Page Structure */
        <div className="flex flex-col h-full">
          <div
            className={cn(
              "px-4 py-3 border-b shrink-0 flex items-center gap-2",
              borderColor
            )}
          >
            <Avatar className="w-6 h-6 border border-black/5">
              <AvatarImage
                src={content.author?.avatar || "https://github.com/shadcn.png"}
              />
              <AvatarFallback>
                {content.author?.name?.[0] || "VC"}
              </AvatarFallback>
            </Avatar>
            <span className={cn("font-semibold text-[13px]", textColor)}>
              {content.author?.name} · {commentLabel}
            </span>
          </div>

          <div className="p-4 space-y-3 flex-1 overflow-hidden">
            {currentComments.map((comment, i) => (
              <div key={i} className="flex gap-2">
                <Avatar className="w-8 h-8 cursor-pointer shrink-0">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  {/* Comment Bubble */}
                  <div className="inline-block max-w-full relative">
                    <div className={cn("rounded-2xl px-3 py-2", commentBg)}>
                      <div
                        className={cn(
                          "font-semibold text-[13px] hover:underline cursor-pointer text-left truncate",
                          textColor
                        )}
                      >
                        {comment.username}
                      </div>
                      <p
                        className={cn(
                          "text-[14px] leading-[1.3] break-words line-clamp-4",
                          textColor
                        )}
                      >
                        <FormattedText text={comment.text} />
                      </p>
                    </div>
                    {/* Reaction Bubble */}
                    {comment.likes &&
                      comment.reactionIcons &&
                      comment.reactionIcons.length > 0 && (
                        <div
                          className="absolute bottom-[6px] right-[6px] flex items-center bg-white rounded-full p-[2px] shadow-sm border border-gray-200"
                          style={{ zIndex: 10 }}
                        >
                          <div className="flex -space-x-1 mr-1">
                            {comment.reactionIcons.map((icon, rIdx) => (
                              <div
                                key={rIdx}
                                className="w-[14px] h-[14px] flex items-center justify-center text-[10px] rounded-full bg-slate-100 ring-1 ring-white"
                              >
                                {icon}
                              </div>
                            ))}
                          </div>
                          <span
                            className={cn(
                              "text-[11px] pr-1",
                              secondaryTextColor
                            )}
                          >
                            {comment.likes}
                          </span>
                        </div>
                      )}
                    {/* Interaction Links */}
                    <div
                      className={cn(
                        "flex items-center gap-4 mt-1 ml-3 text-[12px] font-bold",
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
                        {comment.time || "1h"}
                      </span>
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-1 pl-2 space-y-2 border-l-2 border-transparent">
                      {comment.replies.map((reply, j) => (
                        <div key={j} className="flex gap-2">
                          <Avatar className="w-5 h-5 mt-1 cursor-pointer shrink-0">
                            <AvatarImage src={reply.avatar} />
                            <AvatarFallback>{reply.username[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="inline-block max-w-full relative">
                              <div
                                className={cn(
                                  "rounded-2xl px-3 py-2",
                                  commentBg
                                )}
                              >
                                <div
                                  className={cn(
                                    "font-semibold text-[12px] hover:underline cursor-pointer text-left truncate",
                                    textColor
                                  )}
                                >
                                  {reply.username}
                                </div>
                                <p
                                  className={cn(
                                    "text-[13px] leading-[1.3] break-words line-clamp-3",
                                    textColor
                                  )}
                                >
                                  <FormattedText text={reply.text} />
                                </p>
                              </div>
                              {/* Reaction Bubble for Reply */}
                              {reply.likes &&
                                reply.reactionIcons &&
                                reply.reactionIcons.length > 0 && (
                                  <div
                                    className="absolute bottom-[6px] right-[6px] flex items-center bg-white rounded-full p-[1px] shadow-sm border border-gray-200"
                                    style={{ zIndex: 10 }}
                                  >
                                    <div className="flex -space-x-1 mr-1">
                                      {reply.reactionIcons.map((icon, rIdx) => (
                                        <div
                                          key={rIdx}
                                          className="w-[12px] h-[12px] flex items-center justify-center text-[9px] rounded-full bg-slate-100 ring-1 ring-white"
                                        >
                                          {icon}
                                        </div>
                                      ))}
                                    </div>
                                    <span
                                      className={cn(
                                        "text-[10px] pr-1",
                                        secondaryTextColor
                                      )}
                                    >
                                      {reply.likes}
                                    </span>
                                  </div>
                                )}
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
          <div
            className={cn(
              "p-2 text-center text-[10px] uppercase tracking-wider opacity-50 font-bold mt-auto",
              secondaryTextColor
            )}
          >
            Page {page}
          </div>
        </div>
      )}
    </div>
  );
}
