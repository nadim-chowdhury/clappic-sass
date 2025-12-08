import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface FormattedTextProps {
  text: string;
  className?: string;
}

export function FormattedText({ text, className }: FormattedTextProps) {
  if (!text) return null;

  // Split by common delimiters while keeping them
  // Order matters: Process bold/italic first, then hashtags/mentions

  // Regex Explanation:
  // 1. Bold: \*\*(.*?)\*\*
  // 2. Italic (underscore): _(.*?)_
  // 3. Italic (asterisk): \*(.*?)\*
  // 4. Hashtag: #\w+
  // 5. Mention: @\w+
  // 6. Newline: \n

  const regex = /(\*\*[^*]+\*\*|_[^_]+_|\*[^*]+\*|#\w+|@\w+|\n)/g;

  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (!part) return null;

        // Bold
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        // Italic (underscore)
        if (part.startsWith("_") && part.endsWith("_") && part.length > 2) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }

        // Italic (asterisk)
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }

        // Hashtag or Mention
        if (part.startsWith("#") || part.startsWith("@")) {
          return (
            <span
              key={index}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {part}
            </span>
          );
        }

        // Newline
        if (part === "\n") {
          return <br key={index} />;
        }

        return <Fragment key={index}>{part}</Fragment>;
      })}
    </span>
  );
}
