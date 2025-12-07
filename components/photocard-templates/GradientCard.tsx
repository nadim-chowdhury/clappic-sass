import { GeneratedContent } from "@/components/generator/PreviewSection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface GradientCardProps {
  content: GeneratedContent;
}

export function GradientCard({ content }: GradientCardProps) {
  return (
    <div className="relative rounded-3xl shadow-2xl max-w-md w-full font-sans text-white min-h-[400px] flex flex-col overflow-hidden">
      {/* Animated Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 animate-gradient-xy",
          content.gradient ||
            "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        )}
      />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20 mix-blend-overlay" />

      {/* Glassmorphism Container */}
      <div className="relative z-10 h-full flex flex-col p-8 border border-white/20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Avatar className="w-12 h-12 border-2 border-white/50 shadow-lg">
            <AvatarImage
              src={content.author?.avatar || "https://github.com/shadcn.png"}
            />
            <AvatarFallback>{content.author?.name?.[0] || "VC"}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg drop-shadow-md">
                {content.author?.name || "Viral Creator"}
              </span>
            </div>
            <span className="text-white/70 text-sm font-medium">
              {content.author?.handle || "viral_god"} · {content.time || "2h"}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center py-8">
          <p className="text-2xl md:text-3xl font-bold leading-tight text-center drop-shadow-lg break-words hyphens-auto">
            "{content.post}"
          </p>
        </div>

        {/* Replies / Comments Preview */}
        {content.comments.length > 0 && (
          <div className="mt-8 space-y-3">
            {content.comments.map((comment, i) => (
              <div
                key={i}
                className="bg-black/20 backdrop-blur-md rounded-xl p-3 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="w-5 h-5 border border-white/30">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback className="text-[8px] bg-white/20 text-white">
                      {comment.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-xs text-white/90">
                    {comment.username}
                  </span>
                  <span className="text-[10px] text-white/50">
                    {comment.time || "1h"}
                  </span>
                </div>
                <p className="text-sm text-white/80 leading-snug">
                  {comment.text}
                </p>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-2 space-y-2 pl-3 border-l border-white/10">
                    {comment.replies.map((reply, j) => (
                      <div key={j}>
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="w-4 h-4 border border-white/30">
                            <AvatarImage src={reply.avatar} />
                            <AvatarFallback className="text-[6px] bg-white/20 text-white">
                              {reply.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-[10px] text-white/90">
                            {reply.username}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 leading-snug">
                          {reply.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-6 flex items-center justify-between text-white/90">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 fill-white/20" />
            <span className="font-bold">{content.likes || "24.5k"}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            <span className="font-bold">{content.commentsCount || "842"}</span>
          </div>
          <Share2 className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
