import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { AIProvider } from "@/lib/ai/factory";
import { SignIn } from "../auth/SignIn";

interface InputSectionProps {
  topic: string;
  setTopic: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  provider: AIProvider;
  setProvider: (value: AIProvider) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export function InputSection({
  topic,
  setTopic,
  tone,
  setTone,
  provider,
  setProvider,
  onGenerate,
  isLoading,
  session,
}: InputSectionProps & { session: any }) {
  if (!session) {
    return (
      <div className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/50 shadow-sm text-center">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Sign in to Generate</h3>
          <p className="text-muted-foreground">
            You need to be signed in to create viral photocards.
          </p>
        </div>
        <div className="flex justify-center">
          <SignIn />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Label htmlFor="topic" className="text-lg font-semibold">
            What's the topic?
          </Label>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 text-green-600 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              Pro Access
            </span>
            <span>Generating as {session.user?.name}</span>
          </div>
        </div>
      </div>
      <Input
        id="topic"
        placeholder="e.g., Coding interviews, Pizza toppings, Remote work..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="h-12 text-lg"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tone">Select Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone" className="h-10">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Savage">🔥 Savage / Roast</SelectItem>
              <SelectItem value="Funny">😂 Funny / Meme</SelectItem>
              <SelectItem value="Motivational">🚀 Motivational</SelectItem>
              <SelectItem value="Intellectual">🧠 Intellectual</SelectItem>
              <SelectItem value="Controversial">🌶️ Controversial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="provider">AI Provider</Label>
          <Select
            value={provider}
            onValueChange={(v) => setProvider(v as AIProvider)}
          >
            <SelectTrigger id="provider" className="h-10">
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI (GPT-4o)</SelectItem>
              <SelectItem value="gemini">Google Gemini (1.5 Flash)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={onGenerate}
        disabled={isLoading || !topic}
        className="w-full h-12 text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Viral Magic...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Photocard
          </>
        )}
      </Button>
    </div>
  );
}
