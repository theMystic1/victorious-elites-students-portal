"use client";

import Link from "next/link";
import Button from "./custom-btn";
import Reveal from "./reveal";
import Logo from "./logo";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-20 border-b border-(--c-border) bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-(--c-navy)` text-white">
            <Logo size="lg" />
          </div>
          <div>
            <div className="text-sm font-extrabold leading-tight">
              Victorious Elites Academy
            </div>
            <div className="text-xs text-(--c-soft)`">
              Excellence • Discipline • Impact
            </div>
          </div>
        </div>
        {pathname.includes("result") ? null : (
          <>
            <nav className="hidden items-center gap-6 text-sm font-semibold text-(--c-muted) lg:flex">
              <Link className="hover:text-(--c-ink)" href="#programs">
                Programs
              </Link>
              <Link className="hover:text-(--c-ink)" href="#why">
                Why Us
              </Link>
              <Link className="hover:text-(--c-ink)" href="#admissions">
                Admissions
              </Link>
              <Link className="hover:text-(--c-ink)" href="#news">
                News
              </Link>
              <Link className="hover:text-(--c-ink)" href="#contact">
                Contact
              </Link>
            </nav>

            <div className=" hidden lg:flex items-center gap-2">
              <Button href="/results" variant="ghost">
                Check Result
              </Button>
              <Button href="#admissions" variant="primary">
                Apply Now
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Nav;
