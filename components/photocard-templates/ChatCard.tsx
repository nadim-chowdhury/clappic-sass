import { GeneratedContent } from "@/hooks/use-photocard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatCardProps {
  content: GeneratedContent;
}

export function ChatCard({ content }: ChatCardProps) {
  return (
    <div className="bg-zinc-900 text-white p-4 rounded-3xl border border-zinc-800 shadow-2xl max-w-md w-full font-sans relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-center border-b border-zinc-800 pb-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-zinc-500 font-medium">Today 9:41 AM</p>
          <p className="text-sm font-semibold">Group Chat</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Main Post as a received message */}
        <div className="flex items-end gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-500 text-white text-xs">
              OP
            </AvatarFallback>
          </Avatar>
          <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none max-w-[80%]">
            <p className="text-sm">{content.post}</p>
          </div>
        </div>

        {/* Replies */}
        {content.replies.map((reply, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${
              i % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            <Avatar className="w-6 h-6">
              <AvatarFallback
                className={`text-[10px] text-white ${
                  i % 2 === 0 ? "bg-green-500" : "bg-purple-500"
                }`}
              >
                {reply.username[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div
              className={`${
                i % 2 === 0
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-zinc-800 rounded-bl-none"
              } p-2.5 rounded-2xl max-w-[75%]`}
            >
              <p className="text-xs font-bold opacity-50 mb-0.5">
                {reply.username}
              </p>
              <p className="text-sm">{reply.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
