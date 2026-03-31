"use client";

import { cn, SectionTitle } from "./cn";
import Button from "./custom-btn";

const Admissions = () => {
  return (
    <section
      id="admissions"
      className="border-t border-[var(--c-border)] bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          eyebrow="Admissions"
          title="Simple, structured admissions"
          desc="Apply, assess, enroll. We keep it clear and quick."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              t: "Application",
              d: "Submit student details and preferred level. Review in 24–48 hours.",
              tint: "bg-[var(--c-blue-soft)]",
              dot: "bg-[var(--c-blue)]",
            },
            {
              n: "02",
              t: "Assessment",
              d: "Short level-appropriate assessment and parent discussion where needed.",
              tint: "bg-[var(--c-emerald-soft)]",
              dot: "bg-[var(--c-emerald)]",
            },
            {
              n: "03",
              t: "Enrollment",
              d: "Complete documentation, confirm fees, and get portal access.",
              tint: "bg-[var(--c-amber-soft)]",
              dot: "bg-[var(--c-amber)]",
            },
          ].map((s) => (
            <div
              key={s.n}
              className="rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-white p-6 shadow-[var(--sh-card)]"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold",
                  s.tint,
                )}
              >
                <span className={cn("h-2.5 w-2.5 rounded-full", s.dot)} />
                Step {s.n}
              </div>
              <div className="mt-3 text-base font-extrabold">{s.t}</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--c-muted)]">
                {s.d}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary">
            Contact Admissions
          </Button>
          <Button href="/results" variant="ghost">
            Result Portal
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Admissions;
