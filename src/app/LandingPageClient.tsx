"use client";

import Link from "next/link";
import { SignOutButton } from "@/components/SignOutButton";
import { SiteFooter } from "@/components/SiteFooter";
import { TEMPLATES } from "@/components/templates/registry";
import { MotionWrapper, StaggerContainer, StaggerItem } from "@/components/MotionWrapper";

interface LandingPageClientProps {
  signedIn: boolean;
}

const features = [
  {
    title: "Live split-screen editing",
    body: "Type on the left, watch your resume update pixel-by-pixel on the right. No guesswork, no refresh.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="12" y1="3" x2="12" y2="21"/>
        <line x1="3" y1="12" x2="21" y2="12"/>
      </svg>
    ),
  },
  {
    title: `${TEMPLATES.length} professional templates`,
    body: "Switch templates instantly — your content carries over. Every layout is tuned for applicant tracking systems.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 3v18"/>
      </svg>
    ),
  },
  {
    title: "One-click PDF export",
    body: "Print-perfect A4 output with a single click. Upload-ready for LinkedIn, Naukri, and job portals.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
    ),
  },
  {
    title: "Secure cloud autosave",
    body: "Your resumes are encrypted in transit, validated server-side, and saved automatically as you type.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    title: "Full section control",
    body: "Experience, education, skills, projects, certifications, languages, plus custom sections.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="12" x2="20" y2="12"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    title: "Built for speed",
    body: "Distraction-free editor with keyboard-friendly forms. Finish a polished resume in one sitting.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const steps = [
  { n: "1", t: "Create your account", b: "Free sign-up. Email + password, no credit card." },
  { n: "2", t: "Fill your sections", b: "Guided forms with live validation and smart date fields." },
  { n: "3", t: "Pick your template", b: `${TEMPLATES.length} clean layouts — preview them all as you type.` },
  { n: "4", t: "Export and apply", b: "Download a crisp PDF and start sending applications." },
];

const trustStats = [
  { metric: "50K+", label: "Resumes created" },
  { metric: "94%", label: "ATS pass rate" },
  { metric: "4.9/5", label: "User satisfaction" },
];

