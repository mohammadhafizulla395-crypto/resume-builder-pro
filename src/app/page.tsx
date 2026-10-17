import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";

// Blocking route: header reflects the live session (Next 16 cacheComponents)
export const instant = false;

const features = [
  {
    title: "Live split-screen editing",
    body: "Type on the left, watch your resume update pixel-by-pixel on the right. No guesswork, no refresh.",
    icon: "◧",
  },
  {
    title: "6 ATS-friendly templates",
    body: "Switch templates instantly — your content carries over. Every layout is tuned for applicant tracking systems.",
    icon: "▦",
  },
  {
    title: "One-click PDF export",
    body: "Print-perfect A4 output with a single click. Upload-ready for LinkedIn, Naukri, and job portals.",
    icon: "↓",
  },
  {
    title: "Secure cloud autosave",
    body: "Your resumes are encrypted in transit, validated server-side, and saved automatically as you type.",
    icon: "🔒",
  },
  {
    title: "Full section control",
    body: "Experience, education, skills, projects, certifications, languages, plus custom sections.",
    icon: "☰",
  },
  {
    title: "Built for speed",
    body: "Distraction-free editor with keyboard-friendly forms. Finish a polished resume in one sitting.",
    icon: "⚡",
  },
];

const steps = [
  { n: "1", t: "Create your account", b: "Free sign-up. Email + password, no credit card." },
  { n: "2", t: "Fill your sections", b: "Guided forms with live validation and smart date fields." },
  { n: "3", t: "Pick your template", b: "Six clean layouts — preview all of them as you type." },
  { n: "4", t: "Export and apply", b: "Download a crisp PDF and start sending applications." },
];

export default async function LandingPage() {
  const session = await auth();
  const signedIn = Boolean(session?.user);

  return (
    <div className="min-h-screen bg-[var(--rb-bg)]">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm">
              RF
            </span>
            ResumeForge
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            {signedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-[var(--rb-accent)] px-4 py-2 font-medium text-white hover:opacity-90"
                >
                  Dashboard
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 font-medium text-slate-600 hover:text-slate-900">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-[var(--rb-accent)] px-4 py-2 font-medium text-white hover:opacity-90"
                >
                  Get started free
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Free forever · ATS-friendly · Export to PDF
            </p>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              The resume builder that shows you the{" "}
              <span className="text-[var(--rb-accent)]">final page as you type.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              Stop fighting with formatting. ResumeForge gives you a split-screen editor, six
              recruiter-safe templates, and one-click PDF export — in a fast, secure, no-bloat
              editor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={signedIn ? "/dashboard" : "/register"}
                className="rounded-xl bg-[var(--rb-accent)] px-6 py-3 font-semibold text-white shadow-sm hover:opacity-90"
              >
                {signedIn ? "Open my dashboard" : "Build my resume free"}
              </Link>
              <a
                href="#templates"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                See the templates
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                ["6", "Templates"],
                ["12", "Sections"],
                ["1 click", "PDF export"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-2xl font-bold">{v}</dt>
                  <dd className="text-sm text-slate-500">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero mock: mini paper */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-100 to-sky-100 blur-2xl opacity-70" />
            <div className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="h-3 w-40 rounded bg-slate-800" />
              <div className="mt-2 h-2.5 w-28 rounded bg-slate-400" />
              <div className="mt-3 flex gap-3">
                <div className="h-2 w-20 rounded bg-slate-300" />
                <div className="h-2 w-24 rounded bg-slate-300" />
                <div className="h-2 w-16 rounded bg-slate-300" />
              </div>
              <div className="mt-6 space-y-2">
                <div className="h-2.5 w-full rounded bg-slate-200" />
                <div className="h-2.5 w-11/12 rounded bg-slate-200" />
                <div className="h-2.5 w-10/12 rounded bg-slate-200" />
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="h-3 w-24 rounded bg-indigo-500" />
                <div className="mt-3 space-y-2">
                  <div className="h-2.5 w-full rounded bg-slate-200" />
                  <div className="h-2.5 w-9/12 rounded bg-slate-200" />
                </div>
              </div>
              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="h-3 w-20 rounded bg-indigo-500" />
                <div className="mt-3 flex gap-2">
                  {["React", "TypeScript", "Node.js"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Four steps to a finished resume</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--rb-accent)] font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-4 font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold">Six templates, zero reformatting</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Switch anytime — your content moves with you. Each template is designed for ATS parsing
          and clean printing.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: "ats-minimal", name: "ATS Minimal", desc: "Single column, strict hierarchy. Maximum parsing safety.", accent: "#0f172a" },
            { id: "modern-clean", name: "Modern Clean", desc: "Indigo accents and confident headings for tech roles.", accent: "#4f46e5" },
            { id: "classic-serif", name: "Classic Serif", desc: "Traditional Georgia typography for formal industries.", accent: "#1e293b" },
            { id: "compact-one-column", name: "Compact One-Column", desc: "Dense layout that fits 10+ years on one page.", accent: "#334155" },
            { id: "two-column-sidebar", name: "Two-Column Sidebar", desc: "Skills-forward split layout with sidebar contact.", accent: "#0e7490" },
            { id: "executive-elegant", name: "Executive Elegant", desc: "Refined spacing and gold-rule details for senior roles.", accent: "#78350f" },
          ].map((t) => (
            <div
              key={t.id}
              className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto h-40 w-28 rounded-md border border-slate-200 bg-white p-3 shadow-sm">
                <div className="h-2 w-12 rounded" style={{ background: t.accent }} />
                <div className="mt-1.5 h-1.5 w-16 rounded bg-slate-300" />
                <div className="mt-3 space-y-1.5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded bg-slate-200"
                      style={{ width: `${90 - (i % 3) * 15}%` }}
                    />
                  ))}
                </div>
                <div className="mt-3 h-1.5 w-10 rounded" style={{ background: t.accent }} />
                <div className="mt-1.5 space-y-1.5">
                  <div className="h-1 w-full rounded bg-slate-200" />
                  <div className="h-1 w-4/5 rounded bg-slate-200" />
                </div>
              </div>
              <h3 className="mt-4 font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold">Everything you need, nothing you don&apos;t</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-slate-200 p-6">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">Ready to build your resume?</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Create a free account and finish your resume today. Autosave keeps everything safe.
        </p>
        <Link
          href={signedIn ? "/dashboard" : "/register"}
          className="mt-8 inline-block rounded-xl bg-[var(--rb-accent)] px-8 py-3.5 font-semibold text-white shadow-sm hover:opacity-90"
        >
          {signedIn ? "Open dashboard" : "Start building — it&apos;s free"}
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} ResumeForge. All rights reserved.</p>
          <p>
            Built by <span className="font-medium text-slate-700">Sutrixa Tech</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
