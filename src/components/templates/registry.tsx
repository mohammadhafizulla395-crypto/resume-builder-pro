import type { ResumeData, TemplateId } from "@/types/resume";
import type { ComponentType } from "react";

import { ATSMinimal } from "./ATSMinimal";
import { ModernClean } from "./ModernClean";
import { ClassicSerif } from "./ClassicSerif";
import { CompactOneColumn } from "./CompactOneColumn";
import { TwoColumnSidebar } from "./TwoColumnSidebar";
import { ExecutiveElegant } from "./ExecutiveElegant";
import { BoldHeader } from "./BoldHeader";
import { ProfessionalBlue } from "./ProfessionalBlue";
import { MinimalLine } from "./MinimalLine";
import { CreativeBand } from "./CreativeBand";
import { SimpleStack } from "./SimpleStack";
import { AcademicCv } from "./AcademicCv";
import { GraduateEntry } from "./GraduateEntry";
import { TechEngineer } from "./TechEngineer";
import { ItSpecialist } from "./ItSpecialist";
import { DesignerPortfolio } from "./DesignerPortfolio";
import { MarketingPro } from "./MarketingPro";
import { SalesProfessional } from "./SalesProfessional";
import { FinanceConservative } from "./FinanceConservative";
import { HealthcareNurse } from "./HealthcareNurse";
import { TeacherEducation } from "./TeacherEducation";
import { LegalProfessional } from "./LegalProfessional";
import { HospitalityService } from "./HospitalityService";
import { StudentResume } from "./StudentResume";
import { FederalBlock } from "./FederalBlock";
import { ExecutiveDark } from "./ExecutiveDark";
import { ColorSidebar } from "./ColorSidebar";

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
  {
    id: "bold-header",
    name: "Bold Header",
    description: "Full-width colored name banner for instant presence.",
    accent: "#1d4ed8",
    component: BoldHeader,
  },
  {
    id: "professional-blue",
    name: "Professional Blue",
    description: "Navy section rules — the safe corporate standard.",
    accent: "#1e40af",
    component: ProfessionalBlue,
  },
  {
    id: "minimal-line",
    name: "Minimal Line",
    description: "Hairline dividers and airy letter-spaced headings.",
    accent: "#374151",
    component: MinimalLine,
  },
  {
    id: "creative-band",
    name: "Creative Band",
    description: "Vertical gradient strip for creative applications.",
    accent: "#db2777",
    component: CreativeBand,
  },
  {
    id: "simple-stack",
    name: "Simple Stack",
    description: "Plainest possible layout — maximum ATS friendliness.",
    accent: "#111827",
    component: SimpleStack,
  },
  {
    id: "academic-cv",
    name: "Academic CV",
    description: "Education-first serif layout for research roles.",
    accent: "#4b5563",
    component: AcademicCv,
  },
  {
    id: "graduate-entry",
    name: "Graduate Entry",
    description: "Education and projects lead for new graduates.",
    accent: "#059669",
    component: GraduateEntry,
  },
  {
    id: "tech-engineer",
    name: "Tech Engineer",
    description: "Skills grid and monospace details for engineers.",
    accent: "#0f766e",
    component: TechEngineer,
  },
  {
    id: "it-specialist",
    name: "IT Specialist",
    description: "Certifications forward for sysadmin and support roles.",
    accent: "#7c3aed",
    component: ItSpecialist,
  },
  {
    id: "designer-portfolio",
    name: "Designer Portfolio",
    description: "Oversized display name with links-forward header.",
    accent: "#e11d48",
    component: DesignerPortfolio,
  },
  {
    id: "marketing-pro",
    name: "Marketing Pro",
    description: "Profile-forward with bright orange campaign energy.",
    accent: "#ea580c",
    component: MarketingPro,
  },
  {
    id: "sales-professional",
    name: "Sales Professional",
    description: "Results-first track record blocks with amber rules.",
    accent: "#b45309",
    component: SalesProfessional,
  },
  {
    id: "finance-conservative",
    name: "Finance",
    description: "Restrained navy serif for banking and consulting.",
    accent: "#1e3a8a",
    component: FinanceConservative,
  },
  {
    id: "healthcare-nurse",
    name: "Healthcare",
    description: "Licensure and certifications lead for clinical roles.",
    accent: "#0891b2",
    component: HealthcareNurse,
  },
  {
    id: "teacher-education",
    name: "Teacher",
    description: "Warm chronological layout for education hiring.",
    accent: "#9333ea",
    component: TeacherEducation,
  },
  {
    id: "legal-professional",
    name: "Legal Professional",
    description: "Formal centered serif for attorneys and paralegals.",
    accent: "#334155",
    component: LegalProfessional,
  },
  {
    id: "hospitality-service",
    name: "Hospitality",
    description: "Friendly rounded header for service industries.",
    accent: "#0d9488",
    component: HospitalityService,
  },
  {
    id: "student-resume",
    name: "Student",
    description: "Education and projects first for internships.",
    accent: "#65a30d",
    component: StudentResume,
  },
  {
    id: "federal-block",
    name: "Federal Block",
    description: "Labelled contact block for government applications.",
    accent: "#1f2937",
    component: FederalBlock,
  },
  {
    id: "executive-dark",
    name: "Executive Dark",
    description: "Charcoal reversed header for C-suite leaders.",
    accent: "#111827",
    component: ExecutiveDark,
  },
  {
    id: "color-sidebar",
    name: "Color Sidebar",
    description: "Indigo sidebar split for skills-forward resumes.",
    accent: "#4f46e5",
    component: ColorSidebar,
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
