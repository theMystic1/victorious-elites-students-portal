import { SectionTitle } from "./cn";

const News = () => {
  return (
    <section
      id="news"
      className="border-t border-[var(--c-border)] bg-[var(--c-bg)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          eyebrow="News & Updates"
          title="What’s happening"
          desc="School updates, events, and announcements — kept clear for parents and students."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              meta: "Academic • Apr 12",
              title: "Mid-term Tests",
              desc: "Mid-term tests begin next week. Please ensure punctuality and revision support.",
            },
            {
              meta: "Community • Apr 20",
              title: "PTA Meeting",
              desc: "Quarterly PTA meeting with progress reviews and parent feedback session.",
            },
            {
              meta: "Events • May 03",
              title: "Inter-house Sports",
              desc: "Sports week begins soon. Students should come with the required kits.",
            },
          ].map((n) => (
            <div
              key={n.title}
              className="rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-white p-6 shadow-[var(--sh-card)]"
            >
              <div className="text-xs font-bold uppercase tracking-wide text-[var(--c-soft)]">
                {n.meta}
              </div>
              <div className="mt-2 text-base font-extrabold">{n.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--c-muted)]">
                {n.desc}
              </p>
              <div className="mt-4 text-sm font-semibold text-[var(--c-blue)]">
                Read more →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
