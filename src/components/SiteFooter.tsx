import Link from "next/link";
import { TEMPLATES } from "@/components/templates/registry";

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

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/**
 * Site-wide marketing footer — multi-column, professional grade.
 * Used on the landing page and legal pages.
 */
export function SiteFooter() {
  const year = YEAR;

  return (
    <footer className="border-t border-[var(--rb-border)] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5 animate-fade-in-up">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-[var(--rb-primary)]" aria-label="ResumeForge Home">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm font-semibold">
                RF
              </span>
              <span className="font-display">ResumeForge</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[var(--rb-muted)]">
              Build ATS-friendly resumes with live preview, {TEMPLATES.length} professional
              templates, and one-click PDF export — autosaved securely to the cloud.
            </p>
            <p className="mt-6 text-sm text-[var(--rb-muted)]">
              Built by{" "}
              <span className="font-medium text-[var(--rb-primary)]">Shaik Mohammed Hafizulla</span>
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} className="lg:col-span-2 animate-fade-in-up" aria-label={col.title} style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--rb-muted-light)]">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-[var(--rb-muted)] transition-colors hover:text-[var(--rb-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rb-accent)] rounded"
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

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--rb-border)] pt-8 text-sm text-[var(--rb-muted)] sm:flex-row">
          <p>
            © {year} ResumeForge. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-[var(--rb-muted-light)] hover:text-[var(--rb-accent)] transition-colors" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[var(--rb-muted-light)] hover:text-[var(--rb-accent)] transition-colors" aria-label="Twitter">
              <TwitterIcon />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[var(--rb-muted-light)] hover:text-[var(--rb-accent)] transition-colors" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
          <p>
            Crafted with care by{" "}
            <span className="font-medium text-[var(--rb-primary)]">Shaik Mohammed Hafizulla</span>
          </p>
        </div>
      </div>
    </footer>
  );
}