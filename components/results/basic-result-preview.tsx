"use client";

import React from "react";
import BasicPrimaryReportSheet from "./basic-result-template";

export default function PreviewBasic() {
  const subjects = [
    {
      sn: 1,
      subject: "English",
      cw1: 18,
      cw2: 20,
      exam: 45,
      total: 83,
      classAverage: 62,
      grade: "A",
    },
    {
      sn: 2,
      subject: "Phonics",
      cw1: 15,
      cw2: 18,
      exam: 40,
      total: 73,
      classAverage: 55,
      grade: "B",
    },
    {
      sn: 3,
      subject: "Maths",
      cw1: 20,
      cw2: 19,
      exam: 46,
      total: 85,
      classAverage: 61,
      grade: "A",
    },
    {
      sn: 4,
      subject: "Igbo",
      cw1: 14,
      cw2: 16,
      exam: 38,
      total: 68,
      classAverage: 52,
      grade: "C",
    },
    {
      sn: 5,
      subject: "Basic Science",
      cw1: 17,
      cw2: 18,
      exam: 39,
      total: 74,
      classAverage: 58,
      grade: "B",
    },
  ];

  const skills = [
    { label: "Punctuality", score: 2 },
    { label: "Class Attendance", score: 2 },
    { label: "Carrying Out of Assignment", score: 3 },
    { label: "Perseverance", score: 2 },
    { label: "Self Control", score: 3 },
    { label: "Self Confidence", score: 3 },
    { label: "Honesty", score: 2 },
    { label: "Neatness", score: 2 },
    { label: "Obedience", score: 3 },
    { label: "Health", score: 2 },
    { label: "Games & Sports", score: 3 },
    { label: "Manual Skills", score: 3 },
  ];

  return (
    <div className="min-h-dvh bg-neutral-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black">Result Preview</h1>
            <p className="text-sm text-neutral-600">
              This page is for preview + print. Only the sheet prints.
            </p>
          </div>

          <button
            className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white"
            onClick={() => window.print()}
          >
            Print / Save as PDF
          </button>
        </div>

        <BasicPrimaryReportSheet
          variantTitle="PRE-NURSERY PROGRESS"
          classLabel="Pre-Nursery"
          termLabel="First"
          yearLabel="2025/2026"
          subjects={subjects}
          skills={skills}
          resultStatus="PASS"
          totalMarksObtained={383}
          numberOfSubjectsPassed={5}
          positionInClass="1"
          outOf={20}
          average={76.6}
          nextTermFee="₦15,000"
          nextTermBegins="2026-01-10"
          classTeacherComment="Good progress. Keep it up."
          headmasterComment="Excellent."
        />
      </div>
    </div>
  );
}
