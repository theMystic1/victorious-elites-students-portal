"use client";

import React from "react";

type SubjectRow = {
  sn: number;
  subject: string;

  // class work / CA columns (you can map your real fields later)
  cw1?: number | null; // 1st half
  cw2?: number | null; // 2nd half
  exam?: number | null; // end of term exam
  total?: number | null; // total score (0-100)
  classAverage?: number | null;
  grade?: string | null;
};

type SkillRow = {
  label: string; // e.g. "Punctuality"
  score?: number | null; // 1-5
};

type Props = {
  variantTitle: "PRE-NURSERY PROGRESS" | "NURSERY PROGRESS" | "TERMLY REPORT";
  termLabel: string; // "First", "Second", etc
  yearLabel: string; // "2025/2026"

  classLabel: string; // e.g. "Basic 3"
  subjects: SubjectRow[];

  // Right-side: Social Behaviour & Manipulative Skills
  skills: SkillRow[];

  // summary footer
  resultStatus?: "PASS" | "FAIL" | null;
  totalMarksObtained?: number | null;
  numberOfSubjectsPassed?: number | null;
  positionInClass?: string | null; // "1" etc (render as "1st" on frontend if you want)
  outOf?: number | null;
  average?: number | null;

  nextTermFee?: string | null;
  nextTermBegins?: string | null;

  classTeacherComment?: string | null;
  headmasterComment?: string | null;

  // header details
  schoolName?: string;
  addressLine?: string;
  phoneLine?: string;
};

const Box = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`border border-black ${className}`}>{children}</div>;

const Td = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td className={`border border-black px-1 py-[2px] align-middle ${className}`}>
    {children}
  </td>
);

const Th = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th
    className={`border border-black px-1 py-[2px] align-middle font-semibold ${className}`}
  >
    {children}
  </th>
);

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span className="inline-block h-4 w-4 border border-black align-middle">
      {checked ? <span className="block h-full w-full bg-black" /> : null}
    </span>
  );
}

