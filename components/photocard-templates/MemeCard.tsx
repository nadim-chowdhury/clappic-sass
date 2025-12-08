import { GeneratedContent } from "@/components/generator/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormattedText } from "@/components/generator/FormattedText";

interface MemeCardProps {
  content: GeneratedContent;
}

export function MemeCard({ content }: MemeCardProps) {
  return (
    <div className="relative bg-black text-white min-h-[500px] max-w-md w-full font-heading flex flex-col overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
      {/* Background Gradient/Noise */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black opacity-80" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />

      {/* Glowing Orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/30 blur-[80px] rounded-full pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-10 space-y-8 text-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-indigo-300">
            POV
          </span>
        </div>
        <p className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-white text-balance">
          {content.post}
        </p>
      </div>

      {/* Comments Section */}
      {content.comments && content.comments.length > 0 && (
        <div className="relative z-10 p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2 text-white/40 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
            <span className="text-[10px] uppercase tracking-widest font-bold">
              Comments
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          {content.comments.map((comment, i) => (
            <div key={i} className="space-y-3">
              <div className="flex gap-3 items-start group">
                <Avatar className="w-8 h-8 ring-2 ring-white/10 transition-all group-hover:ring-indigo-500/50">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback className="bg-zinc-800 text-white font-bold">
                    {comment.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm text-white/90">
                      {comment.username}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white/80 leading-snug">
                    <FormattedText text={comment.text} />
                  </p>
                </div>
              </div>

              {/* Nested Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="pl-11 space-y-3">
                  {comment.replies.map((reply, j) => (
                    <div key={j} className="flex gap-3 items-start opacity-80">
                      <Avatar className="w-6 h-6 ring-1 ring-white/10">
                        <AvatarImage src={reply.avatar} />
                        <AvatarFallback className="bg-zinc-800 text-[9px] text-white">
                          {reply.username[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-xs text-white/90">
                            {reply.username}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 leading-snug">
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
