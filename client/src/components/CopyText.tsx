import { useState, useEffect, ReactNode } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  copyButtonClassName?: string;
  showCopyButton?: boolean;
  tooltipText?: string;
  children?: ReactNode;
}

/**
 * A component to display text that can be easily copied to clipboard
 * with optional truncation functionality
 */
export function CopyText({
  text,
  maxLength,
  className,
  copyButtonClassName,
  showCopyButton = true,
  tooltipText = "Copy to clipboard",
  children,
}: CopyTextProps) {
  const [copied, setCopied] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (maxLength && text.length > maxLength) {
      setDisplayText(`${text.substring(0, maxLength)}...`);
    } else {
      setDisplayText(text);
    }
  }, [text, maxLength]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className={cn("flex items-center gap-1.5 group", className)}>
      <span className="font-mono text-sm truncate">
        {children || displayText}
      </span>

      {showCopyButton && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleCopy}
                className={cn(
                  "p-1 rounded-md transition-colors text-gray-400 hover:text-gray-200 hover:bg-neutral-800 focus:outline-none",
                  copyButtonClassName
                )}
                aria-label="Copy to clipboard"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : tooltipText}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default CopyText;
