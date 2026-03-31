// components/results/skeletons/ResultsPageSkeleton.tsx
"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsPageSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      {/* Left panel skeleton */}
      <div className="rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-[var(--c-surface)] shadow-[var(--sh-card)]">
        <div className="border-b border-[var(--c-border)] p-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>

        <div className="p-6 space-y-5">
          {/* Student ID field */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-11 w-full" />
            <Skeleton className="h-3 w-52" />
          </div>

          {/* Session + Term */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-11 w-full" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              <Skeleton className="h-11 w-32 rounded-xl" />
              <Skeleton className="h-11 w-20 rounded-xl" />
            </div>
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Info box */}
          <Skeleton className="h-20 w-full rounded-2xl" />
        </div>
      </div>

      {/* Right panel skeleton */}
      <div className="rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-[var(--c-surface)] shadow-[var(--sh-card)]">
        <div className="border-b border-[var(--c-border)] p-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-64" />
          </div>
          <Skeleton className="h-11 w-28 rounded-xl" />
        </div>

        {/* Right pane body */}
        <div className="p-6 space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>

          <Skeleton className="h-10 w-full rounded-2xl" />

          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-11 w-full rounded-2xl" />
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
