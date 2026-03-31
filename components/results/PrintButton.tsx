"use client";

import * as React from "react";

export default function PrintButton({
  targetRef,
}: {
  targetRef?: React.RefObject<HTMLDivElement> | null;
}) {
  const onPrint = () => {
    // The print CSS will hide everything except .print-area
    window.print();
  };

  return (
    <button
      onClick={onPrint}
      className="rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
      type="button"
    >
      Download (PDF)
    </button>
  );
}
