import type { ResumeData, TemplateId } from "@/types/resume";
import type { ComponentType } from "react";

import { ATSMinimal } from "./ATSMinimal";
import { ModernClean } from "./ModernClean";
import { ClassicSerif } from "./ClassicSerif";
import { CompactOneColumn } from "./CompactOneColumn";
import { TwoColumnSidebar } from "./TwoColumnSidebar";
import { ExecutiveElegant } from "./ExecutiveElegant";

export interface TemplateProps {
  data: ResumeData;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  accent: string;
  component: ComponentType<TemplateProps>;
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "ats-minimal",
    name: "ATS Minimal",
    description: "Single column, strict hierarchy — maximum parsing safety.",
    accent: "#0f172a",
    component: ATSMinimal,
  },
  {
    id: "modern-clean",
    name: "Modern Clean",
    description: "Indigo accents and confident headings for tech roles.",
    accent: "#4f46e5",
    component: ModernClean,
  },
  {
    id: "classic-serif",
    name: "Classic Serif",
    description: "Traditional Georgia typography for formal industries.",
    accent: "#1e293b",
    component: ClassicSerif,
  },
  {
    id: "compact-one-column",
    name: "Compact One-Column",
    description: "Dense layout that fits 10+ years on a single page.",
    accent: "#334155",
    component: CompactOneColumn,
  },
  {
    id: "two-column-sidebar",
    name: "Two-Column Sidebar",
    description: "Skills-forward split layout with sidebar contact block.",
    accent: "#0e7490",
    component: TwoColumnSidebar,
  },
  {
    id: "executive-elegant",
    name: "Executive Elegant",
    description: "Refined spacing and gold-rule details for senior roles.",
    accent: "#78350f",
    component: ExecutiveElegant,
  },
];

export function getTemplate(id: TemplateId): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

/** Strip empty blocks so templates never render blank sections. */
export function hasText(s: string | undefined | null): boolean {
  return Boolean(s && s.trim().length > 0);
}

export function dateRange(start: string, end: string, current?: boolean): string {
  const s = start?.trim() ?? "";
  const e = current ? "Present" : (end?.trim() ?? "");
  if (s && e) return `${s} – ${e}`;
  return s || e || "";
}
