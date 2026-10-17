"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import {
  type CertificationItem,
  type CustomSection,
  type EducationItem,
  type ExperienceItem,
  type LanguageItem,
  type ProjectItem,
  type ResumeData,
  type SkillItem,
  type TemplateId,
} from "@/types/resume";
import { TEMPLATES, getTemplate } from "@/components/templates/registry";
import { SortableList } from "./SortableList";

type SaveStatus = "idle" | "unsaved" | "saving" | "saved" | "error";

interface EditorProps {
  mode: "create" | "edit";
  initialId: string | null;
  initialTitle: string;
  initialTemplate: TemplateId;
  initialData: ResumeData;
  userName: string;
}

type SectionKey =
  | "profile"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages"
  | "custom";

const SECTIONS: { key: SectionKey; label: string; icon: string }[] = [
  { key: "profile", label: "Profile", icon: "👤" },
  { key: "summary", label: "Summary", icon: "✍️" },
  { key: "experience", label: "Experience", icon: "💼" },
  { key: "education", label: "Education", icon: "🎓" },
  { key: "skills", label: "Skills", icon: "⚡" },
  { key: "projects", label: "Projects", icon: "🚀" },
  { key: "certifications", label: "Certifications", icon: "📜" },
  { key: "languages", label: "Languages", icon: "🌐" },
  { key: "custom", label: "Custom sections", icon: "➕" },
];

/* ---------------- small field primitives ---------------- */