export default function BasicPrimaryReportSheet(props: Props) {
  const {
    variantTitle,
    termLabel,
    yearLabel,
    classLabel,
    subjects,
    skills,

    resultStatus,
    totalMarksObtained,
    numberOfSubjectsPassed,
    positionInClass,
    outOf,
    average,
    nextTermFee,
    nextTermBegins,
    classTeacherComment,
    headmasterComment,

    schoolName = "VICTORIOUS ELITES INT’L SCHOOL",
    addressLine = "Address: Ama eze Village Mgbakwu, Awka North L.G.A, Anambra State",
    phoneLine = "Tel: 08000000000, 08100000000",
  } = props;

  return (
    <div className="print-area bg-white text-black font-[system-ui]">
      {/* Page container sized like A4 */}
      <div className="mx-auto w-[210mm] min-h-[297mm] p-[10mm]">
        {/* Header */}
        <div className="flex items-start gap-3">
          {/* Logo placeholder */}
          <div className="h-14 w-14 shrink-0 border border-black flex items-center justify-center text-[10px]">
            LOGO
          </div>

          <div className="flex-1 text-center">
            <div className="text-lg font-black leading-tight">{schoolName}</div>
            <div className="text-[11px] font-semibold">(GOVT APPROVED)</div>
            <div className="text-[10px] mt-1">{addressLine}</div>
            <div className="text-[10px]">{phoneLine}</div>

            <div className="mt-2 inline-block border border-black px-3 py-[3px] text-[11px] font-bold tracking-wide">
              {variantTitle}
            </div>
          </div>

          <div className="h-14 w-14 shrink-0" />
        </div>

        {/* Term/Class line */}
        <div className="mt-3 text-[12px]">
          <div className="flex flex-wrap gap-4">
            <div>
              Termly Report Class{" "}
              <span className="inline-block min-w-36 border-b border-black px-1">
                {classLabel}
              </span>
            </div>
            <div>
              Term{" "}
              <span className="inline-block min-w-24 border-b border-black px-1">
                {termLabel}
              </span>
            </div>
            <div>
              year{" "}
              <span className="inline-block min-w-28 border-b border-black px-1">
                {yearLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Main table area */}
        <div className="mt-3 grid grid-cols-[1fr_220px] gap-2">
          {/* Left: Subjects table */}
          <Box>
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr>
                  <Th className="w-8 text-center">S/N</Th>
                  <Th className="text-left">SUBJECTS</Th>

                  {/* Rotated-like narrow headers (approximate your photo) */}
                  <Th className="w-12 text-center">
                    <div className="text-[10px] leading-tight">
                      Class Work Sum
                      <br />
                      1st Half
                    </div>
                  </Th>
                  <Th className="w-12 text-center">
                    <div className="text-[10px] leading-tight">
                      Class Work Sum
                      <br />
                      2nd Half
                    </div>
                  </Th>
                  <Th className="w-12 text-center">
                    <div className="text-[10px] leading-tight">
                      End of Term
                      <br />
                      Exam
                    </div>
                  </Th>
                  <Th className="w-12 text-center">
                    <div className="text-[10px] leading-tight">
                      Total Score
                      <br />
                      (=100)
                    </div>
                  </Th>
                  <Th className="w-12 text-center">
                    <div className="text-[10px] leading-tight">
                      Class
                      <br />
                      Average
                    </div>
                  </Th>
                  <Th className="w-10 text-center">
                    <div className="text-[10px]">Grade</div>
                  </Th>
                </tr>
              </thead>

              <tbody>
                {subjects.map((s) => (
                  <tr key={`${s.sn}-${s.subject}`}>
                    <Td className="text-center">{s.sn}</Td>
                    <Td className="text-left">{s.subject}</Td>
                    <Td className="text-center">{s.cw1 ?? ""}</Td>
                    <Td className="text-center">{s.cw2 ?? ""}</Td>
                    <Td className="text-center">{s.exam ?? ""}</Td>
                    <Td className="text-center font-semibold">
                      {s.total ?? ""}
                    </Td>
                    <Td className="text-center">{s.classAverage ?? ""}</Td>
                    <Td className="text-center">{s.grade ?? ""}</Td>
                  </tr>
                ))}

                {/* Fill a few blank rows if needed to keep sheet height consistent */}
                {Array.from({ length: Math.max(0, 20 - subjects.length) }).map(
                  (_, i) => (
                    <tr key={`blank-${i}`}>
                      <Td className="text-center">&nbsp;</Td>
                      <Td>&nbsp;</Td>
                      <Td>&nbsp;</Td>
                      <Td>&nbsp;</Td>
                      <Td>&nbsp;</Td>
                      <Td>&nbsp;</Td>
                      <Td>&nbsp;</Td>
                      <Td>&nbsp;</Td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </Box>

          {/* Right: Key to Grades + Skills + Key to Score */}
          <div className="space-y-2">
            {/* Key to Grades */}
            <Box className="p-2 text-[11px]">
              <div className="font-bold">Key to Grades</div>
              <div className="mt-1 grid grid-cols-[1fr_auto] gap-x-3 gap-y-[2px]">
                <div>A - Distinction</div>
                <div>80%</div>
                <div>B - Credit I</div>
                <div>70%</div>
                <div>C - Credit II</div>
                <div>60%</div>
                <div>D - Pass</div>
                <div>40%</div>
                <div>F - Fail</div>
                <div>30%</div>
              </div>
            </Box>

            {/* Social behaviour + manipulative skills */}
            <Box className="p-2 text-[11px]">
              <div className="font-bold text-center">
                SOCIAL BEHAVIOUR
                <br />
                AND MANIPULATIVE
                <br />
                SKILLS
              </div>

              <div className="mt-2 space-y-[2px]">
                {skills.map((k, idx) => (
                  <div
                    key={`${k.label}-${idx}`}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="text-[10.5px]">
                      {idx + 1}. {k.label}
                    </div>
                    <div className="w-8 text-center border border-black text-[10.5px]">
                      {k.score ?? ""}
                    </div>
                  </div>
                ))}

                {Array.from({ length: Math.max(0, 12 - skills.length) }).map(
                  (_, i) => (
                    <div
                      key={`skill-blank-${i}`}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="text-[10.5px]">&nbsp;</div>
                      <div className="w-8 text-center border border-black text-[10.5px]">
                        &nbsp;
                      </div>
                    </div>
                  ),
                )}
              </div>
            </Box>

            {/* Key to Score */}
            <Box className="p-2 text-[11px]">
              <div className="font-bold text-center">KEY TO SCORE</div>
              <div className="mt-1 space-y-[2px] text-[10.5px]">
                <div>1. Excellent</div>
                <div>2. Good</div>
                <div>3. Fair</div>
                <div>4. Poor</div>
                <div>5. Very Poor</div>
              </div>
            </Box>
          </div>
        </div>

        {/* Footer / summary area */}
        <div className="mt-3 text-[12px]">
          <div className="flex items-center gap-3">
            <div className="font-semibold">Result:</div>
            <div className="flex items-center gap-2">
              <span>PASS</span>
              <CheckBox checked={resultStatus === "PASS"} />
              <span className="ml-3">FAIL</span>
              <CheckBox checked={resultStatus === "FAIL"} />
            </div>

            <div className="ml-auto">
              <span className="font-semibold">Position in Class</span>{" "}
              <span className="inline-block min-w-16 border-b border-black px-1 text-center">
                {positionInClass ?? ""}
              </span>{" "}
              <span>Out of</span>{" "}
              <span className="inline-block min-w-12 border-b border-black px-1 text-center">
                {outOf ?? ""}
              </span>
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-2">
            <div>
              Total Marks Obtained{" "}
              <span className="inline-block min-w-40 border-b border-black px-1">
                {totalMarksObtained ?? ""}
              </span>
            </div>
            <div>
              Average{" "}
              <span className="inline-block min-w-40 border-b border-black px-1">
                {average ?? ""}
              </span>
            </div>

            <div>
              Number of Subject Passed{" "}
              <span className="inline-block min-w-32 border-b border-black px-1">
                {numberOfSubjectsPassed ?? ""}
              </span>
            </div>
            <div>
              Next Term Begins{" "}
              <span className="inline-block min-w-40 border-b border-black px-1">
                {nextTermBegins ?? ""}
              </span>
            </div>

            <div>
              Next Term Fee{" "}
              <span className="inline-block min-w-48 border-b border-black px-1">
                {nextTermFee ?? ""}
              </span>
            </div>
            <div>
              Headmaster’s Comments{" "}
              <span className="inline-block min-w-48 border-b border-black px-1">
                {headmasterComment ?? ""}
              </span>
            </div>

            <div className="col-span-2">
              Class Teacher’s Comments{" "}
              <span className="inline-block w-[75%] border-b border-black px-1">
                {classTeacherComment ?? ""}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-center">
              <div className="w-64 border-b border-black">&nbsp;</div>
              <div className="mt-1 text-[11px] font-semibold">
                Signature of Class Teacher
              </div>
            </div>

            <div className="text-center">
              <div className="w-64 border-b border-black">&nbsp;</div>
              <div className="mt-1 text-[11px] font-semibold">
                Signature of Head Teacher
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
