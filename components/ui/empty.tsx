"use client";

import * as React from "react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  steps?: string[];
  tone?: "info" | "warning";
  actions?: React.ReactNode; // e.g. buttons
  className?: string;
};

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function EmptyState({
  title = "Nothing to display yet",
  description = "We couldn’t find any records for your current selection.",
  steps = [
    "Confirm your Student ID is correct (exactly as issued by the school).",
    "Select the right Session and Term.",
    "Click “Check Result” to load your result.",
  ],
  tone = "info",
  actions,
  className,
}: EmptyStateProps) {
  const isWarning = tone === "warning";

  const panelBg = isWarning
    ? "bg-[var(--c-amber-soft)]"
    : "bg-[var(--c-blue-soft)]";
  const iconBg = isWarning ? "bg-[var(--c-amber)]" : "bg-[var(--c-blue)]";
  const border = "border-[var(--c-border)]";

  return (
    <div
      className={cn(
        "rounded-[var(--r-2xl)] border p-6",
        border,
        panelBg,
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white",
            iconBg,
          )}
        >
          {/* simple icon */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 8v5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 16.5h.01"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M10.3 3.6 3.6 10.3a2 2 0 0 0 0 2.8l7.7 7.7a2 2 0 0 0 2.8 0l7.7-7.7a2 2 0 0 0 0-2.8l-7.7-7.7a2 2 0 0 0-2.8 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.9"
            />
          </svg>
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-extrabold text-[var(--c-ink)]">
            {title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[var(--c-muted)]">
            {description}
          </p>

          {steps?.length ? (
            <ol className="mt-4 grid gap-2 text-sm text-[var(--c-muted)]">
              {steps.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid h-6 w-6 place-items-center rounded-full border bg-white text-xs font-bold",
                      "border-[var(--c-border)] text-[var(--c-ink)]",
                    )}
                  >
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ol>
          ) : null}

          {actions ? (
            <div className="mt-5 flex flex-wrap gap-2">{actions}</div>
          ) : null}

          <div className="mt-4 text-xs text-[var(--c-soft)]">
            If you believe this is a mistake, contact the school admin for
            assistance.
          </div>
        </div>
      </div>
    </div>
  );
}
