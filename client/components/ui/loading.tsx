import { Loader2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
}

export function Loading({
  className,
  text = "Loading...",
  size = "md",
  variant = "spinner",
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <Loader2 className={cn("animate-spin", sizeClasses[size])} />
        <span className={textSizeClasses[size]}>{text}</span>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <div className="flex gap-1">
          <div
            className={cn(
              "rounded-full bg-primary animate-bounce",
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3",
            )}
            style={{ animationDelay: "0ms" }}
          />
          <div
            className={cn(
              "rounded-full bg-primary animate-bounce",
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3",
            )}
            style={{ animationDelay: "150ms" }}
          />
          <div
            className={cn(
              "rounded-full bg-primary animate-bounce",
              size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : "w-3 h-3",
            )}
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <span className={textSizeClasses[size]}>{text}</span>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center gap-2", className)}>
        <Trophy
          className={cn("animate-pulse text-primary", sizeClasses[size])}
        />
        <span className={textSizeClasses[size]}>{text}</span>
      </div>
    );
  }

  return null;
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loading variant="pulse" size="lg" text="Loading FootHeroes..." />
        <p className="text-muted-foreground">
          Preparing your football experience
        </p>
      </div>
    </div>
  );
}

export function InlineLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loading variant="dots" text={text} />
    </div>
  );
}
