"use client";

import { constructClassName, toOrdinal } from "@/lib/helpers/helper";
import { ClassType, SessionType, StydebtsResult } from "@/lib/types";
import Image from "next/image";
import logoImg from "@/public/images/logo.png";

type SubjectRow = {
  name: string;
  cw1?: number | null; // Class work summary 1st half
  cw2?: number | null; // Class work summary 2nd half
  exam?: number | null; // End of term exam
  total?: number | null; // Total score (0-100)
  classAvg?: number | null;
  grade?: string | null; // A/B/C/D/F or Distinction/Credit etc (depends on school)
};

type Props = {
  schoolName?: string;
  subtitle?: string; // "PRE-NURSERY PROGRESS" / "NURSERY PROGRESS"
  addressLine?: string;
  telLine?: string;

  termLabel?: string;
  yearLabel?: string;
  classLabel?: string;
  results: StydebtsResult;
  // dummy data
  subjects?: SubjectRow[];

  // right-side skills list
  skills?: string[];
};

const DEFAULT_SUBJECTS: SubjectRow[] = [
  { name: "English" },
  { name: "Phonics" },
  { name: "Maths" },
  { name: "Igbo" },
  { name: "Basic Science" },
  { name: "Social Habit" },
  { name: "Health Habiy" }, // keep spelling as in paper if needed
  { name: "C.R.K" },
  { name: "Agric Science" },
  { name: "Nursery Computer" },
  { name: "Nursery French" },
  { name: "Quantitative Reasoning" },
  { name: "Verbal Reasoning" },
  { name: "Oral Expression" },
  { name: "Fine Art/Colouring" },
  { name: "Hand Writing" },
  { name: "Poems/Rhymes" },
];

const DEFAULT_SKILLS = [
  "1. Punctuality",
  "2. Class Attendance",
  "3. Carrying Out of Assignment",
  "4. Perseverance",
  "5. Self Confidence",
  "6. Honesty",
  "7. Neatness",
  "8. Obedience",
  "9. Health",
  "10. Games & Sports",
  "11. Manual Skill",
  // the photo shows 12 items sometimes; add if you want:
  "12. (Extra item)",
];

function fmt(v: number | null | undefined) {
  if (v === null || v === undefined) return "";
  return String(v);
}

