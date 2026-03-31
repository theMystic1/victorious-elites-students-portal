"use client";

import { ReactNode } from "react";
import Reveal from "./reveal";
import Nav from "./nav";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-screen bg-(--c-bg) text-(--c-ink)">
      <Reveal from="down" delayMs={80}>
        <Nav />
      </Reveal>

      <div className="w-full h-full">{children}</div>
    </main>
  );
};

export default MainLayout;
