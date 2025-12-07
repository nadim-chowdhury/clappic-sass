import { GeneratedContent } from "@/components/generator/PreviewSection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemeCardProps {
  content: GeneratedContent;
}

export function MemeCard({ content }: MemeCardProps) {
  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-[400px] max-w-md w-full font-sans flex flex-col border-8 border-white shadow-[10px_10px_0px_0px_rgba(255,255,255,0.2)]">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-r-4 border-b-4 border-white bg-[#0a0a0a] z-10" />
      <div className="absolute top-0 right-0 w-8 h-8 border-l-4 border-b-4 border-white bg-[#0a0a0a] z-10" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-r-4 border-t-4 border-white bg-[#0a0a0a] z-10" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-l-4 border-t-4 border-white bg-[#0a0a0a] z-10" />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-12 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
        <div className="space-y-6 w-full">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-center text-white/60 mb-8 border-b-2 border-white/20 pb-4 mx-auto w-1/2">
            POV
          </h2>
          <p className="text-5xl md:text-6xl font-black text-center uppercase leading-[0.9] tracking-tighter break-words hyphens-auto">
            {content.post}
          </p>
        </div>
      </div>

      {/* Comments / Replies Section */}
      {content.comments && content.comments.length > 0 && (
        <div className="flex-1 bg-zinc-900 p-6 space-y-6">
          <div className="font-action text-2xl text-yellow-400 tracking-wider">
            COMMENTS ({content.commentsCount || "542"})
          </div>

          <div className="space-y-4">
            {content.comments.map((comment, i) => (
              <div
                key={i}
                className="border-2 border-white bg-black p-4 relative shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8 rounded-none border border-white">
                    <AvatarImage src={comment.avatar} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold rounded-none">
                      {comment.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-lg text-white font-action tracking-wide">
                    {comment.username.toUpperCase()}
                  </span>
                </div>
                <p className="font-sans font-bold text-white text-lg leading-tight">
                  {comment.text.toUpperCase()}
                </p>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 pl-2">
                    {comment.replies.map((reply, j) => (
                      <div
                        key={j}
                        className="bg-zinc-900 border-l-4 border-yellow-400 p-3"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="w-6 h-6 rounded-none border border-white/50">
                            <AvatarImage src={reply.avatar} />
                            <AvatarFallback className="bg-red-600 text-white text-xs font-bold rounded-none">
                              {reply.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-bold text-sm text-yellow-400 font-action tracking-wide">
                            {reply.username.toUpperCase()}
                          </span>
                        </div>
                        <p className="font-sans font-bold text-white text-sm leading-tight">
                          {reply.text.toUpperCase()}
                        </p>
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
  );
}
