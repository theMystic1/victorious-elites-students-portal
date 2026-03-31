"use client";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--c-border)] bg-[var(--c-navy)] text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="text-base font-extrabold">
              Victorious Elites Academy
            </div>
            <p className="mt-2 text-sm text-white/75 leading-relaxed">
              Nursery, Primary & Secondary education built on excellence,
              discipline, and student success.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                Result Portal
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                Admissions
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                Contact
              </span>
            </div>
            <div className="mt-6 text-xs text-white/60">
              © {new Date().getFullYear()} Victorious Elites Academy
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold">Contact</div>
            <div className="mt-3 grid gap-2 text-sm text-white/75">
              <div>
                <span className="font-semibold text-white">Phone:</span> +234
                XXX XXX XXXX
              </div>
              <div>
                <span className="font-semibold text-white">Email:</span>{" "}
                info@victoriouselites.com
              </div>
              <div>
                <span className="font-semibold text-white">Address:</span>{" "}
                Onitsha, Nigeria
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-extrabold">Quick Links</div>
            <div className="mt-3 grid gap-2 text-sm">
              {[
                { t: "Programs", href: "#programs" },
                { t: "Why Us", href: "#why" },
                { t: "Admissions", href: "#admissions" },
                { t: "News", href: "#news" },
                { t: "Result Portal", href: "/results" },
              ].map((l) => (
                <a
                  key={l.t}
                  href={l.href}
                  className="text-white/75 hover:text-white"
                >
                  {l.t}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[var(--r-2xl)] border border-white/10 bg-white/5 p-5 text-sm text-white/75">
          <span className="font-semibold text-white">Note:</span> This is the
          public website. Staff/admin access is provided through the secured
          internal portal.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
