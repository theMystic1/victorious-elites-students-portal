"use client";

import * as React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;

  /** direction of initial offset */
  from?: "up" | "down" | "left" | "right";
  /** distance in px for initial offset */
  distance?: number;
  /** optional stagger group: set a delay in ms */
  delayMs?: number;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
  );
}

export default function Reveal({
  children,
  className,
  from = "up",
  distance = 14,
  delayMs = 0,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    if (shown) return;
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      {
        // triggers a little before the element fully enters
        root: null,
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [shown]);

  // translate direction
  const translate =
    from === "up"
      ? `translateY(${distance}px)`
      : from === "down"
        ? `translateY(-${distance}px)`
        : from === "left"
          ? `translateX(${distance}px)`
          : `translateX(-${distance}px)`;

  return (
    <div
      ref={ref}
      className={[
        // base
        "will-change-transform will-change-opacity",
        // transition
        "transition-[transform,opacity,filter] duration-700 ease-out",
        // hidden state
        !shown ? "opacity-0 blur-[6px]" : "opacity-100 blur-0",
        !shown ? "" : "",
        className ?? "",
      ].join(" ")}
      style={{
        transform: shown ? "translate3d(0,0,0)" : translate,
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
