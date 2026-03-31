export function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export const Stat = ({ k, v }: { k: string; v: string }) => (
  <div className="rounded-[var(--r-xl)] border border-[var(--c-border)] bg-white p-5">
    <div className="text-xs font-bold uppercase tracking-wide text-[var(--c-soft)]">
      {k}
    </div>
    <div className="mt-1 text-lg font-black text-[var(--c-ink)]">{v}</div>
  </div>
);

export const SectionTitle = ({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) => (
  <div className="max-w-2xl">
    <div className="text-xs font-bold uppercase tracking-wider text-[var(--c-soft)]">
      {eyebrow}
    </div>
    <h2 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-[var(--c-ink)]">
      {title}
    </h2>
    <p className="mt-3 text-sm md:text-base leading-relaxed text-[var(--c-muted)]">
      {desc}
    </p>
  </div>
);

export const FeatureCard = ({
  icon,
  title,
  desc,
  tone = "blue",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone?: "blue" | "emerald" | "amber";
}) => {
  const bg =
    tone === "blue"
      ? "bg-[var(--c-blue-soft)]"
      : tone === "emerald"
        ? "bg-[var(--c-emerald-soft)]"
        : "bg-[var(--c-amber-soft)]";

  const dot =
    tone === "blue"
      ? "bg-[var(--c-blue)]"
      : tone === "emerald"
        ? "bg-[var(--c-emerald)]"
        : "bg-[var(--c-amber)]";

  return (
    <div className="rounded-[var(--r-xl)] border border-[var(--c-border)] bg-white p-6 shadow-[var(--sh-card)]">
      <div className="flex items-start gap-4">
        <div
          className={cn("grid h-11 w-11 place-items-center rounded-2xl", bg)}
        >
          <div className={cn("h-2.5 w-2.5 rounded-full", dot)} />
        </div>
        <div>
          <div className="text-base font-extrabold text-[var(--c-ink)]">
            {title}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-[var(--c-muted)]">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProgramCard = ({
  title,
  desc,
  badge,
  tone,
}: {
  title: string;
  desc: string;
  badge: string;
  tone: "blue" | "emerald" | "amber";
}) => {
  const strip =
    tone === "blue"
      ? "bg-[var(--c-blue)]"
      : tone === "emerald"
        ? "bg-[var(--c-emerald)]"
        : "bg-[var(--c-amber)]";

  const tint =
    tone === "blue"
      ? "bg-[var(--c-blue-soft)]"
      : tone === "emerald"
        ? "bg-[var(--c-emerald-soft)]"
        : "bg-[var(--c-amber-soft)]";

  return (
    <div className="relative overflow-hidden rounded-[var(--r-2xl)] border border-[var(--c-border)] bg-white shadow-[var(--sh-card)]">
      <div className={cn("h-2 w-full", strip)} />
      <div className="p-6">
        <div
          className={cn(
            "inline-flex rounded-full px-3 py-1 text-xs font-bold",
            tint,
          )}
        >
          {badge}
        </div>
        <h3 className="mt-3 text-lg font-black text-[var(--c-ink)]">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--c-muted)]">
          {desc}
        </p>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--c-blue)]">
          Learn more <span aria-hidden>→</span>
        </div>
      </div>
    </div>
  );
};
