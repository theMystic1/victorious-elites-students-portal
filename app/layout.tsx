import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/ui/main-layout";
import QueryProviders from "@/contexts/query-provider";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Victorious Elites",
  description:
    "Victorious Elites Academy provides Nursery, Primary and Secondary education with a clear structure, measurable outcomes, and a safe environment where students thrive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunitoSans.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className=" flex flex-col">
        <QueryProviders>
          <MainLayout>{children}</MainLayout>
        </QueryProviders>
      </body>
    </html>
  );
}
