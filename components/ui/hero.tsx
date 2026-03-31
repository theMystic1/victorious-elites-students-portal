import Image from "next/image";
import { Stat } from "./cn";
import Button from "./custom-btn";

import studentsImg from "@/public/images/student.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-1/2 h-72 w-[980px] -translate-x-1/2 rounded-full bg-[var(--c-navy-soft)] blur-3xl opacity-70" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-[720px] -translate-x-1/2 rounded-full bg-[var(--c-blue-soft)] blur-3xl opacity-80" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-20">
        <div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--c-emerald-soft)] px-3 py-1 text-xs font-bold text-[var(--c-ink)]">
              Strong Academics
            </span>
            <span className="rounded-full bg-[var(--c-blue-soft)] px-3 py-1 text-xs font-bold text-[var(--c-ink)]">
              Student Support
            </span>
            <span className="rounded-full bg-[var(--c-amber-soft)] px-3 py-1 text-xs font-bold text-[var(--c-ink)]">
              Character Building
            </span>
          </div>

          <h1 className="mt-5 text-3xl md:text-5xl font-black tracking-tight text-[var(--c-ink)]">
            A school that shapes{" "}
            <span className="text-[var(--c-blue)]">bright minds</span> and
            strong character.
          </h1>

          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-[var(--c-muted)]">
            Victorious Elites Academy provides Nursery, Primary and Secondary
            education with a clear structure, measurable outcomes, and a safe
            environment where students thrive.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button href="#admissions" variant="primary">
              Start Admission
            </Button>
            <Button href="/results" variant="ghost">
              Result Portal
            </Button>
            <Button href="#programs" variant="secondary">
              Explore Programs
            </Button>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Stat k="Learning" v="Structured curriculum" />
            <Stat k="Discipline" v="Consistent standards" />
            <Stat k="Parents" v="Transparent reporting" />
          </div>
        </div>

        {/* Hero side: distinct panel with accent gradient */}

        <div className="rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-(--c-blue) p-6 shadow-[var(--sh-card)] relative h-full w-full ">
          <Image
            src={studentsImg}
            alt="Students image"
            fill
            className="object-contain"
            objectFit=""
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

const QuickAccess = () => {
  return (
    <div className="rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-white p-6 shadow-[var(--sh-card)]">
      <div className="rounded-[var(--r-xl)] bg-[linear-gradient(135deg,var(--c-blue-soft),var(--c-emerald-soft))] p-5">
        <div className="text-xs font-bold uppercase tracking-wide text-[var(--c-soft)]">
          Quick Access
        </div>
        <div className="mt-2 text-base font-extrabold text-[var(--c-ink)]">
          Student & Parent Portal
        </div>
        <p className="mt-2 text-sm text-[var(--c-muted)]">
          Check term results, download reports, and stay updated with official
          announcements.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/results"
            className="rounded-xl bg-[var(--c-blue)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
          >
            Check Result
          </a>
          <a
            href="#contact"
            className="rounded-xl border border-[var(--c-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--c-ink)] hover:bg-[var(--c-blue-soft)]"
          >
            Contact Office
          </a>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-[var(--r-xl)] border border-[var(--c-border)] bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--c-soft)]">
            Visiting Day
          </div>
          <div className="mt-1 text-sm font-extrabold">Saturdays • 10:00am</div>
          <div className="mt-1 text-xs text-[var(--c-muted)]">
            Schedule a tour by contacting the admissions office.
          </div>
        </div>

        <div className="rounded-[var(--r-xl)] border border-[var(--c-border)] bg-[var(--c-amber-soft)] p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-[var(--c-soft)]">
            Notice
          </div>
          <div className="mt-1 text-sm font-extrabold">Mid-term tests soon</div>
          <div className="mt-1 text-xs text-[var(--c-muted)]">
            Parents are advised to support consistent revision at home.
          </div>
        </div>
      </div>
    </div>
  );
};
