// components/ui/skeleton.tsx
"use client";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

/**
 * Token-aware skeleton block.
 * - Uses your --c-* tokens
 * - Has subtle shimmer
 * - Fills parent when you pass className like "h-full w-full"
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-[var(--c-surface-2)]",
        "border border-[var(--c-border)]",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "translate-x-[-100%] animate-[shimmer_1.4s_infinite]",
          "bg-[linear-gradient(90deg,transparent,rgba(37,99,235,0.10),transparent)]",
        )}
      />
    </div>
  );
}

/**
 * Add this keyframe to your globals.css (Tailwind v4):
 *
 * @keyframes shimmer {
 *   100% { transform: translateX(100%); }
 * }
 */
