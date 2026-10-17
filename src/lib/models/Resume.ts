import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";
import { TEMPLATE_IDS } from "@/types/resume";

const LinkSchema = new Schema(
  { label: { type: String, maxlength: 80 }, url: { type: String, maxlength: 300 } },
  { _id: false },
);

const ExperienceSchema = new Schema(
  {
    id: { type: String, required: true },
    company: { type: String, maxlength: 160, default: "" },
    position: { type: String, maxlength: 160, default: "" },
    location: { type: String, maxlength: 120, default: "" },
    startDate: { type: String, maxlength: 20, default: "" },
    endDate: { type: String, maxlength: 20, default: "" },
    current: { type: Boolean, default: false },
    description: { type: String, maxlength: 3000, default: "" },
  },
  { _id: false },
);

const EducationSchema = new Schema(
  {
    id: { type: String, required: true },
    institution: { type: String, maxlength: 160, default: "" },
    degree: { type: String, maxlength: 160, default: "" },
    field: { type: String, maxlength: 160, default: "" },
    location: { type: String, maxlength: 120, default: "" },
    startDate: { type: String, maxlength: 20, default: "" },
    endDate: { type: String, maxlength: 20, default: "" },
    gpa: { type: String, maxlength: 20, default: "" },
    description: { type: String, maxlength: 1500, default: "" },
  },
  { _id: false },
);

const SkillSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, maxlength: 80, default: "" },
    level: { type: String, enum: ["beginner", "intermediate", "advanced", "expert", null], default: null },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, maxlength: 160, default: "" },
    role: { type: String, maxlength: 160, default: "" },
    link: { type: String, maxlength: 300, default: "" },
    startDate: { type: String, maxlength: 20, default: "" },
    endDate: { type: String, maxlength: 20, default: "" },
    description: { type: String, maxlength: 2000, default: "" },
  },
  { _id: false },
);

const CertificationSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, maxlength: 160, default: "" },
    issuer: { type: String, maxlength: 160, default: "" },
    date: { type: String, maxlength: 30, default: "" },
    link: { type: String, maxlength: 300, default: "" },
  },
  { _id: false },
);

const LanguageSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, maxlength: 60, default: "" },
    level: { type: String, maxlength: 60, default: "" },
  },
  { _id: false },
);

const CustomSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, maxlength: 120, default: "" },
    content: { type: String, maxlength: 4000, default: "" },
  },
  { _id: false },
);

const ResumeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    template: { type: String, enum: TEMPLATE_IDS, default: "ats-minimal" },
    data: {
      type: new Schema(
        {
          profile: {
            type: new Schema(
              {
                fullName: { type: String, maxlength: 120, default: "" },
                jobTitle: { type: String, maxlength: 140, default: "" },
                email: { type: String, maxlength: 200, default: "" },
                phone: { type: String, maxlength: 40, default: "" },
                location: { type: String, maxlength: 140, default: "" },
                website: { type: String, maxlength: 300, default: "" },
                summary: { type: String, maxlength: 2000, default: "" },
                links: { type: [LinkSchema], default: [] },
              },
              { _id: false },
            ),
            required: true,
          },
          experience: { type: [ExperienceSchema], default: [] },
          education: { type: [EducationSchema], default: [] },
          skills: { type: [SkillSchema], default: [] },
          projects: { type: [ProjectSchema], default: [] },
          certifications: { type: [CertificationSchema], default: [] },
          languages: { type: [LanguageSchema], default: [] },
          customSections: { type: [CustomSectionSchema], default: [] },
        },
        { _id: false },
      ),
      required: true,
    },
  },
  { timestamps: true },
);

export type ResumeDoc = InferSchemaType<typeof ResumeSchema>;

export const Resume: Model<ResumeDoc> = models.Resume ?? model("Resume", ResumeSchema);
