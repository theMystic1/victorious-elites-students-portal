// components/results/skeletons/ResultsRightPaneSkeleton.ts
"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsRightPaneSkeleton() {
  return (
    <div className="p-6 space-y-5">
      {/* Top stats row */}
      <div className="grid gap-3 md:grid-cols-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>

      {/* Table header */}
      <Skeleton className="h-10 w-full rounded-2xl" />

      {/* Table rows */}
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-11 w-full rounded-2xl" />
        ))}
      </div>

      {/* Footer line */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
