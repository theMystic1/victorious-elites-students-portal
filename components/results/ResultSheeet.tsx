"use client";

import {
  constructClassName,
  formatDate,
  toOrdinal,
} from "@/lib/helpers/helper";
import { ClassType, LevelType, StudentType, StydebtsResult } from "@/lib/types";
import Image from "next/image";
import React from "react";

import logoImg from "@/public/images/logo.png";

type SubjectRow = {
  subject: string;
  ca1?: number | null;
  ca2?: number | null;
  exam?: number | null;
  total?: number | null;
  classAverage?: number | null;
  grade?: string | null;
  pos?: string | null;
  remark?: string | null;
};

type RatingRow = {
  label: string;
  value?: number | null; // 1..5
};

type ReportSheetData = {
  school: {
    nameLine1: string;
    nameLine2: string;
    addressLines: string[];
    phoneNumber: string;
    whatsappNumber: string;
    motto: string;
  };

  meta: {
    termLabel: string; // e.g. "FIRST"
    academicSession: string; // e.g. "2025/2026"
  };

  student: {
    name: string;
    className: string; // e.g. "JSS 2"
    admissionNo: string;
    session: string; // e.g. "2025/2026"
    term: string; // e.g. "First"
    personalAverage?: string;
    classAverage?: string;
    finalGrade?: string;
    age?: string;
    daysSchoolOpened?: string;
    daysPresent?: string;
    daysAbsent?: string;
  };

  subjects: SubjectRow[];

  ratings: {
    psychomotor: RatingRow[];
    behaviour: RatingRow[];
    affective: RatingRow[];
  };

  grading: {
    lines: string[]; // grade details
    ratingScale: string; // rating details line
  };

  remarks: {
    formTeacher?: string;
    formTeacherRemark?: string;
    principalRemark?: string;
    nextTermBegins?: string;
    date?: string;
    signature?: string;
  };
};

const defaultData: ReportSheetData = {
  school: {
    nameLine1: "VICTORIOUS ELITES INTERNATIONAL SCHOOL",
    nameLine2: "MGBAKWU",
    addressLines: [
      "Address: Nwamuo Street Amaeze Village",
      "Mgbakwu, Awka North L.G.A, Anambra",
      "State, Nigeria",
    ],
    phoneNumber: "09027557979",
    whatsappNumber: "08116154225",
    motto: "MOTTO: Moral, Quality Service & Knowledge",
  },
  meta: {
    termLabel: "____",
    academicSession: "____/____",
  },
  student: {
    name: "",
    className: "JSS ____",
    admissionNo: "",
    session: "",
    term: "",
    personalAverage: "",
    classAverage: "",
    finalGrade: "",
    age: "",
    daysSchoolOpened: "",
    daysPresent: "",
    daysAbsent: "",
  },
  subjects: [
    { subject: "ENGLISH STUDIES" },
    { subject: "MATHEMATICS" },
    { subject: "BASIC SCIENCE" },
    { subject: "SOCIAL STUDIES" },
    { subject: "FRENCH" },
    { subject: "IGBO LANGUAGE" },
    { subject: "BUSINESS STUDIES" },
    { subject: "BASIC TECHNOLOGY" },
    { subject: "AGRICULTURAL SCIENCE" },
    { subject: "PHYSICAL AND HEALTH EDU." },
    { subject: "CULTURAL & CREATIVE ARTS" },
    { subject: "CHRISTIAN RELIGIOUS STUDIES" },
    { subject: "COMPUTER STUDIES (ICT)" },
    { subject: "HOME ECONOMICS" },
    { subject: "MORAL INSTRUCTION" },
    { subject: "ORAL ENGLISH" },
    { subject: "HISTORY" },
  ],
  ratings: {
    psychomotor: [
      { label: "Handwriting" },
      { label: "Fluency" },
      { label: "Games" },
      { label: "Gymnastics" },
      { label: "Drawing & Painting" },
      { label: "Technical Work" },
      { label: "Handling of Tools" },
      { label: "Lab Workshop" },
      { label: "Crafts" },
      { label: "Musical Skills" },
    ],
    behaviour: [
      { label: "Punctuality" },
      { label: "Attending of Class" },
      { label: "Carrying out Assignment" },
      { label: "Neatness" },
      { label: "Relationship with Staff" },
      { label: "Relationship with Students" },
      { label: "Honesty" },
      { label: "Self-Control" },
      { label: "Participation in Activities" },
      { label: "Helping Others" },
    ],
    affective: [
      { label: "Politeness" },
      { label: "Spirit of Responsibility" },
      { label: "Sense of Cooperation" },
      { label: "Attentiveness" },
      { label: "Initiative" },
      { label: "Organization Ability" },
      { label: "Obedience" },
      { label: "Perseverance" },
      { label: "Reliability" },
      { label: "Physical and Health" },
    ],
  },
  grading: {
    lines: [
      "A+ = 80 - 100",
      "A  = 70 - 79",
      "B+ = 65 - 69",
      "B  = 60 - 64",
      "C  = 50 - 59",
      "D  = 40 - 49",
      "F  = 0  - 39",
    ],
    ratingScale: "1=Very Poor, 2= Poor, 3= Fair, 4= Good, 5= Excellent",
  },
  remarks: {
    formTeacher: "",
    formTeacherRemark: "",
    principalRemark: "",
    nextTermBegins: "",
    date: "",
    signature: "",
  },
};

