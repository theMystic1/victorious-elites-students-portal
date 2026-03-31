"use client";

import * as React from "react";
import { cn } from "../ui/cn";
import Button from "../ui/custom-btn";

type SelectOption = { label: string; value: string };

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="text-xs font-bold uppercase tracking-wide text-[var(--c-soft)]">
        {label}
      </label>
      {hint ? (
        <span className="text-[11px] text-[var(--c-soft)]/80">{hint}</span>
      ) : null}
    </div>
  );
}

function InputShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)]",
        "shadow-[var(--sh-card)]",
      )}
    >
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: SelectOption[];
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "h-11 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] px-3 text-sm",
        "text-[var(--c-ink)] outline-none",
        "focus:border-[var(--c-blue)] focus:ring-2 focus:ring-[var(--c-blue-soft)]",
        "disabled:cursor-not-allowed disabled:bg-[var(--c-surface-2)] disabled:text-[var(--c-soft)]",
      )}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export default function ResultLookupClient() {
  // UI-only state (no fetch)
  const [studentId, setStudentId] = React.useState("");
  const [sessionId, setSessionId] = React.useState("");
  const [termId, setTermId] = React.useState("");

  // placeholder selections (replace later with real data)
  const sessions: SelectOption[] = [
    { value: "s_current", label: "2025/2026 (Current)" },
    { value: "s_prev", label: "2024/2025" },
  ];

  const terms: SelectOption[] = [
    { value: "t_first", label: "First Term" },
    { value: "t_second", label: "Second Term (Current)" },
    { value: "t_third", label: "Third Term" },
  ];

  // UX rules
  const canCheck = studentId.trim().length > 0 && sessionId && termId;
  const canDownload = false; // disabled until we load the real result sheet

  const onClear = () => {
    setStudentId("");
    setSessionId("");
    setTermId("");
  };

  const onCheck = () => {
    // UI-only (hook this to your real fetch later)
    // For now, just a placeholder action.
    console.log("CHECK", { studentId, sessionId, termId });
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT: Lookup */}
        <section
          className={cn(
            "rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-[var(--c-surface)]",
            "shadow-[var(--sh-card)]",
          )}
        >
          <div className="border-b border-[var(--c-border)] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-black text-[var(--c-ink)]">
                  Result Lookup
                </h2>
                <p className="mt-1 text-sm text-[var(--c-muted)]">
                  Enter your Student ID and choose the session + term.
                </p>
              </div>

              <span
                className={cn(
                  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                  "border border-[var(--c-border)] bg-[var(--c-blue-soft)] text-[var(--c-ink)]",
                )}
              >
                Student Portal
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid gap-4">
              {/* Student ID */}
              <div className="grid gap-2">
                <FieldLabel label="Student ID" hint="e.g. VE00023" />
                <div className="relative">
                  <input
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your Student ID"
                    className={cn(
                      "h-11 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] px-3 pr-10 text-sm",
                      "text-[var(--c-ink)] outline-none",
                      "focus:border-[var(--c-blue)] focus:ring-2 focus:ring-[var(--c-blue-soft)]",
                    )}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-[var(--c-soft)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M20 20l-4.2-4.2"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-[var(--c-soft)]">
                  Use the same ID given by your school (Admission/Student ID).
                </p>
              </div>

              {/* Session + Term */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <FieldLabel label="Session" hint="Select" />
                  <Select
                    value={sessionId}
                    onChange={setSessionId}
                    placeholder="Choose session"
                    options={sessions}
                  />
                </div>

                <div className="grid gap-2">
                  <FieldLabel label="Term" hint="Select" />
                  <Select
                    value={termId}
                    onChange={setTermId}
                    placeholder="Choose term"
                    options={terms}
                    disabled={!sessionId}
                  />
                </div>
              </div>

              {/* Action row */}
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <Button onClick={onCheck} disabled={!canCheck}>
                  Check Result
                </Button>

                <Button variant="ghost" onClick={onClear}>
                  Clear
                </Button>

                <div className="ml-auto text-xs text-[var(--c-soft)]">
                  Results are read-only.
                </div>
              </div>

              {/* Privacy notice */}
              <div className="mt-2 rounded-[var(--r-xl)] border border-[var(--c-border)] bg-[var(--c-surface-2)] p-4 text-xs text-[var(--c-muted)] leading-relaxed">
                <span className="font-semibold text-[var(--c-ink)]">
                  Privacy:
                </span>{" "}
                Only enter your own Student ID. If your result is not available,
                contact the school admin.
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT: Result Sheet Placeholder */}
        <section
          className={cn(
            "rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-[var(--c-surface)]",
            "shadow-[var(--sh-card)]",
          )}
        >
          <div className="flex items-center justify-between border-b border-[var(--c-border)] p-6">
            <div>
              <h2 className="text-lg font-black text-[var(--c-ink)]">
                Result Sheet
              </h2>
              <p className="mt-1 text-sm text-[var(--c-muted)]">
                Your result will appear here after lookup.
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={() => window.print()}
              disabled={!canDownload}
            >
              Download PDF
            </Button>
          </div>

          <div className="p-6">
            <InputShell>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-extrabold text-[var(--c-ink)]">
                      No result loaded yet
                    </div>
                    <p className="mt-1 text-sm text-[var(--c-muted)]">
                      Enter Student ID, select Session and Term, then click{" "}
                      <span className="font-semibold text-[var(--c-ink)]">
                        Check Result
                      </span>
                      .
                    </p>
                  </div>

                  <span className="rounded-full bg-[var(--c-amber-soft)] px-3 py-1 text-xs font-semibold text-[var(--c-ink)]">
                    Coming next
                  </span>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {[
                    { k: "Student", v: "—" },
                    { k: "Class", v: "—" },
                    { k: "Total", v: "—" },
                  ].map((x) => (
                    <div
                      key={x.k}
                      className="rounded-xl border border-[var(--c-border)] bg-white p-4"
                    >
                      <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--c-soft)]">
                        {x.k}
                      </div>
                      <div className="mt-1 text-sm font-extrabold text-[var(--c-ink)]">
                        {x.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border border-[var(--c-border)]">
                  <div className="bg-[var(--c-blue-soft)] px-4 py-3 text-xs font-bold text-[var(--c-ink)]">
                    Result table placeholder (we’ll implement next)
                  </div>
                  <div className="p-4">
                    <div className="grid gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-10 w-full rounded-xl border border-[var(--c-border)] bg-[var(--c-surface-2)]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-xs text-[var(--c-soft)]">
                  PDF download will be enabled once a result is loaded.
                </div>
              </div>
            </InputShell>
          </div>
        </section>
      </div>
    </div>
  );
}