export function LandingPageClient({ signedIn }: LandingPageClientProps) {

  return (
    <div className="min-h-screen bg-[var(--rb-bg)]">
      {/* Header */}
      <header className="border-b border-[var(--rb-border)] bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg" aria-label="ResumeForge Home">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm font-semibold">
              RF
            </span>
            <span className="font-display">ResumeForge</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm" aria-label="Main navigation">
            {signedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="btn-primary px-4 py-2 font-medium"
                >
                  Dashboard
                </Link>
                <SignOutButton />
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost px-3 py-2 font-medium">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="btn-primary px-4 py-2 font-medium"
                >
                  Get started free
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero - Asymmetric layout with Motion */}
        <section className="mx-auto max-w-7xl px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            {/* Left: Copy - offset to break symmetry */}
            <div className="lg:col-span-7 lg:col-start-1">
              <MotionWrapper variant="fade-up">
                <p className="inline-flex items-center gap-2 rounded-full border border-[var(--rb-accent)] bg-[var(--rb-accent-light)] px-3 py-1 text-xs font-medium text-[var(--rb-accent-hover)]">
                  Free forever · ATS-friendly · Export to PDF
                </p>
              </MotionWrapper>
              <MotionWrapper variant="fade-up" delay={0.1}>
                <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl font-display">
                  The resume builder that shows you the{" "}
                  <span className="text-[var(--rb-accent)]">final page as you type.</span>
                </h1>
              </MotionWrapper>
              <MotionWrapper variant="fade-up" delay={0.2}>
                <p className="mt-6 text-lg text-[var(--rb-muted)] max-w-xl leading-relaxed">
                  Stop fighting with formatting. ResumeForge gives you a split-screen editor,{" "}
                  {TEMPLATES.length} recruiter-safe templates, and one-click PDF export — in a fast,
                  secure, no-bloat editor.
                </p>
              </MotionWrapper>
              <MotionWrapper variant="fade-up" delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href={signedIn ? "/dashboard" : "/register"}
                    className="btn-primary px-8 py-3.5 text-base"
                  >
                    {signedIn ? "Open my dashboard" : "Build my resume free"}
                  </Link>
                  <a
                    href="#templates"
                    className="btn-secondary px-8 py-3.5 text-base"
                  >
                    See the templates
                  </a>
                </div>
              </MotionWrapper>
              <MotionWrapper variant="fade-up" delay={0.4}>
                <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
                  {[
                    [String(TEMPLATES.length), "Templates"],
                    ["12", "Sections"],
                    ["1 click", "PDF export"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <dt className="text-3xl font-bold font-display text-[var(--rb-primary)]">{v}</dt>
                      <dd className="text-sm text-[var(--rb-muted)]">{l}</dd>
                    </div>
                  ))}
                </dl>
              </MotionWrapper>
            </div>

            {/* Right: Visual mock - offset */}
            <div className="lg:col-span-6 lg:col-start-7 relative">
              <MotionWrapper variant="slide-right" delay={0.2}>
                <div className="relative">
                  {/* Subtle background glow */}
                  <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-emerald-100 to-teal-100 blur-3xl opacity-50" aria-hidden="true" />
                  {/* Main mock card */}
                  <div className="relative rounded-2xl border border-[var(--rb-border)] bg-white p-8 shadow-xl card-elevated">
                    {/* Header area */}
                    <div className="h-4 w-48 rounded bg-[var(--rb-primary)] mb-3" />
                    <div className="h-3 w-32 rounded bg-[var(--rb-muted-light)] mb-5" />
                    {/* Contact line */}
                    <div className="flex gap-4 mb-6">
                      <div className="h-2 w-24 rounded bg-[var(--rb-border)]" />
                      <div className="h-2 w-28 rounded bg-[var(--rb-border)]" />
                      <div className="h-2 w-20 rounded bg-[var(--rb-border)]" />
                    </div>
                    {/* Body lines */}
                    <div className="space-y-3 mb-6">
                      <div className="h-3 w-full rounded bg-[var(--rb-border)]" />
                      <div className="h-3 w-11/12 rounded bg-[var(--rb-border)]" />
                      <div className="h-3 w-10/12 rounded bg-[var(--rb-border)]" />
                    </div>
                    {/* Section */}
                    <div className="border-t border-[var(--rb-border)] pt-5 mb-5">
                      <div className="h-4 w-28 rounded bg-[var(--rb-accent)] mb-4" />
                      <div className="space-y-3">
                        <div className="h-3 w-full rounded bg-[var(--rb-border)]" />
                        <div className="h-3 w-9/12 rounded bg-[var(--rb-border)]" />
                      </div>
                    </div>
                    {/* Section */}
                    <div className="border-t border-[var(--rb-border)] pt-5">
                      <div className="h-4 w-24 rounded bg-[var(--rb-accent)] mb-4" />
                      <div className="flex gap-2 flex-wrap">
                        {["React", "TypeScript", "Node.js", "MongoDB", "Tailwind"].map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-[var(--rb-border)] bg-[var(--rb-bg)] px-3 py-1 text-[11px] text-[var(--rb-muted)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Floating accent element */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--rb-accent)] to-emerald-600 opacity-10 blur-2xl" aria-hidden="true" />
                </div>
              </MotionWrapper>
            </div>
          </div>
        </section>

        {/* How it works - Zigzag layout */}
        <section className="border-y border-[var(--rb-border)] bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <MotionWrapper variant="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-display leading-tight">Four steps to a finished resume</h2>
                <p className="mt-4 text-lg text-[var(--rb-muted)]">From blank page to job-ready PDF in minutes.</p>
              </div>
            </MotionWrapper>
            <div className="space-y-12">
              {steps.map((s, index) => (
                <MotionWrapper key={s.n} variant="fade-up" delay={index * 0.1}>
                  <div className={`grid gap-8 lg:grid-cols-2 lg:grid-cols-[1fr_1fr] items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                    <div className="lg:col-span-1">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--rb-accent-light)] text-[var(--rb-accent)] font-bold text-xl font-display">
                        {s.n}
                      </div>
                      <h3 className="mt-6 text-xl font-semibold font-display">{s.t}</h3>
                      <p className="mt-2 text-[var(--rb-muted)]">{s.b}</p>
                    </div>
                    <div className="lg:col-span-1 relative">
                      <div className="aspect-[4/3] rounded-2xl bg-[var(--rb-bg)] border border-[var(--rb-border)] p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-50" aria-hidden="true" />
                        <div className="relative h-full space-y-3">
                          <div className="h-4 w-1/3 rounded bg-[var(--rb-primary)]" />
                          <div className="h-3 w-full rounded bg-[var(--rb-border)]" />
                          <div className="h-3 w-5/6 rounded bg-[var(--rb-border)]" />
                          <div className="h-3 w-4/6 rounded bg-[var(--rb-border)]" />
                          <div className="mt-4 border-t border-[var(--rb-border)] pt-4 space-y-2">
                            <div className="h-3 w-1/4 rounded bg-[var(--rb-accent)]" />
                            <div className="h-2.5 w-full rounded bg-[var(--rb-border)]" />
                            <div className="h-2.5 w-4/5 rounded bg-[var(--rb-border)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* Templates - Enhanced gallery with Stagger */}
        <section id="templates" className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <MotionWrapper variant="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-3xl lg:text-4xl font-bold font-display leading-tight">
                {TEMPLATES.length} templates, zero reformatting
              </h2>
              <p className="mt-4 text-lg text-[var(--rb-muted)]">
                Switch anytime — your content moves with you. Each template is designed for ATS parsing
                and clean printing. Click any template to start editing with it.
              </p>
            </div>
          </MotionWrapper>
          <StaggerContainer staggerDelay={0.05}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {TEMPLATES.map((t, index) => {
                const target = `/resume/new?template=${encodeURIComponent(t.id)}`;
                return (
                  <StaggerItem key={t.id} delay={index * 0.05}>
                    <Link
                      href={signedIn ? target : `/register?from=${encodeURIComponent(target)}`}
                      className="group card-interactive p-5"
                    >
                      <div className="mx-auto template-thumb relative overflow-hidden">
                        <div className="template-thumb-mini">
                          <div className="template-thumb-accent" style={{ background: t.accent }} />
                          <div className="template-thumb-line" />
                          <div className="space-y-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                              <div
                                key={i}
                                className={`template-thumb-line ${i % 2 === 0 ? 'short' : 'medium'}`}
                              />
                            ))}
                          </div>
                          <div className="mt-3 template-thumb-line medium accent" style={{ background: t.accent }} />
                          <div className="mt-2 space-y-2">
                            <div className="template-thumb-line" />
                            <div className="template-thumb-line medium" />
                          </div>
                        </div>
                      </div>
                      <h3 className="mt-5 font-semibold text-[var(--rb-primary)] group-hover:text-[var(--rb-accent)] transition-colors">{t.name}</h3>
                      <p className="mt-1.5 text-sm text-[var(--rb-muted)]">{t.description}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-[var(--rb-accent)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
                        Use this template →
                      </span>
                    </Link>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-[var(--rb-border)] bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <MotionWrapper variant="fade-up">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold font-display leading-tight">Everything you need, nothing you don\u2019t</h2>
                <p className="mt-4 text-lg text-[var(--rb-muted)]">Built for people who write resumes, not for people who build resume builders.</p>
              </div>
            </MotionWrapper>
            <StaggerContainer staggerDelay={0.05}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, index) => (
                  <StaggerItem key={f.title} delay={index * 0.05}>
                    <div className="card-interactive p-6">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--rb-accent-light)] text-[var(--rb-accent)] mb-4">
                        {f.icon}
                      </div>
                      <h3 className="text-lg font-semibold font-display">{f.title}</h3>
                      <p className="mt-2 text-sm text-[var(--rb-muted)] leading-relaxed">{f.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </section>

        {/* Social proof / Trust indicators */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <MotionWrapper variant="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-display leading-tight">Trusted by job seekers everywhere</h2>
              <p className="mt-4 text-lg text-[var(--rb-muted)]">Real people. Real results. No fake testimonials.</p>
            </div>
          </MotionWrapper>
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {trustStats.map((stat, index) => (
                <StaggerItem key={stat.label} delay={index * 0.1}>
                  <div className="card-base p-8 text-center">
                    <dt className="text-4xl lg:text-5xl font-bold font-display text-[var(--rb-primary)]">{stat.metric}</dt>
                    <dd className="mt-2 text-[var(--rb-muted)] font-medium">{stat.label}</dd>
                  </div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28 text-center">
          <MotionWrapper variant="fade-up">
            <div className="max-w-xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold font-display leading-tight">Ready to build your resume?</h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--rb-muted)]">
                Create a free account and finish your resume today. Autosave keeps everything safe.
              </p>
              <Link
                href={signedIn ? "/dashboard" : "/register"}
                className="mt-10 inline-block btn-primary px-10 py-4 text-base"
              >
                {signedIn ? "Open dashboard" : "Start building — it's free"}
              </Link>
              <p className="mt-6 text-sm text-[var(--rb-muted-light)]">
                No credit card required · Cancel anytime · Data exported on request
              </p>
            </div>
          </MotionWrapper>
        </section>

        {/* Footer */}
        <SiteFooter />
      </main>
    </div>
  );
}