import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MinimalCardProps {
  content: GeneratedContent;
}

export function MinimalCard({ content }: MinimalCardProps) {
  return (
    <div className="bg-white text-black p-8 md:p-10 rounded-xl shadow-2xl max-w-md w-full font-sans flex flex-col relative overflow-hidden border border-gray-100">
      <div className="flex-1 space-y-8">
        {/* Header - Editorial Style */}
        <div className="flex justify-between items-end border-b-2 border-black pb-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
              Topic
            </span>
          </div>
          <span className="text-xs font-mono text-gray-400 mb-1">
            {content.time || "Now"}
          </span>
        </div>

        {/* POST CONTENT */}
        <div className="space-y-6">
          <p className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight text-black">
            {content.post}
          </p>

          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-black bg-gray-100">
              <AvatarImage
                src={content.author?.avatar}
                className="object-cover"
              />
              <AvatarFallback className="bg-black text-white font-bold">
                {content.author?.name?.[0] || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-none">
                {content.author?.name || "Author"}
              </span>
              <span className="text-xs text-gray-500 font-mono mt-0.5">
                {content.author?.handle || "handle"}
              </span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 border-y border-gray-100 py-4 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold">{content.likes || "0"}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400">
              Likes
            </span>
          </div>
          <div className="flex flex-col items-center border-l border-gray-100 pl-4">
            <span className="text-lg font-bold">
              {content.commentsCount || "0"}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400">
              Replies
            </span>
          </div>
          <div className="flex flex-col items-center border-l border-gray-100 pl-4">
            <span className="text-lg font-bold">{content.shares || "0"}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400">
              Shares
            </span>
          </div>
        </div>

        {/* DISCUSSION AREA */}
        {content.comments && content.comments.length > 0 && (
          <div className="pt-4 space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Live Discussion
              </span>
            </div>

            <div className="space-y-6">
              {content.comments.map((comment, i) => (
                <div key={i} className="group">
                  <div className="flex gap-4">
                    <Avatar className="w-8 h-8 rounded-none border border-black bg-gray-50 mt-1">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback className="bg-black text-white font-bold rounded-none">
                        {comment.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm tracking-tight">
                          {comment.username}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {comment.text}
                      </p>
                    </div>
                  </div>

                  {/* Nested Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-4 pl-4 border-l-2 border-gray-100 space-y-4">
                      {comment.replies.map((reply, j) => (
                        <div key={j} className="flex gap-3">
                          <Avatar className="w-6 h-6 rounded-none border border-gray-200 bg-gray-50 mt-0.5">
                            <AvatarImage src={reply.avatar} />
                            <AvatarFallback className="bg-gray-200 text-black text-[9px] font-bold rounded-none">
                              {reply.username[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <span className="font-bold text-xs mr-2">
                              {reply.username}
                            </span>
                            <span className="text-xs text-gray-600">
                              {reply.text}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
