import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MinimalCardProps {
  content: GeneratedContent;
}

export function MinimalCard({ content }: MinimalCardProps) {
  return (
    <div className="bg-[#f9f7f1] text-[#2c2c2c] p-12 rounded-sm shadow-xl max-w-md w-full font-serif relative overflow-hidden">
      {/* Paper Texture & Effects */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 pointer-events-none mix-blend-multiply" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4c5b0] to-transparent opacity-50" />

      <div className="relative z-10 flex flex-col h-full min-h-[400px]">
        {/* Header: Date & Simple Icon */}
        <div className="flex justify-between items-start mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-[#8a8a8a] font-sans">
            {content.time || "Recently"}
          </div>
          <div className="w-8 h-8 opacity-20 transform rotate-12">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,2A10,10 0 1,0 22,12,10.011,10.011 0 0,0 12,2Zm0,18a8,8 0 1,1 8-8A8.009,8.009 0 0,1 12,20Z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-2xl md:text-3xl leading-relaxed font-medium text-[#1a1a1a]">
            {content.post}
          </p>
        </div>

        {/* Footer: Signature / Author */}
        <div className="mt-12 pt-6 border-t border-[#d4c5b0] flex justify-between items-end">
          <div className="flex items-center gap-3">
            {/* Author Avatar as 'Stamp' */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4c5b0] grayscale opacity-80">
              <img
                src={content.author?.avatar || "https://github.com/shadcn.png"}
                alt="Author"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide italic text-[#4a4a4a]">
                — {content.author?.name || "Anonymous"}
              </p>
              {content.author?.handle && (
                <p className="text-[10px] text-[#8a8a8a] mt-1 font-sans uppercase tracking-wider">
                  @{content.author.handle}
                </p>
              )}
            </div>
          </div>
          <div className="text-[10px] text-[#bebebe] font-sans tracking-widest uppercase">
            {content.likes || "0"} reads
          </div>
        </div>

        {/* Comments Section (Reflections) */}
        {content.comments && content.comments.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#d4c5b0]/50">
            <h4 className="text-[10px] uppercase tracking-widest text-[#8a8a8a] mb-6 font-sans text-center">
              Reflections
            </h4>
            <div className="space-y-6">
              {content.comments.map((comment, i) => (
                <div key={i} className="relative">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-6 h-6 border border-[#d4c5b0] grayscale opacity-70">
                      <AvatarImage src={comment.avatar} />
                      <AvatarFallback className="bg-[#e6e2d6] text-[#666] text-[8px]">
                        {comment.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="font-bold text-sm italic text-[#4a4a4a]">
                          {comment.username}
                        </span>
                        <span className="text-[9px] text-[#a0a0a0] font-sans">
                          {comment.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#4a4a4a] leading-relaxed">
                        {comment.text}
                      </p>

                      {/* Nested Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-3 ml-1 pl-4 border-l border-[#d4c5b0] space-y-3">
                          {comment.replies.map((reply, j) => (
                            <div key={j}>
                              <div className="flex justify-between items-baseline mb-0.5">
                                <span className="font-bold text-xs italic text-[#666]">
                                  {reply.username}
                                </span>
                              </div>
                              <p className="text-xs text-[#666] leading-relaxed">
                                {reply.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
