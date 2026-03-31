"use client";

import * as React from "react";
import Button from "../ui/custom-btn";
import EmptyState from "../ui/empty";
import { useSession, useTerms } from "@/hooks/useSchool";
import {
  ClassType,
  SessionType,
  StudentType,
  StydebtsResult,
  TermType,
} from "@/lib/types";
import ResultsRightPaneSkeleton from "./result-skeleton";
import { toApiError } from "@/lib/api-error";
import { getMyResults } from "@/lib/endpoints";
import ResultSheet from "./ResultSheeet";
import PreviewBasic from "./basic-result-preview";
import NurseryReportSheet from "./nursery-preview";

/**
 * Interface-only version:
 * - no DUMMY data
 * - no fetch/useEffect
 * - no computed summary
 * - result sheet will be implemented later
 */

type SelectOption = { value: string; label: string };

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-[var(--c-surface)] shadow-[var(--sh-card)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[var(--c-border)] p-6">
      <div>
        <h2 className="text-base font-extrabold text-[var(--c-ink)]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-[var(--c-muted)]">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

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

function TextInput({
  value,
  onChange,
  placeholder,
  error,
  setError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          setError("");
          onChange(e.target.value);
        }}
        placeholder={placeholder}
        className={cn(
          `h-11 w-full rounded-xl border ${error ? "border-red-600 text-red-600!" : " border-[var(--c-border)] bg-[var(--c-surface)]"} px-3 pr-10 text-sm`,
          "text-[var(--c-ink)] outline-none",
          "focus:border-[var(--c-blue)] focus:ring-2 focus:ring-[var(--c-blue-soft)]",
        )}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-3 grid place-items-center ${error ? "text-red-600" : " text-[var(--c-soft)]"}`}
      >
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

export default function ResultPortal() {
  // UI-only state (no fetch/dummy)
  const [studentId, setStudentId] = React.useState("");
  const [sessionId, setSessionId] = React.useState("");
  const [termId, setTermId] = React.useState("");
  const [error, setError] = React.useState("");
  const [isChecking, setIsChecking] = React.useState(false);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [results, setResults] = React.useState<StydebtsResult>({
    ratings: [],
    results: [],
    student: null,
    overallAverage: 0,
    overallPosition: 0,
    overallTotal: 0,
    personalAverage: 0,
    term: null,
    subjectsCount: 0,
    totalStudents: 0,
  });
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Placeholder lists (replace with real data later)

  const { sessionData, isLoadingSession } = useSession();

  const { isLoadingTerm, termsData } = useTerms(sessionId);

  const canCheck = studentId.trim().length > 0 && sessionId && termId;
  const canDownload = false; // enable after we build the real sheet

  React.useEffect(() => {
    if (sessionData?.data?.sessions) {
      const activeSession = sessionData?.data?.sessions?.find(
        (ses: SessionType) => ses?.isActive,
      )?._id;
      setSessionId(activeSession);
    }
  }, [sessionData?.data?.sessions]);

  const onClear = () => {
    setStudentId("");
    setSessionId("");
    setTermId("");
  };

  const scrollToResults = () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const onCheck = async () => {
    setError("");

    if (!studentId) return setError("Enter students identification Number");
    setIsChecking(true);
    try {
      const doc = await getMyResults(studentId, termId);

      const result = doc?.data?.data;
      // console.log(result);

      setResults({
        ratings: result?.ratings,
        results: result?.results,
        student: result?.student,
        overallAverage: result?.overallAverage,
        overallPosition: result?.overallPosition,
        overallTotal: result?.overallTotal,
        personalAverage: result?.personalAverage,
        term: result?.term,
        subjectsCount: result?.subjectsCount,
        totalStudents: result?.totalStudents,
      });

      setIsEmpty(result?.results?.length > 0 ? false : true);

      console.log(result);

      // console.log({
      //   ratings: result?.ratings,
      //   results: result?.results,
      //   student: result?.student,
      // });
      scrollToResults();
    } catch (error: unknown) {
      const { message } = toApiError(error);
      console.error(error);
      setError(message);
    } finally {
      setIsChecking(false);
    }
  };

  if (isLoadingSession) return <ResultsRightPaneSkeleton />;

  const session: SessionType[] = sessionData?.data?.sessions ?? [];
  const term: TermType[] = termsData?.data?.terms ?? [];
  const sessions = session?.map((ses) => ({
    value: ses?._id,
    label: ses?.session,
  }));
  const terms = term?.map((ses) => ({
    value: ses?._id,
    label: ses?.term,
  }));

  // console.log(sessionData, termsData);
  return (
    <main className="min-h-full bg-[var(--c-bg)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Page heading */}
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[var(--c-ink)]">
              Check Result
            </h1>
            <p className="mt-1 text-sm text-[var(--c-muted)]">
              Enter your Student ID, select Session and Term, then view your
              result.
            </p>
          </div>

          <div className="text-xs text-[var(--c-soft)]">
            Results are read-only. Download becomes available after lookup.
          </div>
        </div>

        <div className="grid gap-6">
          {/* Lookup */}
          <Card>
            <CardHeader
              title="Lookup Details"
              subtitle="Use the same Student ID issued by the school."
              right={
                <Button variant="ghost" onClick={onClear}>
                  Clear
                </Button>
              }
            />

            <div className="p-6">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FieldLabel label="Student ID" hint="e.g. VE00023" />
                  <TextInput
                    value={studentId}
                    onChange={setStudentId}
                    placeholder="Enter your Student ID"
                    error={error}
                    setError={setError}
                  />
                  {error ? (
                    <p className="text-xs text-red-600">{error}</p>
                  ) : (
                    <p className="text-xs text-[var(--c-soft)]">
                      We only use this to retrieve your result.
                    </p>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <FieldLabel label="Session" />
                    <Select
                      value={sessionId}
                      onChange={setSessionId}
                      placeholder="Choose session"
                      options={sessions as SelectOption[]}
                      disabled={isLoadingSession}
                    />
                  </div>

                  <div className="grid gap-2">
                    <FieldLabel label="Term" />
                    <Select
                      value={termId}
                      onChange={setTermId}
                      placeholder="Choose term"
                      options={terms as SelectOption[]}
                      disabled={isLoadingTerm}
                    />
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3">
                  <Button onClick={onCheck} disabled={!canCheck || isChecking}>
                    {isChecking ? "Loading results data..." : " Check Result"}
                  </Button>

                  <div className="text-xs text-[var(--c-soft)]">
                    Confirm Session & Term before checking.
                  </div>
                </div>

                <div className="rounded-[var(--r-xl)] border border-[var(--c-border)] bg-[var(--c-surface-2)] p-4 text-xs text-[var(--c-muted)] leading-relaxed">
                  <span className="font-semibold text-[var(--c-ink)]">
                    Privacy:
                  </span>{" "}
                  Only enter your own Student ID. If your result is not
                  available, contact the school admin.
                </div>
              </div>
            </div>
          </Card>

          {/* Result Placeholder */}
          <Card>
            <CardHeader
              title="Result Sheet"
              subtitle="Result content will appear here after lookup."
              right={
                <button
                  className="px-4 py-2 rounded-lg bg-black text-white"
                  onClick={() => window.print()}
                >
                  Print / Save PDF
                </button>
              }
            />

            <div className="p-6" ref={ref}>
              {/*<EmptyState
                title="No result loaded yet"
                description="Enter your Student ID and select Session + Term to view your result."
                steps={[
                  "Type your Student ID (e.g. VE00023).",
                  "Choose the correct Session and Term.",
                  "Click “Check Result”.",
                ]}
              />*/}
              {isChecking ? (
                <ResultsRightPaneSkeleton />
              ) : results?.results?.length > 0 ? (
                (results?.student?.classId as ClassType)?.level === "PRIMARY" ||
                (results?.student?.classId as ClassType)?.level === "KG" ? (
                  <NurseryReportSheet results={results} />
                ) : (
                  <ResultSheet results={results} />
                )
              ) : isEmpty ? (
                <EmptyState
                  tone="warning"
                  title="No results found"
                  description="We couldn’t find a result for this student in the selected Session/Term."
                  steps={[
                    "Confirm the Session and Term are correct.",
                    "Try a different term if results were not released yet.",
                    "If the issue persists, contact the school admin.",
                  ]}
                />
              ) : (
                <EmptyState
                  title="No result loaded yet"
                  description="Enter your Student ID and select Session + Term to view your result."
                  steps={[
                    "Type your Student ID (e.g. VE00023).",
                    "Choose the correct Session and Term.",
                    "Click “Check Result”.",
                  ]}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
