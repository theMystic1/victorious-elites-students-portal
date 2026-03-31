import HomeScreen from "@/components/ui/HomeScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Victorious Elites Academy",
  description:
    "Nursery, Primary & Secondary education built on excellence, discipline, and student success.",
};

export default function Home() {
  return <HomeScreen />;
}
