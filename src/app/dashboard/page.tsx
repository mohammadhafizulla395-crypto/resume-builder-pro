import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Resume } from "@/lib/models/Resume";
import { SignOutButton } from "@/components/SignOutButton";
import { ResumeActions, type ResumeListItem } from "@/components/ResumeActions";

export const metadata: Metadata = { title: "Dashboard" };

// Dynamic route: waits for the session/DB check before responding.

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) redirect("/login");

  await connectDB();
  const docs = await Resume.find({ userId }).sort({ updatedAt: -1 }).lean();

  const items: ResumeListItem[] = docs.map((d) => ({
    id: d._id.toString(),
    title: d.title,
    template: d.template,
    updatedAt: new Date(d.updatedAt).toISOString(),
  }));

  const name = session?.user?.name ?? "there";

  return (
    <div className="min-h-screen bg-[var(--rb-bg)]">
      <header className="border-b border-[var(--rb-border)] bg-white">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg" aria-label="ResumeForge Home">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm font-semibold">
              RF
            </span>
            <span className="font-display">ResumeForge</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-[var(--rb-muted)] sm:inline">Signed in as {session?.user?.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 animate-fade-in-up">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold font-display text-[var(--rb-primary)]">Your resumes</h1>
            <p className="mt-2 text-[var(--rb-muted)]">Hi {name} — pick up where you left off, or start fresh.</p>
          </div>
          <Link
            href="/resume/new"
            className="btn-primary px-6 py-3 text-sm"
          >
            + New resume
          </Link>
        </div>

        <ResumeActions items={items} />
      </main>
    </div>
  );
}