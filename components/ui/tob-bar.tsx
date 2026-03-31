"use client";

const TobBar = () => {
  return (
    <div className="border-b border-(--c-border) bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-xs text-(--c-muted)">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-(--c-ink)">Admissions Open</span>
          <span className="opacity-40">•</span>
          <span>2026/2027 Session</span>
          <span className="opacity-40">•</span>
          <span>Nursery • Primary • Secondary</span>
        </div>
        <a
          href="/results"
          className="font-semibold text-(--c-blue) hover:opacity-80"
        >
          Result Portal →
        </a>
      </div>
    </div>
  );
};

export default TobBar;
