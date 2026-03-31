"use client";
import { FeatureCard, SectionTitle } from "./cn";

const WhyUs = () => {
  return (
    <section
      id="why"
      className="border-t border-[var(--c-border)] bg-[var(--c-bg)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          eyebrow="Why Victorious Elites"
          title="A balanced model: academics, discipline, and student wellbeing"
          desc="Students excel when learning is structured, teachers are prepared, and support systems are consistent."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <FeatureCard
            tone="blue"
            icon={null}
            title="Structured Curriculum"
            desc="Clear weekly learning goals, continuous assessment, and support for struggling learners."
          />
          <FeatureCard
            tone="emerald"
            icon={null}
            title="Supportive Environment"
            desc="Safe, respectful school culture with mentoring and guidance across all levels."
          />
          <FeatureCard
            tone="amber"
            icon={null}
            title="Transparent Reporting"
            desc="Parents stay informed with term results, reports, and clear communication from staff."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