function cell(v: any) {
  if (v === null || v === undefined || v === "") return "";
  return String(v);
}

export default function ReportSheet({
  data = defaultData,
  results,
}: {
  data?: ReportSheetData;
  results: StydebtsResult;
}) {
  const onPrint = () => window.print();

  const {
    ratings,
    results: studentResult,
    student,
    term,
    overallAverage,
    overallPosition,
    overallTotal,
    personalAverage,
    formTeachersRemark,
    principalsRemark,
    signedBy,
    signedDate,
  } = results;
  // console.log(results);

  return (
    <div className="bg-neutral-100 py-6 ">
      {/* Toolbar (not printed) */}
      <div className="mx-auto mb-4 w-198.5 print:hidden">
        <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <div className="text-sm font-semibold text-neutral-800">
            Report Sheet Preview
            <span className="ml-2 text-xs font-normal text-neutral-500">
              (Use Print → Save as PDF)
            </span>
          </div>
          <button
            onClick={onPrint}
            className="rounded-lg border border-neutral-300 bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Download / Print
          </button>
        </div>
      </div>
      {/* PAGE 1 */}
      <div id="result-sheet" className="relative">
        <section className="mx-auto w-198.5 bg-white px-5 py-8 shadow-sm ring-1 ring-black/5 print:shadow-none print:ring-0">
          {/* Header */}
          <div className="text-center">
            <div className="font-serif text-xl font-bold tracking-wide">
              {data.school.nameLine1}
            </div>
            <div className="font-serif text-xl font-bold tracking-wide">
              {data.school.nameLine2}
            </div>

            <div className="mt-2 flex items-start justify-between text-[11px] leading-4">
              <div className="text-left">
                {data.school.addressLines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>

              {/* Crest placeholder */}
              <div className="mx-6 flex h-30 w-30 relative items-center justify-center rounded-full text-[10px] font-bold">
                <Image
                  src={logoImg}
                  alt="School Logo "
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-right">
                <div>Phone Number: {data.school.phoneNumber}</div>
                <div>WhatsAPP Number: {data.school.whatsappNumber}</div>
              </div>
            </div>

            <div className="mt-2 text-[11px] font-semibold">
              {data.school.motto}
            </div>

            <div className="mt-2 border-t border-black pt-2 text-[12px] font-bold uppercase tracking-wide">
              REPORT SHEET FOR&nbsp;&nbsp;{term?.term}&nbsp;&nbsp;TERM,&nbsp;
              {student?.sessionId?.session}&nbsp;&nbsp;ACADEMIC SESSION
            </div>
          </div>

          {/* Student meta block */}
          <div className="mt-3 grid grid-cols-3 gap-4 text-[11px]">
            <div className="space-y-1">
              <RowLine label="Name:" value={student?.fullName} />
              <RowLine
                label="Class:"
                value={constructClassName(
                  (student?.classId as ClassType)?.name,
                  (student?.classId as any)?.level,
                )}
              />
              <RowLine label="Admission No:" value={student?.studentsId} />
              <RowLine label="Session:" value={student?.sessionId?.session} />
              <RowLine label="Term:" value={`${term?.term} term`} />
            </div>

            <div className="space-y-1">
              <RowLine
                label="Personal Average:"
                value={String(personalAverage)}
              />
              <RowLine label="Class Average:" value={String(overallAverage)} />
            </div>

            <div className="space-y-1">
              <RowLine
                label="Final Grade:"
                value={toOrdinal(overallPosition)}
              />
              <RowLine label="Age:" value={data.student.age} />
              <RowLine
                label="Days School Opened:"
                value={data.student.daysSchoolOpened}
              />
              <RowLine
                label="Day(s) Present:"
                value={data.student.daysPresent}
              />
              <RowLine label="Day(s) Absent:" value={data.student.daysAbsent} />
            </div>
          </div>

          {/* Results table */}
          <div className="mt-4 relative z-50">
            <div className="absolute inset-0 flex items-center justify-center -z-1">
              <Image
                src="/images/logo.png"
                alt="Logo image"
                height={200}
                width={200}
                className="object-contain -z-2 opacity-10"
              />
            </div>
            <table className="w-full border-collapse font-serif text-[11px] z-50">
              <thead>
                <tr>
                  <Th rowSpan={2} className="w-[38%]">
                    SUBJECT
                  </Th>
                  <Th colSpan={2} className="w-[10%]">
                    CA
                  </Th>
                  <Th rowSpan={2} className="w-[10%]">
                    Exam
                  </Th>
                  <Th rowSpan={2} className="w-[10%]">
                    Total
                  </Th>
                  <Th rowSpan={2} className="w-[12%]">
                    CLASS
                    <br />
                    AVERAGE
                  </Th>
                  <Th rowSpan={2} className="w-[8%]">
                    GRADE
                  </Th>
                  <Th rowSpan={2} className="w-[6%]">
                    POS.
                  </Th>
                  <Th rowSpan={2} className="w-[6%]">
                    REMARK
                  </Th>
                </tr>
                <tr>
                  <Th className="w-[5%]">1</Th>
                  <Th className="w-[5%]">2</Th>
                </tr>
              </thead>

              <tbody>
                {/* Marks obtainable row */}
                <tr>
                  <Td className="font-bold">MARKS OBTAINABLE</Td>
                  <Td className="text-center">20</Td>
                  <Td className="text-center">20</Td>
                  <Td className="text-center">60</Td>
                  <Td className="text-center">100%</Td>
                  <Td className="text-center">100%</Td>
                  <Td className="text-center" />
                  <Td className="text-center" />
                  <Td />
                </tr>

                {studentResult.map((r) => (
                  <tr key={r.subject}>
                    <Td className="font-semibold">{r.subjectId?.name}</Td>
                    <Td className="text-center">{cell(r.ca1)}</Td>
                    <Td className="text-center">{cell(r.ca2)}</Td>
                    <Td className="text-center">{cell(r.exam)}</Td>
                    <Td className="text-center">{cell(r.total)}</Td>
                    <Td className="text-center">{cell(r.classAverage)}</Td>
                    <Td className="text-center">{cell(r.grade)}</Td>
                    <Td className="text-center">{cell(toOrdinal(r.pos))}</Td>
                    <Td className="text-center">{cell(r.remark)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Page footer spacing (like sheet) */}
          <div className="mt-8 h-10" />
        </section>

        {/* PAGE 2 */}
        <section className="mx-auto mt-6 w-[794px] bg-white px-5 py-8 shadow-sm ring-1 ring-black/5 print:mt-0 print:break-before-page print:shadow-none print:ring-0">
          {/* Ratings table */}
          <div className="font-serif text-[11px] relative">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <Th className="w-1/3">PSYCHOMOTOR</Th>
                  <Th className="w-1/3">BEHAVIOUR</Th>
                  <Th className="w-1/3">AFFECTIVE</Th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, i) => {
                  const p = ratings.filter(
                    (rt) => rt.category === "Psychomotor",
                  )[i];
                  const b = ratings.filter((rt) => rt.category === "Behaviour")[
                    i
                  ];
                  const a = ratings.filter((rt) => rt.category === "Affective")[
                    i
                  ];

                  return (
                    <tr key={i}>
                      <Td>
                        <span className="flex items-center justify-between">
                          <span className="font-semibold">{p?.item ?? ""}</span>
                          <span className="font-semibold text-end ">
                            {p?.rating ?? "0"}
                          </span>
                        </span>
                      </Td>
                      <Td>
                        <span className="flex items-center justify-between">
                          <span className="font-semibold">{b?.item ?? ""}</span>
                          <span className="font-semibold text-end ">
                            {p?.rating ?? "0"}
                          </span>
                        </span>
                      </Td>
                      <Td>
                        <span className="flex items-center justify-between">
                          <span className="font-semibold">{a?.item ?? ""}</span>
                          <span className="font-semibold text-end">
                            {a?.rating ?? "0"}
                          </span>
                        </span>
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Grade details + rating details */}
            <div className="mt-6">
              <div className="font-bold">GRADE DETAILS:</div>
              <div className="mt-1 space-y-1">
                {data.grading.lines.map((l) => (
                  <div key={l}>{l}</div>
                ))}
              </div>

              <div className="mt-5 font-bold">RATING DETAILS:</div>
              <div className="mt-1">{data.grading.ratingScale}</div>
            </div>

            {/* Remarks lines */}
            <div className="mt-7 space-y-5">
              {/*<LineField
                label="FORM TEACHER:"
                value={data.remarks.formTeacher}
              />*/}
              <LineField
                label="FORM TEACHER'S REMARK:"
                value={formTeachersRemark}
              />
              <LineField label="PRINCIPAL'S REMARK:" value={principalsRemark} />
              <LineField
                label="NEXT TERM BEGINS:"
                value={data.remarks.nextTermBegins}
              />

              <div className="mt-10 grid grid-cols-2 gap-12">
                <LineField label="DATE:" value={formatDate(signedDate)} />
                <LineField
                  label="SIGNED BY:"
                  value={`${signedBy?.firstName} ${signedBy?.lastName}`}
                  italics
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          html,
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
}

function RowLine({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex gap-2">
      <div className="min-w-20 font-semibold">{label}</div>
      <div className="flex-1 border-b border-gray-300 font-bold pb-px text-xs">
        {value || ""}
      </div>
    </div>
  );
}

function LineField({
  label,
  value,
  italics,
}: {
  label: string;
  value?: string;
  italics?: boolean;
}) {
  return (
    <div className="flex items-end gap-2">
      <div className="min-w-[170px] font-bold">{label}</div>
      <div
        className={`flex-1 border-b border-black pb-1 ${italics ? "italic" : ""}  `}
      >
        {value || ""}
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
  rowSpan,
  colSpan,
}: {
  children?: React.ReactNode;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
}) {
  return (
    <th
      rowSpan={rowSpan}
      colSpan={colSpan}
      className={`border border-black px-2 py-1 text-center align-middle font-bold ${className}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={`border border-black px-2 py-1 align-middle font-bold ${className} z-50`}
    >
      {children}
    </td>
  );
}
