"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface ResumeListItem {
  id: string;
  title: string;
  template: string;
  updatedAt: string;
}

const TEMPLATE_LABELS: Record<string, string> = {
  "ats-minimal": "ATS Minimal",
  "modern-clean": "Modern Clean",
  "classic-serif": "Classic Serif",
  "compact-one-column": "Compact One-Column",
  "two-column-sidebar": "Two-Column Sidebar",
  "executive-elegant": "Executive Elegant",
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function ResumeActions({ items }: { items: ResumeListItem[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [list, setList] = useState(items);

  async function duplicate(id: string) {
    setBusy(id);
    setError(null);
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "POST" });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error ?? "Could not duplicate.");
        return;
      }
      const j = (await res.json()) as { id: string; title: string };
      setList((l) => [
        { id: j.id, title: j.title, template: "ats-minimal", updatedAt: new Date().toISOString() },
        ...l,
      ]);
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(id);
    setError(null);
    try {
      const res = await fetch(`/api/resumes/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setError("Could not delete the resume.");
        return;
      }
      setList((l) => l.filter((r) => r.id !== id));
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  if (list.length === 0) {
    return (
      <div className="mt-14 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
          📄
        </div>
        <h2 className="mt-4 text-lg font-semibold">No resumes yet</h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">
          Create your first resume — you&apos;ll see a live preview as you type, and everything
          autosaves.
        </p>
        <Link
          href="/resume/new"
          className="mt-6 inline-block rounded-xl bg-[var(--rb-accent)] px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Create my first resume
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8">
      {error && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}
      <ul className="grid gap-4 sm:grid-cols-2">
        {list.map((r) => (
          <li
            key={r.id}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/resume/${r.id}`}
                  className="block truncate font-semibold text-slate-900 hover:text-indigo-600"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-xs text-slate-500">
                  {TEMPLATE_LABELS[r.template] ?? r.template} · edited {timeAgo(r.updatedAt)}
                </p>
              </div>
              <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600">
                {TEMPLATE_LABELS[r.template]?.split(" ")[0] ?? "Resume"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/resume/${r.id}`}
                className="flex-1 rounded-lg bg-[var(--rb-accent)] px-3 py-2 text-center text-sm font-medium text-white hover:opacity-90"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => duplicate(r.id)}
                disabled={busy === r.id}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => remove(r.id, r.title)}
                disabled={busy === r.id}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