function Field({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className="mt-1">{children}</div>
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none";

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} min-h-[92px] resize-y`} />;
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Remove entry"
      className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
    >
      Remove
    </button>
  );
}

/* ---------------- main editor ---------------- */

export function ResumeEditor({
  mode,
  initialId,
  initialTitle,
  initialTemplate,
  initialData,
  userName,
}: EditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [template, setTemplate] = useState<TemplateId>(initialTemplate);
  const [data, setData] = useState<ResumeData>(initialData);
  const [active, setActive] = useState<SectionKey>("profile");
  const [status, setStatus] = useState<SaveStatus>(mode === "edit" ? "saved" : "idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [resumeId, setResumeId] = useState<string | null>(initialId);

  const dataRef = useRef(data);
  const titleRef = useRef(title);
  const templateRef = useRef(template);
  const idRef = useRef<string | null>(resumeId);
  const dirtyRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep refs in sync after render (save callbacks read the latest values)
  useEffect(() => {
    dataRef.current = data;
    titleRef.current = title;
    templateRef.current = template;
    idRef.current = resumeId;
  }, [data, title, template, resumeId]);

  const patch = useCallback((updater: (d: ResumeData) => ResumeData) => {
    setData((prev) => updater(prev));
    dirtyRef.current = true;
    setStatus("unsaved");
  }, []);

  const scheduleSave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      if (!dirtyRef.current) return;
      dirtyRef.current = false;
      setStatus("saving");
      setSaveError(null);
      try {
        const payload = { title: titleRef.current, template: templateRef.current, data: dataRef.current };

        if (!idRef.current) {
          // First save of a new resume → create
          const res = await fetch("/api/resumes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Save failed");
          const json = (await res.json()) as { id: string };
          setResumeId(json.id);
          idRef.current = json.id;
          window.history.replaceState(null, "", `/resume/${json.id}`);
          setStatus("saved");
          router.refresh();
          return;
        }

        const res = await fetch(`/api/resumes/${idRef.current}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error ?? "Save failed");
        setStatus("saved");
      } catch (err) {
        dirtyRef.current = true;
        setStatus("error");
        setSaveError(err instanceof Error ? err.message : "Save failed");
      }
    }, 1200);
  }, [router]);

  const mutate = useCallback(
    (updater: (d: ResumeData) => ResumeData) => {
      patch(updater);
      scheduleSave();
    },
    [patch, scheduleSave],
  );

  // Title change also marks dirty
  function onTitleChange(v: string) {
    setTitle(v);
    dirtyRef.current = true;
    setStatus("unsaved");
    scheduleSave();
  }

  function onTemplateChange(t: TemplateId) {
    setTemplate(t);
    dirtyRef.current = true;
    setStatus("unsaved");
    scheduleSave();
  }

  // Warn before unload when unsaved changes exist
  useEffect(() => {
    function beforeUnload(e: BeforeUnloadEvent) {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    }
    window.addEventListener("beforeUnload", beforeUnload);
    return () => window.removeEventListener("beforeUnload", beforeUnload);
  }, []);

  // Flush pending save on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (dirtyRef.current && idRef.current) {
        void fetch(`/api/resumes/${idRef.current}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: titleRef.current, template: templateRef.current, data: dataRef.current }),
          keepalive: true,
        });
      }
    };
  }, []);

  /* ---------- PDF + print ---------- */

  const [exporting, setExporting] = useState(false);

  async function exportPdf() {
    setExportError(null);
    setExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const node = document.getElementById("resume-paper-print");
      if (!node) throw new Error("Preview not found");
      const safeName = (titleRef.current || "resume").replace(/[^\w\- ]+/g, "").trim() || "resume";
      await html2pdf()
        .set({
          margin: 0,
          filename: `${safeName}.pdf`,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff" },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        })
        .from(node)
        .save();
      setStatus((s) => (s === "unsaved" || s === "saving" ? s : "saved"));
    } catch (err) {
      setExportError(err instanceof Error ? err.message : "PDF export failed — use Print instead.");
    } finally {
      setExporting(false);
    }
  }

  const [exportError, setExportError] = useState<string | null>(null);

  function printResume() {
    window.print();
  }

  /* ---------- section helpers ---------- */

  const TemplateComponent = useMemo(() => getTemplate(template).component, [template]);

  const profile = data.profile;

  function setProfile<K extends keyof ResumeData["profile"]>(key: K, value: ResumeData["profile"][K]) {
    mutate((d) => ({ ...d, profile: { ...d.profile, [key]: value } }));
  }

  function listHelpers<T extends { id: string }>(
    key: "experience" | "education" | "skills" | "projects" | "certifications" | "languages" | "customSections",
    factory: () => T,
  ) {
    return {
      add: () => mutate((d) => ({ ...d, [key]: [...d[key], factory()] }) as ResumeData),
      update: (id: string, patchItem: Partial<T>) =>
        mutate(
          (d) =>
            ({
              ...d,
              [key]: (d[key] as unknown as T[]).map((it) =>
                it.id === id ? { ...it, ...patchItem } : it,
              ),
            }) as ResumeData,
        ),
      remove: (id: string) =>
        mutate(
          (d) =>
            ({ ...d, [key]: (d[key] as unknown as T[]).filter((it) => it.id !== id) }) as ResumeData,
        ),
      reorder: (next: T[]) => mutate((d) => ({ ...d, [key]: next }) as ResumeData),
    };
  }

  const expL = listHelpers<ExperienceItem>("experience", () => ({
    id: nanoid(10),
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  }));

  const eduL = listHelpers<EducationItem>("education", () => ({
    id: nanoid(10),
    institution: "",
    degree: "",
    field: "",
    location: "",
    startDate: "",
    endDate: "",
    gpa: "",
    description: "",
  }));

  const skillL = listHelpers<SkillItem>("skills", () => ({ id: nanoid(10), name: "" }));

  const projL = listHelpers<ProjectItem>("projects", () => ({
    id: nanoid(10),
    name: "",
    role: "",
    link: "",
    startDate: "",
    endDate: "",
    description: "",
  }));

  const certL = listHelpers<CertificationItem>("certifications", () => ({
    id: nanoid(10),
    name: "",
    issuer: "",
    date: "",
    link: "",
  }));

  const langL = listHelpers<LanguageItem>("languages", () => ({
    id: nanoid(10),
    name: "",
    level: "",
  }));

  const customL = listHelpers<CustomSection>("customSections", () => ({
    id: nanoid(10),
    title: "",
    content: "",
  }));

  const statusLabel: Record<SaveStatus, string> = {
    idle: "",
    unsaved: "Unsaved changes…",
    saving: "Saving…",
    saved: "All changes saved ✓",
    error: saveError ?? "Save failed",
  };

  /* ---------- render ---------- */

  return (
    <div className="flex min-h-screen flex-col bg-[var(--rb-bg)]">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-14 items-center gap-3 px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            ← Dashboard
          </Link>

          <span className="hidden h-5 w-px bg-slate-200 sm:block" />

          <input
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            maxLength={160}
            aria-label="Resume title"
            className="min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-sm font-semibold text-slate-900 hover:border-slate-200 focus:border-indigo-400 focus:outline-none"
            placeholder="Resume title"
          />

          <span
            className={`hidden text-xs sm:block ${
              status === "error" ? "text-red-600" : status === "saved" ? "text-emerald-600" : "text-slate-500"
            }`}
            role="status"
            aria-live="polite"
          >
            {statusLabel[status]}
          </span>

          <button
            type="button"
            onClick={printResume}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Print
          </button>
          <button
            type="button"
            onClick={exportPdf}
            disabled={exporting}
            className="rounded-lg bg-[var(--rb-accent)] px-3.5 py-1.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
          >
            {exporting ? "Exporting…" : "Download PDF"}
          </button>
        </div>
        {exportError && (
          <p role="alert" className="bg-red-50 px-4 py-1.5 text-xs text-red-700">
            {exportError} — you can use the Print button as a fallback.
          </p>
        )}
      </header>

      {/* Split layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left: editor rail */}
        <div className="flex w-full border-b border-slate-200 bg-white lg:w-[46%] lg:border-b-0 lg:border-r xl:w-[44%]">
          {/* section nav */}
          <nav
            aria-label="Resume sections"
            className="rail-scroll w-[62px] shrink-0 overflow-y-auto border-r border-slate-200 py-3 sm:w-[150px]"
          >
            <ul className="space-y-1 px-2">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => setActive(s.key)}
                    aria-current={active === s.key ? "page" : undefined}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[13px] font-medium transition ${
                      active === s.key
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span aria-hidden className="text-base leading-none">
                      {s.icon}
                    </span>
                    <span className="hidden truncate sm:inline">{s.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* section form */}
          <div className="rail-scroll min-w-0 flex-1 overflow-y-auto p-4 sm:p-6" style={{ maxHeight: "calc(100vh - 3.5rem)" }}>
            <SectionBody
              active={active}
              data={data}
              profile={profile}
              setProfile={setProfile}
              mutate={mutate}
              expL={expL}
              eduL={eduL}
              skillL={skillL}
              projL={projL}
              certL={certL}
              langL={langL}
              customL={customL}
              userName={userName}
            />
          </div>
        </div>

        {/* Right: preview */}
        <div className="flex min-w-0 flex-1 flex-col bg-slate-100">
          {/* template picker */}
          <div className="border-b border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Template
              </span>
              <div className="flex flex-wrap gap-2">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onTemplateChange(t.id)}
                    title={t.description}
                    aria-pressed={template === t.id}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      template === t.id
                        ? "border-indigo-500 bg-indigo-500 text-white"
                        : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* paper preview */}
          <div className="rail-scroll flex-1 overflow-auto p-4 sm:p-8">
            <div className="mx-auto w-fit shadow-lg ring-1 ring-slate-200">
              <TemplateComponent data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- section body ---------------- */

type ListHelpers<T> = {
  add: () => void;
  update: (id: string, patch: Partial<T>) => void;
  remove: (id: string) => void;
  reorder: (next: T[]) => void;
};

interface SectionBodyProps {
  active: SectionKey;
  data: ResumeData;
  profile: ResumeData["profile"];
  setProfile: <K extends keyof ResumeData["profile"]>(
    key: K,
    value: ResumeData["profile"][K],
  ) => void;
  mutate: (fn: (d: ResumeData) => ResumeData) => void;
  expL: ListHelpers<ExperienceItem>;
  eduL: ListHelpers<EducationItem>;
  skillL: ListHelpers<SkillItem>;
  projL: ListHelpers<ProjectItem>;
  certL: ListHelpers<CertificationItem>;
  langL: ListHelpers<LanguageItem>;
  customL: ListHelpers<CustomSection>;
  userName: string;
}

function SectionBody(props: SectionBodyProps) {
  const { active, profile, setProfile, expL, eduL, skillL, projL, certL, langL, customL, data, mutate } =
    props;

  if (active === "profile") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Profile" subtitle="The header recruiters see first." />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" required>
            <TextInput
              value={profile.fullName}
              onChange={(e) => setProfile("fullName", e.target.value)}
              maxLength={120}
              placeholder="Jane Doe"
            />
          </Field>
          <Field label="Job title">
            <TextInput
              value={profile.jobTitle}
              onChange={(e) => setProfile("jobTitle", e.target.value)}
              maxLength={140}
              placeholder="Senior Frontend Engineer"
            />
          </Field>
          <Field label="Email">
            <TextInput
              type="email"
              value={profile.email}
              onChange={(e) => setProfile("email", e.target.value)}
              maxLength={200}
              placeholder="jane@example.com"
            />
          </Field>
          <Field label="Phone">
            <TextInput
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile("phone", e.target.value)}
              maxLength={40}
              placeholder="+91 98765 43210"
            />
          </Field>
          <Field label="Location">
            <TextInput
              value={profile.location}
              onChange={(e) => setProfile("location", e.target.value)}
              maxLength={140}
              placeholder="Hyderabad, India"
            />
          </Field>
          <Field label="Website / portfolio">
            <TextInput
              value={profile.website}
              onChange={(e) => setProfile("website", e.target.value)}
              maxLength={300}
              placeholder="https://janedoe.dev"
            />
          </Field>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-slate-700">Links (LinkedIn, GitHub…)</span>
            <button
              type="button"
              onClick={() =>
                mutate((d) => ({
                  ...d,
                  profile: { ...d.profile, links: [...d.profile.links, { label: "", url: "" }] },
                }))
              }
              disabled={profile.links.length >= 8}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              + Add link
            </button>
          </div>
          {profile.links.map((l, i) => (
            <div key={i} className="flex gap-2">
              <TextInput
                value={l.label}
                placeholder="Label"
                maxLength={80}
                aria-label={`Link ${i + 1} label`}
                onChange={(e) =>
                  mutate((d) => {
                    const links = [...d.profile.links];
                    links[i] = { ...links[i], label: e.target.value };
                    return { ...d, profile: { ...d.profile, links } };
                  })
                }
              />
              <TextInput
                value={l.url}
                placeholder="https://…"
                maxLength={300}
                aria-label={`Link ${i + 1} url`}
                onChange={(e) =>
                  mutate((d) => {
                    const links = [...d.profile.links];
                    links[i] = { ...links[i], url: e.target.value };
                    return { ...d, profile: { ...d.profile, links } };
                  })
                }
              />
              <button
                type="button"
                aria-label="Remove link"
                onClick={() =>
                  mutate((d) => ({
                    ...d,
                    profile: {
                      ...d.profile,
                      links: d.profile.links.filter((_, j) => j !== i),
                    },
                  }))
                }
                className="rounded-lg border border-slate-300 px-3 text-sm text-red-600 hover:bg-red-50"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (active === "summary") {
    return (
      <div className="space-y-4">
        <SectionHeading
          title="Professional summary"
          subtitle="2–4 lines: who you are, what you've achieved, what you want next."
        />
        <Field label="Summary" hint={`${profile.summary.length}/2000 characters`}>
          <TextArea
            value={profile.summary}
            maxLength={2000}
            onChange={(e) => setProfile("summary", e.target.value)}
            placeholder="Frontend engineer with 5+ years building accessible, high-performance web apps. Led a design-system rollout that cut UI bugs by 40%…"
          />
        </Field>
      </div>
    );
  }

  if (active === "experience") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Work experience" subtitle="Most recent first — drag ⠿ to reorder." />
        <SortableList
          items={data.experience}
          onReorder={expL.reorder}
          addLabel="Add experience"
          onAdd={expL.add}
          max={30}
          emptyLabel="No experience entries yet."
          renderItem={(e) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Position">
                  <TextInput
                    value={e.position}
                    onChange={(ev) => expL.update(e.id, { position: ev.target.value })}
                    maxLength={160}
                    placeholder="Frontend Engineer"
                  />
                </Field>
                <Field label="Company">
                  <TextInput
                    value={e.company}
                    onChange={(ev) => expL.update(e.id, { company: ev.target.value })}
                    maxLength={160}
                    placeholder="Acme Corp"
                  />
                </Field>
                <Field label="Location">
                  <TextInput
                    value={e.location}
                    onChange={(ev) => expL.update(e.id, { location: ev.target.value })}
                    maxLength={120}
                    placeholder="Remote / Hyderabad"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start">
                    <TextInput
                      value={e.startDate}
                      onChange={(ev) => expL.update(e.id, { startDate: ev.target.value })}
                      maxLength={20}
                      placeholder="Jan 2022"
                    />
                  </Field>
                  <Field label="End">
                    <TextInput
                      value={e.endDate}
                      disabled={e.current}
                      onChange={(ev) => expL.update(e.id, { endDate: ev.target.value })}
                      maxLength={20}
                      placeholder="Mar 2024"
                    />
                  </Field>
                </div>
              </div>
              <label className="flex items-center gap-2 text-[13px] text-slate-700">
                <input
                  type="checkbox"
                  checked={e.current}
                  onChange={(ev) =>
                    expL.update(e.id, { current: ev.target.checked, endDate: ev.target.checked ? "" : e.endDate })
                  }
                  className="h-4 w-4 rounded border-slate-300"
                />
                I currently work here
              </label>
              <Field label="Description" hint="Use line breaks for bullet points.">
                <TextArea
                  value={e.description}
                  maxLength={3000}
                  onChange={(ev) => expL.update(e.id, { description: ev.target.value })}
                  placeholder="Owned the checkout rewrite (React 18 + TS), cutting p95 load time from 3.2s to 1.1s.\nMentored 3 juniors through code review rituals."
                />
              </Field>
              <div className="flex justify-end">
                <RemoveBtn onClick={() => expL.remove(e.id)} />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (active === "education") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Education" subtitle="Degrees, diplomas, coursework." />
        <SortableList
          items={data.education}
          onReorder={eduL.reorder}
          addLabel="Add education"
          onAdd={eduL.add}
          max={20}
          emptyLabel="No education entries yet."
          renderItem={(e) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Institution">
                  <TextInput
                    value={e.institution}
                    onChange={(ev) => eduL.update(e.id, { institution: ev.target.value })}
                    maxLength={160}
                    placeholder="Osmania University"
                  />
                </Field>
                <Field label="Degree">
                  <TextInput
                    value={e.degree}
                    onChange={(ev) => eduL.update(e.id, { degree: ev.target.value })}
                    maxLength={160}
                    placeholder="B.Tech"
                  />
                </Field>
                <Field label="Field of study">
                  <TextInput
                    value={e.field}
                    onChange={(ev) => eduL.update(e.id, { field: ev.target.value })}
                    maxLength={160}
                    placeholder="Computer Science"
                  />
                </Field>
                <Field label="Location">
                  <TextInput
                    value={e.location}
                    onChange={(ev) => eduL.update(e.id, { location: ev.target.value })}
                    maxLength={120}
                    placeholder="Hyderabad"
                  />
                </Field>
                <Field label="Start">
                  <TextInput
                    value={e.startDate}
                    onChange={(ev) => eduL.update(e.id, { startDate: ev.target.value })}
                    maxLength={20}
                    placeholder="2018"
                  />
                </Field>
                <Field label="End">
                  <TextInput
                    value={e.endDate}
                    onChange={(ev) => eduL.update(e.id, { endDate: ev.target.value })}
                    maxLength={20}
                    placeholder="2022"
                  />
                </Field>
                <Field label="GPA / grade">
                  <TextInput
                    value={e.gpa}
                    onChange={(ev) => eduL.update(e.id, { gpa: ev.target.value })}
                    maxLength={20}
                    placeholder="8.7 / 10"
                  />
                </Field>
              </div>
              <Field label="Notes">
                <TextArea
                  value={e.description}
                  maxLength={1500}
                  onChange={(ev) => eduL.update(e.id, { description: ev.target.value })}
                  placeholder="Relevant coursework, honors, activities…"
                />
              </Field>
              <div className="flex justify-end">
                <RemoveBtn onClick={() => eduL.remove(e.id)} />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (active === "skills") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Skills" subtitle="Keywords recruiters and ATS filters search for." />
        <SortableList
          items={data.skills}
          onReorder={skillL.reorder}
          addLabel="Add skill"
          onAdd={skillL.add}
          max={120}
          emptyLabel="No skills added yet."
          renderItem={(s) => (
            <div className="flex items-center gap-3">
              <TextInput
                value={s.name}
                onChange={(ev) => skillL.update(s.id, { name: ev.target.value })}
                maxLength={80}
                placeholder="React"
                aria-label="Skill name"
              />
              <select
                value={s.level ?? ""}
                onChange={(ev) =>
                  skillL.update(s.id, {
                    level: (ev.target.value || undefined) as SkillItem["level"],
                  })
                }
                aria-label="Skill level"
                className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm"
              >
                <option value="">Level (optional)</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <RemoveBtn onClick={() => skillL.remove(s.id)} />
            </div>
          )}
        />
      </div>
    );
  }

  if (active === "projects") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Projects" subtitle="Showcase work that proves your skills." />
        <SortableList
          items={data.projects}
          onReorder={projL.reorder}
          addLabel="Add project"
          onAdd={projL.add}
          max={20}
          emptyLabel="No projects yet."
          renderItem={(p) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Project name">
                  <TextInput
                    value={p.name}
                    onChange={(ev) => projL.update(p.id, { name: ev.target.value })}
                    maxLength={160}
                    placeholder="ResumeForge"
                  />
                </Field>
                <Field label="Your role">
                  <TextInput
                    value={p.role}
                    onChange={(ev) => projL.update(p.id, { role: ev.target.value })}
                    maxLength={160}
                    placeholder="Creator / Maintainer"
                  />
                </Field>
                <Field label="Link">
                  <TextInput
                    value={p.link}
                    onChange={(ev) => projL.update(p.id, { link: ev.target.value })}
                    maxLength={300}
                    placeholder="https://github.com/…"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Start">
                    <TextInput
                      value={p.startDate}
                      onChange={(ev) => projL.update(p.id, { startDate: ev.target.value })}
                      maxLength={20}
                      placeholder="2024"
                    />
                  </Field>
                  <Field label="End">
                    <TextInput
                      value={p.endDate}
                      onChange={(ev) => projL.update(p.id, { endDate: ev.target.value })}
                      maxLength={20}
                      placeholder="2025"
                    />
                  </Field>
                </div>
              </div>
              <Field label="Description">
                <TextArea
                  value={p.description}
                  maxLength={2000}
                  onChange={(ev) => projL.update(p.id, { description: ev.target.value })}
                  placeholder="What it does, tech stack, your impact…"
                />
              </Field>
              <div className="flex justify-end">
                <RemoveBtn onClick={() => projL.remove(p.id)} />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (active === "certifications") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Certifications" subtitle="Courses, licenses, credentials." />
        <SortableList
          items={data.certifications}
          onReorder={certL.reorder}
          addLabel="Add certification"
          onAdd={certL.add}
          max={30}
          emptyLabel="No certifications yet."
          renderItem={(c) => (
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Name">
                  <TextInput
                    value={c.name}
                    onChange={(ev) => certL.update(c.id, { name: ev.target.value })}
                    maxLength={160}
                    placeholder="AWS Certified Cloud Practitioner"
                  />
                </Field>
                <Field label="Issuer">
                  <TextInput
                    value={c.issuer}
                    onChange={(ev) => certL.update(c.id, { issuer: ev.target.value })}
                    maxLength={160}
                    placeholder="Amazon Web Services"
                  />
                </Field>
                <Field label="Date">
                  <TextInput
                    value={c.date}
                    onChange={(ev) => certL.update(c.id, { date: ev.target.value })}
                    maxLength={30}
                    placeholder="Mar 2025"
                  />
                </Field>
                <Field label="Credential link">
                  <TextInput
                    value={c.link}
                    onChange={(ev) => certL.update(c.id, { link: ev.target.value })}
                    maxLength={300}
                    placeholder="https://…"
                  />
                </Field>
              </div>
              <div className="flex justify-end">
                <RemoveBtn onClick={() => certL.remove(c.id)} />
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  if (active === "languages") {
    return (
      <div className="space-y-4">
        <SectionHeading title="Languages" subtitle="Spoken or written languages and proficiency." />
        <SortableList
          items={data.languages}
          onReorder={langL.reorder}
          addLabel="Add language"
          onAdd={langL.add}
          max={20}
          emptyLabel="No languages yet."
          renderItem={(l) => (
            <div className="flex items-center gap-3">
              <TextInput
                value={l.name}
                onChange={(ev) => langL.update(l.id, { name: ev.target.value })}
                maxLength={60}
                placeholder="English"
                aria-label="Language"
              />
              <TextInput
                value={l.level}
                onChange={(ev) => langL.update(l.id, { level: ev.target.value })}
                maxLength={60}
                placeholder="Fluent / Native"
                aria-label="Proficiency"
              />
              <RemoveBtn onClick={() => langL.remove(l.id)} />
            </div>
          )}
        />
      </div>
    );
  }

  // custom
  return (
    <div className="space-y-4">
      <SectionHeading
        title="Custom sections"
        subtitle="Awards, volunteering, publications — anything extra."
      />
      <SortableList
        items={data.customSections}
        onReorder={customL.reorder}
        addLabel="Add custom section"
        onAdd={customL.add}
        max={10}
        emptyLabel="No custom sections yet."
        renderItem={(c) => (
          <div className="space-y-3">
            <Field label="Section title">
              <TextInput
                value={c.title}
                onChange={(ev) => customL.update(c.id, { title: ev.target.value })}
                maxLength={120}
                placeholder="Volunteer Work"
              />
            </Field>
            <Field label="Content">
              <TextArea
                value={c.content}
                maxLength={4000}
                onChange={(ev) => customL.update(c.id, { content: ev.target.value })}
                placeholder="Describe it — line breaks become new lines on the resume."
              />
            </Field>
            <div className="flex justify-end">
              <RemoveBtn onClick={() => customL.remove(c.id)} />
            </div>
          </div>
        )}
      />
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