export default function NurseryReportSheet({
  schoolName = "VICTORIOUS ELITES INT'L SCHOOL",
  subtitle = "PRE-NURSERY PROGRESS",
  addressLine = "Address: Amaeze Village Mgbakwu Awka North L.G.A Anambra State",
  telLine = "Tel: 08068633766, 08116154225",
  termLabel = "",
  yearLabel = "",
  classLabel = "",
  subjects = DEFAULT_SUBJECTS,
  skills = DEFAULT_SKILLS,
  results,
}: Props) {
  // Right now: UI-only dummy “Key to Grades” block as shown on the left
  // Adjust values to match your exact paper.
  const keyToGrades = [
    { k: "A - Distinction", v: "80%" },
    { k: "B - Credit I", v: "70%" },
    { k: "C - Credit II", v: "60%" },
    { k: "D - Pass", v: "40%" },
    { k: "F - Fail", v: "30%" },
  ];

  const keyToScore = [
    "1. Excellent",
    "2. Good",
    "3. Fair",
    "4. Poor",
    "5. Very Poor",
  ];

  const {
    overallAverage,
    overallPosition,
    overallTotal,
    personalAverage,
    ratings,
    student,
    results: kidsResult,
    term,
    totalStudents,
    subjectsCount,
  } = results;

  // console.log(results);

  return (
    <div className="w-full flex justify-center" id="result-sheet">
      {/* A4-ish canvas */}
      <div className="avoid-break w-[794px] max-w-full bg-white text-black p-4 sheet-small">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Logo placeholder */}
          <div className="mx-6 flex h-20 w-20 relative items-center justify-center rounded-full text-[10px] font-bold">
            <Image
              src={logoImg}
              alt="School Logo "
              fill
              className="object-fill"
            />
          </div>

          <div className="flex-1 text-center">
            <div className="font-black text-[18px] tracking-wide">
              {schoolName}
            </div>
            <div className="text-[11px] font-semibold">(GOVT APPROVED)</div>
            <div className="text-[10px] mt-1">{addressLine}</div>
            <div className="text-[10px]">{telLine}</div>

            {(student?.classId as ClassType)?.level === "KG" && (
              <div className="mt-2 inline-block border border-black px-3 py-1 font-black text-[12px]">
                {(student?.classId as ClassType)?.name === "PREKG"
                  ? "PRE NURSERY"
                  : "NURSERY"}
              </div>
            )}
          </div>

          {/* right spacer (some papers have nothing here) */}
          <div className="w-20" />
        </div>

        {/* Termly report line */}
        <div className="mt-3 flex items-center gap-3 text-[12px] mb-4">
          <div className="flex-1">
            Termly Report Class{" "}
            <span className="inline-block border-b border-black w-40 align-middle font-bold ml-3">
              {constructClassName(
                (student?.classId as ClassType)?.name,
                (student?.classId as ClassType)?.level,
              )}
            </span>
          </div>

          <div className="">
            Term{" "}
            <span className="inline-block border-b border-black w-24 align-middle font-bold ml-2">
              {term?.term} Term
            </span>
          </div>

          <div className="">
            Session{" "}
            <span className="inline-block border-b border-black w-24 align-middle font-bold">
              {(student?.sessionId as SessionType)?.session}
            </span>
          </div>
        </div>

        {/* Main table */}
        <div className="mb-5">
          <table className="w-full border-collapse sheet-grid">
            <colgroup>
              {/* SUBJECTS */}
              <col style={{ width: "30%" }} />
              {/* 5 score columns */}
              <col style={{ width: "6%" }} />
              <col style={{ width: "6%" }} />
              <col style={{ width: "6%" }} />
              <col style={{ width: "7%" }} />
              <col style={{ width: "7%" }} />
              <col style={{ width: "6%" }} />
              {/* Right side panel */}
              <col style={{ width: "18%" }} />
              <col style={{ width: "26%" }} />
            </colgroup>

            <thead>
              <tr>
                {/* Left header block: Key to Grades */}
                <th className="align-top p-0">
                  <div className="h-full flex flex-col items-start gap-2 justify-center p-2">
                    <div className="px-2 py-1 font-bold h-full ">
                      Key to Grades
                    </div>
                    <div className="px-2 pb-2 text-[10px]  h-full">
                      {keyToGrades.map((x) => (
                        <div
                          key={x.k}
                          className="flex items-center justify-between gap-2 mb-1 "
                        >
                          <span>{x.k}</span>
                          <span className="font-bold">{x.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </th>

                {/* Vertical headers like the paper */}
                <th className="p-1 text-center">
                  <div className="vtext font-bold">
                    Class Work Summary
                    <br />
                    1st Half of the Term
                  </div>
                </th>
                <th className="p-1 text-center">
                  <div className="vtext font-bold">
                    Class Work Summary
                    <br />
                    2nd Half of the Term
                  </div>
                </th>
                <th className="p-1 text-center">
                  <div className="vtext font-bold">End of the Term Exam</div>
                </th>
                <th className="p-1 text-center">
                  <div className="vtext font-bold">Total Score (0–100)</div>
                </th>
                <th className="p-1 text-center">
                  <div className="vtext font-bold">Class Average</div>
                </th>
                <th className="p-1 text-center">
                  <div className="vtext font-bold">Grade</div>
                </th>
                <th className="p-2 text-center font-bold">
                  SOCIAL BEHAVIOUR
                  <br />
                  AND MANIPULATIVE
                  <br />
                  SKILLS
                </th>
                {/* Right top: “Key to score” box */}
                <th className="p-2 text-start font-bold">
                  <div className="h-full">
                    <div className="px-2 py-1 font-bold ">KEY TO SCORE</div>
                    <div className="px-2 pb-2 ">
                      {keyToScore.map((s) => (
                        <div key={s}>{s}</div>
                      ))}
                    </div>
                  </div>
                </th>
              </tr>

              {/* Second header row for right panel title */}
              {/*<tr>
                <th className="p-2 text-left font-bold">SUBJECTS</th>
                <th className="p-1" />
                <th className="p-1" />
                <th className="p-1" />
                <th className="p-1" />
                <th className="p-1" />
                <th className="p-1" />
                <th className="p-2 text-center font-bold">
                  SOCIAL BEHAVIOUR
                  <br />
                  AND MANIPULATIVE
                  <br />
                  SKILLS
                </th>
              </tr>*/}
            </thead>

            <tbody>
              {kidsResult.map((row, idx) => {
                const skill = ratings[idx] ?? "";
                return (
                  <tr key={`${row.name}-${idx}`} className="h-[22px]">
                    <td className="px-2 py-1">
                      <span className="inline-block w-6">{idx + 1}.</span>
                      {row.subjectName}
                    </td>

                    <td className="text-center">{fmt(row.ca1)}</td>
                    <td className="text-center">{fmt(row.ca2)}</td>
                    <td className="text-center">{fmt(row.exam)}</td>
                    <td className="text-center">{fmt(row.total)}</td>
                    <td className="text-center">{fmt(row.classAverage)}</td>
                    <td className="text-center">{row.grade ?? ""}</td>

                    <td className="px-2 py-1 text-[10px]">{skill?.item}</td>
                    <td className="px-2 py-1 text-[10px]">{skill?.rating}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer lines (as on paper) */}
        <div className="mt-3 space-y-2 text-[12px]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              Result: <span className="font-bold">PASS</span>
              <span className="inline-block w-6 h-4 border border-black" />
              <span className="font-bold">FAIL</span>
              <span className="inline-block w-6 h-4 border border-black" />
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              Position in Class{" "}
              <span className="inline-block border-b border-black w-24 font-bold">
                {toOrdinal(overallPosition)}
              </span>{" "}
              Out of{" "}
              <span className="inline-block border-b border-black w-24 font-bold">
                {totalStudents}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 ">
              Total Marks Obtained{" "}
              <span className="inline-block border-b border-black w-56 font-bold text-sm ml-4">
                {overallTotal}
              </span>
            </div>
            <div className="flex-1">
              Average{" "}
              <span className="inline-block border-b border-black w-56 font-bold ml-3">
                {personalAverage}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              Number of Subject Passed{" "}
              <span className="inline-block border-b border-black w-24 font-bold">
                {subjectsCount}
              </span>
            </div>
            <div className="flex-1">
              Next Term Begins{" "}
              <span className="inline-block border-b border-black w-56" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              Next Term Fee{" "}
              <span className="inline-block border-b border-black w-56" />
            </div>
            <div className="flex-1">
              Headmaster&apos;s Comments{" "}
              <span className="inline-block border-b border-black w-56" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              Class Teacher&apos;s Comments{" "}
              <span className="inline-block border-b border-black w-[420px]" />
            </div>
          </div>

          <div className="mt-6 flex items-end justify-between">
            <div className="w-64">
              <div className="border-b border-black h-6" />
              <div className="text-center font-semibold mt-1">
                Signature of Class Teacher
              </div>
            </div>

            <div className="w-64">
              <div className="border-b border-black h-6" />
              <div className="text-center font-semibold mt-1">
                Signature of Head Teacher
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
