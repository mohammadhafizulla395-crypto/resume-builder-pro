import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { Resume } from "@/lib/models/Resume";
import { SignOutButton } from "@/components/SignOutButton";
import { ResumeActions, type ResumeListItem } from "@/components/ResumeActions";

export const metadata: Metadata = { title: "Dashboard" };

// Blocking route: waits for the session/DB check before responding (Next 16 cacheComponents)
export const instant = false;

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
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--rb-accent)] text-white text-sm">
              RF
            </span>
            ResumeForge
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="hidden text-slate-500 sm:inline">Signed in as {session?.user?.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Your resumes</h1>
            <p className="mt-1 text-slate-600">Hi {name} â€” pick up where you left off, or start fresh.</p>
          </div>
          <Link
            href="/resume/new"
            className="rounded-xl bg-[var(--rb-accent)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            + New resume
          </Link>
        </div>

        <ResumeActions items={items} />
      </main>
    </div>
  );
}
