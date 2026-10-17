import { z } from "zod";

// ---------- Zod schemas (source of truth for validation) ----------

export const linkSchema = z.object({
  label: z.string().max(80).default(""),
  url: z.string().max(300).default(""),
});

export const profileSchema = z.object({
  // Drafts autosave before the name is typed — enforce presence at export time in the UI.
  fullName: z.string().max(120).default(""),
  jobTitle: z.string().max(140).default(""),
  email: z.string().email("Invalid email").max(200).optional().or(z.literal("")),
  phone: z.string().max(40).default(""),
  location: z.string().max(140).default(""),
  website: z.string().max(300).default(""),
  summary: z.string().max(2000).default(""),
  links: z.array(linkSchema).max(8).default([]),
});

export const experienceSchema = z.object({
  id: z.string().min(1),
  company: z.string().max(160).default(""),
  position: z.string().max(160).default(""),
  location: z.string().max(120).default(""),
  startDate: z.string().max(20).default(""),
  endDate: z.string().max(20).default(""),
  current: z.boolean().default(false),
  description: z.string().max(3000).default(""),
});

export const educationSchema = z.object({
  id: z.string().min(1),
  institution: z.string().max(160).default(""),
  degree: z.string().max(160).default(""),
  field: z.string().max(160).default(""),
  location: z.string().max(120).default(""),
  startDate: z.string().max(20).default(""),
  endDate: z.string().max(20).default(""),
  gpa: z.string().max(20).default(""),
  description: z.string().max(1500).default(""),
});

export const skillSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(80).default(""),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"]).optional(),
});

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(160).default(""),
  role: z.string().max(160).default(""),
  link: z.string().max(300).default(""),
  startDate: z.string().max(20).default(""),
  endDate: z.string().max(20).default(""),
  description: z.string().max(2000).default(""),
});

export const certificationSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(160).default(""),
  issuer: z.string().max(160).default(""),
  date: z.string().max(30).default(""),
  link: z.string().max(300).default(""),
});

export const languageSchema = z.object({
  id: z.string().min(1),
  name: z.string().max(60).default(""),
  level: z.string().max(60).default(""),
});

export const customSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().max(120).default(""),
  content: z.string().max(4000).default(""),
});

export const resumeDataSchema = z.object({
  profile: profileSchema,
  experience: z.array(experienceSchema).max(30).default([]),
  education: z.array(educationSchema).max(20).default([]),
  skills: z.array(skillSchema).max(120).default([]),
  projects: z.array(projectSchema).max(20).default([]),
  certifications: z.array(certificationSchema).max(30).default([]),
  languages: z.array(languageSchema).max(20).default([]),
  customSections: z.array(customSectionSchema).max(10).default([]),
});

export const TEMPLATE_IDS = [
  "ats-minimal",
  "modern-clean",
  "classic-serif",
  "compact-one-column",
  "two-column-sidebar",
  "executive-elegant",
] as const;

export const templateIdSchema = z.enum(TEMPLATE_IDS);

export const createResumeSchema = z.object({
  title: z.string().min(1).max(160),
  template: templateIdSchema.default("ats-minimal"),
  data: resumeDataSchema,
});

export const updateResumeSchema = z.object({
  title: z.string().min(1).max(160).optional(),
  template: templateIdSchema.optional(),
  data: resumeDataSchema.optional(),
});

// ---------- TS types ----------

export type Link = z.infer<typeof linkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type ExperienceItem = z.infer<typeof experienceSchema>;
export type EducationItem = z.infer<typeof educationSchema>;
export type SkillItem = z.infer<typeof skillSchema>;
export type ProjectItem = z.infer<typeof projectSchema>;
export type CertificationItem = z.infer<typeof certificationSchema>;
export type LanguageItem = z.infer<typeof languageSchema>;
export type CustomSection = z.infer<typeof customSectionSchema>;
export type ResumeData = z.infer<typeof resumeDataSchema>;
export type TemplateId = z.infer<typeof templateIdSchema>;

export interface Resume {
  id: string;
  title: string;
  template: TemplateId;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
}

// Empty starter used for new resumes
export function emptyResumeData(name = ""): ResumeData {
  return {
    profile: {
      fullName: name,
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      summary: "",
      links: [],
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    customSections: [],
  };
}
