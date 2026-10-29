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
  "bold-header": "Bold Header",
  "professional-blue": "Professional Blue",
  "minimal-line": "Minimal Line",
  "creative-band": "Creative Band",
  "simple-stack": "Simple Stack",
  "academic-cv": "Academic CV",
  "graduate-entry": "Graduate Entry",
  "tech-engineer": "Tech Engineer",
  "it-specialist": "IT Specialist",
  "designer-portfolio": "Designer Portfolio",
  "marketing-pro": "Marketing Pro",
  "sales-professional": "Sales Professional",
  "finance-conservative": "Finance",
  "healthcare-nurse": "Healthcare",
  "teacher-education": "Teacher",
  "legal-professional": "Legal Professional",
  "hospitality-service": "Hospitality",
  "student-resume": "Student",
  "federal-block": "Federal Block",
  "executive-dark": "Executive Dark",
  "color-sidebar": "Color Sidebar",
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

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

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
      <div className="mt-14 animate-fade-in-up">
        <div className="empty-state card-base">
          <div className="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <h2 className="empty-state-title">No resumes yet</h2>
          <p className="empty-state-text">
            Create your first resume — you\u2019ll see a live preview as you type, and everything autosaves.
          </p>
          <Link
            href="/resume/new"
            className="mt-6 btn-primary"
          >
            Create my first resume
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 animate-fade-in-up">
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3" role="alert">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span className="text-sm text-red-700">{error}</span>
          </div>
        </div>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => (
          <li
            key={r.id}
            className="group card-interactive p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  href={`/resume/${r.id}`}
                  className="block truncate font-semibold text-[var(--rb-primary)] hover:text-[var(--rb-accent)] transition-colors"
                >
                  {r.title}
                </Link>
                <p className="mt-1 text-xs text-[var(--rb-muted)]">
                  {TEMPLATE_LABELS[r.template] ?? r.template} · edited {timeAgo(r.updatedAt)}
                </p>
              </div>
              <span className="badge badge-muted shrink-0">
                {TEMPLATE_LABELS[r.template]?.split(" ")[0] ?? "Resume"}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/resume/${r.id}`}
                className="flex-1 btn-primary px-3 py-2 text-sm justify-center gap-2"
              >
                <EditIcon />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => duplicate(r.id)}
                disabled={busy === r.id}
                className="btn-secondary px-3 py-2 text-sm gap-2"
              >
                <CopyIcon />
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => remove(r.id, r.title)}
                disabled={busy === r.id}
                className="btn-danger px-3 py-2 text-sm gap-2"
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}