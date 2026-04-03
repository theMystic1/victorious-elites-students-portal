import ResultPortal from "@/components/results/ResultPortal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Result Checker",
  description: "Check and download student results",
};

export default function Page() {
  return <ResultPortal />;
}
