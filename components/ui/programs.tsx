"use client";

import { ProgramCard, SectionTitle } from "./cn";

const Program = () => {
  return (
    <section
      id="programs"
      className="border-t border-[var(--c-border)] bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          eyebrow="Programs"
          title="The right support at every level"
          desc="Different learning stages require different teaching methods, structure, and support."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <ProgramCard
            tone="emerald"
            badge="Foundations"
            title="Nursery"
            desc="Early literacy, numeracy, routines, social skills and creative learning that builds confidence."
          />
          <ProgramCard
            tone="blue"
            badge="Core Skills"
            title="Primary"
            desc="Strong fundamentals, reading culture, STEM basics, and continuous assessment that tracks growth."
          />
          <ProgramCard
            tone="amber"
            badge="Outcomes"
            title="Secondary"
            desc="Exam readiness, stronger academics, leadership development, and future-focused guidance."
          />
        </div>
      </div>
    </section>
  );
};

export default Program;
