import { useRef, useState, useEffect, useMemo, createRef } from "react";
import { TwitterCard } from "@/components/photocard-templates/TwitterCard";
import { MemeCard } from "@/components/photocard-templates/MemeCard";
import { ChatCard } from "@/components/photocard-templates/ChatCard";
import { MinimalCard } from "@/components/photocard-templates/MinimalCard";
import { FacebookCard } from "@/components/photocard-templates/FacebookCard";
import { GradientCard } from "@/components/photocard-templates/GradientCard";
import { DownloadActions } from "./DownloadActions";
import { TemplateSelector } from "./TemplateSelector";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PostBoldCard } from "@/components/photocard-templates/PostBoldCard";
import { PostModernCard } from "@/components/photocard-templates/PostModernCard";
import { PostNeonCard } from "@/components/photocard-templates/PostNeonCard";

export interface Comment {
  username: string;
  handle: string;
  text: string;
  avatar?: string;
  time?: string;
  replies?: Comment[];
  likes?: string;
  reactionIcons?: string[];
}

export interface GeneratedContent {
  post: string;
  author?: {
    name: string;
    handle: string;
    avatar?: string;
    verified?: boolean;
  };
  comments: Comment[];
  likes?: string;
  commentsCount?: string;
  shares?: string;
  views?: string;
  time?: string;
  gradient?: string;
}

interface PreviewSectionProps {
  content: GeneratedContent | null;
  selectedTemplate: string;
  setSelectedTemplate: (value: string) => void;
}

export function PreviewSection({
  content,
  selectedTemplate,
  setSelectedTemplate,
}: PreviewSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [postOnlyTemplate, setPostOnlyTemplate] = useState("bold");

  // Reset page when content changes
  useEffect(() => {
    setCurrentPage(0);
  }, [content]);

  // Dynamic Pagination Logic
  const facebookPages = useMemo(() => {
    if (!content?.comments) return [];

    const pages: Comment[][] = [];
    let currentPageComments: Comment[] = [];

    content.comments.forEach((comment) => {
      const hasReplies = comment.replies && comment.replies.length > 0;

      // Rules:
      // 1. Complex comment (has replies) -> Needs its own page.
      // 2. Simple comments -> Up to 2 per page.

      if (hasReplies) {
        // If there were pending simple comments, flush them to a page
        if (currentPageComments.length > 0) {
          pages.push(currentPageComments);
          currentPageComments = [];
        }
        // Add complex comment as its own page
        pages.push([comment]);
      } else {
        // Simple comment
        if (currentPageComments.length >= 2) {
          pages.push(currentPageComments);
          currentPageComments = [];
        }
        currentPageComments.push(comment);
      }
    });

    // Flush remaining
    if (currentPageComments.length > 0) {
      pages.push(currentPageComments);
    }

    return pages;
  }, [content?.comments]);

  // Total pages = Main Post (Page 0) + Comment Pages
  const totalPages = 1 + facebookPages.length;

  // Refs for batch downloading all pages
  const multiPageRefs = useMemo(() => {
    if (selectedTemplate === "facebook") {
      return Array(totalPages)
        .fill(null)
        .map(() => createRef<HTMLDivElement>());
    }
    return [];
  }, [totalPages, selectedTemplate]);

  if (!content) {
    return (
      <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-border rounded-xl bg-muted/30">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium">
            Your viral post will appear here
          </p>
          <p className="text-sm">Enter a topic and hit generate!</p>
        </div>
      </div>
    );
  }

  const renderTemplate = (isHiddenRender = false, pageIndex = 0) => {
    const props = { content, isDarkMode };

    // Use current page for main display, or specific pageIndex for hidden render
    const activePage = isHiddenRender ? pageIndex : currentPage;

    switch (selectedTemplate) {
      case "twitter":
        // @ts-ignore
        return <TwitterCard {...props} />;
      case "facebook":
        // Get comments specific to this page (if page > 0)
        // Page 0 is main post, Page 1 is facebookPages[0], etc.
        const pageComments =
          activePage > 0 ? facebookPages[activePage - 1] : undefined;

        return (
          // @ts-ignore
          <FacebookCard
            {...props}
            page={activePage}
            // We pass the pre-chunked comments directly
            overrideComments={pageComments}
          />
        );
      case "meme":
        return <MemeCard content={content} />;
      case "gradient":
        return <GradientCard content={content} />;
      case "chat":
        return <ChatCard content={content} />;
      case "minimal":
        return <MinimalCard content={content} />;
      case "minimal":
        return <MinimalCard content={content} />;
      case "post-only":
        // Filter out comments for post only mode
        const postOnlyContent = { ...content, comments: [] };
        switch (postOnlyTemplate) {
          case "modern":
            return <PostModernCard content={postOnlyContent} />;
          case "neon":
            return <PostNeonCard content={postOnlyContent} />;
          case "bold":
          default:
            return <PostBoldCard content={postOnlyContent} />;
        }
      default:
        // @ts-ignore
        return <TwitterCard {...props} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          subTemplate={postOnlyTemplate}
          setSubTemplate={setPostOnlyTemplate}
        />

        <div className="flex flex-wrap items-center gap-4">
          {(selectedTemplate === "twitter" ||
            selectedTemplate === "facebook") && (
            <div className="flex items-center gap-2 bg-background border border-border rounded-full px-3 py-1.5 shadow-sm">
              <Sun className="w-4 h-4 text-muted-foreground" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="w-4 h-4 text-muted-foreground" />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode
              </Label>
            </div>
          )}
        </div>
      </div>

      {/* Facebook Pagination Controls */}
      {selectedTemplate === "facebook" && facebookPages.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 bg-muted/30 p-4 rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[80px] text-center">
              Page {currentPage} of {totalPages - 1}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Main Visible Card */}
      <div className="flex justify-center p-4 md:p-8 bg-muted/30 rounded-xl border border-border overflow-hidden">
        <div ref={cardRef} className="transform transition-all duration-300">
          {renderTemplate()}
        </div>
      </div>

      {/* Hidden Rendering for Batch Export */}
      {selectedTemplate === "facebook" && (
        <div className="fixed left-[-9999px] top-0 pointer-events-none opacity-0">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div key={i} ref={multiPageRefs[i]}>
              {renderTemplate(true, i)}
            </div>
          ))}
        </div>
      )}

      <DownloadActions
        targetRef={cardRef}
        multiPageRefs={
          selectedTemplate === "facebook" ? multiPageRefs : undefined
        }
        fileName={`viral-${selectedTemplate}-page-${currentPage}`}
      />
    </div>
  );
}

function contentElementCount(comments: Comment[] | undefined): number {
  if (!comments) return 0;
  return comments.length;
}
