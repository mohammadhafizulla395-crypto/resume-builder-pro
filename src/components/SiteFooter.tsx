import Link from "next/link";

const GITHUB = "https://github.com/mohammadhafizulla395-crypto/resume-builder-pro";

// Evaluated once per process (module scope) — never during render, so
// cacheComponents prerendering accepts it as a stable value.
const YEAR = new Date().getFullYear();

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Templates", href: "/#templates" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Create resume", href: "/resume/new" },
      { label: "Sign in", href: "/login" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub repository", href: `${GITHUB}`, external: true },
      { label: "Documentation", href: `${GITHUB}#readme`, external: true },
      { label: "Report an issue", href: `${GITHUB}/issues`, external: true },
      { label: "Security policy", href: "/.well-known/security.txt", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/.well-known/security.txt", external: true },
    ],
  },
];

/**
 * Site-wide marketing footer — multi-column, professional grade.
 * Used on the landing page and legal pages.
 */
export function SiteFooter() {
  const year = YEAR;

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent,#4f46e5)] text-white text-sm">
                RF
              </span>
              ResumeForge
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Build ATS-friendly resumes with live preview, six clean templates, and one-click
              PDF export — autosaved securely to the cloud.
            </p>
            <p className="mt-5 text-sm text-slate-500">
              Built by{" "}
              <span className="font-medium text-slate-700">Shaik Mohammed Hafizulla</span>
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} className="lg:col-span-2" aria-label={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* spacer to keep 12-col rhythm on large screens (5 + 2+2+2 = 11) */}
          <div className="hidden lg:block lg:col-span-1" aria-hidden="true" />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
          <p>
            © {year} ResumeForge. All rights reserved.
          </p>
          <p>
            Crafted with care by{" "}
            <span className="font-medium text-slate-700">Shaik Mohammed Hafizulla</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
