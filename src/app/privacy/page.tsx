import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--rb-bg)]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm">
              RF
            </span>
            ResumeForge
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: October 18, 2026</p>

        <div className="prose-slate mt-8 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">1. What we collect</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600">
              <li>
                <strong>Account data:</strong> your name, email address, and a bcrypt-hashed
                password. We never store or see your password in plain text.
              </li>
              <li>
                <strong>Resume content:</strong> the resumes you create — contact details,
                work history, education, and anything else you choose to type in.
              </li>
              <li>
                <strong>Basic request metadata:</strong> handled automatically by our hosting
                provider (IP address, browser, and request logs) for security and abuse
                prevention, such as rate limiting sign-in attempts.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">2. How it is stored &amp; protected</h2>
            <p className="mt-3 text-slate-600">
              Resume data lives in MongoDB Atlas (encrypted at rest) and is served over
              HTTPS/TLS. Access is strictly owner-scoped: your resumes can only be read or
              modified while signed in to <em>your</em> account. Sessions are signed,
              HttpOnly, Secure JWT cookies. Rate limiting, a Content Security Policy, and
              input validation protect the app against abuse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">3. What we do NOT do</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600">
              <li>We do not sell or rent your personal data — to anyone.</li>
              <li>We do not use your resume content for advertising or model training.</li>
              <li>We do not run third-party ad trackers or behavioral analytics.</li>
              <li>We do not share your data except where required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">4. Processors we rely on</h2>
            <p className="mt-3 text-slate-600">
              <strong>Vercel</strong> (hosting &amp; edge security) and{" "}
              <strong>MongoDB Atlas</strong> (database) process data strictly on our
              instruction to run the service. Authentication is handled by Auth.js, which we
              self-host — no identity provider sees your password.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">5. Retention &amp; your rights</h2>
            <p className="mt-3 text-slate-600">
              Your data exists only while your account exists. You may request a copy of
              your data or full deletion of your account and every resume at any time by
              opening a security/advisory ticket on our{" "}
              <a
                className="text-indigo-600 hover:underline"
                href="https://github.com/mohammadhafizulla395-crypto/resume-builder-pro/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
              </a>
              . Deletion is completed promptly and irreversibly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">6. Changes &amp; contact</h2>
            <p className="mt-3 text-slate-600">
              If this policy changes materially, the updated date above changes with it.
              Questions? Reach us through the GitHub repository above — we respond to
              privacy requests as a priority.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
