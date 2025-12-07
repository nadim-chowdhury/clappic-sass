import { GeneratedContent } from "@/hooks/use-photocard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Repeat, Share } from "lucide-react";

interface TwitterCardProps {
  content: GeneratedContent;
}

export function TwitterCard({ content }: TwitterCardProps) {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-xl max-w-md w-full font-sans">
      {/* Main Post */}
      <div className="flex gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-bold text-base">Viral Creator</span>
            <span className="text-gray-500 text-sm">@viral_god · 2h</span>
          </div>
          <p className="mt-1 text-lg leading-snug whitespace-pre-wrap">
            {content.post}
          </p>

          {/* Metrics */}
          <div className="flex justify-between mt-4 text-gray-500 text-sm max-w-[80%]">
            <div className="flex items-center gap-1 group cursor-pointer hover:text-blue-500">
              <MessageCircle className="w-4 h-4 group-hover:bg-blue-500/10 rounded-full p-0.5 box-content" />
              <span>245</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-green-500">
              <Repeat className="w-4 h-4 group-hover:bg-green-500/10 rounded-full p-0.5 box-content" />
              <span>1.2k</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-pink-500">
              <Heart className="w-4 h-4 group-hover:bg-pink-500/10 rounded-full p-0.5 box-content" />
              <span>15k</span>
            </div>
            <div className="flex items-center gap-1 group cursor-pointer hover:text-blue-500">
              <Share className="w-4 h-4 group-hover:bg-blue-500/10 rounded-full p-0.5 box-content" />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-800 my-4" />

      {/* Replies */}
      <div className="space-y-4">
        {content.replies.map((reply, i) => (
          <div key={i} className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                {reply.username[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{reply.username}</span>
                <span className="text-gray-500 text-xs">
                  @{reply.handle} · 1h
                </span>
              </div>
              <p className="text-sm mt-0.5">{reply.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
