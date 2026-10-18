import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: October 18, 2026</p>

        <div className="mt-8 space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900">1. The service</h2>
            <p className="mt-3 text-slate-600">
              ResumeForge provides tools to create, edit, and export resumes. By creating an
              account or using the site you agree to these terms. If you do not agree,
              please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">2. Your account</h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-slate-600">
              <li>You must provide accurate information and keep your password secret.</li>
              <li>
                You are responsible for everything that happens under your account — notify
                us promptly if you suspect unauthorized access.
              </li>
              <li>You must be at least 16 years old (or the age of consent in your region).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">3. Acceptable use</h2>
            <p className="mt-3 text-slate-600">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-6 text-slate-600">
              <li>use the service for unlawful, fraudulent, or deceptive purposes;</li>
              <li>attempt to probe, breach, overload, or scrape the service or its APIs;</li>
              <li>upload malware or content that infringes others&apos; rights;</li>
              <li>resell or exploit access to the service without written permission.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">4. Your content</h2>
            <p className="mt-3 text-slate-600">
              You own everything you put into your resumes. You grant us only the minimal
              license needed to store, display, and export that content back to you. We
              claim no ownership over your work and never use it beyond operating the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">5. Availability</h2>
            <p className="mt-3 text-slate-600">
              The service is provided &quot;as is&quot; and &quot;as available.&quot; We work
              to keep it reliable, but we do not guarantee uninterrupted or error-free
              operation. Export a local copy of any resume you cannot afford to lose —
              always keep your own backup.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">6. Limitation of liability</h2>
            <p className="mt-3 text-slate-600">
              To the maximum extent permitted by law, ResumeForge and its builder shall not
              be liable for indirect, incidental, or consequential damages — including lost
              profits or hiring outcomes resulting from use of the service. Our total
              liability is limited to the amount you paid us (currently: nothing — the
              service is free).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">7. Termination</h2>
            <p className="mt-3 text-slate-600">
              You may delete your account at any time. We may suspend or terminate accounts
              that violate these terms or attempt to harm the service or other users, with
              notice where reasonably possible.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900">8. Changes &amp; contact</h2>
            <p className="mt-3 text-slate-600">
              We may update these terms; material changes will be reflected by the date
              above. Continued use after changes means acceptance. Questions or disputes:
              open an issue on our{" "}
              <a
                className="text-indigo-600 hover:underline"
                href="https://github.com/mohammadhafizulla395-crypto/resume-builder-pro/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub repository
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
